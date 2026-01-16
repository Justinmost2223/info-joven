"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Languages, Award, Bookmark, 
  BookmarkCheck, CheckCircle2, ArrowLeft, Mic2, 
  TrendingUp, Scale, Star, Menu, X, Share2, Send, Zap, Globe
} from 'lucide-react';

// --- SISTEMA DE IDIOMAS (Mantenido intacto) ---
const TRANSLATIONS = {
  es: {
    siteName: "Infoxity",
    tagline: "Resistencia Intelectual",
    welcome: "Bienvenido a Infoxity.",
    onboarding: "Limpiamos el ruido mediático. Introduce tu identidad para el debate.",
    reading: "en línea",
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
    reading: "online",
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
    shadow: "shadow-orange-500/40",
    comments: [
      { id: 1, user: "Mateo Fernández", ig: "@mateo_fdz", rep: 1250, text: "La energía manda, las ideologías solo adornan. 🔋" },
      { id: 101, user: "Elena Vega", ig: "@elvega_geo", rep: 890, text: "Interesante cómo la IA está redibujando el mapa de poder que creíamos muerto." }
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
    shadow: "shadow-purple-500/40",
    comments: [
      { id: 3, user: "Carlos Ruiz", ig: "@cruiz_filmes", rep: 560, text: "Por fin podré hablar de la serie sin spoilers el primer día. 🙌" }
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
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/40",
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
    const text = `🛡️ *${item.title}*\n"${item.context}"\n\nLeelo aquí: ${window.location.href}`;
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
      <main className="fixed inset-0 bg-black z-[100] flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1a1a1a_0%,_#000_100%)] opacity-80" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full p-8 rounded-[2.5rem] bg-[#111] border border-white/10 text-center relative shadow-2xl">
          <div className="bg-blue-600 text-white inline-block px-6 py-2 font-black text-3xl italic mb-6 rounded-xl shadow-[0_0_30px_rgba(37,99,235,0.4)]">IX</div>
          <h1 className="text-3xl font-bold mb-4 text-white tracking-tight">{t.welcome}</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed px-4">{t.onboarding}</p>
          <div className="space-y-4 mb-8">
            <input type="text" placeholder={t.placeholderName} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium outline-none focus:border-blue-500 transition-all" onChange={(e) => setNameInput(e.target.value)} />
            <input type="text" placeholder={t.placeholderIg} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium outline-none focus:border-pink-500 transition-all" onChange={(e) => setIgInput(e.target.value)} />
          </div>
          <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95">
            {t.actionButton}
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isCapturing ? 'bg-white p-0' : 'bg-[#080808]'}`}>
      
      {!isCapturing && (
        <header className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-xl z-50 px-6 py-4 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelected(null)}>
            <div className="bg-blue-600 text-white px-2 py-0.5 rounded-lg font-black text-xl italic shadow-lg shadow-blue-600/20">IX</div>
            <span className="font-bold text-lg text-white tracking-tight hidden xs:block">Infoxity</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/5 px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{readers} {t.reading}</span>
            </div>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="w-9 h-9 flex items-center justify-center bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
              <Globe size={18} />
            </button>
          </div>
        </header>
      )}

      <main className={`max-w-6xl mx-auto px-4 sm:px-6 ${isCapturing ? 'pt-0' : 'pt-24 pb-20'}`}>
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-12">
              
              {/* Carrusel de Guardados (Mejorado para móvil) */}
              {savedNews.length > 0 && (
                <section>
                  <h3 className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase mb-4 px-2 flex items-center gap-2">
                    <Star size={14} fill="currentColor" /> {t.myLibrary}
                  </h3>
                  <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
                    {savedNews.map(n => (
                      <div key={n.id} onClick={() => setSelected(n)} className="min-w-[280px] bg-[#121212] p-6 rounded-[2rem] border border-white/5 cursor-pointer hover:border-blue-500/50 transition-all">
                        <span className="text-[9px] font-bold uppercase text-gray-500 mb-2 block">{lang === 'es' ? n.cat : n.catEn}</span>
                        <h4 className="font-bold text-white text-lg leading-tight line-clamp-2">{lang === 'es' ? n.title : n.titleEn}</h4>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Hero Post */}
              <section className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 p-8 md:p-16 flex flex-col justify-end min-h-[450px] shadow-2xl group cursor-pointer" onClick={() => setSelected(news[0])}>
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Shield size={250} className="text-white" /></div>
                <div className="relative z-10">
                  <span className="bg-blue-600 text-[10px] font-black px-4 py-1 rounded-full tracking-widest mb-6 inline-block uppercase text-white shadow-lg">{t.featured}</span>
                  <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-6 leading-[0.9]">{t.identityTitle}</h2>
                  <p className="text-gray-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed italic opacity-80">{t.identityBody}</p>
                </div>
              </section>

              {/* Grid de Noticias Secundarias */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.map(n => (
                  <motion.div key={n.id} whileHover={{ y: -5 }} className="bg-[#121212] p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between min-h-[380px] relative overflow-hidden group">
                    <div className="cursor-pointer" onClick={() => setSelected(n)}>
                      <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase text-white bg-gradient-to-r ${n.color} mb-6 inline-block shadow-lg ${n.shadow}`}>
                        {lang === 'es' ? n.cat : n.catEn}
                      </span>
                      <h3 className="text-2xl font-bold text-white leading-tight mb-4 group-hover:text-blue-400 transition-colors">{lang === 'es' ? n.title : n.titleEn}</h3>
                      <p className="text-gray-500 text-base font-medium leading-relaxed italic line-clamp-3">"{n.context}"</p>
                    </div>
                    <div className="flex justify-between items-center pt-8 border-t border-white/5 mt-8">
                      <div className="flex gap-2">
                        <button onClick={() => toggleSave(n.id)} className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 transition-all active:scale-125">
                          {savedIds.includes(n.id) ? <BookmarkCheck className="text-blue-500" size={22} /> : <Bookmark className="text-gray-600" size={22} />}
                        </button>
                        <button onClick={() => shareOnWhatsApp(n)} className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 text-gray-600 hover:text-green-500">
                          <Share2 size={20} />
                        </button>
                      </div>
                      <button onClick={() => setSelected(n)} className="bg-white text-black px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all">
                        Leer <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </section>
            </motion.div>
          ) : (
            /* Vista Articulo Extendido */
            <motion.article key="article" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className={`max-w-3xl mx-auto ${isCapturing ? 'bg-white p-10 rounded-none border-[12px] border-black text-black' : 'pb-20'}`}>
              
              {!isCapturing && (
                <div className="flex justify-between items-center mb-10">
                  <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500 hover:text-white transition-all">
                    <ArrowLeft size={18} /> {t.back}
                  </button>
                  <button onClick={() => setIsCapturing(true)} className="bg-white text-black px-5 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-2 shadow-lg hover:bg-blue-600 hover:text-white transition-all">
                    <Instagram size={18} /> {t.capture}
                  </button>
                </div>
              )}

              <header className="mb-12">
                <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase text-white bg-gradient-to-r ${selected.color} mb-8 inline-block shadow-xl`}>
                  {lang === 'es' ? selected.cat : selected.catEn}
                </span>
                <h1 className={`text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-10 ${isCapturing ? 'text-black' : 'text-white'}`}>
                  {lang === 'es' ? selected.title : selected.titleEn}
                </h1>
                <div className={`p-8 rounded-[2rem] border-l-8 border-blue-600 ${isCapturing ? 'bg-gray-100 shadow-none' : 'bg-white/5 shadow-2xl shadow-blue-900/10'}`}>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 flex items-center gap-2 text-blue-500"><Mic2 size={16}/> {t.quickContext}</h4>
                  <p className={`text-xl md:text-2xl font-bold italic leading-snug ${isCapturing ? 'text-gray-800' : 'text-gray-200'}`}>"{selected.context}"</p>
                </div>
              </header>

              <section className={`prose prose-invert prose-xl max-w-none font-serif leading-relaxed mb-16 space-y-8 ${isCapturing ? 'text-gray-800' : 'text-gray-300'}`}>
                {selected.content.split('\n\n').map((p: string, i: number) => (
                  <p key={i} className="first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-blue-500">{p}</p>
                ))}
              </section>

              {!isCapturing && (
                <div className="space-y-16">
                  {/* Auditoría de Sesgo */}
                  <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-sm">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-gray-500 flex items-center gap-3">
                      <BarChart3 size={18} className="text-blue-500"/> {t.biasAnalysis}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      {['Objetividad', 'Hechos', 'Neutralidad'].map((label, i) => (
                        <div key={label}>
                          <div className="flex justify-between text-[10px] font-bold uppercase mb-3 text-white">
                            <span>{label}</span>
                            <span className="text-blue-500">{selected.bias[i]}%</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${selected.bias[i]}%` }} className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Encuesta Dinámica */}
                  <div className="bg-white text-black p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12"><Scale size={150}/></div>
                    <h3 className="text-2xl md:text-4xl font-bold mb-10 relative z-10">{selected.poll.q}</h3>
                    <div className="space-y-3 relative z-10">
                      {selected.poll.opts.map((o: string, i: number) => {
                        const total = selected.poll.votes.reduce((a:number, b:number) => a + b, 0);
                        const percentage = Math.round((selected.poll.votes[i] / total) * 100);
                        const hasVoted = votedPolls.includes(selected.id);
                        return (
                          <button key={o} disabled={hasVoted} onClick={() => handleVote(selected.id, i)} className={`w-full relative p-6 rounded-2xl text-left font-bold border-2 transition-all overflow-hidden ${hasVoted ? 'border-gray-100 cursor-default' : 'border-black hover:bg-black hover:text-white active:scale-[0.98]'}`}>
                            {hasVoted && <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} className={`absolute left-0 top-0 h-full ${selected.poll.votes[i] === Math.max(...selected.poll.votes) ? 'bg-blue-600/10' : 'bg-gray-50'}`} />}
                            <div className="relative z-10 flex justify-between items-center">
                              <span className="text-lg">{o}</span>
                              {hasVoted && <span className="text-2xl font-black">{percentage}%</span>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Debate */}
                  <section className="bg-[#121212] p-8 md:p-12 rounded-[3rem] border border-white/5">
                    <h3 className="text-2xl font-bold mb-10 flex items-center gap-3 text-white italic"><MessageSquare size={28} className="text-blue-500"/> {t.comments}</h3>
                    <div className="space-y-8">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl text-white shrink-0 shadow-lg">{user.name[0]}</div>
                        <div className="flex-1">
                          <textarea placeholder={t.postComment} className="w-full bg-white/5 p-6 rounded-2xl outline-none border border-white/5 text-white font-medium focus:border-blue-500/50 min-h-[120px]" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                          <button onClick={() => {
                            if(commentText.trim()) {
                              const newItem = { id: Date.now(), user: user.name, ig: user.ig, rep: user.rep + 15, text: commentText };
                              const updated = news.map(n => n.id === selected.id ? { ...n, comments: [newItem, ...n.comments] } : n);
                              setNews(updated);
                              setSelected({...selected, comments: [newItem, ...selected.comments]});
                              setCommentText("");
                            }
                          }} className="mt-4 bg-white text-black px-8 py-3 rounded-xl font-bold text-sm uppercase flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-white/5">
                            <Send size={16}/> {t.publish}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-6 pt-10 border-t border-white/5">
                        {selected.comments.map((c: any) => (
                          <div key={c.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-bold text-white block">{c.user}</span>
                                <span className="text-[10px] text-pink-500 font-bold">{c.ig}</span>
                              </div>
                              <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[9px] font-black uppercase border border-blue-500/20 flex items-center gap-1">
                                <Award size={12}/> {c.rep} {t.reputation}
                              </div>
                            </div>
                            <p className="text-gray-400 font-medium italic">"{c.text}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {isCapturing && (
                <div className="mt-20 pt-10 border-t-4 border-black flex justify-between items-center">
                  <div className="bg-black text-white px-4 py-1 font-black text-2xl italic">IX</div>
                  <p className="text-[10px] font-black text-black uppercase tracking-[0.3em]">Resistencia Intelectual 2026</p>
                </div>
              )}

              {isCapturing && (
                <button onClick={() => setIsCapturing(false)} className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-10 py-4 rounded-full font-black uppercase tracking-widest z-[100] shadow-2xl transition-all active:scale-95">
                  Finalizar Captura
                </button>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      {!isCapturing && (
        <footer className="py-12 border-t border-white/5 text-center px-6">
          <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em]">Infoxity 2026 — Digital Sovereignty</p>
        </footer>
      )}

    </div>
  );
}
