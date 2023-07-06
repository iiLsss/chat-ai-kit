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

export default function Main() {
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
		<>
			<Header />
			<div className='fixed top-0 right-0 flex items-center w-full bg-white border-b h-14'>
				<div onClick={() => setShow()} className='flex items-center justify-center w-12 h-12'>
					<MenuIcon className="" />
				</div>
				<div>{title}</div>
			</div>
			<section className='w-full h-[calc(100vh-56px)] flex'>
				{/* pc */}
				{/* <section className='hidden md:block'>
					<Sider />
				</section> */}
				{/* mobile */}
				<section
          ref={maskRef}
          onClick={handleCloseSider}
					style={{animationDuration: '200ms'}}
					className={clsx(
						'animate__animated fixed bottom-0 left-0 right-0 z-20 w-full bg-black/25 md:hidden top-0 pr-[35%] shadow-left pt-14',
						show ? 'animate__slideInLeft' : 'animate__slideOutLeft'
					)}>
						<div className='fixed top-0 left-0 w-[65%] flex items-center justify-between p-2 bg-white shadow h-14'>
							<span className='text-lg'>会话列表</span>	
							<CloseIcon onClick={() => setShow()} />
						</div>
						<Sider />
				</section>

				<div className='w-full h-full'>
					<Chat />
				</div>
			</section>
		</>
	)
}
