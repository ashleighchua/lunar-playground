// Dark gradient background + starfield used by every /app screen (shell and detail alike).
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen relative overflow-hidden text-[#F0EBF8]"
      style={{
        background: 'linear-gradient(180deg, #1E1835 0%, #2D2640 45%, #2D2640 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: [
            'radial-gradient(1px 1px at 10% 10%, rgba(255,255,255,0.7), transparent)',
            'radial-gradient(1px 1px at 35% 5%, rgba(255,255,255,0.5), transparent)',
            'radial-gradient(1.5px 1.5px at 80% 15%, rgba(255,143,163,0.8), transparent)',
            'radial-gradient(1px 1px at 65% 25%, rgba(255,255,255,0.4), transparent)',
            'radial-gradient(1px 1px at 20% 35%, rgba(255,255,255,0.5), transparent)',
            'radial-gradient(1.5px 1.5px at 90% 48%, rgba(255,255,255,0.5), transparent)',
            'radial-gradient(1px 1px at 45% 65%, rgba(255,143,163,0.6), transparent)',
            'radial-gradient(1px 1px at 10% 75%, rgba(255,255,255,0.45), transparent)',
            'radial-gradient(1.5px 1.5px at 75% 85%, rgba(255,255,255,0.4), transparent)',
          ].join(', '),
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
