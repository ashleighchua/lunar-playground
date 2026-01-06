/**
 * Minimalist line-art zodiac icons
 * Clean, single-stroke doodle style
 */

interface IconProps {
  className?: string;
  size?: number;
}

export function AriesIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M12 36C12 36 12 20 12 16C12 10 16 6 20 6C24 6 24 10 24 14C24 10 24 6 28 6C32 6 36 10 36 16C36 20 36 36 36 36"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TaurusIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M12 12C16 8 32 8 36 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="24"
        cy="28"
        r="12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function GeminiIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M10 8H38M10 40H38M16 8V40M32 8V40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CancerIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M32 16C32 16 28 12 22 12C16 12 12 16 12 20C12 24 16 26 20 26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 32C16 32 20 36 26 36C32 36 36 32 36 28C36 24 32 22 28 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LeoIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M22 16C22 16 28 16 28 24C28 32 22 32 22 38C22 42 26 42 30 42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function VirgoIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M10 8V32C10 32 10 40 18 40M18 8V40M26 8V32C26 32 26 40 34 36C34 36 38 34 38 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LibraIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M8 36H40M8 28H40M14 28C14 28 14 16 24 16C34 16 34 28 34 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ScorpioIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M10 8V32C10 32 10 40 18 40M18 8V40M26 8V40C26 40 26 40 34 40L38 36M34 40L38 44"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SagittariusIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M10 38L38 10M38 10H26M38 10V22M14 26L26 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CapricornIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M10 8V28C10 28 10 36 18 36C26 36 26 28 26 28V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M26 28C26 28 26 40 34 40C38 40 40 36 40 32C40 28 36 28 36 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AquariusIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M8 18L12 14L16 18L20 14L24 18L28 14L32 18L36 14L40 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 30L12 26L16 30L20 26L24 30L28 26L32 30L36 26L40 30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PiscesIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M16 8C16 8 8 16 8 24C8 32 16 40 16 40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M32 8C32 8 40 16 40 24C40 32 32 40 32 40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M6 24H42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Sun icon for sun sign
export function SunIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M24 4V10M24 38V44M44 24H38M10 24H4M38.6 9.4L34.2 13.8M13.8 34.2L9.4 38.6M38.6 38.6L34.2 34.2M13.8 13.8L9.4 9.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Moon icon for moon sign
export function MoonIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M36 24C36 30.627 30.627 36 24 36C17.373 36 12 30.627 12 24C12 17.373 17.373 12 24 12C20 16 20 32 24 36C28.418 34.418 32 29.627 32 24C32 18.373 28.418 13.582 24 12C30.627 12 36 17.373 36 24Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Rising/Ascendant icon
export function RisingIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M24 8L24 40M24 8L16 16M24 8L32 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 32H40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Map sign name to icon component
export const zodiacIcons: Record<string, React.FC<IconProps>> = {
  Aries: AriesIcon,
  Taurus: TaurusIcon,
  Gemini: GeminiIcon,
  Cancer: CancerIcon,
  Leo: LeoIcon,
  Virgo: VirgoIcon,
  Libra: LibraIcon,
  Scorpio: ScorpioIcon,
  Sagittarius: SagittariusIcon,
  Capricorn: CapricornIcon,
  Aquarius: AquariusIcon,
  Pisces: PiscesIcon,
};

export function getZodiacIcon(signName: string): React.FC<IconProps> {
  return zodiacIcons[signName] || AriesIcon;
}
