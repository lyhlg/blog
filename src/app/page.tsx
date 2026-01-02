import { getAllPosts, getAllCategories } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import Link from 'next/link';

export default function HomePage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          안녕하세요, <span className="text-primary">YongHyun</span>입니다
        </h1>
        <p className="text-lg text-muted-foreground">
          개발과 기술, 그리고 일상에 대한 이야기를 기록합니다.
        </p>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="px-4 py-2 rounded-full border border-border bg-card hover:bg-accent hover:border-primary/50 transition-all text-sm font-medium"
            >
              {category.name}
              <span className="ml-1.5 text-muted-foreground">
                ({category.count})
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">최근 글</h2>
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg mb-2">아직 작성된 글이 없습니다.</p>
            <p className="text-sm">
              content/posts/ 폴더에 .mdx 파일을 추가하여 첫 글을 작성해보세요!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
