"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Languages, Award, Bookmark, 
  BookmarkCheck, ArrowLeft, Send, Zap, 
  Info, Share2, Check, User, Search,
  TrendingUp, Bell, Hash
} from 'lucide-react';

// --- DICCIONARIO MAESTRO ---
const TRANSLATIONS = {
  es: {
    siteName: "Infoxity | Resistencia Intelectual",
    tagline: "Noticias Objetivas y Debate Crítico",
    welcome: "Bienvenido a la Resistencia.",
    onboarding: "Introduce tu identidad para acceder al análisis sin ruido mediático.",
    reading: "mentes conectadas",
    quickContext: "Contexto Crítico",
    biasAnalysis: "Auditoría de IA (Neutralidad)",
    reputation: "puntos de reputación",
    comments: "Foro de Argumentación",
    identityTitle: "¿Por qué Infoxity?",
    identityBody: "En un mundo de clips de 10 segundos, elegimos la profundidad. Somos un híbrido de IA y editores humanos filtrando el sesgo político para entregarte la verdad cruda.",
    back: "Volver al inicio",
    featured: "ANÁLISIS DESTACADO",
    actionButton: "Entrar al Sistema",
    placeholder: "Tu nombre o alias...",
    popular: "Tendencias de Debate",
    library: "Mi Biblioteca",
    noSaved: "Aún no has guardado análisis en tu biblioteca.",
    saved: "Guardado",
    save: "Guardar",
    whatsapp: "WhatsApp",
    share: "Compartir",
    biasLabels: ["Objetividad", "Datos Verificables", "Neutralidad Tonal"],
    postComment: "Publicar argumento"
  },
  en: {
    siteName: "Infoxity | Intellectual Resistance",
    tagline: "Objective News & Critical Debate",
    welcome: "Welcome to the Resistance.",
    onboarding: "Enter your identity to access noise-free analysis.",
    reading: "minds connected",
    quickContext: "Critical Context",
    biasAnalysis: "AI Bias Audit",
    reputation: "reputation points",
    comments: "Argumentation Forum",
    identityTitle: "Why Infoxity?",
    identityBody: "In a world of 10-second clips, we choose depth. We are an AI-human hybrid filtering political bias to deliver the raw truth.",
    back: "Back to home",
    featured: "FEATURED ANALYSIS",
    actionButton: "Enter System",
    placeholder: "Name or alias...",
    popular: "Trending Debates",
    library: "My Library",
    noSaved: "No saved analysis in your library yet.",
    saved: "Saved",
    save: "Save",
    whatsapp: "WhatsApp",
    share: "Share",
    biasLabels: ["Objectivity", "Verifiable Data", "Tonal Neutrality"],
    postComment: "Post argument"
  }
};

const NEWS_DATA = [
  {
    id: 1,
    cat: "Geopolítica",
    title: "Venezuela 2026: El Nuevo Eje Energético Global",
    context: "El acuerdo secreto entre Washington y Caracas para alimentar las granjas de servidores de IA.",
    content: "En enero de 2026, la diplomacia energética ha dado un giro inesperado. Ante el consumo masivo de electricidad de los nuevos modelos de AGI, Estados Unidos ha firmado el 'Pacto del Caribe' con Venezuela. Este movimiento redefine no solo el mapa energético de Latinoamérica, sino que coloca a Caracas en una posición de poder inédita frente a Silicon Valley.",
    bias: [95, 92, 88],
    poll: { 
      q: "¿Es ético priorizar la IA sobre las sanciones?", 
      opts: ["Pragmatismo necesario", "Error histórico", "Neutral"], 
      votes: [540, 210, 95] 
    },
    color: "bg-orange-600",
    comments: [
        { id: 1, user: "Mateo Fernández", rep: 1250, text: "La energía manda, las ideologías solo adornan. 🔋" },
        { id: 2, user: "Elena Smith", rep: 890, text: "Interesante ver cómo la IA fuerza alianzas imposibles." }
    ]
  },
  {
    id: 2,
    cat: "Cultura",
    title: "El Fin del Binge-Watching masivo",
    context: "Netflix y HBO regresan al modelo semanal para salvar la conversación social.",
    content: "El estreno de las grandes sagas de 2026 marca oficialmente el funeral del maratón. Las plataformas han detectado que el consumo instantáneo destruye el valor publicitario y la retención cultural de sus marcas.",
    bias: [88, 94, 91],
    poll: { q: "¿Prefieres esperar o verlo todo ya?", opts: ["Esperar (Crea Hype)", "Todo de golpe"], votes: [800, 410] },
    color: "bg-purple-600",
    comments: [{ id: 3, user: "Cinefilo26", rep: 400, text: "Extrañaba las teorías semanales." }]
  }
];

export default function InfoxityFullApp() {
  const [user, setUser] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [lang, setLang] = useState('es');
  const [selected, setSelected] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [votedPolls, setVotedPolls] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = TRANSLATIONS[lang];

  // --- SEO DINÁMICO ---
  useEffect(() => {
    document.title = selected ? `${selected.title} | Infoxity` : t.siteName;
  }, [selected, t.siteName]);

  const shareWhatsApp = (item) => {
    const text = encodeURIComponent(`📢 *${item.title}*\nAnálisis profundo en Infoxity 2026.\n👉 https://infoxity.com`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- VISTA ONBOARDING ---
  if (!user) {
    return (
      <main className="fixed inset-0 bg-white flex items-center justify-center p-6 z-[999]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full text-center">
          <div className="bg-black text-white inline-block px-8 py-2 font-black text-4xl italic mb-10 shadow-2xl">IX</div>
          <h1 className="text-3xl font-black mb-4 uppercase tracking-tighter">{t.welcome}</h1>
          <p className="text-gray-400 mb-10 font-medium leading-relaxed">{t.onboarding}</p>
          <div className="space-y-4">
            <input 
              type="text" placeholder={t.placeholder} 
              className="w-full p-6 rounded-[2rem] bg-gray-100 border-none font-bold text-center outline-none ring-2 ring-transparent focus:ring-black transition-all"
              onChange={(e) => setNameInput(e.target.value)}
            />
            <button 
              onClick={() => nameInput && setUser({ name: nameInput, rep: 100 })}
              className="w-full bg-black text-white p-6 rounded-[2rem] font-black uppercase tracking-widest hover:scale-[0.98] transition-transform shadow-xl"
            >
              {t.actionButton}
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-700 ${isCapturing ? 'bg-black p-4' : 'bg-white'}`}>
      
      {/* NAVEGACIÓN PRINCIPAL */}
      {!isCapturing && (
        <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-2xl z-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => {setSelected(null); setShowLibrary(false);}}>
            <div className="bg-black text-white px-3 py-0.5 font-black text-2xl italic">IX</div>
            <div className="hidden lg:block">
              <p className="font-black text-[10px] tracking-[0.3em] uppercase">Infoxity</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase italic">Resistance 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-5">
            <button onClick={() => setShowLibrary(!showLibrary)} className={`p-3 rounded-full transition-all ${showLibrary ? 'bg-black text-white' : 'bg-gray-50'}`}>
              <Bookmark size={20} />
            </button>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="px-4 py-2 border-2 border-gray-100 rounded-2xl font-black text-[10px] flex items-center gap-2 hover:bg-black hover:text-white transition-all">
              <Languages size={16} /> {lang.toUpperCase()}
            </button>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
               <User size={14} className="text-gray-400" />
               <span className="text-[10px] font-black uppercase">{user.name}</span>
               <span className="text-[10px] font-black text-amber-500">+{user.rep}</span>
            </div>
          </div>
        </header>
      )}

      <main className={`max-w-7xl mx-auto px-6 ${isCapturing ? '' : 'pt-28 pb-20'}`}>
        <AnimatePresence mode="wait">
          
          {/* VISTA: BIBLIOTECA */}
          {showLibrary ? (
            <motion.div key="lib" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
              <h2 className="text-5xl font-black italic tracking-tighter uppercase">{t.library}</h2>
              {savedIds.length === 0 ? (
                <div className="py-32 text-center border-4 border-dashed border-gray-100 rounded-[4rem]">
                  <Bookmark size={60} className="mx-auto text-gray-100 mb-6" />
                  <p className="text-gray-400 font-bold uppercase tracking-widest">{t.noSaved}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {NEWS_DATA.filter(n => savedIds.includes(n.id)).map(n => (
                    <div key={n.id} className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100">
                      <span className="text-[10px] font-black uppercase text-gray-400 block mb-4">{n.cat}</span>
                      <h4 className="text-2xl font-black mb-8 leading-tight">{n.title}</h4>
                      <button onClick={() => {setSelected(n); setShowLibrary(false);}} className="w-full py-4 bg-white rounded-2xl font-black text-[10px] uppercase shadow-sm flex items-center justify-center gap-2"> Leer Análisis <ChevronRight size={14}/></button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : !selected ? (
            /* VISTA: FEED PRINCIPAL (HOME) */
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
              
              {/* HERO: POR QUÉ INFOXITY */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 bg-black text-white p-12 md:p-20 rounded-[4rem] relative overflow-hidden flex flex-col justify-end min-h-[600px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                  <div className="absolute top-0 right-0 p-12 text-white/5 rotate-12"><Shield size={450} /></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="bg-amber-500 text-black px-4 py-1 font-black text-[10px] uppercase rounded-full">{t.featured}</span>
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-[8px] font-black">AI</div>)}
                      </div>
                    </div>
                    <h2 className="text-6xl md:text-9xl font-black italic mb-10 leading-[0.8] tracking-tighter">{t.identityTitle}</h2>
                    <p className="text-gray-400 text-xl md:text-2xl font-light max-w-2xl leading-relaxed italic border-l-4 border-amber-500 pl-8">{t.identityBody}</p>
                  </div>
                </div>

                {/* TENDENCIAS */}
                <div className="lg:col-span-4 flex flex-col justify-center space-y-12">
                   <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-300 flex items-center gap-4"><TrendingUp size={18}/> {t.popular}</h3>
                   <div className="space-y-10">
                     {NEWS_DATA.map((n, i) => (
                       <div key={n.id} onClick={() => setSelected(n)} className="group cursor-pointer flex gap-6 items-start">
                          <span className="text-6xl font-black text-gray-100 italic leading-none group-hover:text-black transition-colors">0{i+1}</span>
                          <div>
                            <h4 className="font-black text-xl leading-tight mb-2 group-hover:text-blue-600 transition-all">{n.title}</h4>
                            <div className="flex gap-3">
                              <span className="text-[10px] font-black uppercase text-gray-400">{n.cat}</span>
                              <span className="text-[10px] font-black text-amber-500 flex items-center gap-1"><MessageSquare size={10}/> {n.comments.length}</span>
                            </div>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
              </section>

              {/* GRID DE NOTICIAS SECUNDARIO */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {NEWS_DATA.map(n => (
                  <article key={n.id} className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-sm hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all flex flex-col justify-between min-h-[520px] group">
                    <div className="cursor-pointer" onClick={() => setSelected(n)}>
                      <div className="flex justify-between items-start mb-8">
                        <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase text-white ${n.color} shadow-lg`}>{n.cat}</span>
                        <Zap size={20} className="text-gray-100 group-hover:text-amber-400 transition-colors" />
                      </div>
                      <h3 className="text-3xl font-black mb-6 leading-tight group-hover:tracking-tight transition-all">{n.title}</h3>
                      <p className="text-gray-400 text-base italic leading-relaxed line-clamp-4 font-medium">"{n.context}"</p>
                    </div>
                    <div className="flex justify-between items-center pt-8 border-t border-gray-50 mt-10">
                      <button onClick={() => {
                        setSavedIds(prev => prev.includes(n.id) ? prev.filter(i => i !== n.id) : [...prev, n.id]);
                      }} className="flex items-center gap-3">
                        {savedIds.includes(n.id) ? <BookmarkCheck className="text-blue-600" size={24}/> : <Bookmark size={24} className="text-gray-200 group-hover:text-black transition-colors"/>}
                        <span className="text-[11px] font-black uppercase text-gray-400">{savedIds.includes(n.id) ? t.saved : t.save}</span>
                      </button>
                      <button onClick={() => setSelected(n)} className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-inner"><ChevronRight size={28}/></button>
                    </div>
                  </article>
                ))}
              </section>
            </motion.div>
          ) : (
            /* VISTA: DETALLE DEL ANÁLISIS (ARTÍCULO) */
            <motion.article key="article" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} 
              className={`max-w-4xl mx-auto ${isCapturing ? 'bg-white p-12 rounded-[5rem] border-[20px] border-black shadow-2xl mt-10' : 'pb-32'}`}
            >
              <div className="flex justify-between items-center mb-16">
                <button onClick={() => setSelected(null)} className="flex items-center gap-3 text-[12px] font-black uppercase text-gray-400 hover:text-black transition-colors">
                  <ArrowLeft size={20}/> {t.back}
                </button>
                <div className="flex gap-4">
                  <button onClick={() => shareWhatsApp(selected)} className="hidden sm:flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-full font-black text-[11px] uppercase hover:bg-green-600 hover:text-white transition-all">
                    <Send size={18}/> {t.whatsapp}
                  </button>
                  <button onClick={copyLink} className="p-4 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all">
                    {copied ? <Check size={22} className="text-green-500" /> : <Share2 size={22} />}
                  </button>
                  <button onClick={() => setIsCapturing(!isCapturing)} className={`p-4 rounded-full transition-all ${isCapturing ? 'bg-black text-white' : 'bg-gray-100 hover:bg-black hover:text-white'}`}>
                    <Instagram size={22}/>
                  </button>
                </div>
              </div>

              <header className="mb-20">
                <span className={`px-6 py-2 rounded-full text-[12px] font-black uppercase text-white ${selected.color} mb-10 inline-block shadow-xl`}>{selected.cat}</span>
                <h1 className="text-6xl md:text-[7rem] font-black italic leading-[0.85] tracking-tighter mb-16">{selected.title}</h1>
                
                <div className="bg-gray-50 p-12 md:p-16 rounded-[4.5rem] border-l-[15px] border-black relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5"><Info size={120} /></div>
                  <h4 className="text-[12px] font-black uppercase text-gray-400 mb-6 tracking-[0.3em]">{t.quickContext}</h4>
                  <p className="text-3xl md:text-4xl font-bold italic text-gray-800 leading-tight">"{selected.context}"</p>
                </div>
              </header>

              <section className="prose prose-2xl font-serif text-gray-800 leading-relaxed mb-28 space-y-12 px-2">
                <p className="first-letter:text-9xl first-letter:font-black first-letter:mr-5 first-letter:float-left first-letter:leading-[0.7]">{selected.content}</p>
                <p>Nuestros algoritmos han procesado más de 500 fuentes primarias para eliminar el ruido de las agencias de noticias tradicionales. El resultado es una visión puramente analítica de los hechos.</p>
              </section>

              {/* AUDITORÍA DE SESGO (IA) */}
              <div className="bg-gray-50 p-12 md:p-20 rounded-[5rem] mb-28 relative shadow-inner overflow-hidden">
                <div className="absolute -bottom-20 -right-20 text-gray-200 rotate-12"><BarChart3 size={350} /></div>
                <h5 className="text-[14px] font-black uppercase tracking-[0.5em] mb-16 flex items-center gap-4 text-gray-400">
                  <Shield size={24} className="text-black"/> {t.biasAnalysis}
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
                  {t.biasLabels.map((l, i) => (
                    <div key={l} className="space-y-6">
                      <div className="flex justify-between text-[12px] font-black uppercase">
                        <span>{l}</span>
                        <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">{selected.bias[i]}%</span>
                      </div>
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${selected.bias[i]}%` }} transition={{duration: 2, ease: "circOut"}} className="h-full bg-black shadow-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ENCUESTA DE DEBATE */}
              <div className="bg-black text-white p-14 md:p-24 rounded-[6rem] mb-32 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <h4 className="text-4xl md:text-6xl font-black mb-16 flex items-center gap-6 leading-[0.9] tracking-tighter">
                  <Zap className="text-amber-400" size={50}/> {selected.poll.q}
                </h4>
                <div className="space-y-6">
                  {selected.poll.opts.map((o, i) => {
                    const voted = votedPolls.includes(selected.id);
                    const total = selected.poll.votes.reduce((a,b)=>a+b, 0);
                    const pct = Math.round((selected.poll.votes[i]/total)*100);
                    return (
                      <button key={i} disabled={voted} onClick={() => {
                        setVotedPolls([...votedPolls, selected.id]);
                      }} className={`w-full p-10 rounded-[2.5rem] border-2 transition-all relative overflow-hidden flex justify-between items-center group ${voted ? 'border-white/10' : 'border-white/20 hover:border-white hover:bg-white/5'}`}>
                        {voted && <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="absolute inset-y-0 left-0 bg-white/10" />}
                        <span className="relative z-10 font-black text-xl md:text-3xl">{o}</span>
                        {voted && <span className="relative z-10 text-amber-400 font-black text-4xl">{pct}%</span>}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* FORO DE ARGUMENTACIÓN */}
              <section className="pt-24 border-t-2 border-gray-100">
                <div className="flex items-center justify-between mb-20">
                  <h4 className="text-5xl md:text-6xl font-black tracking-tighter uppercase flex items-center gap-6"><MessageSquare size={50}/> {t.comments}</h4>
                  <span className="px-6 py-3 bg-gray-50 rounded-full text-[12px] font-black uppercase text-gray-400 border border-gray-100">{selected.comments.length} argumentos</span>
                </div>
                
                <div className="mb-16">
                   <textarea placeholder={t.postComment} className="w-full p-10 rounded-[3rem] bg-gray-50 border-2 border-transparent focus:border-black outline-none font-bold text-xl min-h-[200px] transition-all" />
                </div>

                <div className="space-y-12">
                  {selected.comments.map(c => (
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={c.id} className="bg-gray-50/50 p-12 rounded-[5rem] flex flex-col gap-6 border border-transparent hover:border-gray-200 transition-all">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">{c.user[0]}</div>
                          <span className="font-black text-2xl tracking-tight">{c.user}</span>
                        </div>
                        <div className="bg-amber-100 text-amber-900 px-6 py-2 rounded-full text-[12px] font-black uppercase flex items-center gap-3 shadow-md">
                          <Award size={16}/> {c.rep} {t.reputation}
                        </div>
                      </div>
                      <p className="text-gray-700 text-2xl font-medium leading-relaxed italic border-l-4 border-gray-200 pl-10">"{c.text}"</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      {!isCapturing && (
        <footer className="py-32 text-center border-t border-gray-100 mt-20 bg-gray-50/20">
          <div className="bg-black text-white inline-block px-14 py-4 font-black text-5xl italic mb-10 shadow-2xl">IX</div>
          <p className="text-[14px] font-black text-gray-300 uppercase tracking-[1em] mb-6">Infoxity 2026</p>
          <p className="text-[12px] font-bold text-gray-400 max-w-md mx-auto px-8 italic leading-relaxed">Protegiendo la soberanía intelectual en la era de la distracción algorítmica.</p>
        </footer>
      )}
    </div>
  );
}
