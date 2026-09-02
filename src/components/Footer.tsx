import Link from 'next/link';

const freeTools = [
  { name: 'Birth Chart', href: '/birth-report' },
  { name: 'Relocation Reading', href: '/astrocartography' },
  { name: 'Chinese Zodiac', href: '/chinese-zodiac' },
  { name: 'BaZi', href: '/bazi' },
  { name: 'Numerology', href: '/numerology' },
  { name: 'Human Design', href: '/human-design' },
  { name: 'Sky Guide', href: '/transit' },
  { name: 'Compatibility', href: '/compatibility' },
];

const siteLinks = [
  { name: 'Readings', href: '/shop' },
  { name: 'Blog', href: '/blog' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
];

export function Footer() {
  return (
    <footer className="border-t border-[#D6CFE3] bg-[#E8E2F0] py-10 md:py-14 mt-auto">
      <div className="container-editorial grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="font-serif text-lg text-[#2D2640]">
            <span className="text-[#7B8AE0]" aria-hidden="true">&#9789;</span> The Lunar Playground
          </p>
          <p className="mt-2.5 text-sm text-[#655E78] leading-relaxed max-w-70">
            The answers aren&apos;t really in the stars. We just help you see them.
          </p>
          <p className="mt-4 text-xs text-[#7B7394]">&copy; {new Date().getFullYear()} The Lunar Playground</p>
        </div>
        <div>
          <p className="mb-3 text-[11px] font-bold tracking-wider uppercase text-[#7B7394]">Want to poke around first? Free tools</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {freeTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="text-[#5A5472] hover:text-[#2D2640] transition-colors">
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-[11px] font-bold tracking-wider uppercase text-[#7B7394]">Site</p>
          <div className="grid gap-2 text-sm">
            {siteLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-[#5A5472] hover:text-[#2D2640] transition-colors">
                {link.name}
              </Link>
            ))}
            <a href="mailto:thelunarplayground@gmail.com" className="text-[#5A5472] hover:text-[#2D2640] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
