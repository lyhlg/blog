import { notFound } from 'next/navigation';
import { getPostsByCategory } from '@/lib/posts';
import { categories, CategorySlug } from '@/lib/types';
import { PostCard } from '@/components/PostCard';
import Link from 'next/link';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = categories[category as CategorySlug];
  
  if (!categoryData) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${categoryData.name} 카테고리`,
    description: categoryData.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = categories[category as CategorySlug];

  if (!categoryData) {
    notFound();
  }

  const posts = getPostsByCategory(category);
  const allCategories = Object.entries(categories);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Category Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{categoryData.name}</h1>
        <p className="text-muted-foreground">{categoryData.description}</p>
      </header>

      {/* Category Tabs */}
      <nav className="mb-8">
        <div className="flex flex-wrap gap-2">
          {allCategories.map(([slug, data]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                slug === category
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-card hover:bg-accent'
              }`}
            >
              {data.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Posts */}
      <section>
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg mb-2">
              {categoryData.name} 카테고리에 글이 없습니다.
            </p>
            <p className="text-sm">
              content/posts/{category}/ 폴더에 .mdx 파일을 추가해보세요!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
