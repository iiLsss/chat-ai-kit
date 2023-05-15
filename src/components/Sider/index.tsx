
const Slider = () => {
  return (
    <div className='flex flex-col justify-around flex-1 border-r shrink-0 basis-52'>
      <div className='w-full h-12 p-3 drop-shadow-md'>
        <div className="text-center cursor-pointer">
          + New Chat
        </div>
      </div>
      <div className="flex-auto p-3 border-t border-b">
        content
      </div>
      <div className="h-12 p-3">
        设置
      </div>
    </div>
  )
}

export default Slider