

import React from 'react';
import {createRoot}  from 'react-dom/client' 
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
}
import './index.css'

const Comp: React.FC<ToastProps> = ({type, message}) => {
  return (
    <div className={`toast`}>
      <div className='flex items-center p-2 px-3 text-sm rounded toast-content' role="alert">
        <span className="mr-2">
          <svg className={`w-4 h-4 fill-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            {type === 'success' && <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />}
            {type === 'error' && <path d="M0 0h20v20H0z" fill="none" />}
            {type === 'warning' && <path d="M10 0l10 20H0z" fill="none" />}
          </svg>
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
  // setTimeout(() => {
  //   root.unmount()
  //   document.body.removeChild(toastWall)
  // } , 3000)
}

export default Toast;