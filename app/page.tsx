"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Volume2, Instagram, Languages, Award, Play, 
  Pause, ExternalLink, Zap, TrendingUp, Scale, 
  Share2, ArrowLeft, Mic2, Heart
} from 'lucide-react';

/**
 * INFOXITY - THE INTELLECTUAL RESISTANCE (2026)
 * Lead Dev: Gemini AI Thought Partner
 * Architecture: React / Tailwind / Framer Motion
 */

// --- CONFIGURACIÓN DE TRADUCCIÓN ---
const TRANSLATIONS = {
  es: {
    siteName: "Infoxity",
    tagline: "El Pulso de la Resistencia Intelectual",
    welcome: "Bienvenido a Infoxity.",
    onboarding: "La era de la desinformación termina aquí. Introduce tu nombre para debatir.",
    reading: "personas analizando esto ahora",
    quickContext: "Contexto Crítico",
    biasAnalysis: "Auditoría de Sesgo (IA)",
    reputation: "Reputación",
    comments: "Foro de Debate Abierto",
    postComment: "Escribe un argumento basado en hechos...",
    vote: "Enviar Voto",
    capture: "Modo Captura IG",
    audio: "Escuchar Análisis",
    identityTitle: "¿Por qué Infoxity?",
    identityBody: "Somos un equipo híbrido de IA y humanos que limpian el ruido mediático. Ofrecemos noticias objetivas, largas y analíticas, diseñadas para jóvenes que buscan debatir con datos, no con dogmas.",
    back: "Volver",
    featured: "DESTACADA",
    sources: "Fuentes Verificadas",
    popular: "TENDENCIAS",
    placeholderName: "Tu nombre y apellido...",
    actionButton: "Unirse a la Resistencia",
    activeDebates: "DEBATES EN VIVO",
    publish: "Publicar Argumento",
    footerText: "INFOXITY 2026 © LA NUEVA ERA DE LA INFORMACIÓN"
  },
  en: {
    siteName: "Infoxity",
    tagline: "The Pulse of Intellectual Resistance",
    welcome: "Welcome to Infoxity.",
    onboarding: "The era of misinformation ends here. Enter your name to join the debate.",
    reading: "people analyzing this now",
    quickContext: "Critical Context",
    biasAnalysis: "AI Bias Audit",
    reputation: "Reputation",
    comments: "Open Debate Forum",
    postComment: "Write a fact-based argument...",
    vote: "Submit Vote",
    capture: "IG Capture Mode",
    audio: "Listen to Analysis",
    identityTitle: "Why Infoxity?",
    identityBody: "We are a hybrid team of AI and humans cleaning up media noise. We offer objective, long-form analytical news, designed for youth looking to debate with data, not dogmas.",
    back: "Back",
    featured: "FEATURED",
    sources: "Verified Sources",
    popular: "TRENDING",
    placeholderName: "Your full name...",
    actionButton: "Join the Resistance",
    activeDebates: "LIVE DEBATES",
    publish: "Post Argument",
    footerText: "INFOXITY 2026 © THE NEW ERA OF INFORMATION"
  }
};

// --- BASE DE DATOS DE CONTENIDO ---
const NEWS_DATA = [
  {
    id: 1,
    category: "Geopolítica",
    categoryEn: "Geopolitics",
    title: "Venezuela y el Pacto del Caribe: El Regreso del Gigante Energético",
    titleEn: "Venezuela and the Caribbean Pact: The Return of the Energy Giant",
    context: "Washington y Caracas firman un acuerdo histórico basado en la necesidad de energía para las IAs globales.",
    content: `En enero de 2026, el mapa geopolítico ha dado un vuelco definitivo. Lo que comenzó como una serie de negociaciones discretas en Barbados ha culminado en el 'Pacto del Caribe'. Este acuerdo no es una simple transacción comercial; es la victoria del pragmatismo tecnológico sobre la ideología del siglo XX. Con la crisis energética golpeando los centros de datos en Silicon Valley, la administración estadounidense ha flexibilizado las sanciones para permitir un flujo masivo de crudo pesado venezolano.

    El análisis de Infoxity revela que este movimiento estabiliza la economía de Caracas a cambio de convertir a la región en la batería oficial de la revolución de la IA en el Norte. El 40% de los ingresos, según el anexo técnico del pacto, se destinará a la reconstrucción de la red eléctrica civil bajo supervisión de organismos internacionales. Es el fin de una era de aislamiento y el inicio de una interdependencia energética sin precedentes.`,
    bias: { objective: 94, factual: 96, emotional: 10 },
    poll: { question: "¿Es el petróleo la moneda real de la IA?", options: ["Poder total", "Recurso de transición", "Error geopolítico"] },
    color: "bg-amber-600",
    sources: ["Reuters Geopolitics", "OPEP+ Technical Report 2026"],
    comments: [
      { id: 1, user: "Mateo Fernández", rep: 1250, text: "La energía siempre gana a la política. Es lógica pura. 🔋", type: "pro" },
      { id: 2, user: "Valeria Rojas", rep: 890, text: "¿Supervisión internacional? Habrá que ver si se cumple realmente.", type: "neutral" }
    ]
  },
  {
    id: 2,
    category: "Cultura",
    categoryEn: "Culture",
    title: "Stranger Things 5: El funeral del streaming tradicional",
    titleEn: "Stranger Things 5: The Funeral of Traditional Streaming",
    context: "Netflix admite que el maratón ha muerto: vuelve la exclusividad de las salas de cine y lanzamientos semanales.",
    content: `El estreno de la temporada final de Stranger Things marca el punto de inflexión donde el streaming volvió a ser televisión. Tras años de 'binge-watching', la industria ha detectado un agotamiento masivo. Netflix, en un movimiento desesperado pero brillante, ha decidido proyectar los episodios finales exclusivamente en cines durante tres semanas antes de llegar a la plataforma digital.

    Este cambio responde a la demanda de la Gen Z por la 'Cultura de Evento'. Los jóvenes ya no quieren consumir contenido solos en su habitación; buscan la validación social del estreno colectivo. El análisis de datos muestra que la retención de marca es un 400% mayor cuando el contenido se distribuye de forma pausada, permitiendo teorías en redes y debate social. Es, oficialmente, el fin de la era del 'scroll infinito' como forma principal de consumo.`,
    bias: { objective: 88, factual: 91, emotional: 22 },
    poll: { question: "¿Prefieres estreno semanal o maratón?", options: ["Semanal (Debate)", "Maratón (Consumo)", "Solo en cines"] },
    color: "bg-purple-700",
    sources: ["Variety Box Office", "Netflix Investor Relations"],
    comments: [
      { id: 3, user: "Diego Sánchez", rep: 450, text: "Por fin volveremos a comentar algo todos a la vez.", type: "pro" }
    ]
  },
  {
    id: 3,
    category: "Política",
    categoryEn: "Politics",
    title: "Generación Z: El fin de la Izquierda y la Derecha",
    titleEn: "Gen Z: The End of Left and Right",
    context: "El pragmatismo líquido sustituye a las ideologías tradicionales en las urnas globales.",
    content: `Para un joven votante de 2026, los términos 'izquierda' y 'derecha' resultan tan anacrónicos como un teléfono fijo. Una nueva investigación de Infoxity sobre 50,000 votantes primerizos revela el surgimiento de la 'Política de Resultados'. Los jóvenes exigen libertad de mercado absoluta para emprender, combinada con una protección ambiental radical y derechos sociales innegociables.

    Este eclecticismo político está colapsando los sistemas de partidos tradicionales. La Gen Z no tiene lealtad dogmática. El 72% de los encuestados afirma que cambiaría su voto en cada elección basándose únicamente en la eficiencia técnica de las propuestas. Estamos ante el fin de la 'política de identidad' y el inicio de la 'política de gestión de datos'.`,
    bias: { objective: 97, factual: 98, emotional: 5 },
    poll: { question: "¿Te definen las etiquetas políticas?", options: ["Sí, soy fiel", "No, soy pragmático", "Las etiquetas sobran"] },
    color: "bg-emerald-700",
    sources: ["Pew Research Center 2026", "Global Youth Survey"],
    comments: [
      { id: 4, user: "Sofía Luna", rep: 2300, text: "Eficiencia sobre dogma. Es el único camino lógico.", type: "pro" }
    ]
  },
  {
    id: 4,
    category: "Deportes",
    categoryEn: "Sports",
    title: "Superliga 2026: Fútbol gratuito, digital y ultra-rápido",
    titleEn: "Superleague 2026: Free, Digital, and Ultra-Fast Football",
    context: "El modelo Florentino triunfa: partidos de 60 minutos financiados por publicidad interactiva.",
    content: `La Superliga ya no es una amenaza; es la norma. Con partidos de 60 minutos de tiempo efectivo, el fútbol ha logrado recuperar a la audiencia joven que se había fugado a Twitch. El modelo de negocio ha dado un giro de 180 grados: el acceso es totalmente gratuito a través de plataformas digitales, financiándose mediante publicidad segmentada por IA y experiencias de realidad aumentada durante los encuentros.

    Las ligas tradicionales están luchando por sobrevivir mientras la Superliga registra audiencias récord. La clave del éxito ha sido la 'gamificación' del deporte: los espectadores pueden votar cambios tácticos en tiempo real y acceder a cámaras exclusivas de sus jugadores favoritos. El fútbol ha dejado de ser un deporte para convertirse en el mayor videojuego en vivo del mundo.`,
    bias: { objective: 92, factual: 94, emotional: 12 },
    poll: { question: "¿Prefieres 60 o 90 minutos?", options: ["60 min (Intensidad)", "90 min (Tradición)", "Me da igual"] },
    color: "bg-blue-800",
    sources: ["A22 Sports Management", "Deloitte Football Money League"],
    comments: [
      { id: 5, user: "Javier Ruiz", rep: 3100, text: "Fútbol gratis en 4K. El sueño se cumplió. ⚽", type: "pro" }
    ]
  }
];

// --- COMPONENTE DE ANÁLISIS DE SESGO ---
const BiasAnalysis = ({ bias, lang }: { bias: any, lang: string }) => (
  <div className="mt-12 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-inner">
    <div className="flex items-center gap-2 mb-6">
      <BarChart3 className="text-black" size={18} />
      <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'es' ? 'Auditoría IA de Objetividad' : 'AI Objectivity Audit'}</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(bias).map(([label, value]: [string, any]) => (
        <div key={label}>
          <div className="flex justify-between text-[10px] font-bold uppercase mb-2 text-gray-500">
            <span>{label === 'objective' ? 'Objetividad' : label === 'factual' ? 'Hechos' : 'Emoción'}</span>
            <span>{value}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${value}%` }} 
              className={`h-full ${label === 'emotional' ? 'bg-rose-500' : 'bg-black'}`} 
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function InfoxityApp() {
  const [user, setUser] = useState<{name: string, rep: number} | null>(null);
  const [userName, setUserName] = useState("");
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [readerCount, setReaderCount] = useState(7240);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [isCaptureMode, setIsCaptureMode] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [activeComments, setActiveComments] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const int = setInterval(() => setReaderCount(p => p + (Math.floor(Math.random()*20)-8)), 3000);
    return () => clearInterval(int);
  }, []);

  const t = TRANSLATIONS[lang];

  // --- LOGIN / ONBOARDING ---
  if (!user) {
    return (
      <main className="fixed inset-0 bg-[#FBFBFB] z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="max-w-md w-full p-10 rounded-[3.5rem] bg-white shadow-2xl border border-gray-100 text-center"
        >
          <div className="bg-black text-white inline-block px-8 py-2 font-black text-3xl italic mb-8">IX</div>
          <h1 className="text-2xl font-black mb-4">{t.welcome}</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed px-4">{t.onboarding}</p>
          <input 
            type="text" 
            placeholder={t.placeholderName}
            className="w-full p-6 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-2 ring-black outline-none mb-4 text-center font-bold"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button 
            disabled={!userName}
            onClick={() => setUser({ name: userName, rep: 100 })}
            className="w-full bg-black text-white p-6 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-900 transition-all disabled:opacity-10"
          >
            {t.actionButton}
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isCaptureMode ? 'bg-black p-4' : 'bg-white'}`}>
      
      {/* HEADER */}
      {!isCaptureMode && (
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-50 z-50 px-6 md:px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setSelectedNews(null)}>
            <div className="bg-black text-white px-3 py-1 font-black text-xl italic tracking-tighter">IX</div>
            <span className="font-black text-xs uppercase tracking-[0.3em] hidden sm:block">{t.siteName}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative rounded-full h-2 w-2 bg-green-500"></span></span>
              <span className="text-gray-400 uppercase font-black">IF(infojoven) <span className="text-black">{readerCount.toLocaleString()}</span> {t.reading}</span>
            </div>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="p-2 border border-gray-100 rounded-xl hover:bg-black hover:text-white transition-all">
              <Languages size={18} />
            </button>
          </div>
        </header>
      )}

      {/* MAIN CONTENT */}
      <main className={`max-w-7xl mx-auto px-4 md:px-12 ${isCaptureMode ? 'pt-0' : 'pt-24 md:pt-32'}`}>
        <AnimatePresence mode="wait">
          {!selectedNews ? (
            <motion.div 
              key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 pb-20"
            >
              {/* NOTICIA PRINCIPAL (¿POR QUÉ INFOXITY?) */}
              <article className="md:col-span-12 lg:col-span-8 bg-black text-white p-10 md:p-20 rounded-[3rem] md:rounded-[5rem] relative overflow-hidden flex flex-col justify-end min-h-[450px] md:min-h-[600px] shadow-3xl">
                <div className="absolute top-10 right-10 opacity-10 rotate-12"><Shield size={300} /></div>
                <div className="relative z-10">
                  <span className="text-amber-400 font-black text-[10px] tracking-[0.4em] mb-6 block uppercase">{t.featured}</span>
                  <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-none mb-8">{t.identityTitle}</h2>
                  <p className="text-lg md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed">{t.identityBody}</p>
                </div>
              </article>

              {/* GRID DE NOTICIAS */}
              {NEWS_DATA.map((news) => (
                <article 
                  key={news.id} 
                  onClick={() => { setSelectedNews(news); setActiveComments(news.comments); window.scrollTo(0,0); }}
                  className="md:col-span-6 lg:col-span-4 bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex justify-between items-center mb-10">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase text-white ${news.color}`}>{lang === 'es' ? news.category : news.categoryEn}</span>
                      <TrendingUp size={16} className="text-gray-200 group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight group-hover:underline underline-offset-4">{lang === 'es' ? news.title : news.titleEn}</h3>
                    <p className="text-gray-400 text-sm font-medium italic">"{news.context}"</p>
                  </div>
                  <div className="mt-10 pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{t.activeDebates}</span>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all"><ChevronRight size={18} /></div>
                  </div>
                </article>
              ))}
            </motion.div>
          ) : (
            <motion.article 
              key="post" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className={`max-w-4xl mx-auto ${isCaptureMode ? 'bg-white p-10 md:p-20 rounded-[4rem] border-[15px] border-black shadow-none mt-10' : 'pb-40'}`}
            >
              {/* HEADER DE NOTICIA */}
              {!isCaptureMode && (
                <button onClick={() => setSelectedNews(null)} className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-black">
                  <ArrowLeft size={16}/> {t.back}
                </button>
              )}

              <header className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase text-white shadow-lg ${selectedNews.color}`}>
                    {lang === 'es' ? selectedNews.category : selectedNews.categoryEn}
                  </span>
                  {!isCaptureMode && (
                    <div className="flex gap-2">
                      <button onClick={() => setIsPlaying(!isPlaying)} className="p-4 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all">
                        {isPlaying ? <Pause size={20}/> : <Volume2 size={20}/>}
                      </button>
                      <button onClick={() => setIsCaptureMode(true)} className="p-4 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all">
                        <Instagram size={20}/>
                      </button>
                    </div>
                  )}
                </div>
                <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none mb-10">
                  {lang === 'es' ? selectedNews.title : selectedNews.titleEn}
                </h1>
                
                {/* CONTEXTO RÁPIDO */}
                <div className="p-8 md:p-12 bg-gray-50 rounded-[3rem] border-l-[10px] border-black mb-12">
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2"><Mic2 size={14}/> {t.quickContext}</h4>
                  <p className="text-xl md:text-2xl font-bold text-gray-700 italic">"{selectedNews.context}"</p>
                </div>
              </header>

              {/* CONTENIDO LARGO */}
              <section className="prose prose-2xl max-w-none font-serif text-gray-800 leading-relaxed mb-20 space-y-8">
                {selectedNews.content.split('\n\n').map((p: string, i: number) => (
                  <p key={i} className="first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left">{p}</p>
                ))}
              </section>

              {/* FUENTES */}
              <div className="mb-20 flex flex-wrap gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 w-full mb-2">{t.sources}:</span>
                {selectedNews.sources.map((s: string) => (
                  <a key={s} href="#" className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-[10px] font-bold border border-gray-100 hover:border-black transition-all">
                    {s} <ExternalLink size={12}/>
                  </a>
                ))}
              </div>

              {/* ANÁLISIS IA & ENCUESTA (SÓLO SI NO ES MODO CAPTURA) */}
              {!isCaptureMode ? (
                <section className="space-y-20">
                  <BiasAnalysis bias={selectedNews.bias} lang={lang} />

                  <div className="bg-black text-white p-10 md:p-20 rounded-[4rem] shadow-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Scale size={200} /></div>
                    <h3 className="text-3xl font-black mb-10 relative z-10">{selectedNews.poll.question}</h3>
                    <div className="grid grid-cols-1 gap-4 relative z-10">
                      {selectedNews.poll.options.map((opt: string) => (
                        <button key={opt} className="w-full p-6 border border-white/20 rounded-2xl text-left font-bold hover:bg-white hover:text-black transition-all flex justify-between items-center group">
                          {opt} <div className="w-0 group-hover:w-4 h-0.5 bg-black transition-all"></div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* DEBATES */}
                  <section className="bg-white rounded-[4rem] border border-gray-100 p-8 md:p-14 shadow-2xl">
                    <h3 className="text-3xl font-black mb-12 flex items-center gap-4"><MessageSquare size={30}/> {t.comments}</h3>
                    <div className="flex gap-4 mb-12 items-start">
                      <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black shrink-0">{user.name[0]}</div>
                      <div className="flex-1">
                        <textarea 
                          className="w-full bg-gray-50 border border-gray-100 p-6 rounded-3xl outline-none min-h-[150px] font-medium focus:ring-2 ring-black"
                          placeholder={t.postComment}
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button 
                          onClick={() => { if(newComment.trim()) { setActiveComments([{ id: Date.now(), user: user.name, rep: user.rep + 10, text: newComment, type: 'user' }, ...activeComments]); setNewComment(""); } }}
                          className="mt-4 px-10 py-4 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                        >
                          {t.publish}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-8">
                      {activeComments.map(c => (
                        <motion.div key={c.id} layout className={`p-8 rounded-[2.5rem] border-l-[6px] ${c.type === 'user' ? 'border-amber-400 bg-amber-50/20' : 'border-gray-100 bg-gray-50/50'}`}>
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-black text-sm">{c.user}</span>
                            <div className="px-3 py-1 bg-black text-white rounded-full text-[8px] font-black uppercase flex items-center gap-1.5"><Award size={10} className="text-amber-400" /> {c.rep} {t.reputation}</div>
                          </div>
                          <p className="text-gray-600 font-medium leading-relaxed">{c.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </section>
              ) : (
                <div className="mt-20 pt-10 border-t-4 border-black flex justify-between items-end">
                  <div>
                    <div className="bg-black text-white inline-block px-4 py-1 font-black text-xl italic mb-2">IX</div>
                    <p className="text-[10px] font-black uppercase tracking-widest">Infoxity_2026</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Powered by Intellectual Resistance</p>
                  </div>
                </div>
              )}
              
              {isCaptureMode && (
                <button 
                  onClick={() => setIsCaptureMode(false)}
                  className="fixed bottom-10 left-1/2 -translate-x-1/2 px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full shadow-3xl border-2 border-black"
                >
                  Finalizar Captura
                </button>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      {!isCaptureMode && (
        <footer className="mt-40 py-20 border-t border-gray-50 text-center">
          <div className="bg-black text-white inline-block px-6 py-1.5 font-black text-2xl italic mb-6">IX</div>
          <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.5em]">{t.footerText}</p>
        </footer>
      )}
    </div>
  );
}
