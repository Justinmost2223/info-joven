"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Languages, Award, Bookmark, 
  BookmarkCheck, CheckCircle2, ArrowLeft, Mic2, 
  Volume2, Pause, Star, Camera, Share2, Play,
  TrendingUp, Scale
} from 'lucide-react';

// --- ENGINE DE DATOS TOTAL (ES/EN) ---
const DATABASE = {
  es: {
    site: "Infoxity",
    welcome: "Bienvenido a la Resistencia Intelectual.",
    onboarding: "Limpiamos el ruido mediático. Introduce tu identidad para participar.",
    reading: "leyendo ahora",
    quickContext: "Contexto Crítico",
    biasAudit: "Auditoría de IA",
    rep: "puntos",
    debate: "Foro de Debate",
    input: "Escribe un argumento con datos...",
    captureBtn: "Modo Captura IG",
    featured: "DESTACADA",
    voteThanks: "Gracias por votar",
    placeholder: "Nombre y Apellido...",
    back: "Volver",
    listen: "Escuchar noticia",
    stop: "Detener audio",
    news: [
      {
        id: 1,
        cat: "Geopolítica",
        title: "Venezuela 2026: El Nuevo Eje Energético Global",
        ctx: "El acuerdo secreto entre Washington y Caracas para alimentar las granjas de servidores de IA en EE.UU.",
        body: "En enero de 2026, la diplomacia energética ha dado un giro inesperado. Ante el consumo masivo de electricidad de los nuevos modelos de AGI, EE.UU. ha firmado el 'Pacto del Caribe' con Venezuela. Este acuerdo implica el levantamiento de sanciones a cambio de crudo destinado exclusivamente a la generación eléctrica de centros de datos. El análisis de Infoxity revela que este movimiento estabiliza la economía regional pero genera una nueva dependencia tecnológica.",
        poll: { q: "¿Es ético priorizar la IA sobre las sanciones?", opts: ["Pragmatismo", "Error histórico", "Neutral"], votes: [840, 310, 120] },
        comments: [
          { u: "Mateo Fernández", r: 1250, t: "La energía manda sobre la ideología. 🔋" },
          { u: "Valeria Rojas", r: 890, t: "¿Y el impacto ambiental? Nadie habla de eso." },
          { u: "Santi Ramos", r: 450, t: "Es un movimiento brillante para bajar la inflación." },
          { u: "Lucía Méndez", r: 2100, t: "Venezuela tiene una oportunidad única de reconstruirse." },
          { u: "Diego Sánchez", r: 320, t: "Cuidado con las dependencias a largo plazo." },
          { u: "Elena Pozo", r: 780, t: "Pragmatismo puro. Me gusta. 👏" },
          { u: "Marcos Gil", r: 150, t: "La geopolítica es un tablero de ajedrez muy complejo." },
          { u: "Sara Ruiz", r: 990, t: "Esto cambiará el mapa de Latam para siempre." },
          { u: "Javier Sol", r: 410, t: "Interesante análisis, Infoxity." },
          { u: "Nora Vega", r: 120, t: "No confío en estos pactos rápidos." },
          { u: "Raúl Peña", r: 670, t: "Energía por tecnología, trato justo." },
          { u: "Sofía Luna", r: 2300, t: "Es el fin de una era de aislamiento." },
          { u: "Hugo Mora", r: 55, t: "Debatamos con datos: ¿cuánto crudo se enviará?" }
        ]
      },
      {
        id: 2,
        cat: "Cultura",
        title: "Stranger Things 5: El Fin del Binge-Watching",
        ctx: "Netflix abandona el modelo de 'todo de golpe' para salvar su relevancia cultural.",
        body: "El estreno de la última temporada de Stranger Things marca el funeral del maratón. Netflix lanzará episodios quincenalmente. El análisis indica que el modelo de 'atracón' destruía la conversación social. Ahora buscan 'escasez artificial' para elevar el valor publicitario un 300%. Los jóvenes ya no quieren consumir solos; buscan la validación del debate grupal ritualista.",
        poll: { q: "¿Prefieres esperar o maratón?", opts: ["Esperar (Hype)", "Maratón (Ya)", "Me da igual"], votes: [1200, 450, 200] },
        comments: Array.from({length: 28}, (_, i) => ({
          u: ["Carlos Ruiz", "Ana Belén", "Pol Espargaró", "Julia Valls", "Iker Casals", "Marta Fox", "Lucas T.", "Berta S."][i%8] + " " + (i + 1),
          r: 100 + (i * 35),
          t: ["El hype semanal es mejor 📺", "Quiero ver todo ya!", "Netflix al fin entiende.", "Marketing puro.", "Vuelve la TV ritual.", "Debate grupal activado.", "Mejor para evitar spoilers.", "La espera vale la pena.", "Estrategia de retención.", "Más valor por mi dinero.", "Se extrañaba el estreno semanal.", "No me gusta esperar.", "Analicemos el guion.", "Es el fin de una era.", "Interesante cambio.", "Publicidad everywhere.", "Hype al máximo.", "Stranger Things es leyenda.", "Fin del binge.", "Genial para el fandom.", "Debate intenso.", "Quincenal es mucho.", "Mejor semanal.", "Paciencia...", "Data driven decision.", "Gran noticia.", "Social viewing.", "The end."][i%28]
        }))
      },
      {
        id: 3,
        cat: "Política",
        title: "Gen Z: El Fin de la Izquierda y la Derecha",
        ctx: "El 70% de los jóvenes votantes se declaran 'Pragmáticos Radicales'.",
        body: "Las etiquetas tradicionales han colapsado. La Gen Z ya no vota por bloques ideológicos, sino por 'paquetes de soluciones'. Un joven puede defender el mercado libre y la nacionalización de la vivienda al mismo tiempo. Se denomina 'Ideología Líquida', centrada en la eficiencia técnica y la transparencia algorítmica por encima del dogma político.",
        poll: { q: "¿Te definen las etiquetas?", opts: ["No, Pragmatismo", "Sí, soy fiel", "Las etiquetas sobran"], votes: [1500, 200, 800] },
        comments: Array.from({length: 15}, (_, i) => ({
          u: ["Roberto J.", "Lara M.", "Dani G.", "Paula S.", "Enzo F.", "Mireia L.", "Oscar B."][i%7] + " " + (i + 1),
          r: 300 + (i * 60),
          t: ["Etiquetas del siglo XX.", "Voto gestión, no colores.", "Eficiencia > Ideología.", "Voto volátil.", "Partidos asustados. 😎", "Post-ideología real.", "Datos antes que promesas.", "Adiós bipartidismo.", "Soluciones líquidas.", "Tecnocracia Gen Z.", "Nueva era política.", "Pragmatismo radical.", "Sin bandos.", "Política 2.0.", "Resultados ya."][i%15]
        }))
      }
    ]
  },
  en: {
    site: "Infoxity",
    welcome: "Welcome to the Intellectual Resistance.",
    onboarding: "We clear media noise. Enter your identity to join the debate.",
    reading: "reading now",
    quickContext: "Critical Context",
    biasAudit: "AI Audit",
    rep: "points",
    debate: "Community Debate",
    input: "Write a fact-based argument...",
    captureBtn: "IG Capture Mode",
    featured: "FEATURED",
    voteThanks: "Thanks for voting",
    placeholder: "Full Name...",
    back: "Back",
    listen: "Listen to news",
    stop: "Stop audio",
    news: [
      {
        id: 1,
        cat: "Geopolitics",
        title: "Venezuela 2026: The New Global Energy Axis",
        ctx: "Secret agreement between Washington and Caracas to power AI server farms in the US.",
        body: "In January 2026, energy diplomacy took an unexpected turn. Due to massive power consumption by AGI models, the US signed the 'Caribbean Pact' with Venezuela. This agreement involves lifting sanctions in exchange for crude destined exclusively for data center power generation. Infoxity analysis reveals this stabilizes the regional economy but creates a new technological dependency.",
        poll: { q: "Is it ethical to prioritize AI over sanctions?", opts: ["Pragmatism", "Historical error", "Neutral"], votes: [840, 310, 120] },
        comments: [
          { u: "Mateo Fernández", r: 1250, t: "Energy rules over ideology. 🔋" },
          { u: "Valeria Rojas", r: 890, t: "What about environmental impact? No one talks about it." },
          { u: "Santi Ramos", r: 450, t: "Brilliant move to lower inflation." },
          { u: "Lucía Méndez", r: 2100, t: "Venezuela has a unique chance to rebuild." },
          { u: "Diego Sánchez", r: 320, t: "Watch out for long-term dependencies." },
          { u: "Elena Pozo", r: 780, t: "Pure pragmatism. I like it. 👏" },
          { u: "Marcos Gil", r: 150, t: "Geopolitics is a complex chess board." },
          { u: "Sara Ruiz", r: 990, t: "This will change Latam's map forever." },
          { u: "Javier Sol", r: 410, t: "Interesting analysis, Infoxity." },
          { u: "Nora Vega", r: 120, t: "I don't trust quick pacts." },
          { u: "Raúl Peña", r: 670, t: "Energy for technology, fair trade." },
          { u: "Sofía Luna", r: 2300, t: "It's the end of an isolation era." },
          { u: "Hugo Mora", r: 55, t: "Let's debate with data: how much crude?" }
        ]
      },
      {
        id: 2,
        cat: "Culture",
        title: "Stranger Things 5: The End of Binge-Watching",
        ctx: "Netflix abandons 'all-at-once' model to save cultural relevance.",
        body: "The final season premiere marks the funeral of the binge-watch. Netflix will release episodes bi-weekly. Analysis suggests 'at-once' models destroyed social conversation in under 48 hours. Now they seek 'artificial scarcity' to raise ad value by 300%. Youth no longer want to consume alone; they seek ritualistic group debate validation.",
        poll: { q: "Wait or Binge?", opts: ["Wait (Hype)", "Binge (Now)", "Indifferent"], votes: [1200, 450, 200] },
        comments: Array.from({length: 28}, (_, i) => ({
          u: ["Carlos Ruiz", "Ana Belén", "Pol Espargaró", "Julia Valls", "Iker Casals", "Marta Fox", "Lucas T.", "Berta S."][i%8] + " " + (i + 1),
          r: 100 + (i * 35),
          t: ["Weekly hype is better 📺", "I want it all now!", "Netflix finally gets it.", "Pure marketing.", "Ritual TV returns.", "Group debate activated.", "Better to avoid spoilers.", "Wait is worth it.", "Retention strategy.", "More value for money.", "Missed weekly premieres.", "I hate waiting.", "Let's analyze the script.", "End of an era.", "Interesting change.", "Ads everywhere.", "Max hype.", "Stranger Things is legend.", "End of binge.", "Great for the fandom.", "Intense debate.", "Bi-weekly is too much.", "Weekly is better.", "Patience...", "Data driven decision.", "Great news.", "Social viewing.", "The end."][i%28]
        }))
      },
      {
        id: 3,
        cat: "Politics",
        title: "Gen Z: The End of Left and Right",
        ctx: "70% of young voters declare themselves 'Radical Pragmatists'.",
        body: "Traditional labels have collapsed. Gen Z no longer votes for ideological blocks, but for 'solution packages'. A young person might defend free markets and housing nationalization at the same time. It's called 'Liquid Ideology', focused on technical efficiency and algorithmic transparency over political dogma.",
        poll: { q: "Do labels define you?", opts: ["No, Pragmatism", "Yes, Loyal", "Labels are useless"], votes: [1500, 200, 800] },
        comments: Array.from({length: 15}, (_, i) => ({
          u: ["Roberto J.", "Lara M.", "Dani G.", "Paula S.", "Enzo F.", "Mireia L.", "Oscar B."][i%7] + " " + (i + 1),
          r: 300 + (i * 60),
          t: ["20th-century labels.", "I vote management, not colors.", "Efficiency > Ideology.", "Volatile vote.", "Parties are scared. 😎", "Real post-ideology.", "Data over promises.", "Goodbye bi-partisanship.", "Liquid solutions.", "Gen Z technocracy.", "New political era.", "Radical pragmatism.", "No sides.", "Politics 2.0.", "Results now."][i%15]
        }))
      }
    ]
  }
};

export default function InfoxityFullApp() {
  const [user, setUser] = useState<{name: string, rep: number} | null>(null);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [votedPolls, setVotedPolls] = useState<Record<number, number>>({});
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const t = DATABASE[lang];
  const selected = t.news.find(n => n.id === selectedId);

  // Audio System
  const toggleSpeech = (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
      utterance.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVote = (newsId: number, optIndex: number) => {
    if (votedPolls[newsId] !== undefined) return;
    setVotedPolls(prev => ({ ...prev, [newsId]: optIndex }));
  };

  if (!user) {
    return (
      <main className="fixed inset-0 bg-white z-[100] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 text-center bg-white">
          <div className="bg-black text-white inline-block px-6 py-1 font-black text-4xl italic mb-6 tracking-tighter">IX</div>
          <h1 className="text-2xl font-black mb-4 tracking-tight">{t.welcome}</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">{t.onboarding}</p>
          <input 
            type="text" placeholder={t.placeholder} 
            className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-100 mb-4 font-bold text-center outline-none focus:ring-2 ring-black"
            onChange={(e) => setNameInput(e.target.value)}
          />
          <button onClick={() => nameInput && setUser({ name: nameInput, rep: 100 })} className="w-full bg-black text-white p-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all">
            {lang === 'es' ? 'COMENZAR' : 'START'}
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-700 ${isCapturing ? 'bg-zinc-950 p-4 md:p-12' : 'bg-white'}`}>
      
      {/* HEADER DINÁMICO */}
      {!isCapturing && (
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setSelectedId(null); window.speechSynthesis.cancel(); setIsSpeaking(false); }}>
            <div className="bg-black text-white px-3 py-0.5 font-black text-xl italic">IX</div>
            <span className="font-black text-xs uppercase tracking-[0.3em] hidden sm:block">{t.site}</span>
          </div>
          <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="flex items-center gap-2 px-4 py-2 border border-black rounded-full font-black text-[10px] uppercase hover:bg-black hover:text-white transition-all">
            <Languages size={14}/> {lang === 'es' ? 'English' : 'Español'}
          </button>
        </header>
      )}

      <main className={`max-w-6xl mx-auto ${isCapturing ? 'pt-0' : 'pt-24 pb-20 px-4'}`}>
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
              
              {/* HERO */}
              <section className="bg-black text-white p-10 md:p-20 rounded-[4rem] relative overflow-hidden flex flex-col justify-end min-h-[450px] shadow-2xl">
                <div className="absolute top-10 right-10 text-white/5 rotate-12"><Shield size={350} /></div>
                <div className="relative z-10">
                  <span className="text-amber-400 font-black text-[10px] tracking-[0.5em] mb-6 block uppercase">{t.featured}</span>
                  <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.9] mb-8">
                    {lang === 'es' ? 'INFÓRMATE SIN RUIDO' : 'NEWS WITHOUT NOISE'}
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed">
                    {lang === 'es' ? 'Noticias puras, auditoría por IA y debate de alto nivel.' : 'Pure news, AI auditing, and high-level community debate.'}
                  </p>
                </div>
              </section>

              {/* GRID DE NOTICIAS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.news.map(n => (
                  <motion.div 
                    key={n.id} whileHover={{ y: -10 }} 
                    onClick={() => { setSelectedId(n.id); window.scrollTo(0,0); }}
                    className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between min-h-[420px]"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-6 block">{n.cat}</span>
                      <h3 className="text-2xl font-black leading-tight mb-4">{n.title}</h3>
                      <p className="text-gray-400 text-sm italic font-medium leading-relaxed">"{n.ctx}"</p>
                    </div>
                    <div className="flex justify-between items-center pt-8 border-t border-gray-50 mt-8">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400">
                        <MessageSquare size={14}/> {n.comments.length}
                      </div>
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all"><ChevronRight size={18}/></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.article 
              key="post" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className={`max-w-4xl mx-auto ${isCapturing ? 'bg-white p-12 md:p-20 rounded-[4rem] border-[20px] border-zinc-900' : 'pb-20'}`}
            >
              {/* ACCIONES SUPERIORES */}
              {!isCapturing && (
                <div className="flex justify-between items-center mb-12">
                  <button onClick={() => { setSelectedId(null); window.speechSynthesis.cancel(); setIsSpeaking(false); }} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-colors">
                    <ArrowLeft size={16}/> {t.back}
                  </button>
                  <div className="flex gap-4">
                    <button onClick={() => toggleSpeech(`${selected.title}. ${selected.body}`)} className="p-3 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all shadow-lg active:scale-90">
                      {isSpeaking ? <Pause size={22}/> : <Play size={22}/>}
                    </button>
                    <button onClick={() => { setIsCapturing(true); window.speechSynthesis.cancel(); setIsSpeaking(false); }} className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase shadow-xl hover:scale-105 active:scale-95 transition-all">
                      <Camera size={16}/> {t.captureBtn}
                    </button>
                  </div>
                </div>
              )}

              {/* TITULARES */}
              <header className="mb-12">
                <span className="text-[12px] font-black uppercase text-blue-600 tracking-[0.4em] mb-6 block">{selected.cat}</span>
                <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-[0.9] mb-10 text-zinc-900">
                  {selected.title}
                </h1>
                <div className="bg-zinc-50 p-8 rounded-[2.5rem] border-l-[10px] border-black shadow-inner">
                  <h4 className="text-[10px] font-black uppercase text-gray-400 mb-3 flex items-center gap-2 tracking-widest"><Mic2 size={12}/> {t.quickContext}</h4>
                  <p className="text-xl md:text-2xl font-bold italic text-zinc-700 leading-snug">"{selected.ctx}"</p>
                </div>
              </header>

              {/* CUERPO DE NOTICIA */}
              <section className="prose prose-xl max-w-none text-zinc-800 font-serif leading-relaxed mb-16 space-y-8 text-lg md:text-xl">
                {selected.body.split('\n\n').map((p:string, i:number) => (
                  <p key={i} className="first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-black">{p}</p>
                ))}
              </section>

              {/* MODO CAPTURA BRANDING */}
              {isCapturing && (
                <div className="mt-20 pt-12 border-t-4 border-black flex justify-between items-end">
                  <div className="flex items-center gap-4">
                    <div className="bg-black text-white px-5 py-1 font-black text-4xl italic">IX</div>
                    <p className="text-[14px] font-black uppercase tracking-[0.3em] text-zinc-900">{t.site}_MEDIA</p>
                  </div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">2026 © Resistance</p>
                </div>
              )}

              {/* CONTENIDO INTERACTIVO (SÓLO WEB) */}
              {!isCapturing && (
                <>
                  {/* AUDITORÍA IA */}
                  <div className="mb-16 p-10 bg-zinc-50 rounded-[3.5rem] border border-zinc-100">
                    <h5 className="text-[10px] font-black uppercase tracking-widest mb-10 flex items-center gap-2 text-zinc-400 font-bold"><BarChart3 size={16}/> {t.biasAudit}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      {[92, 95, 100].map((v, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-[10px] font-black uppercase mb-3">
                            <span>{lang === 'es' ? ["Objetividad", "Hechos", "Neutralidad"][i] : ["Objectivity", "Facts", "Neutrality"][i]}</span>
                            <span>{v}%</span>
                          </div>
                          <div className="h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} className="h-full bg-black"/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ENCUESTA MATEMÁTICA REAL */}
                  <div className="mb-20 bg-zinc-900 text-white p-10 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Scale size={250}/></div>
                    <h3 className="text-3xl font-black mb-10 relative z-10">{selected.poll.q}</h3>
                    <div className="space-y-4 relative z-10">
                      {selected.poll.opts.map((o:string, i:number) => {
                        const hasVoted = votedPolls[selected.id] !== undefined;
                        const votes = [...selected.poll.votes];
                        if (hasVoted && votedPolls[selected.id] === i) votes[i]++;
                        const total = votes.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((votes[i] / total) * 100);

                        return (
                          <button 
                            key={i} 
                            disabled={hasVoted}
                            onClick={() => handleVote(selected.id, i)}
                            className={`w-full relative p-6 rounded-2xl text-left font-bold transition-all border-2 overflow-hidden ${hasVoted ? 'border-transparent' : 'border-white/10 hover:bg-white/5'}`}
                          >
                            {hasVoted && (
                              <motion.div 
                                initial={{ width: 0 }} animate={{ width: `${percentage}%` }} 
                                className="absolute left-0 top-0 h-full bg-white/10"
                              />
                            )}
                            <div className="relative z-10 flex justify-between items-center">
                              <span>{o}</span>
                              {hasVoted && <span className="font-black text-xl">{percentage}%</span>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {votedPolls[selected.id] !== undefined && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center text-amber-400 font-black uppercase text-[10px] tracking-[0.5em]">{t.voteThanks}</motion.p>
                    )}
                  </div>

                  {/* DEBATE MASIVO */}
                  <section className="bg-white border border-gray-100 p-8 md:p-14 rounded-[4rem] shadow-xl">
                    <h3 className="text-3xl font-black mb-12 flex items-center gap-4 tracking-tighter"><MessageSquare size={30}/> {t.debate}</h3>
                    <div className="space-y-8 max-h-[700px] overflow-y-auto pr-4 no-scrollbar">
                      {selected.comments.map((c:any, i:number) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 hover:border-black/10 transition-colors">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-black text-sm text-zinc-900">{c.u}</span>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-[9px] font-black uppercase shadow-sm">
                              <Award size={12}/> {c.r} {t.rep}
                            </div>
                          </div>
                          <p className="text-zinc-600 font-medium text-[15px] leading-relaxed italic">"{c.t}"</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {/* BOTÓN CERRAR CAPTURA */}
              {isCapturing && (
                <button 
                  onClick={() => setIsCapturing(false)}
                  className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] shadow-2xl border-4 border-black z-[100] active:scale-95 transition-all"
                >
                  {lang === 'es' ? 'SALIR DE CAPTURA' : 'EXIT CAPTURE'}
                </button>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      {!isCapturing && (
        <footer className="py-24 border-t border-gray-100 text-center">
          <div className="bg-black text-white inline-block px-8 py-2 font-black text-3xl italic mb-6">IX</div>
          <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.6em] px-4 leading-loose">
            Infoxity 2026 © Information Sovereignty & Digital Excellence <br/>
            {lang === 'es' ? 'La verdad no necesita gritar.' : 'Truth doesn\'t need to shout.'}
          </p>
        </footer>
      )}
    </div>
  );
}
