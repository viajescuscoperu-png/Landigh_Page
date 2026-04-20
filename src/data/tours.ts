export interface Tour {
  id: string;
  name: string;
  oldPrice: string;
  price: string;
  image: string;
  message: string;
  urgency?: string;
  includes: string[];
}

export const tours: Tour[] = [
  {
    id: "mp-express",
    name: "Machu Picchu Express",
    oldPrice: "$300 USD",
    price: "SÓ $240 USD",
    image: "/machu.png",
    message: "Olá! Quero aproveitar a oferta de Machu Picchu Express por $240 USD.",
    urgency: "Alta demanda!",
    includes: ["Bilhetes de trem inclusos", "Guia oficial em Português", "Entradas para a cidadela", "Traslado hotel-estação"]
  },
  {
    id: "humantay-vip",
    name: "Humantay Lake VIP",
    oldPrice: "$35",
    price: "SÓ $22 USD",
    image: "/humantay.png",
    message: "Olá! Quero Humantay Lake por USD 22.",
    urgency: "Últimas 5 vagas",
    includes: ["Transporte turístico VIP", "Café da manhã e almoço", "Bastões de caminhada", "Kit de primeiros socorros"]
  },
  {
    id: "rainbow-mountain",
    name: "Rainbow Mountain",
    oldPrice: "$35",
    price: "SÓ $22 USD",
    image: "/rainbow.png",
    message: "Olá! Quero Rainbow Mountain por USD 22.",
    urgency: "Limitado",
    includes: ["Experiência em altitude", "Oxigênio a bordo", "Guia profissional", "Almoço buffet incluso"]
  },
  {
    id: "pallay-punchu",
    name: "Pallay Punchu Intenso",
    oldPrice: "$50",
    price: "SÓ $35 USD",
    image: "/pallay.png",
    message: "Olá! Quero Pallay Punchu por USD 35.",
    urgency: "Lugar exclusivo",
    includes: ["Novo destino 2026", "Acesso privado", "Configuração VIP", "Lanche de trilha"]
  }
];

export const testimonials = [
  {
    name: "Ricardo Silva",
    city: "São Paulo",
    content: "Experiência incrível! O atendimento em português facilitou tudo. Machu Picchu é um sonho realizado.",
    rating: 5
  },
  {
    name: "Mariana Costa",
    city: "Rio de Janeiro",
    content: "A agência é super profissional. O guia da Montanha Colorida foi muito paciente com a altitude.",
    rating: 5
  },
  {
    name: "João Pereira",
    city: "Curitiba",
    content: "Tudo pontual e organizado. O roteiro VIP superou minhas expectativas. Recomendo muito!",
    rating: 5
  }
];

export const faqs = [
  {
    question: "Como funciona o pagamento?",
    answer: "Trabalhamos com reserva garantida. Você pode pagar via PIX, cartão de crédito ou transferência internacional com total segurança."
  },
  {
    question: "O atendimento é realmente em Português?",
    answer: "Sim! Somos especialistas no mercado brasileiro. Todos os nossos guias e suporte via WhatsApp falam português fluente."
  },
  {
    question: "O mal de altitude é um problema?",
    answer: "Nossos roteiros são planejados para aclimatação gradual. Oferecemos oxigênio em todos los tours e dicas essenciais de saúde."
  }
];
