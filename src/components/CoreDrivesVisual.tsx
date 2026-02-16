'use client';

export type CoreDrivePlanet = 'mercury' | 'venus' | 'mars' | 'saturn';

interface CoreDrivesVisualProps {
  mercurySign?: string | null;
  venusSign?: string | null;
  marsSign?: string | null;
  saturnSign?: string | null;
  className?: string;
  hoveredPlanet?: CoreDrivePlanet | null;
  onPlanetHover?: (planet: CoreDrivePlanet | null) => void;
}

export function CoreDrivesVisual({
  mercurySign,
  venusSign,
  marsSign,
  saturnSign,
  className = '',
  hoveredPlanet,
  onPlanetHover,
}: CoreDrivesVisualProps) {
  const isHovered = (planet: CoreDrivePlanet) => hoveredPlanet === planet;

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative w-64 h-64 md:w-72 md:h-72">
        {/* 2x2 Grid of quadrants */}
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Top Left - Mercury (Thinking) */}
          <g
            onMouseEnter={() => onPlanetHover?.('mercury')}
            onMouseLeave={() => onPlanetHover?.(null)}
            className="cursor-pointer"
                      >
            <rect
              x="2"
              y="2"
              width="96"
              height="96"
              rx="8"
              fill={hoveredPlanet === 'mercury' ? 'var(--mercury-ring)' : 'var(--mercury-fill)'}
              className="transition-all duration-300"
            />
            <text x="50" y="52" textAnchor="middle" className="text-[24px] fill-[var(--mercury-glyph)] pointer-events-none">
              ☿
            </text>
            <text x="50" y="72" textAnchor="middle" className="text-[9px] fill-[var(--mercury-glyph)] opacity-80 pointer-events-none">
              {mercurySign || '-'}
            </text>
          </g>

          {/* Top Right - Venus (Connecting) */}
          <g
            onMouseEnter={() => onPlanetHover?.('venus')}
            onMouseLeave={() => onPlanetHover?.(null)}
            className="cursor-pointer"
                      >
            <rect
              x="102"
              y="2"
              width="96"
              height="96"
              rx="8"
              fill={hoveredPlanet === 'venus' ? 'var(--venus-ring)' : 'var(--venus-fill)'}
              className="transition-all duration-300"
            />
            <text x="150" y="52" textAnchor="middle" className="text-[24px] fill-[var(--venus-glyph)] pointer-events-none">
              ♀
            </text>
            <text x="150" y="72" textAnchor="middle" className="text-[9px] fill-[var(--venus-glyph)] opacity-80 pointer-events-none">
              {venusSign || '-'}
            </text>
          </g>

          {/* Bottom Left - Mars (Acting) */}
          <g
            onMouseEnter={() => onPlanetHover?.('mars')}
            onMouseLeave={() => onPlanetHover?.(null)}
            className="cursor-pointer"
                      >
            <rect
              x="2"
              y="102"
              width="96"
              height="96"
              rx="8"
              fill={hoveredPlanet === 'mars' ? 'var(--mars-ring)' : 'var(--mars-fill)'}
              className="transition-all duration-300"
            />
            <text x="50" y="152" textAnchor="middle" className="text-[24px] fill-[var(--mars-glyph)] pointer-events-none">
              ♂
            </text>
            <text x="50" y="172" textAnchor="middle" className="text-[9px] fill-[var(--mars-glyph)] opacity-80 pointer-events-none">
              {marsSign || '-'}
            </text>
          </g>

          {/* Bottom Right - Saturn (Structuring) */}
          <g
            onMouseEnter={() => onPlanetHover?.('saturn')}
            onMouseLeave={() => onPlanetHover?.(null)}
            className="cursor-pointer"
                      >
            <rect
              x="102"
              y="102"
              width="96"
              height="96"
              rx="8"
              fill={hoveredPlanet === 'saturn' ? 'var(--saturn-ring)' : 'var(--saturn-fill)'}
              className="transition-all duration-300"
            />
            <text x="150" y="152" textAnchor="middle" className="text-[24px] fill-[var(--saturn-glyph)] pointer-events-none">
              ♄
            </text>
            <text x="150" y="172" textAnchor="middle" className="text-[9px] fill-[var(--saturn-glyph)] opacity-80 pointer-events-none">
              {saturnSign || '-'}
            </text>
          </g>

          {/* Center white circle */}
          <circle
            cx="100"
            cy="100"
            r="36"
            fill="white"
            className="drop-shadow-sm"
          />

          {/* Compass Icon in center */}
          <g transform="translate(100, 100)">
            {/* Outer ring */}
            <circle
              cx="0"
              cy="0"
              r="24"
              fill="none"
              stroke="var(--border-soft)"
              strokeWidth="1.5"
            />

            {/* Cardinal points */}
            <line x1="0" y1="-20" x2="0" y2="-16" stroke="var(--ink-tertiary)" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="16" x2="0" y2="20" stroke="var(--ink-tertiary)" strokeWidth="1" strokeLinecap="round" />
            <line x1="-20" y1="0" x2="-16" y2="0" stroke="var(--ink-tertiary)" strokeWidth="1" strokeLinecap="round" />
            <line x1="16" y1="0" x2="20" y2="0" stroke="var(--ink-tertiary)" strokeWidth="1" strokeLinecap="round" />

            {/* Compass needle - North pointing (darker) */}
            <polygon
              points="0,-14 -4,0 0,2 4,0"
              fill="var(--ink-primary)"
            />

            {/* Compass needle - South pointing (lighter) */}
            <polygon
              points="0,14 -4,0 0,-2 4,0"
              fill="var(--ink-tertiary)"
            />

            {/* Center dot */}
            <circle cx="0" cy="0" r="2" fill="var(--ink-secondary)" />
          </g>
        </svg>
      </div>
    </div>
  );
}
