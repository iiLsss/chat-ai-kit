'use client'
import { useRef, useEffect, CSSProperties } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import InputBox from '../InputBox'
import MarkDown from '../MarkDown'
import useChatStore from '@/store/chatGPT'
import { Role, Messages } from '@/types/openai'
import chatGPTIcon from '@/assets/icon/chatGPT.svg'
import userIcon from '@/assets/icon/user.svg'
import { copyToClipboard } from '@/utils'

import './index.css'

const Icon = {
	[Role.USER]: userIcon,
	[Role.ASSISTANT]: chatGPTIcon,
}


const Chat = () => {
	const { sessionList, currentSessionId, getSessionAnswer } = useChatStore()
	const message = sessionList.get(currentSessionId)?.messages || []

	const handleSubmit = (val: string) => {
		getSessionAnswer(val)
	}
	//
	const handleStopResponse = () => {
		console.log('stop reply')
	}

	const handleRetry = () => {
		console.log('retry')
	}

	return (
		<div className='flex flex-col items-center justify-between w-full h-full'>
			<div className='flex-1 w-full overflow-auto custom-sidder'>
				<div className='w-9/12 max-w-4xl mx-auto my-3'>
				{message.map((item, index) => {
					const isUser = item.role === Role.USER
					const isASSISTANT = item.role === Role.ASSISTANT
					return (
						<div
							key={item.id}
							className={clsx(
								'flex  w-full pb-4 relative ',
								isUser && 'flex-row-reverse',
								isASSISTANT && 'pb-6'
							)}>
							<div
								className={clsx(
									'absolute border rounded-md w-9 h-9 top-2 text-green-600',
									isUser && '-right-12',
									isASSISTANT && '-left-12'
								)}>
								<Image src={Icon[item.role]} alt='chatGPT'></Image>
							</div>
							<div
								className={clsx(
									'p-4  rounded-xl drop-shadow ',
									isUser ? 'bg-sky-50' : 'bg-white'
								)}>
								<MarkDown content={item.content} />
							</div>
							{isASSISTANT && (
								<div className='absolute bottom-0 flex text-xs text-slate-400'>
									{/* {
						item.
					} */}
									<span className='cursor-pointer' onClick={handleStopResponse}>
										停止回复
									</span>
									<span className='mr-2 cursor-pointer' onClick={handleRetry}>
										重试
									</span>
									<span
										className='cursor-pointer'
										onClick={() => copyToClipboard(item.content)}>
										复制
									</span>
								</div>
							)}
						</div>
					)
				})}
			</div>
			</div>


			<InputBox onSubmit={handleSubmit} />
		</div>
	)
}

export default Chat
