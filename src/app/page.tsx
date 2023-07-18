import Main from '@/components/ChatMain'
import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'
import chatCover from '../assets/img/chat.png'
import LoginLink from '@/components/LoginLink'
import { fetchUserInfo } from '@/clientApi/login'

const list = [{
  name: 'Chat',
  path: '/chat',
  desc: 'ChatGPT 是一个人工智能聊天机器人，它可以与人进行自然语言交互，帮助人们解决问题、提供信息和娱乐。',
  cover: './img/chat.png'
}, {
  name: 'Code',
  path: '/code',
  desc: '基于ChatGPT进行代码分析、优化',
  cover: './img/chat.png'
}]



export default async function Home() {

  const res = await fetchUserInfo()
  return (
    <main className='w-full h-screen overflow-hidden text-gray-800 '>
      {/* <Main /> */}
      <Header />
      <div className='p-2'>
        {
          list.map((item) => {
            return (
              <LoginLink key={item.name} href={item.path}>
                <div className='flex items-center justify-start p-2 mb-3 bg-white rounded shadow-md'>
                  <div className='flex items-center justify-center w-24 h-24 shrink-0'>
                    <div className='relative w-20 h-20'>
                      <img src={item.cover}  alt='chat' />
                    </div>
                  </div>
                  <div className='flex-1 h-24 ml-2'>
                    <div className='w-24 text-2xl '>{item.name}</div>
                    <div className='text-sm'>{item.desc}</div>
                  </div>
                </div>
              </LoginLink>
            )
          })
        }
      </div>
    </main>
  )
}
