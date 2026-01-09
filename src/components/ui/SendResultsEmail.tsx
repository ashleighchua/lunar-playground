'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SendResultsEmailProps {
  type: 'your-chart' | 'compatibility' | 'travel';
  data: any;
  className?: string;
}

/**
 * Component to send results to user's email via Resend
 */
export function SendResultsEmail({ type, data, className }: SendResultsEmailProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
        body: JSON.stringify({ to: email, type, data }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      setStatus('success');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn('text-center py-6', className)}
      >
        <div className="w-12 h-12 rounded-full bg-[#B8A090]/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-[#B8A090]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-[#2A2A2A] font-medium mb-1">Sent!</p>
        <p className="text-[#6B6B6B] text-sm">Check your inbox for your results.</p>
      </motion.div>
    );
  }

  return (
    <div className={cn('max-w-md mx-auto', className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={cn(
              'flex-1 px-5 py-4 rounded-lg border bg-white text-[#2A2A2A] placeholder:text-[#6B6B6B]/50',
              'focus:outline-none focus:ring-2 focus:ring-[#B8A090]/30 focus:border-[#B8A090]/50',
              'transition-colors duration-200',
              status === 'error' ? 'border-red-300' : 'border-[#2A2A2A]/10'
            )}
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-4 bg-[#B8A090] hover:bg-[#A89080] text-white rounded-lg whitespace-nowrap transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Email my results'}
          </button>
        </div>

        <AnimatePresence>
          {status === 'error' && errorMessage && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-red-600 text-center"
            >
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
