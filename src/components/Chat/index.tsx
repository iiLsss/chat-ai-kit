'use client'
import { useRef, useEffect, CSSProperties } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import InputBox from '../InputBox'
import useChatStore from '@/store/chatGPT'
import { Role, Messages } from '@/types/openai'
import chatGPTIcon from '@/assets/icon/chatGPT.svg'
import userIcon from '@/assets/icon/user.svg'
import { copyToClipboard } from '@/utils'
import MessageList from './MessageList'
import Empty from './Empty'

const Icon = {
	[Role.USER]: userIcon,
	[Role.ASSISTANT]: chatGPTIcon,
}

const Chat = () => {
	const { sessionList, currentSessionId, getMessageAnswer } = useChatStore()
	const message = sessionList.get(currentSessionId)?.messages || []

	const listRef = useRef<HTMLDivElement>(null)
	const handleSubmit = (val: string) => {
		getMessageAnswer(val)
	}
	//
	const handleStopResponse = () => {
		console.log('stop reply')
	}

	const handleRetry = () => {
		console.log('retry')
	}

	useEffect(() => {
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight
		}
	}, [message])

	return (
		<div className='flex flex-col items-center justify-between w-full h-full'>
			{message.length ? (
				<>
					<div
						ref={listRef}
						className='flex-1 w-full overflow-auto custom-scrollbar'>
						<MessageList
							list={message}
							onRetry={handleRetry}
							onStopResponse={handleStopResponse}
						/>
					</div>
					<InputBox onSubmit={handleSubmit} />
				</>
			) : (
				<Empty></Empty>
			)}
		</div>
	)
}

export default Chat
