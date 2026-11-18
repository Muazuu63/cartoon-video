
const cv=document.querySelector('canvas'),ctx=cv.getContext('2d'),voice=document.querySelector('audio');
let active=false,position=0,epoch=0,stop=null;
const slider=document.querySelector('#seek'),button=document.querySelector('#play');slider.max=DURATION;
function draw(t){frame(ctx,cv.width,cv.height,Math.min(t,DURATION-.001));slider.value=t;document.querySelector('#time').textContent=t.toFixed(1)+' / '+DURATION+' s';}
function halt(){active=false;voice.pause();if(stop)stop();stop=null;button.textContent='Play';}
window.seek=t=>{halt();position=cl(t,0,DURATION);voice.currentTime=position;draw(position);};
button.onclick=()=>{if(active){position=cl((performance.now()-epoch)/1000,0,DURATION);halt();return;}if(position>=DURATION)position=0;active=true;epoch=performance.now()-position*1000;voice.currentTime=position;if(voice.getAttribute('src'))voice.play().catch(()=>{});window.SOUND_FROM=position;if(document.querySelector('#sound').checked)stop=SOUND.live(scoreSound,position,{voiceover:true});window.SOUND_FROM=0;button.textContent='Pause';};
slider.oninput=()=>window.seek(+slider.value);
document.querySelector('#voice').onchange=e=>{if(e.target.files[0]){halt();voice.src=URL.createObjectURL(e.target.files[0]);}};
function tick(){if(active){position=cl((performance.now()-epoch)/1000,0,DURATION);draw(position);if(position>=DURATION)halt();}requestAnimationFrame(tick);}tick();
window.DURATION=DURATION;window.scoreSound=scoreSound;
Promise.all([document.fonts.load('44px "Noto Sans Bengali"','বাংলা ভালোবাসা'),document.fonts.ready]).then(()=>{draw(0);window.READY=true;});
