import Link from 'next/link';
import { CheckoutButton } from '@/components/CheckoutButton';
import { PillButton } from '@/components/app/PillButton';
import { reviews } from '@/data/reviews';

const outlinePillClasses =
  'inline-flex items-center justify-center rounded-full text-[13.5px] font-medium px-4.5 py-2.75 border border-[#FF8FA3]/50 text-[#FF8FA3] hover:bg-[#FF8FA3]/10 transition-colors bg-transparent';

export default function AppReadingsPage() {
  const quotes = reviews.slice(0, 2);

  return (
    <div className="px-5.5 pt-20 pb-30 flex flex-col gap-4.5">
      <div>
        <div className="font-serif text-[32px] font-medium leading-[1.05]">
          Two readings.<br />That&rsquo;s it.
        </div>
        <div className="text-sm text-[#F0EBF8]/55 mt-2">
          One to understand yourself. One to know where to go. Both calculated with Swiss Ephemeris and phrased by AI true to your chart.
        </div>
      </div>

      <div className="rounded-[20px] border border-[#F0EBF8]/10 bg-white/5 p-5.5">
        <div className="text-2xl text-[#FF8FA3]">☉</div>
        <div className="font-serif text-2xl mt-2.5 mb-1">Natal Chart Reading</div>
        <div className="text-xs tracking-[0.14em] uppercase text-[#F0EBF8]/50">
          Who you are at your core
        </div>
        <div className="text-[13.5px] leading-relaxed text-[#F0EBF8]/65 my-3">
          Core drives, decision-making, relationships, work, and growth edges — plus practical takeaways you can actually use.
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="font-serif text-[26px]">$5</div>
          <CheckoutButton productId="natal-chart" label="Uncover your patterns" className={outlinePillClasses} />
        </div>
      </div>

      <div
        className="rounded-[20px] p-5.5 relative"
        style={{ background: 'linear-gradient(140deg, #2D2640, #1E1835)', border: '1px solid rgba(255,143,163,0.45)' }}
      >
        <div className="absolute top-4 right-4 text-[10px] tracking-[0.14em] uppercase bg-[#FF8FA3] text-[#2D2640] px-2.5 py-1 rounded-full font-semibold">
          Most popular
        </div>
        <div className="text-2xl text-[#FF8FA3]">☍</div>
        <div className="font-serif text-2xl mt-2.5 mb-1">Relocation Report</div>
        <div className="text-xs tracking-[0.14em] uppercase text-[#F0EBF8]/50">
          Find the city where everything clicks
        </div>
        <div className="text-[13.5px] leading-relaxed text-[#F0EBF8]/65 my-3">
          Which cities activate career breakthroughs, love, and transformation — based on your planetary lines.
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="font-serif text-[26px]">$5</div>
          <PillButton href="/app/readings/relocation">Find where you thrive →</PillButton>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-[#F0EBF8]/25 px-4.5 py-4 flex gap-3.5 items-center">
        <div className="text-xl text-[#655E78]">✧</div>
        <div className="text-[13px] leading-relaxed text-[#F0EBF8]/65">
          Not ready to buy?{' '}
          <Link href="/shop#mini-course" className="text-[#FF8FA3]">
            Learn to read it yourself — $5 mini-course.
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 mt-1.5">
        <div className="text-[11px] tracking-[0.18em] uppercase text-[#F0EBF8]/45">What clients say</div>
        {quotes.map((q) => (
          <div key={q.id} className="rounded-2xl border border-[#F0EBF8]/10 bg-white/4 px-4 py-3.5">
            <div className="font-serif italic text-[16.5px] leading-relaxed text-[#F0EBF8]/85">
              &ldquo;{q.text}&rdquo;
            </div>
            <div className="text-[11.5px] text-[#F0EBF8]/45 mt-1.5">★★★★★ · {q.handle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
