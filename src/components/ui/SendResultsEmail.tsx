'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SendResultsEmailProps {
  type: 'your-chart' | 'compatibility' | 'astrocartography' | 'bazi' | 'numerology' | 'human-design' | 'chinese-zodiac';
  data: any;
  className?: string;
  defaultEmail?: string;
}

export function SendResultsEmail({ type, data, className, defaultEmail = '' }: SendResultsEmailProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(true);

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
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: email, type, data, subscribe: subscribeToNewsletter }),
      });

      if (!response.ok) {
        let errorMsg = 'Failed to send email';
        try {
          const result = await response.json();
          errorMsg = result.error || errorMsg;
        } catch {
          // Response wasn't JSON
        }
        throw new Error(errorMsg);
      }

      setStatus('success');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={cn('text-center py-6 animate-fade-in-up', className)}>
        <div className="w-12 h-12 rounded-full bg-[#8A8099]/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-[#8A8099]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-[#2D2640] font-medium mb-1">Sent!</p>
        <p className="text-[#7B7394] text-sm">Check your inbox for your results.</p>
      </div>
    );
  }

  return (
    <div className={cn('max-w-md mx-auto', className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <label htmlFor="results-email" className="sr-only">Email address</label>
          <input
            id="results-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={cn(
              'flex-1 px-5 py-4 rounded-lg border bg-white text-[#2D2640] placeholder:text-[#7B7394]/50',
              'focus:outline-none focus:ring-2 focus:ring-[#8A8099]/30 focus:border-[#8A8099]/50',
              'transition-colors duration-200',
              status === 'error' ? 'border-red-300' : 'border-[#2D2640]/10'
            )}
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-4 bg-[#8A8099] hover:bg-[#A89080] text-white rounded-lg whitespace-nowrap transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Email my results'}
          </button>
        </div>

        <label className="flex items-center justify-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={subscribeToNewsletter}
            onChange={(e) => setSubscribeToNewsletter(e.target.checked)}
            className="w-4 h-4 rounded border-[#2D2640]/20 accent-[#8A8099]"
          />
          <span className="text-sm text-[#7B7394]">
            Also receive occasional notes from Lunar Playground
          </span>
        </label>

        {status === 'error' && errorMessage && (
          <p className="text-sm text-red-600 text-center animate-fade-in">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
