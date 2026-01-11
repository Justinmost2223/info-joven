"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MessageSquare, ChevronRight, BarChart3, 
  Instagram, Languages, Award, Bookmark, 
  BookmarkCheck, CheckCircle2, ArrowLeft, Mic2, 
  TrendingUp, Scale, Star, Camera, Share2
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
    captureBtn: "Modo Captura IG",
    featured: "DESTACADA",
    myLibrary: "Mi Biblioteca",
    voteThanks: "Voto registrado",
    placeholder: "Nombre y Apellido...",
    back: "Volver",
    news: [
      {
        id: 1,
        cat: "Geopolítica",
        title: "Venezuela 2026: El Nuevo Eje Energético Global",
        ctx: "El acuerdo secreto entre Washington y Caracas para alimentar las granjas de servidores de IA en EE.UU.",
        body: "En enero de 2026, la diplomacia energética ha dado un giro inesperado. Ante el consumo masivo de electricidad de los nuevos modelos de AGI, EE.UU. ha firmado el 'Pacto del Caribe' con Venezuela. El análisis revela que este movimiento estabiliza la economía regional pero genera una nueva dependencia tecnológica. Mientras el mundo miraba hacia las renovables, la urgencia de la computación ha devuelto el poder a las reservas fósiles más grandes del mundo.",
        poll: { q: "¿Es ético priorizar la IA sobre las sanciones?", opts: ["Pragmatismo", "Error histórico", "Neutral"] },
        comments: [
          { u: "Mateo Fernández", r: 1250, t: "La energía manda, las ideologías solo adornan. 🔋" },
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
        poll: { q: "¿Prefieres esperar o maratón?", opts: ["Esperar (Hype)", "Maratón (Ya)", "Me da igual"] },
        comments: Array.from({length: 28}, (_, i) => ({
          u: ["Carlos Ruiz", "Ana Belén", "Pol Espargaró", "Julia Valls", "Iker Casals", "Marta Fox"][i%6] + " " + i,
          r: 100 + (i * 45),
          t: ["El hype semanal es mucho mejor! 📺", "Odio esperar, quiero ver todo ya.", "Netflix ha tardado mucho en entender esto.", "Es marketing puro, pero funciona.", "Vuelve la TV de antes, qué curioso.", "Mis amigos y yo ya tenemos grupo de debate."][i%6]
        }))
      },
      {
        id: 3,
        cat: "Política",
        title: "Gen Z: El Fin de la Izquierda y la Derecha",
        ctx: "El 70% de los jóvenes votantes se declaran 'Pragmáticos Radicales'.",
        body: "Las etiquetas tradicionales han colapsado. La Gen Z ya no vota por bloques ideológicos, sino por 'paquetes de soluciones'. Un joven puede defender el mercado libre y la nacionalización de la vivienda al mismo tiempo. Se denomina 'Ideología Líquida', centrada en la eficiencia técnica y la transparencia algorítmica por encima del dogma.",
        poll: { q: "¿Te definen las etiquetas?", opts: ["No, soy pragmático", "Sí, soy fiel", "Las etiquetas sobran"] },
        comments: Array.from({length: 15}, (_, i) => ({
          u: ["Roberto J.", "Lara M.", "Dani G.", "Paula S.", "Enzo F."][i%5] + " " + i,
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
    captureBtn: "IG Capture Mode",
    featured: "FEATURED",
    myLibrary: "My Library",
    voteThanks: "Vote registered",
    placeholder: "Full Name...",
    back: "Back",
    news: [
      {
        id: 1,
        cat: "Geopolitics",
        title: "Venezuela 2026: The New Global Energy Axis",
        ctx: "Secret agreement between Washington and Caracas to power AI server farms in the US.",
        body: "In January 2026, energy diplomacy took an unexpected turn. Due to massive power consumption by AGI models, the US signed the 'Caribbean Pact' with Venezuela. Analysis reveals this stabilizes the regional economy but creates new tech dependency. While the world focused on renewables, computing urgency returned power to the world's largest fossil reserves.",
        poll: { q: "Is it ethical to prioritize AI over sanctions?", opts: ["Pragmatism", "Historical error", "Neutral"] },
        comments: [
          { u: "Mateo Fernández", r: 1250, t: "Energy rules, ideologies are just decoration. 🔋" },
          { u: "Valeria Rojas", r: 890, t: "What about the environmental impact? Silence." },
          { u: "Santi Ramos", r: 450, t: "Brilliant move to lower inflation." },
          { u: "Lucía Méndez", r: 2100, t: "Venezuela has a unique chance to rebuild." },
          { u: "Diego Sánchez", r: 320, t: "Watch out for long-term dependencies." },
          { u: "Elena Pozo", r: 780, t: "Pure pragmatism. I like it. 👏" },
          { u: "Marcos Gil", r: 150, t: "Geopolitics is a complex chess board." },
          { u: "Sara Ruiz", r: 990, t: "This will change Latam's map forever." },
          { u: "Javier Sol", r: 410, t: "Interesting analysis, Infoxity." },
          { u: "Nora Vega", r: 120, t: "I don't trust these quick pacts." },
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
        body: "The final season premiere marks the funeral of the marathon. Netflix will release episodes bi-weekly. Analysis suggests 'binging' destroyed social conversation. They now seek 'artificial scarcity' to raise ad value by 300%. Youth no longer want to consume alone; they seek ritualistic group debate validation.",
        poll: { q: "Wait or Binge?", opts: ["Wait (Hype)", "Binge (Now)", "Indifferent"] },
        comments: Array.from({length: 28}, (_, i) => ({
          u: ["Carlos Ruiz", "Ana Belén", "Pol Espargaró", "Julia Valls", "Iker Casals", "Marta Fox"][i%6] + " " + i,
          r: 100 + (i * 45),
          t: ["Weekly hype is much better! 📺", "I hate waiting, I want it all now.", "Netflix took too long to understand this.", "Pure marketing, but it works.", "Old TV returns, interesting.", "My friends and I have a debate group already."][i%6]
        }))
      },
      {
        id: 3,
        cat: "Politics",
        title: "Gen Z: The End of Left and Right",
        ctx: "70% of young voters declare themselves 'Radical Pragmatists'.",
        body: "Traditional labels have collapsed. Gen Z no longer votes by ideological blocks, but by 'solution packages'. A young voter might defend free markets and housing nationalization simultaneously. It's called 'Liquid Ideology', focusing on technical efficiency and algorithmic transparency over dogma.",
        poll: { q: "Do labels define you?", opts: ["No, Pragmatic", "Yes, Loyal", "Labels are useless"] },
        comments: Array.from({length: 15}, (_, i) => ({
          u: ["Roberto J.", "Lara M.", "Dani G.", "Paula S.", "Enzo F."][i%5] + " " + i,
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
  const [voted, setVoted] = useState<number[]>([]);

  const t = CONTENT[lang];
  const selected = useMemo(() => t.news.find(n => n.id === selectedId), [selectedId, lang]);

  if (!user) {
    return (
      <main className="fixed inset-0 bg-white z-[100] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full p-10 rounded-[3rem] shadow-2xl border border-gray-100 text-center bg-white">
          <div className="bg-black text-white inline-block px-6 py-1 font-black text-4xl italic mb-6">IX</div>
          <h1 className="text-2xl font-black mb-4 tracking-tight">{t.welcome}</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">{t.onboarding}</p>
          <input 
            type="text" placeholder={t.placeholder} 
            className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-100 mb-4 font-bold text-center outline-none focus:ring-2 ring-black"
            onChange={(e) => setNameInput(e.target.value)}
          />
          <button onClick={() => nameInput && setUser({ name: nameInput, rep: 100 })} className="w-full bg-black text-white p-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95">
            {t.actionButton || "Entrar"}
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isCapturing ? 'bg-zinc-950 p-4 md:p-12' : 'bg-white'}`}>
      
      {/* HEADER */}
      {!isCapturing && (
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 px-6 py-4 border-b border-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedId(null)}>
            <div className="bg-black text-white px-3 py-0.5 font-black text-xl italic">IX</div>
            <span className="font-black text-xs uppercase tracking-[0.3em] hidden sm:block">{t.site}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-50 px-4 py-2 rounded-full border border-gray-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">7,240 {t.reading}</span>
            </div>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="p-2 border border-gray-200 rounded-xl hover:bg-black hover:text-white transition-all">
              <Languages size={18} />
            </button>
          </div>
        </header>
      )}

      <main className={`max-w-6xl mx-auto ${isCapturing ? 'pt-0' : 'pt-28 pb-20 px-4 md:px-8'}`}>
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
              
              {/* POR QUÉ INFOXITY */}
              <section className="bg-black text-white p-10 md:p-20 rounded-[4rem] relative overflow-hidden flex flex-col justify-end min-h-[500px] shadow-3xl">
                <div className="absolute top-10 right-10 text-white/5 rotate-12"><Shield size={300} /></div>
                <div className="relative z-10">
                  <span className="text-amber-400 font-black text-[10px] tracking-[0.5em] mb-6 block uppercase">{t.featured}</span>
                  <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-none mb-8">{t.identityTitle || "¿Por qué Infoxity?"}</h2>
                  <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl leading-relaxed">{t.identityBody}</p>
                </div>
              </section>

              {/* GRID */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.news.map(n => (
                  <motion.div 
                    key={n.id} whileHover={{ y: -10 }}
                    onClick={() => { setSelectedId(n.id); window.scrollTo(0,0); }}
                    className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between min-h-[400px]"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-6 block">{n.cat}</span>
                      <h3 className="text-2xl font-black leading-tight mb-4">{n.title}</h3>
                      <p className="text-gray-400 text-sm italic">"{n.ctx}"</p>
                    </div>
                    <div className="flex justify-between items-center pt-8 border-t border-gray-50 mt-8">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase">
                        <MessageSquare size={14}/> {n.comments.length}
                      </div>
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all"><ChevronRight size={18}/></div>
                    </div>
                  </motion.div>
                ))}
              </section>
            </motion.div>
          ) : (
            <motion.article 
              key="post" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              className={`max-w-4xl mx-auto ${isCapturing ? 'bg-white p-10 md:p-20 rounded-[3rem] border-[16px] border-zinc-900 shadow-none' : 'pb-20'}`}
            >
              {/* ACCIONES */}
              {!isCapturing && (
                <div className="flex justify-between items-center mb-12">
                  <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-black">
                    <ArrowLeft size={16}/> {t.back}
                  </button>
                  <button onClick={() => setIsCapturing(true)} className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-[10px] font-black uppercase shadow-xl hover:scale-105 transition-all">
                    <Camera size={14}/> {t.captureBtn}
                  </button>
                </div>
              )}

              {/* CONTENIDO DE NOTICIA */}
              <header className="mb-12">
                <span className="text-[12px] font-black uppercase text-blue-600 tracking-[0.3em] mb-4 block">{selected.cat}</span>
                <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-[0.9] mb-10 text-zinc-900">
                  {selected.title}
                </h1>
                <div className="bg-gray-50 p-8 rounded-[2.5rem] border-l-[8px] border-black mb-12">
                  <h4 className="text-[10px] font-black uppercase text-gray-400 mb-2 flex items-center gap-2"><Mic2 size={12}/> {t.quickContext}</h4>
                  <p className="text-xl md:text-2xl font-bold italic text-zinc-700">"{selected.ctx}"</p>
                </div>
              </header>

              <section className="prose prose-xl max-w-none text-zinc-800 font-serif leading-relaxed mb-16 space-y-8">
                {selected.body.split('\n\n').map((p:string, i:number) => (
                  <p key={i} className="first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-black">{p}</p>
                ))}
              </section>

              {/* MODO CAPTURA FOOTER */}
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
                  {/* AUDITORÍA IA */}
                  <div className="mb-16 p-8 bg-zinc-50 rounded-[3rem] border border-zinc-100">
                    <h5 className="text-[10px] font-black uppercase tracking-widest mb-8 flex items-center gap-2 text-zinc-400"><BarChart3 size={14}/> {t.biasAudit}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[85, 92, 98].map((v, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-[9px] font-black uppercase mb-2">
                            <span>{["Objetividad", "Hechos", "Neutralidad"][i]}</span>
                            <span>{v}%</span>
                          </div>
                          <div className="h-1 bg-zinc-200 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} className="h-full bg-black"/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ENCUESTA */}
                  <div className="mb-20 bg-black text-white p-10 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Scale size={200}/></div>
                    <h3 className="text-3xl font-black mb-10">{selected.poll.q}</h3>
                    <div className="space-y-4">
                      {selected.poll.opts.map((o:string, i:number) => (
                        <button 
                          key={i} onClick={() => setVoted([...voted, selected.id])}
                          className="w-full p-6 border-2 border-white/10 rounded-2xl text-left font-bold hover:bg-white hover:text-black transition-all flex justify-between items-center group"
                        >
                          {o} <ChevronRight className="opacity-0 group-hover:opacity-100" size={18}/>
                        </button>
                      ))}
                    </div>
                    {voted.includes(selected.id) && <p className="mt-8 text-center text-amber-400 font-black uppercase text-[10px] tracking-[0.5em]">{t.voteThanks}</p>}
                  </div>

                  {/* DEBATE REALISTA */}
                  <section className="bg-white border border-gray-100 p-8 md:p-14 rounded-[4rem] shadow-xl">
                    <h3 className="text-3xl font-black mb-12 flex items-center gap-4"><MessageSquare size={30}/> {t.debate}</h3>
                    <div className="flex gap-4 mb-12">
                      <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black shrink-0 text-xl">{user.name[0]}</div>
                      <div className="flex-1">
                        <textarea 
                          placeholder={t.input}
                          className="w-full bg-gray-50 p-6 rounded-[2rem] outline-none focus:ring-2 ring-black font-medium text-sm min-h-[120px]"
                          value={commentText} onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button onClick={() => setCommentText("")} className="mt-4 px-8 py-3 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">
                          {t.publish}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-8 h-[600px] overflow-y-auto pr-4 no-scrollbar">
                      {selected.comments.map((c:any, i:number) => (
                        <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <span className="font-black text-sm text-zinc-900">{c.u}</span>
                            <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-[8px] font-black uppercase tracking-tighter">
                              <Award size={10}/> {c.r} {t.rep}
                            </div>
                          </div>
                          <p className="text-zinc-600 font-medium text-[15px] leading-relaxed italic">"{c.t}"</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {isCapturing && (
                <button 
                  onClick={() => setIsCapturing(false)}
                  className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest shadow-2xl border-4 border-black z-[100]"
                >
                  Cerrar Captura
                </button>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      {!isCapturing && (
        <footer className="py-20 border-t border-gray-50 text-center">
          <div className="bg-black text-white inline-block px-6 py-2 font-black text-3xl italic mb-4">IX</div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.5em] px-6">
            Infoxity 2026 © Information Sovereignty & Digital Excellence
          </p>
        </footer>
      )}
    </div>
  );
}
