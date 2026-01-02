# YongHyun's Blog

Next.js 15 기반 개인 블로그입니다.

## 기능

- ✅ **카테고리 분류**: 기술, 회고, 일기 카테고리
- ✅ **MDX 지원**: Markdown으로 쉽게 글 작성
- ✅ **코드 하이라이트**: Shiki 기반 구문 강조
- ✅ **다크/라이트 모드**: 시스템 설정 연동 + 수동 토글
- ✅ **읽는 시간 표시**: 자동 계산
- ✅ **검색**: fuse.js 기반 퍼지 검색
- ✅ **댓글**: Giscus (GitHub 기반)
- ✅ **Google Analytics**: 방문자 분석
- ✅ **SEO 최적화**: Open Graph, 메타태그 자동 생성

## 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 시작
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 시작
pnpm start
```

## 글 작성하기

`content/posts/` 폴더에 `.mdx` 파일을 생성합니다.

### 폴더 구조

```
content/posts/
├── tech/           # 기술 카테고리
├── retrospective/  # 회고 카테고리
└── diary/          # 일기 카테고리
```

### 글 형식

```mdx
---
title: "글 제목"
description: "글 설명"
date: "2026-01-02"
category: "tech"
tags: ["tag1", "tag2"]
thumbnail: "/images/thumbnail.png"
---

## 본문 내용

여기에 Markdown으로 글을 작성합니다.

코드 블록:

\`\`\`javascript
const hello = "world";
\`\`\`
```

## 설정

### Giscus (댓글)

1. [giscus.app](https://giscus.app/ko)에서 설정을 완료합니다.
2. `src/components/Giscus.tsx` 파일에서 다음 값들을 수정합니다:
   - `data-repo`: GitHub 저장소
   - `data-repo-id`: 저장소 ID
   - `data-category-id`: 카테고리 ID

### Google Analytics

환경 변수를 설정합니다:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 배포

### Vercel (권장)

```bash
npm i -g vercel
vercel
```

또는 [Vercel Dashboard](https://vercel.com)에서 GitHub 저장소를 연결합니다.

## 기술 스택

- [Next.js 15](https://nextjs.org/) - React 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) - 스타일링
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - MDX 렌더링
- [rehype-pretty-code](https://rehype-pretty-code.netlify.app/) - 코드 하이라이트
- [next-themes](https://github.com/pacocoursey/next-themes) - 다크모드
- [fuse.js](https://fusejs.io/) - 검색
- [Giscus](https://giscus.app/) - 댓글

## 라이선스

MIT
