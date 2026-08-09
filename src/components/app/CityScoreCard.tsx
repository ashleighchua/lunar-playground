export interface CityScore {
  city: string;
  line: string;
  color: string;
  note: string;
  score: number;
}

export function CityScoreCard({ city, line, color, note, score }: CityScore) {
  return (
    <div className="rounded-2xl border border-[#F0EBF8]/10 bg-white/[0.045] px-4 py-3.5">
      <div className="flex justify-between items-baseline gap-2.5">
        <div className="font-serif text-xl">{city}</div>
        <div className="text-[13px]" style={{ color }}>{line}</div>
      </div>
      <div className="text-[12.5px] text-[#F0EBF8]/55 my-1">{note}</div>
      <div className="flex items-center gap-2.5">
        <div className="flex-1 h-1 rounded-full bg-white/8">
          <div className="h-1 rounded-full" style={{ width: `${score}%`, background: color }} />
        </div>
        <div className="text-xs text-[#F0EBF8]/70 w-6.5 text-right">{score}</div>
      </div>
    </div>
  );
}
