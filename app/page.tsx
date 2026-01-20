"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Languages, Award, Bookmark, 
  BookmarkCheck, CheckCircle2, ArrowLeft, Mic2, 
  TrendingUp, Scale, Star, Menu, X, Share2, Send, Zap, Globe,
  MoreHorizontal, Heart, MessageCircle, Library, Sparkles, Home, Search, Bell, Users, Info,
  Flame, HelpCircle, Frown, ExternalLink, PlayCircle, Bot, Share, Bookmark as BookmarkIcon,
  Check, Copy, Clock, Filter, Eye
} from 'lucide-react';

/**
 * INFOXITY APP - V2.0 
 * Total estimado: ~850-900 líneas
 * Estética: Mobile-First, Moderna, Agresiva.
 */

// --- 1. DICCIONARIO DE TRADUCCIONES EXTENDIDO ---
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
    placeholderName: "Tu nombre o alias...",
    placeholderIg: "Instagram (ej: @usuario)",
    popular: "Tendencias Globales",
    share: "Compartir",
    shareWa: "WhatsApp",
    socialProof: "Ya dentro del sistema:",
    loginAs: "Entrar como",
    searchUser: "Buscar usuarios...",
    userHint: "Buscador de comunidad activa.",
    storiesTitle: "En 1 Minuto",
    iaAssistant: "Asistente de Impacto Personal",
    iaPlaceholder: "¿Cómo me afecta esto si tengo...?",
    sourceButton: "Ver noticia en Reuters / EFE",
    pollQuestion: "¿Esta noticia te ayuda o es puro humo?",
    pollOptions: ["Fuego", "Duda", "Humo"],
    aiAnalysis: "Análisis de Impacto IA",
    points: ["Clave 1", "Clave 2", "Clave 3"],
    verifiedBy: "Verificado por Red de Expertos",
    shareMessage: "¡Esto te interesa! Pásalo."
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
    identityBody: "We are not an algorithm. We are a hybrid editorial board dedicated to dismantling media noise. We offer in-depth journalism for those who demand truth without ideological filters.",
    back: "Back to Index",
    featured: "FEATURED ANALYSIS",
    sources: "Verified Sources",
    actionButton: "Validate Identity",
    publish: "Publish",
    myLibrary: "Personal Archive",
    noSaved: "No records found.",
    voteThanks: "Vote processed",
    placeholderName: "Full name...",
    placeholderIg: "@instagram_user",
    popular: "Global Trends",
    share: "Share",
    shareWa: "WhatsApp",
    socialProof: "Already inside:",
    loginAs: "Login as",
    searchUser: "Search users...",
    userHint: "Active community search.",
    storiesTitle: "In 1 Minute",
    iaAssistant: "Personal Impact Assistant",
    iaPlaceholder: "How does this affect me if...?",
    sourceButton: "View on Reuters / EFE",
    pollQuestion: "Helpful or just smoke?",
    pollOptions: ["Fire", "Unsure", "Smoke"],
    aiAnalysis: "AI Impact Analysis",
    points: ["Key 1", "Key 2", "Key 3"],
    verifiedBy: "Verified by Expert Network",
    shareMessage: "Check this out!"
  }
};

// --- 2. BASE DE DATOS LOCAL AMPLIADA ---
const INITIAL_NEWS = [
  {
    id: 1,
    cat: "Economía",
    catEn: "Economy",
    title: "¿Cómo te afecta la nueva ley de vivienda si eres joven?",
    titleEn: "How does the new housing law affect you?",
    summaryIA: [
      "Congelación de alquileres en zonas tensionadas por 3 años.",
      "Nuevas ayudas directas de 250€ para menores de 35 años.",
      "Aumento del IBI para viviendas que lleven vacías más de 2 años."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    sourceUrl: "https://www.reuters.com",
    content: "La nueva normativa busca facilitar el acceso a la vivienda, pero expertos advierten de una posible reducción de la oferta en las grandes ciudades...",
    bias: [95, 92, 8],
    likes: 1240,
    pollVotes: [500, 100, 50],
    sharePhrases: { es: "Envía esto a quien necesite esta beca", en: "Send this to who needs this grant" },
    comments: [
      { id: 1, user: "Marco", ig: "@marco_dev", rep: 450, text: "Era necesario, pero los precios no bajarán solo con leyes." }
    ]
  },
  {
    id: 2,
    cat: "Tecnología",
    catEn: "Tech",
    title: "IA en el trabajo: ¿Tu puesto corre peligro este 2026?",
    titleEn: "AI at work: Is your job at risk this 2026?",
    summaryIA: [
      "Automatización masiva en sectores administrativos y creativos.",
      "Aumento del 40% en productividad para quienes usen copilotos.",
      "Nuevos roles emergentes: Auditor de Sesgo de IA."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sourceUrl: "https://www.efe.com",
    content: "El despliegue de agentes autónomos está redefiniendo lo que significa 'trabajar'. No es que la IA te reemplace, es que alguien que la usa lo hará...",
    bias: [88, 95, 12],
    likes: 3100,
    pollVotes: [800, 200, 100],
    sharePhrases: { es: "Pásalo al que todavía no usa esta tecnología", en: "Pass this to those not using tech yet" },
    comments: []
  },
  {
    id: 3,
    cat: "Geopolítica",
    catEn: "Geopolitics",
    title: "El litio en Chile: ¿Por qué subirá el precio de tu móvil?",
    titleEn: "Lithium in Chile: Why your phone price will rise?",
    summaryIA: [
      "Nacionalización parcial de las minas en el triángulo del litio.",
      "China y EE.UU. compiten por el control de las baterías.",
      "Impacto directo en el coste de fabricación de smartphones."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sourceUrl: "https://www.reuters.com",
    content: "La guerra por los recursos del futuro se libra en Sudamérica. El litio es el nuevo petróleo y su escasez afectará tu bolsillo...",
    bias: [92, 90, 15],
    likes: 950,
    pollVotes: [300, 400, 10],
    sharePhrases: { es: "Envía esto al que quiere renovar móvil", en: "Send this to your tech-hungry friend" },
    comments: []
  }
];

const MOCK_USERS = [
  { name: "Satoshi", ig: "@crypto_king", rep: 890 },
  { name: "Elena", ig: "@elena_vision", rep: 1200 },
  { name: "Alex", ig: "@alex_news", rep: 340 }
];

// --- 3. COMPONENTE PRINCIPAL ---
export default function InfoxityApp() {
  // Estados de Usuario y App
  const [user, setUser] = useState<{name: string, ig: string, rep: number} | null>(null);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [selected, setSelected] = useState<any>(null);
  const [view, setView] = useState<'feed' | 'library' | 'search'>('feed');
  
  // Estados de Interacción
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [pollVotedIds, setPollVotedIds] = useState<number[]>([]);
  
  // Estados de UI
  const [searchQuery, setSearchQuery] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [readers, setReaders] = useState(4829);
  const [showNotification, setShowNotification] = useState(false);
  const [iaQuestion, setIaQuestion] = useState("");
  const [iaAnswer, setIaAnswer] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const t = TRANSLATIONS[lang];

  // --- 4. EFECTOS Y PERSISTENCIA ---
  useEffect(() => {
    const savedUser = localStorage.getItem('infoxity_user_v2');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedLikes = localStorage.getItem('infoxity_likes');
    if (savedLikes) setLikedIds(JSON.parse(savedLikes));

    const interval = setInterval(() => {
      setReaders(p => p + (Math.floor(Math.random() * 7) - 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (likedIds.length > 0) localStorage.setItem('infoxity_likes', JSON.stringify(likedIds));
  }, [likedIds]);

  // --- 5. FUNCIONES DE LÓGICA ---
  const handleLogin = (name: string, ig: string) => {
    if (!name.trim()) return;
    const newUser = { name, ig: ig || "@anon", rep: 120 };
    setUser(newUser);
    localStorage.setItem('infoxity_user_v2', JSON.stringify(newUser));
  };

  const toggleLike = (id: number) => {
    setLikedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSave = (id: number) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handlePollVote = (newsId: number, optionIndex: number) => {
    if (pollVotedIds.includes(newsId)) return;
    setPollVotedIds([...pollVotedIds, newsId]);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const askAi = () => {
    if (!iaQuestion.trim()) return;
    setIsAiLoading(true);
    setTimeout(() => {
      setIaAnswer(`Basado en el análisis de ${selected.sourceUrl.includes('reuters') ? 'Reuters' : 'EFE'}, esto te impactará principalmente en la movilidad y el ahorro mensual. Se estima un ajuste del 12% en tu zona.`);
      setIsAiLoading(false);
    }, 1500);
  };

  // --- 6. RENDERIZADO DE VISTAS ---

  if (!user) return <LoginView t={t} onLogin={handleLogin} />;

  return (
    <div className={`min-h-screen ${isCapturing ? 'bg-white text-black' : 'bg-black text-white'} font-sans transition-colors duration-500`}>
      
      {/* HEADER SUPERIOR */}
      <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black italic text-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            IX
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-tighter leading-none">{t.siteName}</h1>
            <p className="text-[8px] font-bold text-blue-500 tracking-[0.2em] uppercase">{t.tagline}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex bg-white/5 px-4 py-2 rounded-full items-center gap-2 border border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black tracking-widest uppercase">{readers} {t.reading}</span>
          </div>
          <button 
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black hover:bg-blue-600 transition-all"
          >
            {lang.toUpperCase()}
          </button>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="pt-24 pb-32 px-4 max-w-xl mx-auto">
        
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div 
              key="feed"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              {/* SECCIÓN STORIES "EN 1 MINUTO" */}
              <section>
                <div className="flex justify-between items-end mb-4 px-2">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500">{t.storiesTitle}</h3>
                  <div className="h-[1px] flex-grow mx-4 bg-zinc-800" />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {INITIAL_NEWS.map((n, idx) => (
                    <motion.div 
                      key={`story-${n.id}`}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelected(n)}
                      className="flex-shrink-0 w-36 h-56 rounded-[2rem] relative overflow-hidden border border-white/10 group cursor-pointer"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-t ${idx === 0 ? 'from-blue-600' : idx === 1 ? 'from-purple-600' : 'from-zinc-800'} to-transparent opacity-80`} />
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <span className="text-[8px] font-black uppercase bg-white/20 w-fit px-2 py-1 rounded mb-2 backdrop-blur-md">
                          {lang === 'es' ? n.cat : n.catEn}
                        </span>
                        <p className="text-[11px] font-bold leading-tight">{n.title}</p>
                      </div>
                      <div className="absolute top-3 left-3 flex gap-1">
                        <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '100%' }} 
                            transition={{ duration: 5, repeat: Infinity }}
                            className="h-full bg-white" 
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* FEED DE NOTICIAS */}
              <div className="space-y-8">
                {INITIAL_NEWS.map((news) => (
                  <NewsCard 
                    key={news.id} 
                    news={news} 
                    t={t} 
                    lang={lang}
                    isLiked={likedIds.includes(news.id)}
                    onLike={() => toggleLike(news.id)}
                    onClick={() => setSelected(news)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* VISTA DETALLE DE NOTICIA (LAYOUT PEDIDO) */
            <motion.div 
              key="detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <button 
                onClick={() => setSelected(null)}
                className="flex items-center gap-2 text-zinc-500 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors"
              >
                <ArrowLeft size={14} /> {t.back}
              </button>

              {/* Titular Gancho */}
              <h2 className="text-4xl sm:text-5xl font-black italic tracking-tighter leading-[0.9] text-white">
                {lang === 'es' ? selected.title : selected.titleEn}
              </h2>

              {/* Resumen IA (3 Puntos Clave) */}
              <div className="bg-zinc-900/80 border border-white/10 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles size={80} />
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-lg"><Zap size={16} fill="white" /></div>
                  <h4 className="font-black uppercase tracking-tighter text-sm">Resumen IA (3 Claves)</h4>
                </div>
                <div className="space-y-4 relative z-10">
                  {selected.summaryIA.map((point: string, i: number) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="text-blue-500 font-black text-lg">0{i+1}</span>
                      <p className="text-zinc-200 text-sm font-medium leading-relaxed max-w-[90%]">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contenido Visual (TikTok/YouTube Embed) */}
              <div className="aspect-[9/16] sm:aspect-video w-full rounded-[3rem] bg-zinc-900 border-4 border-white/5 overflow-hidden shadow-2xl relative">
                <iframe 
                  className="w-full h-full"
                  src={selected.videoUrl}
                  title="Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute top-6 left-6 bg-red-600 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  OFICIAL
                </div>
              </div>

              {/* Fuente y Transparencia */}
              <div className="flex flex-col gap-4">
                <a 
                  href={selected.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-4 w-full bg-white text-black p-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <ExternalLink size={20} /> {t.sourceButton}
                </a>
                <p className="text-[10px] text-center text-zinc-500 font-bold uppercase italic">
                  Información contrastada bajo protocolo de transparencia IX-256
                </p>
              </div>

              {/* Termómetro de Opinión (Gamificación) */}
              <section className="bg-zinc-900/50 rounded-[3rem] p-8 border border-white/5 space-y-8">
                <div className="text-center space-y-2">
                  <h4 className="text-xl font-black italic tracking-tighter">{t.pollQuestion}</h4>
                  <p className="text-xs text-zinc-500 font-bold uppercase">Tu voto ayuda a filtrar el ruido</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: <Flame />, color: "text-orange-500", bg: "bg-orange-500/10", label: t.pollOptions[0] },
                    { icon: <HelpCircle />, color: "text-blue-500", bg: "bg-blue-500/10", label: t.pollOptions[1] },
                    { icon: <Frown />, color: "text-red-500", bg: "bg-red-500/10", label: t.pollOptions[2] }
                  ].map((opt, i) => (
                    <button 
                      key={i}
                      onClick={() => handlePollVote(selected.id, i)}
                      disabled={pollVotedIds.includes(selected.id)}
                      className={`flex flex-col items-center gap-3 p-6 rounded-3xl border transition-all ${
                        pollVotedIds.includes(selected.id) ? 'opacity-50 grayscale' : 'border-white/5 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <div className={`${opt.bg} ${opt.color} p-4 rounded-full`}>
                        {React.cloneElement(opt.icon as React.ReactElement, { size: 28, fill: "currentColor" })}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Asistente de IA Personalizado */}
              <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:rotate-12 transition-transform">
                  <Bot size={120} />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-xl">
                      <Sparkles />
                    </div>
                    <div>
                      <h4 className="text-xl font-black italic leading-none">{t.iaAssistant}</h4>
                      <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Respuesta instantánea</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={iaQuestion}
                      onChange={(e) => setIaQuestion(e.target.value)}
                      placeholder={t.iaPlaceholder}
                      className="flex-grow bg-black/20 border border-white/20 p-5 rounded-2xl text-white text-sm outline-none focus:bg-black/40 transition-all placeholder:text-blue-200/50"
                    />
                    <button 
                      onClick={askAi}
                      className="bg-white text-blue-600 p-5 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                      {isAiLoading ? <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> : <Send size={24} />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {iaAnswer && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/10"
                      >
                        <p className="text-sm font-medium leading-relaxed italic">
                          "{iaAnswer}"
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>

              {/* Botón Compartido Inteligente */}
              <button 
                onClick={() => {
                  const url = `https://wa.me/?text=${encodeURIComponent(selected.sharePhrases[lang] + " " + window.location.href)}`;
                  window.open(url, '_blank');
                }}
                className="flex items-center justify-between w-full bg-zinc-800/50 p-6 rounded-[2rem] border border-white/5 hover:bg-zinc-800 transition-all group"
              >
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Impacto Social</span>
                  <span className="text-sm font-bold text-zinc-300">{selected.sharePhrases[lang]}</span>
                </div>
                <div className="bg-blue-600 p-4 rounded-2xl group-hover:rotate-12 transition-transform shadow-lg">
                  <Share2 size={24} />
                </div>
              </button>

              {/* SECCIÓN DE COMENTARIOS (Original) */}
              <section className="pt-10 space-y-6">
                <div className="flex items-center gap-4">
                   <h3 className="text-2xl font-black italic tracking-tighter">{t.comments}</h3>
                   <div className="flex-grow h-[1px] bg-zinc-800" />
                   <span className="text-xs font-black bg-zinc-800 px-3 py-1 rounded-full">{selected.comments.length}</span>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-zinc-900 rounded-3xl p-6 border border-white/5 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black">
                      {user.name[0]}
                    </div>
                    <div className="flex-grow space-y-3">
                      <textarea 
                        className="w-full bg-transparent border-none outline-none text-sm resize-none placeholder:text-zinc-600"
                        placeholder={t.postComment}
                        rows={2}
                      />
                      <div className="flex justify-end">
                        <button className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
                          {t.publish}
                        </button>
                      </div>
                    </div>
                  </div>

                  {selected.comments.map((c: any) => (
                    <div key={c.id} className="bg-zinc-900/30 p-6 rounded-3xl border border-white/5 flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-black">
                        {c.user[0]}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase">{c.user}</span>
                          <span className="text-[10px] text-blue-500 font-bold">{c.rep} RP</span>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* BARRA DE NAVEGACIÓN INFERIOR (Estilo Mobile-First) */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm">
        <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-[3rem] px-8 py-5 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <NavItem icon={<Home />} active={view === 'feed'} onClick={() => { setSelected(null); setView('feed'); }} />
          <NavItem icon={<Search />} active={view === 'search'} onClick={() => setView('search')} />
          <div className="relative -mt-12">
            <button 
              onClick={() => setSelected(INITIAL_NEWS[Math.floor(Math.random()*INITIAL_NEWS.length)])}
              className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(37,99,235,0.5)] active:scale-90 transition-all border-4 border-black"
            >
              <Zap size={28} fill="currentColor" />
            </button>
          </div>
          <NavItem icon={<Library />} active={view === 'library'} onClick={() => setView('library')} />
          <NavItem icon={<Users />} active={false} onClick={() => {}} />
        </div>
      </nav>

      {/* NOTIFICACIONES EMERGENTES */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 size={18} /> {t.voteThanks}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- 7. COMPONENTES ATÓMICOS ---

function NewsCard({ news, t, lang, isLiked, onLike, onClick }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-zinc-900/40 border border-white/5 rounded-[3rem] overflow-hidden hover:border-blue-500/30 transition-all"
    >
      <div className="p-8 space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
              {lang === 'es' ? news.cat : news.catEn}
            </span>
          </div>
          <div className="bg-white/5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter text-zinc-500">
            {news.likes + (isLiked ? 1 : 0)} LIKES
          </div>
        </div>

        <h3 
          onClick={onClick}
          className="text-2xl font-black italic tracking-tighter leading-tight group-hover:text-blue-400 transition-colors cursor-pointer"
        >
          {lang === 'es' ? news.title : news.titleEn}
        </h3>

        <div className="flex gap-4 pt-2">
          {news.summaryIA.slice(0, 1).map((point: string, i: number) => (
            <p key={i} className="text-xs text-zinc-400 font-medium line-clamp-2 leading-relaxed">
              {point}
            </p>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[8px] font-black">
                U{i}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-blue-600 flex items-center justify-center text-[8px] font-black">
              +12
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onLike(); }}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isLiked ? 'bg-red-500 text-white' : 'bg-white/5 text-zinc-500 hover:bg-white/10'}`}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={onClick}
              className="bg-white text-black px-6 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all"
            >
              Leer más
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NavItem({ icon, active, onClick }: { icon: any, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-2xl transition-all ${active ? 'text-blue-500 bg-blue-500/10' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
    >
      {React.cloneElement(icon, { size: 22 })}
    </button>
  );
}

function LoginView({ t, onLogin }: any) {
  const [name, setName] = useState("");
  const [ig, setIg] = useState("");
  const [step, setStep] = useState(0);

  return (
    <main className="fixed inset-0 bg-black flex items-center justify-center p-6 z-[1000]">
      <div className="w-full max-w-sm space-y-12">
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-blue-600 mx-auto rounded-[2rem] flex items-center justify-center text-5xl font-black italic shadow-[0_0_50px_rgba(37,99,235,0.5)]"
          >
            IX
          </motion.div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">{t.siteName}</h1>
            <p className="text-[10px] font-black text-blue-500 tracking-[0.5em] uppercase">{t.welcome}</p>
          </div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 p-10 rounded-[3.5rem] border border-white/5 space-y-6"
        >
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder={t.placeholderName}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/5 p-6 rounded-2xl text-white font-bold outline-none focus:border-blue-500 transition-all placeholder:text-zinc-600"
              />
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder={t.placeholderIg}
                value={ig}
                onChange={(e) => setIg(e.target.value)}
                className="w-full bg-white/5 border border-white/5 p-6 rounded-2xl text-white font-bold outline-none focus:border-blue-500 transition-all placeholder:text-zinc-600"
              />
            </div>
          </div>

          <button 
            onClick={() => onLogin(name, ig)}
            className="w-full bg-white text-black p-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] shadow-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95"
          >
            {t.actionButton}
          </button>
        </motion.div>

        <p className="text-[9px] text-center text-zinc-600 font-bold uppercase tracking-widest leading-relaxed px-10">
          Al entrar, aceptas los protocolos de neutralidad y veracidad de la red Infoxity.
        </p>
      </div>
    </main>
  );
}
