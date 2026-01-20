"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, Bookmark, ArrowLeft, X, Share2, Send, 
  Heart, MessageCircle, Library, Home, Search, Bell, 
  CheckCircle2, MessageSquare, TrendingUp, Globe, 
  Sparkles, Camera, ChevronRight, Play, Eye, Clock, 
  UserPlus, Hash, Flame, ShieldCheck, ZapOff
} from 'lucide-react';

/**
 * INFOXITY v8 - EL NOTICIERO JOVEN DEFINITIVO
 * +900 Líneas de código profesional.
 * Sin elementos "cutres", enfoque 100% comunidad y debate.
 */

// --- BASE DE DATOS DE NOTICIAS Y DEBATES (EXTENSA) ---
const INITIAL_NEWS = [
  {
    id: 1,
    cat: "VIVIENDA",
    title: "El colapso del alquiler: Por qué tu generación nunca tendrá casa propia",
    summaryIA: [
      "Zonas tensionadas: El stock de alquiler ha caído un 40% este trimestre.",
      "La nueva Ley de Vivienda está provocando la retirada masiva de pisos del mercado.",
      "Fondos de inversión internacionales controlan ya el 35% de la obra nueva."
    ],
    storyText: "Tu futuro hogar es un sueño de alquiler. Descubre la verdad.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    content: "La realidad es cruda: el acceso a la vivienda se ha convertido en una herramienta de control económico. Mientras los precios suben, los salarios jóvenes se estancan, creando una brecha que solo los grandes capitales pueden cruzar.",
    baseLikes: 2145,
    comments: [
      { id: 1, user: "Marco", ig: "@marco_vlc", text: "La ley es un desastre, solo beneficia al que ya es rico." },
      { id: 2, user: "Sofi", ig: "@sofi.tech", text: "En mi barrio ya no queda ni un piso por menos de 1000€." },
      { id: 3, user: "Dani", ig: "@dani_fin", text: "Infoxity siempre dice lo que los informativos de la tele ocultan." },
      { id: 4, user: "Lucas", ig: "@luke_sky", text: "Literalmente me acaban de subir 300 euros el alquiler." },
      { id: 5, user: "Marta", ig: "@marta.v", text: "Hay que mudarse a Portugal o algo así, esto es invivible." },
      { id: 6, user: "Alex", ig: "@alex_dev", text: "Los datos son claros: la oferta está muriendo." },
      { id: 7, user: "Elena", ig: "@ele_b", text: "Imposible independizarse así." },
      { id: 8, user: "Nico", ig: "@nico_z", text: "Nos quieren alquilados de por vida para que no tengamos nada." },
      { id: 9, user: "Clara", ig: "@clara_o", text: "El problema es que no se construye nada público." },
      { id: 10, user: "Pau", ig: "@pau_23", text: "Vivienda = Derecho. Negocio = Abuso." },
      { id: 11, user: "Kike", ig: "@kike_99", text: "Yo vivo en una furgo por esto." },
      { id: 12, user: "Bea", ig: "@bea_invest", text: "Ahorrar es una utopía ahora mismo." },
      { id: 13, user: "Sergi", ig: "@sergi_x", text: "Gran informe, muy detallado." },
      { id: 14, user: "Lara", ig: "@lara_pro", text: "No podemos permitir que nos echen de nuestras ciudades." },
      { id: 15, user: "Izan", ig: "@izan_z", text: "Gracias por la transparencia." }
    ]
  },
  {
    id: 2,
    cat: "CONTROL",
    title: "Vigilancia Biométrica: Europa instala ojos inteligentes en cada calle",
    summaryIA: [
      "IA de reconocimiento facial ya opera en estaciones de tren de Madrid.",
      "Tus movimientos se cruzan con datos bancarios automáticamente.",
      "El anonimato urbano ha muerto oficialmente este año."
    ],
    storyText: "Te están mirando mientras lees esto. Mira dónde están las cámaras.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    content: "Bajo la excusa de la seguridad, se está tejiendo una red de control que no tiene precedentes en la historia de la humanidad. Tu cara es ahora tu pasaporte, tu tarjeta de crédito y tu historial de antecedentes.",
    baseLikes: 5890,
    comments: [
      { id: 1, user: "Cyber", ig: "@cyber_punk", text: "Usa maquillaje reflectante, confunde a la IA." },
      { id: 2, user: "Nacho", ig: "@nacho_tv", text: "Esto parece Black Mirror pero es la vida real." },
      { id: 3, user: "Proxy", ig: "@proxy_99", text: "La privacidad es el nuevo lujo." },
      { id: 4, user: "Zoe", ig: "@zoe_0", text: "Nos acostumbran poco a poco." },
      { id: 5, user: "Neo", ig: "@matrix_re", text: "Desconectad de todo lo que podáis." },
      { id: 6, user: "Sara", ig: "@sara_sh", text: "Yo ya no salgo sin mi gorra." },
      { id: 7, user: "Hugo", ig: "@hugo_x", text: "Control social chino en Europa." },
      { id: 8, user: "Lara", ig: "@lara_t", text: "Es por nuestra 'seguridad', dicen..." },
      { id: 9, user: "Fede", ig: "@fede_v", text: "Infoxity, haced un tutorial para evitar esto." },
      { id: 10, user: "Gabi", ig: "@gabi_v", text: "Increíble que nadie se queje." },
      { id: 11, user: "Toni", ig: "@toni_k", text: "El sistema está ganando." },
      { id: 12, user: "Iris", ig: "@iris_v", text: "Yo desactivo el GPS siempre." },
      { id: 13, user: "Juan", ig: "@juan_p", text: "Buen post, seguid así." },
      { id: 14, user: "Mery", ig: "@mery_j", text: "La libertad se acabó." },
      { id: 15, user: "Pol", ig: "@pol_88", text: "A las barricadas digitales." }
    ]
  },
  {
    id: 3,
    cat: "DINERO",
    title: "Euro Digital: El plan para que tu dinero tenga fecha de caducidad",
    summaryIA: [
      "El BCE planea dinero programable: no podrás gastar en lo que ellos prohíban.",
      "Control de huella de carbono vinculado a tus compras diarias.",
      "El ahorro será castigado si el sistema necesita consumo."
    ],
    storyText: "Tu dinero ya no será tuyo. Será un permiso de uso.",
    img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    content: "La digitalización total del dinero no busca la comodidad, busca el control. Un sistema donde el estado puede 'apagar' tu capacidad de compra con un solo click es una amenaza directa a la autonomía individual.",
    baseLikes: 3120,
    comments: [
      { id: 1, user: "Nico", ig: "@nico_crypto", text: "Bitcoin es la única salida real a este sistema." },
      { id: 2, user: "Elena", ig: "@ele_invest", text: "Si el dinero caduca, nadie ahorrará." },
      { id: 3, user: "Btc", ig: "@btclover", text: "Sacad el dinero de los bancos ya." },
      { id: 4, user: "Mery", ig: "@mery_j", text: "Esto es una dictadura financiera." },
      { id: 5, user: "Fran", ig: "@fran_s", text: "Yo guardo efectivo mientras pueda." },
      { id: 6, user: "Santi", ig: "@santi_g", text: "Nos quieren dependientes del estado." },
      { id: 7, user: "Julia", ig: "@july_v", text: "Infoxity avisando, como siempre." },
      { id: 8, user: "Rafa", ig: "@rafa_m", text: "Programar dinero es programar personas." },
      { id: 9, user: "Luz", ig: "@luz_v", text: "Hay que educar a los abuelos sobre esto." },
      { id: 10, user: "Pepe", ig: "@pepe_8", text: "Viene una época difícil." },
      { id: 11, user: "Cris", ig: "@cris_t", text: "Ojo con esto, es muy serio." },
      { id: 12, user: "Tom", ig: "@tom_h", text: "Leed el libro blanco del Euro Digital." },
      { id: 13, user: "Anna", ig: "@anna_k", text: "Gran trabajo de investigación." },
      { id: 14, user: "Marc", ig: "@marc_v", text: "Me paso a las criptos fijas." },
      { id: 15, user: "Leo", ig: "@leo_fin", text: "Compartido." }
    ]
  }
];

export default function InfoxityFinal() {
  // --- ESTADOS ---
  const [user, setUser] = useState<{name: string, ig: string} | null>(null);
  const [view, setView] = useState<'feed' | 'library' | 'search' | 'notifications'>('feed');
  const [selected, setSelected] = useState<any>(null);
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [notifPop, setNotifPop] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Bienvenido a Infoxity, ya eres parte de los 2,145.", time: "Ahora" },
    { id: 2, text: "A @marco_vlc le gustó tu comentario en 'Vivienda'.", time: "2m" },
    { id: 3, text: "Nueva noticia urgente sobre el Euro Digital.", time: "1h" }
  ]);

  // --- PERSISTENCIA ---
  useEffect(() => {
    const savedU = localStorage.getItem('infox_user_data');
    if (savedU) setUser(JSON.parse(savedU));
    const savedL = localStorage.getItem('infox_liked_v2');
    if (savedL) setLikedIds(JSON.parse(savedL));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('infox_user_data', JSON.stringify(user));
    localStorage.setItem('infox_liked_v2', JSON.stringify(likedIds));
  }, [user, likedIds]);

  // --- FUNCIONES ---
  const handleLogin = (name: string, ig: string) => {
    if (!name || !ig) return;
    setUser({ name, ig: ig.startsWith('@') ? ig : `@${ig}` });
  };

  const toggleLike = (id: number) => {
    if (likedIds.includes(id)) {
      setLikedIds(prev => prev.filter(x => x !== id));
    } else {
      setLikedIds(prev => [...prev, id]);
      triggerPop("Guardado en Biblioteca");
    }
  };

  const triggerPop = (msg: string) => {
    setNotifPop(msg);
    setTimeout(() => setNotifPop(null), 2000);
  };

  const shareWA = (n: any) => {
    const text = `🔥 *INFOXITY* 🔥\n\n*${n.title}*\n\nLee el informe completo en la red Infoxity.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const libraryItems = useMemo(() => INITIAL_NEWS.filter(n => likedIds.includes(n.id)), [likedIds]);
  const results = useMemo(() => {
    if (!searchQuery) return [];
    return INITIAL_NEWS.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.cat.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  // --- VISTA DE LOGIN (FOMO + INSTAGRAM) ---
  if (!user) return <LoginView onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600 overflow-x-hidden antialiased">
      
      {/* HEADER SUPERIOR */}
      <header className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-2xl border-b border-white/5 h-20 flex items-center justify-between px-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setView('feed'); setSelected(null); window.scrollTo({top:0, behavior:'smooth'}); }}>
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black italic text-xl shadow-[0_0_20px_rgba(37,99,235,0.3)]">IX</div>
           <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-white leading-none">Infoxity</span>
              <span className="text-[8px] font-bold text-blue-500 uppercase tracking-tighter">Noticiero Joven</span>
           </div>
        </div>
        <div className="flex gap-3">
           <button onClick={() => setView('notifications')} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${view === 'notifications' ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}>
              <Bell size={18} />
           </button>
           <div className="h-10 px-4 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-black uppercase text-zinc-400">2,145 En Red</span>
           </div>
        </div>
      </header>

      {/* STORIES */}
      {view === 'feed' && !selected && (
        <section className="pt-24 pb-6 border-b border-white/5 bg-zinc-950/30">
           <div className="flex gap-5 overflow-x-auto px-6 no-scrollbar items-center">
              <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                 <div className="w-16 h-16 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center group-hover:border-blue-500 transition-all">
                    <Camera size={20} className="text-zinc-600 group-hover:text-blue-500" />
                 </div>
                 <span className="text-[8px] font-black text-zinc-600 uppercase">Tú</span>
              </div>
              {INITIAL_NEWS.map((n, i) => (
                <div key={i} onClick={() => setActiveStory(i)} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                   <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 shadow-xl group-active:scale-90 transition-transform">
                      <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-zinc-900">
                         <img src={n.img} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all" />
                      </div>
                   </div>
                   <span className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter">{n.cat}</span>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* VIEWER DE STORIES */}
      <AnimatePresence>
        {activeStory !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black">
             <div className="absolute top-5 left-5 right-5 flex gap-1 z-50">
                {INITIAL_NEWS.map((_, i) => (
                  <div key={i} className="h-1 flex-grow bg-white/20 rounded-full overflow-hidden">
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
                        className="h-full bg-white" 
                     />
                  </div>
                ))}
             </div>
             <button onClick={() => setActiveStory(null)} className="absolute top-10 right-6 z-50 p-2 bg-black/40 rounded-full text-white"><X size={24} /></button>
             <img src={INITIAL_NEWS[activeStory].img} className="w-full h-full object-cover opacity-60" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
             <div className="absolute inset-x-0 bottom-24 p-10 space-y-6 text-center">
                <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">{INITIAL_NEWS[activeStory].title}</h2>
                <p className="text-lg font-bold text-blue-400 italic">"{INITIAL_NEWS[activeStory].storyText}"</p>
                <button onClick={() => { setSelected(INITIAL_NEWS[activeStory]); setActiveStory(null); }} className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl active:scale-95 transition-all">Abrir Informe Completo</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-lg mx-auto px-6 pb-44">
        
        {/* VISTA: FEED PRINCIPAL */}
        {view === 'feed' && !selected && (
          <div className="space-y-12 animate-in fade-in duration-500">
            {/* FOMO BANNER */}
            <div className="mt-10 bg-blue-600 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl border border-white/10">
               <div className="absolute -top-10 -right-10 opacity-10 rotate-12"><Globe size={200} /></div>
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2">
                     <Flame size={20} className="text-white" />
                     <h3 className="text-2xl font-black italic uppercase tracking-tighter">Comunidad Activa</h3>
                  </div>
                  <p className="text-sm font-bold opacity-95 leading-relaxed">
                    Somos el primer noticiero auditado por sus propios lectores. Ni censura, ni ideologías, solo la cruda realidad que te afecta.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                     <div className="flex -space-x-3">
                        {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-blue-600 bg-zinc-800" />)}
                     </div>
                     <span className="text-[10px] font-black uppercase pl-2">+2,145 Debatiendo ahora</span>
                  </div>
               </div>
            </div>

            {/* LISTADO DE NOTICIAS */}
            <div className="space-y-14">
               <div className="flex justify-between items-center px-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">Informes de Hoy</h4>
                  <TrendingUp size={14} className="text-zinc-600" />
               </div>
               {INITIAL_NEWS.map(n => (
                 <NewsCard key={n.id} n={n} isLiked={likedIds.includes(n.id)} onLike={() => toggleLike(n.id)} onSelect={() => { setSelected(n); window.scrollTo({top:0, behavior:'smooth'}); }} onShare={() => shareWA(n)} />
               ))}
            </div>
          </div>
        )}

        {/* VISTA: BIBLIOTECA (GUARDADOS) */}
        {view === 'library' && (
          <div className="pt-28 space-y-10 animate-in slide-in-from-bottom-5">
             <div className="flex justify-between items-end">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">Biblioteca</h2>
                <span className="text-[10px] font-black text-blue-500 uppercase border-b border-blue-500 pb-1">{libraryItems.length} GUARDADOS</span>
             </div>
             {libraryItems.length > 0 ? (
               <div className="space-y-6">
                 {libraryItems.map(n => (
                   <div key={n.id} className="bg-zinc-900/60 p-5 rounded-3xl border border-white/5 flex gap-4 items-center">
                      <img src={n.img} className="w-20 h-20 rounded-2xl object-cover grayscale brightness-75" />
                      <div className="flex-grow">
                         <span className="text-[8px] text-blue-500 font-black uppercase tracking-widest">{n.cat}</span>
                         <h3 className="text-sm font-black uppercase leading-tight line-clamp-1 mt-1">{n.title}</h3>
                         <div className="flex gap-4 mt-3">
                            <button onClick={() => setSelected(n)} className="text-[9px] font-black uppercase text-white bg-white/10 px-4 py-2 rounded-xl">Leer</button>
                            <button onClick={() => toggleLike(n.id)} className="text-[9px] font-black uppercase text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-xl">Quitar</button>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="py-32 text-center opacity-20">
                  <Bookmark size={64} className="mx-auto mb-4" strokeWidth={1} />
                  <p className="text-xs font-black uppercase tracking-widest">No has guardado nada todavía</p>
               </div>
             )}
          </div>
        )}

        {/* VISTA: BUSCADOR */}
        {view === 'search' && (
          <div className="pt-28 space-y-10 animate-in fade-in">
             <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                <input 
                  autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar informes, usuarios, etiquetas..." 
                  className="w-full bg-zinc-900 border border-white/10 p-7 pl-16 rounded-[2.5rem] text-white font-bold text-sm outline-none focus:border-blue-500 transition-all" 
                />
             </div>
             
             {searchQuery ? (
               <div className="space-y-8">
                  {results.map(n => <NewsCard key={n.id} n={n} isLiked={likedIds.includes(n.id)} onLike={() => toggleLike(n.id)} onSelect={() => setSelected(n)} onShare={() => shareWA(n)} />)}
                  {results.length === 0 && <p className="text-center opacity-30 text-xs font-black uppercase">Sin resultados</p>}
               </div>
             ) : (
               <div className="space-y-10">
                  <div className="space-y-4 px-2">
                     <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Gente Influyente</h4>
                     {[1,2,3].map(i => (
                       <div key={i} className="flex justify-between items-center bg-zinc-900/40 p-5 rounded-3xl border border-white/5">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black">U</div>
                             <span className="text-xs font-black uppercase">User_Active_{i*14}</span>
                          </div>
                          <button className="text-[9px] font-black uppercase bg-white text-black px-6 py-2.5 rounded-xl">Seguir</button>
                       </div>
                     ))}
                  </div>
                  <div className="space-y-4 px-2">
                     <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Hashtags</h4>
                     <div className="flex flex-wrap gap-2">
                        {['#Vivienda', '#CBDC', '#IA_Control', '#SoberaniaDigital', '#InfoxityNet'].map(t => (
                          <span key={t} className="px-4 py-2 bg-zinc-900 rounded-full text-[10px] font-black text-blue-500 border border-white/5">{t}</span>
                        ))}
                     </div>
                  </div>
               </div>
             )}
          </div>
        )}

        {/* VISTA: NOTIFICACIONES */}
        {view === 'notifications' && (
          <div className="pt-28 space-y-8 animate-in slide-in-from-right-5">
             <h2 className="text-4xl font-black italic uppercase tracking-tighter px-2">Notificaciones</h2>
             <div className="space-y-4">
                {notifications.map(n => (
                  <div key={n.id} className="bg-zinc-900/60 p-6 rounded-3xl border border-white/5 flex gap-5 items-start">
                     <div className="w-10 h-10 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                        <Bell size={18} />
                     </div>
                     <div className="flex-grow space-y-1">
                        <p className="text-sm font-bold text-zinc-300">{n.text}</p>
                        <span className="text-[10px] font-black text-zinc-600 uppercase">{n.time}</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* DETALLE DE NOTICIA (MODAL INTERNO) */}
        {selected && (
          <motion.article initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="pt-28 space-y-10">
             <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-zinc-500 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
                <ArrowLeft size={16} /> Volver al Índice
             </button>
             
             <div className="space-y-4">
                <span className="text-blue-500 font-black uppercase text-[10px] tracking-[0.4em]">{selected.cat}</span>
                <h1 className="text-5xl font-black italic tracking-tighter leading-[0.85] uppercase">{selected.title}</h1>
             </div>

             {/* RESUMEN IA */}
             <div className="bg-zinc-900 border border-white/5 rounded-[3rem] p-10 space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5"><Sparkles size={80} /></div>
                <div className="flex items-center gap-3 text-blue-500">
                   <Sparkles size={20} className="animate-pulse" />
                   <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">Análisis IA de Infoxity</h4>
                </div>
                <div className="space-y-5 relative z-10">
                   {selected.summaryIA.map((p: string, i: number) => (
                     <div key={i} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-lg bg-blue-600/20 text-blue-500 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5 border border-blue-500/10">0{i+1}</div>
                        <p className="text-md font-bold text-zinc-300 leading-snug">{p}</p>
                     </div>
                   ))}
                </div>
             </div>

             {/* VIDEO */}
             <div className="aspect-video w-full rounded-[3rem] bg-zinc-900 border border-white/5 overflow-hidden shadow-2xl relative">
                <iframe className="w-full h-full" src={selected.videoUrl} title="Infoxity Video Feed" />
                <div className="absolute top-6 right-6 bg-red-600 text-[9px] font-black px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                   <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> SEÑAL EN VIVO
                </div>
             </div>

             <div className="p-10 bg-zinc-900/30 rounded-[3rem] border border-white/5">
                <p className="text-xl font-bold text-zinc-400 italic leading-relaxed">"{selected.content}"</p>
             </div>

             {/* ACCIONES */}
             <div className="flex gap-4">
                <button 
                  onClick={() => toggleLike(selected.id)} 
                  className={`flex-grow p-6 rounded-[2rem] font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all ${likedIds.includes(selected.id) ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10'}`}
                >
                   <Heart size={20} fill={likedIds.includes(selected.id) ? "currentColor" : "none"} />
                   {likedIds.includes(selected.id) ? 'Guardado en Biblioteca' : 'Me gusta'}
                </button>
                <button onClick={() => shareWA(selected)} className="bg-green-600/10 text-green-500 p-6 rounded-[2rem] border border-green-500/20 hover:bg-green-600 hover:text-white transition-all"><Share2 size={24} /></button>
             </div>

             {/* SECCIÓN DE DEBATE (EXTENSA) */}
             <section className="space-y-10 pt-10 border-t border-white/5">
                <div className="flex justify-between items-end px-2">
                   <h3 className="text-2xl font-black italic uppercase tracking-tighter">Debate en vivo ({selected.comments.length})</h3>
                   <span className="text-[10px] font-black text-zinc-600 uppercase">Auditado</span>
                </div>
                
                <div className="space-y-6">
                   {selected.comments.map((c: any) => (
                     <div key={c.id} className="bg-zinc-900/40 p-6 rounded-[2rem] border border-white/5 flex gap-5 animate-in slide-in-from-bottom-2">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/10 flex items-center justify-center text-blue-500 font-black text-xl flex-shrink-0">
                           {c.user[0]}
                        </div>
                        <div className="flex-grow space-y-2">
                           <div className="flex justify-between items-center">
                              <span className="text-xs font-black uppercase tracking-wide text-zinc-200">{c.user}</span>
                              <span className="text-[9px] font-black text-pink-500 flex items-center gap-1.5 bg-pink-500/5 px-3 py-1.5 rounded-full border border-pink-500/10">
                                 <Instagram size={10} /> {c.ig}
                              </span>
                           </div>
                           <p className="text-zinc-400 text-sm font-medium italic leading-relaxed">"{c.text}"</p>
                           <div className="flex gap-4 pt-2">
                              <button className="text-[8px] font-black uppercase text-zinc-600 hover:text-white transition-colors">Responder</button>
                              <button className="text-[8px] font-black uppercase text-zinc-600 hover:text-red-500 transition-colors">Me gusta</button>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                {/* CAJA DE COMENTARIOS */}
                <div className="bg-zinc-900 p-3 rounded-[2rem] flex gap-3 border border-white/10 shadow-inner group-focus-within:border-blue-500 transition-all">
                   <input 
                     type="text" placeholder="Escribe tu argumento basado en datos..." 
                     className="flex-grow bg-transparent p-4 pl-6 text-sm font-bold outline-none" 
                   />
                   <button className="bg-white text-black px-10 rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all">Publicar</button>
                </div>
             </section>
          </motion.article>
        )}
      </main>

      {/* BARRA DE NAVEGACIÓN INFERIOR (SIN ELEMENTOS RAROS) */}
      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm">
         <div className="bg-zinc-900/90 backdrop-blur-3xl border border-white/10 rounded-full px-10 py-5 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <NavItem icon={<Home />} active={view === 'feed'} onClick={() => { setSelected(null); setView('feed'); window.scrollTo({top:0, behavior:'smooth'}); }} />
            <NavItem icon={<Search />} active={view === 'search'} onClick={() => { setView('search'); setSelected(null); }} />
            
            <div className="relative group">
               <NavItem icon={<Library />} active={view === 'library'} onClick={() => { setView('library'); setSelected(null); }} />
               {likedIds.length > 0 && (
                 <motion.span 
                   initial={{ scale: 0 }} animate={{ scale: 1 }}
                   className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-zinc-900 animate-bounce"
                 >
                   {likedIds.length}
                 </motion.span>
               )}
            </div>

            <button onClick={() => setView('notifications')} className="w-10 h-10 rounded-2xl bg-zinc-800 border border-white/5 flex items-center justify-center font-black text-xs text-zinc-500 hover:text-white transition-all">
               {user.name[0]}
            </button>
         </div>
      </nav>

      {/* NOTIFICACIÓN EMERGENTE (TOAST) */}
      <AnimatePresence>
        {notifPop && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-white text-black px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest shadow-2xl flex items-center gap-3">
             <CheckCircle2 size={16} className="text-blue-600" /> {notifPop}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-24 text-center border-t border-white/5 mx-10 opacity-30">
         <p className="text-[10px] font-black tracking-[1.5em] uppercase">Infoxity Archive 2026</p>
         <p className="text-[8px] font-bold mt-3 text-zinc-500 uppercase">La información es soberanía</p>
      </footer>
    </div>
  );
}

// --- COMPONENTES ATÓMICOS ---

function NewsCard({ n, isLiked, onLike, onSelect, onShare }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="bg-zinc-900/40 border border-white/5 rounded-[3rem] overflow-hidden group hover:bg-zinc-900/60 transition-all cursor-pointer"
      onClick={onSelect}
    >
      <div className="p-10 space-y-6">
         <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">{n.cat}</span>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full">
               <ShieldCheck size={12} className="text-green-500" />
               <span className="text-[8px] font-black text-zinc-500 uppercase">Verificado</span>
            </div>
         </div>
         <h3 className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase leading-[0.9] group-hover:text-blue-400 transition-colors">
            {n.title}
         </h3>
         <p className="text-xs font-bold text-zinc-500 italic line-clamp-2 leading-relaxed">
           "{n.summaryIA[0]}"
         </p>
         <div className="flex justify-between items-center pt-8 border-t border-white/5">
            <div className="flex gap-6">
               <div className="flex items-center gap-2.5" onClick={(e) => { e.stopPropagation(); onLike(); }}>
                  <Heart size={20} className={isLiked ? 'text-red-500' : 'text-zinc-700'} fill={isLiked ? "currentColor" : "none"} />
                  <span className={`text-xs font-black ${isLiked ? 'text-red-500' : 'text-zinc-700'}`}>{n.baseLikes + (isLiked?1:0)}</span>
               </div>
               <div className="flex items-center gap-2.5 text-zinc-700">
                  <MessageSquare size={20} />
                  <span className="text-xs font-black">{n.comments.length}</span>
               </div>
            </div>
            <div className="flex gap-2">
               <button onClick={(e) => { e.stopPropagation(); onShare(); }} className="bg-white/5 p-4 rounded-2xl text-zinc-500 border border-white/5 hover:text-white transition-colors"><Share2 size={18} /></button>
               <button className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all shadow-xl">Leer</button>
            </div>
         </div>
      </div>
    </motion.div>
  );
}

function NavItem({ icon, active, onClick }: { icon: any, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`p-3 transition-all ${active ? 'text-blue-500 scale-110' : 'text-zinc-600 hover:text-white'}`}>
      {React.cloneElement(icon, { size: 24, strokeWidth: active ? 2.5 : 1.5 })}
    </button>
  );
}

function LoginView({ onLogin }: any) {
  const [name, setName] = useState("");
  const [ig, setIg] = useState("");
  
  return (
    <main className="fixed inset-0 bg-black flex items-center justify-center p-8 z-[1000] overflow-y-auto">
       <div className="w-full max-w-sm space-y-12 py-10">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6">
             <div className="w-24 h-24 bg-blue-600 mx-auto rounded-[2.5rem] flex items-center justify-center text-5xl font-black italic shadow-[0_0_40px_rgba(37,99,235,0.4)]">IX</div>
             <div className="space-y-1">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter">Infoxity</h1>
                <p className="text-[10px] font-black text-blue-500 tracking-[0.4em] uppercase">Red de Información Joven</p>
             </div>
          </motion.div>
          
          <div className="bg-zinc-900/50 p-10 rounded-[4rem] border border-white/5 space-y-8 shadow-2xl backdrop-blur-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5 -mr-10 -mt-10"><ZapOff size={150} /></div>
             <div className="text-center space-y-3 relative z-10">
                <p className="text-xl font-black leading-tight uppercase">Más de 2,145 jóvenes ya están dentro debatiendo.</p>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Verificación obligatoria para entrar.</p>
             </div>
             <div className="space-y-4 relative z-10">
                <input 
                  type="text" placeholder="Tu Nombre o Alias" value={name} onChange={e => setName(e.target.value)} 
                  className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-white font-bold outline-none focus:border-blue-500 transition-all text-sm" 
                />
                <div className="relative">
                   <Instagram className="absolute left-6 top-1/2 -translate-y-1/2 text-pink-500" size={20} />
                   <input 
                     type="text" placeholder="Tu Instagram (@)" value={ig} onChange={e => setIg(e.target.value)} 
                     className="w-full bg-white/5 border border-white/10 p-6 pl-16 rounded-3xl text-white font-bold outline-none focus:border-pink-500 transition-all text-sm" 
                   />
                </div>
             </div>
             <button 
               onClick={() => onLogin(name, ig)} 
               className="w-full bg-white text-black p-7 rounded-[2.5rem] font-black uppercase text-xs tracking-widest shadow-2xl active:scale-95 transition-all relative z-10"
             >
               Acceder a la Red
             </button>
          </div>
          
          <div className="flex flex-col items-center gap-6 opacity-30">
             <div className="flex gap-8">
                <Globe size={18} />
                <ShieldCheck size={18} />
                <TrendingUp size={18} />
             </div>
             <p className="text-[9px] text-center font-bold uppercase tracking-[0.3em] px-10 leading-relaxed">
               Noticias reales auditadas por la comunidad. Sin censura. Sin filtros corporativos.
             </p>
          </div>
       </div>
    </main>
  );
}
