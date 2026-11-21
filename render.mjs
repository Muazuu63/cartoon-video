import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import {spawn,spawnSync} from 'node:child_process';
const require=createRequire(import.meta.url);
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(require.resolve('playwright',{paths:[process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||'']})));}
const root=path.dirname(fileURLToPath(import.meta.url)),test=process.argv.includes('--test');
const config=JSON.parse(fs.readFileSync(path.join(root,'story.json'),'utf8'));
const folderName=config.export_folder || (config.title ? config.title.trim().replace(/[\s\/:*?"<>|\\]+/g,'_') : 'video_output');
const filePrefix=config.file_prefix || folderName;
const out=path.join(root,'exports',folderName);fs.mkdirSync(out,{recursive:true});
function command(args){const r=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y',...args],{stdio:'inherit'});if(r.status!==0)throw Error('FFmpeg failed');}
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),args:process.env.NO_SANDBOX==='1'?['--no-sandbox']:[]});
try{
const formats = config.formats || ['portrait', 'landscape'];
for(const format of formats){
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.join(root,'preview',format+'.html')).href);await page.waitForFunction(()=>window.READY===true);
 if(test){for(let i=0;i<config.scenes.length;i++){const mid=(config.scenes[i].start+config.scenes[i].end)/2;await page.evaluate(t=>window.seek(t),mid);await page.locator('canvas').screenshot({path:path.join(out,`${format}-${i+1}.png`)});}
 // Exercise the live foley path too.
 await page.locator('#play').click();await page.waitForTimeout(300);await page.locator('#play').click();
 if(errors.length)throw Error(errors.join('\n'));console.log(format+': all scene frames and playback passed');await page.close();continue;}
 const fps=30,duration=process.env.SMOKE_SECONDS?Math.min(+process.env.SMOKE_SECONDS,config.duration):config.duration;
 const dest=path.join(out,format+'_silent.mp4');
 const ff=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','image2pipe','-framerate',String(fps),'-c:v','png','-i','-','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',dest],{stdio:['pipe','inherit','inherit']});
 const done=new Promise((resolve,reject)=>{ff.on('error',reject);ff.on('close',code=>code===0?resolve():reject(Error('FFmpeg exit '+code)));});
 for(let i=0;i<Math.ceil(duration*fps);i++){
 const b=await page.evaluate(t=>{window.seek(t);return document.querySelector('canvas').toDataURL('image/png').split(',')[1];},i/fps);
 if(!ff.stdin.write(Buffer.from(b,'base64')))await new Promise(r=>ff.stdin.once('drain',r));
 if(i%150===0)console.log(format,i+'/'+Math.ceil(duration*fps));
 }
 ff.stdin.end();await done;
 const audio=await page.evaluate(async d=>{const {inter,sr}=await SOUND.renderOffline(window.scoreSound,d,48000,{voiceover:true});const pcm=new Int16Array(inter.length);for(let i=0;i<inter.length;i++)pcm[i]=Math.max(-1,Math.min(1,inter[i]))*32767;const bytes=new Uint8Array(pcm.buffer);let s='';for(let i=0;i<bytes.length;i+=32768)s+=String.fromCharCode(...bytes.subarray(i,i+32768));return {b64:btoa(s),sr};},duration);
 const pcm=Buffer.from(audio.b64,'base64'),header=Buffer.alloc(44);header.write('RIFF');header.writeUInt32LE(36+pcm.length,4);header.write('WAVEfmt ',8);header.writeUInt32LE(16,16);header.writeUInt16LE(1,20);header.writeUInt16LE(2,22);header.writeUInt32LE(audio.sr,24);header.writeUInt32LE(audio.sr*4,28);header.writeUInt16LE(4,32);header.writeUInt16LE(16,34);header.write('data',36);header.writeUInt32LE(pcm.length,40);
 const fx=path.join(out,format+'_effects.wav');fs.writeFileSync(fx,Buffer.concat([header,pcm]));
 const voice=path.resolve(root,config.voice||'assets/voice.wav');
 const final=path.join(out,`${filePrefix}_${format}.mp4`);
 if(fs.existsSync(voice))command(['-i',dest,'-i',voice,'-i',fx,'-filter_complex','[1:a]apad[v];[2:a]volume=0.25[f];[v][f]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.95[a]','-map','0:v','-map','[a]','-c:v','copy','-c:a','aac','-b:a','192k','-t',String(duration),'-movflags','+faststart',final]);
 else command(['-i',dest,'-i',fx,'-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-t',String(duration),'-movflags','+faststart',final]);
 if(errors.length)throw Error(errors.join('\n'));console.log('Exported',final,fs.existsSync(voice)?'with supplied narration':'DEMO ONLY: no narration supplied');await page.close();
}
}finally{await browser.close();}
