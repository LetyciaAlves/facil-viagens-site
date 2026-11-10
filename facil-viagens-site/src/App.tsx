import { useState, type FormEvent } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3, Compass,
  Mail, MapPin, Menu, MessageCircle, Plane, Send, ShieldCheck, Sparkles,
  Ticket, Users, X, Camera, Heart, Globe2, CalendarDays, Phone
} from 'lucide-react';

const PHONE = '5583991083939';
const WHATSAPP = `https://wa.me/${PHONE}`;
const EMAIL = 'facilviagens@facilviagens.net';
const ADDRESS = 'Rua Cônego José Viana, nº 99, bairro Estação, Sousa – PB, CEP 58807-320';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ADDRESS);

const navItems = [
  ['Início', '#inicio'], ['Destinos', '#destinos'], ['Pacotes', '#pacotes'],
  ['Experiências', '#experiencias'], ['Promoções', '#promocoes'],
  ['Sobre nós', '#sobre'], ['Contato', '#contato']
];

const categories = ['Todos', 'Praia', 'Aventura', 'Família', 'Romântica', 'Internacional', 'Excursão', 'Outros'];

function whatsappUrl(message: string) {
  return `${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function PhotoImage({ src, alt, large = false, logo = false }: { src: string; alt: string; large?: boolean; logo?: boolean }) {
  return (
    <div className={`photo-placeholder photo-image ${large ? 'photo-placeholder-large' : ''} ${logo ? 'photo-image-logo' : ''}`}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description: string; light?: boolean }) {
  return (
    <div className={`section-heading ${light ? 'section-heading-light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [trip, setTrip] = useState({ destination: '', origin: 'Sousa – PB', date: '', passengers: '2', type: 'Praia' });
  const [contact, setContact] = useState({ name: '', phone: '', email: '', destination: '', message: '' });
  const [formError, setFormError] = useState('');
  const [formSent, setFormSent] = useState(false);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);


  const goTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submitTrip = (e: FormEvent) => {
    e.preventDefault();
    const message = [
      'Olá! Gostaria de solicitar informações sobre uma viagem.',
      `Destino desejado: ${trip.destination || 'Ainda não definido'}`,
      `Cidade de origem: ${trip.origin || 'Não informada'}`,
      `Data prevista: ${trip.date || 'A combinar'}`,
      `Passageiros: ${trip.passengers}`,
      `Tipo de viagem: ${trip.type}`
    ].join('\n');
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  };

  const submitContact = (e: FormEvent) => {
    e.preventDefault();
    if (!contact.name.trim() || !contact.phone.trim() || !contact.message.trim()) {
      setFormError('Preencha nome, telefone e mensagem para continuar.');
      setFormSent(false);
      return;
    }
    setFormError('');
    const message = [
      'Olá! Gostaria de falar com a Fácil Viagens.',
      `Nome: ${contact.name}`,
      `Telefone: ${contact.phone}`,
      `E-mail: ${contact.email || 'Não informado'}`,
      `Destino de interesse: ${contact.destination || 'Não informado'}`,
      `Mensagem: ${contact.message}`
    ].join('\n');
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
    setFormSent(true);
  };

  return (
    <div className="site-shell">
      <div className="topbar">
        <div className="container topbar-inner">
          <span><MapPin size={14} /> Sousa, Paraíba</span>
          <div className="topbar-right">
            <a href="tel:+5583991083939"><Phone size={14} /> (83) 99108-3939</a>
            <span className="topbar-separator" />
            <span><Clock3 size={14} /> Seg–Sex, 08h–18h · Sáb, 08h–12h</span>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a href="#inicio" className="brand" onClick={() => goTo('#inicio')} aria-label="Fácil Viagens, início">
            <span className="brand-mark"><Plane size={25} strokeWidth={2.2} /></span>
            <span className="brand-copy"><strong>fácil<span>viagens</span></strong><small>SEU PRÓXIMO DESTINO</small></span>
          </a>
          <nav className={`main-nav ${menuOpen ? 'main-nav-open' : ''}`} aria-label="Navegação principal">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={(e) => { e.preventDefault(); goTo(href); }}>{label}</a>
            ))}
            <a className="mobile-nav-cta" href={whatsappUrl('Olá! Gostaria de planejar uma viagem com a Fácil Viagens.')} target="_blank" rel="noreferrer">Planeje sua viagem <ArrowUpRight size={16} /></a>
          </nav>
          <a className="header-cta" href={whatsappUrl('Olá! Gostaria de planejar uma viagem com a Fácil Viagens.')} target="_blank" rel="noreferrer">
            Planeje sua viagem <ArrowUpRight size={16} />
          </a>
          <button className="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-backdrop">
            <div className="hero-grid" />
            <div className="hero-glow hero-glow-one" />
            <div className="hero-glow hero-glow-two" />
          </div>
          <div className="container hero-layout">
            <div className="hero-copy">
              <span className="hero-kicker"><Sparkles size={15} /> VIAJAR FICOU MAIS FÁCIL</span>
              <h1>Seu próximo destino <em>começa aqui.</em></h1>
              <p>Descubra lugares incríveis, viva experiências inesquecíveis e encontre a viagem perfeita para você com a Fácil Viagens.</p>
              <div className="hero-actions">
                <button className="btn btn-gold" onClick={() => goTo('#destinos')}>Explorar destinos <ArrowRight size={17} /></button>
                <a className="btn btn-outline-light" href={whatsappUrl('Olá! Gostaria de solicitar um orçamento de viagem.')} target="_blank" rel="noreferrer">Solicitar orçamento <ArrowUpRight size={17} /></a>
              </div>
              <div className="hero-note"><span className="note-line" /> Atendimento próximo, do primeiro plano à sua próxima viagem.</div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo-frame">
                <PhotoImage src="/images/logo-facil.jpeg" alt="Logo oficial da Fácil Viagens" large logo />
              </div>
              <div className="hero-stamp"><Compass size={25} /><span>O mundo<br />te espera</span></div>
              <div className="hero-floating-card"><span className="floating-icon"><Heart size={17} /></span><span><strong>Novas histórias</strong><small>começam com uma viagem</small></span></div>
            </div>
          </div>
          <div className="hero-bottom"><div className="container hero-bottom-inner"><span>Planeje com tranquilidade</span><ArrowDown size={16} /><span>Descubra novas possibilidades</span></div></div>
        </section>

        <section className="trip-search" aria-labelledby="trip-search-title">
          <div className="container">
            <div className="search-card">
              <div className="search-intro"><span className="search-icon"><Compass size={22} /></span><div><h2 id="trip-search-title">Vamos planejar sua próxima viagem?</h2><p>Conte um pouco sobre o que você procura.</p></div></div>
              <form className="trip-form" onSubmit={submitTrip}>
                <label className="field"><span>Destino desejado</span><input value={trip.destination} onChange={e => setTrip({...trip, destination:e.target.value})} placeholder="Para onde quer ir?" /></label>
                <label className="field"><span>Cidade de origem</span><input value={trip.origin} onChange={e => setTrip({...trip, origin:e.target.value})} placeholder="Ex.: Sousa – PB" /></label>
                <label className="field"><span>Data prevista</span><input type="date" value={trip.date} onChange={e => setTrip({...trip, date:e.target.value})} /></label>
                <label className="field field-small"><span>Passageiros</span><select value={trip.passengers} onChange={e => setTrip({...trip, passengers:e.target.value})}>{[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n} value={n}>{n} {n===1?'pessoa':'pessoas'}</option>)}</select></label>
                <label className="field"><span>Tipo de viagem</span><select value={trip.type} onChange={e => setTrip({...trip, type:e.target.value})}>{categories.slice(1).map(c=><option key={c}>{c}</option>)}</select></label>
                <button className="btn btn-primary search-submit" type="submit">Solicitar minha viagem <ArrowRight size={17} /></button>
              </form>
              <p className="search-disclaimer">Sua solicitação será enviada pelo WhatsApp. Valores, datas e disponibilidade serão confirmados pela equipe.</p>
            </div>
          </div>
        </section>

        <section className="section destinations-section" id="destinos">
          <div className="container">
            <SectionHeading eyebrow="ESCOLHA SEU CAMINHO" title="Destinos para sonhar" description="Cada viagem começa com uma ideia. Conte para nós o lugar que você deseja conhecer." />
            <div className="filter-row" role="group" aria-label="Filtrar destinos por tipo de viagem">
              {categories.map(c=><button key={c} className={`filter-chip ${activeFilter===c?'active':''}`} onClick={()=>setActiveFilter(c)}>{c}</button>)}
            </div>
            <div className="destination-empty-grid">
              {(activeFilter === 'Todos' ? [
                { type: 'Praia', title: 'Dias de praia e descanso', image: '/images/familia-praia.jpeg', description: 'Registros reais de momentos especiais à beira-mar.' },
                { type: 'Internacional', title: 'Orlando e Disney', image: '/images/disney-orlando.jpeg', description: 'Uma viagem em família para viver a magia de Orlando.' },
                { type: 'Excursão', title: 'Rio de Janeiro', image: '/images/cristo-redentor.jpeg', description: 'Experiências e passeios para conhecer novos lugares.' }
              ] : [{ type: activeFilter, title: ({ Praia: 'Praias e paisagens', Aventura: 'Passeios e aventura', Família: 'Viagens em família', Romântica: 'Viagens a dois', Internacional: 'Destinos internacionais', Excursão: 'Excursões e grupos', Outros: 'Outras experiências' } as Record<string,string>)[activeFilter] || activeFilter,
                image: ({ Praia: '/images/familia-praia.jpeg', Aventura: '/images/quadriciclo-praia.jpeg', Família: '/images/familia-guarda-chuvas.jpeg', Romântica: '/images/casal-paisagem.jpeg', Internacional: '/images/disney-orlando.jpeg', Excursão: '/images/cristo-redentor.jpeg', Outros: '/images/familia-passarela.jpeg' } as Record<string,string>)[activeFilter] || '/images/familia-praia.jpeg', description: 'Veja alguns registros reais de viagens e experiências.' }]).map((item,i)=><article className="destination-placeholder-card" key={item.type}>
                <PhotoImage src={item.image} alt={item.title} />
                <div className="destination-card-copy"><span className="card-index">0{i+1} / EXPERIÊNCIAS REAIS</span><h3>{item.title}</h3><p>{item.description}</p><a href={whatsappUrl(`Olá! Gostaria de consultar opções de viagem para ${item.title.toLowerCase()}.`)} target="_blank" rel="noreferrer">Consultar opções <ArrowUpRight size={15}/></a></div>
              </article>)}
            </div>
            <div className="section-footnote"><Camera size={16}/> Fotografias reais de viagens e experiências compartilhadas com a Fácil Viagens.</div>
          </div>
        </section>

        <section className="section packages-section" id="pacotes">
          <div className="container packages-layout">
            <div className="packages-text">
              <span className="eyebrow">VIAGENS DO SEU JEITO</span>
              <h2>Uma boa viagem começa com um bom planejamento.</h2>
              <p>Estamos preparando este espaço para apresentar os pacotes, excursões e condições comerciais confirmados pela Fácil Viagens.</p>
              <a className="btn btn-primary" href={whatsappUrl('Olá! Gostaria de conhecer os pacotes e excursões disponíveis.')} target="_blank" rel="noreferrer">Consultar pacotes <ArrowRight size={17}/></a>
              <div className="package-trust"><ShieldCheck size={18}/><span>Informações e condições confirmadas diretamente com a agência.</span></div>
            </div>
            <div className="package-preview">
              <div className="package-preview-top"><span>CATÁLOGO FÁCIL VIAGENS</span><Ticket size={18}/></div>
              <PhotoImage src="/images/casal-paisagem.jpeg" alt="Casal aproveitando uma paisagem de viagem" large />
              <div className="package-preview-bottom"><div><small>PRÓXIMOS PACOTES</small><strong>Viagens feitas de boas histórias</strong></div><span className="package-arrow"><ArrowUpRight size={22}/></span></div>
            </div>
          </div>
          <div className="container package-categories">
            {['Nacionais','Internacionais','Em família','Românticos','Excursões','Férias','Personalizados'].map((item,i)=><a key={item} href={whatsappUrl(`Olá! Gostaria de consultar viagens ${item.toLowerCase()}.`)} target="_blank" rel="noreferrer"><span>0{i+1}</span>{item}<ArrowUpRight size={15}/></a>)}
          </div>
        </section>

        <section className="section experiences-section" id="experiencias">
          <div className="container">
            <SectionHeading eyebrow="MOMENTOS QUE FICAM" title="Muito além do destino" description="Viagens são feitas de encontros, descobertas e histórias. Veja alguns registros reais de passeios, famílias e momentos compartilhados com a Fácil Viagens." />
            <div className="experience-gallery">
              <article className="experience-card experience-card-feature">
                <div className="experience-card-photo"><PhotoImage src="/images/quadriciclo-praia.jpeg" alt="Grupo de viajantes aproveitando um passeio de quadriciclo na praia" large /></div>
                <div className="experience-card-copy"><span className="experience-number">01 · AVENTURA</span><h3>Um dia de aventura à beira-mar</h3><p>Um passeio de quadriciclo com espaço para explorar a paisagem, sentir a brisa e aproveitar o caminho em grupo.</p></div>
              </article>
              <article className="experience-card">
                <div className="experience-card-photo"><PhotoImage src="/images/familia-guarda-chuvas.jpeg" alt="Família reunida em uma passarela decorada com guarda-chuvas coloridos" /></div>
                <div className="experience-card-copy"><span className="experience-number">02 · PASSEIOS EM FAMÍLIA</span><h3>Cenários que viram lembrança</h3><p>Uma parada para registrar todo mundo junto em um lugar cheio de cor. São esses pequenos momentos que deixam a viagem especial.</p></div>
              </article>
              <article className="experience-card">
                <div className="experience-card-photo"><PhotoImage src="/images/familia-na-praia.jpeg" alt="Família reunida durante um passeio em um destino de praia" /></div>
                <div className="experience-card-copy"><span className="experience-number">03 · VIAGEM EM GRUPO</span><h3>Todo mundo junto, cada um com sua história</h3><p>Viagens em família e entre gerações, com tempo para conversar, conhecer o destino e criar memórias compartilhadas.</p></div>
              </article>
              <article className="experience-card">
                <div className="experience-card-photo"><PhotoImage src="/images/familia-com-filha.jpeg" alt="Pais caminhando de mãos dadas com a filha em uma praia" /></div>
                <div className="experience-card-copy"><span className="experience-number">04 · TEMPO DE QUALIDADE</span><h3>Descobrir o mundo lado a lado</h3><p>Uma caminhada à beira-mar em família: momentos simples, sem pressa, que se tornam parte das melhores recordações.</p></div>
              </article>
              <article className="experience-card experience-card-couple">
                <div className="experience-card-photo"><PhotoImage src="/images/casal-paisagem.jpeg" alt="Casal aproveitando junto uma paisagem de viagem" /></div>
                <div className="experience-card-copy"><span className="experience-number">05 · A DOIS</span><h3>Uma pausa para aproveitar a paisagem</h3><p>Também há espaço para viagens a dois: conhecer novos cenários, aproveitar o passeio e guardar uma lembrança especial.</p></div>
              </article>
            </div>
            <div className="experience-cta"><span>Tem fotos de uma viagem com a Fácil?</span><a href={whatsappUrl('Olá! Tenho registros de uma viagem com a Fácil Viagens e gostaria de saber como compartilhar.')} target="_blank" rel="noreferrer">Compartilhe com a agência <ArrowUpRight size={15}/></a></div>
          </div>
        </section>

        <section className="offers-section" id="promocoes">
          <div className="container offers-inner">
            <div className="offers-copy"><span className="eyebrow eyebrow-light">OPORTUNIDADES DE VIAJAR</span><h2>Uma oferta especial pode ser o começo da sua próxima história.</h2><p>As promoções serão publicadas aqui somente quando houver valores, prazos e condições confirmados.</p><a className="btn btn-gold" href={whatsappUrl('Olá! Gostaria de saber se há promoções ou ofertas disponíveis.')} target="_blank" rel="noreferrer">Consultar ofertas <ArrowRight size={17}/></a></div>
            <div className="offers-art"><div className="offer-circle"><Sparkles size={27}/><span>OFERTAS<br/>CONFIRMADAS</span></div><div className="offer-dash dash-one"/><div className="offer-dash dash-two"/><Plane className="offer-plane" size={58}/><div className="offer-note">Seu próximo<br/>embarque começa<br/>com uma conversa.</div></div>
          </div>
        </section>

        <section className="section why-section" id="sobre">
          <div className="container">
            <div className="why-layout">
              <div className="why-intro"><span className="eyebrow">SOBRE A FÁCIL VIAGENS</span><h2>Viajar pode ser mais simples do que você imagina.</h2><p>A Fácil Viagens nasceu para tornar o planejamento de viagens mais simples e aproximar pessoas de experiências inesquecíveis. Localizada em Sousa, na Paraíba, a agência busca conectar seus clientes a destinos e oportunidades de viagem, oferecendo atendimento próximo para ajudar na escolha e organização de cada experiência.</p><a className="text-link" href="#contato" onClick={e=>{e.preventDefault();goTo('#contato')}}>Fale com nossa equipe <ArrowRight size={16}/></a></div>
              <div className="why-values">
                <div className="value-card"><span><Heart size={21}/></span><h3>Atendimento próximo</h3><p>Converse com a agência e apresente o que você procura.</p></div>
                <div className="value-card"><span><Compass size={21}/></span><h3>Planejamento facilitado</h3><p>Organize suas ideias e tire dúvidas antes de decidir.</p></div>
                <div className="value-card"><span><Globe2 size={21}/></span><h3>Possibilidades de viagem</h3><p>Consulte opções de destinos e formatos de viagem.</p></div>
                <div className="value-card"><span><Users size={21}/></span><h3>Contato acessível</h3><p>Atendimento presencial, por telefone e WhatsApp.</p></div>
              </div>
            </div>
            <div className="about-photo"><PhotoImage src="/images/fachada-agencia.jpeg" alt="Fachada real da agência Fácil Viagens em Sousa" large /><div className="about-photo-caption"><span>FÁCIL VIAGENS</span><strong>Estamos em Sousa. Venha nos visitar.</strong></div></div>
          </div>
        </section>

        <section className="section contact-section" id="contato">
          <div className="container">
            <SectionHeading eyebrow="VAMOS CONVERSAR?" title="Sua próxima viagem começa com uma mensagem." description="Entre em contato com a equipe da Fácil Viagens. Será um prazer receber sua ideia e ajudar no planejamento." />
            <div className="contact-layout">
              <div className="contact-details">
                <a className="contact-line" href="tel:+5583991083939"><span className="contact-icon"><Phone size={20}/></span><span><small>TELEFONE E WHATSAPP</small><strong>(83) 99108-3939</strong><em>Toque para ligar</em></span><ArrowUpRight size={17}/></a>
                <a className="contact-line" href={`mailto:${EMAIL}`}><span className="contact-icon"><Mail size={20}/></span><span><small>E-MAIL</small><strong>{EMAIL}</strong><em>Envie sua mensagem</em></span><ArrowUpRight size={17}/></a>
                <a className="contact-line" href={MAPS} target="_blank" rel="noreferrer"><span className="contact-icon"><MapPin size={20}/></span><span><small>ENDEREÇO</small><strong>Rua Cônego José Viana, nº 99</strong><em>Bairro Estação · Sousa – PB · CEP 58807-320</em></span><ArrowUpRight size={17}/></a>
                <div className="hours-card"><div className="hours-title"><Clock3 size={19}/><strong>Horários de atendimento</strong></div><div className="hours-row"><span>Segunda a sexta</span><strong>08h–12h · 14h–18h</strong></div><div className="hours-row"><span>Sábado</span><strong>08h–12h</strong></div><div className="hours-row"><span>Domingo</span><strong>Fechado</strong></div></div>
                <a className="map-link" href={MAPS} target="_blank" rel="noreferrer"><MapPin size={16}/> Abrir localização no Google Maps <ArrowUpRight size={15}/></a>
              </div>
              <form className="contact-form" onSubmit={submitContact}>
                <div className="form-heading"><span>FALE COM A GENTE</span><h3>Como podemos ajudar?</h3><p>Preencha os campos e continue pelo WhatsApp.</p></div>
                <div className="form-two">
                  <label className="field"><span>Seu nome *</span><input required value={contact.name} onChange={e=>setContact({...contact,name:e.target.value})} placeholder="Nome completo"/></label>
                  <label className="field"><span>Telefone *</span><input required type="tel" value={contact.phone} onChange={e=>setContact({...contact,phone:e.target.value})} placeholder="(00) 00000-0000"/></label>
                </div>
                <label className="field"><span>E-mail</span><input type="email" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})} placeholder="voce@email.com"/></label>
                <label className="field"><span>Destino de interesse</span><input value={contact.destination} onChange={e=>setContact({...contact,destination:e.target.value})} placeholder="Conte para onde gostaria de ir"/></label>
                <label className="field"><span>Mensagem *</span><textarea required rows={4} value={contact.message} onChange={e=>setContact({...contact,message:e.target.value})} placeholder="Escreva como podemos ajudar..."/></label>
                {formError && <p className="form-message form-error">{formError}</p>}
                {formSent && <p className="form-message form-success"><Check size={15}/> Solicitação preparada. Se o WhatsApp não abriu, tente novamente.</p>}
                <button className="btn btn-primary form-submit" type="submit">Enviar pelo WhatsApp <Send size={16}/></button>
                <small className="form-privacy">Ao enviar, você abrirá uma conversa no WhatsApp com os dados preenchidos.</small>
              </form>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta-inner"><div><span className="eyebrow eyebrow-light">VAMOS TIRAR SEUS PLANOS DO PAPEL?</span><h2>O mundo tem muitos lugares. Vamos encontrar o seu próximo?</h2></div><a className="btn btn-gold" href={whatsappUrl('Olá! Quero começar a planejar minha próxima viagem.')} target="_blank" rel="noreferrer">Chamar no WhatsApp <ArrowUpRight size={17}/></a></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand-col"><a href="#inicio" className="brand brand-footer" onClick={()=>goTo('#inicio')}><span className="brand-mark"><Plane size={24}/></span><span className="brand-copy"><strong>fácil<span>viagens</span></strong><small>SEU PRÓXIMO DESTINO</small></span></a><p>Planejamento de viagens com atendimento próximo em Sousa, Paraíba.</p><a className="footer-whatsapp" href={whatsappUrl('Olá! Gostaria de falar com a Fácil Viagens.')} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Fale com a gente</a></div>
          <div className="footer-links"><h4>Explore</h4>{navItems.map(([label,href])=><a key={href} href={href} onClick={e=>{e.preventDefault();goTo(href)}}>{label}</a>)}</div>
          <div className="footer-links"><h4>Atendimento</h4><a href="tel:+5583991083939">(83) 99108-3939</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href={MAPS} target="_blank" rel="noreferrer">Como chegar</a><span>Seg–Sex: 08h–12h e 14h–18h</span><span>Sábado: 08h–12h</span><span>Domingo: fechado</span></div>
          <div className="footer-address"><h4>Visite a agência</h4><p>{ADDRESS}</p><a href={MAPS} target="_blank" rel="noreferrer">Ver no mapa <ArrowUpRight size={14}/></a></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Fácil Viagens. Todos os direitos reservados.</span><div><button onClick={()=>setLegalModal('privacy')}>Política de privacidade</button><button onClick={()=>setLegalModal('terms')}>Termos de uso</button></div><span className="footer-location">Feito para viajar mais fácil <Plane size={13}/></span></div>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl('Olá! Gostaria de falar com a Fácil Viagens.')} target="_blank" rel="noreferrer" aria-label="Falar com a Fácil Viagens pelo WhatsApp"><MessageCircle size={24}/><span>Fale conosco</span></a>

      {legalModal && <div className="modal-backdrop" role="presentation" onClick={()=>setLegalModal(null)}><div className="legal-modal" role="dialog" aria-modal="true" aria-labelledby="legal-title" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setLegalModal(null)} aria-label="Fechar"><X/></button><span className="eyebrow">FÁCIL VIAGENS</span><h2 id="legal-title">{legalModal==='privacy'?'Política de privacidade':'Termos de uso'}</h2>{legalModal==='privacy'?<><p>Os dados preenchidos nos formulários desta página são organizados no seu dispositivo para abrir uma conversa no WhatsApp da Fácil Viagens. Este site não possui, nesta versão, banco de dados ou sistema próprio de armazenamento de solicitações.</p><p>Ao continuar para o WhatsApp, o tratamento das informações também estará sujeito às políticas e configurações do serviço. Informe apenas os dados necessários para seu atendimento.</p><p>Para dúvidas sobre privacidade, entre em contato pelo e-mail {EMAIL}.</p></>:<><p>As informações sobre destinos, pacotes, preços, datas, disponibilidade e serviços devem ser confirmadas diretamente com a Fácil Viagens antes de qualquer contratação.</p><p>O envio de uma solicitação pelo site ou WhatsApp não constitui reserva, compra ou confirmação de disponibilidade.</p><p>Este site apresenta informações institucionais e canais de atendimento da agência.</p></>}<button className="btn btn-primary" onClick={()=>setLegalModal(null)}>Entendi</button></div></div>}
    </div>
  );
}

export default App;
