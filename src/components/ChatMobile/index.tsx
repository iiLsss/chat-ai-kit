'use client'
import { useRef } from 'react'
import Sider from '@/components/Sider'
import Chat from '@/components/Chat'
import Header from '@/components/Header'
import MenuIcon from '@/assets/icon/menu.svg'
import CloseIcon from '@/assets/icon/close-line.svg'
// import VariableSizeList from '@/components/VirtualizedList/Chat'
import clsx from 'clsx'
import useShowSider from '@/store/showSider'
import useChatStore from '@/store/chatGPT'


export default function Home() {

  const { show, setShow } = useShowSider()
	const { sessionList, currentSessionId, addSession, getMessageAnswer } = useChatStore()
	const { title } = sessionList.get(currentSessionId) ?? {}

  const maskRef = useRef<HTMLDivElement>(null)
	const handleCloseSider = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === maskRef.current ) {
		  setShow()
    }
	}
  return (
    <main className='w-full h-screen overflow-hidden text-gray-800'>
      <Header />
			<div className='fixed right-0 flex items-center w-full border-b top-14 h-14'>
				<div>{title}</div>
				<div onClick={() => setShow()} className='flex items-center justify-center w-12 h-12'>
					<MenuIcon className="" />
				</div>
			</div>

			<div
				ref={maskRef}
				onClick={handleCloseSider}
				className={clsx(
					'fixed  top-0  bottom-0 left-0 right-0 z-20 w-full h-full  bg-black/25 md:hidden pr-[35%] shadow-left ',
					show ? 'block' : 'hidden'
				)}
			>
				<div
					style={{animationDuration: '200ms'}}
					className={clsx(
						'animate__animated flex flex-col h-full w-full',
						show ? 'animate__slideInLeft' : 'animate__slideOutLeft'
					)}
				>
					<div className='flex items-center justify-between p-2 bg-white shadow h-14'>
						<span className='text-lg'>会话列表</span>	
						<CloseIcon onClick={() => setShow()} />
					</div>
					<Sider />
				</div>
			</div>
			<section className='w-full h-[calc(100vh-56px)] flex'>
				<div className='w-full h-full'>
					<Chat />
				</div>
			</section>
    </main>
  )
}


