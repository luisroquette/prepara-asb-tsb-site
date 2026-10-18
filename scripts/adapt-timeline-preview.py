"""Keep Hyperiux's published Timeline implementation; replace its demo milestones."""

import json
from pathlib import Path
import re


site = Path(__file__).resolve().parents[1]
source = site.parent / "source" / "21st-product-timeline-preview.html"
target = site / "public" / "timeline" / "index.html"
steps = json.loads((site / "app" / "method-steps.json").read_text())
assert len(steps) == 6 and all(step["title"] and step["description"] for step in steps)
assert (site / "public" / "images" / "hero-concurseira-concursada.jpg").is_file()

original = source.read_text()
script = re.search(r'<script type="module" crossorigin>(.*?)</script>', original, re.S).group(1)
stylesheet = re.search(r'<style rel="stylesheet" crossorigin>(.*?)</style>', original, re.S).group(1)
milestones = [
    {"id": f"passo-{number}", "year": f"{number:02}", "month": step["title"], "content": step["description"]}
    for number, step in enumerate(steps, 1)
]
top = json.dumps(milestones[::2], ensure_ascii=False, separators=(",", ":"))
bottom = json.dumps(milestones[1::2], ensure_ascii=False, separators=(",", ":"))
script, count = re.subn(
    r"const gd=\[.*?\],W1=\[.*?\],b2=",
    lambda _: f"const gd={top},W1={bottom},b2=",
    script,
    count=1,
    flags=re.S,
)
assert count == 1, "Published milestone data changed"
assert 'f(S2,"Timeline")' in script, "Original Timeline implementation missing"
assert 'B=L?-57:-65' in script, "Published mobile travel distance changed"
script = script.replace('B=L?-57:-65', 'B=L?-54:-65', 1)

demo = '''function x2(){return yt.jsx(S2,{title:"Seu plano",periodLabel:"ETAPAS 01 — 06",backgroundColor:"#ffffff",textColor:"#11101b",mutedTextColor:"#656477",activeColor:"#7148ee",imageUrl:"../images/hero-concurseira-concursada.jpg",imageAlt:"Arte de uma candidata para concurso em saúde bucal",duration:1.4})}f(x2,"TimelineDemo");'''
script, count = re.subn(r'function x2\(d\).*?f\(x2,"TimelineDemo"\);', lambda _: demo, script, count=1, flags=re.S)
assert count == 1, "Published demo wrapper changed"
script, count = re.subn(
    r'function E2\(\).*?f\(E2,"App"\);',
    'function E2(){return yt.jsx(x2,{})}f(E2,"App");',
    script,
    count=1,
    flags=re.S,
)
assert count == 1, "Published app entry point changed"

bridge = '''<script>window.addEventListener("message",event=>{if(event.origin!==location.origin||event.data?.type!=="prepara-timeline-progress")return;const progress=event.data.progress;if(typeof progress!=="number"||!Number.isFinite(progress))return;const range=Math.max(0,document.documentElement.scrollHeight-innerHeight);scrollTo(0,Math.max(0,Math.min(1,progress))*range)})</script>'''
target.parent.mkdir(parents=True, exist_ok=True)
target.write_text(
    '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Seis etapas do método Prepara ASB/TSB</title><style>'
    + stylesheet
    + '</style><style>html,body,#root{margin:0;width:100%;min-height:100%;background:#fff!important;scroll-behavior:auto!important}html,body{scrollbar-width:none}html::-webkit-scrollbar,body::-webkit-scrollbar{display:none}body{overflow-x:hidden}</style>'
    + bridge
    + '</head><body><div id="root"></div><script type="module">'
    + script
    + '</script></body></html>'
)
print(target)
