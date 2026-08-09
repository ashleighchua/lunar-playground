import Link from 'next/link';

export function ToolGridItem({
  href,
  glyph,
  name,
  desc,
  badge,
}: {
  href: string;
  glyph: string;
  name: string;
  desc: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[18px] border border-[#F0EBF8]/10 bg-white/5 px-4 py-4.5 min-h-27.5 flex flex-col gap-2 hover:bg-white/8 hover:border-[#FF8FA3]/40 transition-colors"
    >
      <div className="text-2xl text-[#FF8FA3]">{glyph}</div>
      <div>
        <div className="font-serif text-[19px] leading-tight">{name}</div>
        <div className="text-xs leading-snug text-[#F0EBF8]/55 mt-1">{desc}</div>
      </div>
      {badge && (
        <div className="text-[10px] tracking-widest uppercase text-[#655E78] mt-auto">{badge}</div>
      )}
    </Link>
  );
}
