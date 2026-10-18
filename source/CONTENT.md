# Prepara ASB TSB — conteúdo público da landing page

Fonte: <https://www.preparaasbtsb.com.br/>. Captura integral em `index.html`; URLs, nomes originais e hashes das imagens em `assets.json`. Este arquivo organiza o conteúdo para a adaptação visual, sem validar alegações comerciais ou resultados além do que foi publicado.

Em 18/10/2026, as oito imagens únicas publicadas na página foram baixadas novamente e comparadas com os SHA-256 de `assets.json`: **8 de 8 correspondem byte a byte**. O acervo local inclui as mesmas imagens em `assets/` e em `../site/public/images/`.

## Marca e direção visual atual

- Logo: `assets/logo-prepara-asb-tsb.png`.
- Professor: `assets/professor-diego-thiers.jpg` (a página identifica a pessoa como Prof. Diego Thiers).
- Imagem da primeira dobra: `assets/hero-concurseira-concursada.jpg` (arte aspiracional com uma mulher; a página não a identifica como professora nem como aluna).
- Cores declaradas no HTML: coral `#F06B66`, azul escuro `#1A242F`, fundo claro `#F8FAFC`. Tipos: Montserrat nos títulos, Inter no corpo.
- Dependências externas: Tailwind via CDN, Font Awesome e Google Fonts; endereços em `assets.json`. Não há vídeo ou formulário na landing page capturada.

## Mensagem e oferta publicada

- Título: “A forma mais rápida de sair do zero e conquistar sua vaga em concursos para ASB e TSB”.
- Subtítulo: “Mesmo sem saber por onde começar. Método validado por centenas de alunos aprovados, que decidiram parar de estudar errado e garantir estabilidade sem precisar virar noites estudando.”
- Dores citadas: falta de tempo, desorganização diante do edital e erros em questões de prova.
- Curso: mais de 60 videoaulas, oficina de questões com resolução em vídeo, PDFs, cronograma adaptável e simulados.
- Bônus apresentados: resumo de biossegurança, Lei 11.889 comentada e simulados extras.
- Professor: cirurgião-dentista formado pela UFRN, mestre em Ciências Morfofuncionais e doutorando em Patologia pela UFC, conforme o texto da página. A página afirma “+3.000 alunos treinados”.
- Oferta exibida na landing page: de R$ 349,90 por R$ 179,90 à vista ou 12 × R$ 18,90; garantia de 7 dias; acesso por 12 meses; suporte em até 24 horas úteis, conforme FAQ.
- Checkout observado em 18/10/2026: R$ 179,90 à vista ou 12 × R$ 18,61 (total R$ 223,32). O parcelamento da landing page difere do checkout. Confirmar condição vigente antes de reutilizar preço ou desconto.
- CTA do topo leva ao marketplace da Hotmart; os demais CTAs levam a `https://hotm.io/prepara-ckt`, que redireciona ao checkout `pay.hotmart.com/U96541209M`.

## Depoimentos escritos publicados

| Pessoa | Resultado apresentado | Trecho da página | Captura correspondente encontrada |
|---|---|---|---|
| Antónia Santana | 1º lugar EBSERH | “Através do curso prepara e de toda a dedicação nos estudos [...] consegui o 1º lugar no concurso da Ebserh” | `assets/depoimento-ebserh-primeiro-lugar.jpg` |
| Nanny Marttins | 1º lugar escrita e prática | “Suas aulas fizeram a diferença para mim. Passei em primeiro lugar na escrita e em primeiro na prática!” | `assets/depoimento-primeiro-lugar.jpg` |
| Lucileide Barros | 1º lugar Prefeitura BH, segundo a página | “O melhor professor do mundo [...] super indico! Contribuiu demais” | Não há captura nominal correspondente entre as 5 imagens publicadas. |
| Gislaine Varela | 2º lugar Araçatuba | “Fiquei em 2º lugar na prefeitura de Araçatuba. Na hora da prova lembrava-me das suas palavras” | `assets/depoimento-aluno-felix-11.jpg` |
| Simone Borel | Aprovada em 2 concursos | “Fui aprovada em dois concursos graças aos seus métodos de estudo.” | Não há captura nominal correspondente entre as 5 imagens publicadas. |
| Eliandro | Aprovado EBSERH nacional, segundo a página | “Eu passei na Ebserh nacional. HU Unifap.” | Não há captura nominal correspondente entre as 5 imagens publicadas. |

As duas capturas restantes mostram uma conversa sobre aprovação na EBSERH em 2025 (`assets/depoimento-ebserh-2025.jpg`) e um comentário público de Lais Santiago agradecendo ao professor (`assets/depoimento-aluno-felix-10.jpg`). Elas não devem ser atribuídas a outro depoente. O usuário informou que os comentários são reais; as imagens aqui foram preservadas, sem verificação independente dos resultados ou autorização individual de uso fora do site de origem.

## Perguntas frequentes da página

1. **Trabalho o dia todo?** Aulas gravadas de 15 a 30 minutos, acessíveis no celular, tablet ou computador.
2. **Tempo de acesso?** 12 meses.
3. **Entrega?** Acesso Hotmart liberado por e-mail após aprovação do pagamento.
4. **Suporte?** Grupo VIP e dúvidas para o professor/equipe, com resposta anunciada em até 24 horas úteis.
5. **Uso da plataforma?** A página afirma que a equipe ajuda com dúvidas técnicas da Hotmart.

## Encaixe no novo layout

- **Hero:** usar o retrato real do professor para apresentar quem ensina; a arte rosa é material de campanha, sem identidade de aluno comprovada.
- **Método/programa:** mostrar o conteúdo efetivo do curso e uma amostra de aula ou questão, caso seja fornecida. A página de origem não publica essa amostra.
- **Resultados:** aproximar os três depoimentos com captura nominal correspondente da oferta; manter nome, resultado e fala vinculados à imagem correta.
- **Oferta:** usar preço, parcelamento, garantia e duração somente após conferência com o checkout atual.
- **Matrícula:** preservar o destino Hotmart; verificar a identidade e a medição dos CTAs antes de publicação.
