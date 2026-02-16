'use client';

import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';

const faqCategories = [
  {
    label: 'About Astrocartography',
    questions: [
      {
        q: 'What is astrocartography?',
        a: 'Astrocartography maps your birth chart onto the globe, showing where different planetary energies are strongest for you. Each planetary line represents a different area of life (career, love, creativity, growth), and where that line falls on the map tells you where that energy is most activated.',
      },
      {
        q: 'What will I receive in my reading?',
        a: 'You\'ll receive a detailed PDF report covering your planetary lines, personalized city recommendations, and an analysis of how different locations activate different parts of your chart. The report includes maps, interpretations, and practical guidance.',
      },
      {
        q: 'How is the paid reading different from the free tool?',
        a: 'The free tool on the site gives you a quick snapshot of one planetary line at a time. The paid reading is a comprehensive, hand-written analysis of all your lines, with personalized city recommendations and deeper interpretations you won\'t get from the automated tool.',
      },
      {
        q: 'Do I need to know my exact birth time?',
        a: 'Birth time is important for the most accurate reading, especially for the Ascendant and Midheaven lines. If you don\'t know your exact time, I can still work with an approximate time or noon chart, though some lines may shift slightly.',
      },
    ],
  },
  {
    label: 'Ordering & Delivery',
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'Most readings are delivered within 1-3 business days. I\'ll send you updates as I work on your report so you know exactly where things stand.',
      },
      {
        q: 'What information do I need to provide?',
        a: 'I\'ll need your date of birth, time of birth (as accurate as possible), and place of birth. For astrocartography readings, it also helps to know if you have specific cities or regions you\'re interested in.',
      },
      {
        q: 'Can I request specific cities or regions?',
        a: 'Absolutely. If you have cities you\'re considering for travel, relocation, or remote work, let me know and I\'ll prioritize those in your reading.',
      },
      {
        q: 'What format is the report delivered in?',
        a: 'All readings are delivered as a detailed PDF that you can save, print, or share. It includes maps, charts, and written analysis.',
      },
    ],
  },
  {
    label: 'About the Readings',
    questions: [
      {
        q: 'Who writes the readings?',
        a: 'Every reading is written by me (Ashleigh). Each report is tailored to your individual chart and the specific questions you bring to the reading.',
      },
      {
        q: 'Is this the same as a horoscope?',
        a: 'No. Horoscopes are generalized for everyone born under the same Sun sign. An astrocartography reading is based on your complete birth chart, using the exact positions of all planets at your specific time and place of birth.',
      },
      {
        q: 'What if I don\'t resonate with my reading?',
        a: 'Astrology is a reflective tool, not a prescription. Some insights land immediately, others make more sense over time. If something feels off, reach out and I\'m happy to discuss it.',
      },
      {
        q: 'Can I ask follow-up questions?',
        a: 'Yes! I welcome follow-up questions after you\'ve received your reading. I want to make sure you get the most out of it.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navigation currentPage="faq" />

      {/* Hero */}
      <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-[#2A2A2A] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[#6B6B6B] leading-relaxed">
            Everything you need to know about astrocartography readings and how they work.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* FAQ Sections */}
      <section className="container-editorial py-16 md:py-24">
        <div className="max-w-2xl mx-auto space-y-12">
          {faqCategories.map((category) => (
            <div key={category.label}>
              <span className="text-xs tracking-[0.15em] uppercase text-[#6B6B6B] mb-6 block">
                {category.label}
              </span>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${category.label}-${i}`}
                    className="border-b border-[#2A2A2A]/10"
                  >
                    <AccordionTrigger className="font-serif text-lg text-[#2A2A2A] hover:text-[#2A2A2A] text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#6B6B6B] leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* CTA */}
      <section className="container-editorial py-16 md:py-24">
        <div className="bg-[#F5F3F0] rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl text-[#2A2A2A] mb-3">
            Still have questions?
          </h2>
          <p className="text-[#6B6B6B] mb-6">
            Reach out and I&apos;ll get back to you within 24 hours.
          </p>
          <a
            href="mailto:thelunarplayground@gmail.com"
            className="inline-block px-8 py-3.5 bg-[#2A2A2A] text-[#FAF7F2] font-medium rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            Get in touch
          </a>
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
