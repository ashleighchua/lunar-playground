import Link from 'next/link';

type Variant = 'solid' | 'outline';

const base = 'inline-flex items-center justify-center rounded-full text-[13.5px] font-medium px-4.5 py-2.75 transition-colors';

const variants: Record<Variant, string> = {
  solid: 'text-[#241C0D]',
  outline: 'border border-[#D9B878]/50 text-[#D9B878]',
};

const solidStyle = { background: 'linear-gradient(135deg, #E2C188, #C9A260)' };

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
