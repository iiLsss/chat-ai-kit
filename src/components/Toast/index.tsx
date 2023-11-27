

import React from 'react';
import {createRoot}  from 'react-dom/client' 
import Close from '@/assets/icon/close.svg'
import Success from '@/assets/icon/success.svg'
import Warning from '@/assets/icon/warning.svg'
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
}
import './index.css'

const Comp: React.FC<ToastProps> = ({type, message}) => {
  return (
    <div className={`toast`}>
      <div className='flex items-center p-2 px-3 text-sm bg-white rounded toast-content' role="alert">
        <span className="mr-2">
          {
            type === 'success' && <Success className={`w-4 h-4 fill-current text-green-500`} />
          }
          {
            type === 'error' && <Close className={`w-4 h-4 fill-current text-red-500`} />
          }
          {
            type === 'warning' && <Warning className={`w-4 h-4 fill-current text-yellow-500`} />
          }
        </span>
        <p>{message}</p>
      </div>
    </div>
  )
 
}

const Toast = ({ message, type }: ToastProps) => {
  let toastWall = document.createElement('div')
  document.body.appendChild(toastWall)
  let root = createRoot(toastWall)
  root.render(<Comp message={message} type={type} />)
  setTimeout(() => {
    root.unmount()
    document.body.removeChild(toastWall)
  } , 3000)
}

export default Toast;