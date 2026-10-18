"""Keep Ruixen's published curved image stream with the Prepara artwork."""

from pathlib import Path
import re


site = Path(__file__).resolve().parents[1]
original = (site.parent / "source" / "21st-tilted-grid-hero-preview.html").read_text()
target = site / "public" / "closing" / "index.html"
script = re.search(r'<script type="module" crossorigin>(.*?)</script>', original, re.S).group(1)
stylesheet = re.search(r'<style rel="stylesheet" crossorigin>(.*?)</style>', original, re.S).group(1)

art = ("aulas", "questoes", "simulados", "pdfs", "cronograma", "revisao")
for name in art:
    assert (site / "public" / "images" / "wheel" / f"{name}.svg").is_file(), name
images = "const xy=[" + ",".join(
    f'{{src:"../images/wheel/{name}.svg",alt:"Ilustração de {name}"}}' for name in art
) + "];"
script, count = re.subn(r'const Gl="https://pub-.*?;(?=function Oy\()', lambda _: images, script, count=1, flags=re.S)
assert count == 1, "Published demo image list changed"

demo = 'function Oy(){return Yt.jsx(_y,{images:xy,speed:4,className:"prepara-closing-grid"})}i(Oy,"TiltedGridHeroDemo");'
script, count = re.subn(r'function Oy\(\)\{.*?\}i\(Oy,"TiltedGridHeroDemo"\);', lambda _: demo, script, count=1, flags=re.S)
assert count == 1, "Published demo wrapper changed"
script, count = re.subn(r'function Dy\(\)\{.*?\}i\(Dy,"App"\);', 'function Dy(){return Yt.jsx(Oy,{})}i(Dy,"App");', script, count=1, flags=re.S)
assert count == 1, "Published preview entry point changed"
assert 'i(_y,"TiltedGridHero")' in script, "Original curved stream missing"
assert '@keyframes ${dt}' in script, "Original animation missing"
assert 'pub-940ccf6255b54fa799a9b01050e6c227' not in script, "Demo media still referenced"

target.parent.mkdir(parents=True, exist_ok=True)
target.write_text('''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Capas ilustradas do Prepara ASB/TSB</title><style>'''
    + stylesheet
    + '''</style><style>html,body,#root{width:100%;height:100%;margin:0;background:transparent!important}body{overflow:hidden}.prepara-closing-grid{position:relative;width:100%;height:100%;overflow:hidden;background:transparent}@media(prefers-reduced-motion:reduce){.prepara-closing-grid [class*="tgh-t-"]{animation-play-state:paused!important}}</style></head><body><div id="root"></div><script type="module">'''
    + script
    + '''</script></body></html>''')
print(target)
