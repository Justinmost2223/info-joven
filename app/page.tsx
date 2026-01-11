"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Languages, Award, Bookmark, 
  BookmarkCheck, CheckCircle2, ArrowLeft, Mic2, 
  TrendingUp, Scale, Star, Menu, X, Share2
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
    placeholder: "Nombre y Apellido...",
    popular: "Más Destacadas"
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
    placeholder: "Full Name...",
    popular: "Trending Now"
  }
};

// --- DATA ESTRUCTURADA ---
const INITIAL_NEWS = [
  {
    id: 1,
    cat: "Geopolítica", catEn: "Geopolitics",
    title: "Venezuela 2026: El Nuevo Eje Energético Global", titleEn: "Venezuela 2026: The New Global Energy Axis",
    context: "El acuerdo secreto entre Washington y Caracas para alimentar las granjas de servidores de IA en EE.UU.",
    content: "En enero de 2026, la diplomacia energética ha dado un giro inesperado. Ante el consumo masivo de electricidad de los nuevos modelos de Inteligencia Artificial General (AGI), Estados Unidos ha firmado el 'Pacto del Caribe' con Venezuela. Este acuerdo no solo implica el levantamiento de sanciones, sino la inversión masiva en infraestructura venezolana a cambio de crudo pesado destinado exclusivamente a la generación eléctrica de centros de datos en Texas y Florida.\n\nEl análisis de Infoxity revela que este movimiento estabiliza la economía regional pero genera una nueva dependencia tecnológica. Mientras el mundo miraba hacia las renovables, la urgencia de la computación ha devuelto el poder a las reservas fósiles más grandes del mundo.",
    bias: [95, 92, 10], // Objetividad, Hechos, Emoción
    poll: { q: "¿Es ético priorizar la IA sobre las sanciones?", opts: ["Pragmatismo necesario", "Error histórico", "Neutral"], votes: [540, 210, 95] },
    sources: ["OPEP+ Energy Report", "Digital Geopolitics Journal"],
    color: "bg-orange-600",
    comments: [{ id: 1, user: "Mateo Fernández", rep: 1250, text: "La energía manda, las ideologías solo adornan. 🔋" }]
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
    color: "bg-purple-600",
    comments: [{ id: 3, user: "Carlos Ruiz", rep: 560, text: "Por fin podré hablar de la serie sin spoilers el primer día. 🙌" }]
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
    color: "bg-emerald-600",
    comments: [{ id: 4, user: "Lucía Méndez", rep: 2100, text: "La eficiencia no tiene color político. Queremos que funcione." }]
  }
];

export default function InfoxityApp() {
  const [user, setUser] = useState<{name: string, rep: number} | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [news, setNews] = useState(INITIAL_NEWS);
  const [selected, setSelected] = useState<any>(null);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [votedPolls, setVotedPolls] = useState<number[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [readers, setReaders] = useState(4520);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const interval = setInterval(() => setReaders(p => p + (Math.floor(Math.random()*21)-10)), 3000);
    return () => clearInterval(interval);
  }, []);

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
  };

  const savedNews = useMemo(() => news.filter(n => savedIds.includes(n.id)), [news, savedIds]);

  if (!user) {
    return (
      <main className="fixed inset-0 bg-gray-50 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100 text-center bg-white">
          <div className="bg-black text-white inline-block px-6 py-1 font-black text-3xl italic mb-6">IX</div>
          <h1 className="text-2xl font-black mb-4">{t.welcome}</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">{t.onboarding}</p>
          <input 
            type="text" placeholder={t.placeholder} 
            className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-100 mb-4 font-bold text-center outline-none focus:ring-2 ring-black transition-all"
            onChange={(e) => setNameInput(e.target.value)}
          />
          <button 
            onClick={() => nameInput && setUser({ name: nameInput, rep: 100 })}
            className="w-full bg-black text-white p-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 active:scale-95 transition-all"
          >
            {t.actionButton}
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-700 ${isCapturing ? 'bg-black' : 'bg-white'}`}>
      
      {/* HEADER PROFESIONAL */}
      {!isCapturing && (
        <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl z-50 px-4 md:px-12 py-4 border-b border-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelected(null)}>
            <div className="bg-black text-white px-3 py-0.5 font-black text-xl italic">IX</div>
            <span className="font-black text-[10px] uppercase tracking-[0.3em] hidden sm:block">{t.siteName}</span>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="bg-gray-50 px-3 md:px-4 py-2 rounded-full border border-gray-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                {readers.toLocaleString()} {t.reading}
              </span>
            </div>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="p-2 hover:bg-black hover:text-white rounded-xl transition-all border border-gray-100">
              <Languages size={18} />
            </button>
          </div>
        </header>
      )}

      <main className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 ${isCapturing ? 'pt-10' : 'pt-24 md:pt-32 pb-20'}`}>
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
              
              {/* SECCIÓN BIBLIOTECA (SÓLO SI HAY GUARDADOS) */}
              {savedNews.length > 0 && (
                <section>
                  <h3 className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase mb-6 flex items-center gap-2">
                    <Star size={12} className="text-amber-500" /> {t.myLibrary}
                  </h3>
                  <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar">
                    {savedNews.map(n => (
                      <div 
                        key={n.id} onClick={() => setSelected(n)}
                        className="min-w-[280px] bg-gray-50 p-6 rounded-[2.5rem] border border-gray-100 cursor-pointer hover:bg-white hover:shadow-xl transition-all"
                      >
                        <span className="text-[8px] font-black uppercase text-gray-400 mb-2 block">{lang === 'es' ? n.cat : n.catEn}</span>
                        <h4 className="font-black text-sm leading-tight">{lang === 'es' ? n.title : n.titleEn}</h4>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* NOTICIA DESTACADA: ¿POR QUÉ INFOXITY? */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-black text-white p-10 md:p-16 rounded-[3.5rem] relative overflow-hidden flex flex-col justify-end min-h-[450px] shadow-2xl">
                  <div className="absolute top-8 right-8 text-white/10 rotate-12"><Shield size={250} /></div>
                  <div className="relative z-10">
                    <span className="text-amber-400 font-black text-[10px] tracking-[0.4em] mb-4 block uppercase">{t.featured}</span>
                    <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter mb-6 leading-[0.9]">{t.identityTitle}</h2>
                    <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">{t.identityBody}</p>
                  </div>
                </div>

                {/* TENDENCIAS LATERALES */}
                <div className="lg:col-span-4 flex flex-col justify-center px-2">
                  <h3 className="text-[10px] font-black tracking-[0.4em] text-gray-300 uppercase mb-8">{t.popular}</h3>
                  <div className="space-y-8">
                    {news.map((n, i) => (
                      <div key={n.id} onClick={() => { setSelected(n); window.scrollTo(0,0); }} className="group cursor-pointer flex gap-5 items-start">
                        <span className="font-black text-gray-100 text-5xl leading-none">0{i+1}</span>
                        <div>
                          <h4 className="font-black text-lg leading-tight group-hover:text-blue-600 transition-colors">{lang === 'es' ? n.title : n.titleEn}</h4>
                          <span className="text-[9px] font-black uppercase text-gray-400">{lang === 'es' ? n.cat : n.catEn}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* GRID PRINCIPAL */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map(n => (
                  <motion.div 
                    key={n.id} whileHover={{ y: -8 }}
                    className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all flex flex-col justify-between min-h-[420px]"
                  >
                    <div className="cursor-pointer" onClick={() => setSelected(n)}>
                      <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase text-white ${n.color} mb-6 inline-block shadow-lg shadow-black/5`}>{lang === 'es' ? n.cat : n.catEn}</span>
                      <h3 className="text-2xl font-black leading-tight mb-4 group-hover:underline">{lang === 'es' ? n.title : n.titleEn}</h3>
                      <p className="text-gray-400 text-sm italic font-medium">"{n.context}"</p>
                    </div>
                    <div className="flex justify-between items-center pt-6 border-t border-gray-50 mt-8">
                      <button onClick={() => toggleSave(n.id)} className="p-2 transition-all active:scale-125">
                        {savedIds.includes(n.id) ? <BookmarkCheck className="text-black" size={22} /> : <Bookmark className="text-gray-200 hover:text-black" size={22} />}
                      </button>
                      <button onClick={() => setSelected(n)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all"><ChevronRight size={18}/></button>
                    </div>
                  </motion.div>
                ))}
              </section>
            </motion.div>
          ) : (
            <motion.article 
              key="article" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={`max-w-4xl mx-auto ${isCapturing ? 'bg-white p-8 md:p-16 rounded-[4rem] border-[12px] border-black mt-4' : 'pb-20'}`}
            >
              {/* BOTONES DE ACCIÓN ARRIBA */}
              {!isCapturing && (
                <div className="flex justify-between items-center mb-8">
                  <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-black">
                    <ArrowLeft size={16}/> {t.back}
                  </button>
                  <div className="flex gap-4">
                    <button onClick={() => toggleSave(selected.id)} className="text-black transition-transform active:scale-125">
                      {savedIds.includes(selected.id) ? <BookmarkCheck size={26} /> : <Bookmark size={26} className="text-gray-300" />}
                    </button>
                    <button onClick={() => setIsCapturing(true)} className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase">
                      <Instagram size={16}/> {t.capture}
                    </button>
                  </div>
                </div>
              )}

              <header className="mb-12">
                <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase text-white ${selected.color} mb-8 inline-block`}>
                  {lang === 'es' ? selected.cat : selected.catEn}
                </span>
                <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-[0.95] mb-10">
                  {lang === 'es' ? selected.title : selected.titleEn}
                </h1>
                <div className="bg-gray-50 p-8 rounded-[2.5rem] border-l-[8px] border-black shadow-inner">
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2 text-gray-400"><Mic2 size={12}/> {t.quickContext}</h4>
                  <p className="text-xl md:text-2xl font-bold italic text-gray-700 leading-snug">"{selected.context}"</p>
                </div>
              </header>

              <section className="prose prose-xl max-w-none text-gray-800 font-serif leading-relaxed mb-16 space-y-8">
                {selected.content.split('\n\n').map((p: string, i: number) => (
                  <p key={i} className="first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left">{p}</p>
                ))}
              </section>

              {!isCapturing && (
                <>
                  {/* AUDITORÍA DE IA */}
                  <div className="mb-16 p-8 bg-gray-50 rounded-[3rem] border border-gray-100">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-2 text-gray-400">
                      <BarChart3 size={16}/> {t.biasAnalysis}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {['Objetividad', 'Hechos', 'Neutralidad'].map((label, i) => (
                        <div key={label}>
                          <div className="flex justify-between text-[9px] font-black uppercase mb-2">
                            <span>{label}</span>
                            <span>{selected.bias[i]}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${selected.bias[i]}%` }} className="h-full bg-black"/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ENCUESTA DINÁMICA */}
                  <div className="mb-20 bg-black text-white p-8 md:p-14 rounded-[3.5rem] relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12"><Scale size={180}/></div>
                    <h3 className="text-2xl md:text-3xl font-black mb-10 relative z-10">{selected.poll.q}</h3>
                    <div className="space-y-4 relative z-10">
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
                            className={`w-full relative p-6 rounded-2xl text-left font-bold border-2 transition-all overflow-hidden ${hasVoted ? 'border-transparent cursor-default' : 'border-white/10 hover:border-white/40 active:scale-[0.98]'}`}
                          >
                            {hasVoted && (
                              <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${percentage}%` }} 
                                className={`absolute left-0 top-0 h-full ${isMax ? 'bg-amber-500/30' : 'bg-white/10'}`} 
                              />
                            )}
                            <div className="relative z-10 flex justify-between items-center">
                              <span className="flex items-center gap-3">
                                {o} {hasVoted && isMax && <CheckCircle2 size={18} className="text-amber-400" />}
                              </span>
                              {hasVoted && <span className="font-black text-xl">{percentage}%</span>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {votedPolls.includes(selected.id) && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center text-[10px] font-black uppercase text-amber-400 tracking-[0.4em]">{t.voteThanks}</motion.p>
                    )}
                  </div>

                  {/* DEBATE */}
                  <section className="bg-white border border-gray-100 p-8 md:p-14 rounded-[3.5rem] shadow-xl">
                    <h3 className="text-3xl font-black mb-12 flex items-center gap-4"><MessageSquare size={30}/> {t.comments}</h3>
                    <div className="flex gap-4 mb-12">
                      <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black shrink-0 text-xl shadow-lg">{user.name[0]}</div>
                      <div className="flex-1">
                        <textarea 
                          placeholder={t.postComment}
                          className="w-full bg-gray-50 p-6 rounded-[2rem] outline-none focus:ring-2 ring-black font-medium text-base min-h-[140px] shadow-inner"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button 
                          onClick={() => { if(commentText.trim()) { 
                            const newItem = { id: Date.now(), user: user.name, rep: user.rep + 15, text: commentText };
                            const updated = news.map(n => n.id === selected.id ? { ...n, comments: [newItem, ...n.comments] } : n);
                            setNews(updated);
                            setSelected({...selected, comments: [newItem, ...selected.comments]});
                            setCommentText("");
                          }}}
                          className="mt-6 px-10 py-4 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-gray-800 transition-all active:scale-95"
                        >
                          {t.publish}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-8">
                      {selected.comments.map((c: any) => (
                        <div key={c.id} className="p-8 bg-gray-50/50 border border-gray-100 rounded-[2.5rem] flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <span className="font-black text-sm">{c.user}</span>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-[9px] font-black uppercase shadow-sm">
                              <Award size={12}/> {c.rep} {t.reputation}
                            </div>
                          </div>
                          <p className="text-gray-600 font-medium leading-relaxed">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {/* FOOTER CAPTURA IG */}
              {isCapturing && (
                <div className="mt-20 pt-10 border-t-4 border-black flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <div className="bg-black text-white px-4 py-1 font-black text-3xl italic">IX</div>
                    <p className="text-[12px] font-black uppercase tracking-[0.3em]">Infoxity_News</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Resistencia Intelectual 2026</p>
                  </div>
                </div>
              )}

              {isCapturing && (
                <button 
                  onClick={() => setIsCapturing(false)}
                  className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] shadow-2xl border-4 border-black z-[100] active:scale-95 transition-all"
                >
                  Finalizar Captura
                </button>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      {!isCapturing && (
        <footer className="py-24 border-t border-gray-50 text-center">
          <div className="bg-black text-white inline-block px-8 py-2 font-black text-3xl italic mb-6">IX</div>
          <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.6em] px-4">
            Infoxity 2026 © Information Sovereignty & Digital Excellence
          </p>
        </footer>
      )}
    </div>
  );
}
