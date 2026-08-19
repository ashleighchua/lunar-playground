import { cookies } from 'next/headers';
import { Navigation } from '@/components/Navigation';
import { AdminLoginForm } from '@/components/AdminLoginForm';
import { AdminRelocationOrderForm } from '@/components/AdminRelocationOrderForm';
import { ADMIN_SESSION_COOKIE, verifySessionCookieValue } from '@/lib/adminAuth';
import { products } from '@/data/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | The Lunar Playground',
  robots: { index: false, follow: false },
};

export default async function AdminRelocationOrderPage() {
  const cookieStore = await cookies();
  const isAuthed = verifySessionCookieValue(cookieStore.get(ADMIN_SESSION_COOKIE.name)?.value);

  const eligibleProducts = products.filter((p) => p.reportTier);

  return (
    <div className="min-h-screen bg-[#F0EBF8]">
      <Navigation />
      <main className="container-editorial py-16 md:py-24">
        <div className="max-w-xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl text-[#2D2640] mb-3">Manual order</h1>
          <p className="text-[#655E78] leading-relaxed mb-10">
            Key in a Fiverr client&apos;s details to trigger report generation directly, outside of Stripe.
          </p>
          {isAuthed ? (
            <AdminRelocationOrderForm eligibleProducts={eligibleProducts.map((p) => ({ id: p.id, title: p.title }))} />
          ) : (
            <AdminLoginForm />
          )}
        </div>
      </main>
    </div>
  );
}
