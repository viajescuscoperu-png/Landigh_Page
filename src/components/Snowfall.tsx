import { useState, type CSSProperties } from 'react';

interface Flake {
  left: number;
  duration: number;
  delay: number;
  size: number;
  drift: number;
  opacity: number;
}

interface SnowfallProps {
  /** Cuántos copos generar. */
  count?: number;
  /**
   * 'section' (por defecto): se posiciona `absolute` dentro de la sección
   * que lo contiene (ej. el Hero), recortado por su overflow-hidden.
   * 'ambient': se posiciona `fixed` cubriendo toda la pantalla, para que
   * siga nevando mientras el visitante hace scroll por el resto de la página.
   */
  variant?: 'section' | 'ambient';
}

// Decoración navideña de temporada (promoción de fin de año). Valores
// aleatorios generados una sola vez con useState(() => ...) para que no se
// recalculen -y los copos no "salten"- en cada re-render.
export const Snowfall = ({ count = 26, variant = 'section' }: SnowfallProps) => {
  const [flakes] = useState<Flake[]>(() =>
    Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      duration: 8 + Math.random() * 9,
      delay: Math.random() * -14,
      size: variant === 'ambient' ? 6 + Math.random() * 9 : 12 + Math.random() * 16,
      drift: (Math.random() - 0.5) * 90,
      opacity: variant === 'ambient' ? 0.18 + Math.random() * 0.22 : 0.55 + Math.random() * 0.4,
    }))
  );

  // La variante 'ambient' va por encima de TODO el contenido (como la
  // mayoría de efectos de nieve en sitios web), pero copos chicos y
  // translúcidos para que nunca estorbe la lectura; 'pointer-events-none'
  // además garantiza que ningún clic se vea afectado.
  const wrapperClass =
    variant === 'ambient'
      ? 'fixed inset-0 overflow-hidden pointer-events-none z-[45]'
      : 'absolute inset-0 overflow-hidden pointer-events-none z-[5]';

  return (
    <div className={wrapperClass} aria-hidden="true">
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
