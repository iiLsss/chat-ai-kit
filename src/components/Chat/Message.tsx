import { useRef, useEffect, CSSProperties } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import MarkDown from '../MarkDown'
import ChatGPTIcon from '@/assets/icon/chatGPT.svg'
import userIcon from '@/assets/icon/user.svg'
import RetryIcon from '@/assets/icon/retry.svg'
import { copyToClipboard } from '@/utils'
import { Role, MessageItem, MessageStatus } from '@/types/openai'

interface IconProps {
	[key: string]: React.ReactNode
}

const Icon: IconProps = {
	[Role.USER]: <RetryIcon />,
	[Role.ASSISTANT]: <RetryIcon />,
}


interface Props{
  item: MessageItem
  onStopResponse: (id: string) => void
  onRetry: (id: string) => void
}

const Message = ({ item , onRetry, onStopResponse }:Props) => {
	const isUser = item.role === Role.USER
	const isASSISTANT = item.role === Role.ASSISTANT

	return (
		<div
			className={clsx(
				'flex w-full pb-4 relative ',
				isUser && 'flex-row-reverse',
				isASSISTANT && 'pb-6'
			)}>
			<div
				className={clsx(
					'absolute border rounded-md w-9 h-9 top-2 text-green-600',
					isUser ? '-right-12' : '',
					isASSISTANT ? '-left-12' : ''
				)}>
					{
						Icon[item.role]
					}
			</div>
			<div
				className={clsx(
					'p-4 rounded-xl drop-shadow ',
					isUser ? 'bg-sky-50' : 'bg-white'
				)}>
				<MarkDown content={item.content} />
			</div>
			{isASSISTANT && (
				<div className='absolute bottom-0 flex text-xs text-slate-400'>
					{
						item.status === MessageStatus.RUNNING && <span className='cursor-pointer hover:text-slate-500' onClick={() => onStopResponse(item.id)}>
						停止回复
						</span>
					}
					{
						item.status === MessageStatus.SUCCESS && (
							<>
									<span className='ml-2 mr-2 cursor-pointer hover:text-slate-500' onClick={() => onRetry(item.id)}>
										{/* <Image src={retryIcon} alt='retry' width={12} height={12} className='text-slate-400'></Image> */}
										重试
									</span>
									<span
										className='cursor-pointer hover:text-slate-500'
										onClick={() => copyToClipboard(item.content)}>
										复制
									</span>
							</>
						)
					}
					
				
				</div>
			)}
		</div>
	)
}

export default Message