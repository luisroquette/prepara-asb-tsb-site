"""Adapt the published 21st.dev 3D testimonial preview to verified course quotes."""

import json
from pathlib import Path
import re


site = Path(__file__).resolve().parents[1]
source = site.parent / "source" / "21st-3d-testimonials-preview.html"
target = site / "public" / "3d-proof" / "index.html"
original = source.read_text()
script = re.search(r'<script type="module" crossorigin>(.*?)</script>', original, re.S).group(1)
stylesheet = re.search(r'<style rel="stylesheet" crossorigin>(.*?)</style>', original, re.S).group(1)

quotes = [
    {"name": "Antónia Santana", "result": "1º lugar · EBSERH", "body": "Deus abençoou e eu consegui o 1º lugar no concurso da Ebserh no HU da minha cidade. Muito feliz!"},
    {"name": "Nanny Marttins", "result": "1º lugar · escrita e prática", "body": "Passei em primeiro lugar na escrita e em primeiro na prática!"},
    {"name": "Gislaine Varela", "result": "2º lugar · Araçatuba", "body": "Fiquei em 2º lugar na prefeitura de Araçatuba. Na hora da prova lembrava-me das suas palavras, lembrava-me do que falava nos vídeos e nas apostilas."},
    {"name": "Lucileide Barros", "result": "Depoimento de aluna", "body": "O melhor professor do mundo, pessoal comprem o cursinho completo, super indico! Contribuiu demais"},
    {"name": "Simone Borel", "result": "Depoimento de aluna", "body": "Adoro assistir aos seus vídeos todos os dias, aprendo sempre um pouco, e posso garantir que nos ajuda muito, fui aprovada em dois concursos graças aos seus métodos de estudo."},
    {"name": "Eliandro", "result": "Aprovação · EBSERH", "body": "Eu passei na Ebserh nacional. HU Unifap."},
]
data = "const In=" + json.dumps(quotes, ensure_ascii=False, separators=(",", ":")) + ";"
script, count = re.subn(r"const In=\[.*?\];(?=function Pn\()", lambda _: data, script, count=1, flags=re.S)
assert count == 1, "Published testimonial data changed"

card = '''function Pn({name:v,result:g,body:r}){return L.jsx(vm,{className:"w-72 proof-card",children:L.jsxs(ym,{children:[L.jsxs("div",{className:"flex items-center gap-2.5",children:[L.jsx("span",{className:"proof-initial",children:v[0]}),L.jsxs("div",{className:"flex flex-col min-w-0",children:[L.jsx("figcaption",{className:"text-sm font-semibold text-foreground",children:v}),L.jsx("p",{className:"text-xs font-medium text-muted-foreground",children:g})]})]}),L.jsx("blockquote",{className:"mt-3 text-sm proof-quote",children:"“"+r+"”"})]})})}i(Pn,"TestimonialCard");'''
script, count = re.subn(r'function Pn\(\{.*?\}i\(Pn,"TestimonialCard"\);', lambda _: card, script, count=1, flags=re.S)
assert count == 1, "Published testimonial card changed"

script = script.replace('h-96 w-full max-w-[800px]', 'h-full w-full')
script = script.replace('o.username))', 'o.name))')
assert script.count('o.name))') == 4, "Published marquee columns changed"
assert 'i(Fn,"Marquee")' in script, "Original marquee implementation missing"
assert 'rotateX(20deg) rotateY(-10deg) rotateZ(20deg)' in script, "Original 3D effect missing"

target.parent.mkdir(parents=True, exist_ok=True)
target.write_text('''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Depoimentos de alunos do Prepara ASB/TSB</title><style>'''
    + stylesheet
    + '''</style><style>html,body,#root{width:100%;height:100%;margin:0;background:#f7f5fb!important}body{overflow:hidden}#root>div{min-height:0;height:100%}.proof-card{background:#fff!important;border-color:#e8e0f0!important;box-shadow:0 12px 36px #281b3517}.proof-card>div{padding:20px}.proof-initial{width:36px;height:36px;flex:none;display:grid;place-items:center;border-radius:50%;background:#e9dcff;color:#7044c9;font:700 14px Arial,sans-serif}.proof-quote{color:#292332;line-height:1.5}.proof-card figcaption{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}@media(max-width:700px){.proof-card{width:230px}#root [style*="translateX"]{transform:translateX(0) translateY(0) translateZ(-25px) rotateX(15deg) rotateY(-6deg) rotateZ(10deg)!important}#root [style*="translateX"]>[data-slot="marquee"]:nth-child(3),#root [style*="translateX"]>[data-slot="marquee"]:nth-child(4){display:none}}@media(prefers-reduced-motion:reduce){.animate-marquee-vertical{animation:none!important}}</style></head><body><div id="root"></div><script type="module">'''
    + script
    + '''</script></body></html>''')
print(target)
