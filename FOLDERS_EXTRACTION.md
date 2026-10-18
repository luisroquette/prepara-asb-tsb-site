# Glassmorphism Folder Cards — código publicado

Fonte: [página do componente](https://21st.dev/@kedhareswer/components/glass-folder-cards), autor Kedhareswer Naidu, indicação de licença MIT. Inspeção pelo Chrome DevTools em 18/10/2026: o iframe de preview carregava `https://cdn.21st.dev/kedhareswer/glass-folder-cards/default/bundle.1791785999938-44a040f8-6f3a-44cb-96a2-dbb978781ac2.html?theme=light`.

A aba `Component.tsx` estava bloqueada na interface. O documento público do preview, salvo em `source/21st-glass-folder-preview.html`, inclui o bundle compilado React, o CSS, a função `yc` identificada como `GlassFolder` e as rotinas de arte, entrada, inclinação, abertura e expansão de arquivos. SHA-256 da captura: `ba3ca68de6ae011ceaba83430b248fde17eb70a6f250d5d6d26d2b8b4adcfdb5`.

`scripts/adapt-folder-preview.py` extrai o script e CSS publicados, troca apenas a função de demonstração `Ug` pelos dados confirmados do Prepara e o ponto de entrada `Ng` para dispensar o invólucro do preview. O restante do bundle, inclusive `GlassFolder`, permanece intacto em `public/folders/index.html`. O arquivo inclui um pequeno CSS de posicionamento e é carregado sob demanda em um iframe. Não houve reprodução visual manual da animação.
