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
}

export const tours: Tour[] = [
  {
    id: "mp-express",
    name: "Machu Picchu Express",
    oldPrice: "$300 USD",
    price: "SÓ $240 USD",
    image: "/machu.png",
    message: {
      pt: "Olá! Quero aproveitar a oferta de Machu Picchu Express por $240 USD.",
      es: "¡Hola! Quiero aprovechar la oferta de Machu Picchu Express por $240 USD.",
      en: "Hello! I want to take advantage of the Machu Picchu Express offer for $240 USD."
    },
    urgency: { pt: "Alta demanda!", es: "¡Alta demanda!", en: "High Demand!" },
    includes: [
      { pt: "Bilhetes de trem inclusos", es: "Tickets de tren incluidos", en: "Train tickets included" },
      { pt: "Guia oficial em Português", es: "Guía oficial en Español", en: "Official English Guide" },
      { pt: "Entradas para a cidadela", es: "Entradas a la ciudadela", en: "Entrance to the citadel" },
      { pt: "Traslado hotel-estação", es: "Traslado hotel-estación", en: "Hotel-station transfer" }
    ]
  },
  {
    id: "humantay-vip",
    name: "Humantay Lake VIP",
    oldPrice: "$35",
    price: "SÓ $22 USD",
    image: "/humantay.png",
    message: {
      pt: "Olá! Quero Humantay Lake por USD 22.",
      es: "¡Hola! Quiero Humantay Lake por USD 22.",
      en: "Hello! I want Humantay Lake for USD 22."
    },
    urgency: { pt: "Últimas 5 vagas", es: "Últimas 5 vacantes", en: "Last 5 spots" },
    includes: [
      { pt: "Transporte turístico VIP", es: "Transporte turístico VIP", en: "VIP tourist transport" },
      { pt: "Café da manhã e almoço", es: "Desayuno y almuerzo", en: "Breakfast and lunch" },
      { pt: "Bastões de caminhada", es: "Bastones de caminata", en: "Walking sticks" },
      { pt: "Kit de primeiros socorros", es: "Kit de primeros auxilios", en: "First aid kit" }
    ]
  },
  {
    id: "rainbow-mountain",
    name: "Rainbow Mountain",
    oldPrice: "$35",
    price: "SÓ $22 USD",
    image: "/rainbow.png",
    message: {
      pt: "Olá! Quero Rainbow Mountain por USD 22.",
      es: "¡Hola! Quiero Rainbow Mountain por USD 22.",
      en: "Hello! I want Rainbow Mountain for USD 22."
    },
    urgency: { pt: "Limitado", es: "Limitado", en: "Limited" },
    includes: [
      { pt: "Experiência em altitude", es: "Experiencia en altitud", en: "High altitude experience" },
      { pt: "Oxigênio a bordo", es: "Oxígeno a bordo", en: "Oxygen on board" },
      { pt: "Guia profissional", es: "Guía profesional", en: "Professional guide" },
      { pt: "Almoço buffet incluso", es: "Almuerzo buffet incluido", en: "Buffet lunch included" }
    ]
  },
  {
    id: "pallay-punchu",
    name: "Pallay Punchu Intenso",
    oldPrice: "$50",
    price: "SÓ $35 USD",
    image: "/pallay.png",
    message: {
      pt: "Olá! Quero Pallay Punchu por USD 35.",
      es: "¡Hola! Quiero Pallay Punchu por USD 35.",
      en: "Hello! I want Pallay Punchu for USD 35."
    },
    urgency: { pt: "Lugar exclusivo", es: "Lugar exclusivo", en: "Exclusive spot" },
    includes: [
      { pt: "Novo destino 2026", es: "Nuevo destino 2026", en: "New 2026 destination" },
      { pt: "Acesso privado", es: "Acceso privado", en: "Private access" },
      { pt: "Configuração VIP", es: "Configuración VIP", en: "VIP setup" },
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
      pt: "Como funciona o pagamento?",
      es: "¿Cómo funciona el pago?",
      en: "How does the payment work?"
    },
    answer: {
      pt: "Trabalhamos com reserva garantida. Você pode pagar via PIX, cartão de crédito ou transferência internacional com total segurança.",
      es: "Trabajamos con reserva garantizada. Puedes pagar con tarjeta de crédito, PayPal o transferencia internacional de forma segura.",
      en: "We work with guaranteed booking. You can pay via credit card, PayPal, or international transfer completely securely."
    }
  },
  {
    question: {
      pt: "O atendimento é realmente em Português?",
      es: "¿La atención es realmente en Español o Inglés?",
      en: "Is the support really in English or Spanish?"
    },
    answer: {
      pt: "Sim! Somos especialistas no mercado brasileiro. Todos os nossos guias e suporte via WhatsApp falam português fluente.",
      es: "¡Sí! Todos nuestros guías y el equipo de soporte de WhatsApp hablan español e inglés perfectamente.",
      en: "Yes! All our guides and WhatsApp support staff speak fluent English and Spanish."
    }
  },
  {
    question: {
      pt: "O mal de altitude é um problema?",
      es: "¿El mal de altura es un problema?",
      en: "Is altitude sickness a problem?"
    },
    answer: {
      pt: "Nossos roteiros são planejados para aclimatação gradual. Oferecemos oxigênio em todos los tours e dicas essenciais de saúde.",
      es: "Nuestras rutas están planificadas para aclimatación gradual. Ofrecemos oxígeno en todos los tours y consejos básicos de salud.",
      en: "Our routes are planned for gradual acclimatization. We offer emergency oxygen on all tours and essential health tips."
    }
  }
];
