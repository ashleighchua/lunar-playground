import Link from 'next/link';
import { Navigation } from '@/components/Navigation';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      <Navigation currentPage="about" />

      <main className="flex-1">
        {/* Hero */}
        <section className="container-editorial pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A2A2A] leading-[1.1] tracking-tight">
              About
            </h1>
            <p className="mt-6 text-lg text-[#6B6B6B] leading-relaxed">
              A playground for the curious. Not a prophecy.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="h-px bg-[#2A2A2A]/10" />
        </div>

        {/* Philosophy */}
        <section className="container-editorial py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-8">
              What we believe
            </h2>
            <div className="space-y-6 text-[#6B6B6B] leading-relaxed">
              <p>
                We don&apos;t believe astrology predicts your future. We don&apos;t think
                the planets control your destiny or that your birth chart is a fixed blueprint
                you&apos;re doomed to follow.
              </p>
              <p>
                What we do believe is that astrology offers a language—a surprisingly useful
                one—for talking about the parts of yourself that are hard to name. The way
                you process emotions. The patterns you keep falling into. The things you
                need but struggle to ask for.
              </p>
              <p>
                Think of it like poetry rather than science. A metaphor that helps you see
                something you already knew but couldn&apos;t quite articulate. The moon
                didn&apos;t make you intuitive—but maybe &quot;moon in Pisces&quot; gives you
                a way to understand why you feel everything so deeply.
              </p>
              <p>
                This is a playground, not a prophecy. Explore it lightly. Take what
                resonates. Leave what doesn&apos;t.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="h-px bg-[#2A2A2A]/10" />
        </div>

        {/* How we calculate */}
        <section className="container-editorial py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-8">
              How we calculate
            </h2>
            <div className="space-y-6 text-[#6B6B6B] leading-relaxed">
              <p>
                Our birth chart calculations use established astronomical algorithms to
                determine planetary positions at the moment of your birth. Sun signs are
                calculated from your birth date. Moon and rising signs require your birth
                time and location for accuracy.
              </p>
              <p>
                Chinese zodiac calculations account for the lunar new year—not just the
                calendar year—so someone born in January might belong to the previous
                year&apos;s animal.
              </p>
              <p>
                Life path numbers follow traditional numerology methods, reducing your
                birth date to a single digit (or master number) through addition.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="h-px bg-[#2A2A2A]/10" />
        </div>

        {/* Contact */}
        <section className="container-editorial py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-8">
              Get in touch
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              Questions, feedback, or just want to say hello?
              We&apos;d love to hear from you at{' '}
              <a
                href="mailto:hello@thelunarplayground.com"
                className="text-[#2A2A2A] underline hover:no-underline"
              >
                hello@thelunarplayground.com
              </a>
            </p>
          </div>
        </section>
      </main>

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
