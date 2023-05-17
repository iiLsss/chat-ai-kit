'use client'

import InputBox from '../InputBox'

const Chat = () =>{
  return (
    <div className='flex flex-col items-center justify-between w-full h-full'>
      <div className='flex-1 w-9/12 overflow-auto'>
        {/* {
          Array.from({length: 100}, (_, index) => index + 1).map(item => (
            <div key={item}>
              {item}
            </div>
          ))
        } */}
      </div>
      <InputBox  />
    </div>
  )
}

export default Chat