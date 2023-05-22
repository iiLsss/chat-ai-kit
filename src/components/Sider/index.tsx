'use client'

import useChatStore from '@/store/chatGPT'
import './index.css'

const Slider = () => {

  const { addSession, deleteSession, sessionList } = useChatStore()
  
  const handleAddSession = () => {
    addSession()
  }

  return (
    <div className='flex flex-col justify-around flex-1 border-r shrink-0 basis-52'>
      <div className='w-full px-2 pt-2' >
        <div className='h-12 leading-[48px] rounded-md mx-auto text-center cursor-pointer hover:bg-neutral-50'  onClick={handleAddSession}>
          + New Chat
        </div>
      </div>
      <div className="flex-auto px-2 border-b">
        {
          [...sessionList].map(([id, session]) => {
            return (
              <div className='relative mb-3 cursor-pointer session-item' key={id}>
                <p>{session.title}</p>
                <p className='text-xs text-stone-500'>{session.createTime}</p>
                <div className='absolute top-0 right-0 hidden text-xs session-item-delete' onClick={() => deleteSession(id)}>删除</div>
              </div>
            )
          })
        }
      </div>
      <div className="h-12 p-3">
        设置
      </div>
    </div>
  )
}

export default Slider