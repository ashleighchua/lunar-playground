import Link from 'next/link';
import { EmailCapture } from '@/components/ui/EmailCapture';
import { Navigation } from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navigation currentPage="home" />

      {/* Hero - Clear CTA to primary feature */}
      <section className="container-editorial pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="max-w-3xl">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#2A2A2A] leading-[1.1] tracking-tight">
            What did the moon
            <br />
            look like the night
            <br />
            you were born?
          </h1>
          <p className="mt-8 text-xl text-[#6B6B6B] max-w-xl leading-relaxed">
            Discover your birth chart, your lunar signature, and the places
            in the world where you might feel most alive.
          </p>
          <Link
            href="/your-chart"
            className="inline-block mt-10 px-8 py-4 bg-[#2A2A2A] text-[#FAF7F2] text-sm tracking-wide hover:bg-[#1a1a1a] transition-colors"
          >
            Find your moon
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* Primary Feature - Your Chart */}
      <section className="container-editorial py-24 md:py-32">
        <Link href="/your-chart" className="group block max-w-2xl">
          <span className="text-xs tracking-[0.15em] uppercase text-[#6B6B6B]">
            Start here
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#2A2A2A] mt-4 group-hover:text-[#6B6B6B] transition-colors">
            Your Chart
          </h2>
          <p className="mt-6 text-lg text-[#6B6B6B] leading-relaxed">
            The sky at the moment you arrived. Your sun, moon, rising, and the
            lunar phase that colored your first breath. This is where everything begins.
          </p>
          <span className="inline-block mt-8 text-sm text-[#6B6B6B] group-hover:text-[#2A2A2A] transition-colors border-b border-current pb-1">
            Calculate yours
          </span>
        </Link>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* Secondary Features Grid */}
      <section className="container-editorial py-24 md:py-32">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {/* Today's Moon */}
          <Link href="/today" className="group block">
            <h3 className="font-serif text-2xl md:text-3xl text-[#2A2A2A] group-hover:text-[#6B6B6B] transition-colors">
              Today
            </h3>
            <p className="mt-4 text-[#6B6B6B] leading-relaxed">
              The current moon phase and a short reflection for your day.
              A reason to return.
            </p>
            <span className="inline-block mt-4 text-sm text-[#6B6B6B] group-hover:text-[#2A2A2A] transition-colors">
              See today&apos;s moon
            </span>
          </Link>

          {/* Compatibility */}
          <Link href="/compatibility" className="group block">
            <h3 className="font-serif text-2xl md:text-3xl text-[#2A2A2A] group-hover:text-[#6B6B6B] transition-colors">
              Compatibility
            </h3>
            <p className="mt-4 text-[#6B6B6B] leading-relaxed">
              How two charts speak to each other. The dynamics, tensions,
              and harmonies between you.
            </p>
            <span className="inline-block mt-4 text-sm text-[#6B6B6B] group-hover:text-[#2A2A2A] transition-colors">
              Compare charts
            </span>
          </Link>

          {/* Travel */}
          <Link href="/travel" className="group block">
            <h3 className="font-serif text-2xl md:text-3xl text-[#2A2A2A] group-hover:text-[#6B6B6B] transition-colors">
              Travel
            </h3>
            <p className="mt-4 text-[#6B6B6B] leading-relaxed">
              Your chart drawn across the globe. Places where different
              parts of you feel amplified.
            </p>
            <span className="inline-block mt-4 text-sm text-[#6B6B6B] group-hover:text-[#2A2A2A] transition-colors">
              Explore your map
            </span>
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* Email Capture */}
      <section className="container-editorial py-24 md:py-32">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] mb-4">
            Get your lunar note
          </h2>
          <p className="text-[#6B6B6B] mb-8">
            A short reflection sent with each new moon phase.
            No spam, no daily overwhelm. Just the moon.
          </p>
          <EmailCapture
            headline=""
            description=""
            buttonText="Subscribe"
            variant="minimal"
            tags={['homepage', 'lunar-notes']}
          />
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* Philosophy */}
      <section className="container-editorial py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl text-[#2A2A2A] leading-relaxed">
            We do not believe astrology predicts your future.
            We believe it offers a language for what you already sense.
          </p>
          <p className="mt-8 text-[#6B6B6B]">
            A playground, not a prophecy.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="container-editorial py-16 border-t border-[#2A2A2A]/10">
        <div className="flex justify-end">
          <div className="flex gap-8 text-sm text-[#6B6B6B]">
            <Link href="/privacy" className="hover:text-[#2A2A2A] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#2A2A2A] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
