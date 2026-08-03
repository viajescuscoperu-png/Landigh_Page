export interface LocalizedString {
  pt: string;
  es: string;
  en: string;
}

export interface Tour {
  id: string;
  name: string;
  oldPrice: string;
  price: string;
  image: string;
  message: LocalizedString;
  urgency?: LocalizedString;
  includes: LocalizedString[];
  isGold?: boolean;
  curiosity?: LocalizedString;
}

export const tours: Tour[] = [
  {
    id: "mp-premium",
    name: "Machu Picchu Premium",
    oldPrice: "380 USD",
    price: "299 USD",
    image: "/mp-premium.jpg",
    isGold: true,
    curiosity: {
      pt: "Sabia que Machu Picchu foi construída sem usar nem uma gota de argamassa entre as pedras?",
      es: "¿Sabías que Machu Picchu fue construida sin usar ni una sola gota de mortero entre sus piedras?",
      en: "Did you know Machu Picchu was built without using a single drop of mortar between its stones?"
    },
    message: {
      pt: "Olá! Quero o pacote Machu Picchu Premium com Trem Panorâmico por 299 USD.",
      es: "¡Hola! Quiero el paquete Machu Picchu Premium con Tren Panorámico por 299 USD.",
      en: "Hello! I want the Machu Picchu Premium package with Panoramic Train for 299 USD."
    },
    urgency: { pt: "Exclusivo!", es: "¡Exclusivo!", en: "Exclusive!" },
    includes: [
      { pt: "Trem Panorâmico incluso", es: "Tren Panorámico incluido", en: "Panoramic Train included" },
      { pt: "Guia oficial em Português", es: "Guía oficial en Español", en: "Official English Guide" },
      { pt: "Entradas para a cidadela", es: "Entradas a la ciudadela", en: "Entrance to the citadel" },
      { pt: "Traslado hotel-estação", es: "Traslado hotel-estación", en: "Hotel-station transfer" },
      { pt: "Ônibus de subida e descida", es: "Bus de subida y bajada", en: "Bus up and down" }
    ]
  },
  {
    id: "mp-express",
    name: "Machu Picchu Express",
    oldPrice: "300 USD",
    price: "239 USD",
    image: "/machu.jpg",
    curiosity: {
      pt: "Sabia que Machu Picchu foi construída sem usar nem uma gota de argamassa entre as pedras?",
      es: "¿Sabías que Machu Picchu fue construida sin usar ni una sola gota de mortero entre sus piedras?",
      en: "Did you know Machu Picchu was built without using a single drop of mortar between its stones?"
    },
    message: {
      pt: "Olá! Quero aproveitar a oferta de Machu Picchu Express por 239 USD.",
      es: "¡Hola! Quiero aprovechar la oferta de Machu Picchu Express por 239 USD.",
      en: "Hello! I want to take advantage of the Machu Picchu Express offer for 239 USD."
    },
    urgency: { pt: "Alta demanda!", es: "¡Alta demanda!", en: "High Demand!" },
    includes: [
      { pt: "Bilhetes de trem inclusos", es: "Tickets de tren incluidos", en: "Train tickets included" },
      { pt: "Guia oficial em Português", es: "Guía oficial en Español", en: "Official English Guide" },
      { pt: "Entradas para a cidadela", es: "Entradas a la ciudadela", en: "Entrance to the citadel" },
      { pt: "Traslado hotel-estação", es: "Traslado hotel-estación", en: "Hotel-station transfer" },
      { pt: "Ônibus de subida e descida", es: "Bus de subida y bajada", en: "Bus up and down" }
    ]
  },
  {
    id: "humantay-vip",
    name: "Humantay Lake",
    oldPrice: "35 USD",
    price: "23 USD",
    image: "/humantay.jpg",
    curiosity: {
      pt: "É uma lagoa sagrada onde as comunidades ainda fazem oferendas à Pachamama.",
      es: "Es una laguna sagrada donde las comunidades aún realizan ofrendas a la Pachamama.",
      en: "It is a sacred lagoon where communities still make offerings to Pachamama."
    },
    message: {
      pt: "Olá! Quero Humantay Lake por USD 23.",
      es: "¡Hola! Quiero Humantay Lake por USD 23.",
      en: "Hello! I want Humantay Lake for USD 23."
    },
    urgency: { pt: "Últimas 5 vagas", es: "Últimas 5 vacantes", en: "Last 5 spots" },
    includes: [
      { pt: "Transporte turístico", es: "Transporte turístico", en: "Tourist transport" },
      { pt: "Café da manhã e almoço", es: "Desayuno y almuerzo", en: "Breakfast and lunch" },
      { pt: "Bastões de caminhada", es: "Bastones de caminata", en: "Walking sticks" },
      { pt: "Guia profissional", es: "Guía profesional", en: "Professional guide" },
      { pt: "Kit de primeiros socorros", es: "Kit de primeros auxilios", en: "First aid kit" }
    ]
  },
  {
    id: "rainbow-mountain",
    name: "Rainbow Mountain",
    oldPrice: "35 USD",
    price: "23 USD",
    image: "/rainbow.jpg",
    curiosity: {
      pt: "Suas cores são resultado de minerais oxidados por milhões de anos.",
      es: "Sus colores son producto de minerales oxidados durante millones de años.",
      en: "Its colors are the result of minerals oxidized over millions of years."
    },
    message: {
      pt: "Olá! Quero Rainbow Mountain por USD 23.",
      es: "¡Hola! Quiero Rainbow Mountain por USD 23.",
      en: "Hello! I want Rainbow Mountain for USD 23."
    },
    urgency: { pt: "Limitado", es: "Limitado", en: "Limited" },
    includes: [
      { pt: "Café da manhã e almoço", es: "Desayuno y almuerzo", en: "Breakfast and lunch" },
      { pt: "Transporte turístico", es: "Transporte turístico", en: "Tourist transport" },
      { pt: "Guia profissional", es: "Guía profesional", en: "Professional guide" },
      { pt: "Oxigênio a bordo", es: "Oxígeno a bordo", en: "Oxygen on board" },
      { pt: "Bastões de caminhada", es: "Bastones de caminata", en: "Walking sticks" }
    ]
  },
  {
    id: "pallay-punchu",
    name: "Pallay Punchu Intenso",
    oldPrice: "50 USD",
    price: "35 USD",
    image: "/pallay.jpg",
    curiosity: {
      pt: "É o novo destino secreto de Cusco, descoberto recentemente para o turismo.",
      es: "Es el nuevo destino secreto de Cusco, descubierto recientemente para el turismo.",
      en: "It is Cusco's new secret destination, recently discovered for tourism."
    },
    message: {
      pt: "Olá! Quero Pallay Punchu por USD 35.",
      es: "¡Hola! Quiero Pallay Punchu por USD 35.",
      en: "Hello! I want Pallay Punchu for USD 35."
    },
    urgency: { pt: "Apenas fins de semana!", es: "¡Solo fines de semana!", en: "Only weekends!" },
    includes: [
      { pt: "Novo destino 2026", es: "Nuevo destino 2026", en: "New 2026 destination" },
      { pt: "Bastões de caminhada", es: "Bastones de caminata", en: "Walking sticks" },
      { pt: "Guia profissional", es: "Guía profesional", en: "Professional guide" },
      { pt: "Transporte turístico", es: "Transporte turístico", en: "Tourist transport" },
      { pt: "Lanche de trilha", es: "Snack de ruta", en: "Trail snack" }
    ]
  }
];

export const testimonials = [
  {
    name: "Guadalupe Espadas",
    city: "Turista",
    country: { pt: "Verificada", es: "Verificada", en: "Verified" },
    content: {
      pt: "Uma viagem maravilhosa graças à agência. Aproveitei ao máximo sem nenhuma preocupação. Super recomendado, o atendimento de Angel e Henry foi nota 10, sempre pendentes de tudo.",
      es: "Un viaje maravilloso gracias a la agencia. Disfruté al máximo sin ninguna preocupación, desde que aterricé hasta mi regreso. Súper recomendado, la atención de Angel y Henry fue de 10.",
      en: "A wonderful trip thanks to the agency. I enjoyed it to the fullest without any worries. Highly recommended, Angel and Henry's service was a 10, always attentive to every detail."
    },
    rating: 5
  },
  {
    name: "Tani Calvario",
    city: "Turista",
    country: { pt: "Verificada", es: "Verificada", en: "Verified" },
    content: {
      pt: "Incrível experiência, super amáveis, cumpridores, confiáveis, prestativos, honestos, equipe com quem pode contar, mil estrelas.",
      es: "Increíble experiencia, súper amables, cumplidos, confiables, serviciales, honestos, son equipo con el cual puedes contar, completamente recomendables, mil estrellas.",
      en: "Incredible experience, super friendly, reliable, helpful, honest, a team you can count on, completely recommended, a thousand stars."
    },
    rating: 5
  },
  {
    name: "Jose Luis Gomez",
    city: "Turista",
    country: { pt: "Verificado", es: "Verificado", en: "Verified" },
    content: {
      pt: "Excelente acompanhamento do Henry em toda a organização. Ele cuida dos mínimos detalhes. Os alojamentos são muito justos pelo preço.",
      es: "Excelente acompañamiento de Henry en todos los aspectos organizativos. Él está en los más mínimos detalles. Los alojamentos son muy acordes al precio.",
      en: "Excellent support from Henry in all organizational aspects. He pays attention to the smallest details. The accommodations are very reasonably priced."
    },
    rating: 5
  },
  {
    name: "Luz Dary Fajardo",
    city: "Turista",
    country: { pt: "Verificada", es: "Verificada", en: "Verified" },
    content: {
      pt: "Viajei com minha família e fiquei muito satisfeita com os serviços. Foi um tour muito completo, o senhor Henry esteve sempre pendente. Preço justo.",
      es: "Viaje con mi familia quedé muy satisfecha con los servicios prestados, fue un tour muy completo. El señor Henry estuvo siempre pendiente. Precio justo.",
      en: "I traveled with my family and was very satisfied with the services. It was a very complete tour, Mr. Henry was always attentive. Fair price."
    },
    rating: 5
  },
  {
    name: "Victoria Acosta",
    city: "Turista",
    country: { pt: "Verificada", es: "Verificada", en: "Verified" },
    content: {
      pt: "Passamos um momento agradável, foram pontuais, o guia muito atento e o preço acessível por uma boa experiência.",
      es: "Pasamos un agradable momento, fueron puntuales, el guía muy atento y el precio accesible por una buena experiencia.",
      en: "We had a pleasant time, they were punctual, the guide was very attentive and the price was accessible for a good experience."
    },
    rating: 5
  }
];

export const faqs = [
  {
    question: {
      pt: "Como funciona o processo de reserva e pagamento?",
      es: "¿Cómo es el proceso de reserva y pago?",
      en: "How does the booking and payment process work?"
    },
    answer: {
      pt: "Para garantir sua experiência, trabalhamos com um sistema de reserva antecipada segura. O processo começa entrando em contato com nossos consultores via WhatsApp, onde confirmaremos datas e disponibilidade. Após a coordenação, você pode efetuar o pagamento através de métodos internacionais garantidos (PayPal, Cartão de Crédito, Western Union). Você receberá sua confirmação e ingressos digitais imediatamente após o pagamento.",
      es: "Para garantizar tu experiencia, trabajamos con un sistema de reserva anticipada segura. El proceso inicia comunicándote con nuestros asesores vía WhatsApp, donde confirmaremos fechas y disponibilidad real. Una vez coordinado tu itinerario, podrás realizar tu pago a través de distintos métodos internacionales y 100% garantizados como PayPal, Tarjetas de Crédito, y transferencias Western Union. Recibirás tu confirmación y boletos digitales de inmediato una vez completado.",
      en: "To guarantee your experience, we work with a secure advance booking system. The process begins by contacting our advisors via WhatsApp to confirm dates and availability. Once your itinerary is set, you can make your payment through guaranteed international methods such as PayPal, Credit Cards, and Western Union transfers. You will receive your confirmation and digital tickets immediately upon completion."
    }
  },
  {
    question: {
      pt: "Os guias falam o meu idioma e qual é a sua qualificação?",
      es: "¿Los guías hablan mi idioma y qué tan preparados están?",
      en: "Do the guides speak my language and how qualified are they?"
    },
    answer: {
      pt: "Com certeza! Para nós, a comunicação é fundamental. Contamos com guias turísticos oficiais altamente qualificados e certificados pelo MINCETUR. Todos os nossos passeios oferecem orientação fluente em português ou espanhol, para que você não perca nenhum detalhe da história inca. Além disso, a nossa assistência logística pelo WhatsApp está disponível 24 horas por dia no seu idioma preferido.",
      es: "¡Por supuesto! Para nosotros la comunicación es fundamental para que vivas al máximo tu viaje. Contamos con un equipo de guías turísticos oficiales altamente capacitados y con aval de MINCETUR. Todos nuestros tours cuentan con la opción de ser guiados en Español fluido o Inglés, para que no te pierdas ningún detalle de la historia, las anécdotas y la magia de cada sitio arqueológico. Además, la asistencia logística vía WhatsApp está disponible 24/7.",
      en: "Absolutely! For us, communication is fundamental. We have a team of highly trained official tour guides certified by MINCETUR. All our tours offer fluent English or Spanish guidance, so you do not miss any detail of the history, anecdotes, and magic of each archaeological site. Additionally, our WhatsApp logistics assistance is available 24/7 in your preferred language."
    }
  },
  {
    question: {
      pt: "Como vocês lidam com a doença da altitude (Soroche)?",
      es: "¿Cómo manejan el mal de altura (Soroche) en los tours?",
      en: "How do you handle altitude sickness (Soroche) on tours?"
    },
    answer: {
      pt: "Cusco fica a mais de 3.300 metros de altitude, então levamos sua saúde muito a sério. Em passeios de alta montanha, nosso transporte é equipado com kits de primeiros socorros e tubos de oxigênio emergencial. Além disso, nossos guias são treinados em prevenção e assistência imediata. Sempre recomendamos descansar no primeiro dia de chegada, alimentar-se de forma leve e beber bastante chá de coca.",
      es: "Cusco se encuentra a más de 3,300 metros sobre el nivel del mar, por lo que tomamos tu bienestar físico muy en serio. Todas nuestras rutas están estratégicamente diseñadas. En caso de emergencias durante excursiones, nuestro equipo está dotado con botiquines de primeros auxilios y balones de oxígeno medicinal. Nuestros guías están entrenados en asistencia inmediata. Siempre recomendamos descansar el primer día y beber abundante mate de coca.",
      en: "Cusco is located at over 3,300 meters above sea level, so we take your physical well-being very seriously. Our higher altitude routes are strategically designed. In case of emergencies during excursions, our team is equipped with first aid kits and emergency oxygen tanks. Our guides are trained in immediate assistance. We always recommend resting on the first day and drinking plenty of coca tea."
    }
  },
  {
    question: {
      pt: "O que acontece se meu voo atrasar ou houver imprevistos?",
      es: "¿Qué sucede si mi vuelo se retrasa o hay imprevistos?",
      en: "What happens if my flight is delayed or there are unforeseen events?"
    },
    answer: {
      pt: "Sabemos que viajar pode envolver mudanças repentinas, por isso nossa equipe de operações monitora constantemente a sua chegada. Se o seu voo atrasar, nossa equipe de traslado esperará por você no aeroporto sem nenhum custo adicional. Trabalhamos com flexibilidade máxima dentro do possível para remanejar o que for necessário e garantir que você tenha as melhores férias.",
      es: "Sabemos que viajar puede implicar cambios logísticos repentinos, por lo que nuestro equipo de operaciones monitorea constantemente los estatus de vuelo de tu llegada. Si tu avión sufre un retraso, nuestro personal de traslado te esperará pacientemente en el aeropuerto sin costo adicional. Nuestro compromiso es brindarte la máxima tranquilidad desde tu arribo hasta tu despedida de Cusco.",
      en: "We know that traveling can involve sudden logistical changes, so our operations team constantly monitors your arrival flight status. If your plane is delayed, our transfer staff will wait for you patiently at the airport at no additional cost. Our commitment is to provide you with maximum peace of mind from your arrival until your departure from Cusco."
    }
  }
];
