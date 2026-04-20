import { useState } from 'react';
import { faqs } from '../data/tours';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <HelpCircle className="mx-auto mb-4 text-brand-cyan" size={32} />
        <h2 className="text-3xl font-bold text-brand-dark mb-2">Tire suas dúvidas</h2>
        <p className="text-slate-500">Tudo o que você precisa saber antes de embarcar</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-brand-dark hover:bg-slate-50 transition-colors"
            >
              <span>{faq.question}</span>
              <ChevronDown 
                className={`transition-transform duration-300 text-brand-cyan ${openIndex === idx ? 'rotate-180' : ''}`} 
                size={20} 
              />
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-slate-50"
                >
                  <p className="p-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};
