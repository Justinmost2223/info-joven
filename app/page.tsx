"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Languages, Award, Bookmark, 
  BookmarkCheck, CheckCircle2, ArrowLeft, Mic2, 
  TrendingUp, Scale, Star, Menu, X, Share2
} from 'lucide-react';

// --- SISTEMA DE IDIOMAS INTEGRAL (RESTAURADO) ---
const TRANSLATIONS = {
  es: {
    siteName: "Infoxity | Resistencia Intelectual",
    tagline: "Noticias Objetivas y Debate Crítico",
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
    popular: "Más Destacadas",
    totalComments: "comentarios"
  },
  en: {
    siteName: "Infoxity | Intellectual Resistance",
    tagline: "Objective News & Critical Debate",
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
    popular: "Trending Now",
    totalComments: "comments"
  }
};

// --- DATA ESTRUCTURADA COMPLETA (RESTAURADA) ---
const INITIAL_NEWS = [
  {
    id: 1,
    cat: "Geopolítica", catEn: "Geopolitics",
    title: "Venezuela 2026: El Nuevo Eje Energético Global", titleEn: "Venezuela 2026: The New Global Energy Axis",
    context: "El acuerdo secreto entre Washington y Caracas para alimentar las granjas de servidores de IA.",
    contextEn: "The secret agreement between Washington and Caracas to power AI server farms.",
    content: "En enero de 2026, la diplomacia energética ha dado un giro inesperado. Ante el consumo masivo de electricidad de los nuevos modelos de Inteligencia Artificial General (AGI), Estados Unidos ha firmado el 'Pacto del Caribe' con Venezuela...",
    contentEn: "In January 2026, energy diplomacy has taken an unexpected turn. Given the massive electricity consumption of the new General Artificial Intelligence (AGI) models...",
    bias: [95, 92, 10],
    poll: { 
        q: "¿Es ético priorizar la IA sobre las sanciones?", 
        qEn: "Is it ethical to prioritize AI over sanctions?",
        opts: ["Pragmatismo necesario", "Error histórico", "Neutral"], 
        optsEn: ["Necessary pragmatism", "Historical error", "Neutral"],
        votes: [540, 210, 95] 
    },
    sources: ["OPEP+ Energy Report", "Digital Geopolitics Journal"],
    color: "bg-orange-600",
    comments: [
      { id: 1, user: "Mateo Fernández", rep: 1250, text: "La energía manda, las ideologías solo adornan. 🔋", textEn: "Energy rules, ideologies are just decoration. 🔋" },
      { id: 2, user: "Sarah Jenkins", rep: 890, text: "Esto cambia el tablero en Latinoamérica por completo.", textEn: "This completely changes the board in Latin America." },
      { id: 3, user: "Dr. Arreaza", rep: 3400, text: "Interesante ver cómo la IA fuerza alianzas imposibles.", textEn: "Interesting to see how AI forces impossible alliances." }
    ]
  },
  {
    id: 2,
    cat: "Cultura", catEn: "Culture",
    title: "Stranger Things 5 y el Fin del Binge-Watching", titleEn: "Stranger Things 5 and the End of Binge-Watching",
    context: "Netflix abandona el modelo de 'todo de golpe' para salvar su relevancia cultural.",
    contextEn: "Netflix abandons the 'all-at-once' model to save its cultural relevance.",
    content: "El estreno de la última temporada de Stranger Things en 2026 marca oficialmente el funeral del maratón de series...",
    contentEn: "The release of the final season of Stranger Things in 2026 officially marks the funeral of the binge-watching era...",
    bias: [88, 94, 25],
    poll: { 
        q: "¿Prefieres esperar o verlo todo ya?", 
        qEn: "Do you prefer to wait or watch it all at once?",
        opts: ["Esperar (Crea hype)", "Todo ya", "Indiferente"], 
        optsEn: ["Wait (Creates hype)", "All at once", "Indifferent"],
        votes: [890, 410, 120] 
    },
    color: "bg-purple-600",
    comments: Array(23).fill({ id: Math.random(), user: "Cinephile", rep: 420, text: "Prefiero esperar, el debate semanal es mejor.", textEn: "I prefer waiting, weekly debate is better." })
  },
  {
    id: 3,
    cat: "Política", catEn: "Politics",
    title: "Gen Z: El Fin de la Izquierda y la Derecha", titleEn: "Gen Z: The End of Left and Right",
    context: "El 70% de los jóvenes votantes en 2026 se declaran 'Pragmáticos Radicales'.",
    contextEn: "70% of young voters in 2026 declare themselves 'Radical Pragmatists'.",
    content: "Las etiquetas políticas tradicionales han colapsado. Un estudio profundo realizado por el equipo de Infoxity...",
    contentEn: "Traditional political labels have collapsed. An in-depth study conducted by the Infoxity team...",
    bias: [98, 96, 5],
    poll: { 
        q: "¿Te sientes representado por algún partido?", 
        qEn: "Do you feel represented by any party?",
        opts: ["Ninguno", "Por ideas sueltas", "Sí, soy fiel"], 
        optsEn: ["None", "By loose ideas", "Yes, I am loyal"],
        votes: [1500, 600, 150] 
    },
    color: "bg-emerald-600",
    comments: Array(34).fill({ id: Math.random(), user: "Votante Crítico", rep: 1100, text: "La gestión importa más que la bandera.", textEn: "Management matters more than the flag." })
  }
];

export default function InfoxityApp() {
  const [user, setUser] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [lang, setLang] = useState('es');
  const [news, setNews] = useState(INITIAL_NEWS);
  const [selected, setSelected] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [votedPolls, setVotedPolls] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [readers, setReaders] = useState(4520);

  const t = TRANSLATIONS[lang];

  // --- LÓGICA SEO: TÍTULO DINÁMICO ---
  useEffect(() => {
    const pageTitle = selected 
      ? `${lang === 'es' ? selected.title : selected.titleEn} | Infoxity` 
      : t.siteName;
    document.title = pageTitle;
  }, [selected, lang, t.siteName]);

  useEffect(() => {
    const interval = setInterval(() => setReaders(p => p + (Math.floor(Math.random()*21)-10)), 3000);
    return () => clearInterval(interval);
  }, []);

  // --- ACCIONES RESTAURADAS ---
  const toggleSave = (id) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleVote = (newsId, optIndex) => {
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
      
      {/* SEO HEAD */}
      <Head>
        <title>{selected ? selected.title : t.siteName}</title>
        <meta name="description" content={selected ? selected.context : t.identityBody} />
      </Head>

      {!isCapturing && (
        <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl z-50 px-4 md:px-12 py-4 border-b border-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelected(null)}>
            <div className="bg-black text-white px-3 py-0.5 font-black text-xl italic">IX</div>
            <p className="font-black text-[10px] uppercase tracking-[0.3em] hidden sm:block">INFOXITY</p>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="bg-gray-50 px-3 md:px-4 py-2 rounded-full border border-gray-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase">
                {readers.toLocaleString()} {t.reading}
              </span>
            </div>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="p-2 hover:bg-black hover:text-white rounded-xl transition-all border border-gray-100 flex items-center gap-2 font-black text-[10px]">
              <Languages size={18} /> {lang.toUpperCase()}
            </button>
          </div>
        </header>
      )}

      <main className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 ${isCapturing ? 'pt-10' : 'pt-24 md:pt-32 pb-20'}`}>
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
              
              <h1 className="sr-only">Infoxity - {t.tagline}</h1>

              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-black text-white p-10 md:p-16 rounded-[3.5rem] relative overflow-hidden flex flex-col justify-end min-h-[450px] shadow-2xl">
                  <div className="absolute top-8 right-8 text-white/10 rotate-12"><Shield size={250} /></div>
                  <div className="relative z-10">
                    <span className="text-amber-400 font-black text-[10px] tracking-[0.4em] mb-4 block uppercase">{t.featured}</span>
                    <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter mb-6 leading-[0.9]">{t.identityTitle}</h2>
                    <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">{t.identityBody}</p>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-center px-2">
                  <h3 className="text-[10px] font-black tracking-[0.4em] text-gray-300 uppercase mb-8">{t.popular}</h3>
                  <div className="space-y-8">
                    {news.map((n, i) => (
                      <div key={n.id} onClick={() => { setSelected(n); window.scrollTo(0,0); }} className="group cursor-pointer flex gap-5 items-start">
                        <span className="font-black text-gray-100 text-5xl leading-none">0{i+1}</span>
                        <div>
                          <h4 className="font-black text-lg leading-tight group-hover:text-blue-600 transition-colors">
                            {lang === 'es' ? n.title : n.titleEn}
                          </h4>
                          <span className="text-[9px] font-black uppercase text-gray-400">{lang === 'es' ? n.cat : n.catEn}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map(n => (
                  <motion.article 
                    key={n.id} whileHover={{ y: -8 }}
                    className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all flex flex-col justify-between min-h-[420px]"
                  >
                    <div className="cursor-pointer" onClick={() => setSelected(n)}>
                      <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase text-white ${n.color} mb-6 inline-block`}>
                        {lang === 'es' ? n.cat : n.catEn}
                      </span>
                      <h2 className="text-2xl font-black leading-tight mb-4">{lang === 'es' ? n.title : n.titleEn}</h2>
                      <p className="text-gray-400 text-sm italic font-medium">"{lang === 'es' ? n.context : n.contextEn}"</p>
                    </div>
                    <div className="flex justify-between items-center pt-6 border-t border-gray-50 mt-8">
                      <div className="flex items-center gap-2 text-gray-300 font-black text-[10px] uppercase">
                        <MessageSquare size={14} /> {n.comments.length} {t.totalComments}
                      </div>
                      <div className="flex gap-2">
                         <button onClick={() => toggleSave(n.id)} className="p-2 rounded-full bg-gray-50">
                           {savedIds.includes(n.id) ? <BookmarkCheck className="text-blue-600" size={18}/> : <Bookmark size={18}/>}
                         </button>
                         <button onClick={() => setSelected(n)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all"><ChevronRight size={18}/></button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </section>
            </motion.div>
          ) : (
            <motion.article 
              key="article" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={`max-w-4xl mx-auto ${isCapturing ? 'bg-white p-8 md:p-16 rounded-[4rem] border-[12px] border-black mt-4' : 'pb-20'}`}
            >
              <div className="flex justify-between items-center mb-8">
                <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-black">
                  <ArrowLeft size={16}/> {t.back}
                </button>
                <div className="flex gap-4">
                  <button onClick={() => setIsCapturing(!isCapturing)} className="p-3 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all">
                    <Instagram size={20} />
                  </button>
                  <button onClick={() => toggleSave(selected.id)} className="p-3 bg-gray-50 rounded-full">
                    {savedIds.includes(selected.id) ? <BookmarkCheck className="text-blue-600" size={20}/> : <Bookmark size={20}/>}
                  </button>
                </div>
              </div>

              <header className="mb-12">
                <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase text-white ${selected.color} mb-8 inline-block`}>
                  {lang === 'es' ? selected.cat : selected.catEn}
                </span>
                <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-[0.95] mb-10">
                  {lang === 'es' ? selected.title : selected.titleEn}
                </h1>
                <div className="bg-gray-50 p-8 rounded-[2.5rem] border-l-[8px] border-black">
                  <h4 className="text-[10px] font-black uppercase mb-2 text-gray-400">{t.quickContext}</h4>
                  <p className="text-xl md:text-2xl font-bold italic text-gray-700">
                    "{lang === 'es' ? selected.context : selected.contextEn}"
                  </p>
                </div>
              </header>

              <section className="prose prose-xl max-w-none text-gray-800 font-serif leading-relaxed mb-16 space-y-8">
                <p className="first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left">
                  {lang === 'es' ? selected.content : selected.contentEn}
                </p>
              </section>

              {/* AUDITORÍA IA */}
              <div className="mb-16 p-8 bg-gray-50 rounded-[3rem]">
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-2 text-gray-400">
                  <BarChart3 size={16}/> {t.biasAnalysis}
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {['Objectivity', 'Facts', 'Neutrality'].map((label, i) => (
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

              {/* ENCUESTA */}
              <div className="mb-20 bg-black text-white p-8 md:p-14 rounded-[3.5rem]">
                <h3 className="text-2xl md:text-3xl font-black mb-10">
                    {lang === 'es' ? selected.poll.q : selected.poll.qEn}
                </h3>
                <div className="space-y-4">
                  {(lang === 'es' ? selected.poll.opts : selected.poll.optsEn).map((o, i) => {
                    const total = selected.poll.votes.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((selected.poll.votes[i] / total) * 100);
                    const hasVoted = votedPolls.includes(selected.id);
                    return (
                      <button 
                        key={o} disabled={hasVoted}
                        onClick={() => handleVote(selected.id, i)}
                        className="w-full relative p-6 rounded-2xl text-left font-bold border-2 border-white/10 transition-all overflow-hidden"
                      >
                        {hasVoted && <div className="absolute left-0 top-0 h-full bg-white/10" style={{ width: `${percentage}%` }} />}
                        <div className="relative z-10 flex justify-between">{o} {hasVoted && <span>{percentage}%</span>}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* COMENTARIOS RESTAURADOS */}
              <section className="bg-white border border-gray-100 p-8 md:p-14 rounded-[3.5rem] shadow-xl">
                <h3 className="text-3xl font-black mb-12 flex items-center gap-4">
                    <MessageSquare size={30}/> {t.comments} ({selected.comments.length})
                </h3>
                <div className="space-y-8">
                  {selected.comments.map((c, idx) => (
                    <div key={idx} className="p-8 bg-gray-50/50 border border-gray-100 rounded-[2.5rem] flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-sm">{c.user}</span>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-[9px] font-black uppercase">
                          <Award size={12}/> {c.rep} {t.reputation}
                        </div>
                      </div>
                      <p className="text-gray-600 font-medium">{lang === 'es' ? c.text : c.textEn}</p>
                    </div>
                  ))}
                </div>
              </section>

            </motion.article>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-24 border-t border-gray-50 text-center">
        <div className="bg-black text-white inline-block px-8 py-2 font-black text-3xl italic mb-6">IX</div>
        <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.6em] px-4">
          Infoxity 2026 © {lang === 'es' ? 'Soberanía de Información' : 'Information Sovereignty'}
        </p>
      </footer>
    </div>
  );
}
