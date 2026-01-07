import Link from 'next/link';
import Image from 'next/image';
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

        {/* My Story */}
        <section className="container-editorial py-16 md:py-24">
          <div className="max-w-2xl">
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
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="h-px bg-[#2A2A2A]/10" />
        </div>

        {/* Why We're Different */}
        <section className="container-editorial py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-8">
              Why we&apos;re different
            </h2>
            <div className="space-y-6 text-[#6B6B6B] leading-relaxed">
              <p>
                Most astrology sites tell you who you are. We&apos;d rather help you ask
                better questions.
              </p>
              <p>
                No paywalls. No fear-based predictions. No pressure to believe anything.
                Just tools for reflection, offered with warmth.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="h-px bg-[#2A2A2A]/10" />
        </div>

        {/* Values */}
        <section className="container-editorial pt-16 md:pt-24 pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-6 text-center">
              What guides us
            </h2>
            <div className="space-y-4">
              {/* Curiosity */}
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="relative w-[380px] h-[500px] flex-shrink-0">
                  <Image
                    src="/Images/the-cups.png"
                    alt="The Cups tarot card"
                    fill
                    className="object-contain object-center"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#2A2A2A] mb-3">Curiosity</h3>
                  <p className="text-[#6B6B6B] leading-relaxed">
                    Wonder over certainty. Questions over answers. We approach astrology as an
                    invitation to explore, not a prescription to follow.
                  </p>
                </div>
              </div>

              {/* Love */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10">
                <div className="relative w-[380px] h-[500px] flex-shrink-0">
                  <Image
                    src="/Images/the-lovers.png"
                    alt="The Lovers tarot card"
                    fill
                    className="object-contain object-center"
                  />
                </div>
                <div className="md:text-right">
                  <h3 className="font-serif text-xl text-[#2A2A2A] mb-3">Love</h3>
                  <p className="text-[#6B6B6B] leading-relaxed">
                    At its heart, this is about self-understanding. We want you to feel seen,
                    and a little more at home in yourself.
                  </p>
                </div>
              </div>

              {/* Accessibility */}
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="relative w-[380px] h-[500px] flex-shrink-0">
                  <Image
                    src="/Images/the-star.png"
                    alt="The Star tarot card"
                    fill
                    className="object-contain object-center"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#2A2A2A] mb-3">Accessibility</h3>
                  <p className="text-[#6B6B6B] leading-relaxed">
                    Astrology shouldn&apos;t be gatekept. We believe these tools belong to
                    everyone—no jargon, no barriers, just exploration.
                  </p>
                </div>
              </div>
            </div>
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
                Astrology doesn&apos;t predict your future. It&apos;s a language for the parts
                of yourself that are hard to name.
              </p>
              <p>
                Think poetry, not science. Take what resonates. Leave what doesn&apos;t.
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
              Say hello
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Questions, ideas, or just want to share what resonated? I&apos;d love to hear from you.
              </p>
              <p>
                <a
                  href="mailto:hello@thelunarplayground.com"
                  className="text-[#2A2A2A] underline hover:no-underline"
                >
                  hello@thelunarplayground.com
                </a>
              </p>
            </div>
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
