'use client'
import InputBox from '../InputBox'
import useChatStore from '@/store/chatGPT'
import ChatList from './ChatList'

const Chat = () => {
	const { sessionList, currentSessionId, getMessageAnswer } = useChatStore()

	const message = sessionList.get(currentSessionId)?.messages || []

	const handleSubmit = (val: string) => {
		getMessageAnswer(val)
	}

	const handleStopResponse = () => {
		console.log('stop reply')
	}

	const handleRetry = () => {
		console.log('retry')
	}

	return (
		<div className='flex flex-col items-center justify-between w-full h-full'>
			<div className='flex-1 w-full'>
				<ChatList
					message={message}
					handleStopResponse={handleStopResponse}
					handleRetry={handleRetry}
				/>
			</div>
			<InputBox onSubmit={handleSubmit} />
		</div>
	)
}

export default Chat
