import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug, getAllPostSlugs, blogPosts } from '@/content/blog';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

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

  const seoTitle = post.metaTitle || post.title;
  const seoDescription = post.metaDescription || post.description;

  return {
    title: `${seoTitle} | The Lunar Playground`,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      url: `https://thelunarplayground.com/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
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
    'birth chart': 'bg-[#FF8FA3]/15 text-[#C4365A]',
    moon: 'bg-[#7A746C]/15 text-[#5A5450]',
    astrocartography: 'bg-[#6B8DAB]/15 text-[#4A6B8A]',
    practical: 'bg-[#9CB896]/15 text-[#4A6B44]',
    bazi: 'bg-[#E8B84B]/15 text-[#8B6B1A]',
    numerology: 'bg-[#B088D0]/15 text-[#6B3FA0]',
    'human-design': 'bg-[#6BBFA3]/15 text-[#2A7A5A]',
    'chinese-zodiac': 'bg-[#E07A5F]/15 text-[#8B3A20]',
    compatibility: 'bg-[#F2A0C4]/15 text-[#A03060]',
    'cross-system': 'bg-[#7B9EC9]/15 text-[#3A5A80]',
  };

  const faqJsonLd = post.faq && post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
    author: {
      '@type': 'Person',
      name: 'Ashleigh',
      url: 'https://thelunarplayground.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Lunar Playground',
      url: 'https://thelunarplayground.com',
    },
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    url: `https://thelunarplayground.com/blog/${post.slug}`,
    mainEntityOfPage: `https://thelunarplayground.com/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen bg-[#F0EBF8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Navigation />

      <main className="container-editorial py-12 md:py-20">
        <article className="max-w-2xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-[#655E78] hover:text-[#2D2640] transition-colors mb-8"
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
              <span className="text-sm text-[#655E78]">{post.readingTime}</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-[#2D2640] mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-[#655E78] leading-relaxed">{post.description}</p>
          </header>

          {/* Divider */}
          <div className="flex items-center justify-center mb-10">
            <div className="w-1 h-1 rounded-full bg-[#FF8FA3]" />
            <div className="w-8 h-px bg-[#FF8FA3]/30 mx-3" />
            <div className="w-1 h-1 rounded-full bg-[#FF8FA3]" />
            <div className="w-8 h-px bg-[#FF8FA3]/30 mx-3" />
            <div className="w-1 h-1 rounded-full bg-[#FF8FA3]" />
          </div>

          {/* Article body */}
          <div className="prose-lunar">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="font-serif text-2xl text-[#2D2640] mt-10 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-serif text-xl text-[#2D2640] mt-8 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-[#2D2640]/80 leading-relaxed mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-2 text-[#2D2640]/80 mb-4 ml-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 text-[#2D2640]/80 mb-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-[#2D2640]/80 flex items-start gap-2">
                    <span className="text-[#FF8FA3] mt-1.5 flex-shrink-0">·</span>
                    <span>{children}</span>
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-[#FF8FA3] pl-4 italic text-[#655E78] my-6">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-[#2D2640]">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-[#2D2640]/70">{children}</em>
                ),
              }}
            >
              {post.body}
            </ReactMarkdown>
          </div>

          {/* FAQ Section */}
          {post.faq && post.faq.length > 0 && (
            <section className="mt-12">
              <h2 className="font-serif text-2xl text-[#2D2640] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {post.faq.map((item, i) => (
                  <details key={i} className="group bg-white rounded-xl border border-[#2D2640]/5 overflow-hidden">
                    <summary className="cursor-pointer px-5 py-4 text-[#2D2640] font-medium text-sm flex items-center justify-between list-none">
                      <span>{item.question}</span>
                      <svg className="w-4 h-4 text-[#655E78] flex-shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4 text-sm text-[#2D2640]/70 leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Divider */}
          <div className="flex items-center justify-center my-12">
            <div className="w-1 h-1 rounded-full bg-[#FF8FA3]" />
            <div className="w-8 h-px bg-[#FF8FA3]/30 mx-3" />
            <div className="w-1 h-1 rounded-full bg-[#FF8FA3]" />
            <div className="w-8 h-px bg-[#FF8FA3]/30 mx-3" />
            <div className="w-1 h-1 rounded-full bg-[#FF8FA3]" />
          </div>

          {/* CTA */}
          <section className="bg-white rounded-xl border border-[#2D2640]/5 p-6 mb-8 text-center">
            <p className="text-[#2D2640]/80 mb-4">
              Want to see what your chart says about you?
            </p>
            <Link
              href="/birth-report"
              className="inline-block px-6 py-3 bg-[#2D2640] text-[#F0EBF8] rounded-full text-sm hover:bg-[#3A3A3A] transition-colors"
            >
              Generate your free birth report
            </Link>
          </section>

          {/* Navigation between posts */}
          <nav className="flex justify-between items-center pt-8 mt-8 border-t border-[#2D2640]/10">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex items-center text-sm text-[#655E78] hover:text-[#2D2640] transition-colors max-w-[45%]"
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
                className="group flex items-center text-sm text-[#655E78] hover:text-[#2D2640] transition-colors max-w-[45%] text-right"
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

      <Footer />
    </div>
  );
}
