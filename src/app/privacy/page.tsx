import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | The Lunar Playground',
  description: 'How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F0EBF8]">
      <Navigation />
      <main className="container-editorial py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="text-sm text-[#655E78] hover:text-[#2D2640] transition-colors mb-8 inline-block"
          >
            &larr; Back to home
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl text-[#2D2640] mb-8">Privacy Policy</h1>

          <div className="prose prose-neutral max-w-none space-y-6 text-[#655E78]">
            <p className="text-sm">Last updated: March 2026</p>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-[#2D2640]">What we collect</h2>
              <p>When you use The Lunar Playground, we may collect:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Birth details:</strong> Date, time, and place of birth you provide to generate your chart</li>
                <li><strong>Email address:</strong> If you choose to receive your report via email</li>
                <li><strong>Usage data:</strong> Anonymous analytics about how you use the site</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-[#2D2640]">How we use it</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Generate your personalized birth chart and reports</li>
                <li>Send you a copy of your report if you provide an email</li>
                <li>Improve our services through anonymous analytics</li>
              </ul>
              <p>We do not sell your data to third parties.</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-[#2D2640]">Third-party services</h2>
              <p>We use the following services:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Vercel:</strong> Website hosting</li>
                <li><strong>Resend:</strong> Email delivery</li>
                <li><strong>Google Analytics:</strong> Anonymous usage statistics</li>
                <li><strong>Microsoft Clarity:</strong> Anonymous session insights</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-[#2D2640]">Data storage</h2>
              <p>
                If you&apos;re just exploring your chart with our free tools, your birth details are stored
                locally in your browser and are not saved on our servers.
              </p>
              <p>
                If you purchase a reading, your birth details are sent to our servers so we can generate and
                deliver it. Your birth details and the computed chart data behind your reading are automatically
                and permanently deleted 150 days after your report is delivered. Your finished PDF and a record
                of the order itself (email, product, purchase date) are kept afterward for support and business
                records, so we can still help with a question about a past order or resend the PDF if you lose it.
              </p>
              <p>
                Your email address is used to send your report and other order-related communication, and is
                kept as part of that order record.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-[#2D2640]">Your rights</h2>
              <p>You can:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Clear your locally stored data by clearing your browser storage</li>
                <li>Request deletion of your birth details, chart data, or order record at any time by contacting us</li>
                <li>Opt out of analytics by using a browser ad-blocker</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-xl text-[#2D2640]">Contact</h2>
              <p>
                Questions about this policy? Email us at{' '}
                <a href="mailto:thelunarplayground@gmail.com" className="text-[#2D2640] underline">
                  thelunarplayground@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
