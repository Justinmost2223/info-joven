"use client";



import React, { useState, useEffect, useMemo } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { 

  Users, Globe, Tv, Trophy, Shield, MessageSquare, 

  ChevronRight, BarChart3, Volume2, Instagram, 

  Languages, Info, Share2, Award, Play, Pause,

  CheckCircle2, ExternalLink, Zap, Heart, TrendingUp

} from 'lucide-react';



// --- TRADUCCIONES ---

const TRANSLATIONS = {

  es: {

    welcome: "Bienvenido a la resistencia intelectual.",

    onboarding: "Introduce tu nombre y apellido para participar en el debate.",

    reading: "personas leyendo ahora",

    quickContext: "Contexto Rápido",

    biasAnalysis: "Análisis de Sesgo (IA)",

    reputation: "Reputación",

    comments: "Comunidad y Debate",

    postComment: "Escribe tu argumento aquí...",

    vote: "Enviar Voto",

    capture: "Modo Captura IG",

    audio: "Escuchar Noticia",

    identityTitle: "¿Por qué INFOJOVEN?",

    identityBody: "Somos un equipo híbrido de IA y humanos que limpian el ruido mediático. Ofrecemos noticias objetivas, largas y analíticas, diseñadas para que los jóvenes cultos debatan con respeto y datos. Aquí la profundidad es el nuevo lujo.",

    back: "Volver a Portada",

    featured: "DESTACADA",

    sources: "Fuentes:",

    voted: "¡Voto registrado!",

    popular: "LO MÁS DESTACADO",

    placeholderName: "Tu nombre..."

  },

  en: {

    welcome: "Welcome to the intellectual resistance.",

    onboarding: "Enter your full name to join the debate.",

    reading: "people reading now",

    quickContext: "Quick Context",

    biasAnalysis: "Bias Analysis (AI)",

    reputation: "Reputation",

    comments: "Community & Debate",

    postComment: "Write your argument here...",

    vote: "Submit Vote",

    capture: "IG Capture Mode",

    audio: "Listen to News",

    identityTitle: "Why INFOJOVEN?",

    identityBody: "We are a hybrid AI-human team clearing media noise. We offer objective, long-form, analytical news designed for cultured youth to debate with respect and data. Here, depth is the new luxury.",

    back: "Back to Home",

    featured: "FEATURED",

    sources: "Sources:",

    voted: "Vote recorded!",

    popular: "MOST FEATURED",

    placeholderName: "Your name..."

  }

};



// --- DATOS DE NOTICIAS ---

const NEWS_DATA = [

  {

    id: 1,

    category: "Geopolítica",

    categoryEn: "Geopolitics",

    title: "Venezuela-EE.UU. 2026: El Nuevo Eje Energético",

    titleEn: "Venezuela-USA 2026: The New Energy Axis",

    context: "Tras la crisis de semiconductores, el petróleo pesado vuelve a ser la pieza reina en el tablero diplomático global.",

    contextEn: "After the semiconductor crisis, heavy oil becomes the queen piece on the global diplomatic board again.",

    content: `En enero de 2026, la administración de Washington ha dado un giro pragmático sin precedentes. El 'Pacto del Caribe' no es solo un acuerdo comercial; es una reconfiguración del poder en Occidente. Venezuela, poseedora de las mayores reservas probadas, ha aceptado una auditoría internacional de sus procesos democráticos a cambio de la eliminación total de sanciones petroleras. Este movimiento busca asfixiar la dependencia de los metales raros controlados por potencias asiáticas, volviendo al carbono como puente hacia la transición verde de 2030.



    Los analistas de INFOJOVEN sugieren que este pacto es el fin de la era de la 'confrontación moral' y el inicio del 'pragmatismo de recursos'. Para la Gen Z, esto plantea un dilema ético masivo: ¿Es aceptable sacrificar la pureza ideológica por una estabilidad energética que permita financiar la infraestructura renovable? Los datos indican que el flujo de 1.5 millones de barriles diarios adicionales bajará el costo de la electricidad en Florida y Madrid en un 22%, pero el costo político interno en ambos países es incierto. El debate ya no es si el petróleo es malo, sino quién lo controla mientras el litio llega a su madurez técnica. 

    

    Esta alianza redefine el mapa de influencias en América Latina, desplazando el foco de atención desde el Pacífico hacia el Atlántico Sur. Los mercados han reaccionado con una volatilidad controlada, pero la pregunta subyacente permanece: ¿Estamos ante un cambio real o un parche temporal ante la inestabilidad de Oriente Medio? La respuesta determinará el precio del transporte y la manufactura para la próxima década.`,

    bias: { objective: 94, factual: 98, emotional: 8 },

    poll: { 

      question: "¿Qué es más importante en 2026?", 

      questionEn: "What's more important in 2026?",

      options: ["Estabilidad Económica", "Pureza Ideológica", "Aceleración Renovable"] 

    },

    source: "Global Oil Report 2026 / Diplomatic Archives",

    color: "bg-amber-500",

    comments: [

      { id: 1, user: "Mateo Fernández", rep: 1250, text: "El realismo político siempre gana al final. No podemos cargar el coche con ética si no hay red eléctrica. 🔋", type: "pro" },

      { id: 2, user: "Valeria Rojas", rep: 890, text: "Parece una traición a los objetivos climáticos de 2030. ¿Dónde queda el New Green Deal? 🤔", type: "con" },

      { id: 3, user: "Lucas Silva", rep: 450, text: "Interesante ver cómo el petróleo pesado vuelve a ser sexy para EE.UU. Geopolítica 101.", type: "neu" },

      { id: 4, user: "Elena Méndez", rep: 2100, text: "Si esto baja la inflación, la Gen Z podrá independizarse. A veces el pragmatismo es necesario.", type: "pro" },

      { id: 5, user: "Diego Torres", rep: 150, text: "No me fío de los datos de exportación. Suena a maquillaje corporativo.", type: "con" },

      { id: 6, user: "Sofía Castro", rep: 3200, text: "La IA de INFOJOVEN tiene razón: es el fin de la confrontación moral.", type: "neu" },

      { id: 7, user: "Hugo Ruiz", rep: 95, text: "Venezuela tiene la llave. Increíble cómo cambia el cuento en dos años.", type: "pro" },

      { id: 8, user: "Camila Vega", rep: 560, text: "Mientras no afecte al precio del litio para mis gadgets, me vale.", type: "neu" },

      { id: 9, user: "Andrés Gil", rep: 1100, text: "Ecologismo vs Supervivencia. El gran debate de nuestra generación.", type: "con" },

      { id: 10, user: "Isabella Ortiz", rep: 45, text: "Prefiero pagar menos luz y debatir luego sobre ética.", type: "pro" },

      { id: 11, user: "Tomás Blanco", rep: 890, text: "La Superliga y esto... todo es dinero en 2026. 💸", type: "neu" },

      { id: 12, user: "Martina Paz", rep: 1300, text: "Faltan datos sobre el impacto en el Amazonas venezolano.", type: "con" },

      { id: 13, user: "Sebastián Luna", rep: 770, text: "Buen análisis. Muy directo.", type: "pro" },

      { id: 14, user: "Lucía Soler", rep: 210, text: "El ruido mediático nos tiene locos, gracias por limpiar la noticia.", type: "neu" },

      { id: 15, user: "Javier Montes", rep: 3400, text: "Esto es historia en directo. Gran artículo.", type: "pro" }

    ]
  {
    id: 2,
    category: "Cultura Pop",
    categoryEn: "Pop Culture",
    title: "Stranger Things 5: El réquiem del streaming",
    titleEn: "Stranger Things 5: The Streaming Requiem",
    context: "El final de la serie marca el colapso del modelo de contenido infinito y el regreso a la 'televisión de evento'.",
    contextEn: "The series finale marks the collapse of the infinite content model and the return to 'event television'.",
    content: `El estreno del capítulo final de Stranger Things no ha sido un simple lanzamiento; ha sido el funeral de la 'era del algoritmo'. Netflix ha reportado que más de 200 millones de personas se conectaron simultáneamente, rompiendo la infraestructura de servidores en tres continentes. Pero detrás del éxito, hay una crisis: este es el último gran éxito de la era del streaming barato. Con presupuestos de 60 millones de dólares por episodio, la industria se ha dado cuenta de que producir 'ruido' ya no es rentable.

    INFOJOVEN analiza cómo el comportamiento del consumidor joven ha cambiado de la 'maratón pasiva' al 'análisis activo'. Ya no queremos 100 series mediocres, queremos un evento cultural que nos permita debatir durante meses. El cierre de esta serie simboliza una purga en Hollywood donde solo los proyectos con alta densidad intelectual y visual sobrevivirán. Estamos presenciando el regreso de los cines como templos de experiencia colectiva, donde los jóvenes alquilan salas no para ver una película, sino para vivir un final de temporada en comunidad, desafiando el aislamiento digital que definió la década pasada.
    
    Este cambio de paradigma obliga a las plataformas a repensar su modelo de suscripción. ¿Veremos el fin del acceso ilimitado a favor de 'pases de evento'? Los datos sugieren que la Gen Z está dispuesta a pagar más por calidad única que menos por una biblioteca llena de contenido de relleno. La nostalgia de los 80 que inició la serie termina irónicamente recordándonos que la atención es el recurso más escaso de 2026.`,
    bias: { objective: 88, factual: 90, emotional: 12 },
    poll: { 
      question: "¿Prefieres calidad única o cantidad infinita?", 
      questionEn: "Do you prefer unique quality or infinite quantity?",
      options: ["Calidad (Eventos)", "Cantidad (Binge)", "Contenido de IA"] 
    },
    source: "Variety Tech 2026 / Netflix Investor Relations",
    color: "bg-purple-600",
    comments: [
      { id: 1, user: "Leo Galdames", rep: 4500, text: "Se acabó lo de ver series de fondo mientras uso TikTok. Queremos cine en casa. 🍿", type: "pro" },
      { id: 2, user: "Sara Bellido", rep: 120, text: "Stranger Things se estiró demasiado, pero el final fue épico. El streaming está muerto.", type: "neu" },
      { id: 3, user: "Marcos Peña", rep: 900, text: "Prefiero maratones. Esperar una semana es de los años 90. 🙄", type: "con" },
      { id: 4, user: "Claudia Ramos", rep: 230, text: "Ir al cine a ver el final fue lo mejor de 2026 hasta ahora.", type: "pro" },
      { id: 5, user: "Iker Jiménez Jr", rep: 880, text: "Demasiado CGI, poca alma. La IA ya escribe mejor que los guionistas.", type: "con" },
      { id: 6, user: "Aitana Cruz", rep: 1400, text: "La cultura pop necesita eventos, no algoritmos que nos traten como ganado.", type: "pro" },
      { id: 7, user: "Enzo Ferrero", rep: 300, text: "Netflix va a subir precios otra vez con esta excusa. Verás.", type: "con" },
      { id: 8, user: "Paz Herrera", rep: 50, text: "El final de Eleven fue... poético.", type: "neu" },
      { id: 9, user: "Raúl Vázquez", rep: 760, text: "Menos ruido, más calidad. Suscribo al 100%.", type: "pro" },
      { id: 10, user: "Nora Gil", rep: 2100, text: "INFOJOVEN siempre dando en el clavo con el análisis de la atención.", type: "neu" },
      { id: 11, user: "Santi Marín", rep: 340, text: "Echo de menos cuando el streaming era barato.", type: "con" },
      { id: 12, user: "Marta Vila", rep: 920, text: "La nostalgia ya no vende como antes. Necesitamos nuevas IPs.", type: "neu" },
      { id: 13, user: "Dani Soto", rep: 600, text: "Si ST5 es el fin, ¿qué será lo siguiente? ¿Realidad virtual?", type: "neu" },
      { id: 14, user: "Gabriela S.", rep: 15, text: "Lloré con Dustin. Punto.", type: "neu" },
      { id: 15, user: "Rubén Darío", rep: 5000, text: "Análisis brillante sobre la economía de la atención.", type: "pro" }
    ]
  },
  {
    id: 3,
    category: "Deportes",
    categoryEn: "Sports",
    title: "Superliga vs Tradición: La batalla por el alma del fútbol",
    titleEn: "Superleague vs Tradition: Battle for Football's Soul",
    context: "El fútbol europeo se fragmenta: ¿Es un deporte comunitario o una propiedad intelectual de entretenimiento?",
    contextEn: "European football fragments: Is it a community sport or entertainment IP?",
    content: `El choque de modelos en 2026 es total. Por un lado, la Superliga propone un ecosistema de entretenimiento puro, diseñado para competir con los videojuegos y TikTok, con partidos de 70 minutos y micro-transacciones para ver cámaras exclusivas de los jugadores. Por otro, las ligas domésticas luchan por mantener la mística de la meritocracia deportiva y el arraigo local. INFOJOVEN desglosa los datos: el 65% de la Gen Z prefiere ver resúmenes generados por IA que un partido completo de 90 minutos de la liga tradicional.

    Sin embargo, hay una resistencia. Un movimiento de 'Fútbol Orgánico' está ganando fuerza en ciudades como Londres, Dortmund y Madrid, donde los jóvenes rechazan las entradas de 200 euros y crean sus propias ligas paralelas. El conflicto no es solo económico, es filosófico. ¿Queremos que el fútbol sea un producto perfecto y aséptico o un caos emocional impredecible? La Superliga ofrece el 'show' definitivo, pero a cambio de desconectar al equipo de su barrio. El resultado de esta batalla definirá cómo consumiremos ocio físico en la próxima década.`,
    bias: { objective: 92, factual: 95, emotional: 10 },
    poll: { 
      question: "¿Cuál es el futuro del fútbol?", 
      questionEn: "What is the future of football?",
      options: ["Entretenimiento Total", "Tradición Local", "Modelo Cooperativo"] 
    },
    source: "UEFA Strategic Paper 2026 / Financial Times",
    color: "bg-blue-600",
    comments: [
      { id: 1, user: "Adrián Ibáñez", rep: 120, text: "El fútbol murió cuando un ticket empezó a costar medio sueldo. Superliga = Funko Pop de fútbol. 🏟️", type: "con" },
      { id: 2, user: "Paula Méndez", rep: 4500, text: "Si quiero ver un Getafe-Alavés me voy al barrio. En la tele quiero ver a Mbappé contra Haaland cada martes.", type: "pro" },
      { id: 3, user: "Óscar León", rep: 890, text: "¿Partidos de 70 minutos? Qué falta de respeto al deporte. 🤦‍♂️", type: "con" },
      { id: 4, user: "Julia Costa", rep: 330, text: "La Kings League fue el aviso. Nadie tiene 90 minutos para ver gente trotando.", type: "pro" },
      { id: 5, user: "Kevin S.", rep: 70, text: "Yo solo veo los highlights en TikTok. ¿Soy el problema?", type: "neu" },
      { id: 6, user: "Ramón García", rep: 2500, text: "El fútbol es de los fans, no de los jeques de la Superliga.", type: "con" },
      { id: 7, user: "Begoña R.", rep: 110, text: "A este paso acabarán jugando con avatares. 🤖", type: "neu" },
      { id: 8, user: "Luis Alberto", rep: 670, text: "Prefiero el modelo de la NBA. Es más honesto.", type: "pro" },
      { id: 9, user: "Carla F.", rep: 90, text: "Odio que todo sea dinero. Echo de menos mi club de pueblo.", type: "con" },
      { id: 10, user: "Felipe VI (Fan)", rep: 400, text: "Buen debate, muy centrado.", type: "neu" },
      { id: 11, user: "Álvaro M.", rep: 1200, text: "La Superliga es inevitable. Aceptadlo.", type: "pro" },
      { id: 12, user: "Inés J.", rep: 560, text: "La meritocracia ha muerto en el deporte de élite.", type: "con" },
      { id: 13, user: "Juanpe", rep: 30, text: "Yo mientras haya apuestas gratis me da igual.", type: "con" },
      { id: 14, user: "Mónica L.", rep: 1500, text: "Interesante el dato del 65%. Somos una generación de dopamina rápida.", type: "neu" },
      { id: 15, user: "Pere Mas", rep: 2100, text: "Fútbol popular o barbarie.", type: "con" }
    ]
  },
  {
    id: 4,
    category: "Política",
    categoryEn: "Politics",
    title: "Gen Z: El fin de la dicotomía 'Izquierda vs Derecha'",
    titleEn: "Gen Z: End of Left vs Right Dichotomy",
    context: "Nuevas encuestas revelan un pragmatismo radical que rompe los ejes tradicionales del siglo XX.",
    contextEn: "New polls reveal a radical pragmatism breaking 20th-century traditional axes.",
    content: `Para los nacidos entre 1997 y 2012, las etiquetas 'izquierda' y 'derecha' se han vuelto obsoletas. En 2026, los datos muestran que el 74% de la Gen Z apoya simultáneamente la libertad total de mercado en criptoactivos y una intervención estatal agresiva en el mercado de la vivienda. INFOJOVEN identifica este fenómeno como 'Pragmatismo Basado en Resultados'. La ideología ha sido sustituida por la métrica de eficiencia.

    Este cambio está forzando a los partidos tradicionales a una crisis de identidad. Los jóvenes ya no votan por un 'paquete' de ideas, sino por soluciones técnicas a problemas existenciales: salud mental, acceso a la vivienda y regulación de la IA. El debate político se ha trasladado de los parlamentos a foros de datos donde la propuesta más lógica gana, independientemente de si viene de un sector conservador o progresista. Estamos ante el nacimiento de la 'Política Líquida', donde la lealtad partidista es cero y la exigencia de transparencia es absoluta.`,
    bias: { objective: 96, factual: 94, emotional: 4 },
    poll: { 
      question: "¿Cómo te defines políticamente?", 
      questionEn: "How do you define yourself politically?",
      options: ["Pragmático/a", "Ideológico/a", "Apolítico/a", "Post-Ideológico"] 
    },
    source: "Pew Research 2026 / Global Polling Index",
    color: "bg-emerald-600",
    comments: [
      { id: 1, user: "Esteban Quito", rep: 900, text: "Voto a quien me permita comprar un piso y no me cobre por respirar. Izquierda/Derecha es para boomers. 🏠", type: "pro" },
      { id: 2, user: "Lola Mento", rep: 1500, text: "Sin ideología no hay valores. El pragmatismo es solo egoísmo disfrazado de eficiencia.", type: "con" },
      { id: 3, user: "Guillermo Tell", rep: 45, text: "Blockchain para votar y se acaba la corrupción. Es simple.", type: "pro" },
      { id: 4, user: "Fabiola S.", rep: 2300, text: "Mi ideología es que mi salud mental no dependa de mi cuenta bancaria.", type: "neu" },
      { id: 5, user: "Nacho Libre", rep: 670, text: "Libre mercado + Sanidad pública. ¿Tan difícil es de entender?", type: "pro" },
      { id: 6, user: "Rosa Melano", rep: 120, text: "Ironía: los jóvenes son más maduros que los políticos de 60 años.", type: "neu" },
      { id: 7, user: "Jorge Nitales", rep: 500, text: "Cansado de que me vendan packs de ideas que no encajan entre sí.", type: "pro" },
      { id: 8, user: "Elena Nito", rep: 1100, text: "El fin de las etiquetas es el inicio de la libertad real.", type: "pro" },
      { id: 9, user: "Paco Mer", rep: 80, text: "Yo solo quiero que la IA no me quite el trabajo.", type: "neu" },
      { id: 10, user: "Susana Oria", rep: 3400, text: "Gran análisis. Refleja totalmente lo que hablamos en la uni.", type: "pro" },
      { id: 11, user: "Armando Bronca", rep: 10, text: "¡Esto es anarquía encubierta!", type: "con" },
      { id: 12, user: "Aitor Tilla", rep: 440, text: "Datos sobre dogma. Siempre.", type: "pro" },
      { id: 13, user: "Pere Gil", rep: 990, text: "El sistema actual está roto. Necesitamos el parche 2026 ya.", type: "neu" },
      { id: 14, user: "Kety S.", rep: 150, text: "La política líquida suena a no mojarse en nada.", type: "con" },
      { id: 15, user: "Zoe Miller", rep: 7800, text: "Excellent analytical piece. The post-ideological shift is global.", type: "pro" }
    ]
  }
];

// --- COMPONENTES ---

const BiasChart = ({ bias, lang }: { bias: any, lang: string }) => (
  <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
    <h4 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
      <BarChart3 size={14} /> {lang === 'es' ? 'Análisis de Objetividad' : 'Objectivity Analysis'}
    </h4>
    <div className="space-y-4">
      {Object.entries(bias).map(([key, value]: [string, any]) => (
        <div key={key}>
          <div className="flex justify-between text-[10px] mb-1 uppercase font-bold text-gray-500">
            <span>{key === 'objective' ? 'Objetividad' : key === 'factual' ? 'Hechos' : 'Emocionalidad'}</span>
            <span>{value}%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              className={`h-full ${key === 'emotional' ? 'bg-rose-500' : 'bg-black'}`}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function InfoJovenPage() {
  const [user, setUser] = useState<{name: string, rep: number} | null>(null);
  const [userName, setUserName] = useState("");
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [readerCount, setReaderCount] = useState(4520);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [isCaptureMode, setIsCaptureMode] = useState(false);
  const [voted, setVoted] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [activeComments, setActiveComments] = useState<any[]>([]);

  // Efecto para el contador dinámico de lectores
  useEffect(() => {
    const interval = setInterval(() => {
      setReaderCount(prev => {
        const change = Math.floor(Math.random() * 30) - 10;
        const newVal = prev + change;
        return newVal > 10000 ? 10000 : newVal < 2000 ? 2000 : newVal;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const t = TRANSLATIONS[lang];

  // Manejar entrada a la noticia
  const openNews = (news: any) => {
    setSelectedNews(news);
    setActiveComments(news.comments);
    setVoted(false);
    window.scrollTo(0,0);
  };

  // Agregar comentario del usuario
  const postUserComment = () => {
    if (!newComment.trim() || !user) return;
    const comment = {
      id: Date.now(),
      user: user.name,
      rep: user.rep,
      text: newComment,
      type: "user"
    };
    setActiveComments([comment, ...activeComments]);
    setNewComment("");
  };

  if (!user) {
    return (
      <div className="fixed inset-0 bg-[#F9FAFB] z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full p-10 rounded-[3rem] border border-gray-100 shadow-2xl bg-white text-center"
        >
          <div className="mb-8 inline-block bg-black text-white px-6 py-2 font-black text-3xl italic tracking-tighter">IJ</div>
          <h1 className="text-2xl font-bold mb-2 tracking-tight">{t.welcome}</h1>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">{t.onboarding}</p>
          <input 
            type="text" 
            placeholder={t.placeholderName}
            className="w-full p-5 rounded-2xl border border-gray-100 mb-4 focus:ring-2 ring-black outline-none transition-all bg-gray-50"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button 
            disabled={!userName}
            onClick={() => setUser({ name: userName, rep: 150 })}
            className="w-full bg-black text-white p-5 rounded-2xl font-bold hover:bg-gray-800 transition-all disabled:opacity-30 shadow-xl"
          >
            Participar en el Debate
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white text-slate-900 font-sans selection:bg-black selection:text-white pb-20`}>
      {/* HEADER PROFESIONAL */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-50 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setSelectedNews(null); setIsCaptureMode(false)}}>
          <div className="bg-black text-white px-3 py-1 font-black text-xl italic tracking-tighter">IJ</div>
          <span className="font-bold tracking-widest text-xs hidden sm:block">INFOJOVEN</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-mono bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-gray-500 uppercase">
              IF(infojoven) <span className="text-black font-bold">{readerCount.toLocaleString()}</span> {t.reading}
            </span>
          </div>
          <button 
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 text-[10px] font-black uppercase"
          >
            <Languages size={16} /> {lang}
          </button>
        </div>
      </nav>

      <main className="pt-28 px-4 md:px-10 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedNews ? (
            <motion.div 
              key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              {/* Sección Identidad (Noticia 5 Destacada) */}
              <div className="md:col-span-12 lg:col-span-8 group">
                <div className="bg-black text-white p-10 md:p-16 rounded-[3.5rem] relative overflow-hidden h-full flex flex-col justify-end min-h-[500px] shadow-2xl">
                  <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Shield size={250} />
                  </div>
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold tracking-[0.5em] uppercase mb-6 block text-gray-400 flex items-center gap-2">
                      <Zap size={14} className="fill-current text-amber-400" /> {t.popular}
                    </span>
                    <h2 className="text-4xl md:text-7xl font-bold mb-8 leading-[1.05] tracking-tighter italic">
                      {t.identityTitle}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed font-light">
                      {t.identityBody}
                    </p>
                  </div>
                </div>
              </div>

              {/* Feed de Noticias */}
              {NEWS_DATA.map((news) => (
                <motion.div 
                  key={news.id} 
                  whileHover={{ y: -5 }}
                  onClick={() => openNews(news)}
                  className="md:col-span-6 lg:col-span-4 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${news.color}`}>
                        {lang === 'es' ? news.category : news.categoryEn}
                      </span>
                      <TrendingUp size={18} className="text-gray-200 group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight tracking-tight group-hover:underline decoration-1 underline-offset-8">
                      {lang === 'es' ? news.title : news.titleEn}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 italic">
                      "{lang === 'es' ? news.context : news.contextEn}"
                    </p>
                  </div>
                  <div className="mt-10 flex items-center justify-between border-t border-gray-50 pt-6">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-gray-400" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">15 DEBATES ACTIVOS</span>
                    </div>
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={`max-w-4xl mx-auto ${isCaptureMode ? 'p-12 bg-white rounded-[3rem] shadow-2xl scale-95 border-8 border-black' : ''}`}
            >
              {!isCaptureMode && (
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all"
                >
                  ← {t.back}
                </button>
              )}

              {/* Botón Marca en modo captura */}
              {isCaptureMode && (
                <div className="mb-10 flex justify-between items-center">
                  <div className="bg-black text-white px-4 py-2 font-black text-2xl italic tracking-tighter">INFOJOVEN</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">#ResistenciaIntelectual</div>
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="flex-1">
                  <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 bg-black text-white`}>
                    {t.featured} | {lang === 'es' ? selectedNews.category : selectedNews.categoryEn}
                  </span>
                  <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[1.05] italic">
                    {lang === 'es' ? selectedNews.title : selectedNews.titleEn}
                  </h1>
                </div>
                {!isCaptureMode && (
                  <div className="flex gap-2">
                    <button onClick={() => setIsCaptureMode(true)} className="p-4 bg-gray-50 hover:bg-black hover:text-white rounded-2xl transition-all shadow-sm">
                      <Instagram size={24} />
                    </button>
                    <button className="p-4 bg-gray-50 hover:bg-black hover:text-white rounded-2xl transition-all shadow-sm">
                      <Volume2 size={24} />
                    </button>
                  </div>
                )}
              </div>

              {/* Contexto Rápido (Glassmorphism) */}
              <div className={`p-8 rounded-[2.5rem] border-l-8 mb-12 bg-gray-50/50 backdrop-blur-sm border-black shadow-inner`}>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2 text-gray-500">
                  <Info size={14} /> {t.quickContext}
                </h3>
                <p className="text-xl italic leading-relaxed font-medium">
                  "{lang === 'es' ? selectedNews.context : selectedNews.contextEn}"
                </p>
              </div>

              {/* Contenido Largo */}
              <div className="prose prose-xl max-w-none font-serif leading-relaxed text-gray-800">
                {selectedNews.content.split('\n\n').map((p: string, i: number) => (
                  <p key={i} className="mb-8 first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:mt-2">
                    {p.trim()}
                  </p>
                ))}
              </div>

              {/* Fuentes */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-4">
                <span className="text-[10px] font-black uppercase text-gray-400">{t.sources}</span>
                <span className="text-xs font-bold underline cursor-pointer hover:text-black flex items-center gap-1">
                  {selectedNews.source} <ExternalLink size={12} />
                </span>
              </div>

              {!isCaptureMode && (
                <div className="mt-20 space-y-20">
                  {/* Gráfico IA */}
                  <BiasChart bias={selectedNews.bias} lang={lang} />
                  
                  {/* Encuesta Compleja */}
                  <div className="bg-black text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                      <TrendingUp size={150} />
                    </div>
                    <h3 className="text-3xl font-bold mb-10 tracking-tight relative z-10">
                      {lang === 'es' ? selectedNews.poll.question : selectedNews.poll.questionEn}
                    </h3>
                    <div className="grid grid-cols-1 gap-4 relative z-10">
                      {selectedNews.poll.options.map((opt: string, i: number) => (
                        <button 
                          key={i}
                          onClick={() => setVoted(true)}
                          className={`w-full p-6 rounded-2xl border border-white/20 hover:bg-white text-left flex justify-between items-center group transition-all hover:text-black`}
                        >
                          <span className="font-bold text-lg">{opt}</span>
                          {voted ? (
                            <span className="text-xs font-black bg-black text-white px-4 py-2 rounded-full">
                              {Math.floor(Math.random() * 30 + 10)}%
                            </span>
                          ) : (
                            <ChevronRight size={20} className="opacity-0 group-hover:opacity-100" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SISTEMA DE COMENTARIOS REALISTA */}
                  <section className="bg-white rounded-[3rem] border border-gray-100 p-10 shadow-sm">
                    <div className="flex justify-between items-center mb-12">
                      <h3 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <MessageSquare size={32} /> {t.comments}
                      </h3>
                      <div className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase flex items-center gap-2">
                        <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" /> 15 Activos
                      </div>
                    </div>
                    
                    {/* Caja de Comentario Usuario */}
                    <div className="flex gap-4 mb-16">
                      <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl shrink-0">
                        {user.name[0]}
                      </div>
                      <div className="flex-1">
                        <textarea 
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder={t.postComment}
                          className="w-full bg-gray-50 border border-gray-100 p-6 rounded-[2rem] outline-none focus:ring-2 ring-black transition-all min-h-[120px] text-lg"
                        />
                        <button 
                          onClick={postUserComment}
                          className="mt-4 px-10 py-4 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                        >
                          Publicar Argumento
                        </button>
                      </div>
                    </div>

                    {/* Lista de Comentarios */}
                    <div className="space-y-10">
                      {activeComments.map((comment) => (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          key={comment.id} 
                          className={`group border-l-4 ${comment.type === 'user' ? 'border-amber-400 pl-6 bg-amber-50/30 p-6 rounded-r-3xl' : 'border-gray-100 pl-6'}`}
                        >
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                              <span className="font-black text-sm uppercase tracking-tight">{comment.user}</span>
                              <div className="flex items-center gap-1 bg-gray-900 text-white px-2 py-0.5 rounded text-[8px] font-black">
                                <Award size={10} className="text-amber-400" /> {comment.rep} PTS
                              </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="text-gray-300 hover:text-black transition-colors"><Heart size={14} /></button>
                                <span className="text-[10px] text-gray-300 font-mono">#{comment.id.toString().slice(-4)}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {comment.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* Botón Salir Captura */}
              {isCaptureMode && (
                <button 
                  onClick={() => setIsCaptureMode(false)}
                  className="mt-10 w-full p-4 bg-black text-white font-bold rounded-2xl"
                >
                  Finalizar Captura
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-40 py-20 border-t border-gray-100 text-center">
        <div className="bg-black text-white inline-block px-5 py-2 font-black text-xl italic tracking-tighter mb-6">IJ</div>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.5em]">
          INFOJOVEN 2026 © LA RESISTENCIA INTELECTUAL
        </p>
      </footer>
    </div>
  );
}
