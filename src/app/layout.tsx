import type { Metadata } from 'next';
import { Geist_Mono, IBM_Plex_Sans_KR, Noto_Sans_JP } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import './globals.css';

const ibmPlexSansKR = IBM_Plex_Sans_KR({
  variable: '--font-ibm-plex-sans-kr',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hereisian.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "YongHyun's Blog",
    template: "%s | YongHyun's Blog",
  },
  description: '기술, 회고, 일상을 기록하는 개인 블로그',
  openGraph: {
    title: "YongHyun's Blog",
    description: '기술, 회고, 일상을 기록하는 개인 블로그',
    url: BASE_URL,
    siteName: "YongHyun's Blog",
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "YongHyun's Blog",
    description: '기술, 회고, 일상을 기록하는 개인 블로그',
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const TAG_MANAGER_ID = process.env.NEXT_PUBLIC_TAG_MANAGER_ID || '';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${ibmPlexSansKR.variable} ${notoSansJP.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        {TAG_MANAGER_ID && <GoogleTagManager gtmId={TAG_MANAGER_ID} />}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
