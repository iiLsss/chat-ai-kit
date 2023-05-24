'use client'
import { useRef, useEffect, CSSProperties, useLayoutEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import InputBox from '../InputBox'
import MarkDown from '../MarkDown'
import useChatStore from '@/store/chatGPT'
import { Role, Messages } from '@/types/openai'
import chatGPTIcon from '@/assets/icon/chatGPT.svg'
import userIcon from '@/assets/icon/user.svg'
import { copyToClipboard } from '@/utils'
import {VariableSizeList} from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

import './index.css'

const Icon = {
	[Role.USER]: userIcon,
	[Role.ASSISTANT]: chatGPTIcon,
}

type ListRef = VariableSizeList<Messages>
type RowHeight = { [key: number]: number }

const Chat = () => {
	const { sessionList, currentSessionId, getSessionAnswer } = useChatStore()
	const message = sessionList.get(currentSessionId)?.messages || []
	// References
	const listRef = useRef<ListRef>(null);
	const rowHeights = useRef<RowHeight>();

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


	const Row = ({ index, style }: {index:number, style: CSSProperties}  ) => {
		const rowRef = useRef<HTMLDivElement>(null);
		const item = message[index]
		console.log(item, index)

		useLayoutEffect(() => {
			if (rowRef.current) {
				console.log('=====', rowRef.current.getBoundingClientRect().height)
				setRowHeight(index, rowRef.current.getBoundingClientRect().height);
			}
		}, []);
	
		const isUser = item.role === Role.USER
		const isASSISTANT = item.role === Role.ASSISTANT
		return (
			<div key={item.id} ref={rowRef} className='w-9/12 max-w-4xl mx-auto my-3'>
			<div
				key={item.id}
				className={clsx(
					'flex  w-full pb-4 relative ',
					isUser && 'flex-row-reverse',
					isASSISTANT && 'pb-6'
				)}
				
			>
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
						<span
							className='cursor-pointer'
							onClick={handleStopResponse}>
							停止回复
						</span>
						<span
							className='mr-2 cursor-pointer'
							onClick={handleRetry}>
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
			</div>
		)
	}
	
	function getRowHeight(index: number) {

    return rowHeights.current ? (rowHeights.current[index] + 8 )  : 82
  }

	function setRowHeight(index: number, size: number) {
		rowHeights.current = { ...rowHeights.current, [index]: size };
		if (listRef.current) {
			listRef.current.resetAfterIndex(index, true);
		}
    // listRef.current!.resetAfterIndex(index);
    // rowHeights.current = { ...rowHeights.current, [index]: size };
  }

  function scrollToBottom() {
    listRef.current!.scrollToItem(message.length - 1, "end");
  }
	useEffect(() => {
    if (message.length > 0) {
      scrollToBottom();
    }
    // eslint-disable-next-line
  }, [message]);


	return (
		<div className='flex flex-col items-center justify-between w-full h-full'>
			<div className='flex-1 w-full custom-sidder'>
				<AutoSizer style={{width: '100%', height: '100%'}} >
					{
						({height, width}) => (
							<VariableSizeList
								itemCount={message.length}
								itemSize={getRowHeight}
								height={height as number }
								width={'100%'}
								ref={listRef}
							>
								{Row}
							</VariableSizeList>
						)
					}
				</AutoSizer>
				<div></div>

			</div>
			

			<InputBox onSubmit={handleSubmit} />
		</div>
	)
}

export default Chat
