#!/usr/bin/env python3
"""Local Bengali transcription. python transcribe.py path/to/audio.mp3
Install: pip install faster-whisper. First run downloads the selected model.
"""
import argparse,json,subprocess
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('audio');p.add_argument('--model',default='medium');a=p.parse_args()
root=Path(__file__).resolve().parent;source=Path(a.audio).resolve()
if not source.is_file(): raise SystemExit('Audio file not found')
(root/'assets').mkdir(exist_ok=True)
r=subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(source),'-vn','-ar','48000','-ac','1',str(root/'assets/voice.wav')])
if r.returncode: raise SystemExit('Audio conversion failed')
from faster_whisper import WhisperModel
model=WhisperModel(a.model,device='cpu',compute_type='int8')
segments,info=model.transcribe(str(root/'assets/voice.wav'),language='bn',word_timestamps=True,vad_filter=True)
data=[{'start':s.start,'end':s.end,'text':s.text.strip(),'words':[{'start':w.start,'end':w.end,'word':w.word} for w in s.words or []]} for s in segments]
(root/'transcript.json').write_text(json.dumps({'language':'bn','segments':data},ensure_ascii=False,indent=2),encoding='utf-8')
(root/'transcript.txt').write_text('\n'.join(s['text'] for s in data),encoding='utf-8')
print('Transcript ready. Antigravity must review names, Bengali spelling and timings before adapting story.json.')
