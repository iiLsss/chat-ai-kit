'use client'

import useChatStore from '@/store/chatGPT'
import clsx from 'clsx'
import { useEffect } from 'react'
import deleteIcon from '@/assets/icon/delete.svg'
import './index.css'
import Image from 'next/image'

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
			<div className='flex-auto p-2 pr-3 overflow-auto border-b custom-scrollbar'>
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
								className='absolute hidden text-xs right-3 top-4 session-item-delete'
								onClick={() => deleteSession(id)}>
								<Image src={deleteIcon} alt='delete' className='w-4 h-4'></Image>
							</div>
						</div>
					)
				})}
			</div>
			<div className='flex items-center justify-between h-12 p-3 text-sm'>
				<div >设置</div>
				<div onClick={handleAddSession}>新增</div>
			</div>
		</div>
	)
}

export default Slider
