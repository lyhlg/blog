import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const rehypePrettyCodeOptions = {
  theme: 'github-dark',
  keepBackground: true,
  defaultLang: 'plaintext',
};

interface MDXComponents {
  [key: string]: React.ComponentType<Record<string, unknown>>;
}

export async function compileMDXContent(content: string, components?: MDXComponents) {
  const { content: compiledContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, rehypePrettyCodeOptions],
        ],
      },
    },
    components,
  });

  return compiledContent;
}

