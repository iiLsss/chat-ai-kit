'use client'

import useChatStore from '@/store/chatGPT'
import clsx from 'clsx'
import { useEffect } from 'react'
import DeleteIcon from '@/assets/icon/delete.svg'
import Setting from '@/assets/icon/setting.svg'
import './index.css'
import Image from 'next/image'

const Slider = () => {
	const { currentSessionId, setCurrentSessionId, addSession, deleteSession, sessionList } =
		useChatStore()

	// 添加新会话
	const handleAddSession = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation()
		addSession()
	}
	// 选择会话
	const handleSelectSession = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
		e.stopPropagation()
		setCurrentSessionId(id)
	}
	// 删除会话
	const handleDeleteSession = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
		e.stopPropagation()
		deleteSession(id)
	}

	useEffect(() => {
		useChatStore.persist.rehydrate()
	}, [])

	return (
		<div className='flex flex-col justify-around flex-1 h-full bg-white border-r shrink-0 basis-52'>
			<div className='flex-auto p-2 pr-3 overflow-auto border-b custom-scrollbar'>
				{[...sessionList].map(([id, session]) => {
					return (
						<div
							className={clsx(
								'text-sm md:text-base relative mb-2 cursor-pointer session-item py-1 px-2 rounded-md text-slate-700 ',
								currentSessionId === id ? 'text-blue-500 bg-sky-50' : 'hover:bg-neutral-100'
							)}
							key={id}
							onClick={e => handleSelectSession(e, id)}>
							<p>{session.title}</p>
							<p className='text-xs text-slate-400'>{session.messages.length}条对话</p>
							<div
								className='absolute text-xs right-3 top-4 session-item-delete'
								onClick={e => handleDeleteSession(e, id)}>
								<DeleteIcon className='w-4 h-4' />
							</div>
						</div>
					)
				})}
			</div>
			<div className='flex items-center justify-between h-12 p-3 text-sm text-gray-500'>
				<div className='flex items-center cursor-pointer hover:text-gray-700'>
					<Setting className='w-4 h-4 mr-0.5' />
					<span>设置</span>
				</div>
				<div onClick={handleAddSession}>新增</div>
			</div>
		</div>
	)
}

export default Slider
