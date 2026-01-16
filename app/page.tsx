"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Languages, Award, Bookmark, 
  BookmarkCheck, CheckCircle2, ArrowLeft, Mic2, 
  Star, Share2, Send, Zap, Globe, Fingerprint
} from 'lucide-react';

// --- CONFIGURACIÓN DE TU CORREO (Asegúrate de poner tu ID aquí) ---
const FORMSPREE_ID = "TU_ID_AQUÍ";

const TRANSLATIONS = {
  es: {
    siteName: "Infoxity",
    tagline: "Resistencia Intelectual",
    welcome: "Bienvenido a la Resistencia.",
    onboarding: "Filtramos el ruido mediático para mentes críticas. Identifícate para acceder al debate.",
    reading: "en línea",
    quickContext: "Análisis Flash",
    biasAnalysis: "Auditoría de Sesgo",
    reputation: "puntos",
    comments: "Debate Comunitario",
    postComment: "Tu argumento basado en datos...",
    capture: "Modo Story",
    identityTitle: "¿Por qué Infoxity?",
    identityBody: "Somos un ecosistema híbrido donde la IA procesa datos y los humanos aportan criterio. Noticias profundas para una generación que no se conforma con titulares.",
    back: "Volver",
    featured: "EDITORIAL",
    sources: "Fuentes",
    actionButton: "Acceder al Sistema",
    publish: "Enviar",
    myLibrary: "Guardados",
    placeholderName: "Nombre completo",
    placeholderIg: "@instagram",
    popular: "Tendencias",
    share: "Compartir"
  },
  en: {
    siteName: "Infoxity",
    tagline: "Intellectual Resistance",
    welcome: "Welcome to the Resistance.",
    onboarding: "Filtering noise for critical minds. Identify yourself to join the debate.",
    reading: "online",
    quickContext: "Flash Analysis",
    biasAnalysis: "Bias Audit",
    reputation: "pts",
    comments: "Community Debate",
    postComment: "Your data-based argument...",
    capture: "Story Mode",
    identityTitle: "Why Infoxity?",
    identityBody: "A hybrid ecosystem where AI processes data and humans provide judgment. Deep news for a generation that demands more than headlines.",
    back: "Back",
    featured: "EDITORIAL",
    sources: "Sources",
    actionButton: "Access System",
    publish: "Send",
    myLibrary: "Saved",
    placeholderName: "Full name",
    placeholderIg: "@instagram",
    popular: "Trending",
    share: "Share"
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
    sources: ["OPEP+ Energy Report", "Digital Geopolitics Journal"],
    color: "from-orange-500 to-red-600",
    shadow: "shadow-orange-500/20",
    comments: [
      { id: 1, user: "Mateo Fernández", ig: "@mateo_fdz", rep: 1250, text: "La energía manda, las ideologías solo adornan. 🔋" },
      { id: 101, user: "Elena Vega", ig: "@elvega_geo", rep: 890, text: "Interesante cómo la IA está redibujando el mapa de poder." }
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
    color: "from-fuchsia-500 to-purple-600",
    shadow: "shadow-fuchsia-500/20",
    comments: [
      { id: 3, user: "Carlos Ruiz", ig: "@cruiz_filmes", rep: 560, text: "Por fin podré hablar de la serie sin spoilers. 🙌" }
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
    sources: ["Pew Research Center 2026"],
    color: "from-cyan-500 to-blue-600",
    shadow: "shadow-cyan-500/20",
    comments: [
      { id: 4, user: "Lucía Méndez", ig: "@lucia_vota", rep: 2100, text: "La eficiencia no tiene color político. Queremos que funcione." }
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

  useEffect(() => {
    const savedUser = localStorage.getItem('infoxity_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedVotes = localStorage.getItem('infoxity_votes');
    if (savedVotes) setVotedPolls(JSON.parse(savedVotes));
    const interval = setInterval(() => setReaders(p => p + (Math.floor(Math.random()*15)-7)), 4000);
    return () => clearInterval(interval);
  }, []);

  const t = TRANSLATIONS[lang];

  const sendToAdmin = async (subject: string, data: any) => {
    try {
      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ asunto: subject, ...data }),
      });
    } catch (e) { console.error(e); }
  };

  const handleLogin = () => {
    if (nameInput.length > 2) {
      const newUser = { name: nameInput, ig: igInput || "@anonimo", rep: 100 };
      setUser(newUser);
      localStorage.setItem('infoxity_user', JSON.stringify(newUser));
      sendToAdmin("NUEVO REGISTRO", { nombre: nameInput, instagram: igInput });
    }
  };

  const shareOnWhatsApp = (item: any) => {
    const text = `🔥 *${item.title}*\n\nLee el análisis profundo en Infoxity:\n${window.location.href}`;
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
    setVotedPolls([...votedPolls, newsId]);
    localStorage.setItem('infoxity_votes', JSON.stringify([...votedPolls, newsId]));
  };

  const postComment = () => {
    if(!commentText.trim() || !user) return;
    const newItem = { id: Date.now(), user: user.name, ig: user.ig, rep: user.rep + 15, text: commentText };
    const updated = news.map(n => n.id === selected.id ? { ...n, comments: [newItem, ...n.comments] } : n);
    setNews(updated);
    setSelected({...selected, comments: [newItem, ...selected.comments]});
    sendToAdmin("COMENTARIO", { usuario: user.name, msg: commentText, noticia: selected.title });
    setCommentText("");
  };

  const savedNews = useMemo(() => news.filter(n => savedIds.includes(n.id)), [news, savedIds]);

  if (!user) {
    return (
      <main className="fixed inset-0 bg-[#050505] z-[100] flex items-center justify-center p-6 overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="max-w-md w-full relative z-10"
        >
          <div className="bg-white/5 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl text-center">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-2xl shadow-blue-500/20">
              <Shield className="text-white" size={40} />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">{t.welcome}</h1>
            <p className="text-gray-400 text-sm mb-10 leading-relaxed px-4">{t.onboarding}</p>
            
            <div className="space-y-4 mb-8">
              <div className="relative group">
                <input 
                  type="text" placeholder={t.placeholderName} 
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white font-medium outline-none focus:border-blue-500/50 transition-all text-lg"
                  onChange={(e) => setNameInput(e.target.value)}
                />
              </div>
              <div className="relative">
                <input 
                  type="text" placeholder={t.placeholderIg} 
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white font-medium outline-none focus:border-blue-500/50 transition-all text-lg"
                  onChange={(e) => setIgInput(e.target.value)}
                />
              </div>
            </div>

            <button 
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white p-5 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
            >
              <Fingerprint size={24} /> {t.actionButton}
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-700 ${isCapturing ? 'bg-black' : 'bg-[#0a0a0a]'}`}>
      
      {/* HEADER ULTRA MODERNO */}
      {!isCapturing && (
        <header className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-xl z-50 px-6 py-4 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelected(null)}>
            <div className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black italic shadow-lg shadow-blue-600/20">IX</div>
            <span className="font-bold text-lg tracking-tight text-white hidden xs:block">Infoxity</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{readers} {t.reading}</span>
            </div>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="w-10 h-10 flex items-center justify-center bg-white/5 text-white rounded-xl border border-white/10 hover:bg-white/10 transition-all">
              <Globe size={18} />
            </button>
          </div>
        </header>
      )}

      <main className={`max-w-6xl mx-auto px-4 sm:px-6 ${isCapturing ? 'pt-0' : 'pt-24 pb-20'}`}>
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              
              {/* SECCIÓN GUARDADOS MÓVIL */}
              {savedNews.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6 px-2">
                    <h3 className="text-[11px] font-black tracking-[0.3em] text-blue-500 uppercase flex items-center gap-2"><Star size={14} fill="currentColor" /> {t.myLibrary}</h3>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
                    {savedNews.map(n => (
                      <div key={n.id} onClick={() => setSelected(n)} className="min-w-[260px] bg-white/5 border border-white/10 p-6 rounded-[2rem] cursor-pointer active:scale-95 transition-all">
                        <span className="text-[10px] font-bold uppercase text-gray-500 mb-2 block">{n.cat}</span>
                        <h4 className="font-bold text-white text-lg leading-tight line-clamp-2">{n.title}</h4>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* HERO FEATURED */}
              <section className="relative group cursor-pointer" onClick={() => setSelected(news[0])}>
                <div className={`absolute inset-0 bg-gradient-to-br ${news[0].color} opacity-20 blur-[80px] group-hover:opacity-40 transition-opacity`} />
                <div className="relative bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 overflow-hidden min-h-[450px] flex flex-col justify-end shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Shield size={200} /></div>
                  <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] mb-6 inline-block w-fit uppercase">{t.featured}</span>
                  <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9] mb-6 group-hover:translate-x-2 transition-transform">{news[0].title}</h2>
                  <p className="text-gray-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed italic line-clamp-3">"{news[0].context}"</p>
                </div>
              </section>

              {/* GRID DE NOTICIAS MEJORADO PARA MÓVIL */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {news.slice(1).map(n => (
                  <motion.div 
                    key={n.id} 
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between min-h-[350px] relative overflow-hidden group hover:border-white/20 transition-all"
                  >
                    <div onClick={() => setSelected(n)} className="cursor-pointer">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-gradient-to-r ${n.color} text-white mb-6 inline-block shadow-lg`}>{n.cat}</span>
                      <h3 className="text-3xl font-bold text-white leading-tight mb-4 group-hover:text-blue-400 transition-colors">{n.title}</h3>
                      <p className="text-gray-500 font-medium line-clamp-2 italic">"{n.context}"</p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-8 border-t border-white/5 mt-8">
                      <div className="flex gap-2">
                        <button onClick={() => toggleSave(n.id)} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${savedIds.includes(n.id) ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-500'}`}>
                          <Bookmark size={20} fill={savedIds.includes(n.id) ? "currentColor" : "none"} />
                        </button>
                        <button onClick={() => shareOnWhatsApp(n)} className="w-12 h-12 rounded-2xl bg-white/5 text-gray-500 flex items-center justify-center hover:text-green-500"><Share2 size={20} /></button>
                      </div>
                      <button onClick={() => setSelected(n)} className="bg-white text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all">
                        Leer <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </section>

              {/* POR QUÉ INFOCITY (BANNER) */}
              <section className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-white/5 p-10 md:p-16 rounded-[3rem] text-center">
                <h3 className="text-2xl font-bold text-white mb-4">{t.identityTitle}</h3>
                <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">{t.identityBody}</p>
              </section>

            </motion.div>
          ) : (
            /* VISTA DE NOTICIA INDIVIDUAL */
            <motion.article 
              key="article" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className={`max-w-3xl mx-auto ${isCapturing ? 'bg-white p-8 rounded-[3rem] border-8 border-black text-black' : 'pb-20'}`}
            >
              {!isCapturing && (
                <div className="flex justify-between items-center mb-10 sticky top-24 z-40 bg-black/50 backdrop-blur p-2 rounded-2xl border border-white/5">
                  <button onClick={() => setSelected(null)} className="flex items-center gap-2 px-4 py-2 text-gray-400 font-bold hover:text-white transition-all">
                    <ArrowLeft size={20} /> {t.back}
                  </button>
                  <button onClick={() => setIsCapturing(true)} className="bg-white text-black px-5 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-2 shadow-lg active:scale-95 transition-all">
                    <Instagram size={18} /> {t.capture}
                  </button>
                </div>
              )}

              <header className="mb-12">
                <span className={`text-[11px] font-black uppercase tracking-[0.2em] text-white bg-gradient-to-r ${selected.color} px-6 py-2 rounded-full mb-8 inline-block shadow-xl`}>{selected.cat}</span>
                <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-10 text-white">{selected.title}</h1>
                <div className="bg-white/5 p-8 rounded-[2.5rem] border-l-8 border-blue-600 shadow-xl">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-3 flex items-center gap-2"><Zap size={16} /> {t.quickContext}</h4>
                  <p className="text-xl md:text-2xl font-bold italic text-gray-200 leading-snug">"{selected.context}"</p>
                </div>
              </header>

              <section className="prose prose-invert prose-xl max-w-none text-gray-300 font-medium leading-[1.6] mb-16 space-y-8">
                {selected.content.split('\n\n').map((p: string, i: number) => (
                  <p key={i} className="first-letter:text-5xl first-letter:font-black first-letter:text-blue-500 first-letter:mr-3 first-letter:float-left">{p}</p>
                ))}
              </section>

              {!isCapturing && (
                <div className="space-y-16">
                  {/* AUDITORÍA glassmorphism */}
                  <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-8 flex items-center gap-2"><BarChart3 size={18} className="text-blue-500" /> {t.biasAnalysis}</h5>
                    <div className="grid grid-cols-1 gap-8">
                      {['Objetividad', 'Hechos', 'Neutralidad'].map((label, i) => (
                        <div key={label}>
                          <div className="flex justify-between text-xs font-bold text-white mb-3 uppercase tracking-widest"><span>{label}</span><span className="text-blue-500">{selected.bias[i]}%</span></div>
                          <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${selected.bias[i]}%` }} className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ENCUESTA ULTRA MODERNA */}
                  <div className="bg-gradient-to-br from-indigo-900/40 to-black border border-white/10 p-8 md:p-12 rounded-[3rem] overflow-hidden relative">
                    <h3 className="text-3xl font-bold text-white mb-10 relative z-10">{selected.poll.q}</h3>
                    <div className="space-y-4 relative z-10">
                      {selected.poll.opts.map((o: string, i: number) => {
                        const hasVoted = votedPolls.includes(selected.id);
                        const total = selected.poll.votes.reduce((a:number, b:number) => a + b, 0);
                        const percentage = Math.round((selected.poll.votes[i] / total) * 100);
                        return (
                          <button key={o} disabled={hasVoted} onClick={() => handleVote(selected.id, i)} className={`w-full relative p-6 rounded-2xl text-left font-bold transition-all border ${hasVoted ? 'border-white/5' : 'border-white/10 hover:border-blue-500 bg-white/5 active:scale-[0.98]'}`}>
                            {hasVoted && <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} className="absolute left-0 top-0 h-full bg-blue-600/30 rounded-r-lg" />}
                            <div className="relative z-10 flex justify-between items-center text-white">
                              <span>{o} {hasVoted && selected.poll.votes[i] === Math.max(...selected.poll.votes) && <CheckCircle2 size={20} className="inline text-blue-400 ml-2" />}</span>
                              {hasVoted && <span className="font-black">{percentage}%</span>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* DEBATE ESTILO APP */}
                  <section className="bg-white/5 border border-white/10 p-8 rounded-[3rem]">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3"><MessageSquare className="text-blue-500" /> {t.comments}</h3>
                    
                    <div className="mb-10 bg-white/5 p-6 rounded-2xl border border-white/5">
                      <textarea placeholder={t.postComment} className="w-full bg-transparent outline-none text-white font-medium resize-none min-h-[100px]" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                      <div className="flex justify-end mt-4">
                        <button onClick={postComment} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm uppercase flex items-center gap-2 hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-600/20">
                          {t.publish} <Send size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {selected.comments.map((c: any) => (
                        <div key={c.id} className="p-6 bg-white/5 border border-white/5 rounded-2xl">
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <span className="font-bold text-white block">{c.user}</span>
                              <span className="text-[10px] text-pink-500 font-black">{c.ig}</span>
                            </div>
                            <span className="text-[10px] bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full font-black border border-blue-500/20">{c.rep} {t.reputation}</span>
                          </div>
                          <p className="text-gray-400 italic text-lg leading-relaxed font-medium">"{c.text}"</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* FOOTER DE CAPTURA ESTILO "VOGUE" */}
              {isCapturing && (
                <div className="mt-20 pt-10 border-t-2 border-black flex justify-between items-center text-black">
                  <div className="font-black italic text-3xl">IX INFOCITY</div>
                  <div className="text-right text-[10px] font-black tracking-widest uppercase">Resistencia Intelectual 2026</div>
                </div>
              )}

              {isCapturing && (
                <button onClick={() => setIsCapturing(false)} className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-widest z-[100] shadow-2xl active:scale-95 transition-all">
                  Finalizar Captura
                </button>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      {!isCapturing && (
        <footer className="py-20 border-t border-white/5 text-center px-6">
          <div className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center font-black italic shadow-lg shadow-blue-600/20
