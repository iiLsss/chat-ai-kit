'use client'
import { useRef } from 'react'
import Sider from '@/components/Sider'
import Chat from '@/components/Chat'
import Header from '@/components/Header'
// import VariableSizeList from '@/components/VirtualizedList/Chat'
import clsx from 'clsx'
import useShowSider from '@/store/showSider'

export default function Main() {
	const { show, setShow } = useShowSider()
  const maskRef = useRef<HTMLDivElement>(null)
	const handleCloseSider = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === maskRef.current ) {
		  setShow()
    }
	}

	return (
		<>
			<Header />
			<section className='w-full h-[calc(100vh-56px)] flex'>
				{/* pc */}
				<section className='hidden md:block'>
					<Sider />
				</section>
				{/* mobile */}
				<section
          ref={maskRef}
          onClick={handleCloseSider}
					className={clsx(
						'fixed bottom-0 left-0 right-0 z-20 w-full bg-black/25 md:hidden top-14 pr-[55%] shadow-left',
						show ? 'block' : 'hidden'
					)}>
					<Sider />
				</section>

				<div className='w-full h-full'>
					<Chat />
				</div>
			</section>
		</>
	)
}
