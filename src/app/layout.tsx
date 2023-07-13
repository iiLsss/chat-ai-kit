import '@/styles/globals.css'
import { Metadata } from 'next'

// import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from 'next/font/google'
// import clsx from 'clsx'
// import background from '@/assets/img/background.webp'
const inter = Inter({ subsets: ['latin'] })
import 'animate.css';

export const metadata: Metadata = {
  title: 'Chat-kit',
  description: 'Chat-kit by lsss',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-50`} >
        {/* <div className='fixed w-full h-[50%] top-14 -z-10'>
          <Image src={background} alt='bg' fill={true}></Image>
        </div> */}
        {children}
      </body>
    </html>
  )
}
