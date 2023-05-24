
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import Image from 'next/image'
import sendIcon from '@/assets/icon/send.svg'

type Props = {
  onSubmit: (val:string) => void
}

const InputBox: React.FC<Props> = ({onSubmit}) => {

  const [value, setValue] = useState('')

  const handleSubmit = async () => {
    onSubmit(value)
    setValue('')
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault() // 阻止默认行为
      handleSubmit() // 提交数据
    }
  }


  return (
    <div className='flex items-center justify-between w-8/12 p-1 mb-4 text-sm bg-white border rounded-xl focus-within:border-slate-300'>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder='请输入prompt, 按enter发送'
        className='flex-1 p-1 bg-transparent resize-none outline-0 text-neutral-600'
        onKeyDown={handleKeyDown}
      />
      <div onClick={handleSubmit} className='flex items-center justify-center w-8 h-8 mr-2 cursor-pointer'>
        <Image className='w-6 h-6 text-slate-200' src={sendIcon} alt='send' />
      </div>
    </div>
  )
}

export default InputBox