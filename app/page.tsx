"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Languages, Award, Bookmark, 
  BookmarkCheck, CheckCircle2, ArrowLeft, Mic2, 
  TrendingUp, Scale, Star, Menu, X, Share2, Send
} from 'lucide-react';

// --- SISTEMA DE IDIOMAS ---
const TRANSLATIONS = {
  es: {
    siteName: "Infoxity",
    tagline: "Resistencia Intelectual",
    welcome: "Bienvenido a Infoxity.",
    onboarding: "Limpiamos el ruido mediático. Introduce tu identidad para el debate.",
    reading: "leyendo ahora",
    quickContext: "Contexto Crítico",
    biasAnalysis: "Auditoría de IA",
    reputation: "puntos",
    comments: "Foro de Debate",
    postComment: "Escribe tu argumento basado en datos...",
    capture: "Modo Captura IG",
    identityTitle: "¿Por qué Infoxity?",
    identityBody: "Somos un equipo híbrido de IA y humanos que limpian el ruido mediático para ofrecer noticias objetivas, largas y analíticas, diseñadas para que los jóvenes cultos debatan con respeto.",
    back: "Volver",
    featured: "DESTACADA",
    sources: "Fuentes Verificadas",
    actionButton: "Unirse a la Resistencia",
    publish: "Publicar",
    myLibrary: "Mi Biblioteca",
    noSaved: "No tienes noticias guardadas.",
    voteThanks: "Voto registrado con éxito",
    placeholderName: "Nombre y Apellido...",
    placeholderIg: "@tu_instagram",
    popular: "Más Destacadas",
    share: "Compartir"
  },
  en: {
    siteName: "Infoxity",
    tagline: "Intellectual Resistance",
    welcome: "Welcome to Infoxity.",
    onboarding: "We clear media noise. Enter your identity to join the debate.",
    reading: "reading now",
    quickContext: "Critical Context",
    biasAnalysis: "AI Audit",
    reputation: "points",
    comments: "Debate Forum",
    postComment: "Write your fact-based argument...",
    capture: "IG Capture Mode",
    identityTitle: "Why Infoxity?",
    identityBody: "We are a hybrid team of AI and humans cleaning media noise to offer objective, long-form analytical news, designed for educated youth to debate with respect.",
    back: "Back",
    featured: "FEATURED",
    sources: "Verified Sources",
    actionButton: "Join the Resistance",
    publish: "Publish",
    myLibrary: "My Library",
    noSaved: "No saved stories yet.",
    voteThanks: "Vote registered successfully",
    placeholderName: "Full Name...",
    placeholderIg: "@your_instagram",
    popular: "Trending Now",
    share: "Share"
  }
};

// --- DATA ESTRUCTURADA CON MÁS COMENTARIOS ---
const INITIAL_NEWS = [
  {
    id: 1,
    cat: "Geopolítica", catEn: "Geopolitics",
    title: "Venezuela 2026: El Nuevo Eje Energético Global", titleEn: "Venezuela 2026: The New Global Energy Axis",
    context: "El acuerdo secreto entre Washington y Caracas para alimentar las granjas de servidores de IA en EE.UU.",
    content: "En enero de 2026, la diplomacia energética ha dado un giro inesperado. Ante el consumo masivo de electricidad de los nuevos modelos de Inteligencia Artificial General (AGI), Estados Unidos ha firmado el 'Pacto del Caribe' con Venezuela. Este acuerdo no solo implica el levantamiento de sanciones, sino la inversión masiva en infraestructura venezolana a cambio de crudo pesado destinado exclusivamente a la generación eléctrica de centros de datos en Texas y Florida.\n\nEl análisis de Infoxity revela que este movimiento estabiliza la economía regional pero genera una nueva dependencia tecnológica. Mientras el mundo miraba hacia las renovables, la urgencia de la computación ha devuelto el poder a las reservas fósiles más grandes del mundo.",
    bias: [95, 92, 10], 
    poll: { q: "¿Es ético priorizar la IA sobre las sanciones?", opts: ["Pragmatismo necesario", "Error histórico", "Neutral"], votes: [540, 210, 95] },
    sources: ["OPEP+ Energy Report", "Digital Geopolitics Journal"],
    color: "from-orange-500 to-red-600",
    shadow: "shadow-orange-200",
    comments: [
      { id: 1, user: "Mateo Fernández", ig: "@mateo_fdz", rep: 1250, text: "La energía manda, las ideologías solo adornan. 🔋" },
      { id: 101, user: "Elena Vega", ig: "@elvega_geo", rep: 890, text: "Interesante cómo la IA está redibujando el mapa de poder que creíamos muerto." },
      { id: 102, user: "Santi Tech", ig: "@santi_future", rep: 2100, text: "Texas no puede sostener la demanda de las AGI solo con renovables. Venezuela era el plan B lógico." }
    ]
  },
  {
    id: 2,
    cat: "Cultura", catEn: "Culture",
    title: "Stranger Things 5 y el Fin del Binge-Watching", titleEn: "Stranger Things 5 and the End of Binge-Watching",
    context: "Netflix abandona el modelo de 'todo de golpe' para salvar su relevancia cultural.",
    content: "El estreno de la última temporada de Stranger Things en 2026 marca oficialmente el funeral del maratón de series. Netflix ha anunciado que los episodios se lanzarán quincenalmente, acompañados de eventos en vivo en Realidad Virtual.\n\nEl análisis de Infoxity indica que el modelo de 'atracón' destruía la conversación social en menos de 48 horas. Ahora, la industria busca la 'escasez artificial'. Al dilatar el estreno, el valor publicitario de la serie ha subido un 300%. Los jóvenes ya no quieren consumir contenido solos; quieren la validación del debate grupal.",
    bias: [88, 94, 25],
    poll: { q: "¿Prefieres esperar o verlo todo ya?", opts: ["Esperar (Crea hype)", "Todo ya", "Indiferente"], votes: [890, 410, 120] },
    sources: ["Streaming Analytics 2026", "Variety Insights"],
    color: "from-purple-500 to-indigo-600",
    shadow: "shadow-purple-200",
    comments: [
      { id: 3, user: "Carlos Ruiz", ig: "@cruiz_filmes", rep: 560, text: "Por fin podré hablar de la serie sin spoilers el primer día. 🙌" },
      { id: 201, user: "Marta Joy", ig: "@marta_series", rep: 1420, text: "Extrañaba las teorías semanales. El binge-watching mató el misterio." },
      { id: 202, user: "Kevin Smith", ig: "@kev_st", rep: 300, text: "Esto solo lo hacen para que paguemos más meses de suscripción, seamos claros." }
    ]
  },
  {
    id: 3,
    cat: "Política", catEn: "Politics",
    title: "Gen Z: El Fin de la Izquierda y la Derecha", titleEn: "Gen Z: The End of Left and Right",
    context: "El 70% de los jóvenes votantes en 2026 se declaran 'Pragmáticos Radicales'.",
    content: "Las etiquetas políticas tradicionales han colapsado. Un estudio profundo realizado por el equipo de Infoxity muestra que la Generación Z ya no vota por bloques ideológicos, sino por 'paquetes de soluciones'. Un joven puede defender el mercado libre de criptoactivos y al mismo tiempo exigir la nacionalización de la vivienda.\n\nEste fenómeno, denominado 'Ideología Líquida', está dejando a los partidos tradicionales sin discurso. En 2026, la competencia política se basa en la eficiencia técnica y la transparencia algorítmica. La política ha pasado de ser una religión a ser una herramienta de gestión.",
    bias: [98, 96, 5],
    poll: { q: "¿Te sientes representado por algún partido?", opts: ["Ninguno", "Por ideas sueltas", "Sí, soy fiel"], votes: [1500, 600, 150] },
    sources: ["Pew Research Center 2026", "Infoxity Data Hub"],
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-200",
    comments: [
      { id: 4, user: "Lucía Méndez", ig: "@lucia_vota", rep: 2100, text: "La eficiencia no tiene color político. Queremos que funcione." },
      { id: 301, user: "Alex Politic", ig: "@alex_real", rep: 950, text: "Los políticos viejos no entienden que ya no compramos promesas, compramos resultados." },
      { id: 302, user: "Dani G", ig: "@dani_geopol", rep: 120, text: "Pragmatismo radical suena a lo que necesitamos para arreglar la vivienda de una vez." }
    ]
  }
];

export default function InfoxityApp() {
  const [user, setUser] = useState<{name: string, ig: string, rep: number} | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [igInput, setIgInput] = useState("");
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [news, setNews] = useState(INITIAL_NEWS);
  const [selected, setSelected] = useState<any>(null);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [votedPolls, setVotedPolls] = useState<number[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [readers, setReaders] = useState(4520);

  // EFECTO DE PERSISTENCIA: Carga los datos al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('infoxity_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedVotes = localStorage.getItem('infoxity_votes');
    if (savedVotes) setVotedPolls(JSON.parse(savedVotes));

    const interval = setInterval(() => setReaders(p => p + (Math.floor(Math.random()*21)-10)), 3000);
    return () => clearInterval(interval);
  }, []);

  const t = TRANSLATIONS[lang];

  const handleLogin = () => {
    if (nameInput) {
      const newUser = { name: nameInput, ig: igInput || "@anonimo", rep: 100 };
      setUser(newUser);
      localStorage.setItem('infoxity_user', JSON.stringify(newUser));
    }
  };

  const shareOnWhatsApp = (item: any) => {
    const text = `¡Mira esta noticia en Infoxity! 🛡️\n\n*${item.title}*\n"${item.context}"\n\nLeelo aquí: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const toggleSave = (id: number) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleVote = (newsId: number, optIndex: number) => {
    if (votedPolls.includes(newsId)) return;
    const updatedNews = news.map(n => {
      if (n.id === newsId) {
        const newVotes = [...n.poll.votes];
        newVotes[optIndex] += 1;
        return { ...n, poll: { ...n.poll, votes: newVotes } };
      }
      return n;
    });
    setNews(updatedNews);
    const newVotedPolls = [...votedPolls, newsId];
    setVotedPolls(newVotedPolls);
    localStorage.setItem('infoxity_votes', JSON.stringify(newVotedPolls));
  };

  const savedNews = useMemo(() => news.filter(n => savedIds.includes(n.id)), [news, savedIds]);

  if (!user) {
    return (
      <main className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50 via-gray-100 to-gray-200 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full p-10 md:p-14 rounded-[3.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border border-white/50 text-center bg-white/80 backdrop-blur-2xl">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white inline-block px-7 py-2 font-black text-4xl italic mb-8 rounded-2xl shadow-lg shadow-blue-500/20">IX</div>
          <h1 className="text-3xl font-black mb-4 text-gray-900 tracking-tight">{t.welcome}</h1>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed font-medium">{t.onboarding}</p>
          <div className="space-y-4 mb-6">
            <input 
              type="text" placeholder={t.placeholderName} 
              className="w-full p-5 rounded-2xl bg-white border-2 border-gray-100 font-bold text-center outline-none focus:border-blue-500 focus:ring-4 ring-blue-500/10 transition-all shadow-inner"
              onChange={(e) => setNameInput(e.target.value)}
            />
            <input 
              type="text" placeholder={t.placeholderIg} 
              className="w-full p-5 rounded-2xl bg-white border-2 border-gray-100 font-bold text-center outline-none focus:border-pink-500 focus:ring-4 ring-pink-500/10 transition-all shadow-inner"
              onChange={(e) => setIgInput(e.target.value)}
            />
          </div>
          <button 
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-gray-900 to-black text-white p-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
          >
            {t.actionButton}
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-700 ${isCapturing ? 'bg-black p-0' : 'bg-[#fafafa]'}`}>
      
      {!isCapturing && (
        <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-2xl z-50 px-6 md:px-12 py-5 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setSelected(null)}>
            <div className="bg-black text-white px-3 py-1 font-black text-xl italic group-hover:scale-110 transition-transform">IX</div>
            <span className="font-black text-xs uppercase tracking-[0.4em] bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-500 hidden sm:block">{t.siteName}</span>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="bg-white px-4 py-2 rounded-full border border-gray-200 flex items-center gap-2 shadow-sm">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[10px] font-black text-gray-500 uppercase">
                {readers.toLocaleString()} {t.reading}
              </span>
            </div>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg">
              <Languages size={18} />
            </button>
          </div>
        </header>
      )}

      <main className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 ${isCapturing ? 'pt-0' : 'pt-28 md:pt-36 pb-20'}`}>
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-20">
              
              {savedNews.length > 0 && (
                <section>
                  <h3 className="text-[10px] font-black tracking-[0.5em] text-blue-600 uppercase mb-8 flex items-center gap-2">
                    <Star size={14} className="fill-blue-600" /> {t.myLibrary}
                  </h3>
                  <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
                    {savedNews.map(n => (
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        key={n.id} onClick={() => setSelected(n)}
                        className="min-w-[300px] bg-white p-8 rounded-[3rem] border border-gray-100 cursor-pointer shadow-lg hover:shadow-2xl transition-all"
                      >
                        <span className="text-[9px] font-black uppercase text-blue-500 mb-3 block">{lang === 'es' ? n.cat : n.catEn}</span>
                        <h4 className="font-black text-lg leading-tight text-gray-900">{lang === 'es' ? n.title : n.titleEn}</h4>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 bg-gradient-to-br from-gray-900 via-black to-blue-950 text-white p-12 md:p-20 rounded-[4rem] relative overflow-hidden flex flex-col justify-end min-h-[500px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border-t border-white/10">
                  <div className="absolute -top-10 -right-10 text-white/5 rotate-12 scale-150"><Shield size={350} /></div>
                  <div className="relative z-10">
                    <span className="bg-blue-600 text-[10px] font-black px-4 py-1.5 rounded-full tracking-[0.4em] mb-8 inline-block shadow-lg shadow-blue-500/20">{t.featured}</span>
                    <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-8 leading-[0.85]">{t.identityTitle}</h2>
                    <p className="text-gray-300 text-lg md:text-2xl font-light max-w-2xl leading-relaxed opacity-90">{t.identityBody}</p>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-center bg-white p-10 rounded-[4rem] border border-gray-100 shadow-xl">
                  <h3 className="text-[10px] font-black tracking-[0.5em] text-gray-400 uppercase mb-12">{t.popular}</h3>
                  <div className="space-y-10">
                    {news.map((n, i) => (
                      <div key={n.id} onClick={() => { setSelected(n); window.scrollTo(0,0); }} className="group cursor-pointer flex gap-6 items-start">
                        <span className="font-black text-gray-100 text-6xl leading-none group-hover:text-blue-500 transition-colors">0{i+1}</span>
                        <div>
                          <h4 className="font-black text-xl leading-tight text-gray-900 group-hover:text-blue-600 transition-all">{lang === 'es' ? n.title : n.titleEn}</h4>
                          <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest mt-2 block">{lang === 'es' ? n.cat : n.catEn}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {news.map(n => (
                  <motion.div 
                    key={n.id} whileHover={{ y: -12 }}
                    className={`bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-blue-500/10 transition-all flex flex-col justify-between min-h-[460px] relative overflow-hidden group`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-50 to-transparent -rotate-45 translate-x-12 -translate-y-12 transition-transform group-hover:translate-x-10 group-hover:-translate-y-10 opacity-50"/>
                    <div className="cursor-pointer relative z-10" onClick={() => setSelected(n)}>
                      <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase text-white bg-gradient-to-r ${n.color} mb-8 inline-block shadow-lg ${n.shadow}/50`}>{lang === 'es' ? n.cat : n.catEn}</span>
                      <h3 className="text-3xl font-black leading-[1.1] mb-6 text-gray-900 group-hover:text-blue-600 transition-colors">{lang === 'es' ? n.title : n.titleEn}</h3>
                      <p className="text-gray-500 text-base italic font-semibold leading-relaxed">"{n.context}"</p>
                    </div>
                    <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-10 relative z-10">
                      <div className="flex gap-2">
                        <button onClick={() => toggleSave(n.id)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 transition-all active:scale-125 hover:bg-gray-100">
                          {savedIds.includes(n.id) ? <BookmarkCheck className="text-blue-600" size={24} /> : <Bookmark className="text-gray-300" size={24} />}
                        </button>
                        <button onClick={() => shareOnWhatsApp(n)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 transition-all hover:bg-green-50 text-green-600">
                          <Share2 size={20} />
                        </button>
                      </div>
                      <button onClick={() => setSelected(n)} className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:-rotate-12 transition-all shadow-lg shadow-black/10"><ChevronRight size={22}/></button>
                    </div>
                  </motion.div>
                ))}
              </section>
            </motion.div>
          ) : (
            <motion.article 
              key="article" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              className={`max-w-4xl mx-auto ${isCapturing ? 'bg-white p-12 md:p-20 rounded-[5rem] border-[16px] border-black mt-10' : 'pb-32'}`}
            >
              {!isCapturing && (
                <div className="flex justify-between items-center mb-12">
                  <button onClick={() => setSelected(null)} className="flex items-center gap-3 text-xs font-black uppercase text-gray-400 hover:text-black transition-colors group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> {t.back}
                  </button>
                  <div className="flex gap-4">
                    <button onClick={() => shareOnWhatsApp(selected)} className="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center shadow-md text-green-600">
                      <Share2 size={20} />
                    </button>
                    <button onClick={() => setIsCapturing(true)} className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-3xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all">
                      <Instagram size={20}/> {t.capture}
                    </button>
                  </div>
                </div>
              )}

              <header className="mb-16">
                <span className={`px-6 py-2 rounded-full text-[11px] font-black uppercase text-white bg-gradient-to-r ${selected.color} mb-10 inline-block shadow-xl`}>
                  {lang === 'es' ? selected.cat : selected.catEn}
                </span>
                <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.85] mb-12 text-gray-900">
                  {lang === 'es' ? selected.title : selected.titleEn}
                </h1>
                <div className="bg-white p-10 rounded-[3.5rem] border-l-[12px] border-black shadow-2xl shadow-gray-200/50">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.5em] mb-4 flex items-center gap-2 text-blue-600"><Mic2 size={16}/> {t.quickContext}</h4>
                  <p className="text-2xl md:text-4xl font-bold italic text-gray-800 leading-[1.1]">"{selected.context}"</p>
                </div>
              </header>

              <section className="prose prose-2xl max-w-none text-gray-800 font-serif leading-relaxed mb-24 space-y-10 px-2 md:px-6">
                {selected.content.split('\n\n').map((p: string, i: number) => (
                  <p key={i} className="first-letter:text-7xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-blue-600">{p}</p>
                ))}
              </section>

              {!isCapturing && (
                <div className="space-y-20">
                  {/* AUDITORÍA */}
                  <div className="p-12 bg-white rounded-[4rem] border border-gray-100 shadow-xl">
                    <h5 className="text-[11px] font-black uppercase tracking-[0.4em] mb-12 flex items-center gap-3 text-gray-400">
                      <BarChart3 size={20} className="text-blue-600"/> {t.biasAnalysis}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      {['Objetividad', 'Hechos', 'Neutralidad'].map((label, i) => (
                        <div key={label}>
                          <div className="flex justify-between text-[10px] font-black uppercase mb-4 text-gray-900">
                            <span>{label}</span>
                            <span className="text-blue-600">{selected.bias[i]}%</span>
                          </div>
                          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${selected.bias[i]}%` }} className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-[0_0_12px_rgba(79,70,229,0.3)]"/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ENCUESTA */}
                  <div className="bg-gradient-to-br from-gray-950 via-black to-blue-950 text-white p-10 md:p-20 rounded-[5rem] relative overflow-hidden shadow-3xl">
                    <div className="absolute top-0 right-0 p-16 opacity-10 rotate-12 scale-150"><Scale size={200}/></div>
                    <h3 className="text-3xl md:text-5xl font-black mb-14 relative z-10 leading-tight">{selected.poll.q}</h3>
                    <div className="space-y-6 relative z-10">
                      {selected.poll.opts.map((o: string, i: number) => {
                        const total = selected.poll.votes.reduce((a:number, b:number) => a + b, 0);
                        const percentage = Math.round((selected.poll.votes[i] / total) * 100);
                        const isMax = selected.poll.votes[i] === Math.max(...selected.poll.votes);
                        const hasVoted = votedPolls.includes(selected.id);

                        return (
                          <button 
                            key={o} 
                            disabled={hasVoted}
                            onClick={() => handleVote(selected.id, i)}
                            className={`w-full relative p-8 rounded-[2.5rem] text-left font-bold border-2 transition-all overflow-hidden ${hasVoted ? 'border-transparent cursor-default' : 'border-white/10 hover:border-blue-500 active:scale-[0.98]'}`}
                          >
                            {hasVoted && (
                              <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${percentage}%` }} 
                                className={`absolute left-0 top-0 h-full ${isMax ? 'bg-blue-600/40' : 'bg-white/10'}`} 
                              />
                            )}
                            <div className="relative z-10 flex justify-between items-center">
                              <span className="text-xl flex items-center gap-4">
                                {o} {hasVoted && isMax && <CheckCircle2 size={24} className="text-blue-400 animate-bounce" />}
                              </span>
                              {hasVoted && <span className="font-black text-3xl">{percentage}%</span>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* DEBATE */}
                  <section className="bg-white p-10 md:p-20 rounded-[5rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-gray-50">
                    <h3 className="text-4xl font-black mb-16 flex items-center gap-5 italic"><MessageSquare size={40} className="text-blue-600"/> {t.comments}</h3>
                    <div className="flex gap-6 mb-16">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-800 text-white rounded-[1.5rem] flex items-center justify-center font-black shrink-0 text-3xl shadow-xl">
                        {user.name[0]}
                      </div>
                      <div className="flex-1">
                        <textarea 
                          placeholder={t.postComment}
                          className="w-full bg-gray-50 p-8 rounded-[3rem] outline-none focus:ring-4 ring-blue-500/10 font-bold text-xl min-h-[180px] shadow-inner border border-gray-100"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button 
                          onClick={() => { if(commentText.trim()) { 
                            const newItem = { id: Date.now(), user: user.name, ig: user.ig, rep: user.rep + 15, text: commentText };
                            const updated = news.map(n => n.id === selected.id ? { ...n, comments: [newItem, ...n.comments] } : n);
                            setNews(updated);
                            setSelected({...selected, comments: [newItem, ...selected.comments]});
                            setCommentText("");
                          }}}
                          className="mt-8 px-12 py-5 bg-black text-white rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:bg-blue-600 hover:scale-105 transition-all flex items-center gap-3"
                        >
                          <Send size={18}/> {t.publish}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-10">
                      {selected.comments.map((c: any) => (
                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} key={c.id} className="p-10 bg-[#fcfcfc] border border-gray-100 rounded-[3.5rem] flex flex-col gap-5 hover:border-blue-200 transition-all shadow-sm">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                              <span className="font-black text-lg text-gray-900 tracking-tight">{c.user}</span>
                              <span className="text-xs text-pink-600 font-bold">{c.ig}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase shadow-sm border border-blue-100">
                              <Award size={14}/> {c.rep} {t.reputation}
                            </div>
                          </div>
                          <p className="text-gray-600 text-lg font-semibold leading-relaxed italic">"{c.text}"</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {isCapturing && (
                <div className="mt-20 pt-10 border-t-[6px] border-black flex justify-between items-end">
                  <div className="flex items-center gap-4">
                    <div className="bg-black text-white px-5 py-2 font-black text-4xl italic shadow-lg">IX</div>
                    <div>
                      <p className="text-lg font-black uppercase tracking-tighter text-gray-900">Infoxity_News</p>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Digital Sovereignty</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Resistencia Intelectual 2026</p>
                  </div>
                </div>
              )}

              {isCapturing && (
                <button 
                  onClick={() => setIsCapturing(false)}
                  className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-white text-black px-16 py-6 rounded-full font-black uppercase tracking-[0.2em] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-black z-[100] hover:scale-105 active:scale-95 transition-all"
                >
                  Finalizar Captura
                </button>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      {!isCapturing && (
        <footer className="py-32 border-t border-gray-100 text-center bg-white mt-20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
          <div className="bg-black text-white inline-block px-10 py-3 font-black text-4xl italic mb-8 rounded-2xl shadow-xl">IX</div>
          <p className="text-[12px] text-gray-400 font-black uppercase tracking-[0.8em] px-6 max-w-4xl mx-auto leading-relaxed">
            Infoxity 2026 © Information Sovereignty & Digital Excellence
          </p>
        </footer>
      )}
    </div>
  );
}
