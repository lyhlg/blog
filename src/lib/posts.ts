import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { PostMeta, Post, categories } from './types';

export { categories };
export type { PostMeta, Post } from './types';
export type { CategorySlug } from './types';

const postsDirectory = path.join(process.cwd(), 'content/posts');

function getFilesRecursively(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  
  const files: string[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getFilesRecursively(fullPath));
    } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

export function getAllPosts(): PostMeta[] {
  const files = getFilesRecursively(postsDirectory);

  const posts = files.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const relativePath = path.relative(postsDirectory, filePath);
    const slug = relativePath
      .replace(/\\/g, '/')
      .replace(/\.mdx?$/, '');

    const stats = readingTime(content);

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      category: data.category || 'tech',
      tags: data.tags || [],
      thumbnail: data.thumbnail,
      readingTime: stats.text,
      draft: data.draft === true,
    };
  });

  // draft가 true인 글 제외
  const publishedPosts = posts.filter((post) => !post.draft);

  return publishedPosts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getPostBySlug(slug: string): Post | null {
  const decodedSlug = decodeURIComponent(slug);
  const mdxPath = path.join(postsDirectory, `${decodedSlug}.mdx`);
  const mdPath = path.join(postsDirectory, `${decodedSlug}.md`);

  let filePath: string;
  
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  const post = {
    slug: decodedSlug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    category: data.category || 'tech',
    tags: data.tags || [],
    thumbnail: data.thumbnail,
    readingTime: stats.text,
    draft: data.draft === true,
    content,
  };

  // draft인 글은 직접 접근도 차단
  if (post.draft) {
    return null;
  }

  return post;
}

export function getAllCategories(): { slug: string; name: string; count: number }[] {
  const posts = getAllPosts();
  const categoryCounts = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categories).map(([slug, data]) => ({
    slug,
    name: data.name,
    count: categoryCounts[slug] || 0,
  }));
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
