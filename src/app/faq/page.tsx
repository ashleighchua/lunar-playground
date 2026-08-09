'use client';

import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';

const faqCategories = [
  {
    label: 'The Free Tools',
    questions: [
      {
        q: 'What can I do on this site for free?',
        a: 'Quite a lot, actually. You can generate a full birth chart report, explore your astrocartography map, check your BaZi (Four Pillars) profile, look up your Human Design type, run your numerology, find your Chinese zodiac animal, check compatibility, and see what transits are hitting your chart right now. All free, no sign-up required.',
      },
      {
        q: 'Do I need my birth time for the free tools?',
        a: 'For the most accurate results, yes. Your birth time determines your Rising sign, house placements, and astrocartography lines. If you don\'t have it, most tools will still work with just your date and location, but some sections will be less precise.',
      },
      {
        q: 'What\'s the difference between the free tools and the paid readings?',
        a: 'The free tools give you automated results based on your birth data. Good starting point. The paid readings are written by me, personally. I go deep on your actual chart and write something built around your specific questions.',
      },
    ],
  },
  {
    label: 'The Paid Readings',
    questions: [
      {
        q: 'What readings do you offer?',
        a: 'Two. A Natal Chart Reading ($35) for who you are, and a Relocation Report ($35) for where you\'ll thrive. There\'s also a $20 self-guided course if you want to learn to read your own relocation chart. No bundles, no add-ons.',
      },
      {
        q: 'Who writes the readings?',
        a: 'Me. Every reading is written by a real human (hi), not AI. I go through your actual chart, find the patterns, and write it up in a way that makes sense.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Usually 1 to 3 business days. I\'ll keep you posted as I work on it so you\'re not left wondering.',
      },
      {
        q: 'What format do I get?',
        a: 'A detailed PDF you can save, print, or forward to whoever you\'re trying to convince that astrology is real. It includes charts, maps (for astrocartography), and written analysis.',
      },
      {
        q: 'Can I ask follow-up questions after I get my reading?',
        a: 'Yes, always. If something doesn\'t land or you want to dig deeper into a specific part, just reply and I\'ll clarify.',
      },
    ],
  },
  {
    label: 'How This Works',
    questions: [
      {
        q: 'Do you still do BaZi or Human Design readings?',
        a: 'Not as paid readings right now. I\'ve narrowed things down to natal chart and relocation, the two I trust most to actually help. The free BaZi and Human Design tools are still on the site if you want to play around.',
      },
      {
        q: 'Is this the same as a horoscope?',
        a: 'No. Horoscopes use your Sun sign only. This uses your full birth data, Moon, Rising, planetary placements, house positions, so it\'s actually about you, not everyone born under your sign.',
      },
      {
        q: 'What if I don\'t resonate with my results?',
        a: 'That happens sometimes. Some insights click immediately, others take a few months to land. It\'s a reflective tool, not a verdict. If something feels off, reach out and we can talk through it.',
      },
    ],
  },
  {
    label: 'Ordering & Practical Stuff',
    questions: [
      {
        q: 'What information do I need to provide?',
        a: 'Date of birth, time of birth (as exact as possible), and birth location. For the relocation report, it also helps to mention any cities or regions you\'re curious about.',
      },
      {
        q: 'Can I request specific cities in my relocation reading?',
        a: 'Yes, and I\'d encourage it. If you\'re eyeing particular cities for a move, travel, or remote work, let me know and I\'ll prioritise those in your report.',
      },
      {
        q: 'Do you do live readings or calls?',
        a: 'Not at the moment. All readings are delivered as written PDFs. I find the written format gives you something to come back to and reference over time, which is harder with a live call.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#F0EBF8]">
      <Navigation currentPage="faq" />

      {/* Hero */}
      <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-[#2D2640] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[#655E78] leading-relaxed">
            The stuff people usually ask before diving in. If your question isn&apos;t covered, just email me.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2D2640]/10" />
      </div>

      {/* FAQ Sections */}
      <section className="container-editorial py-16 md:py-24">
        <div className="max-w-2xl mx-auto space-y-12">
          {faqCategories.map((category) => (
            <div key={category.label}>
              <span className="text-xs tracking-[0.15em] uppercase text-[#655E78] mb-6 block">
                {category.label}
              </span>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${category.label}-${i}`}
                    className="border-b border-[#2D2640]/10"
                  >
                    <AccordionTrigger className="font-serif text-lg text-[#2D2640] hover:text-[#2D2640] text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#655E78] leading-relaxed">
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
        <div className="h-px bg-[#2D2640]/10" />
      </div>

      {/* CTA */}
      <section className="container-editorial py-16 md:py-24">
        <div className="bg-[#F5F3F0] rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl text-[#2D2640] mb-3">
            Still curious?
          </h2>
          <p className="text-[#655E78] mb-6">
            Ask me anything. I don&apos;t bite and I reply within 24 hours.
          </p>
          <a
            href="mailto:thelunarplayground@gmail.com"
            className="inline-block px-8 py-3.5 bg-[#2D2640] text-[#F0EBF8] font-medium rounded-lg hover:bg-[#1E1835] transition-colors"
          >
            Get in touch
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
