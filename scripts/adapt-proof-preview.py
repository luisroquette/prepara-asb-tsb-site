"""Preserve the published 21st.dev animation and replace its demo content."""

from pathlib import Path
import re


site = Path(__file__).resolve().parents[1]
source = site.parent / "source" / "21st-highlight-testimonial-preview.html"
target = site / "public" / "proof" / "index.html"
original = source.read_text()

script = re.search(r'<script type="module" crossorigin>(.*?)</script>', original, re.S).group(1)
stylesheet = re.search(r'<style rel="stylesheet" crossorigin>(.*?)</style>', original, re.S).group(1)

testimonials = '''const zv=[
  {quote:"Deus abençoou e eu consegui o 1º lugar no concurso da Ebserh no HU da minha cidade. Muito feliz!",highlight:"1º lugar no concurso da Ebserh",author:"Antónia Santana",role:"1º lugar · EBSERH",shot:"../images/depoimento-ebserh-primeiro-lugar.jpg",shotAlt:"Captura original do depoimento de Antónia Santana"},
  {quote:"Passei em primeiro lugar na escrita e em primeiro na prática!",highlight:"primeiro lugar na escrita e em primeiro na prática",author:"Nanny Marttins",role:"1º lugar · prova escrita e prática",shot:"../images/depoimento-primeiro-lugar.jpg",shotAlt:"Captura original do depoimento de Nanny Marttins"},
  {quote:"Fiquei em 2º lugar na prefeitura de Araçatuba. Na hora da prova lembrava-me das suas palavras, lembrava-me do que falava nos vídeos e nas apostilas.",highlight:"2º lugar na prefeitura de Araçatuba",author:"Gislaine Varela",role:"2º lugar · Araçatuba",shot:"../images/depoimento-aluno-felix-11.jpg",shotAlt:"Captura original do depoimento de Gislaine Varela"}
];'''
script, data_count = re.subn(r'const zv=\[.*?\];(?=function _v\()', lambda _: testimonials, script, count=1, flags=re.S)
assert data_count == 1, "Published testimonial demo data changed"
for filename in (
    "depoimento-ebserh-primeiro-lugar.jpg",
    "depoimento-primeiro-lugar.jpg",
    "depoimento-aluno-felix-11.jpg",
):
    assert (site / "public" / "images" / filename).is_file(), f"Missing original capture: {filename}"

demo = '''function _v(){
  const[q,H]=al.useState(0);
  const[ready,setReady]=al.useState(false);
  al.useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)");const update=()=>setReady(!media.matches);update();media.addEventListener("change",update);return()=>media.removeEventListener("change",update)},[]);
  return K.jsxs("div",{className:"prepara-proof",children:[
    K.jsx("div",{className:"prepara-proof-copy",children:K.jsx(Av,{testimonials:zv,index:q,onIndexChange:H,interval:ready?7000:0,eyebrow:"RESULTADOS EM PRIMEIRA PESSOA"})}),
    K.jsxs("figure",{className:"prepara-proof-image",children:[
      K.jsx("a",{href:zv[q].shot,target:"_blank",rel:"noopener noreferrer",title:"Abrir captura original de "+zv[q].author,children:K.jsx("img",{src:zv[q].shot,alt:zv[q].shotAlt})}),
      K.jsxs("figcaption",{children:[zv[q].author," · Abrir captura original ↗"]})
    ]})
  ]})
}f(_v,"HighlightTestimonialSectionDemo");'''
script, demo_count = re.subn(
    r'function _v\(\{.*?\}f\(_v,"HighlightTestimonialSectionDemo"\);',
    lambda _: demo,
    script,
    count=1,
    flags=re.S,
)
assert demo_count == 1, "Published demo entry point changed"
script, app_count = re.subn(
    r'function Mv\(\)\{.*?\}f\(Mv,"App"\);',
    'function Mv(){return K.jsx(_v,{})}f(Mv,"App");',
    script,
    count=1,
    flags=re.S,
)
assert app_count == 1, "Published preview entry point changed"
assert 'f(Av,"HighlightTestimonialSection")' in script, "Original animation implementation missing"
for english, portuguese in {
    '"Customer testimonials"': '"Depoimentos de alunos"',
    '"Choose a testimonial"': '"Escolha um depoimento"',
    '"Previous testimonial"': '"Depoimento anterior"',
    '"Next testimonial"': '"Próximo depoimento"',
    '`Show testimonial ${el+1} of ${w}`': '`Mostrar depoimento ${el+1} de ${w}`',
}.items():
    assert english in script, f"Missing interface label: {english}"
    script = script.replace(english, portuguese)

target.parent.mkdir(parents=True, exist_ok=True)
target.write_text('''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Depoimentos do Prepara ASB/TSB</title><style>'''
    + stylesheet
    + '''</style><style>html,body,#root{margin:0;width:100%;height:100%;background:transparent!important}body{overflow-x:hidden}.prepara-proof{width:100%;height:100%;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:48px;padding:40px 54px;color:#211c2f}.prepara-proof-copy{min-width:0}.prepara-proof [data-promoted]{font-size:clamp(29px,3vw,45px);line-height:1.08;letter-spacing:-.045em;min-height:100px;color:#291a39}.prepara-proof [data-card]{background:#fff;border-color:#e8dcef;box-shadow:0 18px 55px #36224714}.prepara-proof [data-quote]{font-size:18px;line-height:1.65}.prepara-proof [data-highlight]{background-image:linear-gradient(90deg,#f6cae8,#f6cae8)!important}.prepara-proof [data-dot][aria-pressed=true]{background:#7148ee!important}.prepara-proof-image{height:500px;margin:0;padding:16px;background:#fff;border:1px solid #e9ddeb;border-radius:22px;box-shadow:0 24px 70px #25112c1b;display:flex;flex-direction:column;align-items:center}.prepara-proof-image a{min-height:0;flex:1;width:100%;display:flex;align-items:center;justify-content:center;overflow:hidden}.prepara-proof-image img{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;border-radius:8px}.prepara-proof-image figcaption{padding-top:12px;font:600 11px/1.3 Arial,sans-serif;color:#625772;text-align:center}@media(max-width:760px){.prepara-proof{grid-template-columns:1fr;gap:20px;padding:22px 18px}.prepara-proof [data-promoted]{font-size:29px;min-height:70px}.prepara-proof [data-quote]{font-size:16px}.prepara-proof [data-card] figcaption{flex-wrap:wrap}.prepara-proof [data-card] figcaption>div:first-child{width:100%}.prepara-proof [data-card] figcaption>div:last-child{margin-left:auto}.prepara-proof-image{height:345px}}</style></head><body><div id="root"></div><script type="module">'''
    + script
    + '''</script></body></html>''')
print(target)
