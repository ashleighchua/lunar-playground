import Link from 'next/link';
import { EmailCapture } from '@/components/ui/EmailCapture';
import { Navigation } from '@/components/Navigation';
import { getCurrentMoonPhase } from '@/lib/moon';

// Daily reflections for each moon phase
const reflections: Record<string, string[]> = {
  'New Moon': [
    'The new moon invites you inward. This is a time for planting seeds, not in the ground, but in your intentions. What do you want to call into being?',
    'In the darkness of the new moon, everything is possible because nothing is yet defined. Rest here. Dream here. The light will return when you are ready.'
  ],
  'Waxing Crescent': [
    'The first sliver of light appears. Your intentions from the new moon are taking their first tentative shape. Nurture them gently. They are still fragile.',
    'The waxing crescent asks for patience. Growth is happening, even when you cannot see it. Trust the process unfolding beneath the surface.'
  ],
  'First Quarter': [
    'The first quarter moon brings tension, the productive kind. This is a time for decisions, for choosing which path to walk. Action is called for.',
    'Half light, half shadow. The first quarter asks you to push through resistance. What obstacles need your attention today?'
  ],
  'Waxing Gibbous': [
    'The waxing gibbous invites you to refine. The initial spark has caught; now comes the careful tending. What began at the new moon is taking shape. Not quite complete, but no longer uncertain.',
    'This is a time for adjustment rather than revolution. Small corrections. Patient observation. Trust that fullness is approaching.'
  ],
  'Full Moon': [
    'Everything is illuminated. The full moon reveals what has been growing in the dark, for better or worse. Let yourself be seen. Let yourself see clearly.',
    'The full moon is culmination. Celebrate what has ripened. Release what no longer serves. Tonight, nothing can hide.'
  ],
  'Waning Gibbous': [
    'The light begins to recede, and with it comes the urge to share. What have you learned? What wisdom wants to move through you to others?',
    'The waning gibbous is generous. It has received the full moon\'s light and now passes it on. How can you give today?'
  ],
  'Last Quarter': [
    'Another threshold. The last quarter asks: what are you ready to release? Completion requires letting go. Make space for what comes next.',
    'Half the moon has returned to shadow. This is a time for clearing: physical spaces, mental clutter, relationships that have run their course.'
  ],
  'Waning Crescent': [
    'The final surrender before renewal. The waning crescent is a time for rest, for dreams, for the quiet wisdom that comes only in stillness.',
    'Soon the cycle will begin again. But not yet. For now, let yourself dissolve into the dark. Trust that you will emerge transformed.'
  ],
};

export default function TodayPage() {
  const moonPhase = getCurrentMoonPhase();

  // Get a reflection based on the phase (rotate daily)
  const phaseReflections = reflections[moonPhase.name] || reflections['New Moon'];
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const reflection = phaseReflections[dayOfYear % phaseReflections.length];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navigation currentPage="today" />

      {/* Hero */}
      <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="max-w-2xl">
          <p className="text-sm text-[#6B6B6B] tracking-wide">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A2A2A] leading-[1.1] tracking-tight mt-4">
            Today&apos;s Moon
          </h1>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* Moon Phase Display */}
      <section className="container-editorial py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Moon Visual */}
          <div className="flex flex-col items-center justify-center">
            <div
              className="text-[120px] md:text-[180px] leading-none"
              style={{
                filter: 'saturate(0.3) brightness(1.1)',
                opacity: 0.85
              }}
            >
              {moonPhase.emoji}
            </div>
            <p className="font-serif text-2xl text-[#2A2A2A] mt-6">
              {moonPhase.name}
            </p>
            <p className="text-sm text-[#6B6B6B] mt-2">
              {moonPhase.illumination}% illuminated
            </p>
          </div>

          {/* Reflection */}
          <div className="max-w-md">
            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-6">
              A note for today
            </h2>
            <div className="prose prose-neutral">
              <p className="text-[#6B6B6B] leading-relaxed">
                {reflection}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* Email Capture */}
      <section className="container-editorial py-12 md:py-16">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">
            Receive the lunar note
          </h2>
          <p className="text-[#6B6B6B] mb-8">
            A short reflection sent with each new moon phase.
          </p>
          <EmailCapture
            headline=""
            description=""
            buttonText="Send to me"
            variant="minimal"
            tags={['today-page', 'lunar-notes']}
            showDisclaimer
          />
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* Next Step */}
      <section className="container-editorial py-8 md:py-12">
        <p className="text-sm text-[#6B6B6B] mb-4">
          Want to explore more?
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/your-chart"
            className="px-6 py-3 rounded-lg bg-[#2A2A2A] text-[#FAF7F2] text-sm hover:bg-[#1a1a1a] transition-colors"
          >
            See your birth moon
          </Link>
          <Link
            href="/compatibility"
            className="px-6 py-3 rounded-lg border border-[#2A2A2A]/20 text-[#2A2A2A] text-sm hover:border-[#2A2A2A]/40 transition-colors"
          >
            Check compatibility
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="container-editorial">
          <div className="flex justify-end">
            <div className="flex gap-8 text-sm text-[#6B6B6B]">
              <Link href="/reviews" className="hover:text-[#2A2A2A] transition-colors">Reviews</Link>
              <Link href="/faq" className="hover:text-[#2A2A2A] transition-colors">FAQ</Link>
              <Link href="/privacy" className="hover:text-[#2A2A2A] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#2A2A2A] transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
