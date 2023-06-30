import Main from '@/components/ChatMain'
import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'
import chatCover from '../assets/img/chat.png'

const list = [{
  name: 'Chat',
  path: '/chat',
  desc: 'ChatGPT 是一个人工智能聊天机器人，它可以与人进行自然语言交互，帮助人们解决问题、提供信息和娱乐。',
  cover: chatCover
}, {
  name: 'Code',
  path: '/code',
  desc: '基于ChatGPT进行代码分析、优化',
  cover: chatCover
}]

export default function Home() {
  return (
    <main className='w-full h-screen overflow-hidden text-gray-800 '>
      {/* <Main /> */}
      <Header />
      <div className='p-2'>
        {
          list.map((item) => {
            return (
              <Link key={item.name} href={item.path}>
                <div className='flex items-center justify-start p-2 mb-3 rounded shadow-md'>
                  <div className='flex items-center justify-center w-24 h-24 shrink-0'>
                    <div className='relative w-20 h-20'>
                      <Image src={item.cover} fill={true} alt='chat' />
                    </div>
                  </div>
                  <div className='flex-1 h-24 ml-2'>
                    <div className='w-24 text-2xl '>{item.name}</div>
                    <div className='text-xs'>{item.desc}</div>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </main>
  )
}
