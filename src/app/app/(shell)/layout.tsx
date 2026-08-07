'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAppOnboarded } from '@/lib/birthData';
import AppShell from '@/components/app/AppShell';
import TabBar from '@/components/app/TabBar';

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAppOnboarded()) {
      router.replace('/app/onboarding');
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return <AppShell><div /></AppShell>;
  }

  return (
    <AppShell>
      {children}
      <TabBar />
    </AppShell>
  );
}
