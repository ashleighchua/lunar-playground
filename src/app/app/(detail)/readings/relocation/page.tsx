import { CheckoutButton } from '@/components/CheckoutButton';
import { CityScoreCard, type CityScore } from '@/components/app/CityScoreCard';

// Static preview data for this pass — a real scoring engine
// (src/lib/astrocartography/cityScorer.ts) is still in progress; wire it in
// here once finished, computing from the user's stored birth chart instead.
const CITIES: CityScore[] = [
  { city: 'Lisbon', line: 'Venus line', color: '#C4365A', note: 'Ease, connection, aesthetics. Relationships tend to soften here.', score: 92 },
  { city: 'Tokyo', line: 'Sun line', color: '#FF8FA3', note: 'Visibility and career momentum. You get noticed here.', score: 88 },
  { city: 'Austin', line: 'Moon line', color: '#655E78', note: 'Feels like home fast. Good for putting down roots.', score: 81 },
];

const GETS = [
  'Your full planetary line map, city by city',
  'Deep-dives on 3 cities you choose',
  'Timing windows — when to move, not just where',
  'A written PDF report, calculated with Swiss Ephemeris and fact-checked',
];

export default function RelocationDetailPage() {
  return (
    <div className="px-5.5 pt-4 pb-16 flex flex-col gap-4.5">
      <div
        className="rounded-[22px] px-5 pt-6 pb-4.5 text-center"
        style={{ background: 'radial-gradient(circle at 50% 120%, #2D2640, #1E1835)', border: '1px solid rgba(240,235,248,0.12)' }}
      >
        <svg viewBox="0 0 300 190" className="w-full block">
          <circle cx="150" cy="95" r="76" fill="none" stroke="rgba(240,235,248,0.22)" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="150" cy="95" r="56" fill="none" stroke="rgba(240,235,248,0.12)" strokeWidth="1" strokeDasharray="2 4" />
          <path d="M60 170 Q 130 20 240 40" fill="none" stroke="#FF8FA3" strokeWidth="2" />
          <path d="M40 60 Q 150 110 260 55" fill="none" stroke="#C4365A" strokeWidth="2" />
          <path d="M110 15 Q 160 110 150 180" fill="none" stroke="#655E78" strokeWidth="2" />
          <circle cx="196" cy="43" r="4" fill="#FF8FA3" />
          <circle cx="150" cy="86" r="4" fill="#C4365A" />
          <circle cx="153" cy="120" r="4" fill="#655E78" />
        </svg>
        <div className="flex justify-center gap-4 mt-1.5 text-[11.5px] text-[#F0EBF8]/60">
          <div><span className="text-[#FF8FA3]">●</span> Sun · career</div>
          <div><span className="text-[#C4365A]">●</span> Venus · love</div>
          <div><span className="text-[#655E78]">●</span> Moon · home</div>
        </div>
      </div>

      <div>
        <div className="font-serif text-[30px] font-medium">Relocation Report</div>
        <div className="text-[13.5px] text-[#F0EBF8]/60 leading-relaxed mt-1.5">
          A preview from your chart. The full report goes city by city.
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {CITIES.map((c) => (
          <CityScoreCard key={c.city} {...c} />
        ))}
      </div>

      <div className="rounded-[18px] border border-[#F0EBF8]/10 bg-white/4 px-5 py-4.5 flex flex-col gap-2.25">
        <div className="text-[11px] tracking-[0.18em] uppercase text-[#F0EBF8]/45">What you get</div>
        {GETS.map((g) => (
          <div key={g} className="flex gap-2.5 text-[13.5px] leading-snug text-[#F0EBF8]/75">
            <span className="text-[#FF8FA3]">✦</span>
            <span>{g}</span>
          </div>
        ))}
      </div>

      <CheckoutButton
        productId="astrocartography"
        label="Get your report — $5"
        className="block w-full rounded-full py-4.25 text-center text-base font-semibold text-[#2D2640] bg-[linear-gradient(135deg,#FF8FA3,#C4365A)] disabled:opacity-60 transition-opacity"
      />
      <div
        className="text-center text-xs text-[#F0EBF8]/45 -mt-2.5"
      >
        Calculated with Swiss Ephemeris · delivered instantly
      </div>
    </div>
  );
}
