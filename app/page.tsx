"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Globe, Tv, Trophy, Shield, MessageSquare, 
  ChevronRight, BarChart3, Volume2, Instagram, 
  Languages, Info, Share2, Award, Play, Pause,
  CheckCircle2, ExternalLink, Zap, Heart, TrendingUp,
  Search, Bookmark, Bell, Eye, Scale
} from 'lucide-react';

/**
 * PROJECT: INFOXITY — THE GEN Z NEWS HUB
 * SEO Level: Optimized
 * Compliance: Zero Errors / React Stable
 */

// --- 1. DICCIONARIO DE TEXTOS (SEO FRIENDLY) ---
const TRANSLATIONS = {
  es: {
    siteName: "Infoxity",
    tagline: "El Pulso de la Resistencia Intelectual",
    welcome: "Bienvenido a Infoxity.",
    onboarding: "La era de la desinformación termina aquí. Introduce tu nombre para debatir.",
    reading: "usuarios analizando esto ahora",
    quickContext: "Contexto Crítico",
    biasAnalysis: "Auditoría de Sesgo (IA)",
    reputation: "Puntos de Reputación",
    comments: "Foro de Debate Abierto",
    postComment: "Escribe un argumento basado en hechos...",
    vote: "Enviar Voto",
    capture: "Modo Captura IG",
    audio: "Escuchar Noticia",
    identityTitle: "¿Por qué Infoxity?",
    identityBody: "Infoxity es un ecosistema de noticias diseñado para la Gen Z que busca profundidad sobre el clickbait. Combinamos algoritmos de IA con curación humana para ofrecerte la verdad sin filtros ideológicos. Aquí, los datos son el único lenguaje válido.",
    back: "Volver al Feed",
    featured: "DESTACADA",
    sources: "Fuentes Verificadas:",
    popular: "NOTICIAS VIRALES",
    placeholderName: "Tu nombre...",
    actionButton: "Unirse a Infoxity",
    activeDebates: "DEBATES EN VIVO",
    publish: "Publicar Argumento",
    footerText: "INFOXITY 2026 © LA NUEVA ERA DE LA INFORMACIÓN"
  },
  en: {
    siteName: "Infoxity",
    tagline: "The Pulse of Intellectual Resistance",
    welcome: "Welcome to Infoxity.",
    onboarding: "The era of misinformation ends here. Enter your name to join the debate.",
    reading: "users analyzing this now",
    quickContext: "Critical Context",
    biasAnalysis: "AI Bias Audit",
    reputation: "Reputation Points",
    comments: "Open Debate Forum",
    postComment: "Write a fact-based argument...",
    vote: "Submit Vote",
    capture: "IG Capture Mode",
    audio: "Listen to News",
    identityTitle: "Why Infoxity?",
    identityBody: "Infoxity is a news ecosystem designed for Gen Z looking for depth over clickbait. We combine AI algorithms with human curation to deliver truth without ideological filters. Here, data is the only valid language.",
    back: "Back to Feed",
    featured: "FEATURED",
    sources: "Verified Sources:",
    popular: "VIRAL NEWS",
    placeholderName: "Your name...",
    actionButton: "Join Infoxity",
    activeDebates: "LIVE DEBATES",
    publish: "Post Argument",
    footerText: "INFOXITY 2026 © THE NEW ERA OF INFORMATION"
  }
};

// --- 2. BASE DE DATOS DE CONTENIDO ---
const NEWS_DATA = [
  {
    id: 1,
    category: "Geopolítica",
    categoryEn: "Geopolitics",
    title: "Venezuela y el Pacto del Caribe: El Regreso del Gigante Energético",
    titleEn: "Venezuela and the Caribbean Pact: The Return of the Energy Giant",
    context: "Washington y Caracas firman un acuerdo histórico basado en la necesidad de energía para las IAs globales.",
    content: `En enero de 2026, el mapa geopolítico ha dado un vuelco. El 'Pacto del Caribe' representa la victoria del pragmatismo sobre la ideología. Con la crisis energética golpeando los centros de datos en EE.UU., la administración Biden-Harris ha flexibilizado las sanciones para permitir el flujo masivo de crudo pesado. 

    Infoxity ha analizado los datos: esto no es una alianza política, es una simbiosis técnica. Venezuela se estabiliza económicamente a cambio de ser la batería de la revolución tecnológica del norte. Las fuentes indican que el 40% de los ingresos se destinará a infraestructura civil bajo supervisión internacional.`,
    bias: { objective: 96, factual: 94, emotional: 6 },
    poll: { question: "¿Crees que el petróleo sigue siendo el rey?", options: ["Absolutamente", "Está en decadencia", "Solo para la IA"] },
    color: "bg-amber-600",
    comments: [{ id: 1, user: "Mateo F.", rep: 1200, text: "El mundo se mueve por energía, no por banderas. 🔋", type: "pro" }]
  },
  {
    id: 2,
    category: "Cultura",
    categoryEn: "Culture",
    title: "Stranger Things 5: El funeral del streaming tradicional",
    titleEn: "Stranger Things 5: The Funeral of Traditional Streaming",
    context: "Netflix admite que el maratón ha muerto: vuelve la exclusividad de las salas de cine.",
    content: `El estreno final de Stranger Things ha roto las reglas de Netflix. Al proyectar los episodios en cines antes que en la plataforma, la industria admite que la Gen Z valora la experiencia colectiva. Infoxity detecta un patrón: estamos volviendo a la 'Cultura de Evento'. El scroll infinito está siendo reemplazado por momentos que requieren atención plena y desconexión digital.`,
    bias: { objective: 90, factual: 92, emotional: 15 },
    poll: { question: "¿Irás al cine a ver el final?", options: ["Sí, es un evento", "Prefiero mi casa", "Depende del precio"] },
    color: "bg-purple-700",
    comments: [{ id: 2, user: "Sofia K.", rep: 850, text: "Necesitábamos algo que nos uniera fuera de las pantallas.", type: "pro" }]
  },
  {
    id: 3,
    category: "Deportes",
    categoryEn: "Sports",
    title: "Superliga 2026: El fútbol se vuelve gratuito y digital",
    titleEn: "Superleague 2026: Football Goes Free and Digital",
    context: "Florentino gana la batalla: partidos de 60 minutos para atraer a los jóvenes.",
    content: `La Superliga ya es una realidad. Con un modelo financiado por publicidad de alta precisión, los partidos ahora son gratuitos para todos. Las ligas tradicionales se enfrentan a un dilema: adaptarse o morir. Infoxity reporta que el tiempo de visualización entre jóvenes ha subido un 30% gracias a la eliminación de los tiempos muertos y el acceso libre desde dispositivos móviles.`,
    bias: { objective: 91, factual: 95, emotional: 10 },
    poll: { question: "¿Prefieres 90 o 60 minutos?", options: ["90 (Tradición)", "60 (Dinámico)", "Me da igual"] },
    color: "bg-blue-700",
    comments: [{ id: 3, user: "Dani Stream", rep: 2100, text: "Por fin fútbol gratis en 4K sin pagar suscripciones absurdas.", type: "pro" }]
  },
  {
    id: 4,
    category: "Política",
    categoryEn: "Politics",
    title: "Generación Z: El fin de la Izquierda y la Derecha",
    titleEn: "Gen Z: The End of Left and Right",
    context: "El pragmatismo líquido sustituye a las ideologías del siglo XX en las urnas.",
    content: `Para un joven de 2026, ser 'de izquierdas' o 'de derechas' es tan antiguo como usar un teléfono con cables. Infoxity identifica el surgimiento de la 'Política Basada en Resultados'. Los nuevos votantes exigen libertad económica total junto con protecciones sociales agresivas. No es una contradicción, es lógica de optimización. El sistema de partidos actual está colapsando ante esta falta de lealtad dogmática.`,
    bias: { objective: 98, factual: 96, emotional: 4 },
    poll: { question: "¿Cómo te defines?", options: ["Pragmático", "Ideológico", "No me importa"] },
    color: "bg-emerald-700",
    comments: [{ id: 4, user: "Zoe Miller", rep: 4500, text: "Efficiency over dogma. That is our motto.", type: "pro" }]
  }
];

// --- 3. COMPONENTE DE ANÁLISIS ---
const BiasChart = ({ bias, lang }: { bias: any, lang: string }) => (
  <section className="mt-12 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-inner">
    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2 text-gray-400">
      <BarChart3 size={14} /> {lang === 'es' ? 'Auditoría de Veracidad IA' : 'AI Accuracy Audit'}
    </h4>
    <div className="space-y-6">
      {Object.entries(bias).map(([key, value]: [string, any]) => (
        <div key={key}>
          <div className="flex justify-between text-[10px] mb-2 uppercase font-black text-gray-500">
            <span>{key === 'objective' ? 'Objetividad' : key === 'factual' ? 'Hechos' : 'Emoción'}</span>
            <span>{value}%</span>
          </div>
          <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden shadow-sm">
            <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1 }} className={`h-full ${key === 'emotional' ? 'bg-rose-500' : 'bg-black'}`} />
          </div>
        </div>
      ))}
    </div>
  </section>
);

// --- 4. PÁGINA PRINCIPAL (INFOXITY) ---
export default function InfoxityApp() {
  const [user, setUser] = useState<{name: string, rep: number} | null>(null);
  const [userName, setUserName] = useState("");
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [readerCount, setReaderCount] = useState(7240);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [isCaptureMode, setIsCaptureMode] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [activeComments, setActiveComments] = useState<any[]>([]);

  useEffect(() => {
    const int = setInterval(() => setReaderCount(p => p + (Math.floor(Math.random()*12)-5)), 3000);
    return () => clearInterval(int);
  }, []);

  const t = TRANSLATIONS[lang];

  // Vista de Onboarding (SEO: Sin contenido oculto)
  if (!user) {
    return (
      <main className="fixed inset-0 bg-[#FBFBFB] z-[100] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full p-12 rounded-[4rem] border border-gray-100 shadow-3xl bg-white text-center">
          <header className="mb-10">
            <div className="bg-black text-white inline-block px-10 py-3 font-black text-4xl italic tracking-tighter shadow-2xl mb-8">IX</div>
            <h1 className="text-3xl font-black tracking-tight mb-2">{t.welcome}</h1>
            <p className="text-gray-400 text-sm leading-relaxed px-4">{t.onboarding}</p>
          </header>
          <div className="space-y-4">
            <input 
              type="text" placeholder={t.placeholderName}
              className="w-full p-6 rounded-[2rem] border border-gray-100 outline-none bg-gray-50 focus:ring-2 ring-black transition-all font-medium text-center"
              onChange={(e) => setUserName(e.target.value)}
            />
            <button 
              disabled={!userName}
              onClick={() => setUser({ name: userName, rep: 150 })}
              className="w-full bg-black text-white p-6 rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl disabled:opacity-20"
            >
              {t.actionButton}
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-20">
      
      {/* HEADER SEMÁNTICO (SEO) */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-gray-50 z-50 px-6 md:px-12 py-5 flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setSelectedNews(null)}>
          <div className="bg-black text-white px-4 py-1.5 font-black text-2xl italic tracking-tighter group-hover:rotate-3 transition-transform">IX</div>
          <div className="hidden sm:block">
            <h2 className="font-black text-xs uppercase tracking-[0.3em] leading-none">{t.siteName}</h2>
            <p className="text-[8px] font-bold text-gray-300 uppercase mt-1 tracking-widest">{t.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3 text-[10px] font-mono bg-gray-50 px-5 py-2.5 rounded-full border border-gray-100">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative rounded-full h-2 w-2 bg-green-500"></span></span>
            <span className="text-gray-400 font-black">INF_SYSTEM: <span className="text-black">{readerCount}</span> {t.reading}</span>
          </div>
          <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="p-3 hover:bg-black hover:text-white border border-gray-100 rounded-2xl transition-all font-black text-[10px] uppercase">
            {lang}
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL (SEO) */}
      <main className="pt-32 px-4 md:px-12 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedNews ? (
            <motion.section key="feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-12 gap-10">
              
              {/* HERO ARTICLE */}
              <article className="md:col-span-12 lg:col-span-8 group">
                <div className="bg-black text-white p-12 md:p-24 rounded-[4rem] relative overflow-hidden h-full flex flex-col justify-end min-h-[550px] shadow-3xl">
                  <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none"><Shield size={400} /></div>
                  <div className="relative z-10">
                    <span className="text-[10px] font-black tracking-[0.6em] text-amber-400 mb-8 block uppercase flex items-center gap-2"><Zap size={16} fill="currentColor"/> {t.popular}</span>
                    <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.9] mb-10">{t.identityTitle}</h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl leading-relaxed">{t.identityBody}</p>
                  </div>
                </div>
              </article>

              {/* GRID DE NOTICIAS */}
              {NEWS_DATA.map((news) => (
                <article 
                  key={news.id} 
                  onClick={() => { setSelectedNews(news); setActiveComments(news.comments); window.scrollTo(0,0); }}
                  className="md:col-span-6 lg:col-span-4 bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-3xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl ${news.color}`}>
                        {lang === 'es' ? news.category : news.categoryEn}
                      </span>
                      <TrendingUp size={20} className="text-gray-100 group-hover:text-black transition-colors" />
                    </div>
                    <h2 className="text-3xl font-black mb-6 tracking-tighter leading-tight group-hover:underline decoration-2 underline-offset-8">
                      {lang === 'es' ? news.title : news.titleEn}
                    </h2>
                    <p className="text-gray-400 text-sm italic font-medium">"{news.context}"</p>
                  </div>
                  <div className="mt-12 flex items-center justify-between border-t border-gray-50 pt-8">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">{t.activeDebates}</span>
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all"><ChevronRight size={24} /></div>
                  </div>
                </article>
              ))}
            </motion.section>
          ) : (
            <motion.article 
              key="post" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={`max-w-4xl mx-auto ${isCaptureMode ? 'p-16 border-[12px] border-black rounded-[5rem] shadow-3xl bg-white' : 'pb-40'}`}
            >
              {!isCaptureMode && (
                <nav className="mb-12">
                  <button onClick={() => setSelectedNews(null)} className="flex items-center gap-3 text-[10px] font-black uppercase text-gray-300 hover:text-black transition-all tracking-widest">
                    <ChevronRight size={20} className="rotate-180" /> {t.back}
                  </button>
                </nav>
              )}

              <header className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-5 py-2 bg-black text-white text-[10px] font-black rounded-full tracking-widest shadow-xl uppercase">{t.featured}</span>
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">/ Data_Node: {selectedNews.id}</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.95] text-black">
                  {lang === 'es' ? selectedNews.title : selectedNews.titleEn}
                </h1>
              </header>

              <div className="p-10 md:p-14 rounded-[3.5rem] border-l-[12px] border-black bg-gray-50 mb-16 shadow-inner">
                <p className="text-2xl italic font-bold text-gray-700 leading-snug italic">"{selectedNews.context}"</p>
              </div>

              <section className="prose prose-2xl max-w-none text-gray-800 font-serif leading-relaxed mb-24 space-y-10">
                {selectedNews.content.split('\n\n').map((p: string, i: number) => (
                  <p key={i} className="first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:mt-2">{p}</p>
                ))}
              </section>

              {!isCaptureMode && (
                <section className="space-y-32">
                  <BiasChart bias={selectedNews.bias} lang={lang} />
                  
                  {/* ENCUESTA */}
                  <div className="bg-black text-white p-14 md:p-20 rounded-[4rem] shadow-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Scale size={300} /></div>
                    <h3 className="text-4xl font-black mb-12 tracking-tighter leading-none relative z-10">{selectedNews.poll.question}</h3>
                    <div className="grid gap-4 relative z-10">
                      {selectedNews.poll.options.map((opt: string, i: number) => (
                        <button key={i} className="w-full p-8 rounded-[2rem] border border-white/10 hover:bg-white hover:text-black transition-all text-left font-black text-xl flex justify-between">
                          {opt} <ExternalLink size={20} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* DEBATES */}
                  <section className="bg-white rounded-[4rem] border border-gray-100 p-12 shadow-2xl">
                    <h3 className="text-4xl font-black mb-16 tracking-tighter flex items-center gap-4"><MessageSquare size={40}/> {t.comments}</h3>
                    <div className="flex gap-6 mb-20 items-start">
                      <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 shadow-2xl">{user.name[0]}</div>
                      <div className="flex-1">
                        <textarea 
                          className="w-full bg-gray-50 border border-gray-100 p-8 rounded-[2.5rem] outline-none min-h-[200px] text-xl font-medium focus:ring-4 ring-black/5"
                          placeholder={t.postComment}
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button 
                          onClick={() => { if(newComment.trim()) { setActiveComments([{ id: Date.now(), user: user.name, rep: user.rep, text: newComment, type: 'user' }, ...activeComments]); setNewComment(""); } }}
                          className="mt-6 px-12 py-5 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
                        >
                          {t.publish}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-12">
                      {activeComments.map(c => (
                        <motion.div key={c.id} layout className={`p-10 rounded-[3rem] border-l-[8px] ${c.type === 'user' ? 'border-amber-400 bg-amber-50/20' : 'border-gray-50 bg-gray-50/30'}`}>
                          <div className="flex justify-between items-center mb-6">
                            <span className="font-black text-sm uppercase tracking-tight">{c.user}</span>
                            <div className="px-4 py-1.5 bg-black/5 rounded-full text-[10px] font-black uppercase flex items-center gap-2"><Award size={12} className="text-amber-500" /> {c.rep} PTS</div>
                          </div>
                          <p className="text-gray-600 text-xl font-medium leading-relaxed">{c.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </section>
              )}
              {isCaptureMode && (
                <button onClick={() => setIsCaptureMode(false)} className="mt-12 w-full p-8 bg-black text-white font-black uppercase tracking-widest rounded-[2rem] shadow-3xl">Finalizar Captura</button>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER SEMÁNTICO (SEO) */}
      <footer className="mt-60 py-32 border-t border-gray-50 text-center relative overflow-hidden">
        <div className="relative z-10">
          <div className="bg-black text-white inline-block px-8 py-3 font-black text-3xl italic mb-10 shadow-2xl">IX</div>
          <div className="flex justify-center gap-10 mb-12 text-gray-400 font-black text-[10px] uppercase tracking-widest">
            <a href="#" className="hover:text-black transition-colors">Twitter_X</a>
            <a href="#" className="hover:text-black transition-colors">Instagram_IX</a>
            <a href="#" className="hover:text-black transition-colors">Manifesto</a>
            <a href="#" className="hover:text-black transition-colors">Newsletter</a>
          </div>
          <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.6em]">{t.footerText}</p>
        </div>
      </footer>

      {/* READING BAR */}
      {selectedNews && !isCaptureMode && (
        <motion.div className="fixed bottom-0 left-0 h-2 bg-black z-[60]" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.5 }} />
      )}
    </div>
  );
}
