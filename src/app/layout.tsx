import '@/styles/globals.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chat-kit',
  description: 'Chat-kit by lsss',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta http-equiv="Cache-Control" content="no-cache" key="cache-control"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
