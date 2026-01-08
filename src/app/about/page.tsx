import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from '@/components/Navigation';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      <Navigation currentPage="about" />

      <main className="flex-1">
        {/* Hero */}
        <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A2A2A] leading-[1.1] tracking-tight">
              About
            </h1>
            <p className="mt-6 text-lg text-[#6B6B6B] leading-relaxed">
              A playground for the curious.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="h-px bg-[#2A2A2A]/10" />
        </div>

        {/* The Story - Left text, Right image */}
        <section className="container-editorial py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-[#2A2A2A] mb-8">
                The story
              </h2>
              <div className="space-y-6 text-[#6B6B6B] leading-relaxed">
                <p>
                  I was stuck. Good job on paper, but something felt off. The city, the
                  routine, the life I&apos;d built—none of it fit anymore.
                </p>
                <p>
                  I turned to astrology, not for answers, but for a different way of seeing.
                  It gave me language for the restlessness I couldn&apos;t name. Eventually,
                  it gave me courage. I quit. I moved countries. I started over.
                </p>
                <p>
                  Lunar Playground grew from that. I wanted to build the space I wish I&apos;d
                  had—somewhere to explore these tools with curiosity instead of pressure.
                </p>
              </div>
            </div>
            <div className="relative w-[280px] h-[380px] md:w-[320px] md:h-[440px] flex-shrink-0">
              <Image
                src="/Images/the-fool.png"
                alt="The Fool tarot card"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="h-px bg-[#2A2A2A]/10" />
        </div>

        {/* What We Believe - Left image, Right text */}
        <section className="container-editorial py-12 md:py-16">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
            <div className="flex-1 md:text-left">
              <h2 className="font-serif text-2xl text-[#2A2A2A] mb-8">
                What we believe
              </h2>
              <div className="space-y-6 text-[#6B6B6B] leading-relaxed">
                <p>
                  Astrology gives shape to feelings you already recognise.
                  It offers symbols, cycles, and stories to sit with your life as it unfolds.
                </p>
                <p>
                  Approach it like poetry, not instruction.
                  Curious, open, and personal.
                </p>
                <p>
                  What resonates stays. What doesn&apos;t can pass.
                  No pressure. Just space to reflect.
                </p>
              </div>
            </div>
            <div className="relative w-[280px] h-[380px] md:w-[320px] md:h-[440px] flex-shrink-0">
              <Image
                src="/Images/the-priestess.png"
                alt="The High Priestess tarot card"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="h-px bg-[#2A2A2A]/10" />
        </div>

        {/* What Guides Us - Values Section */}
        <section className="container-editorial py-12 md:py-16">
          <h2 className="font-serif text-2xl text-[#2A2A2A] mb-12">
            What guides us
          </h2>

          {/* Curiosity - Left image, Right text */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16">
            <div className="relative w-[280px] h-[380px] md:w-[320px] md:h-[440px] flex-shrink-0">
              <Image
                src="/Images/the-cups.png"
                alt="Page of Cups tarot card"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-xl text-[#2A2A2A] mb-3">Curiosity</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                Wonder over certainty. Questions over answers. We approach astrology as an
                invitation to explore, not a prescription to follow.
              </p>
            </div>
          </div>

          {/* Love - Right image, Left text */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 mb-16">
            <div className="relative w-[280px] h-[380px] md:w-[320px] md:h-[440px] flex-shrink-0">
              <Image
                src="/Images/the lovers.png"
                alt="The Lovers tarot card"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1 md:text-right">
              <h3 className="font-serif text-xl text-[#2A2A2A] mb-3">Love</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                At its heart, this is about self-understanding. We want you to feel seen,
                and a little more at home in yourself.
              </p>
            </div>
          </div>

          {/* Accessibility - Left image, Right text */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="relative w-[280px] h-[380px] md:w-[320px] md:h-[440px] flex-shrink-0">
              <Image
                src="/Images/the-star.png"
                alt="The Star tarot card"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-xl text-[#2A2A2A] mb-3">Accessibility</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                Astrology shouldn&apos;t be gatekept. We believe these tools belong to
                everyone—no jargon, no barriers, just exploration.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="h-px bg-[#2A2A2A]/10" />
        </div>

        {/* Say Hello - Encapsulated box */}
        <section className="container-editorial py-12 md:py-16">
          <div className="rounded-2xl bg-gradient-to-r from-[#D4C4B0] to-[#E8DED4] p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-2xl md:text-3xl text-[#2A2A2A] mb-6">
                Say hello
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                Questions, ideas, or just want to share what resonated? I&apos;d love to hear from you.
              </p>
              <a
                href="mailto:hello@thelunarplayground.com"
                className="inline-block px-8 py-4 rounded-lg bg-[#2A2A2A] text-[#FAF7F2] hover:bg-[#1a1a1a] transition-colors"
              >
                hello@thelunarplayground.com
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8">
        <div className="container-editorial">
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
        </div>
      </footer>
    </div>
  );
}
