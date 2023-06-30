
import clsx from 'clsx'
import MarkDown from '../MarkDown'
import ChatGPTIcon from '@/assets/icon/chatGPT.svg'
import QuillIcon from '@/assets/icon/quill.svg'
import { copyToClipboard } from '@/utils'
import { Role, MessageItem, MessageStatus } from '@/types/openai'

interface IconProps {
	[key: string]: React.ReactNode
}

const Icon: IconProps = {
	[Role.USER]: <QuillIcon className='w-8 h-8 text-purple-400' />,
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

	return (
		<div className={clsx('flex w-full pb-4 relative ', isUser ? 'flex-row-reverse' : 'pb-6')}>
			<div
				className={clsx(
					'absolute border rounded-md w-9 h-9 flex items-center justify-center top-0 text-green-600 bg-white',
					isUser ? '-right-10 md:-right-12' : '-left-10 md:-left-12'
				)}>
				{Icon[item.role]}
			</div>
			<div
				className={clsx('p-2 md:p-4 rounded-xl drop-shadow ', isUser ? 'bg-sky-50' : 'bg-white')}>
				<MarkDown content={item.content} />
			</div>
			{isASSISTANT && (
				<div className='absolute bottom-0 flex text-xs text-slate-400'>
					{item.status === MessageStatus.RUNNING && (
						<span
							className='cursor-pointer hover:text-slate-500'
							onClick={() => onStopResponse(item.id)}>
							停止回复
						</span>
					)}
					{item.status === MessageStatus.SUCCESS && (
						<>
							<span
								className='ml-2 mr-2 cursor-pointer hover:text-slate-500'
								onClick={() => onRetry(item.id)}>
								{/* <Image src={retryIcon} alt='retry' width={12} height={12} className='text-slate-400'></Image> */}
								重试
							</span>
							<span
								className='cursor-pointer hover:text-slate-500'
								onClick={() => copyToClipboard(item.content)}>
								复制
							</span>
						</>
					)}
				</div>
			)}
		</div>
	)
}

export default Message
