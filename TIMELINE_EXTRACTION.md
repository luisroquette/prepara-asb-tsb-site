# Product Timeline — código publicado

Fonte: [Product Timeline no 21st.dev](https://21st.dev/@hyperiux/components/timeline), por Hyperiux Vault; a página indica licença MIT. Inspeção pelo Chrome DevTools em 18/10/2026: o preview público carregava `https://cdn.21st.dev/hyperiux/timeline/default/bundle.1789984830897-437e75fb-2661-4d71-9dca-053df95e0256.html?theme=light`.

A aba `Component.tsx` estava bloqueada. O HTML público do preview foi preservado em `../source/21st-product-timeline-preview.html` (SHA-256 `c4ded0660045b73609a07e23e0f66f7f6aa6e036af2b8f7eb48fde2c38bd9c74`). Ele contém o bundle React, CSS e a função original `S2` identificada como `Timeline`, incluindo GSAP, pinagem, movimento horizontal e tratamento de movimento reduzido.

`scripts/adapt-timeline-preview.py` mantém a função, ajusta apenas o deslocamento final no celular para seis marcos, e troca os dados de demonstração, o invólucro e a entrada do preview. As seis etapas vêm de `app/method-steps.json`. O `MethodTimeline.tsx` sincroniza a rolagem da página com o documento incorporado, para que o efeito original funcione sem uma barra de rolagem dentro do iframe. Quando o usuário prefere movimento reduzido, a página mostra a lista estática das seis etapas.
