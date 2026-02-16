'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, Play } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { blogPosts, type BlogPost } from '@/content/blog';

function PostCard({ post }: { post: BlogPost }) {
  const categoryColors: Record<string, string> = {
    'birth chart': 'bg-[#D4A84B]/15 text-[#8B6914]',
    moon: 'bg-[#7A746C]/15 text-[#5A5450]',
    astrocartography: 'bg-[#6B8DAB]/15 text-[#4A6B8A]',
    practical: 'bg-[#9CB896]/15 text-[#4A6B44]',
  };

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full p-6 bg-white border border-[#2A2A2A]/5 rounded-xl hover:shadow-lg hover:border-[#D4A84B]/20 transition-all">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full ${categoryColors[post.category] || ''}`}>
            {post.category}
          </span>
          <span className="text-xs text-[#6B6B6B]">
            {post.readingTime}
          </span>
        </div>

        <h3 className="font-serif text-lg text-[#2A2A2A] mb-2 group-hover:text-[#8B6914] transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-3">
          {post.description}
        </p>

        <div className="mt-4 flex items-center text-[#D4A84B] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
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
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navigation />

      {/* Header */}
      <div className="container-editorial pt-16 md:pt-24 pb-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs tracking-[0.15em] uppercase text-[#6B6B6B]">
            The Lunar Playground
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2A2A2A] mt-4 mb-6">
            Blog
          </h1>
          <p className="text-[#6B6B6B] leading-relaxed">
            Practical guides to understanding your chart, navigating transits, and using astrology as a tool for self-awareness.
          </p>
        </div>

        {/* View toggle */}
        <div className="flex justify-center">
          <div className="flex items-center bg-[#2A2A2A]/5 rounded-lg p-1">
            <button
              onClick={() => setBlogView('carousel')}
              className={`p-1.5 rounded-md transition-colors ${blogView === 'carousel' ? 'bg-white shadow-sm text-[#2A2A2A]' : 'text-[#6B6B6B] hover:text-[#2A2A2A]'}`}
              aria-label="Carousel view"
            >
              <Play className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setBlogView('grid')}
              className={`p-1.5 rounded-md transition-colors ${blogView === 'grid' ? 'bg-white shadow-sm text-[#2A2A2A]' : 'text-[#6B6B6B] hover:text-[#2A2A2A]'}`}
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
                <div key={`${post.slug}-${i}`} className="flex-shrink-0 w-[300px]">
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
          <div className="bg-white rounded-2xl border border-[#2A2A2A]/5 p-8 max-w-xl mx-auto">
            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-3">
              Ready to explore your chart?
            </h2>
            <p className="text-sm text-[#6B6B6B] mb-6">
              Generate your free personalised birth report and discover your Big Three, core drives, and more.
            </p>
            <Link
              href="/birth-report"
              className="inline-block px-6 py-3 bg-[#2A2A2A] text-[#FAF7F2] rounded-full text-sm hover:bg-[#3A3A3A] transition-colors"
            >
              Generate your birth report
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2A]/10 py-8">
        <div className="container-editorial text-center text-sm text-[#6B6B6B]">
          <p>The Lunar Playground</p>
        </div>
      </footer>
    </div>
  );
}
