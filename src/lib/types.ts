export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  readingTime: string;
  draft: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

export const categories = {
  tech: { name: '기술', slug: 'tech', description: '개발과 기술에 관한 글' },
  retrospective: { name: '회고', slug: 'retrospective', description: '개인 회고와 성찰' },
  diary: { name: '일기', slug: 'diary', description: '일상의 기록' },
} as const;

export type CategorySlug = keyof typeof categories;

