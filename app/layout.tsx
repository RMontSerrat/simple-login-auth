import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { AuthProvider } from './providers/AuthProvider';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple User Login',
  description: 'Simple user authentication application built using React and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <AuthProvider>
            <main className={styles.main}>
              {children}
            </main>
          </AuthProvider>
        </Theme>
        </body>
    </html>
  )
}
