'use client'
import { useRef, useEffect, CSSProperties } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import ArrowRight from '@/assets/icon/arrow-right.svg'

import InputBox from '../InputBox'

import useChatStore from '@/store/chatGPT'
import useShowSider from '@/store/showSider'

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
	const { setShow, show } = useShowSider()
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

	const handleShowSlider = () => {
		setShow()
	}

	useEffect(() => {
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight
		}
	}, [messages])

	return messages.length ? (
		<>
			<div className='flex flex-col items-center justify-between w-full h-full'>
				<div ref={listRef} className='flex-1 w-full overflow-auto custom-scrollbar'>
					<MessageList list={messages} onRetry={handleRetry} onStopResponse={handleStopResponse} />
				</div>
				<InputBox onSubmit={handleSubmit} streaming={streaming} />
			</div>
			<div
				onClick={handleShowSlider}
				className='fixed w-8 md:hidden bottom-72 bg-purple-50 rounded-r-3xl'>
				<ArrowRight className='w-6 h-6 ml-2 text-purple-600' />
			</div>
		</>
	) : (
		<Empty onAdd={handleAddSession}  />
	)
}

export default Chat
