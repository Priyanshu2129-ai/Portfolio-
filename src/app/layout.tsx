import type { Metadata, Viewport } from 'next';
import './globals.css';
import CosmicBackground from '@/components/visual/CosmicBackground';
import CustomCursor from '@/components/visual/CustomCursor';
import ScrollProgress from '@/components/visual/ScrollProgress';

export const viewport: Viewport = {
  themeColor: '#05060a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://priyanshu-portfolio.vercel.app'),
  title: 'PRIYANSHU KUMAR — BECOMING UNBEATABLE',
  description:
    'Personal Portfolio & Engineering Showcase of Priyanshu Kumar. Computer Science & Engineering Diploma Student at GP VAISHALI. Still learning. Always building.',
  keywords: [
    'Priyanshu Kumar',
    'BECOMING UNBEATABLE',
    'GP VAISHALI',
    'Computer Science Diploma',
    'Web Developer',
    'Student Developer',
    'LocaHelp',
    'Student Resource Hub',
    'React',
    'Next.js',
    'Portfolio'
  ],
  authors: [{ name: 'Priyanshu Kumar' }],
  creator: 'Priyanshu Kumar',
  openGraph: {
    title: 'PRIYANSHU KUMAR — BECOMING UNBEATABLE',
    description:
      'Personal Portfolio of Priyanshu Kumar. Computer Science & Engineering Diploma Student at GP VAISHALI. Still learning. Always building.',
    url: 'https://priyanshu-portfolio.vercel.app',
    siteName: 'Priyanshu Kumar Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRIYANSHU KUMAR — BECOMING UNBEATABLE',
    description:
      'Personal Portfolio of Priyanshu Kumar. Computer Science & Engineering Diploma Student at GP VAISHALI.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@400;600;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-cosmic-950 text-slate-100 antialiased selection:bg-lime-neon/20 selection:text-white">
        <ScrollProgress />
        <CustomCursor />
        <CosmicBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}

