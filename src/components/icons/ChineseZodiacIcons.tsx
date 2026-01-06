/**
 * Chinese zodiac icons matching the minimalist line-art style
 */

interface IconProps {
  className?: string;
  size?: number;
}

export function RatIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Curled up rat, side profile */}
      <path d="M20 38c-6 0-10-4-10-10 0-8 8-14 18-14 8 0 14 4 16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M44 24c4 2 6 6 6 12 0 8-6 12-14 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Ear */}
      <ellipse cx="18" cy="20" rx="4" ry="5" stroke="currentColor" strokeWidth="2" />
      {/* Eye */}
      <circle cx="24" cy="26" r="2" fill="currentColor" />
      {/* Nose */}
      <circle cx="12" cy="30" r="2" stroke="currentColor" strokeWidth="2" />
      {/* Tail */}
      <path d="M50 38c4 1 8-2 10-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Whiskers */}
      <path d="M12 28l-4-2M12 32l-4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function OxIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Body */}
      <ellipse cx="36" cy="38" rx="18" ry="12" stroke="currentColor" strokeWidth="2" />
      {/* Head */}
      <ellipse cx="14" cy="32" rx="8" ry="10" stroke="currentColor" strokeWidth="2" />
      {/* Horns */}
      <path d="M10 22c-4-6-2-12 2-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 22c4-6 2-12-2-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="12" cy="30" r="2" fill="currentColor" />
      {/* Nose */}
      <ellipse cx="10" cy="38" rx="3" ry="2" stroke="currentColor" strokeWidth="2" />
      {/* Legs */}
      <path d="M24 48v8M32 50v6M44 50v6M52 48v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Tail */}
      <path d="M54 38c2 4 1 8-2 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TigerIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Body */}
      <ellipse cx="36" cy="38" rx="18" ry="12" stroke="currentColor" strokeWidth="2" />
      {/* Head */}
      <ellipse cx="14" cy="34" rx="10" ry="10" stroke="currentColor" strokeWidth="2" />
      {/* Ears */}
      <path d="M8 24c-2-4-1-8 2-8 2 0 3 2 3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 24c2-4 1-8-2-8-2 0-3 2-3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="12" cy="32" r="2" fill="currentColor" />
      {/* Nose and mouth */}
      <path d="M6 38c2 2 4 2 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Stripes on body */}
      <path d="M28 32v12M34 30v16M40 30v16M46 32v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Legs */}
      <path d="M24 48v8M32 50v6M44 50v6M52 48v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Tail */}
      <path d="M54 36c4-2 6 2 4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function RabbitIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Body */}
      <ellipse cx="32" cy="44" rx="14" ry="12" stroke="currentColor" strokeWidth="2" />
      {/* Head */}
      <ellipse cx="44" cy="36" rx="10" ry="10" stroke="currentColor" strokeWidth="2" />
      {/* Ears */}
      <path d="M40 26c-1-10 0-18 4-18 3 0 4 4 4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 26c1-10 0-18-4-18-3 0-4 4-4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="48" cy="34" r="2" fill="currentColor" />
      {/* Nose */}
      <circle cx="54" cy="38" r="2" stroke="currentColor" strokeWidth="2" />
      {/* Front legs */}
      <path d="M40 54v4M46 52v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Back legs */}
      <ellipse cx="22" cy="50" rx="6" ry="4" stroke="currentColor" strokeWidth="2" />
      {/* Tail */}
      <circle cx="18" cy="42" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function DragonIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Serpentine body */}
      <path d="M16 32c0-8 6-14 14-14 6 0 10 4 12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 28c4 6 6 14 2 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="14" cy="36" rx="8" ry="6" stroke="currentColor" strokeWidth="2" />
      {/* Horns/spikes */}
      <path d="M10 18c-2-6 0-10 4-10 2 0 3 2 2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 18c0-6 2-10 6-8 2 1 2 4 0 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="12" cy="34" r="2" fill="currentColor" />
      {/* Mouth whiskers */}
      <path d="M6 38l-4 2M6 40l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Legs */}
      <path d="M24 28l-4 8M26 28l4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 40l-2 8M44 42l2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Claws */}
      <path d="M18 36l2 1M22 36l-2 1M30 36l2 1M34 36l-2 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Tail flame */}
      <path d="M44 50c2 4 6 6 10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SnakeIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Coiled snake body - S shape */}
      <path d="M12 20c0-6 6-10 14-10 10 0 14 8 14 16 0 6-4 10-10 10-8 0-12 6-12 12 0 4 4 8 10 8 8 0 14-6 18-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="50" cy="40" rx="6" ry="4" stroke="currentColor" strokeWidth="2" />
      {/* Eye */}
      <circle cx="52" cy="39" r="1.5" fill="currentColor" />
      {/* Tongue */}
      <path d="M56 40l4-2M56 40l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function HorseIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Body */}
      <ellipse cx="36" cy="36" rx="16" ry="12" stroke="currentColor" strokeWidth="2" />
      {/* Neck and head */}
      <path d="M20 36c-4-4-6-10-4-16 1-4 4-6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="18" cy="18" rx="6" ry="8" stroke="currentColor" strokeWidth="2" />
      {/* Ear */}
      <path d="M16 10c-1-4 1-6 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Mane */}
      <path d="M22 12c2-2 4-2 6 0M24 16c2-1 4-1 6 1M22 20c2 0 4 0 6 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="16" cy="16" r="2" fill="currentColor" />
      {/* Nostril */}
      <circle cx="12" cy="22" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Legs */}
      <path d="M26 46v10M34 48v8M42 48v8M50 46v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Tail */}
      <path d="M52 34c4-2 8-1 8 4 0 4-4 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GoatIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Body */}
      <ellipse cx="36" cy="38" rx="16" ry="10" stroke="currentColor" strokeWidth="2" />
      {/* Head */}
      <ellipse cx="14" cy="32" rx="8" ry="8" stroke="currentColor" strokeWidth="2" />
      {/* Horns */}
      <path d="M10 24c-6-4-8-12-4-16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 24c6-4 8-12 4-16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Ears */}
      <path d="M6 28c-4 0-4 4-2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 28c4 0 4 4 2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="12" cy="30" r="2" fill="currentColor" />
      {/* Beard */}
      <path d="M10 40c-2 4-2 8 0 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Legs */}
      <path d="M26 46v10M34 48v8M42 48v8M50 46v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Tail */}
      <path d="M52 36c2 2 2 6 0 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MonkeyIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Body - sitting */}
      <ellipse cx="32" cy="44" rx="12" ry="10" stroke="currentColor" strokeWidth="2" />
      {/* Head */}
      <circle cx="32" cy="24" r="12" stroke="currentColor" strokeWidth="2" />
      {/* Face inner */}
      <ellipse cx="32" cy="28" rx="6" ry="5" stroke="currentColor" strokeWidth="1.5" />
      {/* Ears */}
      <circle cx="18" cy="24" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="46" cy="24" r="4" stroke="currentColor" strokeWidth="2" />
      {/* Eyes */}
      <circle cx="28" cy="22" r="2" fill="currentColor" />
      <circle cx="36" cy="22" r="2" fill="currentColor" />
      {/* Nose */}
      <ellipse cx="32" cy="28" rx="2" ry="1.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Mouth */}
      <path d="M30 32c1 1 3 1 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Arms */}
      <path d="M20 40c-6-2-10 0-10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M44 40c6-2 10 0 10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Legs */}
      <path d="M26 52v6M38 52v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Tail */}
      <path d="M20 48c-6 1-10 6-8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function RoosterIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Body */}
      <ellipse cx="32" cy="40" rx="14" ry="12" stroke="currentColor" strokeWidth="2" />
      {/* Neck */}
      <path d="M20 36c-2-6-2-12 2-18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Head */}
      <circle cx="20" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
      {/* Comb */}
      <path d="M16 8c-1-4 1-6 4-4M20 8c0-4 2-6 4-2M24 10c1-4 3-4 4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Wattle */}
      <path d="M14 22c-2 2-2 6 0 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="18" cy="14" r="2" fill="currentColor" />
      {/* Beak */}
      <path d="M26 18l6-2-6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Tail feathers */}
      <path d="M46 36c6-8 10-8 12-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M46 40c8-4 12-2 12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M46 44c6 2 10 6 8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Legs */}
      <path d="M28 50v8M36 50v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Feet */}
      <path d="M26 58l4-2M28 58l4 2M34 58l4-2M36 58l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DogIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Body */}
      <ellipse cx="38" cy="38" rx="16" ry="10" stroke="currentColor" strokeWidth="2" />
      {/* Head */}
      <ellipse cx="16" cy="30" rx="10" ry="10" stroke="currentColor" strokeWidth="2" />
      {/* Snout */}
      <ellipse cx="8" cy="34" rx="4" ry="3" stroke="currentColor" strokeWidth="2" />
      {/* Ear */}
      <path d="M20 20c4-6 2-12-2-12-3 0-5 4-4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="16" cy="28" r="2" fill="currentColor" />
      {/* Nose */}
      <circle cx="6" cy="32" r="2" fill="currentColor" />
      {/* Legs */}
      <path d="M28 46v10M36 48v8M44 48v8M52 46v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Tail */}
      <path d="M54 34c4-4 8-4 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PigIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Body */}
      <ellipse cx="32" cy="38" rx="20" ry="14" stroke="currentColor" strokeWidth="2" />
      {/* Head */}
      <ellipse cx="54" cy="34" rx="8" ry="10" stroke="currentColor" strokeWidth="2" />
      {/* Snout */}
      <ellipse cx="60" cy="36" rx="4" ry="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="59" cy="35" r="1" fill="currentColor" />
      <circle cx="61" cy="35" r="1" fill="currentColor" />
      {/* Ear */}
      <path d="M50 24c-2-6 0-10 4-10 3 0 4 4 2 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="52" cy="32" r="2" fill="currentColor" />
      {/* Legs */}
      <path d="M18 50v8M26 52v6M38 52v6M46 50v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Tail */}
      <path d="M12 36c-4 0-6-4-4-6 2-2 6 0 6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Map animal name to icon component
export const chineseZodiacIcons: Record<string, React.FC<IconProps>> = {
  Rat: RatIcon,
  Ox: OxIcon,
  Tiger: TigerIcon,
  Rabbit: RabbitIcon,
  Dragon: DragonIcon,
  Snake: SnakeIcon,
  Horse: HorseIcon,
  Goat: GoatIcon,
  Monkey: MonkeyIcon,
  Rooster: RoosterIcon,
  Dog: DogIcon,
  Pig: PigIcon,
};

export function getChineseZodiacIcon(animalName: string): React.FC<IconProps> {
  return chineseZodiacIcons[animalName] || RatIcon;
}
