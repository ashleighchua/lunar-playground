import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug, getAllPostSlugs, blogPosts } from '@/content/blog';
import { Navigation } from '@/components/Navigation';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all blog posts
 */
export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

/**
 * Generate metadata for each blog post (SEO)
 */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | The Lunar Playground`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://thelunarplayground.com/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

/**
 * Individual blog post page
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Find next and previous posts
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = blogPosts[currentIndex + 1];
  const prevPost = blogPosts[currentIndex - 1];

  const categoryColors: Record<string, string> = {
    'birth chart': 'bg-[#D4A84B]/15 text-[#8B6914]',
    moon: 'bg-[#7A746C]/15 text-[#5A5450]',
    astrocartography: 'bg-[#6B8DAB]/15 text-[#4A6B8A]',
    practical: 'bg-[#9CB896]/15 text-[#4A6B44]',
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navigation />

      <main className="container-editorial py-12 md:py-20">
        <article className="max-w-2xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors mb-8"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All posts
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full ${categoryColors[post.category] || ''}`}>
                {post.category}
              </span>
              <span className="text-sm text-[#6B6B6B]">{post.readingTime}</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-[#6B6B6B] leading-relaxed">{post.description}</p>
          </header>

          {/* Divider */}
          <div className="flex items-center justify-center mb-10">
            <div className="w-1 h-1 rounded-full bg-[#D4A84B]" />
            <div className="w-8 h-px bg-[#D4A84B]/30 mx-3" />
            <div className="w-1 h-1 rounded-full bg-[#D4A84B]" />
            <div className="w-8 h-px bg-[#D4A84B]/30 mx-3" />
            <div className="w-1 h-1 rounded-full bg-[#D4A84B]" />
          </div>

          {/* Article body */}
          <div className="prose-lunar">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="font-serif text-2xl text-[#2A2A2A] mt-10 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-serif text-xl text-[#2A2A2A] mt-8 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-[#2A2A2A]/80 leading-relaxed mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-2 text-[#2A2A2A]/80 mb-4 ml-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 text-[#2A2A2A]/80 mb-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-[#2A2A2A]/80 flex items-start gap-2">
                    <span className="text-[#D4A84B] mt-1.5 flex-shrink-0">·</span>
                    <span>{children}</span>
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-[#D4A84B] pl-4 italic text-[#6B6B6B] my-6">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-[#2A2A2A]">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-[#2A2A2A]/70">{children}</em>
                ),
              }}
            >
              {post.body}
            </ReactMarkdown>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center my-12">
            <div className="w-1 h-1 rounded-full bg-[#D4A84B]" />
            <div className="w-8 h-px bg-[#D4A84B]/30 mx-3" />
            <div className="w-1 h-1 rounded-full bg-[#D4A84B]" />
            <div className="w-8 h-px bg-[#D4A84B]/30 mx-3" />
            <div className="w-1 h-1 rounded-full bg-[#D4A84B]" />
          </div>

          {/* CTA */}
          <section className="bg-white rounded-xl border border-[#2A2A2A]/5 p-6 mb-8 text-center">
            <p className="text-[#2A2A2A]/80 mb-4">
              Want to see what your chart says about you?
            </p>
            <Link
              href="/birth-report"
              className="inline-block px-6 py-3 bg-[#2A2A2A] text-[#FAF7F2] rounded-full text-sm hover:bg-[#3A3A3A] transition-colors"
            >
              Generate your free birth report
            </Link>
          </section>

          {/* Navigation between posts */}
          <nav className="flex justify-between items-center pt-8 mt-8 border-t border-[#2A2A2A]/10">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex items-center text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors max-w-[45%]"
              >
                <svg className="w-4 h-4 mr-2 flex-shrink-0 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline truncate">{prevPost.title}</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex items-center text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors max-w-[45%] text-right"
              >
                <span className="hidden sm:inline truncate">{nextPost.title}</span>
                <span className="sm:hidden">Next</span>
                <svg className="w-4 h-4 ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2A]/10 py-8">
        <div className="container-editorial text-center text-sm text-[#6B6B6B]">
          <p>The Lunar Playground</p>
        </div>
      </footer>
    </div>
  );
}
