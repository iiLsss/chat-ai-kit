'use client'

import { fetchLogin } from '@/clientApi/login'
import Toast from '@/components/Toast'
import { REQUEST_COED } from '@/types/common'

import './index.css'
const Login = () => {

  const handleLogin =  async(e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;
    console.log(username, password)
    try {
      let res = await (await fetchLogin({password: password})).json()
      console.log(res)
      if (res.code === REQUEST_COED.SUCCESS) {
        Toast({message: '登录成功', type: 'success'})
      } else {
        Toast({message: res.msg, type: 'success'})
      }
    } catch (error) {
      console.log(error)
    }
  }

	return (
		<div className='mx-auto pt-32 w-[300px]'>
      <div className='mb-6 text-xl text-center'>登录</div>
      <form onSubmit={handleLogin}>
        <p className='grid grid-cols-1 gap-6 mb-6 text-sm text-gray-700'>
          <label className='block'>
            <span>用户昵称</span>
            <input
              type='text'
              name='username'
              className='form-input'
              maxLength={10}
              placeholder='请输入您的用户昵称'></input>
          </label>
          <label className='block'>
            <span>访问密码</span>
            <input
              type='password'
              name='password'
              className='form-input'
              placeholder='请输入您的访问密码'></input>
          </label>
        </p>
        <button type="submit" className="block px-4 py-1 mx-auto tracking-widest text-white rounded-md bg-violet-500 hover:bg-violet-600" >登 录</button>
      </form>
		</div>
	)
}

export default Login
