'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/app', glyph: '⌂', label: 'Home' },
  { href: '/app/readings', glyph: '✦', label: 'Readings' },
  { href: '/app/tools', glyph: '◈', label: 'Tools' },
  { href: '/app/you', glyph: '☾', label: 'You' },
] as const;

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center border-t border-[#F0E9DC]/10 bg-[#1A1628]/85 backdrop-blur-xl"
      style={{ paddingTop: 12, paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
    >
      {TABS.map((tab) => {
        const active = tab.href === '/app' ? pathname === '/app' : pathname?.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center gap-1 min-w-16 px-2 py-1"
            style={{ color: active ? '#D9B878' : 'rgba(240,233,220,0.45)' }}
          >
            <span className="text-xl leading-none">{tab.glyph}</span>
            <span className="text-[10.5px] tracking-wide">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
