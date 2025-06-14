import 'css/tailwind.css'
import 'css/twemoji.css'
import 'react-medium-image-zoom/dist/styles.css'
import 'remark-github-blockquote-alert/alert.css'

import clsx from 'clsx'
import type { Metadata } from 'next'
import {
  JetBrains_Mono,
  Tilt_Neon,
  Gowun_Batang,
  Balsamiq_Sans,
  Jura,
  Playpen_Sans,
  Platypi,
  Fredoka,
  Ribeye,
  REM,
} from 'next/font/google'
import { UmamiAnalytics } from '~/components/analytics/umami'
import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { SearchProvider } from '~/components/search/kbar-custom-provider'
import { TiltedGridBackground } from '~/components/ui/tilted-grid-background'
import { SITE_METADATA } from '~/data/site-metadata'
import { ThemeProviders } from './theme-providers'
import { BackgroundEffects } from '~/components/ui/background-effects'

const FONT_RIBEYE = Ribeye({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-ribeye',
})

const FONT_GOWUN_BATANG = Gowun_Batang({
  weight: ['400', '700'],
  preload: false,
  variable: '--font-gowun-batang',
})

const FONT_REM = REM({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-rem',
})

const FONT_JETBRAINS_MONO = JetBrains_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export let metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.siteUrl),
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.title}`,
  },
  description: SITE_METADATA.description,
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: './',
    siteName: SITE_METADATA.title,
    images: [SITE_METADATA.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${SITE_METADATA.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: SITE_METADATA.title,
    card: 'summary_large_image',
    images: [SITE_METADATA.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  let basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={SITE_METADATA.language}
      className={clsx(
        'min-w-full overflow-x-hidden scroll-smooth',
        FONT_REM.variable,
        FONT_JETBRAINS_MONO.variable,
        FONT_RIBEYE.variable,
        FONT_GOWUN_BATANG.variable
      )}
      suppressHydrationWarning
    >
      <link rel="apple-touch-icon" sizes="76x76" href={`${basePath}/static/favicons/favicon.ico`} />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon.ico`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon.ico`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body
        className={clsx([
          'antialiased',
          'relative min-h-screen pl-[calc(100vw-100%)]',
          'flex flex-col',
          'bg-white text-neutral-900',
          'dark:bg-dark dark:text-slate-300',
        ])}
      >
        <TiltedGridBackground className="inset-x-0 top-0 z-[-1] h-[50vh]" />
        <ThemeProviders>
          <BackgroundEffects />
          <UmamiAnalytics websiteId={SITE_METADATA.analytics.umamiAnalytics.websiteId} />
          <SearchProvider>
            <Header />
            <main className="mb-auto mt-[6rem] grow">{children}</main>
          </SearchProvider>
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  )
}
