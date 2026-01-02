import { getAllPosts } from '@/lib/posts';
import { SearchBar } from '@/components/SearchBar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '검색',
  description: '블로그 글을 검색합니다',
};

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">검색</h1>
        <p className="text-muted-foreground">
          제목, 설명, 태그로 글을 검색할 수 있습니다.
        </p>
      </header>

      <SearchBar posts={posts} />
    </div>
  );
}

