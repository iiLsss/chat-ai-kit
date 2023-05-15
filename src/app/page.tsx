// import Image from 'next/image'
import Sider from '@/components/Sider'
import Header from '@/components/Header'
import Chat from '@/components/Chat'
import Layout from '@/components/Layout'
export default function Home() {
  return (
    <main className='w-full h-screen'>
      <Header />

      <Layout 
        slider={<Sider />}
      >
        <Chat />
      </Layout>
    </main>
  )
}
