# Highlight Testimonial Section — código publicado

Fonte: [componente no 21st.dev](https://21st.dev/@dhxwhy/components/highlight-testimonial-section), autor DHxWhy, licença MIT indicada na página. Inspeção pelo Chrome DevTools em 18/10/2026: o iframe público de preview carregava `https://cdn.21st.dev/dhxwhy/highlight-testimonial-section/default/bundle.1791683700164-5c8200f0-51b2-4261-9aba-db522f5e8bf6.html?theme=light`.

A aba `Component.tsx` exigia acesso à conta. O documento público do preview foi salvo em `../source/21st-highlight-testimonial-preview.html` (SHA-256 `011c26f478a07ed0f176272e8b43c525ad4ea31c4f5e68b8768ba5b20513eed3`). Ele contém o bundle compilado React, o CSS e a função original `Av`, identificada como `HighlightTestimonialSection`. A animação, os controles, a navegação por teclado e o tratamento de movimento reduzido dessa função foram preservados.

`scripts/adapt-proof-preview.py` substitui apenas os depoimentos de demonstração e seu invólucro, traduz rótulos de acessibilidade e monta `public/proof/index.html` com três relatos e suas capturas correspondentes. A página principal carrega esse documento em iframe. As frases e capturas vêm da página original do Prepara; não foram criadas fotos ou avaliações. O CSS adicional cuida do layout e do contraste do conteúdo adaptado.
