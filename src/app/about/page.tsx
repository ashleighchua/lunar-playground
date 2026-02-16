import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from '@/components/Navigation';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      <Navigation currentPage="about" />

      <main className="flex-1">
        {/* Hero */}
        <section className="container-editorial pt-6 pb-8 md:pt-8 md:pb-10">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A2A2A] leading-[1.1] tracking-tight">
              About
            </h1>
            <p className="mt-6 text-lg text-[#6B6B6B] leading-relaxed">
              Hi, I&apos;m Ashleigh. I help people figure out where they belong.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="h-px bg-[#2A2A2A]/10" />
        </div>

        {/* The Story - Left text, Right image */}
        <section className="container-editorial py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-[#2A2A2A] mb-8">
                The story
              </h2>
              <div className="space-y-6 text-[#6B6B6B] leading-relaxed">
                <p>
                  I was stuck. Good job on paper, but something felt off. The city, the
                  routine, the life I&apos;d built. None of it fit anymore.
                </p>
                <p>
                  I turned to astrology, not for answers, but for a different way of seeing.
                  It gave me language for the restlessness I couldn&apos;t name. Then I discovered
                  astrocartography, and everything clicked. It wasn&apos;t just about who I was.
                  It was about <em>where</em> I was.
                </p>
                <p>
                  I quit my job. I moved countries. I started over in a city that my chart said
                  would light me up. And it did.
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

        {/* What I Do Now - Left image, Right text */}
        <section className="container-editorial py-8 md:py-10">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
            <div className="flex-1 md:text-left">
              <h2 className="font-serif text-2xl text-[#2A2A2A] mb-8">
                What I do now
              </h2>
              <div className="space-y-6 text-[#6B6B6B] leading-relaxed">
                <p>
                  I write personalized astrocartography readings for people who feel that pull.
                  The ones wondering if they should move, travel, or just try somewhere new.
                  The ones who sense that where they are might not be where they&apos;re meant to be.
                </p>
                <p>
                  Each reading maps your birth chart across the globe and tells you which cities
                  activate which parts of you. Career, love, creativity, growth. It&apos;s specific
                  to your chart, your questions, and your life right now.
                </p>
                <p>
                  I also built the free tools on this site so anyone can start exploring.
                  The paid readings go deeper, but curiosity shouldn&apos;t cost anything.
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

        {/* How I Approach This */}
        <section className="container-editorial py-8 md:py-10">
          <h2 className="font-serif text-2xl text-[#2A2A2A] mb-12">
            How I approach this
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-10">
            <div className="relative w-[280px] h-[380px] md:w-[320px] md:h-[440px] flex-shrink-0">
              <Image
                src="/Images/the-cups.png"
                alt="Page of Cups tarot card"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-xl text-[#2A2A2A] mb-3">Honest, not hype</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                I won&apos;t tell you a city will magically fix your life. Astrocartography is a
                tool for reflection, not a crystal ball. I give you the information and you
                decide what to do with it.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 mb-10">
            <div className="relative w-[280px] h-[380px] md:w-[320px] md:h-[440px] flex-shrink-0">
              <Image
                src="/Images/the lovers.png"
                alt="The Lovers tarot card"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1 md:text-right">
              <h3 className="font-serif text-xl text-[#2A2A2A] mb-3">Personal, not generic</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                Every reading is based on your individual chart. I look at your specific
                placements, your questions, and what you&apos;re actually going through. No
                copy-paste reports.
              </p>
            </div>
          </div>

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
              <h3 className="font-serif text-xl text-[#2A2A2A] mb-3">Accessible</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                Astrology can feel gatekept. I try to make it approachable. Plain language,
                clear explanations, and free tools anyone can use. You don&apos;t need to know
                anything about astrology to get value from a reading.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="h-px bg-[#2A2A2A]/10" />
        </div>

        {/* CTA */}
        <section className="container-editorial py-8 md:py-10">
          <div className="rounded-2xl bg-gradient-to-r from-[#D4C4B0] to-[#E8DED4] p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-2xl md:text-3xl text-[#2A2A2A] mb-4">
                Want to work together?
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                Check out the readings, try the free tools, or just say hi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/shop"
                  className="inline-block px-6 md:px-8 py-4 rounded-lg bg-[#2A2A2A] text-[#FAF7F2] hover:bg-[#1a1a1a] transition-colors text-sm md:text-base"
                >
                  View readings
                </Link>
                <a
                  href="mailto:thelunarplayground@gmail.com"
                  className="inline-block px-6 md:px-8 py-4 rounded-lg border border-[#2A2A2A]/20 text-[#2A2A2A] hover:bg-[#2A2A2A] hover:text-[#FAF7F2] transition-colors text-sm md:text-base"
                >
                  <span className="md:hidden">Email me</span>
                  <span className="hidden md:inline">thelunarplayground@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

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
