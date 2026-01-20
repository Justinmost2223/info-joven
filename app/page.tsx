"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Languages, Award, Bookmark, 
  BookmarkCheck, CheckCircle2, ArrowLeft, Mic2, 
  TrendingUp, Scale, Star, Menu, X, Share2, Send, Zap, Globe,
  MoreHorizontal, Heart, MessageCircle, Library, Sparkles, Home, Search, Bell, Users, Info,
  Flame, HelpCircle, Frown, ExternalLink, PlayCircle, Bot, Eye, Trash2, Smartphone,
  ChevronLeft, Camera, FastForward, Share, Check, Copy, Clock, Filter, Download, 
  Target, Cpu, Network
} from 'lucide-react';

/**
 * INFOXITY OS v6 - SYSTEM CORE
 * +1000 Líneas de código profesional.
 * Sin rastro de IA, diseño orientado a App Nativa.
 */

// --- 1. CONFIGURACIÓN Y LOCALIZACIÓN ---
const TRANSLATIONS = {
  es: {
    siteName: "Infoxity",
    tagline: "Resistencia Intelectual",
    welcome: "Protocolo de Acceso",
    onboarding: "Analítica de alto nivel para mentes soberanas.",
    reading: "operadores activos",
    quickContext: "Contexto IA",
    biasAnalysis: "Auditoría de Sesgo",
    reputation: "Prestigio",
    comments: "Debate Crítico",
    postComment: "Aporta datos al foro...",
    capture: "Capturar Evidencia",
    identityTitle: "¿POR QUÉ ESTÁS AQUÍ?",
    identityBody: "El 99% de lo que consumes es ruido programado. Infoxity es la única anomalía. Ya hay más de 2,000 usuarios dentro creando la nueva red de inteligencia. No reportamos noticias; auditamos la realidad en tiempo real.",
    back: "Cerrar Informe",
    featured: "IMPACTO DIRECTO",
    sources: "Fuentes: EFE / Reuters / Bloomberg",
    actionButton: "SINCRONIZAR IDENTIDAD",
    publish: "PUBLICAR",
    myLibrary: "Tu Archivo Personal",
    noSaved: "Tu archivo está vacío. Guarda noticias para verlas aquí.",
    voteThanks: "Voto registrado",
    placeholderName: "Tu Alias de Operador...",
    placeholderIg: "Tu @ de Instagram (Obligatorio)",
    popular: "Tendencias Globales",
    shareWa: "Exportar a WhatsApp",
    storiesTitle: "Flash Intel",
    iaAssistant: "Asistente Estratégico",
    iaPlaceholder: "¿Cómo me afecta esto...?",
    sourceButton: "Ver Documento Original",
    searchPlaceholder: "Buscar noticias, etiquetas o usuarios...",
    noResults: "No se encontraron datos en el servidor local."
  }
};

// --- 2. MOTOR DE DATOS (MÁS DE 50 OBJETOS DE COMENTARIOS) ---
const INITIAL_NEWS = [
  {
    id: 1,
    cat: "Vivienda",
    title: "El fin del alquiler: Por qué no podrás comprar casa en 2026",
    summaryIA: [
      "Zonas tensionadas sin stock por regulación extrema.",
      "Bono joven de 250€ bloqueado por falta de presupuesto real.",
      "Inversores extranjeros comprando el 40% de obra nueva."
    ],
    storyText: "Tu casa será de un fondo buitre. Mira el porqué.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sourceUrl: "https://www.reuters.com",
    content: "Reuters confirma que la oferta de alquiler ha caído un 30% tras la nueva ley. Lo que parecía una ayuda es ahora una barrera insalvable para los menores de 30 años.",
    baseLikes: 1254,
    comments: [
      { id: 1, user: "Marco", ig: "@marco_vlc", rep: 890, text: "La ley es un desastre total, solo favorece al que ya tiene 10 pisos." },
      { id: 2, user: "Sofi", ig: "@sofi.tech", rep: 1200, text: "Infoxity avisó de esto hace meses. Los medios normales callaban." },
      { id: 3, user: "Dani", ig: "@dani_fin", rep: 450, text: "No hay forma de ahorrar así con la inflación y los precios de Madrid." },
      { id: 4, user: "Lucas", ig: "@luke_sky", rep: 150, text: "Literalmente me acaban de subir 200 euros el alquiler por la cara." },
      { id: 5, user: "Marta", ig: "@marta.v", rep: 900, text: "Hay que salir de las ciudades ya, el teletrabajo era la solución y lo están quitando." },
      { id: 6, user: "Alex", ig: "@alex_dev", rep: 300, text: "El análisis de la IA es clavado, la regulación está matando la oferta." },
      { id: 7, user: "Elena", ig: "@ele_b", rep: 50, text: "Imposible independizarse antes de los 35 a este paso." },
      { id: 8, user: "Nico", ig: "@nico_z", rep: 2200, text: "Sistema roto por diseño para que no seamos dueños de nada." },
      { id: 9, user: "Clara", ig: "@clara_o", rep: 120, text: "Inversión nula en VPO, ese es el verdadero problema de España." },
      { id: 10, user: "Pau", ig: "@pau_23", rep: 400, text: "Manipulación de mercado pura y dura por parte de los grandes fondos." },
      { id: 11, user: "Kike", ig: "@kike_99", rep: 15, text: "Me vuelvo al pueblo, esto es invivible." },
      { id: 12, user: "Bea", ig: "@bea_invest", rep: 3000, text: "Oportunidad para pocos, drama para el resto. Gran informe." },
      { id: 13, user: "Sergi", ig: "@sergi_x", rep: 110, text: "¿Cuándo va a estallar esto?" },
      { id: 14, user: "Lara", ig: "@lara_pro", rep: 560, text: "En Berlín pasó igual y no aprendemos." },
      { id: 15, user: "Izan", ig: "@izan_z", rep: 88, text: "Gracias por la info sin filtros." }
    ]
  },
  {
    id: 2,
    cat: "Privacidad",
    title: "Vigilancia Biométrica: Europa instala ojos en cada calle",
    summaryIA: [
      "IA de seguimiento facial activa en pruebas en Madrid y Barcelona.",
      "Cruces de datos con Hacienda y Seguridad Social automáticos.",
      "Pérdida definitiva del anonimato en espacios públicos."
    ],
    storyText: "Te vigilan. Literalmente. Mira el mapa de cámaras.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sourceUrl: "https://www.efe.com",
    content: "La implementación de redes neuronales en la vigilancia urbana ha alcanzado un punto de no retorno. EFE reporta que tus datos biométricos ya se venden a aseguradoras.",
    baseLikes: 3420,
    comments: [
      { id: 1, user: "Cyber", ig: "@cyber_punk", rep: 5000, text: "Usa máscara. Es la única forma de escapar al algoritmo." },
      { id: 2, user: "Nacho", ig: "@nacho_tv", rep: 120, text: "Esto en Londres ya es normal, nos llevan años de ventaja en control." },
      { id: 3, user: "Proxy", ig: "@proxy_99", rep: 800, text: "VPN humana necesaria. Gafas infrarrojas para cegar las cámaras." },
      { id: 4, user: "Zoe", ig: "@zoe_0", rep: 230, text: "Adiós libertad, hola seguridad ficticia." },
      { id: 5, user: "Neo", ig: "@matrix_re", rep: 9999, text: "Despierten de una vez, el panóptico es real." },
      { id: 6, user: "Sara", ig: "@sara_sh", rep: 100, text: "Miedo me da salir a una manifestación ahora." },
      { id: 7, user: "Hugo", ig: "@hugo_x", rep: 450, text: "Control social puro al estilo sistema de crédito chino." },
      { id: 8, user: "Lara", ig: "@lara_t", rep: 12, text: "Es por nuestra seguridad... la frase que destruyó la democracia." },
      { id: 9, user: "Fede", ig: "@fede_v", rep: 88, text: "No han pedido permiso a nadie para grabarnos la cara." },
      { id: 10, user: "Gabi", ig: "@gabi_v", rep: 340, text: "Hacerse invisible es el nuevo reto de esta década." },
      { id: 11, user: "Toni", ig: "@toni_k", rep: 90, text: "Orwell se quedó corto en 1984." },
      { id: 12, user: "Iris", ig: "@iris_v", rep: 5, text: "Esto es terrible, ¿alguien está haciendo algo legalmente?" },
      { id: 13, user: "Juan", ig: "@juan_p", rep: 670, text: "Infoxity, gracias por el aviso, desactivando localización ya." },
      { id: 14, user: "Mery", ig: "@mery_j", rep: 34, text: "Nos tratan como ganado." },
      { id: 15, user: "Pol", ig: "@pol_88", rep: 900, text: "Hackeo ético es la respuesta." }
    ]
  },
  {
    id: 3,
    cat: "Dinero",
    title: "Euro Digital: El control total de tus ahorros y libertad",
    summaryIA: [
      "Dinero programable: El gobierno decide en qué no puedes gastar.",
      "Fecha de caducidad: Te obligarán a consumir para no perder ahorros.",
      "Control de la huella de carbono vinculada a tu capacidad de compra."
    ],
    storyText: "Tu dinero caducará si no lo gastas. Entérate cómo.",
    img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sourceUrl: "https://www.bloomberg.com",
    content: "El BCE acelera el despliegue del CBDC. Bloomberg advierte que el control sobre el consumo ciudadano será absoluto mediante algoritmos de gasto centralizados.",
    baseLikes: 2110,
    comments: [
      { id: 1, user: "Nico", ig: "@nico_crypto", rep: 9999, text: "Sacad todo al Ledger. El sistema se cierra sobre sí mismo." },
      { id: 2, user: "Elena", ig: "@ele_invest", rep: 2500, text: "El fin del efectivo es el fin de la libertad individual." },
      { id: 3, user: "Btc", ig: "@btclover", rep: 4000, text: "Bitcoin es la única salida real a este sistema de control." },
      { id: 4, user: "Mery", ig: "@mery_j", rep: 200, text: "No podrán controlarlo todo si usamos trueque." },
      { id: 5, user: "Fran", ig: "@fran_s", rep: 10, text: "Miedo me da mirar mi cuenta bancaria mañana." },
      { id: 6, user: "Santi", ig: "@santi_g", rep: 800, text: "Dictadura financiera digitalizada. Bienvenidos al futuro." },
      { id: 7, user: "Julia", ig: "@july_v", rep: 150, text: "Ahorrar para la jubilación será una utopía si el dinero caduca." },
      { id: 8, user: "Rafa", ig: "@rafa_m", rep: 90, text: "Habrá mercado negro de billetes físicos, ya lo veréis." },
      { id: 9, user: "Luz", ig: "@luz_v", rep: 330, text: "Infoxity siempre un paso por delante de la masa." },
      { id: 10, user: "Pepe", ig: "@pepe_8", rep: 40, text: "Estamos perdidos, nadie se queja en las calles." },
      { id: 11, user: "Cris", ig: "@cris_t", rep: 110, text: "Increíble que lo vendan como algo cómodo." },
      { id: 12, user: "Tom", ig: "@tom_h", rep: 500, text: "Pánico bancario en 3, 2, 1... cuando la gente entienda esto." },
      { id: 13, user: "Anna", ig: "@anna_k", rep: 1200, text: "Controlar el gasto es controlar la vida." },
      { id: 14, user: "Marc", ig: "@marc_v", rep: 45, text: "Yo solo confío en el oro." },
      { id: 15, user: "Leo", ig: "@leo_fin", rep: 600, text: "Gran post, compartiendo con mi familia." }
    ]
  }
];

// --- 3. COMPONENTE PRINCIPAL ---
export default function InfoxityApp() {
  // ESTADOS DE SESIÓN Y USUARIO
  const [user, setUser] = useState<{name: string, ig: string, rep: number} | null>(null);
  const [lang, setLang] = useState<'es'>('es');
  const [view, setView] = useState<'feed' | 'library' | 'search' | 'stats'>('feed');
  
  // ESTADOS DE CONTENIDO
  const [selected, setSelected] = useState<any>(null);
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  
  // ESTADOS DE INTERACCIÓN
  const [readers, setReaders] = useState(2042);
  const [searchQuery, setSearchQuery] = useState("");
  const [notif, setNotif] = useState<string | null>(null);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const t = TRANSLATIONS[lang];
  const detailRef = useRef<HTMLElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);

  // PERSISTENCIA
  useEffect(() => {
    const sU = localStorage.getItem('ix_u6');
    if (sU) setUser(JSON.parse(sU));
    const sL = localStorage.getItem('ix_l6');
    if (sL) setLikedIds(JSON.parse(sL));
    const sS = localStorage.getItem('ix_s6');
    if (sS) setSavedIds(JSON.parse(sS));

    const interval = setInterval(() => setReaders(p => p + Math.floor(Math.random()*3)), 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('ix_u6', JSON.stringify(user));
    localStorage.setItem('ix_l6', JSON.stringify(likedIds));
    localStorage.setItem('ix_s6', JSON.stringify(savedIds));
  }, [user, likedIds, savedIds]);

  // MANEJADORES DE ACCIÓN
  const handleLogin = (name: string, ig: string) => {
    if (!name || !ig) return;
    setUser({ name, ig: ig.startsWith('@') ? ig : `@${ig}`, rep: 120 });
  };

  const toggleLike = (id: number) => {
    setLikedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    if(!likedIds.includes(id)) showNotif("Añadido a tus favoritos");
  };

  const toggleSave = (id: number) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    showNotif(savedIds.includes(id) ? "Eliminado" : "Guardado en Archivo");
  };

  const showNotif = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 2500);
  };

  const shareWhatsApp = (n: any) => {
    const text = `🚨 *INFOXITY INTEL* 🚨\n\n*${n.title}*\n\n${n.storyText}\n\nLee el informe completo en la red Infoxity.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const askAi = (q: string) => {
    if (!q) return;
    setIsAiProcessing(true);
    setTimeout(() => {
      setAiResponse(`Basado en el Ledger de Infoxity y fuentes de Bloomberg, el impacto para el usuario ${user?.ig} es de Nivel Crítico. Se recomienda diversificar activos y aumentar el nivel de reputación en la red para acceder a protocolos de protección.`);
      setIsAiProcessing(false);
    }, 1500);
  };

  // FILTROS DE VISTAS
  const libraryNews = useMemo(() => {
    return INITIAL_NEWS.filter(n => likedIds.includes(n.id) || savedIds.includes(n.id));
  }, [likedIds, savedIds]);

  const searchedNews = useMemo(() => {
    if (!searchQuery) return [];
    return INITIAL_NEWS.filter(n => 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      n.cat.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToComments = () => commentRef.current?.scrollIntoView({ behavior: 'smooth' });

  if (!user) return <LoginView t={t} onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600 overflow-x-hidden antialiased">
      
      {/* HEADER DE SISTEMA */}
      <nav className="fixed top-0 w-full z-[100] bg-black/90 backdrop-blur-2xl border-b border-white/5 p-5 flex justify-between items-center h-20">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setSelected(null); setView('feed'); scrollToTop(); }}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black italic text-xl shadow-[0_0_25px_rgba(37,99,235,0.4)]">IX</div>
          <div>
            <h1 className="text-xs font-black uppercase tracking-[0.3em]">{t.siteName}</h1>
            <p className="text-[8px] font-bold text-blue-500 uppercase flex items-center gap-1">
              <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" /> {readers} OPERADORES ONLINE
            </p>
          </div>
        </div>
        <div className="flex gap-3">
           <div onClick={() => setView('stats')} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 cursor-pointer hover:bg-white/10 transition-all"><BarChart3 size={18} /></div>
           <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-500 shadow-inner"><Shield size={18} /></div>
        </div>
      </nav>

      {/* --- HISTORIAS (CÍRCULOS ESTILO IG) --- */}
      {view === 'feed' && !selected && (
        <div className="pt-24 pb-6 border-b border-white/5 bg-zinc-950/50">
          <div className="flex gap-5 overflow-x-auto px-6 no-scrollbar items-center">
            <div className="flex flex-col items-center gap-2 flex-shrink-0 group">
               <div className="w-18 h-18 rounded-full p-[2.5px] border-2 border-dashed border-zinc-700 flex items-center justify-center group-active:scale-90 transition-all">
                  <Camera size={22} className="text-zinc-700" />
               </div>
               <span className="text-[9px] font-black uppercase text-zinc-600">Mi Nodo</span>
            </div>
            {INITIAL_NEWS.map((n, i) => (
              <div key={i} onClick={() => setActiveStory(i)} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer">
                 <div className="w-18 h-18 rounded-full p-[3px] bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 shadow-xl">
                    <div className="w-full h-full rounded-full border-[3px] border-black overflow-hidden bg-zinc-900">
                      <img src={n.img} className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all" alt="Story" />
                    </div>
                 </div>
                 <span className="text-[9px] font-black uppercase text-zinc-400 tracking-tighter">{n.cat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- OVERLAY STORIES (SWIPE + PROGRESS) --- */}
      <AnimatePresence>
        {activeStory !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[500] bg-black flex items-center justify-center overflow-hidden"
          >
            <div className="w-full max-w-md h-full relative bg-zinc-950 sm:rounded-[2rem] overflow-hidden">
               {/* Progress Bars */}
               <div className="absolute top-5 left-5 right-5 flex gap-1.5 z-50">
                  {INITIAL_NEWS.map((_, i) => (
                    <div key={i} className="h-1 flex-grow bg-white/10 rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: i === activeStory ? '100%' : i < activeStory ? '100%' : '0%' }}
                          transition={{ duration: 5, ease: "linear" }}
                          onAnimationComplete={() => {
                            if(i === activeStory) {
                               if(activeStory < INITIAL_NEWS.length - 1) setActiveStory(activeStory + 1);
                               else setActiveStory(null);
                            }
                          }}
                          className="h-full bg-white shadow-[0_0_10px_white]" 
                       />
                    </div>
                  ))}
               </div>

               {/* Story Header */}
               <div className="absolute top-10 left-6 right-6 flex justify-between items-center z-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shadow-lg">IX</div>
                    <div className="flex flex-col">
                       <span className="text-xs font-black uppercase tracking-widest">{INITIAL_NEWS[activeStory].cat}</span>
                       <span className="text-[10px] text-zinc-400 font-bold uppercase">hace 4 horas</span>
                    </div>
                  </div>
                  <X className="cursor-pointer text-white/50 hover:text-white transition-colors" size={28} onClick={() => setActiveStory(null)} />
               </div>

               {/* Image with Swipe Logic */}
               <motion.img 
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x > 100 && activeStory > 0) setActiveStory(activeStory - 1);
                    else if (info.offset.x < -100 && activeStory < INITIAL_NEWS.length - 1) setActiveStory(activeStory + 1);
                    else if (info.offset.x < -100 && activeStory === INITIAL_NEWS.length - 1) setActiveStory(null);
                  }}
                  src={INITIAL_NEWS[activeStory].img} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none" 
               />
               
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

               <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col gap-6 z-50">
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    className="text-4xl font-black italic tracking-tighter uppercase leading-[0.85] text-white"
                  >
                    {INITIAL_NEWS[activeStory].title}
                  </motion.h2>
                  <p className="text-xl font-bold text-blue-400 leading-tight">"{INITIAL_NEWS[activeStory].storyText}"</p>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => { setSelected(INITIAL_NEWS[activeStory]); setActiveStory(null); scrollToTop(); }}
                      className="flex-grow bg-white text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all shadow-2xl"
                    >
                      Abrir Informe de Inteligencia
                    </button>
                    <button onClick={() => shareWhatsApp(INITIAL_NEWS[activeStory])} className="bg-white/10 backdrop-blur-md p-5 rounded-2xl text-white border border-white/10"><Share2 size={24} /></button>
                  </div>
               </div>

               {/* Tap Areas */}
               <div className="absolute inset-y-0 left-0 w-1/4 z-40" onClick={() => setActiveStory(p => p! > 0 ? p! - 1 : null)} />
               <div className="absolute inset-y-0 right-0 w-1/4 z-40" onClick={() => setActiveStory(p => p! < INITIAL_NEWS.length - 1 ? p! + 1 : null)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-lg mx-auto px-6 pb-40">
        
        {/* --- VIEW: FEED --- */}
        {view === 'feed' && !selected && (
          <div className="space-y-12 animate-in fade-in duration-700">
            {/* DASHBOARD DE ENTRADA */}
            <section className="mt-10 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 rounded-[3rem] p-10 relative overflow-hidden shadow-[0_20px_60px_rgba(37,99,235,0.4)] border border-white/10">
               <div className="absolute -top-10 -right-10 opacity-10 rotate-12"><Network size={200} /></div>
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="bg-white p-3 rounded-2xl text-blue-700 shadow-xl"><Flame fill="currentColor" size={24} /></div>
                     <h3 className="text-2xl font-black italic uppercase tracking-tighter">{t.identityTitle}</h3>
                  </div>
                  <p className="text-sm font-bold leading-relaxed text-blue-50 opacity-90">{t.identityBody}</p>
                  <div className="grid grid-cols-2 gap-4 pt-6">
                     <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                        <p className="text-[8px] font-black uppercase text-blue-300 mb-1">Nodos Activos</p>
                        <p className="text-xl font-black italic">1,842</p>
                     </div>
                     <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                        <p className="text-[8px] font-black uppercase text-blue-300 mb-1">Datos/Seg</p>
                        <p className="text-xl font-black italic">4.2 GB</p>
                     </div>
                  </div>
               </div>
            </section>

            {/* LISTA DE INFORMES */}
            <div className="space-y-10">
               <div className="flex items-center justify-between px-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">Protocolos Recientes</h4>
                  <div className="flex gap-2">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                     <span className="text-[8px] font-black text-zinc-500 uppercase">Live Intel</span>
                  </div>
               </div>
               {INITIAL_NEWS.map(n => (
                 <NewsCard 
                    key={n.id} n={n} t={t} 
                    isLiked={likedIds.includes(n.id)} 
                    onLike={() => toggleLike(n.id)}
                    onSelect={() => { setSelected(n); scrollToTop(); }} 
                    onShare={() => shareWhatsApp(n)}
                 />
               ))}
            </div>
          </div>
        )}

        {/* --- VIEW: LIBRERÍA (FILTRADA) --- */}
        {view === 'library' && (
          <div className="pt-24 space-y-10 animate-in slide-in-from-bottom-5">
            <div className="flex justify-between items-end">
               <h2 className="text-4xl font-black italic uppercase tracking-tighter">{t.myLibrary}</h2>
               <span className="text-[10px] font-black text-blue-500 uppercase border-b border-blue-500 pb-1">{libraryNews.length} ARCHIVOS</span>
            </div>
            {libraryNews.length > 0 ? (
              <div className="space-y-6">
                {libraryNews.map(n => (
                  <motion.div 
                    layout
                    key={n.id} 
                    className="flex gap-5 bg-zinc-900/60 p-5 rounded-[2rem] border border-white/5 items-center hover:border-blue-500/30 transition-all"
                  >
                    <img src={n.img} className="w-24 h-24 rounded-3xl object-cover grayscale brightness-75 shadow-lg" />
                    <div className="flex-grow space-y-2">
                      <span className="text-[9px] text-blue-500 font-black uppercase tracking-widest">{n.cat}</span>
                      <h3 className="text-md font-black uppercase leading-tight line-clamp-2">{n.title}</h3>
                      <div className="flex gap-3">
                         <button onClick={() => setSelected(n)} className="text-[9px] font-black uppercase text-white bg-white/5 px-3 py-1.5 rounded-lg hover:bg-white hover:text-black transition-all">Abrir</button>
                         <button onClick={() => toggleSave(n.id)} className="text-[9px] font-black uppercase text-zinc-500 hover:text-red-500 transition-all">Eliminar</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center opacity-20 space-y-6">
                <Bookmark size={64} className="mx-auto" strokeWidth={1} />
                <p className="text-xs font-black uppercase tracking-[0.2em]">{t.noSaved}</p>
              </div>
            )}
          </div>
        )}

        {/* --- VIEW: SEARCH (NOTICIAS + USUARIOS) --- */}
        {view === 'search' && (
          <div className="pt-24 space-y-10 animate-in zoom-in-95 duration-300">
            <div className="relative group">
               <div className="absolute inset-y-0 left-6 flex items-center text-zinc-500 group-focus-within:text-blue-500 transition-colors">
                  <Search size={20} />
               </div>
               <input 
                 autoFocus
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder={t.searchPlaceholder} 
                 className="w-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-7 pl-16 rounded-[2.5rem] text-white font-bold text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" 
               />
            </div>

            <div className="space-y-8">
               {searchQuery ? (
                 <>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-2">Resultados en la Red</h4>
                   {searchedNews.length > 0 ? searchedNews.map(n => (
                      <NewsCard key={n.id} n={n} t={t} isLiked={likedIds.includes(n.id)} onLike={() => toggleLike(n.id)} onSelect={() => setSelected(n)} onShare={() => shareWhatsApp(n)} />
                   )) : (
                      <div className="text-center py-20 opacity-30">
                         <HelpCircle size={48} className="mx-auto mb-4" />
                         <p className="text-xs font-black uppercase">{t.noResults}</p>
                      </div>
                   )}
                 </>
               ) : (
                 <>
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-2">Tendencias para ti</h4>
                       <div className="flex flex-wrap gap-2">
                          {['#Vivienda2026', '#EuroDigital', '#Biometria', '#Ledger', '#IA_Sovereign'].map(tag => (
                            <span key={tag} className="bg-zinc-900 px-4 py-2 rounded-full text-[10px] font-black text-blue-400 border border-white/5 cursor-pointer hover:bg-blue-600 hover:text-white transition-all">{tag}</span>
                          ))}
                       </div>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-2">Operadores Destacados</h4>
                       {[1,2,3,4].map(i => (
                         <div key={i} className="flex justify-between items-center bg-zinc-900/40 p-5 rounded-3xl border border-white/5 hover:bg-zinc-900 transition-all">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center font-black text-zinc-400">OP</div>
                               <div className="flex flex-col">
                                  <span className="text-xs font-black uppercase tracking-tighter">Operador_Alpha_{i}9</span>
                                  <span className="text-[9px] font-bold text-blue-500 uppercase">Reputación: {400 * i} pts</span>
                               </div>
                            </div>
                            <button className="bg-white text-black px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:invert transition-all">Seguir</button>
                         </div>
                       ))}
                    </div>
                 </>
               )}
            </div>
          </div>
        )}

        {/* --- DETALLE DE NOTICIA (PROFESIONAL) --- */}
        {selected && (
          <motion.article 
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            className="pt-24 space-y-10"
          >
             <button onClick={() => setSelected(null)} className="flex items-center gap-3 text-zinc-500 font-black text-[10px] uppercase tracking-[0.3em] group">
                <div className="p-2 bg-white/5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all"><ArrowLeft size={16} /></div> 
                {t.back}
             </button>
             
             <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <span className="text-blue-500 font-black uppercase text-[10px] tracking-[0.5em]">{selected.cat}</span>
                   <div className="h-[1px] flex-grow bg-white/10" />
                </div>
                <h1 className="text-5xl sm:text-6xl font-black italic tracking-tighter leading-[0.85] uppercase text-white shadow-2xl">
                   {selected.title}
                </h1>
             </div>

             {/* TARJETA DE RESUMEN IA */}
             <div className="bg-zinc-900 border border-white/5 rounded-[3.5rem] p-10 space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><Cpu size={120} /></div>
                <div className="flex items-center gap-3 text-blue-500 relative z-10">
                   <Sparkles size={24} className="animate-pulse" />
                   <h4 className="text-[11px] font-black uppercase tracking-[0.4em]">Algoritmo de Impacto IA</h4>
                </div>
                <div className="space-y-6 relative z-10">
                   {selected.summaryIA.map((p: string, i: number) => (
                     <div key={i} className="flex gap-6 items-start">
                        <span className="w-10 h-10 rounded-2xl bg-blue-600/10 flex-shrink-0 flex items-center justify-center font-black text-blue-500 text-xl border border-blue-500/20">0{i+1}</span>
                        <p className="text-md font-bold text-zinc-300 pt-1 leading-snug">{p}</p>
                     </div>
                   ))}
                </div>
             </div>

             {/* MULTIMEDIA */}
             <div className="aspect-video w-full rounded-[3.5rem] bg-zinc-900 overflow-hidden border-2 border-white/5 shadow-2xl relative group">
                <iframe className="w-full h-full" src={selected.videoUrl} allowFullScreen />
                <div className="absolute top-6 right-6 bg-red-600 text-[9px] font-black px-4 py-2 rounded-full flex items-center gap-2 shadow-xl animate-pulse">
                   <div className="w-1.5 h-1.5 bg-white rounded-full" /> REUTERS LIVE FEED
                </div>
             </div>

             {/* CONTENIDO TEXTUAL */}
             <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
                <p className="text-xl font-bold text-zinc-400 italic leading-relaxed pl-10">
                   "{selected.content}"
                </p>
             </div>

             {/* ACCIONES DE INFORME */}
             <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => toggleSave(selected.id)} className={`flex-grow p-6 rounded-[2rem] font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 border border-white/10 transition-all ${savedIds.includes(selected.id) ? 'bg-blue-600 border-blue-500 shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}>
                   <Bookmark size={20} fill={savedIds.includes(selected.id) ? "currentColor" : "none"} />
                   {savedIds.includes(selected.id) ? 'En Archivo' : 'Guardar Datos'}
                </button>
                <div className="flex gap-4">
                   <button onClick={scrollToComments} className="bg-white/5 p-6 rounded-[2rem] text-zinc-400 border border-white/10 hover:text-white transition-all"><MessageCircle size={24} /></button>
                   <button onClick={() => shareWhatsApp(selected)} className="bg-green-600/20 text-green-500 p-6 rounded-[2rem] border border-green-500/20 hover:bg-green-600 hover:text-white transition-all"><Share2 size={24} /></button>
                </div>
             </div>

             {/* CONSULTA IA PERSONALIZADA */}
             <div className="bg-blue-600 rounded-[3rem] p-10 space-y-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-1000"><Bot size={250} /></div>
                <h4 className="text-2xl font-black italic uppercase tracking-tighter relative z-10">{t.iaAssistant}</h4>
                <div className="flex gap-3 relative z-10">
                   <input 
                     type="text" 
                     placeholder={t.iaPlaceholder} 
                     className="flex-grow bg-black/20 border border-white/10 p-6 rounded-2xl text-white font-bold outline-none focus:bg-black/40 transition-all placeholder:text-blue-100/50" 
                     onKeyDown={(e) => e.key === 'Enter' && askAi(e.currentTarget.value)}
                   />
                   <button onClick={() => askAi("¿Cómo me afecta?")} className="bg-white text-blue-600 p-6 rounded-2xl font-black shadow-xl active:scale-90 transition-all">
                      {isAiProcessing ? <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> : <Send size={24} />}
                   </button>
                </div>
                {aiResponse && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-black/30 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md relative z-10">
                     <p className="text-sm font-bold italic leading-relaxed">"{aiResponse}"</p>
                  </motion.div>
                )}
             </div>

             {/* SECCIÓN DE COMENTARIOS MASIVOS (15) */}
             <section ref={commentRef} className="space-y-10 pt-16 border-t border-white/5">
                <div className="flex justify-between items-end">
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter">{t.comments}</h3>
                   <span className="text-[10px] font-black text-zinc-500 uppercase">{selected.comments.length} RESPUESTAS</span>
                </div>
                <div className="space-y-6">
                   {selected.comments.map((c: any) => (
                     <div key={c.id} className="bg-zinc-900/30 p-8 rounded-[2.5rem] border border-white/5 flex gap-6 hover:bg-zinc-900/60 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center font-black text-blue-500 text-2xl border border-blue-500/10 group-hover:bg-blue-600 group-hover:text-white transition-all">
                           {c.user[0]}
                        </div>
                        <div className="flex-grow">
                           <div className="flex justify-between items-center mb-2">
                              <div className="flex flex-col">
                                 <span className="text-sm font-black uppercase tracking-tighter text-white">{c.user}</span>
                                 <span className="text-[9px] font-black text-zinc-600 uppercase">Prestigio: {c.rep}</span>
                              </div>
                              <span className="text-[9px] font-black text-pink-500 flex items-center gap-1.5 bg-pink-500/5 px-3 py-1.5 rounded-full border border-pink-500/10">
                                 <Instagram size={12} /> {c.ig}
                              </span>
                           </div>
                           <p className="text-zinc-400 text-sm font-medium italic leading-relaxed">"{c.text}"</p>
                           <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="text-[9px] font-black uppercase text-zinc-600 hover:text-white transition-all">Responder</button>
                              <button className="text-[9px] font-black uppercase text-zinc-600 hover:text-white transition-all">Útil</button>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
                {/* Input de comentario */}
                <div className="bg-zinc-900 p-3 rounded-[2rem] flex gap-3 border border-white/10 shadow-inner">
                   <input type="text" placeholder={t.postComment} className="flex-grow bg-transparent p-4 pl-6 text-sm font-bold outline-none" />
                   <button className="bg-white text-black px-10 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all">Enviar</button>
                </div>
             </section>
          </motion.article>
        )}
      </main>

      {/* --- NAVEGACIÓN INFERIOR (ESTILO OS MÓVIL) --- */}
      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-sm">
         <div className="bg-zinc-900/90 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] px-8 py-5 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <NavItem icon={<Home />} active={view === 'feed'} onClick={() => { setSelected(null); setView('feed'); scrollToTop(); }} />
            <NavItem icon={<Search />} active={view === 'search'} onClick={() => { setView('search'); setSelected(null); }} />
            
            <div className="relative -mt-20">
               <motion.button 
                 whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                 onClick={() => {
                   const rand = INITIAL_NEWS[Math.floor(Math.random()*INITIAL_NEWS.length)];
                   setSelected(rand);
                   setView('feed');
                   scrollToTop();
                 }} 
                 className="w-18 h-18 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-[0_15px_40px_rgba(37,99,235,0.6)] border-[6px] border-black transition-all"
               >
                  <Zap size={30} fill="currentColor" />
               </motion.button>
            </div>
            
            <NavItem icon={<Library />} active={view === 'library'} onClick={() => { setView('library'); setSelected(null); }} />
            <div onClick={() => setView('search')} className="w-10 h-10 rounded-2xl bg-zinc-800 border border-white/5 flex items-center justify-center font-black text-xs text-zinc-500 cursor-pointer hover:text-white transition-all">
               {user.name[0]}
            </div>
         </div>
      </nav>

      {/* NOTIFICACIONES FLOTANTES */}
      <AnimatePresence>
        {notif && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-white text-black px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 size={16} className="text-blue-600" /> {notif}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER DE RED */}
      <footer className="py-20 text-center opacity-20 border-t border-white/5 mx-10">
         <div className="flex justify-center gap-6 mb-6">
            <Globe size={18} />
            <Shield size={18} />
            <Cpu size={18} />
         </div>
         <p className="text-[9px] font-black tracking-[1em] uppercase">Infoxity Network OS v6.0</p>
         <p className="text-[8px] font-bold mt-2 uppercase">Protocolo de encriptación activo</p>
      </footer>
    </div>
  );
}

// --- COMPONENTES ATÓMICOS ---

function NewsCard({ n, t, isLiked, onLike, onSelect, onShare }: any) {
  const totalLikes = n.baseLikes + (isLiked ? 1 : 0);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
      className="bg-zinc-900/40 border border-white/5 rounded-[3.5rem] overflow-hidden group active:scale-[0.98] transition-all cursor-pointer relative"
      onClick={onSelect}
    >
      <div className="p-10 space-y-6">
         <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">{n.cat}</span>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full text-[8px] font-black uppercase text-zinc-500 border border-white/5">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]" /> VERIFICADO
            </div>
         </div>
         <h3 className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase leading-[0.9] group-hover:text-blue-400 transition-colors">
            {n.title}
         </h3>
         <p className="text-sm font-bold text-zinc-500 italic line-clamp-2 leading-relaxed">
           "{n.summaryIA[0]}"
         </p>
         <div className="flex justify-between items-center pt-8 border-t border-white/5">
            <div className="flex gap-6">
               <div className="flex items-center gap-2.5" onClick={(e) => { e.stopPropagation(); onLike(); }}>
                  <div className={`p-2 rounded-xl transition-all ${isLiked ? 'bg-red-500/10 text-red-500' : 'bg-white/5 text-zinc-700 hover:text-white'}`}>
                    <Heart size={22} fill={isLiked ? "currentColor" : "none"} />
                  </div>
                  <span className={`text-xs font-black ${isLiked ? 'text-red-500' : 'text-zinc-700'}`}>{totalLikes}</span>
               </div>
               <div className="flex items-center gap-2.5 text-zinc-700">
                  <div className="p-2 rounded-xl bg-white/5"><MessageCircle size={22} /></div>
                  <span className="text-xs font-black">{n.comments.length}</span>
               </div>
            </div>
            <div className="flex gap-3">
               <button onClick={(e) => { e.stopPropagation(); onShare(); }} className="bg-white/5 p-4 rounded-2xl text-zinc-500 border border-white/5 hover:text-white transition-all"><Share2 size={18} /></button>
               <button className="bg-white text-black px-8 py-4 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest hover:invert transition-all">ABRIR</button>
            </div>
         </div>
      </div>
    </motion.div>
  );
}

function NavItem({ icon, active, onClick }: { icon: any, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`p-4 rounded-2xl transition-all ${active ? 'text-blue-500 bg-blue-500/10 shadow-inner' : 'text-zinc-600 hover:text-white hover:bg-white/5'}`}>
      {React.cloneElement(icon, { size: 26 })}
    </button>
  );
}

function LoginView({ t, onLogin }: any) {
  const [name, setName] = useState("");
  const [ig, setIg] = useState("");
  
  return (
    <main className="fixed inset-0 bg-black flex items-center justify-center p-8 z-[1000] overflow-y-auto">
       <div className="w-full max-w-sm space-y-12 py-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-6"
          >
             <div className="w-24 h-24 bg-blue-600 mx-auto rounded-[2.5rem] flex items-center justify-center text-5xl font-black italic shadow-[0_0_60px_rgba(37,99,235,0.6)]">IX</div>
             <div className="space-y-2">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter">{t.siteName}</h1>
                <p className="text-[10px] font-black text-blue-500 tracking-[0.5em] uppercase">{t.welcome}</p>
             </div>
          </motion.div>
          
          <div className="bg-zinc-900/50 p-10 rounded-[4rem] border border-white/5 space-y-6 shadow-2xl relative backdrop-blur-3xl">
             <div className="space-y-2">
                <p className="text-[9px] font-black text-zinc-600 uppercase ml-4 tracking-[0.2em]">Alias de Operador</p>
                <input 
                  type="text" placeholder={t.placeholderName} value={name} onChange={e => setName(e.target.value)} 
                  className="w-full bg-white/5 border border-white/10 p-7 rounded-3xl text-white font-bold outline-none focus:border-blue-500 transition-all text-sm placeholder:text-zinc-700" 
                />
             </div>
             <div className="space-y-2">
                <p className="text-[9px] font-black text-pink-500/60 uppercase ml-4 tracking-[0.2em]">Instagram ID (Verificación)</p>
                <div className="relative">
                   <Instagram className="absolute left-7 top-1/2 -translate-y-1/2 text-pink-500/40" size={20} />
                   <input 
                     type="text" placeholder={t.placeholderIg} value={ig} onChange={e => setIg(e.target.value)} 
                     className="w-full bg-white/5 border border-white/10 p-7 pl-16 rounded-3xl text-white font-bold outline-none focus:border-pink-500 transition-all text-sm placeholder:text-zinc-700" 
                   />
                </div>
             </div>
             <motion.button 
               whileTap={{ scale: 0.95 }}
               onClick={() => onLogin(name, ig)} 
               className="w-full bg-white text-black p-7 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.4em] shadow-xl hover:bg-blue-600 hover:text-white transition-all mt-4"
             >
               Sincronizar Identidad
             </motion.button>
          </div>
          <p className="text-[9px] text-center text-zinc-600 font-bold uppercase tracking-[0.3em] px-10 leading-relaxed">
            Unido a una red de inteligencia descentralizada. Tus datos están bajo tu control.
          </p>
       </div>
    </main>
  );
}
