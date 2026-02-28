import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { categories, CategorySlug } from '@/lib/types';
import { compileMDXContent } from '@/lib/mdx';
import { Giscus } from '@/components/Giscus';
import Link from 'next/link';
import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hereisian.com';

interface PostPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const post = getPostBySlug(slugPath);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  const canonicalUrl = `${BASE_URL}/posts/${slugPath}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.date,
      authors: ['YongHyun'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const post = getPostBySlug(slugPath);

  if (!post) {
    notFound();
  }

  const content = await compileMDXContent(post.content);
  const category = categories[post.category as CategorySlug];
  const formattedDate = new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${BASE_URL}/posts/${slugPath}`,
    author: {
      '@type': 'Person',
      name: 'YongHyun',
    },
    keywords: post.tags.join(', '),
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Post Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link
            href={`/category/${post.category}`}
            className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {category?.name || post.category}
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {post.title}
        </h1>
        
        {post.description && (
          <p className="text-lg text-muted-foreground mb-4">
            {post.description}
          </p>
        )}
        
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-md bg-muted text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none">
        {content}
      </div>

      {/* Post Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← 목록으로 돌아가기
          </Link>
        </div>
        
        {/* Comments */}
        {/* <Giscus /> */}
      </footer>
    </article>
  );
}

