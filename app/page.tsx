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
  Check, Copy, Clock, Filter, Eye, Download, Smartphone, Share2 as ShareIcon
} from 'lucide-react';

/**
 * INFOXITY APP - VERSIÓN EXPANDIDA (850-900 LÍNEAS)
 * Enfoque: Directo, Joven, Visual.
 * Fuentes: Reuters / EFE.
 */

// --- 1. DICCIONARIO DE TRADUCCIONES (Mantenido y Ampliado) ---
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
    sourceButton: "Ver noticia original (Reuters/EFE)",
    pollQuestion: "¿Esta noticia te ayuda o es puro humo?",
    pollOptions: ["Fuego", "Duda", "Humo"],
    aiAnalysis: "Análisis de Impacto IA",
    points: ["Impacto Directo", "Riesgo Detectado", "Oportunidad"],
    verifiedBy: "Verificado por Red de Expertos",
    shareMessage: "¡Esto te interesa! Pásalo.",
    searchPlaceholder: "Buscar noticias, temas o usuarios...",
    statsTitle: "Estadísticas de Impacto",
    biasTitle: "Análisis de Sesgo",
    noResults: "No se encontraron resultados para tu búsqueda."
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
    identityBody: "We are not an algorithm. We offer in-depth journalism without ideological filters.",
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
    sourceButton: "View original source (Reuters/EFE)",
    pollQuestion: "Helpful or just smoke?",
    pollOptions: ["Fire", "Unsure", "Smoke"],
    aiAnalysis: "AI Impact Analysis",
    points: ["Direct Impact", "Risk Detected", "Opportunity"],
    verifiedBy: "Verified by Experts",
    shareMessage: "Check this out!",
    searchPlaceholder: "Search news, topics or users...",
    statsTitle: "Impact Stats",
    biasTitle: "Bias Analysis",
    noResults: "No results found for your search."
  }
};

// --- 2. BASE DE DATOS LOCAL AMPLIADA ---
const INITIAL_NEWS = [
  {
    id: 1,
    cat: "Vivienda",
    catEn: "Housing",
    title: "¿Cómo te afecta la nueva ley de vivienda si tienes menos de 30 años?",
    titleEn: "How does the new housing law affect you under 30?",
    summaryIA: [
      "Congelación de alquileres en zonas tensionadas por 3 años.",
      "Bono joven de 250€ mensuales si cobras menos de 24.000€.",
      "Más difícil que te echen: se alargan los plazos de desahucio."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    sourceUrl: "https://www.reuters.com",
    content: "La nueva ley de vivienda aprobada esta mañana promete revolucionar el mercado del alquiler. El enfoque principal es proteger al inquilino joven...",
    bias: [95, 92, 10], 
    likes: 2400,
    pollVotes: [850, 120, 30],
    sharePhrases: { es: "Envía esto a quien necesite esta beca", en: "Send this to who needs this grant" },
    comments: [
      { id: 1, user: "Santi", ig: "@santi_finanzas", rep: 850, text: "Ojo con esto, que puede reducir la oferta de pisos a largo plazo." },
      { id: 2, user: "Elena", ig: "@ele_vlc", rep: 120, text: "Por fin algo de aire para los que queremos independizarnos." }
    ]
  },
  {
    id: 2,
    cat: "Tecnología",
    catEn: "Tech",
    title: "IA en tu móvil: ¿Qué apps dejarán de funcionar este año?",
    titleEn: "AI on your phone: Which apps will stop working?",
    summaryIA: [
      "Apple y Google priorizarán apps con procesamiento local de IA.",
      "Si tu móvil tiene más de 4 años, irá más lento con las nuevas actualizaciones.",
      "La privacidad cambia: tus datos ya no irán a la nube para procesar fotos."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sourceUrl: "https://www.efe.com",
    content: "El cambio de paradigma hacia la 'Edge AI' significa que tu hardware importa más que nunca. Las marcas están forzando la renovación tecnológica...",
    bias: [88, 94, 25],
    likes: 4100,
    pollVotes: [1200, 400, 150],
    sharePhrases: { es: "Pásalo al que todavía no usa esta tecnología", en: "Pass this to your non-tech friend" },
    comments: []
  },
  {
    id: 3,
    cat: "Empleo",
    catEn: "Jobs",
    title: "Semana de 4 días: ¿Bajará tu sueldo si trabajas menos?",
    titleEn: "4-Day Week: Will your salary drop if you work less?",
    summaryIA: [
      "Pruebas piloto en España muestran aumento del 15% en productividad.",
      "El sueldo se mantiene íntegro en las empresas que lo aplican.",
      "Menos estrés pero más intensidad en las horas de oficina."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sourceUrl: "https://www.reuters.com",
    content: "El debate sobre la jornada laboral llega a su punto crítico. Reuters informa que las multinacionales están viendo beneficios inesperados...",
    bias: [91, 89, 20],
    likes: 1850,
    pollVotes: [1500, 200, 20],
    sharePhrases: { es: "Envía esto a tu jefe (o al que trabaje demasiado)", en: "Send this to your boss" },
    comments: []
  }
];

const MOCK_USERS = [
  { id: 101, name: "CryptoPunk", ig: "@cryptopunk_ix", rep: 2400 },
  { id: 102, name: "Maria Tech", ig: "@maria_tech", rep: 1200 },
  { id: 103, name: "Nacho Verdad", ig: "@nacho_v", rep: 950 },
  { id: 104, name: "Sofi News", ig: "@sofi_global", rep: 3100 }
];

// --- 3. COMPONENTE PRINCIPAL ---
export default function InfoxityApp() {
  // --- ESTADOS DE USUARIO ---
  const [user, setUser] = useState<{name: string, ig: string, rep: number} | null>(null);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [view, setView] = useState<'feed' | 'library' | 'search' | 'profile'>('feed');
  
  // --- ESTADOS DE NOTICIAS ---
  const [selected, setSelected] = useState<any>(null);
  const [news, setNews] = useState(INITIAL_NEWS);
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [pollVotedIds, setPollVotedIds] = useState<number[]>([]);
  
  // --- ESTADOS DE INTERFAZ ---
  const [searchQuery, setSearchQuery] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [readers, setReaders] = useState(4520);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  
  // --- ESTADOS DE IA ---
  const [iaQuestion, setIaQuestion] = useState("");
  const [iaResponse, setIaResponse] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);

  const t = TRANSLATIONS[lang];

  // --- 4. EFECTOS Y PERSISTENCIA ---
  useEffect(() => {
    const localUser = localStorage.getItem('ix_user_v2');
    if (localUser) setUser(JSON.parse(localUser));
    
    const localLikes = localStorage.getItem('ix_likes');
    if (localLikes) setLikedIds(JSON.parse(localLikes));

    const localSaved = localStorage.getItem('ix_saved');
    if (localSaved) setSavedIds(JSON.parse(localSaved));

    const readerInterval = setInterval(() => {
      setReaders(prev => prev + (Math.floor(Math.random() * 5) - 2));
    }, 5000);

    return () => clearInterval(readerInterval);
  }, []);

  useEffect(() => {
    localStorage.setItem('ix_likes', JSON.stringify(likedIds));
    localStorage.setItem('ix_saved', JSON.stringify(savedIds));
  }, [likedIds, savedIds]);

  // --- 5. LÓGICA DE FUNCIONES ---
  const handleLogin = (name: string, ig: string) => {
    if (name.length < 2) return;
    const userData = { name, ig: ig || "@anon", rep: 150 };
    setUser(userData);
    localStorage.setItem('ix_user_v2', JSON.stringify(userData));
    triggerNotification("Identidad Validada");
  };

  const triggerNotification = (msg: string) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleLike = (id: number) => {
    setLikedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSave = (id: number) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    triggerNotification(savedIds.includes(id) ? "Eliminado del archivo" : "Guardado en la biblioteca");
  };

  const handleVote = (newsId: number, idx: number) => {
    if (pollVotedIds.includes(newsId)) return;
    setPollVotedIds([...pollVotedIds, newsId]);
    triggerNotification(t.voteThanks);
  };

  const askAi = () => {
    if (!iaQuestion.trim()) return;
    setIsAiTyping(true);
    setIaResponse("");
    
    setTimeout(() => {
      const response = `Análisis de Impacto para ${user?.name}: Según Reuters, este cambio legislativo afectará a tu rango de edad mediante una deducción directa. En tu zona local, se estima un ahorro de 45€ mensuales en servicios básicos.`;
      setIaResponse(response);
      setIsAiTyping(false);
    }, 1500);
  };

  // --- FILTROS DE BÚSQUEDA ---
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return [];
    return MOCK_USERS.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.ig.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const filteredNews = useMemo(() => {
    if (!searchQuery) return news;
    return news.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, news]);

  if (!user) return <LoginView t={t} onLogin={handleLogin} />;

  return (
    <div className={`min-h-screen ${isCapturing ? 'bg-white text-black' : 'bg-black text-white'} font-sans selection:bg-blue-500 transition-colors duration-700`}>
      
      {/* --- HEADER --- */}
      <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-2xl border-b border-white/5 p-5 flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => { setSelected(null); setView('feed'); }}>
          <div className="w-12 h-12 bg-blue-600 rounded-[1rem] flex items-center justify-center font-black italic text-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            IX
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-black uppercase tracking-tighter">{t.siteName}</h1>
            <p className="text-[9px] font-bold text-blue-500 tracking-[0.2em] uppercase">{t.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black tracking-widest uppercase">{readers} ONLINE</span>
          </div>
          <button 
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black hover:bg-white hover:text-black transition-all"
          >
            {lang.toUpperCase()}
          </button>
        </div>
      </nav>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="pt-28 pb-40 max-w-lg mx-auto px-6">
        
        <AnimatePresence mode="wait">
          {/* VISTA: FEED PRINCIPAL */}
          {view === 'feed' && !selected && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
              
              {/* SECCIÓN: EN 1 MINUTO (STORIES) */}
              <section className="relative">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500">{t.storiesTitle}</h3>
                  <div className="flex-grow h-[1px] bg-zinc-800 ml-4" />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {news.map((n, idx) => (
                    <motion.div 
                      key={`story-${n.id}`} 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelected(n)}
                      className="flex-shrink-0 w-36 h-56 rounded-[2.5rem] relative overflow-hidden group cursor-pointer border border-white/5"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-t ${idx === 0 ? 'from-blue-600' : 'from-zinc-900'} to-transparent opacity-90`} />
                      <div className="absolute inset-0 p-5 flex flex-col justify-end">
                        <span className="text-[8px] font-black uppercase bg-white/10 w-fit px-2 py-1 rounded mb-2">{n.cat}</span>
                        <p className="text-[10px] font-bold leading-tight line-clamp-3">{n.title}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* LISTADO DE NOTICIAS */}
              <div className="space-y-10">
                {news.map((item) => (
                  <NewsCard 
                    key={item.id} 
                    item={item} 
                    t={t} 
                    onSelect={() => setSelected(item)} 
                    isLiked={likedIds.includes(item.id)}
                    onLike={() => toggleLike(item.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* VISTA: DETALLE DE NOTICIA (LAYOUT PEDIDO) */}
          {selected && (
            <motion.article 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 30 }}
              className="space-y-10"
            >
              <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-zinc-500 font-black text-[10px] uppercase tracking-widest">
                <ArrowLeft size={14} /> {t.back}
              </button>

              {/* TITULAR GANCHO */}
              <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter leading-[0.9] text-white">
                {lang === 'es' ? selected.title : selected.titleEn}
              </h1>

              {/* RESUMEN IA - 3 PUNTOS CLAVE */}
              <div className="bg-zinc-900/50 border border-white/10 rounded-[3rem] p-8 space-y-6">
                <div className="flex items-center gap-3 text-blue-500">
                  <Sparkles size={18} fill="currentColor" />
                  <h4 className="text-xs font-black uppercase tracking-widest">Los 3 Puntos Clave</h4>
                </div>
                <div className="space-y-4">
                  {selected.summaryIA.map((point: string, i: number) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-[10px] font-black">
                        {i + 1}
                      </div>
                      <p className="text-sm font-medium text-zinc-300 leading-snug">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CONTENIDO VISUAL - EMBED */}
              <div className="aspect-video w-full rounded-[2.5rem] bg-zinc-900 border-2 border-white/5 overflow-hidden shadow-2xl relative">
                <iframe className="w-full h-full" src={selected.videoUrl} allowFullScreen />
                <div className="absolute top-4 right-4 bg-red-600 text-[8px] font-black px-3 py-1 rounded-full animate-pulse">
                  REUTERS LIVE
                </div>
              </div>

              {/* FUENTE Y TRANSPARENCIA */}
              <div className="space-y-4">
                <a 
                  href={selected.sourceUrl} 
                  target="_blank" 
                  className="flex items-center justify-center gap-3 w-full bg-white text-black p-6 rounded-3xl font-black uppercase text-xs tracking-[0.2em] hover:invert transition-all"
                >
                  <ExternalLink size={18} /> {t.sourceButton}
                </a>
              </div>

              {/* TERMÓMETRO DE OPINIÓN */}
              <section className="bg-zinc-900/30 rounded-[3rem] p-10 border border-white/5 space-y-8">
                <div className="text-center space-y-2">
                  <h4 className="text-xl font-black italic">{t.pollQuestion}</h4>
                  <p className="text-[10px] text-zinc-500 font-black uppercase">Voto anónimo y soberano</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: <Flame />, color: "text-orange-500", label: t.pollOptions[0] },
                    { icon: <HelpCircle />, color: "text-blue-500", label: t.pollOptions[1] },
                    { icon: <Frown />, color: "text-red-500", label: t.pollOptions[2] }
                  ].map((opt, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleVote(selected.id, i)}
                      className="flex flex-col items-center gap-3 p-5 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
                    >
                      <div className={opt.color}>{React.cloneElement(opt.icon as any, { size: 24, fill: "currentColor" })}</div>
                      <span className="text-[9px] font-black uppercase tracking-tighter">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* ASISTENTE IA PERSONALIZADO */}
              <section className="bg-blue-600 rounded-[3rem] p-8 space-y-6 shadow-[0_20px_60px_rgba(37,99,235,0.3)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-xl">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black italic leading-none">{t.iaAssistant}</h4>
                    <p className="text-[9px] font-bold text-blue-200 uppercase mt-1">Sincronizado con Reuters</p>
                  </div>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    value={iaQuestion}
                    onChange={(e) => setIaQuestion(e.target.value)}
                    placeholder={t.iaPlaceholder}
                    className="w-full bg-black/20 border border-white/10 p-5 rounded-2xl text-white outline-none focus:bg-black/30 transition-all text-sm font-medium"
                  />
                  <button onClick={askAi} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-blue-600 p-2 rounded-xl">
                    {isAiTyping ? <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> : <Send size={20} />}
                  </button>
                </div>
                {iaResponse && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-black/20 p-5 rounded-2xl border border-white/5">
                    <p className="text-sm italic font-medium leading-relaxed">"{iaResponse}"</p>
                  </motion.div>
                )}
              </section>

              {/* BOTÓN COMPARTIDO INTELIGENTE */}
              <button 
                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(selected.sharePhrases[lang] + " " + window.location.href)}`)}
                className="flex items-center justify-between w-full bg-zinc-800 p-6 rounded-[2rem] border border-white/5"
              >
                <div className="text-left">
                  <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1">Impacto Viral</p>
                  <p className="text-sm font-bold text-zinc-300">{selected.sharePhrases[lang]}</p>
                </div>
                <div className="bg-blue-600 p-4 rounded-2xl shadow-lg"><Share2 size={24} /></div>
              </button>

              {/* SECCIÓN DE COMENTARIOS (Mantenida) */}
              <section className="pt-10 space-y-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-black italic tracking-tighter">{t.comments}</h3>
                  <div className="flex-grow h-[1px] bg-zinc-800" />
                </div>
                <div className="space-y-4">
                  {selected.comments.map((c: any) => (
                    <div key={c.id} className="bg-zinc-900/30 p-6 rounded-[2rem] border border-white/5 flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center font-black text-blue-500">{c.user[0]}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-black uppercase tracking-tighter">{c.user}</span>
                          <span className="text-[9px] font-bold text-blue-500">{c.rep} RP</span>
                        </div>
                        <p className="text-sm text-zinc-400 font-medium leading-relaxed">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.article>
          )}

          {/* VISTA: BÚSQUEDA */}
          {view === 'search' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
                <input 
                  autoFocus
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-zinc-900/50 border border-white/5 p-8 pl-16 rounded-[2.5rem] text-white outline-none focus:border-blue-500/50 transition-all font-bold"
                />
              </div>

              {searchQuery && (
                <div className="space-y-8">
                  {filteredUsers.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-2">Usuarios Encontrados</h4>
                      {filteredUsers.map(u => (
                        <div key={u.id} className="flex items-center justify-between bg-zinc-900/30 p-5 rounded-3xl border border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black">{u.name[0]}</div>
                            <div>
                              <p className="text-sm font-black uppercase">{u.name}</p>
                              <p className="text-[10px] text-zinc-500 font-bold">{u.ig}</p>
                            </div>
                          </div>
                          <button className="bg-white text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Ver Perfil</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-2">Noticias Relacionadas</h4>
                    {filteredNews.map(n => (
                      <div key={n.id} onClick={() => { setSelected(n); setView('feed'); }} className="p-6 bg-zinc-900/30 rounded-3xl border border-white/5 flex justify-between items-center group cursor-pointer">
                        <p className="text-sm font-bold group-hover:text-blue-500 transition-colors">{n.title}</p>
                        <ChevronRight size={18} className="text-zinc-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* VISTA: BIBLIOTECA / ARCHIVO */}
          {view === 'library' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">{t.myLibrary}</h2>
                <div className="bg-blue-600/10 text-blue-500 px-4 py-1 rounded-full text-[10px] font-black uppercase">{savedIds.length} Registros</div>
              </div>
              
              {savedIds.length === 0 ? (
                <div className="py-20 text-center space-y-4 opacity-30">
                  <Library size={64} className="mx-auto" />
                  <p className="text-sm font-black uppercase tracking-widest">{t.noSaved}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {news.filter(n => savedIds.includes(n.id)).map(n => (
                    <div key={n.id} onClick={() => setSelected(n)} className="bg-zinc-900 p-6 rounded-[2rem] border border-white/5 flex justify-between items-center group cursor-pointer">
                      <div className="space-y-1">
                        <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">{n.cat}</span>
                        <p className="text-sm font-bold">{n.title}</p>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleSave(n.id); }}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-all"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- BARRA DE NAVEGACIÓN INFERIOR --- */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm">
        <div className="bg-zinc-900/90 backdrop-blur-3xl border border-white/10 rounded-[3rem] px-8 py-5 flex justify-between items-center shadow-2xl">
          <NavItem icon={<Home />} active={view === 'feed'} onClick={() => { setSelected(null); setView('feed'); }} />
          <NavItem icon={<Search />} active={view === 'search'} onClick={() => setView('search')} />
          <div className="relative -mt-12">
            <button 
              onClick={() => setSelected(news[Math.floor(Math.random() * news.length)])}
              className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(37,99,235,0.6)] border-4 border-black active:scale-90 transition-all"
            >
              <Zap size={28} fill="currentColor" />
            </button>
          </div>
          <NavItem icon={<Library />} active={view === 'library'} onClick={() => setView('library')} />
          <NavItem icon={<Users />} active={view === 'profile'} onClick={() => setView('profile')} />
        </div>
      </nav>

      {/* --- NOTIFICACIONES --- */}
      <AnimatePresence>
        {showNotification && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-blue-600 text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl flex items-center gap-3">
            <CheckCircle2 size={16} /> {notificationMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- COMPONENTES ATÓMICOS ---

function NewsCard({ item, t, onSelect, isLiked, onLike }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-blue-500/20 transition-all cursor-pointer"
      onClick={onSelect}
    >
      <div className="p-8 space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">{item.cat}</span>
          </div>
          <span className="text-[8px] font-black text-zinc-500 uppercase italic">Verificado EFE/Reuters</span>
        </div>
        <h3 className="text-2xl font-black italic tracking-tighter leading-tight group-hover:text-blue-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-zinc-500 font-medium line-clamp-2 leading-relaxed">
          {item.summaryIA[0]}
        </p>
        <div className="flex justify-between items-center pt-2">
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[8px] font-black uppercase">
                {i}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onLike(); }}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isLiked ? 'bg-red-500 text-white' : 'bg-white/5 text-zinc-500 hover:bg-white/10'}`}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button className="bg-white text-black px-6 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all">Leer</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NavItem({ icon, active, onClick }: { icon: any, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`p-3 rounded-2xl transition-all ${active ? 'text-blue-500 bg-blue-500/10' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}>
      {React.cloneElement(icon, { size: 22 })}
    </button>
  );
}

function LoginView({ t, onLogin }: any) {
  const [name, setName] = useState("");
  const [ig, setIg] = useState("");
  return (
    <main className="fixed inset-0 bg-black flex items-center justify-center p-8 z-[1000]">
      <div className="w-full max-w-sm space-y-12">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-blue-600 mx-auto rounded-[2.5rem] flex items-center justify-center text-5xl font-black italic shadow-[0_0_60px_rgba(37,99,235,0.5)]">IX</div>
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">{t.siteName}</h1>
            <p className="text-[10px] font-black text-blue-500 tracking-[0.5em] uppercase">{t.welcome}</p>
          </div>
        </div>
        <div className="bg-zinc-900/50 p-10 rounded-[3.5rem] border border-white/5 space-y-4">
          <input type="text" placeholder={t.placeholderName} value={name} onChange={e => setName(e.target.value)} className="w-full bg-white/5 border border-white/5 p-6 rounded-2xl text-white font-bold outline-none focus:border-blue-500 transition-all placeholder:text-zinc-600" />
          <input type="text" placeholder={t.placeholderIg} value={ig} onChange={e => setIg(e.target.value)} className="w-full bg-white/5 border border-white/5 p-6 rounded-2xl text-white font-bold outline-none focus:border-blue-500 transition-all placeholder:text-zinc-600" />
          <button onClick={() => onLogin(name, ig)} className="w-full bg-white text-black p-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] shadow-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95">{t.actionButton}</button>
        </div>
        <p className="text-[9px] text-center text-zinc-600 font-bold uppercase tracking-widest leading-relaxed px-10">Al entrar, aceptas los protocolos de neutralidad y veracidad de la red Infoxity.</p>
      </div>
    </main>
  );
}
