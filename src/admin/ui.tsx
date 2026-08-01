import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

// Componentes de presentación compartidos por el panel de administrador,
// para no repetir las mismas clases de Tailwind en cada formulario.

export const CenteredCard = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">{children}</div>
  </div>
);

export const Card = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
    <h2 className="font-black text-brand-dark mb-4">{title}</h2>
    {children}
  </section>
);

export const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div>
    <label className="text-xs font-black uppercase text-slate-400">{label}</label>
    {children}
  </div>
);

const fieldClasses =
  'w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all';

export const TextInput = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`${fieldClasses} ${props.className ?? ''}`} />
);

export const TextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className={`${fieldClasses} resize-none ${props.className ?? ''}`} />
);

export const PrimaryButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`bg-brand-orange hover:bg-orange-600 text-white font-black rounded-xl transition-all disabled:opacity-50 ${props.className ?? 'px-8 py-3'}`}
  >
    {children}
  </button>
);

export const TextButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`text-sm font-bold text-slate-500 hover:text-brand-orange transition-colors ${props.className ?? ''}`}
  >
    {children}
  </button>
);

export const DangerTextButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`text-sm font-bold text-red-400 hover:text-red-600 transition-colors ${props.className ?? ''}`}
  >
    {children}
  </button>
);
