"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Award, Bookmark, 
  BookmarkCheck, ArrowLeft, Mic2, 
  Scale, X, Share2, Send, Globe,
  MoreHorizontal, Heart, MessageCircle, Library, Sparkles,
  Zap, Share, TrendingUp, CheckCircle2
} from 'lucide-center'; // Nota: Asegúrate de tener lucide-react instalado

// --- TRADUCCIONES COMPLETAS ---
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
    postComment: "Escribe tu argumento basado en datos...",
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
    share: "Compartir",
    shareWa: "Compartir en WhatsApp"
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
    share: "Share",
    shareWa: "Share on WhatsApp"
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
      { id: 101, user: "Mateo Fernández", ig: "@mateo_fdz", rep: 1250, text: "La energía manda, las ideologías solo adornan. 🔋" },
      { id: 102, user: "Elena Vega", ig: "@elvega_geo", rep: 2500, text: "Interesante cómo la IA está redibujando el mapa de poder." },
      { id: 103, user: "Julian Casillas", ig: "@j_casillas", rep: 450, text: "Venezuela tiene una oportunidad de oro si sabe gestionar esto." }
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
      { id: 201, user: "Carlos Ruiz", ig: "@cruiz_filmes", rep: 560, text: "Por fin podré hablar de la serie sin spoilers el primer día. 🙌" },
      { id: 202, user: "Marta Gómez", ig: "@martag_tv", rep: 120, text: "Extrañaba la sensación de esperar al próximo jueves." }
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

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const savedU = localStorage.getItem('infoxity_user');
    const savedN = localStorage.getItem('infoxity_saved');
    if (savedU) setUser(JSON.parse(savedU));
    if (savedN) setSavedIds(JSON.parse(savedN));
    const interval = setInterval(() => setReaders(p => p + (Math.floor(Math.random()*21)-10)), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    if (nameInput) {
      const newUser = { name: nameInput, ig: igInput || "@anonimo", rep: 100 };
      setUser(newUser);
      localStorage.setItem('infoxity_user', JSON.stringify(newUser));
    }
  };

  const toggleSave = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const newSaved = savedIds.includes(id) ? savedIds.filter(i => i !== id) : [...savedIds, id];
    setSavedIds(newSaved);
    localStorage.setItem('infoxity_saved', JSON.stringify(newSaved));
  };

  const shareWhatsApp = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    const text = `🛡️ *${item.title}*\n"${item.context}"\n\nLeelo aquí: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
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

  const getRepColor = (rep: number) => {
    if (rep >= 2000) return "text-amber-400"; 
    if (rep >= 1000) return "text-purple-400"; 
    if (rep >= 500) return "text-blue-400"; 
    return "text-gray-400";
  };

  const savedArticles = useMemo(() => news.filter(n => savedIds.includes(n.id)), [news, savedIds]);

  if (!user) {
    return (
      <main className="fixed inset-0 bg-black z-[100] flex items-center justify-center p-6 text-white font-sans">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm w-full text-center space-y-8">
          <h1 className="text-7xl font-black italic tracking-tighter">IX</h1>
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-[2.5rem] space-y-4 shadow-2xl">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">{t.welcome}</p>
            <input type="text" placeholder={t.placeholderName} className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 transition-all" onChange={(e) => setNameInput(e.target.value)} />
            <input type="text" placeholder={t.placeholderIg} className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none focus:border-pink-500 transition-all" onChange={(e) => setIgInput(e.target.value)} />
            <button onClick={handleLogin} className="w-full bg-white text-black p-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-all">
              {t.actionButton}
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <div className={`min-h-screen selection:bg-white selection:text-black ${isCapturing ? 'bg-white text-black' : 'bg-[#050505] text-white'}`}>
      
      {!isCapturing && (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="text-2xl font-black italic cursor-pointer" onClick={() => setSelected(null)}>IX</span>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">{readers} {t.reading}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="text-[10px] font-black border border-white/20 px-3 py-1 rounded-full uppercase tracking-tighter">{lang}</button>
            <div className="relative flex items-center gap-2">
              <Library size={18} className={savedIds.length > 0 ? "text-blue-500" : "text-gray-500"} />
              <span className="text-[10px] font-black">{savedIds.length}</span>
            </div>
          </div>
        </nav>
      )}

      <main className={`max-w-screen-xl mx-auto px-4 md:px-10 ${isCapturing ? 'pt-10' : 'pt-28 pb-20'}`}>
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-20">
              
              {/* MANIFIESTO INFOXITY */}
              <section className="bg-gradient-to-br from-[#0a0a0a] to-black border border-white/10 p-10 md:p-20 rounded-[3rem] relative overflow-hidden">
                <Sparkles className="text-blue-500 mb-6" size={32} />
                <h2 className="text-4xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]">{t.identityTitle}</h2>
                <p className="text-gray-400 text-xl md:text-3xl font-medium leading-relaxed italic max-w-4xl">"{t.identityBody}"</p>
              </section>

              {/* BIBLIOTECA PERSONAL */}
              {savedArticles.length > 0 && (
                <section className="space-y-6">
                  <h3 className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase">{t.myLibrary}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {savedArticles.map(n => (
                      <div key={n.id} onClick={() => setSelected(n)} className="bg-[#0e0e0e] p-6 rounded-[2rem] border border-blue-500/20 cursor-pointer hover:border-blue-500/50 transition-all group">
                        <h4 className="font-bold text-lg leading-tight mb-3 group-hover:text-blue-400 transition-colors">{n.title}</h4>
                        <span className="text-[9px] font-black uppercase text-gray-600 tracking-widest">{n.cat}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* GRID EDITORIAL */}
              <section className="grid grid-cols-1 md:grid-cols-12 gap-16">
                {news.map((n) => (
                  <div key={n.id} className="md:col-span-6 space-y-6 group cursor-pointer" onClick={() => setSelected(n)}>
                    <div className="relative overflow-hidden rounded-[2.5rem] aspect-[16/10] bg-[#0e0e0e] border border-white/5 flex items-center justify-center">
                      <span className="text-[12rem] font-black opacity-[0.03] italic">{n.cat[0]}</span>
                      <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        <button onClick={(e) => shareWhatsApp(e, n)} className="p-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-green-500 hover:scale-110 active:scale-95 transition-all"><Share size={18}/></button>
                        <button onClick={(e) => toggleSave(e, n.id)} className="p-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 hover:scale-110 active:scale-95 transition-all">
                          {savedIds.includes(n.id) ? <BookmarkCheck className="text-blue-500" size={18}/> : <Bookmark size={18}/>}
                        </button>
                      </div>
                    </div>
                    <div className="px-2 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">{n.cat}</span>
                        <div className="h-[1px] flex-1 bg-white/5" />
                      </div>
                      <h3 className="text-3xl md:text-6xl font-black tracking-tighter leading-[0.9] group-hover:text-blue-400 transition-all">{n.title}</h3>
                      <p className="text-gray-500 font-medium italic text-lg leading-snug">"{n.context}"</p>
                    </div>
                  </div>
                ))}
              </section>
            </motion.div>
          ) : (
            <motion.article key="article" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
              
              {!isCapturing && (
                <div className="flex justify-between items-center mb-16">
                  <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-white transition-all"><ArrowLeft size={16} /> {t.back}</button>
                  <div className="flex gap-4">
                    <button onClick={(e) => shareWhatsApp(e, selected)} className="bg-green-600/10 text-green-500 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20 hover:bg-green-600 hover:text-white transition-all">WhatsApp</button>
                    <button onClick={() => setIsCapturing(true)} className="bg-white text-black px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Instagram</button>
                  </div>
                </div>
              )}

              <header className="space-y-8 mb-16">
                <span className="text-blue-500 text-[11px] font-black uppercase tracking-[0.5em] block text-center md:text-left">{selected.cat}</span>
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] italic text-center md:text-left">{selected.title}</h1>
                <div className="flex items-center justify-between border-y border-white/5 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-black text-xs">IX</div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-tighter">Redacción Infoxity</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">Enero 2026</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    {selected.bias.map((b:number, i:number) => (
                      <div key={i} className="text-center">
                        <p className="text-[10px] font-black">{b}%</p>
                        <p className="text-[8px] text-gray-600 uppercase font-bold tracking-tighter">{i===0?'Obj':i===1?'Fact':'Bias'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </header>

              <section className={`prose prose-invert prose-xl font-serif leading-relaxed mb-20 ${isCapturing ? 'text-black' : 'text-gray-300'}`}>
                {selected.content.split('\n\n').map((p:string, i:number) => (
                  <p key={i} className="mb-8 first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left">{p}</p>
                ))}
              </section>

              {!isCapturing && (
                <div className="space-y-24">
                  {/* AUDITORÍA DE FUENTES */}
                  <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 size={16} className="text-blue-500" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">{t.sources}</h4>
                    </div>
                    {selected.sources.map((s:string) => (
                      <div key={s} className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                        <span className="text-gray-400 font-medium">{s}</span>
                        <span className="text-blue-500 font-black">VERIFICADO</span>
                      </div>
                    ))}
                  </div>

                  {/* DEBATE PÚBLICO */}
                  <section className="space-y-12">
                    <div className="flex justify-between items-center border-b border-white/10 pb-6">
                      <h3 className="text-3xl font-black italic tracking-tighter">{t.comments}</h3>
                      <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{selected.comments.length} Argumentos</div>
                    </div>

                    <div className="space-y-10">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg shadow-blue-600/20">{user.name[0]}</div>
                        <div className="flex-1 relative">
                          <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder={t.postComment} className="w-full bg-[#0a0a0a] border border-white/5 p-6 rounded-[2rem] outline-none focus:border-blue-500/50 transition-all text-sm resize-none min-h-[120px]" />
                          <button onClick={() => {
                            if(!commentText.trim()) return;
                            const nc = { id: Date.now(), user: user.name, ig: user.ig, rep: user.rep, text: commentText };
                            const updated = news.map(n => n.id === selected.id ? { ...n, comments: [nc, ...n.comments] } : n);
                            setNews(updated);
                            setSelected({...selected, comments: [nc, ...selected.comments]});
                            setCommentText("");
                          }} className="absolute bottom-4 right-4 bg-white text-black p-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl"><Send size={20} /></button>
                        </div>
                      </div>

                      <div className="space-y-10">
                        {selected.comments.map((c: any) => (
                          <div key={c.id} className="group border-l border-white/10 pl-8 relative py-2">
                            <div className="absolute left-[-1px] top-0 w-[1px] h-full bg-gradient-to-b from-blue-500 to-transparent" />
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center gap-3">
                                <span className={`text-sm font-black tracking-tight ${getRepColor(c.rep)}`}>{c.user}</span>
                                <span className="text-[10px] text-pink-500 font-bold uppercase tracking-tighter">{c.ig}</span>
                              </div>
                              <span className="text-[10px] font-black text-gray-600 uppercase">{c.rep} XP</span>
                            </div>
                            <p className="text-gray-400 text-lg leading-relaxed italic font-medium">"{c.text}"</p>
                            <div className="flex gap-6 mt-6 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                              <button className="text-[10px] font-black text-gray-500 hover:text-white flex items-center gap-2"><Heart size={14}/> LIKE</button>
                              <button className="text-[10px] font-black text-gray-500 hover:text-white flex items-center gap-2"><MessageCircle size={14}/> RESPONDER</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              )}
              
              {isCapturing && (
                <footer className="mt-20 pt-10 border-t-4 border-black flex justify-between items-center font-black italic">
                  <span className="text-3xl">IX.</span>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.3em]">Resistencia Intelectual</p>
                    <p className="text-[10px] text-gray-400">INFOXITY APP • 2026</p>
                  </div>
                </footer>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      {isCapturing && (
        <button onClick={() => setIsCapturing(false)} className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] z-[200] border border-white/20 shadow-2xl active:scale-95 transition-all">
          Cerrar Captura
        </button>
      )}
    </div>
  );
}
