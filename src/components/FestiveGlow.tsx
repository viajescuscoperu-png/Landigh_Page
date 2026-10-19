// Luces difuminadas (efecto "bokeh") flotando de fondo — el detalle visual
// más característico de la fotografía navideña. Decorativo, promoción de
// fin de año (diciembre).
const BLOBS = [
  { size: 150, left: '8%', top: '12%', color: 'var(--color-xmas-gold)', delay: '0s' },
  { size: 95, left: '72%', top: '8%', color: 'var(--color-xmas-red)', delay: '-4s' },
  { size: 180, left: '58%', top: '55%', color: 'var(--color-xmas-gold)', delay: '-8s' },
  { size: 75, left: '18%', top: '68%', color: 'var(--color-xmas-green)', delay: '-2s' },
  { size: 120, left: '88%', top: '58%', color: 'var(--color-xmas-gold)', delay: '-10s' },
  { size: 60, left: '38%', top: '30%', color: 'var(--color-xmas-red)', delay: '-6s' },
];

export const FestiveGlow = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-[4]" aria-hidden="true">
    {BLOBS.map((b, i) => (
      <div
        key={i}
        className="xmas-bokeh"
        style={{
          width: b.size,
          height: b.size,
          left: b.left,
          top: b.top,
          background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
          animationDelay: b.delay,
        }}
      />
    ))}
  </div>
);
