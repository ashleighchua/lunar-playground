import { ToolGridItem } from '@/components/app/ToolGridItem';

const TOOLS = [
  { href: '/birth-report', glyph: '☉', name: 'Birth Chart', desc: 'Who you are at your core' },
  { href: '/astrocartography', glyph: '☍', name: 'Relocation Lines', desc: "Where you'll thrive" },
  { href: '/chinese-zodiac', glyph: '☯', name: 'Chinese Zodiac', desc: 'Your natural strengths and cycles' },
  { href: '/bazi', glyph: '⏳', name: 'BaZi', desc: 'Your destiny blueprint and timing' },
  { href: '/numerology', glyph: '✦', name: 'Numerology', desc: 'The numbers shaping your path' },
  { href: '/human-design', glyph: '⬡', name: 'Human Design', desc: "How you're designed to decide" },
  { href: '/transit', glyph: '☾', name: 'Sky Guide', desc: 'Moon phase and daily guidance', badge: 'No birth details needed' },
  { href: '/compatibility', glyph: '♡', name: 'Compatibility', desc: 'Sun sign chemistry for two', badge: 'Requires two people' },
];

export default function AppToolsPage() {
  return (
    <div className="px-5.5 pt-20 pb-30 flex flex-col gap-4.5">
      <div>
        <div className="text-[11px] tracking-[0.2em] uppercase text-[#D9B878] mb-1.5">
          Free · no purchase needed
        </div>
        <div className="font-serif text-[32px] font-medium">Poke around first.</div>
        <div className="text-[13.5px] text-[#F0E9DC]/55 mt-1.5">
          Your birth details are saved — every tool below is one tap.
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {TOOLS.map((tool) => (
          <ToolGridItem key={tool.href} {...tool} />
        ))}
      </div>
    </div>
  );
}
