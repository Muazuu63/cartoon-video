#!/usr/bin/env python3
"""Build two offline preview pages and a storyboard; Python 3.9+."""
import json,base64,html
from pathlib import Path
P=Path(__file__).resolve().parent
c=json.loads((P/'story.json').read_text(encoding='utf-8'))
assert c['duration']>0
previous=0
for s in c['scenes']:
    assert abs(s['start']-previous)<.01 and s['end']>s['start'], 'Scenes must be contiguous'
    assert len(s['action']) > 0, 'Action cannot be empty'
    previous=s['end']
assert abs(previous-c['duration'])<.01
voice=P/c.get('voice','assets/voice.wav')
source=''
if voice.exists():
    mime='audio/mpeg' if voice.suffix.lower()=='.mp3' else 'audio/wav'
    source='data:'+mime+';base64,'+base64.b64encode(voice.read_bytes()).decode()
font_data=base64.b64encode((P/'assets/NotoSansBengali-Regular.ttf').read_bytes()).decode()
libs='\n'.join((P/x).read_text(encoding='utf-8') for x in ['lib/harness.js','lib/sound.js'])
code='\n'.join((P/x).read_text(encoding='utf-8') for x in ['src/ref.js','src/story.js','src/sound_score.js','src/player.js'])
config_json=json.dumps(c,ensure_ascii=False).replace('<','\\u003c')
(P/'preview').mkdir(exist_ok=True)
for name,w,h in [('landscape',1920,1080),('portrait',1080,1920)]:
    page=f"""<!doctype html><meta charset="utf-8"><title>{html.escape(c['brand'])}</title>
<style>@font-face{{font-family:'Noto Sans Bengali';src:url(data:font/ttf;base64,{font_data})}}body{{margin:0;background:#071c17;color:#f8e2b5;font:15px sans-serif;text-align:center}}canvas{{display:block;max-height:86vh;max-width:100%;margin:auto}}footer{{padding:12px}}button,input{{margin:8px}}a{{color:#ffe0a1}}</style>
<canvas width="{w}" height="{h}"></canvas><footer><button id="play">Play</button><input type="range" id="seek" min="0" step=".05"><span id="time"></span><label><input type="checkbox" id="sound" checked>Foley</label><input type="file" id="voice" accept="audio/*"></footer><audio src="{source}"></audio>
<script>{libs}</script><script>(()=>{{const CONFIG={config_json};{code}}})();</script>"""
    (P/'preview'/f'{name}.html').write_text(page,encoding='utf-8')
# Storyboard uses the same exact renderer and times.
page=page.replace('<footer>','<footer>')
rows=''.join(f"<tr><td>{s['start']}–{s['end']}</td><td>{html.escape(s['title'])}</td><td>{html.escape(s['narration'])}</td><td>{s['setting']} / {s['action']}</td></tr>" for s in c['scenes'])
(P/'preview/storyboard.html').write_text('<meta charset="utf-8"><style>body{background:#071c17;color:#f8e2b5;font:18px sans-serif;padding:40px}td{padding:18px;border-bottom:1px solid #596b51}</style><h1>'+html.escape(c['title'])+'</h1><p>'+html.escape(c['source_note'])+'</p><table>'+rows+'</table><p><a href="landscape.html">16:9</a> | <a href="portrait.html">9:16</a></p>',encoding='utf-8')
print('Built preview/landscape.html, portrait.html, storyboard.html')
