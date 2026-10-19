import { useState, type CSSProperties } from 'react';

interface Flake {
  left: number;
  duration: number;
  delay: number;
  size: number;
  drift: number;
  opacity: number;
}

const FLAKE_COUNT = 24;

// Decoración navideña de temporada (promoción de diciembre). Valores
// aleatorios generados una sola vez con useState(() => ...) para que no se
// recalculen -y los copos no "salten"- en cada re-render (el Hero actualiza
// su countdown cada segundo).
export const Snowfall = () => {
  const [flakes] = useState<Flake[]>(() =>
    Array.from({ length: FLAKE_COUNT }, () => ({
      left: Math.random() * 100,
      duration: 8 + Math.random() * 9,
      delay: Math.random() * -14,
      size: 12 + Math.random() * 16,
      drift: (Math.random() - 0.5) * 90,
      opacity: 0.55 + Math.random() * 0.4,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]" aria-hidden="true">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            fontSize: f.size,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            '--drift': `${f.drift}px`,
          } as CSSProperties}
        >
          ❄
        </span>
      ))}
    </div>
  );
};
