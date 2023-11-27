import '@/styles/globals.css'
import { Metadata } from 'next'

import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import useUserStore from '@/store/user'
import { fetchUserInfo } from '@/clientApi/login'

const inter = Inter({ subsets: ['latin'] })
import 'animate.css';

const metadata: Metadata = {
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

async function getUser() {

  let token = cookies().get('sdiqiu_auth')
  let name = cookies().get('sdiqiu_name')

  const res = await fetchUserInfo({
    headers: {
      authorization: `bearer ${token?.value}`
    }
  })
  // console.log('========', res);
  if (res.ok && res.code === 1){
    return {name}
  } 
  return {name: ''}
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const { setUsername } = useUserStore()
  let { name } = await getUser()
  // setUsername(name)
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
