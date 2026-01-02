import Link from 'next/link';
import { PostMeta, categories, CategorySlug } from '@/lib/types';

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  const category = categories[post.category as CategorySlug];
  const formattedDate = new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="p-6 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {category?.name || post.category}
            </span>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{post.readingTime}</span>
          </div>
          
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          
          {post.description && (
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {post.description}
            </p>
          )}
          
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{post.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
