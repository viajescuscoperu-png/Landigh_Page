export interface Tour {
  id: string;
  name: string;
  oldPrice: string;
  price: string;
  image: string;
  message: string;
  urgency?: string;
}

export const tours: Tour[] = [
  {
    id: "mp-express",
    name: "Machu Picchu Express",
    oldPrice: "$300 USD",
    price: "SÓ $240 USD",
    image: "/src/assets/machu.png",
    message: "Olá! Quero aproveitar a oferta de Machu Picchu Express por $240 USD.",
    urgency: "Alta demanda!"
  },
  {
    id: "humantay-vip",
    name: "Humantay Lake VIP",
    oldPrice: "$35",
    price: "SÓ $22 USD",
    image: "/src/assets/humantay.png",
    message: "Olá! Quero Humantay Lake por USD 22.",
    urgency: "Últimas 5 vagas"
  },
  {
    id: "rainbow-mountain",
    name: "Rainbow Mountain",
    oldPrice: "$35",
    price: "SÓ $22 USD",
    image: "/src/assets/rainbow.png",
    message: "Olá! Quero Rainbow Mountain por USD 22.",
    urgency: "Limitado"
  },
  {
    id: "pallay-punchu",
    name: "Pallay Punchu Intenso",
    oldPrice: "$50",
    price: "SÓ $35 USD",
    image: "/src/assets/pallay.png",
    message: "Olá! Quero Pallay Punchu por USD 35.",
    urgency: "Lugar exclusivo"
  }
];
