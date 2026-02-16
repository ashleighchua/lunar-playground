import Link from 'next/link';
import { Navigation } from '@/components/Navigation';

export const metadata = {
  title: 'Terms of Service | The Lunar Playground',
  description: 'Terms and conditions for using The Lunar Playground.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navigation />
      <main className="container-editorial py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors mb-8 inline-block"
          >
            &larr; Back to home
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] mb-8">Terms of Service</h1>

          <div className="prose prose-neutral max-w-none space-y-6 text-[#6B6B6B]">
            <p className="text-sm">Last updated: January 2025</p>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-[#2A2A2A]">What this is</h2>
              <p>
                The Lunar Playground provides astrology-based content for entertainment, self-reflection,
                and personal exploration purposes only.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-[#2A2A2A]">Important disclaimer</h2>
              <p>
                <strong>Astrology is not science.</strong> The information provided on this website should
                not be used as a substitute for professional advice including but not limited to medical,
                psychological, legal, or financial advice.
              </p>
              <p>
                Our birth chart readings describe general tendencies and patterns based on astrological
                traditions. They do not predict the future and should not be used to make important
                life decisions.
              </p>
              <p>
                Take what resonates. Leave what doesn&apos;t.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-[#2A2A2A]">Your use of the site</h2>
              <p>By using The Lunar Playground, you agree to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use the site for personal, non-commercial purposes</li>
                <li>Not copy, reproduce, or redistribute our content without permission</li>
                <li>Provide accurate birth information if you want accurate results</li>
                <li>Accept that results are for reflection, not prediction</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-[#2A2A2A]">Limitation of liability</h2>
              <p>
                The Lunar Playground and its creators are not liable for any decisions, actions, or
                outcomes resulting from your use of this website or interpretation of the content provided.
              </p>
              <p>
                The site is provided &quot;as is&quot; without warranties of any kind.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-[#2A2A2A]">Intellectual property</h2>
              <p>
                All content on this website, including text, graphics, and code, is owned by
                The Lunar Playground unless otherwise stated. You may not reproduce or distribute
                this content without written permission.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-[#2A2A2A]">Changes to terms</h2>
              <p>
                We may update these terms from time to time. Continued use of the site after changes
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-[#2A2A2A]">Contact</h2>
              <p>
                Questions about these terms? Email us at{' '}
                <a href="mailto:thelunarplayground@gmail.com" className="text-[#2A2A2A] underline">
                  thelunarplayground@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="py-8">
        <div className="container-editorial">
          <div className="flex justify-end">
            <div className="flex gap-8 text-sm text-[#6B6B6B]">
              <Link href="/reviews" className="hover:text-[#2A2A2A] transition-colors">Reviews</Link>
              <Link href="/faq" className="hover:text-[#2A2A2A] transition-colors">FAQ</Link>
              <Link href="/privacy" className="hover:text-[#2A2A2A] transition-colors">Privacy</Link>
              <span className="text-[#2A2A2A]">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
