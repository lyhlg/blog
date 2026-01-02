'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

export function Giscus() {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    // Giscus 설정 - 사용자가 자신의 레포지토리 정보로 변경해야 합니다
    script.setAttribute('data-repo', 'YOUR_GITHUB_USERNAME/YOUR_REPO_NAME');
    script.setAttribute('data-repo-id', 'YOUR_REPO_ID');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', resolvedTheme === 'dark' ? 'dark' : 'light');
    script.setAttribute('data-lang', 'ko');

    // Clear existing content and add script
    ref.current.innerHTML = '';
    ref.current.appendChild(script);
  }, [resolvedTheme]);

  return <div ref={ref} className="giscus mt-8" />;
}

