'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, Play } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { blogPosts, type BlogPost } from '@/content/blog';

const categoryStyles: Record<string, { pill: string; border: string }> = {
  'birth chart': { pill: 'bg-[#FF8FA3]/15 text-[#C4365A]', border: '#FF8FA3' },
  moon: { pill: 'bg-[#7A746C]/15 text-[#5A5450]', border: '#7A746C' },
  astrocartography: { pill: 'bg-[#6B8DAB]/15 text-[#4A6B8A]', border: '#6B8DAB' },
  practical: { pill: 'bg-[#9CB896]/15 text-[#4A6B44]', border: '#9CB896' },
  bazi: { pill: 'bg-[#E8B84B]/15 text-[#8B6B1A]', border: '#E8B84B' },
  numerology: { pill: 'bg-[#B088D0]/15 text-[#6B3FA0]', border: '#B088D0' },
  'human-design': { pill: 'bg-[#6BBFA3]/15 text-[#2A7A5A]', border: '#6BBFA3' },
  'chinese-zodiac': { pill: 'bg-[#E07A5F]/15 text-[#8B3A20]', border: '#E07A5F' },
  compatibility: { pill: 'bg-[#F2A0C4]/15 text-[#A03060]', border: '#F2A0C4' },
  'cross-system': { pill: 'bg-[#7B9EC9]/15 text-[#3A5A80]', border: '#7B9EC9' },
};

function PostCard({ post }: { post: BlogPost }) {
  const style = categoryStyles[post.category] || { pill: '', border: '#2D2640' };

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article
        className="h-full p-6 bg-white border border-[#2D2640]/5 rounded-xl hover:shadow-lg transition-all flex flex-col"
        style={{ borderLeftWidth: '3px', borderLeftColor: style.border }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full ${style.pill}`}>
            {post.category}
          </span>
          <span className="text-xs text-[#7B7394]">
            {post.readingTime}
          </span>
        </div>

        <h3 className="font-serif text-lg text-[#2D2640] mb-2 group-hover:text-[#C4365A] transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-[#7B7394] leading-relaxed line-clamp-3 flex-1">
          {post.description}
        </p>

        <div className="mt-4 flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: style.border }}>
          <span>Read more</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const [blogView, setBlogView] = useState<'carousel' | 'grid'>('grid');

  return (
    <div className="min-h-screen bg-[#F0EBF8]">
      <Navigation />

      {/* Header */}
      <div className="container-editorial pt-16 md:pt-24 pb-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs tracking-[0.15em] uppercase text-[#7B7394]">
            The Lunar Playground
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2D2640] mt-4 mb-6">
            Blog
          </h1>
          <p className="text-[#7B7394] leading-relaxed">
            Practical guides to understanding your chart, navigating transits, and using astrology as a tool for self-awareness.
          </p>
        </div>

        {/* View toggle */}
        <div className="flex justify-center">
          <div className="flex items-center bg-[#2D2640]/5 rounded-lg p-1">
            <button
              onClick={() => setBlogView('carousel')}
              className={`p-1.5 rounded-md transition-colors ${blogView === 'carousel' ? 'bg-white shadow-sm text-[#2D2640]' : 'text-[#7B7394] hover:text-[#2D2640]'}`}
              aria-label="Carousel view"
            >
              <Play className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setBlogView('grid')}
              className={`p-1.5 rounded-md transition-colors ${blogView === 'grid' ? 'bg-white shadow-sm text-[#2D2640]' : 'text-[#7B7394] hover:text-[#2D2640]'}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Posts */}
      {blogView === 'carousel' ? (
        <section className="overflow-hidden pb-16">
          <style jsx>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
          <div>
            <div
              className="flex gap-6 pl-6"
              style={{
                animation: 'scroll 40s linear infinite',
                width: 'max-content',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused'; }}
              onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running'; }}
            >
              {[...blogPosts, ...blogPosts].map((post, i) => (
                <div key={`${post.slug}-${i}`} className="flex-shrink-0 w-[300px] h-[280px]">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="container-editorial pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="container-editorial pb-16 md:pb-24">
        <div className="text-center">
          <div className="bg-white rounded-2xl border border-[#2D2640]/5 p-8 max-w-xl mx-auto">
            <h2 className="font-serif text-2xl text-[#2D2640] mb-3">
              Ready to explore your chart?
            </h2>
            <p className="text-sm text-[#7B7394] mb-6">
              Generate your free personalised birth report and discover your Big Three, core drives, and more.
            </p>
            <Link
              href="/birth-report"
              className="inline-block px-6 py-3 bg-[#2D2640] text-[#F0EBF8] rounded-full text-sm hover:bg-[#3A3A3A] transition-colors"
            >
              Generate your birth report
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
