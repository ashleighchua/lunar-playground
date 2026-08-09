import Link from 'next/link';

// Static placeholder — live moon-phase data is out of scope for this pass
// (see the design handoff's own "Next steps" note).
export function SkyTonightCard() {
  return (
    <Link
      href="/transit"
      className="flex items-center gap-4 rounded-[20px] border border-[#F0EBF8]/10 bg-white/5 p-5 hover:bg-white/8 transition-colors"
    >
      <div
        className="w-14.5 h-14.5 rounded-full flex-none"
        style={{
          background: 'radial-gradient(circle at 32% 32%, #F0EBF8 58%, #2D2640 60%)',
          boxShadow: '0 0 24px rgba(240,235,248,0.25)',
        }}
      />
      <div className="flex-1">
        <div className="text-[11px] tracking-[0.16em] uppercase text-[#F0EBF8]/50">Sky tonight</div>
        <div className="font-serif text-[21px] mt-0.5 mb-1">Waning Gibbous in Pisces</div>
        <div className="text-[13px] text-[#F0EBF8]/60 leading-snug">
          A finishing day, not a starting one. Full guidance in Sky Guide →
        </div>
      </div>
    </Link>
  );
}
