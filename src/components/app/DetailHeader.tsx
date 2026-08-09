'use client';

import { useRouter } from 'next/navigation';

export default function DetailHeader() {
  const router = useRouter();
  return (
    <div className="px-[22px] pt-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#F0EBF8]/60 hover:text-[#F0EBF8] transition-colors text-sm"
      >
        <span className="text-lg leading-none">←</span> Back
      </button>
    </div>
  );
}
