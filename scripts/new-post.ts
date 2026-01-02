import prompts from 'prompts';
import fs from 'fs';
import path from 'path';

const categories = [
  { title: '기술', value: 'tech' },
  { title: '회고', value: 'retrospective' },
  { title: '일기', value: 'diary' },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function main() {
  console.log('\n📝 새 블로그 글 작성\n');

  const response = await prompts([
    {
      type: 'text',
      name: 'title',
      message: '글 제목을 입력하세요:',
      validate: (value) => (value.trim() ? true : '제목을 입력해주세요'),
    },
    {
      type: 'text',
      name: 'description',
      message: '글 설명을 입력하세요:',
    },
    {
      type: 'select',
      name: 'category',
      message: '카테고리를 선택하세요:',
      choices: categories,
      initial: 0,
    },
    {
      type: 'text',
      name: 'tags',
      message: '태그를 입력하세요 (쉼표로 구분):',
      format: (value: string) =>
        value
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
    },
    {
      type: 'text',
      name: 'slug',
      message: '파일명 (slug)을 입력하세요:',
      initial: (_prev: unknown, values: { title: string }) => slugify(values.title),
      validate: (value) => (value.trim() ? true : '파일명을 입력해주세요'),
    },
  ]);

  // 사용자가 Ctrl+C로 취소한 경우
  if (!response.title) {
    console.log('\n❌ 취소되었습니다.\n');
    process.exit(0);
  }

  const today = formatDate(new Date());
  const { title, description, category, tags, slug } = response;

  // Frontmatter 생성
  const tagsString = tags.length > 0 ? `\ntags: [${tags.map((t: string) => `"${t}"`).join(', ')}]` : '';
  
  const frontmatter = `---
title: "${title}"
description: "${description || ''}"
date: "${today}"
category: "${category}"${tagsString}
draft: true
---

## 

`;

  // 파일 경로 생성
  const categoryDir = path.join(process.cwd(), 'content', 'posts', category);
  const filePath = path.join(categoryDir, `${slug}.mdx`);

  // 디렉토리 생성 (없으면)
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }

  // 파일이 이미 존재하는지 확인
  if (fs.existsSync(filePath)) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `파일이 이미 존재합니다. 덮어쓰시겠습니까? (${filePath})`,
      initial: false,
    });

    if (!overwrite) {
      console.log('\n❌ 취소되었습니다.\n');
      process.exit(0);
    }
  }

  // 파일 작성
  fs.writeFileSync(filePath, frontmatter, 'utf-8');

  console.log('\n✅ 글이 생성되었습니다!');
  console.log(`   📄 ${filePath}\n`);
}

main().catch(console.error);

