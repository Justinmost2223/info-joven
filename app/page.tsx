"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Languages, Award, Bookmark, 
  BookmarkCheck, CheckCircle2, ArrowLeft, Mic2, 
  TrendingUp, Scale, Star, Menu, X, Share2, Send, Zap, Globe,
  MoreHorizontal, Heart, MessageCircle, Library, Sparkles
} from 'lucide-react';

// --- TRADUCCIONES PROFESIONALES ---
const TRANSLATIONS = {
  es: {
    siteName: "Infoxity",
    tagline: "Resistencia Intelectual",
    welcome: "Acceso al Sistema de Información",
    onboarding: "Analítica de alto nivel para la nueva generación soberana.",
    reading: "lectores activos",
    quickContext: "Análisis de Fondo",
    biasAnalysis: "Auditoría de Neutralidad",
    reputation: "puntos de prestigio",
    comments: "Foro de Debate Crítico",
    postComment: "Aporta un argumento basado en datos...",
    capture: "Exportar para Archivo",
    identityTitle: "La Filosofía Infoxity",
    identityBody: "No somos un algoritmo. Somos un consejo editorial híbrido dedicado a desmantelar el ruido mediático. Ofrecemos periodismo de profundidad para quienes demandan la verdad sin filtros ideológicos.",
    back: "Volver al Índice",
    featured: "ANÁLISIS DESTACADO",
    sources: "Fuentes Verificadas",
    actionButton: "Validar Identidad",
    publish: "Publicar",
    myLibrary: "Archivo Personal",
    noSaved: "No hay registros guardados.",
    voteThanks: "Voto procesado",
    placeholderName: "Nombre completo...",
    placeholderIg: "@usuario_verificado",
    popular: "Tendencias Globales",
    share: "Compartir",
    shareWa: "WhatsApp"
  },
  en: {
    siteName: "Infoxity",
    tagline: "Intellectual Resistance",
    welcome: "Information System Access",
    onboarding: "High-level analytics for the new sovereign generation.",
    reading: "active readers",
    quickContext: "Deep Analysis",
    biasAnalysis: "Neutrality Audit",
    reputation: "prestige points",
    comments: "Critical Debate Forum",
    postComment: "Contribute a data-driven argument...",
    capture: "Export for Archive",
    identityTitle: "The Infoxity Philosophy",
    identityBody: "We are not an algorithm. We are a hybrid editorial board dedicated to dismantling media noise. We offer in-depth journalism for those who demand the truth without ideological filters.",
    back: "Back to Index",
    featured: "FEATURED ANALYSIS",
    sources: "Verified Sources",
    actionButton: "Validate Identity",
    publish: "Publish",
    myLibrary: "Personal Archive",
    noSaved: "No records found.",
    voteThanks: "Vote processed",
    placeholderName: "Full name...",
    placeholderIg: "@verified_user",
    popular: "Global Trends",
    share: "Share",
    shareWa: "WhatsApp"
  }
};

const INITIAL_NEWS = [
  {
    id: 1,
    cat: "Geopolítica", catEn: "Geopolitics",
    title: "Venezuela 2026: El Nuevo Eje Energético Global", titleEn: "Venezuela 2026: The New Global Energy Axis",
    context: "El acuerdo secreto entre Washington y Caracas para alimentar las granjas de servidores de IA en EE.UU.",
    content: "En enero de 2026, la diplomacia energética ha dado un giro inesperado. Ante el consumo masivo de electricidad de los nuevos modelos de Inteligencia Artificial General (AGI), Estados Unidos ha firmado el 'Pacto del Caribe' con Venezuela. Este acuerdo no solo implica el levantamiento de sanciones, sino la inversión masiva en infraestructura venezolana a cambio de crudo pesado destinado exclusivamente a la generación eléctrica de centros de datos en Texas y Florida.\n\nEl análisis de Infoxity revela que este movimiento estabiliza la economía regional pero genera una nueva dependencia tecnológica. Mientras el mundo miraba hacia las renovables, la urgencia de la computación ha devuelto el poder a las reservas fósiles más grandes del mundo.",
    bias: [95, 92, 10], 
    poll: { q: "¿Es ético priorizar la IA sobre las sanciones?", opts: ["Pragmatismo necesario", "Error histórico", "Neutral"], votes: [540, 210, 95] },
    sources: ["OPEP+ Energy Report", "Digital Geopolitics Journal", "Reuters Intelligence"],
    color: "from-orange-500 to-red-600",
    comments: [
      { id: 1, user: "Mateo Fernández", ig: "@mateo_fdz", rep: 2500, text: "La energía manda, las ideologías solo adornan. El regreso del crudo pesado era inevitable con el consumo de la AGI. 🔋" },
      { id: 101, user: "Elena Vega", ig: "@elvega_geo", rep: 4890, text: "Lo que nadie dice es que este acuerdo deja a la UE fuera del tablero energético sudamericano por otra década." },
      { id: 102, user: "Dr. Arreaza", ig: "@arreaza_intel", rep: 1200, text: "Como analista en Caracas, confirmo que la infraestructura ya está recibiendo técnicos de Texas. Movimiento maestro." },
      { id: 103, user: "Sofia K.", ig: "@sk_global", rep: 950, text: "Es una hipocresía climática total, pero el mercado no espera a las renovables." }
    ]
  },
  {
    id: 2,
    cat: "Cultura", catEn: "Culture",
    title: "Stranger Things 5 y el Fin del Binge-Watching", titleEn: "Stranger Things 5 and the End of Binge-Watching",
    context: "Netflix abandona el modelo de 'todo de golpe' para salvar su relevancia cultural.",
    content: "El estreno de la última temporada de Stranger Things en 2026 marca oficialmente el funeral del maratón de series. Netflix ha anunciado que los episodios se lanzarán quincenalmente, acompañados de eventos en vivo en Realidad Virtual.\n\nEl análisis de Infoxity indica que el modelo de 'atracón' destruía la conversación social en menos de 48 horas. Ahora, la industria busca la 'escasez artificial'.",
    bias: [88, 94, 25],
    poll: { q: "¿Prefieres esperar o verlo todo ya?", opts: ["Esperar (Crea hype)", "Todo ya", "Indiferente"], votes: [890, 410, 120] },
    sources: ["Streaming Analytics 2026", "Variety Insights"],
    color: "from-purple-500 to-indigo-600",
    comments: [
      { id: 201, user: "Carlos Ruiz", ig: "@cruiz_filmes", rep: 3560, text: "Por fin recuperamos la cultura de la espera. El binge-watching era comida rápida emocional. 🙌" },
      { id: 202, user: "Marta G.", ig: "@martag_tv", rep: 1200, text: "Esto salvará las suscripciones. Netflix aprendió de HBO por las malas." }
    ]
  },
  {
    id: 3,
    cat: "Política", catEn: "Politics",
    title: "Gen Z: El Fin de la Izquierda y la Derecha", titleEn: "Gen Z: The End of Left and Right",
    context: "El 70% de los jóvenes votantes en 2026 se declaran 'Pragmáticos Radicales'.",
    content: "Las etiquetas políticas tradicionales han colapsado. Un estudio profundo realizado por el equipo de Infoxity muestra que la Generación Z ya no vota por bloques ideológicos, sino por 'paquetes de soluciones'. Un joven puede defender el mercado libre de criptoactivos y al mismo tiempo exigir la nacionalización de la vivienda.",
    bias: [98, 96, 5],
    poll: { q: "¿Te sientes representado por algún partido?", opts: ["Ninguno", "Por ideas sueltas", "Sí, soy fiel"], votes: [1500, 600, 150] },
    sources: ["Pew Research Center 2026", "Infoxity Data Lab"],
    color: "from-emerald-500 to-teal-600",
    comments: [
      { id: 301, user: "Lucía Méndez", ig: "@lucia_vota", rep: 5100, text: "La eficiencia no tiene color político. Queremos que las cosas funcionen, punto." },
      { id: 302, user: "Marcos J.", ig: "@marcos_j", rep: 800, text: "El post-ideologismo es la única salida a la polarización estéril de los últimos 20 años." }
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

  // EFECTO DE CARGA DE PERSISTENCIA REAL
  useEffect(() => {
    const savedUser = localStorage.getItem('infoxity_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedVotes = localStorage.getItem('infoxity_votes');
    if (savedVotes) setVotedPolls(JSON.parse(savedVotes));
    
    const savedLibrary = localStorage.getItem('infoxity_library');
    if (savedLibrary) setSavedIds(JSON.parse(savedLibrary));

    // Persistencia de comentarios dinámicos
    const savedComments = localStorage.getItem('infoxity_global_comments');
    if (savedComments) {
      const parsedComments = JSON.parse(savedComments);
      setNews(prev => prev.map(n => ({
        ...n,
        comments: [...(parsedComments[n.id] || []), ...INITIAL_NEWS.find(inews => inews.id === n.id)!.comments]
      })));
    }

    const interval = setInterval(() => setReaders(p => p + (Math.floor(Math.random()*21)-10)), 3000);
    return () => clearInterval(interval);
  }, []);

  const t = TRANSLATIONS[lang];

  // --- MODIFICACIÓN PARA LA BASE DE DATOS (FORMSPREE) ---
  const handleLogin = async () => {
    if (nameInput) {
      // 1. Enviamos el nombre e IG a Formspree
      try {
        await fetch("https://formspree.io/f/2915445841474879054", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            nombre_completo: nameInput, 
            instagram: igInput || "No proporcionado",
            timestamp: new Date().toISOString()
          }),
        });
      } catch (err) {
        console.error("Error en el envío de datos");
      }

      // 2. Ejecutamos tu lógica original de entrada
      const newUser = { name: nameInput, ig: igInput || "@anonimo", rep: 150 };
      setUser(newUser);
      localStorage.setItem('infoxity_user', JSON.stringify(newUser));
    }
  };

  const shareOnWhatsApp = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    const text = `📊 *INFOXITY INTEL*:\n"${item.title}"\n\nAnalítica completa aquí: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const toggleSave = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const newSaved = savedIds.includes(id) ? savedIds.filter(i => i !== id) : [...savedIds, id];
    setSavedIds(newSaved);
    localStorage.setItem('infoxity_library', JSON.stringify(newSaved));
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

  const handlePostComment = () => {
    if(!commentText.trim() || !user) return;
    
    const newComment = { 
      id: Date.now(), 
      user: user.name, 
      ig: user.ig, 
      rep: user.rep, 
      text: commentText 
    };

    const updatedNews = news.map(n => 
      n.id === selected.id ? { ...n, comments: [newComment, ...n.comments] } : n
    );
    setNews(updatedNews);
    setSelected({...selected, comments: [newComment, ...selected.comments]});
    
    const currentGlobal = JSON.parse(localStorage.getItem('infoxity_global_comments') || '{}');
    const newsComments = currentGlobal[selected.id] || [];
    currentGlobal[selected.id] = [newComment, ...newsComments];
    localStorage.setItem('infoxity_global_comments', JSON.stringify(currentGlobal));
    
    setCommentText("");
  };

  const getRepColor = (rep: number) => {
    if (rep >= 4000) return "text-amber-400"; 
    if (rep >= 2000) return "text-purple-400"; 
    return "text-blue-500";
  };

  const savedNews = useMemo(() => news.filter(n => savedIds.includes(n.id)), [news, savedIds]);

  if (!user) {
    return (
      <main className="fixed inset-0 bg-black z-[100] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-black italic tracking-tighter text-white">IX</h1>
            <p className="text-gray-500 text-xs font-bold tracking-[0.3em] uppercase">{t.welcome}</p>
          </div>
          <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] space-y-4 shadow-2xl">
            <input type="text" placeholder={t.placeholderName} className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-white/40 transition-all text-sm" onChange={(e) => setNameInput(e.target.value)} />
            <input type="text" placeholder={t.placeholderIg} className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-white/40 transition-all text-sm" onChange={(e) => setIgInput(e.target.value)} />
            <button onClick={handleLogin} className="w-full bg-white text-black p-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 hover:text-white transition-all">
              {t.actionButton}
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <div className={`min-h-screen selection:bg-white selection:text-black ${isCapturing ? 'bg-white' : 'bg-[#050505] text-white'}`}>
      
      {!isCapturing && (
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/90 backdrop-blur-xl px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <span className="text-3xl font-black italic cursor-pointer tracking-tighter" onClick={() => setSelected(null)}>IX</span>
            <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              <span className="hover:text-white cursor-pointer transition-colors">Geopolítica</span>
              <span className="hover:text-white cursor-pointer transition-colors">Cultura</span>
              <span className="hover:text-white cursor-pointer transition-colors">Economía</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="text-[10px] font-black border border-white/20 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-all">
              {lang.toUpperCase()}
            </button>
            <div className="flex items-center gap-2">
              <Library size={16} className={savedIds.length > 0 ? "text-blue-500" : "text-gray-400"} />
              <span className="text-[10px] font-black">{savedIds.length}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">{readers} {t.reading}</span>
            </div>
          </div>
        </nav>
      )}

      <main className={`max-w-screen-xl mx-auto px-4 md:px-10 ${isCapturing ? 'pt-0' : 'pt-28 pb-20'}`}>
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-24">
              
              {/* BRAND MANIFESTO */}
              <section className="bg-[#0a0a0a] border border-white/5 p-12 md:p-24 rounded-[3.5rem] space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] group-hover:bg-blue-600/10 transition-all" />
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter max-w-4xl leading-[0.9]">{t.identityTitle}</h2>
                <p className="text-gray-400 text-xl md:text-3xl font-medium italic leading-relaxed max-w-4xl border-l-2 border-blue-600 pl-8">
                  {t.identityBody}
                </p>
              </section>

              {/* ARCHIVO PERSONAL */}
              {savedNews.length > 0 && (
                <section className="space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-8 bg-blue-600" />
                    <h3 className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase">{t.myLibrary}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {savedNews.map(n => (
                      <div key={n.id} onClick={() => setSelected(n)} className="bg-[#0e0e0e] p-8 rounded-[2.5rem] border border-white/5 cursor-pointer hover:border-blue-500/30 transition-all">
                        <span className="text-[9px] font-black uppercase text-gray-500 mb-4 block tracking-widest">{n.cat}</span>
                        <h4 className="font-bold text-xl leading-tight">{n.title}</h4>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* GRID EDITORIAL */}
              <section className="grid grid-cols-1 md:grid-cols-12 gap-16">
                {news.map((n) => (
                  <div key={n.id} className="md:col-span-6 group cursor-pointer" onClick={() => setSelected(n)}>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">{lang === 'es' ? n.cat : n.catEn}</span>
                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all">
                           <button onClick={(e) => shareOnWhatsApp(e, n)} className="text-green-500 hover:scale-110 transition-transform"><Share2 size={18} /></button>
                           <button onClick={(e) => toggleSave(e, n.id)} className="text-white hover:scale-110 transition-transform">
                             {savedIds.includes(n.id) ? <BookmarkCheck size={18} className="text-blue-500" /> : <Bookmark size={18} />}
                           </button>
                        </div>
                      </div>
                      <h3 className="text-5xl font-black tracking-tighter leading-none group-hover:text-blue-500 transition-colors">
                        {lang === 'es' ? n.title : n.titleEn}
                      </h3>
                      <p className="text-gray-500 text-lg font-medium italic">"{n.context}"</p>
                    </div>
                  </div>
                ))}
              </section>

            </motion.div>
          ) : (
            <motion.article key="article" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`max-w-3xl mx-auto ${isCapturing ? 'text-black p-12' : ''}`}>
              
              {!isCapturing && (
                <div className="flex justify-between items-center mb-24">
                  <button onClick={() => setSelected(null)} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                    <ArrowLeft size={18} /> {t.back}
                  </button>
                  <div className="flex gap-6">
                    <button onClick={(e) => shareOnWhatsApp(e, selected)} className="bg-green-600/10 text-green-500 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/10">WhatsApp</button>
                    <button onClick={() => setIsCapturing(true)} className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                      {t.capture}
                    </button>
                  </div>
                </div>
              )}

              <header className="space-y-10 mb-20">
                <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em]">{lang === 'es' ? selected.cat : selected.catEn}</span>
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] italic">{lang === 'es' ? selected.title : selected.titleEn}</h1>
                <div className="flex items-center justify-between border-y border-white/5 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-black text-sm">IX</div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-tighter">Editorial Board</p>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">JAN 2026 • Curated Intelligence</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    {selected.bias.map((b:number, i:number) => (
                       <div key={i} className="text-center">
                         <p className="text-xs font-black">{b}%</p>
                         <p className="text-[8px] text-gray-500 uppercase font-bold tracking-tighter">{i===0?'Obj':i===1?'Fact':'Bias'}</p>
                       </div>
                    ))}
                  </div>
                </div>
              </header>

              <section className={`prose prose-invert prose-xl font-serif leading-relaxed mb-32 space-y-8 ${isCapturing ? 'text-black' : 'text-gray-300'}`}>
                {selected.content.split('\n\n').map((p: string, i: number) => (
                  <p key={i} className="first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:leading-none">{p}</p>
                ))}
              </section>

              {!isCapturing && (
                <div className="space-y-32">
                  {/* SOURCES AUDIT */}
                  <div className="bg-[#0a0a0a] border border-white/5 p-12 rounded-[3rem] space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 size={18} className="text-blue-500" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">{t.sources}</h4>
                    </div>
                    {selected.sources.map((s:string) => (
                      <div key={s} className="flex justify-between items-center text-xs border-b border-white/5 pb-3">
                        <span className="text-gray-400 font-bold tracking-tight">{s}</span>
                        <span className="text-blue-500 font-black text-[9px]">VERIFIED</span>
                      </div>
                    ))}
                  </div>

                  {/* DEBATE FORUM */}
                  <section className="space-y-16">
                    <div className="flex justify-between items-center border-b-2 border-white/5 pb-6">
                      <h3 className="text-4xl font-black italic tracking-tighter">{t.comments}</h3>
                      <span className="text-[10px] font-black text-gray-500 tracking-[0.2em]">{selected.comments.length} ARGUMENTOS</span>
                    </div>

                    <div className="space-y-12">
                      <div className="relative">
                        <textarea 
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder={t.postComment}
                          className="w-full bg-[#0a0a0a] border border-white/10 p-8 rounded-[2.5rem] outline-none focus:border-blue-500/50 transition-all min-h-[150px] text-lg resize-none text-white font-medium"
                        />
                        <button 
                          onClick={handlePostComment}
                          className="absolute bottom-6 right-6 bg-white text-black p-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl"
                        >
                          <Send size={24} />
                        </button>
                      </div>

                      <div className="space-y-12">
                        {selected.comments.map((c: any) => (
                          <div key={c.id} className="group border-l-2 border-white/5 pl-10 relative">
                            <div className="absolute left-[-2px] top-0 w-0.5 h-0 group-hover:h-full bg-blue-600 transition-all duration-500" />
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-600/10 text-blue-500 rounded-full flex items-center justify-center text-xs font-black">
                                  {c.user[0]}
                                </div>
                                <div>
                                  <span className={`text-sm font-black block tracking-tight ${getRepColor(c.rep)}`}>{c.user}</span>
                                  <span className="text-[10px] text-pink-500 font-black uppercase tracking-tighter">{c.ig}</span>
                                </div>
                              </div>
                              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{c.rep} XP</span>
                            </div>
                            <p className="text-gray-300 text-xl leading-relaxed italic font-medium">
                              "{c.text}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {isCapturing && (
                <div className="mt-32 pt-10 border-t-4 border-black flex justify-between items-center italic font-black">
                  <span className="text-4xl">INFOXITY.</span>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest">Resistencia Intelectual</p>
                    <p className="text-[10px] text-gray-400">© 2026 OFFICIAL ARCHIVE</p>
                  </div>
                </div>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-24 text-center border-t border-white/5">
        <p className="text-[11px] font-black tracking-[1.5em] uppercase text-gray-600">Soberanía de la Información</p>
      </footer>
      
      {isCapturing && (
        <button onClick={() => setIsCapturing(false)} className="fixed bottom-10 right-10 bg-black text-white p-5 rounded-full z-[200] border border-white/20 shadow-2xl active:scale-90 transition-all">
          <X size={24} />
        </button>
      )}
    </div>
  );
}
