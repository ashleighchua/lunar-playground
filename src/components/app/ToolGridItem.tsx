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
      className="rounded-[18px] border border-[#F0E9DC]/10 bg-white/5 px-4 py-4.5 min-h-27.5 flex flex-col gap-2 hover:bg-white/8 hover:border-[#D9B878]/40 transition-colors"
    >
      <div className="text-2xl text-[#D9B878]">{glyph}</div>
      <div>
        <div className="font-serif text-[19px] leading-tight">{name}</div>
        <div className="text-xs leading-snug text-[#F0E9DC]/55 mt-1">{desc}</div>
      </div>
      {badge && (
        <div className="text-[10px] tracking-widest uppercase text-[#A6B4FF] mt-auto">{badge}</div>
      )}
    </Link>
  );
}
