import type { BigThree } from '@/lib/bigThree';

const ROWS: { key: keyof BigThree; glyph: string; label: string }[] = [
  { key: 'sun', glyph: '☉', label: 'Sun' },
  { key: 'moon', glyph: '☾', label: 'Moon' },
  { key: 'rising', glyph: '✧', label: 'Rising' },
];

export function BigThreeChips({ bigThree }: { bigThree: BigThree | null }) {
  return (
    <div className="flex gap-2.5">
      {ROWS.map((row) => {
        const value = bigThree ? bigThree[row.key] : null;
        return (
          <div
            key={row.key}
            className="flex-1 rounded-2xl border border-[#F0E9DC]/10 bg-white/4 py-3.5 px-2 text-center"
          >
            <div className="text-xl text-[#D9B878]">{row.glyph}</div>
            <div className="font-serif text-[19px] mt-1">{value ?? '—'}</div>
            <div className="text-[10.5px] tracking-[0.14em] uppercase text-[#F0E9DC]/45 mt-0.5">
              {row.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
