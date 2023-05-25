'use client'

import useChatStore from '@/store/chatGPT'
import './index.css'
import clsx from 'clsx'
import { useEffect } from 'react'


const Slider = () => {


	const {
		currentSessionId,
		setCurrentSessionId,
		addSession,
		deleteSession,
		sessionList,
	} = useChatStore()

	
	const handleAddSession = () => {
		addSession()
	}

	useEffect(() => {
		useChatStore.persist.rehydrate();
	}, []	)

	return (
		<div className='flex flex-col justify-around flex-1 border-r shrink-0 basis-52'>
			<div className='w-full px-2 pt-2 mb-2'>
				<div onClick={handleAddSession} className='h-12 leading-[48px] rounded-md mx-auto text-center cursor-pointer hover:bg-neutral-100'>
					+ New Chat
				</div>
			</div>
			<div className='flex-auto px-2 border-b'>
				{[...sessionList].map(([id, session]) => {
					return (
						<div
							className={clsx(
								'relative mb-2 cursor-pointer session-item py-1 px-2 rounded-md text-slate-700 ',
								currentSessionId === id
									? 'text-blue-500 bg-sky-50'
									: 'hover:bg-neutral-100'
							)}
							key={id}
							onClick={() => setCurrentSessionId(id)}>
							<p>{session.title}</p>
							<p className='text-xs text-slate-400'>
								{session.messages.length}条对话
							</p>
							<div
								className='absolute top-0 right-0 hidden text-xs session-item-delete'
								onClick={() => deleteSession(id)}>
								删除
							</div>
						</div>
					)
				})}
			</div>
			<div className='h-12 p-3'>设置</div>
		</div>
	)
}

export default Slider
