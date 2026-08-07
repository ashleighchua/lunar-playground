import AppShell from '@/components/app/AppShell';
import DetailHeader from '@/components/app/DetailHeader';

export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <DetailHeader />
      {children}
    </AppShell>
  );
}
