/**
 * Big Three Triangle - Visual representation of Sun, Moon, Rising
 * Three lenses, one system
 * Interactive hover states to connect with description boxes
 */

'use client';

interface BigThreeTriangleProps {
  sunSign?: string | null;
  moonSign?: string | null;
  risingSign?: string | null;
  className?: string;
  hoveredNode?: 'sun' | 'moon' | 'rising' | null;
  onNodeHover?: (node: 'sun' | 'moon' | 'rising' | null) => void;
}

export function BigThreeTriangle({
  sunSign,
  moonSign,
  risingSign,
  className = '',
  hoveredNode,
  onNodeHover,
}: BigThreeTriangleProps) {
  const handleMouseEnter = (node: 'sun' | 'moon' | 'rising') => {
    onNodeHover?.(node);
  };

  const handleMouseLeave = () => {
    onNodeHover?.(null);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 450"
      className={className}
      role="img"
      aria-label={`Big three triangle: Sun in ${sunSign || 'unknown'}, Moon in ${moonSign || 'unknown'}, Rising in ${risingSign || 'unknown'}`}
    >
      <defs>
        <linearGradient id="triFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--triangle-fill-top, #F6F0E6)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="var(--triangle-fill-bottom, #F3EEE6)" stopOpacity="0.25" />
        </linearGradient>

        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.10" />
        </filter>

        <filter id="nodeGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 0.25 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Active glow filter for hover state */}
        <filter id="activeGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 0.5 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width="600" height="450" fill="transparent" />

      {/* Triangle with shadow */}
      <g filter="url(#softShadow)">
        <path d="M300 100 L140 340 L460 340 Z" fill="url(#triFill)" />
      </g>

      {/* Edges */}
      <path d="M300 100 L140 340" fill="none" stroke="var(--border-medium, #C9C2B8)" strokeWidth="2" />
      <path d="M140 340 L460 340" fill="none" stroke="var(--border-medium, #C9C2B8)" strokeWidth="2" />
      <path d="M460 340 L300 100" fill="none" stroke="var(--border-medium, #C9C2B8)" strokeWidth="2" />

      {/* Inner guide lines */}
      <path
        d="M300 100 L300 340"
        fill="none"
        stroke="var(--border-soft, #D7D0C6)"
        strokeWidth="1.5"
        strokeDasharray="5 7"
        opacity="0.7"
      />
      <path
        d="M140 340 L380 220"
        fill="none"
        stroke="var(--border-soft, #D7D0C6)"
        strokeWidth="1.5"
        strokeDasharray="5 7"
        opacity="0.55"
      />
      <path
        d="M460 340 L220 220"
        fill="none"
        stroke="var(--border-soft, #D7D0C6)"
        strokeWidth="1.5"
        strokeDasharray="5 7"
        opacity="0.55"
      />

      {/* Nodes */}
      <g filter="url(#nodeGlow)">
        {/* Sun node */}
        <g
          onMouseEnter={() => handleMouseEnter('sun')}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: 'pointer' }}
          filter={hoveredNode === 'sun' ? 'url(#activeGlow)' : undefined}
        >
          <circle
            cx="300"
            cy="100"
            r="22"
            fill="var(--sun-fill, #FDF3E3)"
            stroke="var(--sun-stroke, #D4A84B)"
            strokeWidth={hoveredNode === 'sun' ? '3' : '2'}
            style={{ transition: 'stroke-width 0.2s ease' }}
          />
          <circle
            cx="300"
            cy="100"
            r={hoveredNode === 'sun' ? '40' : '34'}
            fill="none"
            stroke="var(--sun-ring, #F5D89A)"
            strokeWidth={hoveredNode === 'sun' ? '3' : '2'}
            opacity={hoveredNode === 'sun' ? '1' : '0.7'}
            style={{ transition: 'all 0.2s ease' }}
          />
        </g>

        {/* Moon node */}
        <g
          onMouseEnter={() => handleMouseEnter('moon')}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: 'pointer' }}
          filter={hoveredNode === 'moon' ? 'url(#activeGlow)' : undefined}
        >
          <circle
            cx="140"
            cy="340"
            r="22"
            fill="var(--moon-fill, #F5EBE4)"
            stroke="var(--moon-stroke, #C4A88F)"
            strokeWidth={hoveredNode === 'moon' ? '3' : '2'}
            style={{ transition: 'stroke-width 0.2s ease' }}
          />
          <circle
            cx="140"
            cy="340"
            r={hoveredNode === 'moon' ? '40' : '34'}
            fill="none"
            stroke="var(--moon-ring, #E4D6CC)"
            strokeWidth={hoveredNode === 'moon' ? '3' : '2'}
            opacity={hoveredNode === 'moon' ? '1' : '0.65'}
            style={{ transition: 'all 0.2s ease' }}
          />
        </g>

        {/* Rising node */}
        <g
          onMouseEnter={() => handleMouseEnter('rising')}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: 'pointer' }}
          filter={hoveredNode === 'rising' ? 'url(#activeGlow)' : undefined}
        >
          <circle
            cx="460"
            cy="340"
            r="22"
            fill="var(--rising-fill, #EDF4ED)"
            stroke="var(--rising-stroke, #9CB896)"
            strokeWidth={hoveredNode === 'rising' ? '3' : '2'}
            style={{ transition: 'stroke-width 0.2s ease' }}
          />
          <circle
            cx="460"
            cy="340"
            r={hoveredNode === 'rising' ? '40' : '34'}
            fill="none"
            stroke="var(--rising-ring, #D8E0D2)"
            strokeWidth={hoveredNode === 'rising' ? '3' : '2'}
            opacity={hoveredNode === 'rising' ? '1' : '0.65'}
            style={{ transition: 'all 0.2s ease' }}
          />
        </g>
      </g>

      {/* Glyphs inside nodes */}
      <text
        x="300"
        y="106"
        textAnchor="middle"
        fill="var(--sun-glyph, #8B6914)"
        style={{ font: '600 18px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif', pointerEvents: 'none' }}
      >
        ☉
      </text>
      <text
        x="140"
        y="346"
        textAnchor="middle"
        fill="var(--moon-glyph, #7A5C45)"
        style={{ font: '600 18px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif', pointerEvents: 'none' }}
      >
        ☽
      </text>
      <text
        x="460"
        y="346"
        textAnchor="middle"
        fill="var(--rising-glyph, #4A6B44)"
        style={{ font: '600 18px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif', pointerEvents: 'none' }}
      >
        ↑
      </text>

      {/* Labels - simplified, just name and sign */}
      <g>
        {/* Sun label - top */}
        <text
          x="300"
          y="36"
          textAnchor="middle"
          fill="var(--ink-primary, #2A2A2A)"
          style={{ font: '600 14px ui-serif, Georgia, "Times New Roman", serif', letterSpacing: '0.02em' }}
        >
          Sun
        </text>
        <text
          x="300"
          y="56"
          textAnchor="middle"
          fill="var(--sun-glyph, #8B6914)"
          style={{ font: '500 13px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }}
        >
          {sunSign || '—'}
        </text>

        {/* Moon label - bottom left */}
        <text
          x="70"
          y="378"
          textAnchor="start"
          fill="var(--ink-primary, #2A2A2A)"
          style={{ font: '600 14px ui-serif, Georgia, "Times New Roman", serif', letterSpacing: '0.02em' }}
        >
          Moon
        </text>
        <text
          x="70"
          y="398"
          textAnchor="start"
          fill="var(--moon-glyph, #7A5C45)"
          style={{ font: '500 13px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }}
        >
          {moonSign || '—'}
        </text>

        {/* Rising label - bottom right */}
        <text
          x="530"
          y="378"
          textAnchor="end"
          fill="var(--ink-primary, #2A2A2A)"
          style={{ font: '600 14px ui-serif, Georgia, "Times New Roman", serif', letterSpacing: '0.02em' }}
        >
          Rising
        </text>
        <text
          x="530"
          y="398"
          textAnchor="end"
          fill="var(--rising-glyph, #4A6B44)"
          style={{ font: '500 13px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }}
        >
          {risingSign || '—'}
        </text>
      </g>

      {/* Center hint */}
      <text
        x="300"
        y="235"
        textAnchor="middle"
        fill="var(--ink-tertiary, #7A746C)"
        style={{ font: '500 12px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }}
      >
        Three lenses, one system
      </text>
    </svg>
  );
}
