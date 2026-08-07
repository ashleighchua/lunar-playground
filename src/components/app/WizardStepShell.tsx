'use client';

export function WizardStepShell({
  step,
  totalSteps,
  onBack,
  onSkip,
  glyph,
  title,
  sub,
  children,
  ctaLabel,
  onCta,
  ctaDisabled,
}: {
  step: number;
  totalSteps: number;
  onBack?: () => void;
  onSkip: () => void;
  glyph: string;
  title: string;
  sub: string;
  children?: React.ReactNode;
  ctaLabel: string;
  onCta: () => void;
  ctaDisabled?: boolean;
}) {
  return (
    <div className="flex flex-col min-h-screen px-5.5 pt-20 pb-10">
      <div className="flex items-center justify-between">
        {onBack ? (
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-9.5 h-9.5 rounded-full border border-[#F0E9DC]/25 flex items-center justify-center text-[#F0E9DC]/70 text-lg"
          >
            ←
          </button>
        ) : (
          <div className="w-9.5" />
        )}
        <div className="text-[11px] tracking-[0.22em] uppercase text-[#D9B878]">The Lunar Playground</div>
        <button onClick={onSkip} className="text-[13px] text-[#F0E9DC]/50 w-9.5 text-right">
          Skip
        </button>
      </div>

      <div className="flex gap-2 justify-center mt-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === step ? 22 : 6,
              background: i <= step ? '#D9B878' : 'rgba(240,233,220,0.2)',
            }}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4">
        <div className="text-4xl" style={{ animation: 'appFloatY 5s ease-in-out infinite' }}>
          {glyph}
        </div>
        <div className="font-serif text-4xl leading-[1.1]">{title}</div>
        <div className="text-[14.5px] leading-relaxed text-[#F0E9DC]/60 max-w-75">{sub}</div>
        {children}
      </div>

      <button
        onClick={onCta}
        disabled={ctaDisabled}
        className="rounded-full py-4.25 text-center text-base font-semibold text-[#241C0D] disabled:opacity-40 transition-opacity"
        style={{ background: 'linear-gradient(135deg, #E2C188, #C9A260)' }}
      >
        {ctaLabel}
      </button>

      <style>{`
        @keyframes appFloatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
