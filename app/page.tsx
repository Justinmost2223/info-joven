"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Languages, Award, Bookmark, 
  BookmarkCheck, CheckCircle2, ArrowLeft, Mic2, 
  TrendingUp, Scale, Star, Menu, X, Share2, Send, Zap, Globe,
  MoreHorizontal, Heart, MessageCircle
} from 'lucide-react';

// --- TRADUCCIONES (Mantenidas al 100%) ---
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
    comments: "Debate Público",
    postComment: "Escribe tu argumento...",
    capture: "Captura para IG",
    identityTitle: "¿Por qué Infoxity?",
    identityBody: "Somos un equipo híbrido de IA y humanos que limpian el ruido mediático para ofrecer noticias objetivas, largas y analíticas, diseñadas para que los jóvenes cultos debatan con respeto.",
    back: "Volver",
    featured: "EDITORIAL",
    sources: "Fuentes Verificadas",
    actionButton: "Acceder al Sistema",
    publish: "Publicar",
    myLibrary: "Guardados",
    noSaved: "No tienes noticias guardadas.",
    voteThanks: "Voto registrado con éxito",
    placeholderName: "Tu nombre...",
    placeholderIg: "@tu_usuario",
    popular: "Tendencias",
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
    comments: "Public Debate",
    postComment: "Write your argument...",
    capture: "IG Capture",
    identityTitle: "Why Infoxity?",
    identityBody: "We are a hybrid team of AI and humans cleaning media noise to offer objective, long-form analytical news, designed for educated youth to debate with respect.",
    back: "Back",
    featured: "EDITORIAL",
    sources: "Verified Sources",
    actionButton: "Access System",
    publish: "Publish",
    myLibrary: "Saved",
    noSaved: "No saved stories yet.",
    voteThanks: "Vote registered successfully",
    placeholderName: "Your name...",
    placeholderIg: "@your_user",
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-black italic tracking-tighter text-white">IX</h1>
            <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">{t.welcome}</p>
          </div>
          <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] space-y-4 shadow-2xl">
            <input type="text" placeholder={t.placeholderName} className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-white/40 transition-all" onChange={(e) => setNameInput(e.target.value)} />
            <input type="text" placeholder={t.placeholderIg} className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-white/40 transition-all" onChange={(e) => setIgInput(e.target.value)} />
            <button onClick={handleLogin} className="w-full bg-white text-black p-4 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-gray-200 transition-all">
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
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="text-2xl font-black italic cursor-pointer" onClick={() => setSelected(null)}>IX</span>
            <div className="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <span className="hover:text-white cursor-pointer transition-colors">Geopolítica</span>
              <span className="hover:text-white cursor-pointer transition-colors">Cultura</span>
              <span className="hover:text-white cursor-pointer transition-colors">Economía</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="text-[10px] font-black border border-white/20 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-all">
              {lang.toUpperCase()}
            </button>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">{readers} Live</span>
            </div>
          </div>
        </nav>
      )}

      <main className={`max-w-screen-xl mx-auto px-4 md:px-10 ${isCapturing ? 'pt-0' : 'pt-24 pb-20'}`}>
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
              
              {/* Hero Realist - Se siente como una portada de revista */}
              <section className="group cursor-pointer relative" onClick={() => setSelected(news[0])}>
                <div className="flex flex-col md:flex-row gap-8 items-end">
                  <div className="flex-1 space-y-6">
                    <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">{t.featured}</span>
                    <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85]">
                      {lang === 'es' ? news[0].title : news[0].titleEn}
                    </h2>
                  </div>
                  <div className="md:w-1/3 border-l border-white/10 pl-6 space-y-4">
                    <p className="text-gray-400 font-medium italic text-lg leading-snug">"{news[0].context}"</p>
                    <div className="flex items-center gap-2 text-white font-bold text-xs uppercase">
                      Leer artículo <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </section>

              <div className="h-[1px] bg-white/5 w-full" />

              {/* Grid Estilo Editorial */}
              <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {news.slice(1).map((n) => (
                  <div key={n.id} className="md:col-span-6 group cursor-pointer" onClick={() => setSelected(n)}>
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{lang === 'es' ? n.cat : n.catEn}</span>
                      <h3 className="text-4xl font-bold tracking-tight group-hover:underline decoration-1 underline-offset-8 transition-all">
                        {lang === 'es' ? n.title : n.titleEn}
                      </h3>
                      <p className="text-gray-500 line-clamp-2 font-medium">{n.context}</p>
                    </div>
                  </div>
                ))}
              </section>

              {/* Quienes Somos - Sección Estilo Manifiesto */}
              <section className="bg-[#0a0a0a] border border-white/5 p-10 md:p-20 rounded-[3rem] text-center space-y-8">
                <Shield size={40} className="mx-auto text-blue-500" />
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">{t.identityBody}</h2>
              </section>

            </motion.div>
          ) : (
            <motion.article key="article" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`max-w-2xl mx-auto ${isCapturing ? 'text-black p-8' : ''}`}>
              
              {!isCapturing && (
                <div className="flex justify-between items-center mb-20">
                  <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                    <ArrowLeft size={16} /> {t.back}
                  </button>
                  <div className="flex gap-4">
                    <button onClick={() => toggleSave(selected.id)} className="text-gray-500 hover:text-white transition-all">
                      {savedIds.includes(selected.id) ? <BookmarkCheck size={20} className="text-blue-500" /> : <Bookmark size={20} />}
                    </button>
                    <button onClick={() => setIsCapturing(true)} className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter hover:bg-blue-500 hover:text-white transition-all">
                      {t.capture}
                    </button>
                  </div>
                </div>
              )}

              <header className="space-y-8 mb-16">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">{lang === 'es' ? selected.cat : selected.catEn}</span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none italic">{lang === 'es' ? selected.title : selected.titleEn}</h1>
                <div className="flex items-center gap-4 border-y border-white/5 py-6">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center font-black text-xs">IX</div>
                  <div>
                    <p className="text-[10px] font-black uppercase">Redacción Infoxity</p>
                    <p className="text-[10px] text-gray-500">16 ENE 2026 • 6 MIN READ</p>
                  </div>
                </div>
              </header>

              <section className={`prose prose-invert prose-lg font-serif leading-relaxed mb-20 space-y-6 ${isCapturing ? 'text-black' : 'text-gray-300'}`}>
                {selected.content.split('\n\n').map((p: string, i: number) => (
                  <p key={i} className="first-letter:text-5xl first-letter:font-black first-letter:mr-2 first-letter:float-left">{p}</p>
                ))}
              </section>

              {!isCapturing && (
                <div className="space-y-24">
                  {/* Encuesta Minimalista */}
                  <div className="border border-white/10 p-10 rounded-[2rem]">
                    <h4 className="text-2xl font-bold mb-8">{selected.poll.q}</h4>
                    <div className="space-y-3">
                      {selected.poll.opts.map((o: string, i: number) => {
                        const total = selected.poll.votes.reduce((a:number, b:number) => a + b, 0);
                        const perc = Math.round((selected.poll.votes[i] / total) * 100);
                        const hasVoted = votedPolls.includes(selected.id);
                        return (
                          <button key={o} disabled={hasVoted} onClick={() => handleVote(selected.id, i)} className="group w-full relative h-14 rounded-xl border border-white/10 overflow-hidden transition-all active:scale-[0.98]">
                            {hasVoted && <motion.div initial={{ width: 0 }} animate={{ width: `${perc}%` }} className="absolute left-0 top-0 h-full bg-white/5" />}
                            <div className="relative z-10 px-6 flex justify-between items-center h-full">
                              <span className="text-sm font-bold">{o}</span>
                              {hasVoted && <span className="text-sm font-black italic">{perc}%</span>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* DEBATE - DISEÑO NATURAL TIPO CHAT PREMIUM */}
                  <section className="space-y-10">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <h3 className="text-xl font-bold italic">{t.comments}</h3>
                      <span className="text-[10px] font-bold text-gray-500">{selected.comments.length} ARGUMENTOS</span>
                    </div>

                    <div className="space-y-8">
                      {/* Input de Comentario Estilo Moderno */}
                      <div className="relative group">
                        <textarea 
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder={t.postComment}
                          className="w-full bg-[#111] border border-white/5 p-6 rounded-2xl outline-none focus:border-white/20 transition-all min-h-[100px] text-sm resize-none"
                        />
                        <button 
                          onClick={() => {
                            if(commentText.trim()) {
                              const newItem = { id: Date.now(), user: user.name, ig: user.ig, rep: user.rep + 15, text: commentText };
                              const updated = news.map(n => n.id === selected.id ? { ...n, comments: [newItem, ...n.comments] } : n);
                              setNews(updated);
                              setSelected({...selected, comments: [newItem, ...selected.comments]});
                              setCommentText("");
                            }
                          }}
                          className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                        >
                          <Send size={18} />
                        </button>
                      </div>

                      {/* Lista de Comentarios Estilo "Feed" */}
                      <div className="space-y-6">
                        {selected.comments.map((c: any) => (
                          <div key={c.id} className="group border-b border-white/[0.03] pb-6">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center text-[10px] font-black border border-blue-500/20">
                                  {c.user[0]}
                                </div>
                                <div>
                                  <span className="text-xs font-bold block leading-none">{c.user}</span>
                                  <span className="text-[9px] text-pink-500 font-bold uppercase tracking-tighter">{c.ig}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <span className="text-[9px] font-black uppercase">{c.rep} XP</span>
                                <MoreHorizontal size={14} />
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed pl-11">
                              {c.text}
                            </p>
                            <div className="flex items-center gap-4 pl-11 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="text-[10px] font-bold text-gray-500 hover:text-white flex items-center gap-1"><Heart size={12}/> Like</button>
                              <button className="text-[10px] font-bold text-gray-500 hover:text-white flex items-center gap-1"><MessageCircle size={12}/> Responder</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {isCapturing && (
                <div className="mt-20 pt-10 border-t border-black flex justify-between items-center italic font-black">
                  <span>INFOXITY.</span>
                  <span className="text-[10px] tracking-widest">2026 EDITION</span>
                </div>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-20 text-center border-t border-white/5 opacity-30">
        <p className="text-[10px] font-black tracking-[1em] uppercase">Soberanía Digital</p>
      </footer>
      
      {/* Boton para salir de captura si se queda pegado */}
      {isCapturing && (
        <button onClick={() => setIsCapturing(false)} className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full z-[200]">
          <X size={20} />
        </button>
      )}
    </div>
  );
}
