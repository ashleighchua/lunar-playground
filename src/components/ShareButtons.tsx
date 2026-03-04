'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  text: string;
  url?: string;
  onGenerateImage?: () => void;
}

export function ShareButtons({ title, text, url, onGenerateImage }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [copiedFor, setCopiedFor] = useState<string | null>(null);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=450');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(text)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=450');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyForPlatform = async (platform: string) => {
    const fullText = `${text} ${shareUrl}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedFor(platform);
      setTimeout(() => setCopiedFor(null), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = fullText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedFor(platform);
      setTimeout(() => setCopiedFor(null), 2000);
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    }
  };

  const hasNativeShare = typeof navigator !== 'undefined' && navigator.share;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {/* Twitter/X */}
      <button
        onClick={shareToTwitter}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors text-sm"
        aria-label="Share on Twitter"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="hidden sm:inline">Twitter</span>
      </button>

      {/* Facebook */}
      <button
        onClick={shareToFacebook}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors text-sm"
        aria-label="Share on Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <span className="hidden sm:inline">Facebook</span>
      </button>

      {/* Instagram */}
      <button
        onClick={() => hasNativeShare ? nativeShare() : copyForPlatform('instagram')}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors text-sm ${
          copiedFor === 'instagram'
            ? 'bg-[#9CB896]/20 text-[#4A6B44]'
            : 'bg-gradient-to-r from-[#833AB4]/10 via-[#E1306C]/10 to-[#F77737]/10 text-[#E1306C] hover:from-[#833AB4]/20 hover:via-[#E1306C]/20 hover:to-[#F77737]/20'
        }`}
        aria-label="Share on Instagram"
      >
        {copiedFor === 'instagram' ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Copied!</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="hidden sm:inline">Instagram</span>
          </>
        )}
      </button>

      {/* TikTok */}
      <button
        onClick={() => hasNativeShare ? nativeShare() : copyForPlatform('tiktok')}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors text-sm ${
          copiedFor === 'tiktok'
            ? 'bg-[#9CB896]/20 text-[#4A6B44]'
            : 'bg-[#000000]/10 text-[#000000] hover:bg-[#000000]/20'
        }`}
        aria-label="Share on TikTok"
      >
        {copiedFor === 'tiktok' ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Copied!</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
            </svg>
            <span className="hidden sm:inline">TikTok</span>
          </>
        )}
      </button>

      {/* Copy Link */}
      <button
        onClick={copyLink}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors text-sm ${
          copied
            ? 'bg-[#9CB896]/20 text-[#4A6B44]'
            : 'bg-[#2D2640]/5 text-[#655E78] hover:bg-[#2D2640]/10'
        }`}
        aria-label="Copy link"
      >
        {copied ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Copied!</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span>Copy link</span>
          </>
        )}
      </button>

      {/* Download Image */}
      {onGenerateImage && (
        <button
          onClick={onGenerateImage}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FF8FA3]/10 text-[#C4365A] hover:bg-[#FF8FA3]/20 transition-colors text-sm"
          aria-label="Download image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Save image</span>
        </button>
      )}

      {/* Native Share (mobile) */}
      {hasNativeShare && (
        <button
          onClick={nativeShare}
          className="sm:hidden flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#2D2640] text-[#F0EBF8] hover:bg-[#1E1835] transition-colors text-sm"
          aria-label="Share"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>Share</span>
        </button>
      )}
    </div>
  );
}
