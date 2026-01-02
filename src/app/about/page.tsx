import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '소개',
  description: '이용현에 대해 알아보세요',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-lg text-muted-foreground">
          안녕하세요, 저는 이용현입니다.
        </p>
      </header>

      <div className="prose prose-lg max-w-none">
        {/* Profile Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-primary to-primary/50 flex items-center justify-center text-4xl text-white font-bold flex-shrink-0">
              YH
            </div>
            <div>
              <h2 className="text-2xl font-semibold mt-0">이용현</h2>
              <p className="text-muted-foreground">
                개발자 | 블로거 | 끊임없이 배우는 사람
              </p> 
              <div className="flex gap-4 mt-4">
                <Link
                  href="https://github.com/lyhlg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors no-underline"
                >
                  GitHub
                </Link>
                <Link
                  href="https://www.linkedin.com/in/lyhlg0201/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors no-underline"
                >
                  LinkedIn
                </Link>
                <Link
                  href="mailto:lyhlg0201@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors no-underline"
                >
                  Email
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <h2>소개</h2>
          <p>
            이 블로그는 제가 개발하면서 배운 것들, 개인적인 회고, 그리고 일상의
            소소한 이야기들을 기록하는 공간입니다.
          </p>
          <p>
            기술적인 내용부터 개인적인 생각까지, 다양한 주제에 대해 글을 씁니다.
            방문해주셔서 감사합니다!
          </p>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2>기술 스택</h2>
          <div className="flex flex-wrap gap-2 not-prose">
            {[
              'TypeScript',
              'React',
              'Next.js',
              'Node.js',
              'AWS',
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm rounded-lg bg-muted text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        {/* <section className="mb-12">
          <h2>경력</h2>
          <div className="space-y-6 not-prose">
            <div className="border-l-2 border-primary pl-4">
              <h3 className="font-semibold text-lg">Software Engineer</h3>
              <p className="text-sm text-muted-foreground">회사명 • 2023 - 현재</p>
              <p className="mt-2 text-muted-foreground">
                주요 업무 및 성과에 대한 설명을 작성하세요.
              </p>
            </div>
            <div className="border-l-2 border-muted-foreground/30 pl-4">
              <h3 className="font-semibold text-lg">Junior Developer</h3>
              <p className="text-sm text-muted-foreground">이전 회사명 • 2021 - 2023</p>
              <p className="mt-2 text-muted-foreground">
                이전 업무에 대한 설명을 작성하세요.
              </p>
            </div>
          </div>
        </section> */}

        {/* Contact */}
        <section>
          <h2>연락처</h2>
          <p>
            lyhlg0201@gmail.com / 010-8667-4355
          </p>
        </section>
      </div>
    </div>
  );
}

