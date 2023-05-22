
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import Image from 'next/image'
import sendIcon from '@/assets/icon/send.svg'

type Props = {
  onSubmit: (val:string) => void
}

const InputBox: React.FC<Props> = ({onSubmit}) => {

  const [value, setValue] = useState('')

  const handleSubmit = async () => {
    console.log(value)
    onSubmit(value)
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
    <div className='flex items-center justify-between w-7/12 p-1 border rounded-md focus-within:shadow-sky-200 focus-within:shadow-sm focus-within:border-sky-200'>
      <textarea
        value={value}
        onChange={handleChange}
        className='flex-1 p-1 resize-none outline-0 text-neutral-600'
        onKeyDown={handleKeyDown}
      />
      <div onClick={handleSubmit} className='flex items-center justify-center w-8 h-8 mr-2 cursor-pointer'>
        <Image className='w-6 h-6' src={sendIcon} alt='send' />
      </div>
    </div>
  )
}

export default InputBox