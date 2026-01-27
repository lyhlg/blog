import { Mermaid } from '@/components/Mermaid';
import { ComponentProps, isValidElement, Children, ReactNode } from 'react';

function extractTextFromChildren(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractTextFromChildren).join('');
  if (isValidElement(children) && children.props?.children) {
    return extractTextFromChildren(children.props.children);
  }
  return '';
}

function findLanguage(element: ReactNode): string | null {
  if (!isValidElement(element)) return null;

  const props = element.props as Record<string, unknown>;

  // Check data-language attribute (rehype-pretty-code)
  if (props['data-language']) return props['data-language'] as string;

  // Check className for language-xxx
  const className = props.className as string | undefined;
  if (className) {
    const match = className.match(/language-(\w+)/);
    if (match) return match[1];
  }

  // Check children recursively
  const children = props.children;
  if (children) {
    for (const child of Children.toArray(children)) {
      const lang = findLanguage(child);
      if (lang) return lang;
    }
  }

  return null;
}

function Pre({ children, ...props }: ComponentProps<'pre'>) {
  const dataLanguage = (props as Record<string, unknown>)['data-language'];

  if (dataLanguage === 'mermaid') {
    const code = extractTextFromChildren(children);
    return <Mermaid chart={code.trim()} />;
  }

  return <pre {...props}>{children}</pre>;
}

function Figure({ children, ...props }: ComponentProps<'figure'>) {
  const lang = findLanguage(children);

  if (lang === 'mermaid') {
    const code = extractTextFromChildren(children);
    return <Mermaid chart={code.trim()} />;
  }

  return <figure {...props}>{children}</figure>;
}

function isInlineCode(props: Record<string, unknown>): boolean {
  // 블록 코드는 data-language 속성이 있음
  return !props['data-language'];
}

function Code({ children, ...props }: ComponentProps<'code'>) {
  const codeProps = props as Record<string, unknown>;

  // 인라인 코드만 백틱 제거
  if (isInlineCode(codeProps)) {
    const text = extractTextFromChildren(children);
    const stripped = text.replace(/^`|`$/g, '');
    return <code {...props}>{stripped}</code>;
  }

  return <code {...props}>{children}</code>;
}

export const mdxComponents = {
  pre: Pre,
  figure: Figure,
  code: Code,
};
