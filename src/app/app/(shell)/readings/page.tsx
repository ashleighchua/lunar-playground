import Link from 'next/link';
import { CheckoutButton } from '@/components/CheckoutButton';
import { PillButton } from '@/components/app/PillButton';
import { reviews } from '@/data/reviews';

const outlinePillClasses =
  'inline-flex items-center justify-center rounded-full text-[13.5px] font-medium px-4.5 py-2.75 border border-[#D9B878]/50 text-[#D9B878] hover:bg-[#D9B878]/10 transition-colors bg-transparent';

export default function AppReadingsPage() {
  const quotes = reviews.slice(0, 2);

  return (
    <div className="px-5.5 pt-20 pb-30 flex flex-col gap-4.5">
      <div>
        <div className="font-serif text-[32px] font-medium leading-[1.05]">
          Two readings.<br />That&rsquo;s it.
        </div>
        <div className="text-sm text-[#F0E9DC]/55 mt-2">
          One to understand yourself. One to know where to go. Read personally by Ashleigh — no AI fluff.
        </div>
      </div>

      <div className="rounded-[20px] border border-[#F0E9DC]/10 bg-white/5 p-5.5">
        <div className="text-2xl text-[#D9B878]">☉</div>
        <div className="font-serif text-2xl mt-2.5 mb-1">Natal Chart Reading</div>
        <div className="text-xs tracking-[0.14em] uppercase text-[#F0E9DC]/50">
          Who you are at your core
        </div>
        <div className="text-[13.5px] leading-relaxed text-[#F0E9DC]/65 my-3">
          Personality, patterns, relationships, and growth edges. The foundation for understanding everything else.
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="font-serif text-[26px]">$35</div>
          <CheckoutButton productId="natal-chart" label="Uncover your patterns" className={outlinePillClasses} />
        </div>
      </div>

      <div
        className="rounded-[20px] p-5.5 relative"
        style={{ background: 'linear-gradient(140deg, #2C2450, #1C1738)', border: '1px solid rgba(217,184,120,0.45)' }}
      >
        <div className="absolute top-4 right-4 text-[10px] tracking-[0.14em] uppercase bg-[#D9B878] text-[#241C0D] px-2.5 py-1 rounded-full font-semibold">
          Most popular
        </div>
        <div className="text-2xl text-[#D9B878]">☍</div>
        <div className="font-serif text-2xl mt-2.5 mb-1">Relocation Report</div>
        <div className="text-xs tracking-[0.14em] uppercase text-[#F0E9DC]/50">
          Find the city where everything clicks
        </div>
        <div className="text-[13.5px] leading-relaxed text-[#F0E9DC]/65 my-3">
          Which cities activate career breakthroughs, love, and transformation — based on your planetary lines.
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="font-serif text-[26px]">$35</div>
          <PillButton href="/app/readings/relocation">Find where you thrive →</PillButton>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-[#F0E9DC]/25 px-4.5 py-4 flex gap-3.5 items-center">
        <div className="text-xl text-[#A6B4FF]">✧</div>
        <div className="text-[13px] leading-relaxed text-[#F0E9DC]/65">
          Not ready to buy?{' '}
          <Link href="/shop#mini-course" className="text-[#D9B878]">
            Learn to read it yourself — $20 mini-course.
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 mt-1.5">
        <div className="text-[11px] tracking-[0.18em] uppercase text-[#F0E9DC]/45">What clients say</div>
        {quotes.map((q) => (
          <div key={q.id} className="rounded-2xl border border-[#F0E9DC]/10 bg-white/4 px-4 py-3.5">
            <div className="font-serif italic text-[16.5px] leading-relaxed text-[#F0E9DC]/85">
              &ldquo;{q.text}&rdquo;
            </div>
            <div className="text-[11.5px] text-[#F0E9DC]/45 mt-1.5">★★★★★ · {q.source}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
