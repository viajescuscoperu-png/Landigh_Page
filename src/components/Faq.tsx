import React, { useState } from 'react';
import { faqs } from '../data/tours';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 max-w-2xl mx-auto px-4">
      <div className="text-center mb-10 text-slate-800">
        <HelpCircle className="mx-auto mb-4 text-cyan-500" size={32} />
        <h2 className="text-3xl font-bold mb-2">Tire suas dúvidas</h2>
        <p className="text-slate-500">Tudo o que você precisa saber antes de embarcar</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>{faq.question}</span>
              <ChevronDown 
                className={`transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} 
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
