import Hero from "./Hero";
import MethodTimeline from "./MethodTimeline";
import { WorksWheel } from "./WorksWheel";
import { SocialCard } from "./SocialCard";
import ScrollEffects from "./ScrollEffects";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const image = (name: string) => `${basePath}/images/${name}`;
const checkout = "https://hotm.io/prepara-ckt";

const studyParts = [
  { title: "Aulas em vídeo", image: image("wheel/aulas.svg"), detail: "Mais de 60 aulas gravadas para estudar no seu ritmo." },
  { title: "Questões comentadas", image: image("wheel/questoes.svg"), detail: "Oficina de questões com resolução em vídeo." },
  { title: "Simulados", image: image("wheel/simulados.svg"), detail: "Prática para reconhecer o formato da prova." },
  { title: "PDFs de apoio", image: image("wheel/pdfs.svg"), detail: "Material de consulta para acompanhar e revisar." },
  { title: "Cronograma adaptável", image: image("wheel/cronograma.svg"), detail: "Um plano para encaixar o estudo na sua rotina." },
  { title: "Revisão essencial", image: image("wheel/revisao.svg"), detail: "Bônus de biossegurança e Lei 11.889 comentada." },
];

const stories = [
  {
    name: "Antónia Santana",
    result: "1º lugar · EBSERH",
    shot: "depoimento-ebserh-primeiro-lugar.jpg",
    width: 963,
    height: 1600,
  },
  {
    name: "Nanny Marttins",
    result: "1º lugar · prova escrita e prática",
    shot: "depoimento-primeiro-lugar.jpg",
    width: 661,
    height: 490,
  },
  {
    name: "Gislaine Varela",
    result: "2º lugar · Araçatuba",
    shot: "depoimento-aluno-felix-11.jpg",
    width: 1080,
    height: 1146,
  },
];

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <header className="site-header">
        <a href="#topo" className="brand" aria-label="Prepara ASB TSB, início">
          <Image src={image("logo-prepara-asb-tsb.png")} alt="Prepara ASB TSB" width={2000} height={666} priority />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#metodo">O método</a>
          <a href="#resultados">Resultados</a>
          <a href="#professor">Professor</a>
          <a href="#perguntas-frequentes">Dúvidas</a>
        </nav>
        <a className="header-cta" href="#matricula">Quero me preparar <span aria-hidden="true">↗</span></a>
      </header>

      <main id="topo">
        <Hero />

        <section className="intro section-shell" id="metodo" aria-labelledby="intro-title">
          <div className="section-kicker"><span className="dot" /> UM PLANO PARA SAIR DO LUGAR</div>
          <div className="intro-grid" data-scroll-reveal>
            <h2 id="intro-title">O edital parece enorme. <em>Seu próximo passo não precisa ser.</em></h2>
            <div className="intro-copy">
              <p>Entre trabalho, casa e uma lista interminável de conteúdos, é fácil sentir que estudar nunca é suficiente. O Prepara ASB/TSB organiza o caminho para você saber o que estudar, praticar e revisar.</p>
              <a className="text-link" href="#curso">Veja o que está dentro <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <MethodTimeline />

        <section className="course" id="curso" aria-labelledby="course-title">
          <div className="section-shell course-inner">
            <div className="course-heading" data-scroll-reveal>
              <div>
                <div className="section-kicker light"><span className="dot" /> DENTRO DO PREPARA</div>
                <h2 id="course-title">Tudo o que você precisa para <em>estudar com intenção.</em></h2>
              </div>
              <p>Conteúdo feito para concursos de Auxiliar e Técnico em Saúde Bucal. Da primeira aula até a revisão antes da prova.</p>
            </div>
            <div className="course-board">
              <iframe src={`${basePath}/folders/`} title="Pastas interativas com aulas, prática e materiais do curso" loading="lazy" className="folder-frame" />
            </div>
          </div>
        </section>

        <section className="study-wheel" id="frentes" aria-labelledby="study-wheel-title">
          <div className="section-shell">
            <div className="study-wheel-heading" data-scroll-reveal>
              <div><div className="section-kicker"><span className="dot" /> AS PEÇAS DO SEU PREPARO</div><h2 id="study-wheel-title">Um curso. <em>Várias formas de avançar.</em></h2></div>
              <p>Conheça as frentes de estudo publicadas pelo Prepara. Elas fazem parte da mesma preparação para concursos de ASB e TSB.</p>
            </div>
            <div className="study-wheel-stage"><WorksWheel items={studyParts} label="Seu preparo" action="" /></div>
            <p className="study-wheel-hint">Role ou arraste para percorrer as frentes. Use as setas do teclado quando a roda estiver em foco.</p>
            <ol className="study-wheel-details">{studyParts.map((part, index) => <li key={part.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{part.title}</h3><p>{part.detail}</p></div></li>)}</ol>
          </div>
        </section>

        <section className="professor section-shell" id="professor" aria-labelledby="professor-title">
          <div className="professor-portrait" data-scroll-reveal><Image src={image("professor-diego-thiers.jpg")} alt="Professor Diego Thiers" width={1536} height={1024} /></div>
          <div className="professor-text" data-scroll-reveal>
            <div className="section-kicker"><span className="dot" /> QUEM ESTÁ DO SEU LADO</div>
            <h2 id="professor-title">Ciência, didática e prática de prova. <em>Com Diego Thiers.</em></h2>
            <p>Cirurgião-dentista formado pela UFRN, mestre em Ciências Morfofuncionais e doutorando em Patologia pela UFC. O professor Diego Thiers criou o Prepara para ajudar candidatos a estudar com clareza e constância.</p>
            <a className="text-link" href="#resultados">Veja o que os alunos contam <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="results" id="resultados" aria-labelledby="results-title">
          <div className="section-shell">
            <div className="results-heading" data-scroll-reveal><div className="section-kicker"><span className="dot" /> VOZES REAIS</div><h2 id="results-title">A melhor prova de um curso está <em>em quem estudou com ele.</em></h2><p>Leia o relato e confira a mensagem original. Os resultados abaixo foram apresentados pelos alunos na página do Prepara.</p></div>
            <div className="results-feature"><iframe src={`${basePath}/proof/`} title="Depoimentos animados com capturas originais de três alunos" loading="lazy" className="proof-frame" /></div>
            <div className="proof-archive-heading"><h3>As mensagens, na íntegra.</h3><p>Abra cada captura para ler o conteúdo no tamanho original.</p></div>
            <div className="proof-3d"><iframe src={`${basePath}/3d-proof/`} title="Depoimentos reais em cartões com movimento tridimensional" loading="lazy" className="proof-3d-frame" /></div>
            <div className="proof-captures" aria-label="Capturas originais dos depoimentos">
              {stories.map((story) => <figure key={story.name}>
                <a href={image(story.shot)} target="_blank" rel="noopener noreferrer" aria-label={`Abrir captura original do depoimento de ${story.name}`}><Image src={image(story.shot)} alt={`Captura do depoimento de ${story.name}`} width={story.width} height={story.height} /></a>
                <figcaption>{story.name} · {story.result} ↗</figcaption>
              </figure>)}
              <figure><a href={image("depoimento-ebserh-2025.jpg")} target="_blank" rel="noopener noreferrer" aria-label="Abrir conversa publicada sobre aprovação na EBSERH em 2025"><Image src={image("depoimento-ebserh-2025.jpg")} alt="Conversa publicada sobre aprovação na EBSERH em 2025" width={851} height={1280} /></a><figcaption>Aprovação na EBSERH em 2025 ↗</figcaption></figure>
              <figure><a href={image("depoimento-aluno-felix-10.jpg")} target="_blank" rel="noopener noreferrer" aria-label="Abrir comentário público de Lais Santiago"><Image src={image("depoimento-aluno-felix-10.jpg")} alt="Comentário público de Lais Santiago ao professor" width={411} height={1280} /></a><figcaption>Comentário de Lais Santiago ↗</figcaption></figure>
            </div>
            <p className="results-note">Depoimentos individuais não garantem o mesmo resultado para todos. Preparação e desempenho dependem de cada candidato.</p>
          </div>
        </section>

        <section className="enrollment section-shell" id="matricula" aria-labelledby="enrollment-title">
          <div className="enrollment-card" data-scroll-reveal>
            <div className="enrollment-copy"><div className="section-kicker light"><span className="dot" /> SEU PRÓXIMO PASSO</div><h2 id="enrollment-title">Pare de esperar o momento perfeito para começar.</h2><p>Comece com direção, pratique com método e avance no tempo que você tem.</p><div className="enrollment-tags"><span>12 meses de acesso</span><span>7 dias de garantia</span><span>Estude no seu ritmo</span></div></div>
            <div className="enrollment-action"><span>INVESTIMENTO PUBLICADO</span><div className="price">R$ 179,90</div><small>Condições finais e parcelamento no checkout da Hotmart.</small><a className="buy-button" href={checkout} target="_blank" rel="noopener noreferrer">Quero começar a estudar <span aria-hidden="true">↗</span></a><p>Compra e acesso pela Hotmart.</p></div>
          </div>
        </section>

        <section className="faq section-shell" id="perguntas-frequentes" aria-labelledby="faq-title">
          <div data-scroll-reveal>
            <div className="section-kicker"><span className="dot" /> DÚVIDAS FREQUENTES</div>
            <h2 id="faq-title">Perguntas frequentes sobre o <em>Prepara ASB/TSB.</em></h2>
            <p className="faq-intro">O Prepara ASB/TSB é um curso online de preparação para concursos de Auxiliar e Técnico em Saúde Bucal, com aulas gravadas, questões e um plano de estudos.</p>
          </div>
          <div className="faq-list" data-scroll-reveal>
            <details open><summary>Para quais concursos serve o Prepara ASB/TSB?</summary><p>O curso prepara candidatos a concursos públicos de Auxiliar em Saúde Bucal (ASB) e Técnico em Saúde Bucal (TSB). O cronograma adaptável ajuda a organizar o estudo dos conteúdos do curso conforme sua rotina.</p></details>
            <details><summary>O que está incluído no curso preparatório de ASB e TSB?</summary><p>O Prepara inclui mais de 60 videoaulas, oficina de questões com resolução em vídeo, PDFs das aulas, cronograma adaptável e simulados. A oferta também apresenta materiais de biossegurança e da Lei 11.889 comentada.</p></details>
            <details><summary>Trabalho o dia todo. Consigo estudar no meu ritmo?</summary><p>Sim. As aulas são gravadas, duram de 15 a 30 minutos segundo a página original do curso e podem ser assistidas pelo celular, tablet ou computador.</p></details>
            <details><summary>Por quanto tempo terei acesso às aulas?</summary><p>A oferta do Prepara ASB/TSB informa 12 meses de acesso ao curso online.</p></details>
            <details><summary>Como recebo o acesso depois da compra?</summary><p>Após a aprovação do pagamento, os dados de acesso à Hotmart são enviados ao e-mail usado na compra. Na plataforma, você pode assistir às aulas e baixar os PDFs.</p></details>
            <details><summary>Posso tirar dúvidas com o professor Diego Thiers?</summary><p>Sim. A oferta informa acesso a um grupo VIP de estudos e suporte do professor e da equipe, com resposta anunciada em até 24 horas úteis.</p></details>
            <details><summary>Nunca usei a Hotmart. Como acesso o curso?</summary><p>Você pode entrar na Hotmart pelo site ou aplicativo. A equipe do Prepara informa que ajuda com dúvidas técnicas de acesso à plataforma.</p></details>
            <details><summary>O curso tem garantia?</summary><p>A oferta anuncia garantia de 7 dias. Confira as condições vigentes no checkout da Hotmart antes de finalizar a compra.</p></details>
          </div>
        </section>

        <section className="closing section-shell" id="encerramento" aria-labelledby="closing-title">
          <div className="closing-stage">
            <iframe src={`${basePath}/closing/`} title="Capas do Prepara em uma faixa curva animada" loading="lazy" aria-hidden="true" tabIndex={-1} className="closing-motion" />
            <div className="closing-content" data-scroll-reveal>
              <div><div className="section-kicker"><span className="dot" /> ANTES DA PRÓXIMA PROVA</div><h2 id="closing-title">Transforme o próximo estudo <em>em um passo real.</em></h2></div>
              <div className="closing-action"><p>Aulas, prática e revisão no mesmo caminho para concursos de ASB e TSB.</p><a href={checkout} target="_blank" rel="noopener noreferrer">Começar com o Prepara <span aria-hidden="true">↗</span></a><small>Compra e acesso pela Hotmart.</small></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-shell footer-inner">
          <div className="footer-copy" data-scroll-reveal><Image src={image("logo-prepara-asb-tsb.png")} alt="Prepara ASB TSB" width={2000} height={666} /><p>Um plano de estudo para o seu próximo passo em saúde bucal.</p><h2>O estudo continua nas nossas redes.</h2><span>Aulas, questões e novidades com o professor Diego Thiers.</span></div>
          <div className="footer-social" data-scroll-reveal><SocialCard /><p>Passe o cursor ou toque nos ícones para acessar Instagram e YouTube.</p></div>
        </div>
        <div className="section-shell footer-bottom"><span>© 2026 Prepara ASB TSB</span><a href="#topo">Voltar ao topo ↑</a></div>
      </footer>
    </>
  );
}
