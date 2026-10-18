# Prepara ASB/TSB — pacote para importar no Lovable

Este repositório público contém a landing page, imagens e seis componentes animados. Compare a importação com a [versão publicada](https://prepara-asb-tsb.vercel.app/).

**Estado em 18/10/2026:** landing page publicada e pacote de transferência pronto. A importação no Lovable e a troca do domínio original são etapas separadas.

## 1. Baixar e importar

1. No [GitHub](https://github.com/luisroquette/prepara-asb-tsb-site), abra **Code → Download ZIP**. Também existe o [ZIP direto da `main`](https://github.com/luisroquette/prepara-asb-tsb-site/archive/refs/heads/main.zip). O arquivo já inclui este README, código e assets; `.env.local` e `node_modules` ficam de fora.
2. No dashboard do Lovable, use **+ → Import project to Lovable → Upload code**, envie o ZIP e clique em **Start import**. A [documentação oficial](https://docs.lovable.dev/features/projects/import-project) informa limite de 250 MB, consumo de créditos e liberação gradual da função. Se a opção não aparecer na conta, peça acesso ao recurso.
3. Depois da importação, cole o prompt abaixo no chat do novo projeto. Aguarde o relatório **Ready / Still needed** e resolva somente as pendências reais que ele identificar.

O [Git sync do Lovable](https://docs.lovable.dev/integrations/github) não importa este repositório existente: a entrada é o ZIP. Se ativar Git sync depois, o Lovable criará outro repositório. Defina qual será a fonte das futuras alterações para evitar versões divergentes. A importação não altera o site publicado na Vercel.

## 2. Prompt para colar no Lovable

```text
Importe este ZIP como a landing page Prepara ASB/TSB. Leia primeiro README.md, package.json, next.config.mjs, app/, public/ e os arquivos *_EXTRACTION.md. Compare o resultado com https://prepara-asb-tsb.vercel.app/ em desktop e celular.

Objetivo: fazer todas as seções, arquivos locais e interações funcionarem. A origem usa Next.js 16 com exportação estática. Se você migrar para a stack do Lovable, preserve o comportamento e os arquivos visuais existentes, inclusive public/aurora/_next/. Não substitua os efeitos por aproximações nem troque fotos ou depoimentos.

Rotas internas que devem responder HTTP 200 e carregar na página: /, /aurora/, /timeline/, /folders/, /proof/, /3d-proof/ e /closing/. Preserve a barra final nas seis rotas embutidas: /aurora/index.html e equivalentes deram 404 em um deploy anterior. Preserve também os caminhos relativos de JS, CSS, fontes e imagens em cada iframe.

Hero: Stream, Cascade, Veil e Ember alternam automaticamente a cada 8 segundos, sem controles de escolha visíveis. O efeito funciona como uma animação contínua, independente da rolagem; preserve a navegação normal da página. Os botões Conhecer o curso e Ver resultados devem enviar mensagens para a página principal e rolar até #curso e #resultados. Respeite prefers-reduced-motion, exibindo um hero estático.

Método: seis passos, animação vinculada ao scroll e conteúdo alternativo acessível. Curso: pastas interativas e Works Wheel com seis frentes do único curso. Resultados: cartões animados e capturas reais com nomes corretos e links para ampliar. Professor: use a foto de Diego Thiers. Preserve FAQ, matrícula, fechamento, redes sociais e encaixe de scroll.

Conectores: a versão atual não usa banco de dados, autenticação, formulário, API de pagamento ou chave secreta. Não crie Supabase, Lovable Cloud, Stripe, Hotmart API, conectores de Instagram/YouTube ou serviços pagos para reproduzir links estáticos. A matrícula abre https://hotm.io/prepara-ckt; Instagram e YouTube são links externos. Preserve os destinos e valide que abrem. Nunca peça credenciais no chat.

Preserve título, descrição, idioma pt-BR, FAQ e imagem Open Graph. Ajuste metadataBase/canonical e imagem social somente quando o domínio final do projeto importado for decidido. www.preparaasbtsb.com.br ainda é uma publicação separada.

Antes de dizer que terminou: teste desktop (1440 px) e celular (390 px), as sete rotas, seis iframes, botões do hero, navegação por âncoras, Works Wheel, pastas, provas sociais, oito perguntas do FAQ, checkout e redes sociais. Confira console, requisições com falha e overflow horizontal. Relate qualquer recurso que não conseguiu migrar ou dependência de autorização/licença. Não publique nem troque o domínio original sem decisão do responsável.
```

## 3. Mapa de rotas e integrações

| Parte | Código/arquivo | O que conecta |
|---|---|---|
| Página `/` | `app/page.tsx`, `app/globals.css`, `app/layout.tsx` | Conteúdo local, sem API |
| Hero `/aurora/` | `app/Hero.tsx`, `public/aurora/` | `postMessage` local para `#curso` e `#resultados`; bundles em `public/aurora/_next/` |
| Método `/timeline/` | `app/MethodTimeline.tsx`, `app/method-steps.json`, `public/timeline/` | `postMessage` local com progresso de scroll |
| Pastas `/folders/` | `public/folders/` | Interação local, sem conector |
| Depoimentos `/proof/` e `/3d-proof/` | `public/proof/`, `public/3d-proof/`, `public/images/depoimento-*` | Capturas locais e links para ampliar |
| Fechamento `/closing/` | `public/closing/` | Animação local |
| Works Wheel, FAQ e professor | `app/WorksWheel.tsx`, `app/page.tsx`, `public/images/` | Interação local |
| Matrícula | `app/page.tsx` | Link externo `https://hotm.io/prepara-ckt`; compra e acesso na Hotmart |
| Redes sociais | `app/SocialCard.tsx` | Links externos para `instagram.com/profdiegoth/` e `youtube.com/@ProfDiegoThiers` |

`source/` guarda a captura do site original e o inventário de conteúdo; não é rota nem banco. `scripts/` registra adaptações dos previews. `*_EXTRACTION.md` registra origem e licenças. `public/images/social-preview.png` é a imagem de compartilhamento. Para a landing page atual, **não há conector, chave ou variável de ambiente obrigatória**. Vercel hospeda a versão de referência, mas também não é um conector do app.

## 4. Rodar fora do Lovable

```sh
npm ci
npm run dev
```

Abra <http://localhost:3000/>. `NEXT_PUBLIC_BASE_PATH` é opcional e serve apenas para hospedar o site em um subcaminho. Não envie `.env` nem credenciais no ZIP. Neste repositório, typecheck, lint e testes rodam com `mac-gate npm run preflight:ci`; o `next build` roda só no Vercel Preview, conforme `AGENTS.md`. O Lovable deve testar e compilar também o projeto que resultar da migração.

## 5. Conferências antes de redistribuir

- O preço mostrado é **R$ 179,90**, observado em 18/10/2026. Confira preço, parcelamento, garantia e acesso no checkout vigente antes de divulgar a versão migrada.
- As capturas dos depoimentos vieram da página original. Confirme a autorização para reutilizá-las fora dela.
- O hero contém um bundle compilado do template Aurora da Modulify. Em 18/10/2026, o responsável pelo projeto informou que **validou a redistribuição do efeito Aurora**. O documento dessa validação não foi anexado ao repositório. Os demais efeitos têm origem e licença descritas nos arquivos `*_EXTRACTION.md`.
- `www.preparaasbtsb.com.br` não está conectado a este repositório. A referência usa `prepara-asb-tsb.vercel.app`. Só altere domínio e metadados de compartilhamento depois de decidir qual publicação será a oficial.
