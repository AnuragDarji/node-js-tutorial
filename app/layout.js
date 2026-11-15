import localFont from 'next/font/local'
import { ProgressProvider } from '@/components/ProgressProvider'
import './globals.css'

const body = localFont({
  src: [
    { path: './fonts/AtkinsonHyperlegible-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/AtkinsonHyperlegible-Italic.ttf', weight: '400', style: 'italic' },
    { path: './fonts/AtkinsonHyperlegible-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
})

const display = localFont({
  src: './fonts/Bricolage.ttf',
  weight: '200 800',
  variable: '--font-display',
  display: 'swap',
})

const mono = localFont({
  src: './fonts/JBMono.ttf',
  weight: '100 800',
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Node.js, topic by topic',
    template: '%s · Node.js, topic by topic',
  },
  description: 'A hands-on Node.js course: modules, async, streams, Express, databases, testing and production.',
}

export const viewport = {
  colorScheme: 'dark',
  themeColor: '#0e1c28',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  )
}
