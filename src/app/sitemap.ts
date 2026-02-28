import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/posts';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hereisian.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categories = getAllCategories().map((cat) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categories,
    ...posts,
  ];
}
