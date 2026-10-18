# Aurora — mapa do código extraído no DevTools

Inspeção da página pública `https://aurora-template.modulify.website/` em 18/10/2026, pelo Chrome DevTools Protocol (`Page.getResourceTree` e `Page.getResourceContent`). O servidor não expunha source maps. Os arquivos em `public/aurora/_next/static/` são os bundles publicados, com mudanças localizadas de caminhos e texto.

| Trecho no bundle `0c3z-90flfp5o.js` | Código real encontrado |
|---|---|
| `let iI=` | Configuração base do ribbon, incluindo câmera, geometria, cor e luz. |
| `function iU({config:` | Componente React que cria o renderer WebGL, os shaders e o canvas Three.js. |
| `i0=[{id:"stream"` | Presets Stream, Cascade, Veil, Ember e Dusk com parâmetros numéricos originais. |
| `className:"aurora-canvas` | Animação de entrada GSAP e sobreposição do canvas ao texto. |
| `Build interfaces that move people.` na origem | Camadas de texto, botões e seletor de presets do componente original. |

O chunk Three.js é `02y6c_gs73h-x.js`, carregado dinamicamente pelo módulo `2404` registrado em `03gdk88_c18fa.js`. O CSS publicado é `0lj8og056z7th.css`. Hashes SHA-256 da extração original, antes das adaptações:

```text
4e62bd2e35face0cc9ce0425f6662d981c1759ded3ea309fbf38cbcfa5356092  0c3z-90flfp5o.js
8f9209a18c9c313ad13f1b094356548d4b9bed3c245f501502bc8b0f67f3fdb9  02y6c_gs73h-x.js
79533ab93d4eb574d96a0449c5227c0a4703c8aaee38c452fdde8a72589b8a27  0lj8og056z7th.css
```

Alterações locais: trocar cópia do hero no HTML e no bundle para manter hidratação consistente; tornar caminhos de recursos relativos para funcionar em subdiretórios; retirar a chamada de analytics do site de demonstração; esconder Dusk e Tune; acrescentar `adapter.js` para alternar Stream, Cascade, Veil e Ember a cada 8 segundos, ocultar o seletor visual e levar os CTAs às seções da landing page. O shader, os valores dos presets e a animação de entrada continuam os originais.

Esta extração serve ao protótipo local. A permissão de publicação e distribuição do código deve ser confirmada antes da entrega.
