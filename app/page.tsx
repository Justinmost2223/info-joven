"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Languages, Award, Bookmark, 
  BookmarkCheck, CheckCircle2, ArrowLeft, Mic2, 
  TrendingUp, Scale, Star, Camera, Share2, Volume2, X
} from 'lucide-react';

// --- DATA ENGINE (IDIOMAS Y CONTENIDO MASIVO) ---
const CONTENT = {
  es: {
    site: "Infoxity",
    welcome: "Bienvenido a la Resistencia Intelectual.",
    onboarding: "Limpiamos el ruido mediático. Introduce tu identidad para participar.",
    reading: "leyendo ahora",
    quickContext: "Contexto Crítico",
    biasAudit: "Auditoría de IA",
    rep: "pts",
    debate: "Foro de Debate",
    input: "Escribe un argumento con datos...",
    publish: "Publicar Argumento",
    captureBtn: "Modo Captura IG",
    featured: "LA QUINTA NOTICIA",
    myLibrary: "Guardados",
    voteThanks: "Voto registrado con éxito",
    placeholder: "Nombre y Apellido...",
    back: "Volver al Feed",
    actionButton: "Entrar a la Red",
    identityTitle: "¿Por qué INFOXITY?",
    identityBody: "Somos un colectivo híbrido de IA y humanos. En un mundo de clickbait, ofrecemos noticias objetivas, largas y analíticas. Diseñadas para que mentes cultas debatan con respeto y datos. Aquí no hay bandos, solo hechos.",
    news: [
      {
        id: 1,
        cat: "Geopolítica",
        title: "Venezuela 2026: El Nuevo Eje Energético Global",
        ctx: "El acuerdo secreto entre Washington y Caracas para alimentar las granjas de servidores de IA en EE.UU.",
        body: "En enero de 2026, la diplomacia energética ha dado un giro inesperado. Ante el consumo masivo de electricidad de los nuevos modelos de AGI, EE.UU. ha firmado el 'Pacto del Caribe' con Venezuela. El análisis revela que este movimiento estabiliza la economía regional pero genera una nueva dependencia tecnológica. Mientras el mundo miraba hacia las renovables, la urgencia de la computación ha devuelto el poder a las reservas fósiles más grandes del mundo.\n\nEste cambio de paradigma sugiere que la soberanía de datos ahora depende de la soberanía energética. Los analistas prevén que Caracas se convierta en el 'hub' eléctrico de Occidente, redefiniendo las alianzas en el hemisferio sur.",
        poll: { q: "¿Es ético priorizar la IA sobre las sanciones?", opts: ["Pragmatismo Necesario", "Error Histórico", "Neutral"] },
        source: "Energy Intelligence Hub / Reuters 2026",
        comments: [
          { u: "Mateo Fernández", r: 1250, t: "La energía manda, las ideologías solo adornan. 🔋" },
          { u: "Valeria Rojas", r: 890, t: "¿Y el impacto ambiental? Nadie habla de eso." },
          { u: "Santi Ramos", r: 450, t: "Es un movimiento brillante para bajar la inflación." }
        ]
      },
      {
        id: 2,
        cat: "Cultura",
        title: "Stranger Things 5: El Fin del Binge-Watching",
        ctx: "Netflix abandona el modelo de 'todo de golpe' para salvar su relevancia cultural.",
        body: "El estreno de la última temporada de Stranger Things marca el funeral del maratón. Netflix lanzará episodios quincenalmente. El análisis indica que el modelo de 'atracón' destruía la conversación social. Ahora buscan 'escasez artificial' para elevar el valor publicitario un 300%. Los jóvenes ya no quieren consumir solos; buscan la validación del debate grupal ritualista.\n\nEsta estrategia responde a una caída en la retención de marca. Al espaciar el contenido, Infoxity detecta que el 'engagement' social se multiplica por cinco, permitiendo que la cultura pop respire en lugar de ser devorada en una noche.",
        poll: { q: "¿Prefieres esperar o maratón?", opts: ["Esperar (Genera Hype)", "Maratón (Lo quiero ya)", "Me es indiferente"] },
        source: "Variety Tech Media Insight",
        comments: Array.from({length: 15}, (_, i) => ({
          u: ["Carlos Ruiz", "Ana Belén", "Pol Espargaró", "Julia Valls", "Iker Casals"][i%5] + " " + (i + 17),
          r: 100 + (i * 45),
          t: ["El hype semanal es mucho mejor! 📺", "Odio esperar, quiero ver todo ya.", "Netflix ha tardado mucho en entender esto.", "Es marketing puro, pero funciona.", "Vuelve la TV de antes, qué curioso."][i%5]
        }))
      },
      {
        id: 3,
        cat: "Política",
        title: "Gen Z: El Fin de la Izquierda y la Derecha",
        ctx: "El 70% de los jóvenes votantes se declaran 'Pragmáticos Radicales'.",
        body: "Las etiquetas tradicionales han colapsado. La Gen Z ya no vota por bloques ideológicos, sino por 'paquetes de soluciones'. Un joven puede defender el mercado libre y la nacionalización de la vivienda al mismo tiempo. Se denomina 'Ideología Líquida', centrada en la eficiencia técnica y la transparencia algorítmica por encima del dogma.\n\nLos partidos tradicionales están en crisis. El análisis de Infoxity muestra que el voto joven de 2026 se mueve por resultados métricos y no por discursos emocionales, marcando el inicio de la era de la 'Tecno-Política'.",
        poll: { q: "¿Te definen las etiquetas políticas?", opts: ["No, soy pragmático", "Sí, soy fiel a un bando", "Las etiquetas sobran"] },
        source: "Political Analytics Gen Z Report",
        comments: Array.from({length: 13}, (_, i) => ({
          u: ["Roberto J.", "Lara M.", "Dani G.", "Paula S.", "Enzo F."][i%5] + " " + (i + 26),
          r: 300 + (i * 80),
          t: ["Las etiquetas son del siglo XX.", "Yo solo voto gestión, no colores.", "Eficiencia > Ideología. Siempre.", "Mi voto es volátil y eso es bueno.", "Los partidos están asustados y se nota. 😎"][i%5]
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
    rep: "pts",
    debate: "Community Debate",
    input: "Write a fact-based argument...",
    publish: "Post Argument",
    captureBtn: "IG Capture Mode",
    featured: "THE FIFTH NEWS",
    myLibrary: "Saved",
    voteThanks: "Vote registered successfully",
    placeholder: "Full Name...",
    back: "Back to Feed",
    actionButton: "Enter Network",
    identityTitle: "Why INFOXITY?",
    identityBody: "We are a hybrid collective of AI and humans. In a world of clickbait, we offer objective, long-form analytical news. Designed for cultured minds to debate with respect and data. No sides here, just facts.",
    news: [
      {
        id: 1,
        cat: "Geopolitics",
        title: "Venezuela 2026: The New Global Energy Axis",
        ctx: "Secret agreement between Washington and Caracas to power AI server farms in the US.",
        body: "In January 2026, energy diplomacy took an unexpected turn. Due to massive power consumption by AGI models, the US signed the 'Caribbean Pact' with Venezuela. Analysis reveals this stabilizes the regional economy but creates new tech dependency. While the world focused on renewables, computing urgency returned power to the world's largest fossil reserves.",
        poll: { q: "Is it ethical to prioritize AI over sanctions?", opts: ["Necessary Pragmatism", "Historical Error", "Neutral"] },
        source: "Energy Intelligence Hub / Reuters 2026",
        comments: [
          { u: "Mateo Fernández", r: 1250, t: "Energy rules, ideologies are just decoration. 🔋" },
          { u: "Valeria Rojas", r: 890, t: "What about the environmental impact? Silence." },
          { u: "Santi Ramos", r: 450, t: "Brilliant move to lower inflation." }
        ]
      },
      {
        id: 2,
        cat: "Culture",
        title: "Stranger Things 5: The End of Binge-Watching",
        ctx: "Netflix abandons 'all-at-once' model to save cultural relevance.",
        body: "The final season premiere marks the funeral of the marathon. Netflix will release episodes bi-weekly. Analysis suggests 'binging' destroyed social conversation. They now seek 'artificial scarcity' to raise ad value by 300%. Youth no longer want to consume alone; they seek ritualistic group debate validation.",
        poll: { q: "Wait or Binge?", opts: ["Wait (Build Hype)", "Binge (I want it now)", "Indifferent"] },
        source: "Variety Tech Media Insight",
        comments: Array.from({length: 15}, (_, i) => ({
          u: ["Carlos Ruiz", "Ana Belén", "Pol Espargaró", "Julia Valls", "Iker Casals"][i%5] + " " + (i + 17),
          r: 100 + (i * 45),
          t: ["Weekly hype is much better! 📺", "I hate waiting, I want it all now.", "Netflix took too long to understand this.", "Pure marketing, but it works.", "Old TV returns, interesting."][i%5]
        }))
      },
      {
        id: 3,
        cat: "Politics",
        title: "Gen Z: The End of Left and Right",
        ctx: "70% of young voters declare themselves 'Radical Pragmatists'.",
        body: "Traditional labels have collapsed. Gen Z no longer votes by ideological blocks, but by 'solution packages'. A young voter might defend free markets and housing nationalization simultaneously. It's called 'Liquid Ideology', focusing on technical efficiency and algorithmic transparency over dogma.",
        poll: { q: "Do labels define you?", opts: ["No, Pragmatic", "Yes, Loyal", "Labels are useless"] },
        source: "Political Analytics Gen Z Report",
        comments: Array.from({length: 13}, (_, i) => ({
          u: ["Roberto J.", "Lara M.", "Dani G.", "Paula S.", "Enzo F."][i%5] + " " + (i + 26),
          r: 300 + (i * 80),
          t: ["Labels are 20th-century junk.", "I only vote for management, not colors.", "Efficiency > Ideology. Always.", "My vote is volatile and that's good.", "Parties are scared and it shows. 😎"][i%5]
        }))
      }
    ]
  }
};

export default function InfoxityFinal() {
  const [user, setUser] = useState<{name: string, rep: number} | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [userComments, setUserComments] = useState<Record<number, any[]>>({});
  const [voted, setVoted] = useState<number[]>([]);
  const [readers, setReaders] = useState(7240);

  const t = CONTENT[lang];
  const selected = useMemo(() => t.news.find(n => n.id === selectedId), [selectedId, lang]);

  // Contador dinámico
  useEffect(() => {
    const interval = setInterval(() => {
      setReaders(prev => prev + Math.floor(Math.random() * 11) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handlePostComment = () => {
    if (!commentText.trim() || !selectedId) return;
    const newComment = { u: user?.name, r: user?.rep, t: commentText, isUser: true };
    setUserComments(prev => ({
      ...prev,
      [selectedId]: [newComment, ...(prev[selectedId] || [])]
    }));
    setCommentText("");
  };

  if (!user) {
    return (
      <main className="fixed inset-0 bg-white z-[100] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full p-10 rounded-[3rem] shadow-2xl border border-gray-100 text-center bg-white">
          <div className="bg-black text-white inline-block px-6 py-1 font-black text-4xl italic mb-6">IX</div>
          <h1 className="text-2xl font-black mb-4 tracking-tight">{t.welcome}</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">{t.onboarding}</p>
          <input 
            type="text" placeholder={t.placeholder} 
            className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-100 mb-4 font-bold text-center outline-none focus:ring-2 ring-black transition-all"
            onChange={(e) => setNameInput(e.target.value)}
          />
          <button onClick={() => nameInput && setUser({ name: nameInput, rep: 150 })} className="w-full bg-black text-white p-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95">
            {t.actionButton}
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-700 ${isCapturing ? 'bg-zinc-950 p-4 md:p-12' : 'bg-slate-50'}`}>
      
      {/* HEADER */}
      {!isCapturing && (
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedId(null)}>
            <div className="bg-black text-white px-3 py-0.5 font-black text-xl italic">IX</div>
            <span className="font-black text-xs uppercase tracking-[0.3em] hidden sm:block">{t.site}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-gray-50 px-4 py-2 rounded-full border border-gray-100 gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{readers.toLocaleString()} {t.reading}</span>
            </div>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="p-2 border border-gray-200 rounded-xl hover:bg-black hover:text-white transition-all">
              <Languages size={18} />
            </button>
            <div className="flex items-center gap-2 ml-2">
               <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                 {user.name[0]}
               </div>
            </div>
          </div>
        </header>
      )}

      <main className={`max-w-6xl mx-auto ${isCapturing ? 'pt-0' : 'pt-24 pb-20 px-4 md:px-8'}`}>
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
              
              {/* SECCIÓN IDENTIDAD INFOXITY */}
              <section className="bg-gradient-to-br from-indigo-600 to-black text-white p-10 md:p-20 rounded-[3rem] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 transition-transform hover:rotate-0 duration-1000">
                  <Shield size={400} />
                </div>
                <div className="relative z-10">
                  <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black tracking-[0.3em] mb-8 inline-block uppercase">{t.featured}</span>
                  <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-none mb-8 max-w-4xl">{t.identityTitle}</h2>
                  <p className="text-lg md:text-2xl text-indigo-100 font-light max-w-2xl leading-relaxed">{t.identityBody}</p>
                </div>
              </section>

              {/* GRID DE NOTICIAS */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.news.map(n => (
                  <motion.div 
                    key={n.id} whileHover={{ y: -8 }}
                    onClick={() => { setSelectedId(n.id); window.scrollTo(0,0); }}
                    className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between min-h-[420px]"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">{n.cat}</span>
                        <button onClick={(e) => handleSave(n.id, e)} className="text-gray-300 hover:text-indigo-600 transition-colors">
                          {savedIds.includes(n.id) ? <BookmarkCheck className="text-indigo-600" /> : <Bookmark />}
                        </button>
                      </div>
                      <h3 className="text-2xl font-black leading-tight mb-4 group-hover:text-indigo-600 transition-colors">{n.title}</h3>
                      <p className="text-gray-400 text-sm italic line-clamp-3">"{n.ctx}"</p>
                    </div>
                    <div className="flex justify-between items-center pt-6 border-t border-gray-50 mt-8">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase text-gray-400">
                        <span className="flex items-center gap-1"><MessageSquare size={14}/> {n.comments.length}</span>
                        <span className="flex items-center gap-1"><TrendingUp size={14}/> +12%</span>
                      </div>
                      <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                        <ChevronRight size={18}/>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </section>
            </motion.div>
          ) : (
            <motion.article 
              key="post" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              className={`max-w-4xl mx-auto transition-all duration-700 ${isCapturing ? 'bg-white p-12 md:p-24 rounded-[4rem] border-[20px] border-zinc-900' : 'pb-20'}`}
            >
              {/* ACCIONES SUPERIORES */}
              {!isCapturing && (
                <div className="flex justify-between items-center mb-10">
                  <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-colors">
                    <ArrowLeft size={16}/> {t.back}
                  </button>
                  <div className="flex gap-2">
                    <button onClick={() => setIsCapturing(true)} className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase shadow-xl hover:scale-105 active:scale-95 transition-all">
                      <Camera size={14}/> {t.captureBtn}
                    </button>
                  </div>
                </div>
              )}

              {/* CONTENIDO PRINCIPAL */}
              <header className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[12px] font-black uppercase text-indigo-600 tracking-[0.3em]">{selected.cat}</span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
                <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-[0.95] mb-10 text-zinc-900">
                  {selected.title}
                </h1>
                
                <div className="flex gap-4 mb-12">
                   <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black uppercase hover:bg-indigo-600 hover:text-white transition-all">
                     <Volume2 size={14} /> Listen Audio
                   </button>
                   <button onClick={(e) => handleSave(selected.id, e)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black uppercase hover:bg-indigo-600 hover:text-white transition-all">
                     {savedIds.includes(selected.id) ? <BookmarkCheck size={14}/> : <Bookmark size={14}/>} {savedIds.includes(selected.id) ? 'Saved' : 'Save'}
                   </button>
                </div>

                <div className="bg-indigo-50/50 p-8 rounded-[2.5rem] border-l-[8px] border-indigo-600 mb-12">
                  <h4 className="text-[10px] font-black uppercase text-indigo-400 mb-2 flex items-center gap-2">
                    <Shield size={12}/> {t.quickContext}
                  </h4>
                  <p className="text-xl md:text-2xl font-bold italic text-slate-800 leading-tight">"{selected.ctx}"</p>
                </div>
              </header>

              <section className="prose prose-xl max-w-none text-zinc-800 font-serif leading-relaxed mb-16 space-y-8">
                {selected.body.split('\n\n').map((p:string, i:number) => (
                  <p key={i} className="first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-indigo-600">{p}</p>
                ))}
              </section>

              {/* FOOTER MODO CAPTURA */}
              {isCapturing && (
                <div className="mt-20 pt-10 border-t-4 border-black flex justify-between items-end">
                  <div>
                    <div className="bg-black text-white inline-block px-4 py-1 font-black text-3xl italic mb-2">IX</div>
                    <p className="text-[12px] font-black uppercase tracking-widest text-zinc-900">Infoxity_Network</p>
                  </div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter">Resistencia Intelectual 2026</p>
                </div>
              )}

              {!isCapturing && (
                <>
                  {/* ANÁLISIS DE SESGO */}
                  <div className="mb-16 p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
                    <h5 className="text-[10px] font-black uppercase tracking-widest mb-10 flex items-center gap-2 text-gray-400">
                      <BarChart3 size={14}/> {t.biasAudit}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      {[94, 98, 92].map((v, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-[10px] font-black uppercase mb-3">
                            <span className="text-gray-500">{[lang === 'es' ? "Objetividad" : "Objectivity", lang === 'es' ? "Hechos" : "Facts", lang === 'es' ? "Neutralidad" : "Neutrality"][i]}</span>
                            <span className="text-indigo-600">{v}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{duration: 1, delay: 0.5}} className="h-full bg-indigo-600"/>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-8 text-[10px] text-gray-400 italic">Source: {selected.source}</p>
                  </div>

                  {/* ENCUESTA DINÁMICA */}
                  <div className="mb-20 bg-zinc-900 text-white p-10 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Scale size={200}/></div>
                    <h3 className="text-3xl font-black mb-10 max-w-lg">{selected.poll.q}</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {selected.poll.opts.map((o:string, i:number) => (
                        <button 
                          key={i} onClick={() => !voted.includes(selected.id) && setVoted([...voted, selected.id])}
                          className={`w-full p-6 border-2 rounded-2xl text-left font-bold transition-all flex justify-between items-center group ${voted.includes(selected.id) ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white hover:bg-white hover:text-black'}`}
                        >
                          {o} 
                          {voted.includes(selected.id) ? <CheckCircle2 className="text-indigo-400" /> : <ChevronRight className="opacity-0 group-hover:opacity-100" size={18}/>}
                        </button>
                      ))}
                    </div>
                    {voted.includes(selected.id) && (
                      <motion.p initial={{opacity: 0}} animate={{opacity: 1}} className="mt-8 text-center text-indigo-400 font-black uppercase text-[10px] tracking-[0.5em]">
                        {t.voteThanks}
                      </motion.p>
                    )}
                  </div>

                  {/* SECCIÓN DE DEBATE */}
                  <section className="bg-white border border-gray-100 p-8 md:p-14 rounded-[4rem] shadow-xl">
                    <h3 className="text-3xl font-black mb-12 flex items-center gap-4">
                      <MessageSquare size={32} className="text-indigo-600"/> {t.debate}
                    </h3>
                    
                    {/* INPUT DEL USUARIO */}
                    <div className="flex gap-4 mb-16">
                      <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black shrink-0 text-2xl shadow-lg shadow-indigo-200">
                        {user.name[0]}
                      </div>
                      <div className="flex-1">
                        <textarea 
                          placeholder={t.input}
                          className="w-full bg-slate-50 p-6 rounded-[2rem] outline-none focus:ring-4 ring-indigo-50 font-medium text-lg min-h-[140px] border border-transparent focus:border-indigo-100 transition-all"
                          value={commentText} onChange={(e) => setCommentText(e.target.value)}
                        />
                        <div className="flex justify-end mt-4">
                          <button onClick={handlePostComment} className="px-10 py-4 bg-indigo-600 text-white rounded-full font-black text-[12px] uppercase tracking-widest shadow-xl shadow-indigo-200 hover:bg-black active:scale-95 transition-all">
                            {t.publish}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* LISTA DE COMENTARIOS */}
                    <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                      {/* Comentarios del usuario actual */}
                      {(userComments[selected.id] || []).map((c, i) => (
                        <motion.div key={`user-${i}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <span className="font-black text-sm text-indigo-900">{c.u} (Tú)</span>
                            <div className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-full text-[9px] font-black uppercase">
                              <Star size={10} fill="currentColor"/> NUEVO
                            </div>
                          </div>
                          <p className="text-indigo-800 font-medium text-[16px] leading-relaxed italic">"{c.t}"</p>
                        </motion.div>
                      ))}

                      {/* Comentarios estáticos */}
                      {selected.comments.map((c:any, i:number) => (
                        <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <span className="font-black text-sm text-zinc-900">{c.u}</span>
                            <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-[9px] font-black uppercase tracking-tighter">
                              <Award size={10}/> {c.r} {t.rep}
                            </div>
                          </div>
                          <p className="text-zinc-600 font-medium text-[16px] leading-relaxed italic">"{c.t}"</p>
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
                  className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-12 py-5 rounded-full font-black uppercase tracking-widest shadow-2xl border-2 border-white/20 z-[100] flex items-center gap-3 hover:bg-zinc-800 transition-all"
                >
                  <X size={20}/> Cerrar Captura
                </button>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      {!isCapturing && (
        <footer className="py-20 bg-white border-t border-gray-100 text-center">
          <div className="bg-black text-white inline-block px-6 py-2 font-black text-3xl italic mb-6">IX</div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.5em] px-6 max-w-xl mx-auto leading-loose">
            Infoxity 2026 © Information Sovereignty & Digital Excellence<br/>
            Clean News for a Liquid Generation
          </p>
        </footer>
      )}

      {/* CSS PARA SCROLLBAR */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
