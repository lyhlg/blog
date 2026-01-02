'use client';

import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { PostMeta, categories, CategorySlug } from '@/lib/types';

interface SearchBarProps {
  posts: PostMeta[];
}

export function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostMeta[]>([]);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ['title', 'description', 'tags'],
        threshold: 0.3,
        includeScore: true,
      }),
    [posts]
  );

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchResults = fuse.search(query);
    setResults(searchResults.map((result) => result.item));
  }, [query, fuse]);

  return (
    <div className="w-full">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="검색어 지우기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {query && (
        <div className="mt-4">
          {results.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                {results.length}개의 검색 결과
              </p>
              <div className="space-y-3">
                {results.map((post) => {
                  const category = categories[post.category as CategorySlug];
                  return (
                    <Link
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      className="block p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          {category?.name || post.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {post.readingTime}
                        </span>
                      </div>
                      <h3 className="font-medium">{post.title}</h3>
                      {post.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          {post.description}
                        </p>
                      )}
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              &quot;{query}&quot;에 대한 검색 결과가 없습니다.
            </p>
          )}
        </div>
      )}

      {!query && posts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            최근 글
          </h2>
          <div className="space-y-3">
            {posts.slice(0, 5).map((post) => {
              const category = categories[post.category as CategorySlug];
              return (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="block p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {category?.name || post.category}
                    </span>
                  </div>
                  <h3 className="font-medium">{post.title}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
