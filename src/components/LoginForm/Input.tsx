'use client'
import {forwardRef, InputHTMLAttributes, RefAttributes } from 'react'

interface LoginProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
// ForwardRefExoticComponent< & LoginProps> 

const Input= forwardRef<HTMLInputElement, LoginProps>((props, ref ) => {
  const {label, ...rest} = props
	return (
		<>
      <label
        htmlFor={rest.name}
        className='block text-sm font-semibold leading-6 text-gray-900'>
        {label}
      </label>
      <input
        className='form-input'
        {...rest}
        ref={ref}
      ></input>
    </>
	)
})

Input.displayName = 'Input'

export default Input
