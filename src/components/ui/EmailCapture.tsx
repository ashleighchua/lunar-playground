'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { cn } from '@/lib/utils';

export interface ChartMetadata {
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  sunSign?: string;
  moonSign?: string;
  risingSign?: string;
  birthMoonPhase?: string;
  chineseZodiac?: string;
  lifePathNumber?: number;
}

interface EmailCaptureProps {
  headline?: string;
  description?: string;
  buttonText?: string;
  tags?: string[];
  metadata?: ChartMetadata;
  variant?: 'inline' | 'card' | 'minimal';
  className?: string;
  onSuccess?: () => void;
  showDisclaimer?: boolean;
}

/**
 * Email capture component for newsletter/waitlist signups
 * Stores subscribed flag in localStorage to avoid repeat prompts
 */
export function EmailCapture({
  headline = "Stay connected",
  description = "Get notified when new features are available.",
  buttonText = "Join the list",
  tags = [],
  metadata,
  variant = 'card',
  className,
  onSuccess,
  showDisclaimer = false,
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [optInNotes, setOptInNotes] = useState(true);

  // Check localStorage on mount
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
        body: JSON.stringify({ email, tags, metadata }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }

      // Success
      setStatus('success');
      localStorage.setItem('subscribed', 'true');
      setIsSubscribed(true);
      onSuccess?.();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  };

  // Already subscribed - show minimal confirmation
  if (isSubscribed && status !== 'success') {
    return (
      <div className={cn('text-center py-4', className)}>
        <p className="text-warm-500 text-sm">You&apos;re on the list. We&apos;ll be in touch.</p>
      </div>
    );
  }

  // Success state
  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn('text-center py-6', className)}
      >
        <div className="w-12 h-12 rounded-full bg-terracotta/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-warm-900 font-medium mb-1">You&apos;re on the list</p>
        <p className="text-warm-500 text-sm">We&apos;ll let you know when there&apos;s something new.</p>
      </motion.div>
    );
  }

  const formContent = (
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
          {status === 'loading' ? 'Sending...' : buttonText}
        </button>
      </div>

      {showDisclaimer && (
        <label className="flex items-center justify-center gap-2 cursor-pointer mt-4">
          <input
            type="checkbox"
            checked={optInNotes}
            onChange={(e) => setOptInNotes(e.target.checked)}
            className="w-4 h-4 rounded border-[#2A2A2A]/20 text-[#B8A090] focus:ring-[#B8A090]/30 accent-[#B8A090]"
          />
          <span className="text-sm text-[#6B6B6B]">
            Also receive occasional notes from Lunar Playground
          </span>
        </label>
      )}

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
  );

  if (variant === 'minimal') {
    return (
      <div className={cn('max-w-md mx-auto', className)}>
        {formContent}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={cn('max-w-xl mx-auto', className)}>
        {headline && (
          <p className="text-warm-700 mb-4 text-center">{headline}</p>
        )}
        {formContent}
      </div>
    );
  }

  // Card variant (default)
  return (
    <div className={cn(
      'bg-cream-100 border border-warm-900/5 rounded-xl p-8 max-w-xl mx-auto',
      className
    )}>
      {headline && (
        <h3 className="font-serif text-xl text-warm-900 mb-2 text-center">{headline}</h3>
      )}
      {description && (
        <p className="text-warm-600 mb-6 text-center">{description}</p>
      )}
      {formContent}
    </div>
  );
}
