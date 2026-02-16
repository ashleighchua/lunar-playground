'use client';

import { useState } from 'react';

export function CheckoutButton({ productId, label }: { productId: string; label: string }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="block w-full text-center px-6 py-3.5 bg-[#2A2A2A] text-[#FAF7F2] rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium disabled:opacity-60"
    >
      {loading ? 'Redirecting...' : label}
    </button>
  );
}
