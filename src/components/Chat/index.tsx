'use client'

import InputBox from '../InputBox'

import useChatStore from '@/store/chatGPT'
import MarkDown from '../MarkDown'


const Chat = () =>{

  const { sessionList, currentSessionId } = useChatStore();
  const message = sessionList.get(currentSessionId)?.messages || [];
  return (
    <div className='flex flex-col items-center justify-between w-full h-full'>
      <div className='flex-1 w-9/12 overflow-auto'>
        {
          message.map((item, index) => (
            <div key={item.id} className='flex flex-col items-start justify-start w-full'>
              <MarkDown content={item.content} />
            </div>
          ))
        }
      </div>
      <InputBox  />
    </div>
  )
}

export default Chat