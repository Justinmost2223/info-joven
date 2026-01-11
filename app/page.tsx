"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ShieldCheck, MessageSquare, Share2, Bookmark, 
  Volume2, BarChart3, ChevronDown, Languages, Award, Camera 
} from 'lucide-react';

// --- Tipos ---
type Language = 'es' | 'en';

interface Comment {
  id: number;
  author: string;
  text: string;
  points: number;
  tone: 'pro' | 'con' | 'neutral';
}

interface NewsItem {
  id: number;
  category: string;
  title: Record<Language, string>;
  context: Record<Language, string>;
  content: Record<Language, string>;
  bias: number; // 0 to 100 (Objectivity)
  source: string;
  votes: { label: Record<Language, string>; count: number }[];
}

// --- Datos de Noticias (Infoxity) ---
const NEWS_DATA: NewsItem[] = [
  {
    id: 1,
    category: "Geopolítica",
    title: { 
      es: "El Pulso Energético 2026: Venezuela y EE.UU. en la Nueva Guerra Fría", 
      en: "The 2026 Energy Pulse: Venezuela and USA in the New Cold War" 
    },
    context: { 
      es: "Resumen: El petróleo pesado vuelve a ser el eje tras la crisis de semiconductores.", 
      en: "Summary: Heavy oil is back in focus following the semiconductor crisis." 
    },
    content: {
      es: "En 2026, la geopolítica ha dado un vuelco inesperado. La administración actual de Washington ha tenido que sentarse a negociar con Caracas bajo una premisa simple: supervivencia energética. Tras el colapso de las rutas del Ártico y la inestabilidad en Oriente Medio, las reservas venezolanas son el último bastión de estabilidad para la industria pesada estadounidense. Sin embargo, no es un cheque en blanco. La Gen Z observa este movimiento con escepticismo, analizando si el pragmatismo económico justifica el sacrificio de los valores democráticos que ambos países dicen defender. ¿Es este el fin del idealismo diplomático? Los datos sugieren que estamos entrando en una era de 'Realpolitik 2.0', donde el litio y el crudo dictan la moral. Las redes sociales se inundan de debates sobre la soberanía de los recursos naturales frente a la necesidad de una red energética global integrada.",
      en: "In 2026, geopolitics has taken an unexpected turn. The current Washington administration has had to sit down and negotiate with Caracas under a simple premise: energy survival. Following the collapse of Arctic routes and instability in the Middle East, Venezuelan reserves are the last bastion of stability for US heavy industry. However, it is not a blank check. Gen Z watches this movement with skepticism, analyzing whether economic pragmatism justifies the sacrifice of democratic values that both countries claim to defend. Is this the end of diplomatic idealism? Data suggests we are entering an era of 'Realpolitik 2.0', where lithium and crude dictate morality."
    },
    bias: 94,
    source: "Global Energy Forum / Reuters Archive 2026",
    votes: [
      { label: { es: "Pragmatismo necesario", en: "Necessary Pragmatism" }, count: 154 },
      { label: { es: "Traición ética", en: "Ethical Betrayal" }, count: 89 }
    ]
  },
  {
    id: 2,
    category: "Cultura Pop",
    title: { 
      es: "Stranger Things 5: El réquiem del streaming tradicional", 
      en: "Stranger Things 5: The Requiem of Traditional Streaming" 
    },
    context: { 
      es: "Resumen: El estreno más caro de la historia marca el fin de los modelos de suscripción actuales.", 
      en: "Summary: The most expensive premiere in history marks the end of current subscription models." 
    },
    content: {
      es: "El estreno de la última temporada de Stranger Things no es solo un evento cultural, es el acta de defunción del modelo de 'binge-watching' tal como lo conocíamos. Netflix ha implementado por primera vez un sistema de 'asistencia virtual' donde la narrativa cambia según el debate colectivo en tiempo real. Esto marca el fin de la era pasiva. Los jóvenes ya no quieren solo ver; quieren habitar el contenido. Con presupuestos que superan los 500 millones de dólares, la industria se pregunta si este nivel de producción es sostenible o si estamos ante el último suspiro de los gigantes del streaming antes de ser devorados por plataformas de IA generativa personalizables. La nostalgia de los 80 choca con la tecnología de 2026, creando un meta-comentario sobre el consumo de medios.",
      en: "The premiere of the final season of Stranger Things is not just a cultural event; it is the death certificate of the 'binge-watching' model as we knew it. Netflix has implemented for the first time a 'virtual assistance' system where the narrative changes based on collective real-time debate. This marks the end of the passive era. Young people no longer just want to watch; they want to inhabit the content. With budgets exceeding $500 million, the industry wonders if this level of production is sustainable."
    },
    bias: 91,
    source: "Variety Tech & Hollywood Reporter",
    votes: [
      { label: { es: "Evolución necesaria", en: "Necessary Evolution" }, count: 210 },
      { label: { es: "Exceso comercial", en: "Commercial Excess" }, count: 45 }
    ]
  }
];

// --- Componentes ---

export default function InfoxityApp() {
  const [user, setUser] = useState<{name: string, surname: string} | null>(null);
  const [lang, setLang] = useState<Language>('es');
  const [readers, setReaders] = useState(4500);
  const [saved, setSaved] = useState<number[]>([]);
  const [screenshotMode, setScreenshotMode] = useState<number | null>(null);

  // Contador dinámico
  useEffect(() => {
    const interval = setInterval(() => {
      setReaders(prev => {
        const diff = Math.floor(Math.random() * 200) - 100;
        const next = prev + diff;
        return next < 2000 ? 2000 : next > 10000 ? 10000 : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUser({ 
      name: formData.get('name') as string, 
      surname: formData.get('surname') as string 
    });
  };

  const toggleSave = (id: number) => {
    setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className={`min-h-screen bg-slate-50 font-sans text-slate-900 transition-colors duration-500`}>
      
      {/* --- Modal de Acceso --- */}
      <AnimatePresence>
        {!user && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-md p-4"
          >
            <motion.form 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              onSubmit={handleLogin}
              className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full"
            >
              <h2 className="text-3xl font-bold mb-2 text-indigo-600">Infoxity</h2>
              <p className="text-slate-500 mb-6 font-medium">
                {lang === 'es' ? 'Bienvenido a la resistencia intelectual. Introduce tus datos para debatir.' : 'Welcome to the intellectual resistance. Enter your details to debate.'}
              </p>
              <input name="name" required placeholder="Nombre / Name" className="w-full mb-4 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
              <input name="surname" required placeholder="Apellido / Surname" className="w-full mb-6 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
              <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all">
                {lang === 'es' ? 'ENTRAR' : 'ENTER'}
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Header --- */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 px-4 py-4 lg:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-indigo-600">INFOXITY</span>
          <div className="hidden md:flex items-center bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
              IF(infojoven) {readers.toLocaleString()} {lang === 'es' ? 'leyendo ahora' : 'reading now'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="p-2 hover:bg-slate-100 rounded-full transition-colors flex items-center gap-2 font-bold text-sm">
            <Languages size={20} />
            <span className="hidden sm:inline uppercase">{lang}</span>
          </button>
          {user && (
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
              <span className="text-xs font-bold">{user.name[0]}{user.surname[0]}</span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* --- Sección: ¿Por qué Infojoven? --- */}
        <section className="mb-20 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 lg:p-16 text-white overflow-hidden relative shadow-2xl">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
              {lang === 'es' ? '¿Por qué Infoxity?' : 'Why Infoxity?'}
            </h1>
            <p className="text-xl lg:text-2xl font-light text-indigo-100 max-w-3xl leading-relaxed">
              {lang === 'es' 
                ? 'Somos un equipo de IA y humanos que limpian el ruido mediático. Ofrecemos noticias objetivas, largas y analíticas, diseñadas para que los jóvenes cultos debatan con respeto y datos. No más clickbait, solo la verdad cruda y estructurada.'
                : 'We are a team of AI and humans clearing media noise. We offer objective, long-form analytical news designed for cultured youth to debate with respect and data. No more clickbait, just raw, structured truth.'}
            </p>
          </motion.div>
        </section>

        {/* --- Noticias --- */}
        <div className="space-y-32">
          {NEWS_DATA.map((news) => (
            <article key={news.id} className="relative">
              {/* Botón de Captura / Instagram */}
              <div className="absolute right-0 top-0 flex gap-2">
                <button 
                  onClick={() => setScreenshotMode(screenshotMode === news.id ? null : news.id)}
                  className="p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                  title="Modo Instagram"
                >
                  <Camera size={22} />
                </button>
                <button 
                  onClick={() => toggleSave(news.id)}
                  className={`p-3 rounded-full transition-all shadow-sm ${saved.includes(news.id) ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}
                >
                  <Bookmark size={22} />
                </button>
              </div>

              {/* Contenedor de Noticia */}
              <motion.div 
                className={`transition-all duration-700 ${screenshotMode === news.id ? 'bg-black text-white p-12 rounded-3xl ring-8 ring-indigo-500/20' : ''}`}
                layout
              >
                <span className="text-indigo-600 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
                   {news.category}
                </span>
                
                <h2 className={`text-4xl lg:text-6xl font-bold mb-8 leading-tight ${screenshotMode === news.id ? 'text-white' : 'text-slate-900'}`}>
                  {news.title[lang]}
                </h2>

                {/* Contexto Rápido */}
                <div className={`mb-8 p-6 rounded-2xl border-l-4 border-indigo-500 ${screenshotMode === news.id ? 'bg-white/10 border-white' : 'bg-indigo-50/50'}`}>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                    <ShieldCheck size={14} /> {lang === 'es' ? 'Contexto Rápido' : 'Quick Context'}
                  </h4>
                  <p className="text-lg italic opacity-80">{news.context[lang]}</p>
                </div>

                {/* Audio Reader Placeholder */}
                <button className="flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors">
                  <Volume2 size={18} />
                  <span className="text-sm font-bold uppercase tracking-tighter">
                    {lang === 'es' ? 'Escuchar versión de audio' : 'Listen to audio version'}
                  </span>
                </button>

                <div className={`prose prose-xl max-w-none leading-relaxed mb-12 ${screenshotMode === news.id ? 'text-slate-300' : 'text-slate-600 font-serif'}`}>
                  {news.content[lang]}
                </div>

                <div className="flex flex-wrap items-center gap-6 mb-12 py-6 border-y border-slate-100">
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <BarChart3 size={16} />
                      {lang === 'es' ? 'Objetividad IA:' : 'AI Objectivity:'} 
                      <span className="text-green-500">{news.bias}%</span>
                   </div>
                   <div className="text-xs font-bold text-slate-400">
                      {lang === 'es' ? 'Fuente:' : 'Source:'} <span className="underline">{news.source}</span>
                   </div>
                   {screenshotMode === news.id && (
                     <div className="ml-auto text-indigo-400 font-black text-xl tracking-tighter">
                        INFOXITY.2026
                     </div>
                   )}
                </div>

                {/* Encuesta */}
                <div className={`p-8 rounded-[2rem] mb-12 ${screenshotMode === news.id ? 'hidden' : 'bg-slate-900 text-white shadow-2xl'}`}>
                   <h3 className="text-2xl font-bold mb-6">{lang === 'es' ? 'Tu turno: ¿Qué opinas?' : 'Your turn: Opinion?'}</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {news.votes.map((vote, idx) => (
                       <button key={idx} className="group relative overflow-hidden bg-white/10 p-6 rounded-2xl hover:bg-white/20 transition-all text-left">
                          <div className="flex justify-between items-center relative z-10">
                            <span className="font-bold">{vote.label[lang]}</span>
                            <span className="text-indigo-400 font-mono">{vote.count}</span>
                          </div>
                          <div className="absolute bottom-0 left-0 h-1 bg-indigo-500 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                       </button>
                     ))}
                   </div>
                </div>

                {/* Sección Comentarios */}
                {!screenshotMode && (
                  <CommentSection lang={lang} user={user} />
                )}
              </motion.div>
            </article>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 px-4 text-center">
        <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">
          &copy; 2026 Infoxity Media Group - {lang === 'es' ? 'La resistencia intelectual' : 'The Intellectual Resistance'}
        </p>
      </footer>
    </div>
  );
}

function CommentSection({ lang, user }: { lang: Language, user: any }) {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: "Mateo Fernández", text: "Esto es exactamente lo que necesitaba leer. Menos ruido, más datos. 📊", points: 156, tone: 'pro' },
    { id: 2, author: "Valeria Rojas", text: "Sigo sin ver clara la postura ética de la IA aquí. ¿Quién entrena al analista?", points: 89, tone: 'neutral' },
    { id: 3, author: "Iñaki Zurita", text: "Un poco ingenuo pensar que Venezuela cambiará solo por el petróleo. Pero buen análisis.", points: 42, tone: 'con' }
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment) return;
    const comment: Comment = {
      id: Date.now(),
      author: `${user.name} ${user.surname}`,
      text: newComment,
      points: 0,
      tone: 'neutral'
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="mt-12">
      <h3 className="text-xl font-black mb-8 flex items-center gap-2">
        <MessageSquare size={20} className="text-indigo-600" />
        {lang === 'es' ? 'DEBATE ABIERTO' : 'OPEN DEBATE'}
      </h3>

      <form onSubmit={handleSubmit} className="mb-8">
        <textarea 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={lang === 'es' ? "Escribe tu argumento respetuoso..." : "Write your respectful argument..."}
          className="w-full p-6 rounded-2xl bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[120px]"
        />
        <button className="mt-4 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all">
          {lang === 'es' ? 'Publicar Comentario' : 'Post Comment'}
        </button>
      </form>

      <div className="space-y-6">
        {comments.map(c => (
          <div key={c.id} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{c.author}</span>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full text-[10px] font-black border border-amber-100">
                  <Award size={10} /> {c.points} RP
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                c.tone === 'pro' ? 'bg-green-100 text-green-700' : 
                c.tone === 'con' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {c.tone}
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
