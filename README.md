# Prepara ASB/TSB — proposta de landing page

Código da proposta em Next.js App Router com exportação estática. O texto e as imagens do curso vêm da captura em `../source/`.

## Rodar localmente

```sh
npm ci
npm run dev
```

Abra `http://localhost:3000/`. O gate de typecheck, lint e testes é `mac-gate npm run preflight:ci`. O build Next deve rodar apenas no Vercel Preview, conforme a regra global do projeto.

## Hero Aurora

O hero em `public/aurora/` preserva os bundles compilados da página pública [Aurora](https://aurora-template.modulify.website/) inspecionados no Chrome DevTools em 18/10/2026. O arquivo `0c3z-90flfp5o.js` contém o componente, os shaders, a animação e os presets originais; `02y6c_gs73h-x.js` contém o chunk Three.js carregado por ele. O HTML, CSS e os caminhos dos chunks foram adaptados para funcionar como documento estático local dentro de um iframe. `adapter.js` avança Stream, Cascade, Veil e Ember a cada 8 segundos e encaminha os CTAs para as seções da página. A animação automática respeita `prefers-reduced-motion`.

O selo do Modulify foi mantido. [A documentação da plataforma](https://modulify.ai/docs/editor/settings) diz que ocultá-lo na publicação exige plano pago; [os termos](https://modulify.ai/legal/terms) restringem scraping e engenharia reversa da plataforma. **Antes de publicar ou entregar esta proposta, confirmar a autorização para usar e distribuir o código do template** ou obter o código por um fluxo oficial de clone/exportação.

## Pastas do curso

As pastas em `public/folders/index.html` usam o código **compilado original** do [Glassmorphism Folder Cards](https://21st.dev/@kedhareswer/components/glass-folder-cards), publicado sob licença MIT. O bundle e CSS foram extraídos do iframe público do preview pelo Chrome DevTools em 18/10/2026; a aba `Component.tsx` exigia desbloqueio, portanto o TSX original não está disponível neste checkout. A captura original fica em `../source/21st-glass-folder-preview.html`. `scripts/adapt-folder-preview.py` troca somente a demo pelos dados verificados do curso e gera o iframe local. O componente, suas animações e shaders permanecem os do preview. O iframe carrega sob demanda na seção do curso.

## Conteúdo a confirmar antes de publicar

- Preço: o checkout observado em 18/10/2026 mostrava R$ 179,90; parcelamento diferia da landing page antiga.
- Direitos de uso das capturas de depoimentos fora da página original.
- Destino final e atribuição de todos os CTAs da Hotmart.

Não há Git remote neste checkout. Por isso, ainda não há PR nem Vercel Preview deste site.
