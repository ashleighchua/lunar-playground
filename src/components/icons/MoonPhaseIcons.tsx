/**
 * Minimalist line-art moon phase icons
 * Clean, single-stroke doodle style
 */

interface IconProps {
  className?: string;
  size?: number;
}

export function NewMoonIcon({ className = '', size = 120 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className}>
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function WaxingCrescentIcon({ className = '', size = 120 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className}>
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M60 20C45 20 35 35 35 60C35 85 45 100 60 100"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </svg>
  );
}

export function FirstQuarterIcon({ className = '', size = 120 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className}>
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M60 20C60 20 60 100 60 100"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M60 20C40 20 20 38 20 60C20 82 40 100 60 100"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </svg>
  );
}

export function WaxingGibbousIcon({ className = '', size = 120 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className}>
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M60 20C75 20 85 35 85 60C85 85 75 100 60 100C40 100 20 82 20 60C20 38 40 20 60 20Z"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </svg>
  );
}

export function FullMoonIcon({ className = '', size = 120 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className}>
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

export function WaningGibbousIcon({ className = '', size = 120 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className}>
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M60 20C45 20 35 35 35 60C35 85 45 100 60 100C80 100 100 82 100 60C100 38 80 20 60 20Z"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </svg>
  );
}

export function LastQuarterIcon({ className = '', size = 120 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className}>
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M60 20C60 20 60 100 60 100"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M60 20C80 20 100 38 100 60C100 82 80 100 60 100"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </svg>
  );
}

export function WaningCrescentIcon({ className = '', size = 120 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className}>
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M60 20C75 20 85 35 85 60C85 85 75 100 60 100"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </svg>
  );
}

// Map phase name to icon component
export const moonPhaseIcons: Record<string, React.FC<IconProps>> = {
  'New Moon': NewMoonIcon,
  'Waxing Crescent': WaxingCrescentIcon,
  'First Quarter': FirstQuarterIcon,
  'Waxing Gibbous': WaxingGibbousIcon,
  'Full Moon': FullMoonIcon,
  'Waning Gibbous': WaningGibbousIcon,
  'Last Quarter': LastQuarterIcon,
  'Waning Crescent': WaningCrescentIcon,
};

export function getMoonPhaseIcon(phaseName: string): React.FC<IconProps> {
  return moonPhaseIcons[phaseName] || NewMoonIcon;
}
