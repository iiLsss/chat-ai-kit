import { ChangeEvent, KeyboardEvent, useState } from 'react'
import Image from 'next/image'
import SendIcon from '@/assets/icon/send.svg'

type Props = {
	streaming?: boolean
	onSubmit: (val: string) => void
}

const InputBox: React.FC<Props> = ({ streaming = false, onSubmit }) => {
	const [value, setValue] = useState('')

	const handleSubmit = async () => {
    if (streaming) return
		onSubmit(value)
		setValue('')
	}

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value)
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (streaming) return
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault() // 阻止默认行为
			handleSubmit() // 提交数据
		}
	}

	console.log('streaming', streaming)
	return (
		<div className='flex items-center justify-between w-full p-1 text-sm bg-white shadow-lg shadow-top md:border md:mb-4 md:w-8/12 md:rounded-xl focus-within:border-slate-300'>
			<textarea
				value={value}
				onChange={handleChange}
				placeholder='请输入prompt, 按enter发送'
				className='flex-1 p-1 bg-transparent border-0 resize-none outline-0 text-neutral-600'
				onKeyDown={handleKeyDown}
				disabled={streaming}
			/>

			<div
				onClick={handleSubmit}
				className='flex items-center justify-center w-8 h-8 mr-2 cursor-pointer'>
				{!streaming ? (
					<SendIcon className='w-6 h-6 text-purple-600' />
				) : (
					<div className='w-6 h-6 cssload-loader'>
						<div className='cssload-inner cssload-one'></div>
						<div className='cssload-inner cssload-two'></div>
						<div className='cssload-inner cssload-three'></div>
					</div>
				)}
			</div>
		</div>
	)
}

export default InputBox
