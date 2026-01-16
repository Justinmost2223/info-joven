"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Languages, Award, Bookmark, 
  BookmarkCheck, CheckCircle2, ArrowLeft, Mic2, 
  TrendingUp, Scale, Star, Menu, X, Share2, Send, Zap, Globe,
  MoreHorizontal, Heart, MessageCircle, Library, Sparkles, Home, Search, Bell, Users, Info
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
    placeholderName: "Tu nombre o alias...",
    placeholderIg: "Instagram (ej: @usuario)",
    popular: "Tendencias Globales",
    share: "Compartir",
    shareWa: "WhatsApp",
    socialProof: "Ya dentro del sistema:"
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
    identityTitle: "La Philosophy Infoxity",
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
    placeholderIg: "@instagram_user",
    popular: "Global Trends",
    share: "Share",
    shareWa: "WhatsApp",
    socialProof: "Already inside:"
  }
};

const INITIAL_NEWS = [
  {
    id: 0,
    cat: "Sistema", catEn: "System",
    title: "Infoxity: La Red Social Noticiera del Futuro", titleEn: "Infoxity: The News Social Network of the Future",
    context: "Bienvenido al nodo central de información libre. Haz clic para entender nuestra misión.",
    content: "Has entrado en Infoxity. Esto no es solo un portal de noticias, es la red social noticiera diseñada para la resistencia intelectual. Actualmente nos encontramos en **Fase de Desarrollo (Beta 2026)**.\n\nNuestra misión es clara: proporcionarte un espacio donde la realidad no esté filtrada por algoritmos de complacencia. Aquí podrás informarte sobre lo que realmente importa, debatir con argumentos de peso y dejar que te guiemos a través del caos mediático actual. Muy pronto, podrás crear tu propio perfil de analista y liderar corrientes de opinión basadas en la verdad. La realidad es compleja, nosotros te ayudamos a navegarla.",
    bias: [100, 100, 0],
    likes: 1540,
    poll: { q: "¿Estás listo para la nueva era?", opts: ["Totalmente", "Tengo dudas", "Prefiero observar"], votes: [1200, 150, 45] },
    sources: ["Infoxity Core Manifest"],
    color: "from-blue-600 to-indigo-800",
    comments: [
      { id: 1, user: "Admin", ig: "@infoxity", rep: 9999, text: "Bienvenidos a todos. Estamos construyendo el futuro del debate." },
      { id: 2, user: "Lucas", ig: "@lucas_dev", rep: 500, text: "Hacía falta una web que separara el ruido de la realidad. ¡Dándole like!" }
    ]
  },
  {
    id: 1,
    cat: "Geopolítica", catEn: "Geopolitics",
    title: "Venezuela 2026: El Nuevo Eje Energético Global", titleEn: "Venezuela 2026: The New Global Energy Axis",
    context: "El acuerdo secreto entre Washington y Caracas para alimentar las granjas de servidores de IA en EE.UU.",
    content: "En enero de 2026, la diplomacia energética ha dado un giro inesperado. Ante el consumo masivo de electricidad de los nuevos modelos de Inteligencia Artificial General (AGI), Estados Unidos ha firmado el 'Pacto del Caribe' con Venezuela. Este acuerdo no solo implica el levantamiento de sanciones, sino la inversión masiva en infraestructura venezolana a cambio de crudo pesado destinado exclusivamente a la generación eléctrica de centros de datos en Texas y Florida.\n\nEl análisis de Infoxity revela que este movimiento estabiliza la economía regional pero genera una nueva dependencia tecnológica. Mientras el mundo miraba hacia las renovables, la urgencia de la computación ha devuelto el poder a las reservas fósiles más grandes del mundo.",
    bias: [95, 92, 10], 
    likes: 2400,
    poll: { q: "¿Es ético priorizar la IA sobre las sanciones?", opts: ["Pragmatismo necesario", "Error histórico", "Neutral"], votes: [540, 210, 95] },
    sources: ["OPEP+ Energy Report", "Digital Geopolitics Journal", "Reuters Intelligence"],
    color: "from-orange-500 to-red-600",
    comments: [
      { id: 1, user: "Mateo Fernández", ig: "@mateo_fdz", rep: 2500, text: "La energía manda, las ideologías solo adornan. El regreso del crudo pesado era inevitable con el consumo de la AGI. 🔋" },
      { id: 101, user: "Elena Vega", ig: "@elvega_geo", rep: 4890, text: "Lo que nadie dice es que este acuerdo deja a la UE fuera del tablero energético sudamericano por otra década." },
      { id: 102, user: "Dr. Arreaza", ig: "@arreaza_intel", rep: 1200, text: "Como analista en Caracas, confirmo que la infraestructura ya está recibiendo técnicos de Texas. Movimiento maestro." },
      { id: 103, user: "Sofia K.", ig: "@sk_global", rep: 950, text: "Es una hipocresía climática total, pero el mercado no espera a las renovables." },
      { id: 104, user: "Juan P.", ig: "@juanp_energy", rep: 300, text: "¿Y qué pasará con el precio del barril doméstico?" }
    ]
  },
  {
    id: 2,
    cat: "Cultura", catEn: "Culture",
    title: "Stranger Things 5 y el Fin del Binge-Watching", titleEn: "Stranger Things 5 and the End of Binge-Watching",
    context: "Netflix abandona el modelo de 'todo de golpe' para salvar su relevancia cultural.",
    content: "El estreno de la última temporada de Stranger Things en 2026 marca oficialmente el funeral del maratón de series. Netflix ha anunciado que los episodios se lanzarán quincenalmente, acompañados de eventos en vivo en Realidad Virtual.\n\nEl análisis de Infoxity indica que el modelo de 'atracón' destruía la conversación social en menos de 48 horas. Ahora, la industria busca la 'escasez artificial'.",
    bias: [88, 94, 25],
    likes: 1800,
    poll: { q: "¿Prefieres esperar o verlo todo ya?", opts: ["Esperar (Crea hype)", "Todo ya", "Indiferente"], votes: [890, 410, 120] },
    sources: ["Streaming Analytics 2026", "Variety Insights"],
    color: "from-purple-500 to-indigo-600",
    comments: [
      { id: 201, user: "Carlos Ruiz", ig: "@cruiz_filmes", rep: 3560, text: "Por fin recuperamos la cultura de la espera. El binge-watching era comida rápida emocional. 🙌" },
      { id: 202, user: "Marta G.", ig: "@martag_tv", rep: 1200, text: "Esto salvará las suscripciones. Netflix aprendió de HBO por las malas." },
      { id: 203, user: "Rick", ig: "@rick_grimes", rep: 150, text: "A este paso la terminaremos de ver en 2027..." },
      { id: 204, user: "Sara", ig: "@sara_cine", rep: 800, text: "La VR va a ser un cambio total para la experiencia." }
    ]
  },
  {
    id: 3,
    cat: "Política", catEn: "Politics",
    title: "Gen Z: El Fin de la Izquierda y la Derecha", titleEn: "Gen Z: The End of Left and Right",
    context: "El 70% de los jóvenes votantes en 2026 se declaran 'Pragmáticos Radicales'.",
    content: "Las etiquetas políticas tradicionales han colapsado. Un estudio profundo realizado por el equipo de Infoxity muestra que la Generación Z ya no vota por bloques ideológicos, sino por 'paquetes de soluciones'. Un joven puede defender el mercado libre de criptoactivos y al mismo tiempo exigir la nacionalización de la vivienda.",
    bias: [98, 96, 5],
    likes: 5200,
    poll: { q: "¿Te sientes representado por algún partido?", opts: ["Ninguno", "Por ideas sueltas", "Sí, soy fiel"], votes: [1500, 600, 150] },
    sources: ["Pew Research Center 2026", "Infoxity Data Lab"],
    color: "from-emerald-500 to-teal-600",
    comments: [
      { id: 301, user: "Lucía Méndez", ig: "@lucia_vota", rep: 5100, text: "La eficiencia no tiene color político. Queremos que las cosas funcionen, punto." },
      { id: 302, user: "Marcos J.", ig: "@marcos_j", rep: 800, text: "El post-ideologismo es la única salida a la polarización estéril de los últimos 20 años." },
      { id: 303, user: "Dani", ig: "@dani_pragmatic", rep: 400, text: "Pragmatismo o muerte. Los viejos partidos no entienden nada." }
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
  const [likedIds, setLikedIds] = useState<number[]>([]);

  useEffect(() => {
    // PREVENIR ZOOM EN INPUTS
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0";
    document.getElementsByTagName('head')[0].appendChild(meta);

    const savedUser = localStorage.getItem('infoxity_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedVotes = localStorage.getItem('infoxity_votes');
    if (savedVotes) setVotedPolls(JSON.parse(savedVotes));
    
    const savedLibrary = localStorage.getItem('infoxity_library');
    if (savedLibrary) setSavedIds(JSON.parse(savedLibrary));

    const savedLikes = localStorage.getItem('infoxity_likes');
    if (savedLikes) setLikedIds(JSON.parse(savedLikes));

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

  const handleLogin = async () => {
    if (nameInput) {
      try {
        await fetch("https://formspree.io/f/mqeeawor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            nombre_usuario: nameInput, 
            instagram: igInput || "No proporcionado",
            fecha_registro: new Date().toLocaleString()
          }),
        });
      } catch (err) {
        console.error("Error al guardar en base de datos");
      }

      const newUser = { name: nameInput, ig: igInput.startsWith('@') ? igInput : `@${igInput}` || "@anonimo", rep: 150 };
      setUser(newUser);
      localStorage.setItem('infoxity_user', JSON.stringify(newUser));
    }
  };

  const handleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (likedIds.includes(id)) {
      setLikedIds(prev => prev.filter(i => i !== id));
      localStorage.setItem('infoxity_likes', JSON.stringify(likedIds.filter(i => i !== id)));
    } else {
      setLikedIds(prev => [...prev, id]);
      localStorage.setItem('infoxity_likes', JSON.stringify([...likedIds, id]));
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

  const handlePostComment = () => {
    if(!commentText.trim() || !user) return;
    const newComment = { id: Date.now(), user: user.name, ig: user.ig, rep: user.rep, text: commentText };
    const updatedNews = news.map(n => n.id === selected.id ? { ...n, comments: [newComment, ...n.comments] } : n);
    setNews(updatedNews);
    setSelected({...selected, comments: [newComment, ...selected.comments]});
    const currentGlobal = JSON.parse(localStorage.getItem('infoxity_global_comments') || '{}');
    const newsComments = currentGlobal[selected.id] || [];
    currentGlobal[selected.id] = [newComment, ...newsComments];
    localStorage.setItem('infoxity_global_comments', JSON.stringify(currentGlobal));
    setCommentText("");
  };

  const savedNews = useMemo(() => news.filter(n => savedIds.includes(n.id)), [news, savedIds]);

  if (!user) {
    return (
      <main className="fixed inset-0 bg-black z-[100] flex items-center justify-center p-6 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm w-full space-y-8 py-10">
          
          <div className="flex flex-col items-center space-y-3">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-black text-blue-500">
                +1k
              </div>
            </div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t.socialProof}</p>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-8xl font-black italic tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">IX</h1>
            <p className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">{t.welcome}</p>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] space-y-4 shadow-2xl">
            <div className="relative group">
               <input 
                  type="text" 
                  placeholder={t.placeholderName} 
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-blue-500 transition-all text-sm font-medium" 
                  onChange={(e) => setNameInput(e.target.value)} 
               />
            </div>

            <div className="relative">
              <Instagram className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder={t.placeholderIg} 
                className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-white outline-none focus:border-pink-500 transition-all text-sm font-medium" 
                onChange={(e) => setIgInput(e.target.value)} 
              />
            </div>

            <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 group">
              {t.actionButton}
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-[9px] text-zinc-500 text-center font-bold uppercase tracking-tighter px-4">
              Al entrar, te unes al nodo de inteligencia colectiva Infoxity.
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <div className={`min-h-screen selection:bg-blue-600 selection:text-white ${isCapturing ? 'bg-white' : 'bg-[#000] text-white'}`}>
      
      {!isCapturing && (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-black italic tracking-tighter text-white cursor-pointer" onClick={() => setSelected(null)}>IX</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-600/10 px-3 py-1.5 rounded-full border border-blue-600/20">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-tighter text-blue-400">{readers}</span>
            </div>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="text-[10px] font-black bg-white/5 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
              {lang.toUpperCase()}
            </button>
          </div>
        </nav>
      )}

      {!isCapturing && !selected && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-2xl border border-white/10 px-8 py-4 rounded-full flex gap-12 items-center shadow-2xl">
          <Home size={22} className="text-blue-500 cursor-pointer" onClick={() => setSelected(null)} />
          <Search size={22} className="text-gray-400 cursor-pointer" />
          <Bell size={22} className="text-gray-400 cursor-pointer" />
          <div className="relative cursor-pointer" onClick={() => {}}>
             <Library size={22} className={savedIds.length > 0 ? "text-blue-500" : "text-gray-400"} />
             {savedIds.length > 0 && <span className="absolute -top-1 -right-1 bg-blue-600 text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-black">{savedIds.length}</span>}
          </div>
        </nav>
      )}

      <main className={`max-w-screen-md mx-auto px-4 ${isCapturing ? 'pt-0' : 'pt-24 pb-32'}`}>
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              
              <section 
                onClick={() => setSelected(news[0])}
                className="relative h-[400px] w-full rounded-[2.5rem] overflow-hidden group border border-white/10 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-800/30 transition-all duration-700" />
                <div className="absolute bottom-10 left-10 right-10 z-20 space-y-4">
                  <span className="bg-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">{t.featured}</span>
                  <h2 className="text-4xl md:text-5xl font-black leading-none tracking-tighter">{t.identityTitle}</h2>
                  <p className="text-gray-300 text-sm font-medium line-clamp-2 italic">{t.identityBody}</p>
                </div>
              </section>

              <div className="space-y-6">
                {news.map((n) => (
                  <motion.div 
                    key={n.id} 
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(n)}
                    className="bg-[#0f0f0f] border border-white/5 rounded-[2rem] p-6 space-y-6 hover:border-white/20 transition-all cursor-pointer group shadow-xl"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-black text-[10px]">IX</div>
                        <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{lang === 'es' ? n.cat : n.catEn}</span>
                      </div>
                      <MoreHorizontal size={18} className="text-gray-600" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-3xl font-black tracking-tighter leading-tight group-hover:text-blue-500 transition-colors">
                        {lang === 'es' ? n.title : n.titleEn}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium italic">"{n.context}"</p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <div className="flex gap-6 items-center">
                        <button 
                          onClick={(e) => handleLike(e, n.id)} 
                          className={`flex items-center gap-2 transition-colors ${likedIds.includes(n.id) ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
                        >
                          <Heart size={18} fill={likedIds.includes(n.id) ? "currentColor" : "none"} />
                          <span className="text-[10px] font-bold">{likedIds.includes(n.id) ? (n.likes + 1) : n.likes}</span>
                        </button>
                        <div className="flex items-center gap-2 text-gray-400">
                          <MessageCircle size={18} />
                          <span className="text-[10px] font-bold">{n.comments.length}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Zap size={18} />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={(e) => toggleSave(e, n.id)} className="text-gray-400 hover:text-white">
                           {savedIds.includes(n.id) ? <BookmarkCheck size={20} className="text-blue-500" /> : <Bookmark size={20} />}
                        </button>
                        <button onClick={(e) => shareOnWhatsApp(e, n)} className="text-gray-400 hover:text-green-500">
                          <Share2 size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          ) : (
            <motion.article key="article" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className={`max-w-2xl mx-auto ${isCapturing ? 'text-black p-12' : ''}`}>
              
              {!isCapturing && (
                <div className="flex justify-between items-center mb-12">
                  <button onClick={() => setSelected(null)} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white">
                    <ArrowLeft size={20} />
                  </button>
                  <button onClick={() => setIsCapturing(true)} className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {t.capture}
                  </button>
                </div>
              )}

              <header className="space-y-6 mb-12 text-center md:text-left">
                <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em]">{lang === 'es' ? selected.cat : selected.catEn}</span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] italic">{lang === 'es' ? selected.title : selected.titleEn}</h1>
                
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                   <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-black text-xs">IX</div>
                   <div>
                     <p className="text-[10px] font-black uppercase">Consejo Editorial</p>
                     <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Verificado • 2026</p>
                   </div>
                </div>
              </header>

              <section className={`text-lg md:text-xl font-serif leading-relaxed space-y-8 ${isCapturing ? 'text-black' : 'text-gray-300'}`}>
                {selected.content.split('\n\n').map((p: string, i: number) => (
                  <p key={i} className="first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:leading-none">{p}</p>
                ))}
              </section>

              {!isCapturing && (
                <div className="mt-20 space-y-16">
                  <section className="space-y-10">
                    <h3 className="text-2xl font-black italic tracking-tighter border-b border-white/5 pb-4">{t.comments}</h3>
                    <div className="flex gap-4 items-start">
                       <div className="w-10 h-10 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center font-black text-xs uppercase">{user.name[0]}</div>
                       <div className="flex-grow relative">
                          <textarea 
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder={t.postComment}
                            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm min-h-[100px] resize-none"
                          />
                          <button onClick={handlePostComment} className="absolute bottom-4 right-4 bg-blue-600 p-2 rounded-xl text-white">
                            <Send size={18} />
                          </button>
                       </div>
                    </div>

                    <div className="space-y-8">
                      {selected.comments.map((c: any) => (
                        <div key={c.id} className="flex gap-4">
                           <div className="w-10 h-10 bg-white/5 rounded-full flex-shrink-0 flex items-center justify-center font-black text-xs text-blue-500 uppercase">{c.user[0]}</div>
                           <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-black uppercase tracking-tight">{c.user}</span>
                                <span className="text-[9px] text-pink-500 font-bold uppercase flex items-center gap-1">
                                  <Instagram size={8} /> {c.ig}
                                </span>
                              </div>
                              <p className="text-gray-400 text-sm leading-relaxed">"{c.text}"</p>
                           </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {isCapturing && (
                <div className="mt-32 pt-10 border-t-2 border-black flex justify-between items-center italic font-black">
                  <span className="text-2xl tracking-tighter">INFOXITY.INTEL</span>
                  <div className="text-right text-[8px] uppercase tracking-widest text-gray-500">© 2026 Archive</div>
                </div>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      <footer className="pb-32 pt-10 text-center opacity-30">
        <p className="text-[9px] font-black tracking-[1em] uppercase">Infoxity Network</p>
      </footer>
      
      {isCapturing && (
        <button onClick={() => setIsCapturing(false)} className="fixed bottom-10 right-10 bg-black text-white p-5 rounded-full z-[200] border border-white/20 shadow-2xl active:scale-90 transition-all">
          <X size={24} />
        </button>
      )}
    </div>
  );
}
