'use client';

/**
 * SVG-based moon phase display
 * Uses site colors instead of emoji for a cohesive aesthetic
 */

interface MoonPhaseDisplayProps {
  phase: string;
  size?: number;
  className?: string;
}

export function MoonPhaseDisplay({ phase, size = 180, className = '' }: MoonPhaseDisplayProps) {
  // Calculate the illumination curve based on phase
  const getPhaseIllumination = (phaseName: string) => {
    switch (phaseName) {
      case 'New Moon':
        return { illuminated: 0, waxing: true };
      case 'Waxing Crescent':
        return { illuminated: 0.25, waxing: true };
      case 'First Quarter':
        return { illuminated: 0.5, waxing: true };
      case 'Waxing Gibbous':
        return { illuminated: 0.75, waxing: true };
      case 'Full Moon':
        return { illuminated: 1, waxing: true };
      case 'Waning Gibbous':
        return { illuminated: 0.75, waxing: false };
      case 'Last Quarter':
        return { illuminated: 0.5, waxing: false };
      case 'Waning Crescent':
        return { illuminated: 0.25, waxing: false };
      default:
        return { illuminated: 1, waxing: true };
    }
  };

  const { illuminated, waxing } = getPhaseIllumination(phase);
  const center = size / 2;
  const radius = (size / 2) * 0.85;

  // Create the moon's illuminated portion using an ellipse
  // The x-radius of the inner ellipse determines the phase shape
  const innerRadiusX = Math.abs(illuminated - 0.5) * 2 * radius;
  const isFirstHalf = illuminated < 0.5;

  // Determine which side is lit based on waxing/waning
  // Waxing: right side grows (lit on right)
  // Waning: left side shrinks (lit on left)
  let clipPath = '';
  let shadowPath = '';

  if (illuminated === 0) {
    // New moon - all shadow
    shadowPath = `M ${center - radius} ${center} A ${radius} ${radius} 0 1 1 ${center + radius} ${center} A ${radius} ${radius} 0 1 1 ${center - radius} ${center}`;
  } else if (illuminated === 1) {
    // Full moon - all illuminated
    clipPath = '';
  } else {
    // Partial phases
    if (waxing) {
      // Right side is illuminated
      if (illuminated < 0.5) {
        // Less than half: crescent on right
        shadowPath = `M ${center} ${center - radius} A ${radius} ${radius} 0 1 0 ${center} ${center + radius} A ${innerRadiusX} ${radius} 0 0 0 ${center} ${center - radius}`;
      } else {
        // More than half: gibbous (shadow crescent on left)
        shadowPath = `M ${center} ${center - radius} A ${radius} ${radius} 0 1 0 ${center} ${center + radius} A ${innerRadiusX} ${radius} 0 0 1 ${center} ${center - radius}`;
      }
    } else {
      // Left side is illuminated (waning)
      if (illuminated < 0.5) {
        // Less than half: crescent on left
        shadowPath = `M ${center} ${center - radius} A ${radius} ${radius} 0 1 1 ${center} ${center + radius} A ${innerRadiusX} ${radius} 0 0 1 ${center} ${center - radius}`;
      } else {
        // More than half: gibbous (shadow crescent on right)
        shadowPath = `M ${center} ${center - radius} A ${radius} ${radius} 0 1 1 ${center} ${center + radius} A ${innerRadiusX} ${radius} 0 0 0 ${center} ${center - radius}`;
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-lg"
      >
        {/* Subtle glow effect */}
        <defs>
          <radialGradient id={`moonGlow-${phase.replace(/\s/g, '')}`} cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#E8E4DE" stopOpacity="1" />
            <stop offset="100%" stopColor="#D4D0CA" stopOpacity="1" />
          </radialGradient>
          <filter id={`moonShadow-${phase.replace(/\s/g, '')}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#2D2640" floodOpacity="0.1"/>
          </filter>
        </defs>

        {/* Moon base circle - illuminated portion */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill={`url(#moonGlow-${phase.replace(/\s/g, '')})`}
          filter={`url(#moonShadow-${phase.replace(/\s/g, '')})`}
        />

        {/* Shadow portion overlay */}
        {shadowPath && (
          <path
            d={shadowPath}
            fill="#3A3A3A"
            opacity="0.85"
          />
        )}

        {/* Subtle crater details for texture */}
        {illuminated > 0 && (
          <g opacity="0.1">
            <circle cx={center - radius * 0.3} cy={center - radius * 0.2} r={radius * 0.15} fill="#2D2640" />
            <circle cx={center + radius * 0.2} cy={center + radius * 0.3} r={radius * 0.1} fill="#2D2640" />
            <circle cx={center - radius * 0.1} cy={center + radius * 0.5} r={radius * 0.08} fill="#2D2640" />
            <circle cx={center + radius * 0.4} cy={center - radius * 0.1} r={radius * 0.12} fill="#2D2640" />
          </g>
        )}
      </svg>
    </div>
  );
}
