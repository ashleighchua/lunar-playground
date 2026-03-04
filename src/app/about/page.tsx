import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | The Lunar Playground',
  description: 'The Lunar Playground blends astrology, BaZi, numerology, and human design into one layered picture. Free tools, personalised readings, and zero gatekeeping.',
  openGraph: {
    title: 'About | The Lunar Playground',
    description: 'The Lunar Playground blends astrology, BaZi, numerology, and human design into one layered picture. Free tools, personalised readings, and zero gatekeeping.',
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
              <span className="text-gradient-gold">Multiple Systems.</span>
              <br /><span className="text-[#2D2640]">One Full Picture.</span>
            </h1>
            <p className="mt-6 text-lg text-[#655E78] leading-relaxed">
              Hi, I&apos;m Ashleigh. I layer astrology, BaZi, human design, and numerology together because one system never gave me the full story. Turns out most people feel the same way.
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
                  But something still felt missing. Astrology gave me the who, but not the when or the how. Then I found BaZi and it filled in the gaps. Timing, element balance, the seasons of my life. Human Design showed me how I&apos;m wired to make decisions. Astrocartography showed me <em>where</em> I belong.
                </p>
                <p>
                  So I quit my job. Moved countries. Started over in a city my chart said would light me up. And honestly? It did.
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
                  Most people stick to one system. I layer a few because you&apos;re not one-dimensional, so why should your reading be?
                </p>
                <p>
                  I write personalised readings that pull from astrology, BaZi, Human Design, and relocation astrology. Every reading is built around your chart, your questions, and whatever season of life you&apos;re in right now.
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
              <h3 className="font-serif text-xl text-[#2D2640] mb-3">Honest, not hype</h3>
              <p className="text-[#655E78] leading-relaxed">
                I&apos;m not going to tell you a city will magically fix your life. Or that Mercury retrograde is personally victimising you. I give you the information, the patterns, the timing. You decide what to do with it.
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
              <h3 className="font-serif text-xl text-[#2D2640] mb-3">The whole picture, not one angle</h3>
              <p className="text-[#655E78] leading-relaxed">
                Astrology shows you who. BaZi shows you when. Human Design shows you how. Relocation astrology shows you where. Each system catches something the others miss. I bring them together so you get the full picture, not just one fragment.
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
