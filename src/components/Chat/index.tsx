'use client'
import { useRef, useEffect } from 'react'

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
	const { sessionList, currentSessionId, addSession, getMessageAnswer } = useChatStore()
	const { messages = [], streaming } = sessionList.get(currentSessionId) ?? {}

	const listRef = useRef<HTMLDivElement>(null)
	const handleSubmit = (val: string) => {
		getMessageAnswer(val)
	}
	//todo
	const handleStopResponse = () => {
		console.log('stop reply')
	}
	// todo
	const handleRetry = () => {
		console.log('retry')
	}

	const handleAddSession = (content?: string) => {
		addSession(content)
	}

	useEffect(() => {
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight
		}
	}, [messages])

	// return messages.length ? (
	// 	<>
	// 		<div className='flex flex-col items-center justify-between w-full h-full'>
	// 			<div ref={listRef} className='flex-1 w-full overflow-auto custom-scrollbar'>
	// 				<MessageList list={messages} onRetry={handleRetry} onStopResponse={handleStopResponse} />
	// 			</div>
	// 			<InputBox onSubmit={handleSubmit} streaming={streaming} />
	// 		</div>
	// 	</>
	// ) : (
	// 	<Empty onAdd={handleAddSession}  />
	// )
	return  (
		<div className='flex flex-col items-center justify-between w-full h-full'>
			<div ref={listRef} className='flex-1 w-full overflow-auto custom-scrollbar'>
				<MessageList list={messages} onRetry={handleRetry} onStopResponse={handleStopResponse} />
			</div>
			<InputBox onSubmit={handleSubmit} streaming={streaming} />
		</div>
	)
	
}

export default Chat
