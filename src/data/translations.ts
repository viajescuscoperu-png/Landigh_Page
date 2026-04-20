export type Language = 'pt' | 'es' | 'en';

interface TranslationDictionary {
  [key: string]: {
    pt: string;
    es: string;
    en: string;
  };
}

export const t: TranslationDictionary = {
  // Global
  whatsapp_number: { pt: "+51 970 909 088", es: "+51 970 909 088", en: "+51 970 909 088" },
  email: { pt: "viajescuscoperu@gmail.com", es: "viajescuscoperu@gmail.com", en: "viajescuscoperu@gmail.com" },
  location: { pt: "Cusco, Perú", es: "Cusco, Perú", en: "Cusco, Peru" },
  
  // Hero
  hero_timer: { pt: "Oferta expira em:", es: "La oferta expira en:", en: "Offer expires in:" },
  hero_title_1: { pt: "Aventura", es: "Aventura", en: "VIP" },
  hero_title_vip: { pt: "VIP", es: "VIP", en: "Adventure" },
  hero_title_2: { pt: "em Cusco", es: "en Cusco", en: "in Cusco" },
  hero_subtitle: { 
    pt: "Viva a magia dos Andes com a agência n°1 de Cusco", 
    es: "Vive la magia de los Andes con la agencia n°1 de Cusco", 
    en: "Experience the magic of the Andes with Cusco's #1 agency" 
  },
  
  // Hero Checkmarks
  hero_check_1: { 
    pt: "Agência Oficial certificada pelo MINCETUR.", 
    es: "Agencia Oficial certificada por MINCETUR.", 
    en: "Official Agency certified by MINCETUR." 
  },
  hero_check_2: { 
    pt: "Mais de 500 passageiros viajaram conosco este mês.", 
    es: "Más de 500 pasajeros viajaron con nosotros este mes.", 
    en: "Over 500 passengers traveled with us this month." 
  },
  hero_check_3: { 
    pt: "Atendimento e frota 100% de operação direta.", 
    es: "Atención y flota 100% de operación directa.", 
    en: "100% direct operation service and fleet." 
  },

  // Hero Form
  hero_form_title: { pt: "Verifique Disponibilidade", es: "Verifica Disponibilidad", en: "Check Availability" },
  hero_form_dest: { pt: "Qual destino você procura?", es: "¿Qué destino buscas?", en: "Which destination are you looking for?" },
  hero_form_pax: { pt: "Quantas pessoas viajam?", es: "¿Cuántas personas viajan?", en: "How many people are traveling?" },
  hero_form_btn: { pt: "Cotar por WhatsApp agora", es: "Cotizar por WhatsApp ahora", en: "Quote via WhatsApp now" },

  // Offer Grid
  offer_title_1: { pt: "Ofertas", es: "Ofertas", en: "Exclusive" },
  offer_title_2: { pt: "Exclusivas", es: "Exclusivas", en: "Offers" },
  offer_subtitle: { pt: "Preços especiais válidos por tempo limitado", es: "Precios especiales válidos por tiempo limitado", en: "Special prices valid for a limited time" },
  tour_button: { pt: "Quero esta Oferta!", es: "¡Quiero esta Oferta!", en: "I want this Offer!" },

  // Testimonials
  testi_title: { pt: "O que dizem os viajantes", es: "Lo que dicen los viajeros", en: "What travelers say" },
  testi_subtitle: { pt: "Nossa maior garantia é a sua satisfação", es: "Nuestra mayor garantía es tu satisfacción", en: "Our greatest guarantee is your satisfaction" },

  // FAQ
  faq_title: { pt: "Tire suas dúvidas", es: "Resuelve tus dudas", en: "Solve your doubts" },
  faq_subtitle: { pt: "Tudo o que você precisa saber antes de embarcar", es: "Todo lo que necesitas saber antes de embarcar", en: "Everything you need to know before boarding" },

  // Footer
  footer_desc: { 
    pt: "Somos uma agência oficial de turismo certificada pelo Ministério de Turismo do Peru (MINCETUR). Especialistas em oferecer experiências inesquecíveis.", 
    es: "Somos una agencia oficial de turismo certificada por el Ministerio de Turismo de Perú (MINCETUR). Especialistas en ofrecer experiencias inolvidables.", 
    en: "We are an official tourism agency certified by the Peruvian Ministry of Tourism (MINCETUR). Specialists in providing unforgettable experiences." 
  },
  footer_title_links: { pt: "Links Úteis", es: "Enlaces Útiles", en: "Useful Links" },
  footer_link_1: { pt: "Site Oficial", es: "Sitio Oficial", en: "Official Site" },
  footer_link_2: { pt: "Destinos", es: "Destinos", en: "Destinations" },
  footer_link_3: { pt: "Blog de Viagens", es: "Blog de Viajes", en: "Travel Blog" },
  footer_link_4: { pt: "Fale Conosco", es: "Contáctanos", en: "Contact Us" },
  footer_title_contact: { pt: "Contato", es: "Contacto", en: "Contact" },
  footer_copyright: { 
    pt: "© 2026 Viajes Cusco Perú. Todos os direitos reservados. Agência registrada no MINCETUR.", 
    es: "© 2026 Viajes Cusco Perú. Todos los derechos reservados. Agencia registrada en MINCETUR.", 
    en: "© 2026 Viajes Cusco Perú. All rights reserved. Agency registered with MINCETUR." 
  },
  
  // Floating Btn
  whatsapp_msg: { 
    pt: "Olá! Gostaria de mais informações sobre as ofertas de Cusco.", 
    es: "¡Hola! Me gustaría tener más información sobre las ofertas de Cusco.", 
    en: "Hello! I would like more information about the Cusco offers." 
  }
};
