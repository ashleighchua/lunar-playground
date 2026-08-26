'use client';

import { useState, useEffect } from 'react';
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

      setStatus('success');
      localStorage.setItem('subscribed', 'true');
      setIsSubscribed(true);
      onSuccess?.();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  };

  if (isSubscribed && status !== 'success') {
    return (
      <div className={cn('text-center py-4', className)}>
        <p className="text-[#655E78] text-sm">You&apos;re on the list. We&apos;ll be in touch.</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className={cn('text-center py-6 animate-fade-in-up', className)}>
        <div className="w-12 h-12 rounded-full bg-[#8A8099]/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-[#8A8099]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-[#2D2640] font-medium mb-1">You&apos;re on the list</p>
        <p className="text-[#655E78] text-sm">We&apos;ll let you know when there&apos;s something new.</p>
      </div>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="email-capture" className="sr-only">Email address</label>
        <input
          id="email-capture"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={cn(
            'flex-1 px-5 py-4 rounded-lg border bg-white text-[#2D2640] placeholder:text-[#655E78]',
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
          {status === 'loading' ? 'Sending...' : buttonText}
        </button>
      </div>

      {showDisclaimer && (
        <label className="flex items-center justify-center gap-2 cursor-pointer mt-4">
          <input
            type="checkbox"
            checked={optInNotes}
            onChange={(e) => setOptInNotes(e.target.checked)}
            className="w-4 h-4 rounded border-[#2D2640]/20 text-[#8A8099] focus:ring-[#8A8099]/30 accent-[#8A8099]"
          />
          <span className="text-sm text-[#655E78]">
            Also receive occasional notes from Lunar Playground
          </span>
        </label>
      )}

      {status === 'error' && errorMessage && (
        <p className="text-sm text-red-600 text-center animate-fade-in">
          {errorMessage}
        </p>
      )}
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
          <p className="text-[#655E78] mb-4 text-center">{headline}</p>
        )}
        {formContent}
      </div>
    );
  }

  return (
    <div className={cn(
      'bg-[#F0EBF8] border border-[#2D2640]/5 rounded-xl p-8 max-w-xl mx-auto',
      className
    )}>
      {headline && (
        <h3 className="font-serif text-xl text-[#2D2640] mb-2 text-center">{headline}</h3>
      )}
      {description && (
        <p className="text-[#655E78] mb-6 text-center">{description}</p>
      )}
      {formContent}
    </div>
  );
}
