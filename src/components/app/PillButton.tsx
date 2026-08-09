import Link from 'next/link';

type Variant = 'solid' | 'outline';

const base = 'inline-flex items-center justify-center rounded-full text-[13.5px] font-medium px-4.5 py-2.75 transition-colors';

const variants: Record<Variant, string> = {
  solid: 'text-[#2D2640]',
  outline: 'border border-[#FF8FA3]/50 text-[#FF8FA3]',
};

const solidStyle = { background: 'linear-gradient(135deg, #FF8FA3, #C4365A)' };

export function PillButton({
  href,
  variant = 'solid',
  children,
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]}`}
      style={variant === 'solid' ? solidStyle : undefined}
    >
      {children}
    </Link>
  );
}
