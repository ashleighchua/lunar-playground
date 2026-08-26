'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function FeedbackButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  // The /app section has its own bottom tab bar occupying this corner.
  if (pathname?.startsWith('/app')) return null;

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setSending(true);

    // Send feedback via email
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'thelunarplayground@gmail.com',
          type: 'feedback',
          data: { message },
        }),
      });
      setSent(true);
      setTimeout(() => {
        setIsOpen(false);
        setSent(false);
        setMessage('');
      }, 2000);
    } catch (err) {
      console.error('Failed to send feedback:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-[#2D2640] text-[#F0EBF8] shadow-lg hover:bg-[#1E1835] transition-all flex items-center justify-center text-lg"
        aria-label="Send feedback"
      >
        <span>?</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-[#F0EBF8] rounded-2xl p-6 max-w-sm w-full shadow-2xl mb-16 sm:mb-0">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#655E78] hover:text-[#2D2640] transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            {sent ? (
              <div className="text-center py-4">
                <div className="text-3xl mb-3">&#10003;</div>
                <p className="text-[#2D2640] font-medium">Thanks for your feedback!</p>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-xl text-[#2D2640] mb-1">Got feedback?</h3>
                <p className="text-sm text-[#655E78] mb-4">Questions, ideas, or just want to say hi.</p>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={3}
                  className="w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-white focus:outline-none focus:border-[#2D2640]/30 transition-colors text-[#2D2640] placeholder:text-[#655E78] resize-none text-sm"
                />

                <button
                  onClick={handleSubmit}
                  disabled={!message.trim() || sending}
                  className="w-full mt-3 px-6 py-3 rounded-lg bg-[#2D2640] text-[#F0EBF8] text-sm hover:bg-[#1E1835] transition-colors disabled:opacity-50"
                >
                  {sending ? 'Sending...' : 'Send feedback'}
                </button>

                <a
                  href="mailto:thelunarplayground@gmail.com"
                  className="block text-center mt-3 text-xs text-[#655E78] hover:text-[#2D2640] transition-colors"
                >
                  Or email us directly
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
