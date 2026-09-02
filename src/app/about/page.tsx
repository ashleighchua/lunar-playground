import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | The Lunar Playground',
  description: 'Who you are, and where you\'ll thrive. Free tools, honest readings, no jargon.',
  openGraph: {
    title: 'About | The Lunar Playground',
    description: 'Who you are, and where you\'ll thrive. Free tools, honest readings, no jargon.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F0EBF8] flex flex-col">
      <Navigation currentPage="about" />

      <main className="flex-1">
        {/* Hero */}
        <section className="container-editorial pt-6 pb-8 md:pt-8 md:pb-10">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              <span className="text-gradient-gold">Two things.</span>
              <br /><span className="text-[#2D2640]">That&apos;s it.</span>
            </h1>
            <p className="mt-6 text-lg text-[#655E78] leading-relaxed">
              Hi, I&apos;m Ashleigh. I use your birth chart as a mirror, not a map. It helps with two things: who you are, and where you&apos;ll thrive.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="divider-mystic">
            <span className="divider-star">&#10022; &#10022; &#10022;</span>
          </div>
        </div>

        {/* The Story - Left text, Right image */}
        <section className="container-editorial py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-[#2D2640] mb-8">
                The story
              </h2>
              <div className="space-y-6 text-[#655E78] leading-relaxed">
                <p>
                  I got into astrology the way most people do. Someone sent me a meme about my sign and I thought, &quot;okay wait, that&apos;s annoyingly accurate.&quot; Then I went down the rabbit hole. Sun, Moon, Rising. Suddenly I had language for things I&apos;d been feeling for years.
                </p>
                <p>
                  Astrology didn&apos;t hand me a new personality. It gave me language for the one I already had. Then I found astrocartography, which did the same thing for place. It helped me notice <em>where</em> I already felt like myself.
                </p>
                <p>
                  So I quit my job. Moved countries. Started over in a city my chart pointed me toward. And honestly? It did light me up.
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
          <div className="divider-mystic">
            <span className="divider-star">&#10022; &#10022; &#10022;</span>
          </div>
        </div>

        {/* What I Do Now - Left image, Right text */}
        <section className="container-editorial py-8 md:py-10">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
            <div className="flex-1 md:text-left">
              <h2 className="font-serif text-2xl text-[#2D2640] mb-8">
                What I do
              </h2>
              <div className="space-y-6 text-[#655E78] leading-relaxed">
                <p>
                  Most sites bury you in jargon. I don&apos;t. Here&apos;s who you are. Here&apos;s where you&apos;ll thrive. Plain language, no fluff.
                </p>
                <p>
                  I&apos;m not really in the astrology business. I&apos;m in the business of helping people understand themselves and make more intentional choices. Astrology just happens to be the tool I&apos;m best at. Right now that means a natal chart reading for who you are, and a relocation report for where you&apos;ll thrive, built around your actual chart, not a template.
                </p>
                <p>
                  I also built the free tools on this site because curiosity shouldn&apos;t cost anything. Play around first. If you want to go deeper, the readings are there.
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
          <div className="divider-mystic">
            <span className="divider-star">&#10022; &#10022; &#10022;</span>
          </div>
        </div>

        {/* How I Approach This */}
        <section className="container-editorial py-8 md:py-10">
          <h2 className="font-serif text-2xl text-[#2D2640] mb-12">
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
              <h3 className="font-serif text-xl text-[#2D2640] mb-3">A mirror, not an oracle</h3>
              <p className="text-[#655E78] leading-relaxed">
                I don&apos;t think the stars decide your life, or that Mercury retrograde is personally victimising you. I think most of the answers are already in you. Astrology just helps you see them faster. I hand you the patterns and the timing. You still make the call.
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
              <h3 className="font-serif text-xl text-[#2D2640] mb-3">Who you are, and where you&apos;ll thrive</h3>
              <p className="text-[#655E78] leading-relaxed">
                Your chart helps you name who you already are. It also points to where that self actually gets to breathe. Most people only ever get the first half. I give you both.
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
              <h3 className="font-serif text-xl text-[#2D2640] mb-3">Zero gatekeeping</h3>
              <p className="text-[#655E78] leading-relaxed">
                You don&apos;t need to know what a natal chart is to get something out of this. Plain language, no jargon dumps, and free tools you can play with right now. If you&apos;ve ever felt like astrology spaces weren&apos;t built for you, this one is.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="divider-mystic">
            <span className="divider-star">&#10022; &#10022; &#10022;</span>
          </div>
        </div>

        {/* CTA */}
        <section className="container-editorial py-8 md:py-10">
          <div className="rounded-2xl bg-gradient-to-r from-[#E8DCFF] to-[#F0E8FF] p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-2xl md:text-3xl text-[#2D2640] mb-4">
                Curious? <span className="text-gradient-gold">Start here.</span>
              </h2>
              <p className="text-[#655E78] leading-relaxed mb-6">
                Play with the free tools, grab a reading, or just come say hi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/shop"
                  className="inline-block px-6 md:px-8 py-4 rounded-lg bg-[#2D2640] text-[#F0EBF8] hover:bg-[#1E1835] transition-colors text-sm md:text-base"
                >
                  View Readings
                </Link>
                <a
                  href="mailto:thelunarplayground@gmail.com"
                  className="inline-block px-6 md:px-8 py-4 rounded-lg border border-[#2D2640]/20 text-[#2D2640] hover:bg-[#2D2640] hover:text-[#F0EBF8] transition-colors text-sm md:text-base"
                >
                  <span className="md:hidden">Email me</span>
                  <span className="hidden md:inline">thelunarplayground@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
