'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function HomeEmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem('subscribed');
    if (subscribed === 'true') {
      setIsSubscribed(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          tags: ['home-page', 'lunar-notes'],
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      localStorage.setItem('subscribed', 'true');
      setIsSubscribed(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  };

  if (isSubscribed || status === 'success') {
    return (
      <div className="rounded-2xl bg-gradient-to-r from-[#D4C4B0] to-[#E8DED4] p-8 md:p-12">
        <div className="text-center">
          <p className="font-serif text-2xl text-[#2A2A2A]">You&apos;re on the list</p>
          <p className="text-[#6B6B6B] mt-2">We&apos;ll send you a note with each new moon phase.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#D4C4B0] to-[#E8DED4] p-8 md:p-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="md:max-w-sm">
          <h2 className="font-serif text-2xl md:text-3xl text-[#2A2A2A] leading-snug">
            Get your lunar note with each new moon phase
          </h2>
        </div>
        <div className="flex-1 md:max-w-md">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              disabled={status === 'loading'}
              className="flex-1 px-6 py-4 rounded-full border border-white/50 bg-white/80 text-[#2A2A2A] placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#B8A090]/50 focus:bg-white transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-4 rounded-full bg-[#2A2A2A] text-[#FAF7F2] hover:bg-[#1a1a1a] transition-colors whitespace-nowrap disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Subscribe'}
            </button>
          </form>
          <AnimatePresence>
            {status === 'error' && errorMessage && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-red-700 mt-3 text-center"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
