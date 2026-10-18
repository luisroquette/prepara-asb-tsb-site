"""Keep the published 21st.dev folder implementation; replace only its demo data."""

from pathlib import Path
import re


site = Path(__file__).resolve().parents[1]
source = site / "source" / "21st-glass-folder-preview.html"
target = site / "public" / "folders" / "index.html"
original = source.read_text()

script = re.search(r'<script type="module" crossorigin>(.*?)</script>', original, re.S).group(1)
stylesheet = re.search(r'<style rel="stylesheet" crossorigin>(.*?)</style>', original, re.S).group(1)

demo = '''function Ug(){
  const width=Math.min(340,window.innerWidth-96);
  const select=X=>{const detail=document.getElementById("folder-detail");if(detail)detail.textContent=X.name+" · "+X.meta};
  return B.jsxs("div",{className:"prepara-board",children:[
    B.jsxs("div",{className:"prepara-folder-grid",children:[
      B.jsx(yc,{label:"Aulas",meta:"+60 videoaulas",art:"aurora",seed:3,action:"none",width,appearDelay:0,onFileSelect:select,files:[
        {name:"Videoaulas",meta:"Mais de 60 aulas gravadas",art:"aurora"},
        {name:"Saúde bucal",meta:"Preparação para ASB e TSB"},
        {name:"Estudo no seu ritmo",meta:"Conteúdo gravado"}
      ]}),
      B.jsx(yc,{label:"Prática",meta:"Questões e simulados",art:"dusk",seed:7,action:"none",width,appearDelay:140,onFileSelect:select,files:[
        {name:"Oficina de questões",meta:"Resoluções em vídeo",art:"dusk"},
        {name:"Simulados",meta:"Treino para a prova"},
        {name:"Simulados extras",meta:"Conteúdo bônus"}
      ]}),
      B.jsx(yc,{label:"Materiais",meta:"PDFs e cronograma",art:"ember",seed:11,action:"none",width,appearDelay:280,onFileSelect:select,files:[
        {name:"PDFs de apoio",meta:"Material para estudar e revisar",art:"ember"},
        {name:"Cronograma",meta:"Adaptável à sua rotina"},
        {name:"Biossegurança",meta:"Resumo bônus"},
        {name:"Lei 11.889",meta:"Versão comentada"}
      ]})
    ]}),
    B.jsx("p",{id:"folder-detail",className:"prepara-folder-detail",role:"status",children:"Abra uma pasta para explorar o conteúdo do curso."})
  ]})
}f(Ug,"GlassFolderCardsDemo");'''

script, demo_count = re.subn(
    r'function Ug\(\)\{.*?\}f\(Ug,"GlassFolderCardsDemo"\);',
    lambda _: demo,
    script,
    count=1,
    flags=re.S,
)
assert demo_count == 1, "Original demo entry point changed"
script, app_count = re.subn(
    r'function Ng\(\)\{.*?\}f\(Ng,"App"\);',
    'function Ng(){return B.jsx(Ug,{})}f(Ng,"App");',
    script,
    count=1,
    flags=re.S,
)
assert app_count == 1, "Original preview app entry point changed"
assert 'f(yc,"GlassFolder")' in script, "Original GlassFolder implementation missing"

target.parent.mkdir(parents=True, exist_ok=True)
target.write_text('''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Conteúdo do Prepara ASB/TSB</title><style>'''
    + stylesheet
    + '''</style><style>html,body,#root{margin:0;width:100%;min-height:100%;background:transparent!important}body{overflow-x:hidden}.prepara-board{min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 12px;color:#211c2f}.prepara-folder-grid{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:34px 24px;width:100%}.prepara-folder-detail{font:600 12px/1.5 Arial,sans-serif;letter-spacing:.02em;text-align:center;min-height:20px;margin:36px 0 0;color:#625772}</style></head><body><div id="root"></div><script type="module">'''
    + script
    + '''</script></body></html>''')
print(target)
