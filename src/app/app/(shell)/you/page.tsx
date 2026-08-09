'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadBirthData, type StoredBirthData } from '@/lib/birthData';
import { getBigThree, type BigThree } from '@/lib/bigThree';
import { BigThreeChips } from '@/components/app/BigThreeChips';

function formatDate(d: string): string {
  if (!d) return 'Not set';
  const dt = new Date(d + 'T12:00:00');
  return dt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: 'mailto:thelunarplayground@gmail.com' },
];

export default function AppProfilePage() {
  const [birth, setBirth] = useState<StoredBirthData | null>(null);
  const [bigThree, setBigThree] = useState<BigThree | null>(null);

  useEffect(() => {
    const stored = loadBirthData();
    setBirth(stored);
    if (stored) getBigThree(stored).then(setBigThree);
  }, []);

  return (
    <div className="px-5.5 pt-20 pb-30 flex flex-col gap-4.5">
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex-none flex items-center justify-center font-serif text-2xl text-[#FF8FA3]"
          style={{ background: 'linear-gradient(135deg, #2D2640, #2D2640)', border: '1px solid rgba(255,143,163,0.4)' }}
        >
          ✧
        </div>
        <div>
          <div className="font-serif text-2xl">Your chart</div>
          <div className="text-[12.5px] text-[#F0EBF8]/55">
            {bigThree ? 'Your Big Three, below' : 'Add your birth details to see your signs'}
          </div>
        </div>
      </div>

      <BigThreeChips bigThree={bigThree} />

      <div className="rounded-[18px] border border-[#F0EBF8]/10 bg-white/4.5 px-4.5">
        <div className="flex justify-between py-3.5 border-b border-[#F0EBF8]/8 text-sm">
          <span className="text-[#F0EBF8]/55">Date of birth</span>
          <span>{birth ? formatDate(birth.birthdate) : 'Not set'}</span>
        </div>
        <div className="flex justify-between py-3.5 border-b border-[#F0EBF8]/8 text-sm">
          <span className="text-[#F0EBF8]/55">Time of birth</span>
          <span>{birth?.birthtime || 'Not set'}</span>
        </div>
        <div className="flex justify-between py-3.5 text-sm">
          <span className="text-[#F0EBF8]/55">Place of birth</span>
          <span>{birth?.birthplace?.name || 'Not set'}</span>
        </div>
        <Link
          href="/app/onboarding"
          className="block py-3 text-[13.5px] text-[#FF8FA3] border-t border-[#F0EBF8]/8"
        >
          Edit birth details
        </Link>
      </div>

      <div className="rounded-[18px] border border-[#F0EBF8]/10 bg-white/4.5 px-4.5">
        {LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            className={`flex justify-between py-3.5 text-sm ${i < LINKS.length - 1 ? 'border-b border-[#F0EBF8]/8' : ''}`}
          >
            <span>{link.label}</span>
            <span className="text-[#F0EBF8]/40">›</span>
          </a>
        ))}
      </div>
    </div>
  );
}
