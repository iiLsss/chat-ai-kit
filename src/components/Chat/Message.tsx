
import clsx from 'clsx'
import MarkDown from '../MarkDown'
import Toast from '../Toast'
import ChatGPTIcon from '@/assets/icon/chatGPT.svg'
import QuillIcon from '@/assets/icon/quill.svg'
import CopyIcon from '@/assets/icon/copy.svg'
import RefreshIcon from '@/assets/icon/refresh.svg'
import { copyToClipboard } from '@/utils'
import { Role, MessageItem, MessageStatus } from '@/types/openai'

interface IconProps {
	[key: string]: React.ReactNode
}

const Icon: IconProps = {
	[Role.USER]: <QuillIcon className='w-8 h-8 text-gray-700' />,
	[Role.ASSISTANT]: <ChatGPTIcon className='w-8 h-8 text-emerald-500' />,
	[Role.SYSTEM]: <ChatGPTIcon className='w-8 h-8 text-emerald-500' />,
}

interface Props {
	item: MessageItem
	onStopResponse: (id: string) => void
	onRetry: (id: string) => void
}

const Message = ({ item, onRetry, onStopResponse }: Props) => {
	const isUser = item.role === Role.USER
	const isASSISTANT = item.role === Role.ASSISTANT
	console.log(item);

	const handleCopy = (data: string) => {
		Toast({ message: '复制成功', type: 'success' })
		copyToClipboard(data)
	}

	return (
		<div className={clsx('flex mx-2 pb-4 ', isUser ? 'flex-row-reverse pl-11' : 'pr-11 pb-6')}>
			<div
				className={clsx(
					'border shrink-0 rounded-md w-9 h-9 flex items-center justify-center top-0 text-green-600 bg-white',
					isUser? 'ml-2' : 'mr-2 '
				)}>
				{Icon[item.role]}
			</div>
			<div>
				<div className='mb-1 text-xs text-gray-500'>{item.createTime && new Date(item.createTime).toLocaleString()}</div>
				<div
					className={clsx('p-2 md:p-4 rounded-xl drop-shadow ', isUser ? 'bg-sky-50' : 'bg-white')}>
					<MarkDown content={item.content} />
				</div>
				{isASSISTANT && (
				<div className='flex mt-1 text-gray-400 text'>
					{item.status === MessageStatus.RUNNING && (
						<span
							className='md:cursor-pointer focus:text-gray-700'
							onClick={() => onStopResponse(item.id)}>
							停止回复
						</span>
					)}
					{item.status === MessageStatus.SUCCESS && (
						<>
							{/* <div
								className='flex items-center ml-2 mr-4 md:cursor-pointer focus:text-gray-700'
								onClick={() => onRetry(item.id)}>
								<RefreshIcon className="w-4 h-4 mr-1" />
								<span>重试</span>
							</div> */}
							<div
								className='flex items-center md:cursor-pointer focus:text-gray-700'
								onClick={() => handleCopy(item.content)}>
								<CopyIcon className="w-4 h-4 mr-1" />
								<span>复制</span>
							</div>
						</>
					)}
				</div>
			)}
			</div>
			
			
		</div>
	)
}

export default Message
