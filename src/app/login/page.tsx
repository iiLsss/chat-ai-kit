'use client'

import { fetchLogin } from '@/clientApi/login'
import { useRouter } from 'next/navigation';
 
import Toast from '@/components/Toast'
import { REQUEST_COED } from '@/types/common'
import userStore from '@/store/user'
import './index.css'


// 校验username、password是否填写
function checkForm(username: string, password: string) {
  if (!username || !password) {
    Toast({message: '请填写用户名和密码', type: 'warning'})
    return false
  }
  return true
}

const Login = () => {
  const router = useRouter();

  const {setUsername} = userStore()

  const handleLogin =  async(e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;

    if (!checkForm(username, password)){
      return 
    }
    setUsername(username)
    try {
      let res = await (await fetchLogin({password: password})).json()
      console.log(res)
      if (res.code === REQUEST_COED.SUCCESS) {
        Toast({message: '登录成功', type: 'success'})
        router.push('/')
      } else {
        Toast({message: '密码错误，请联系网站管理者', type: 'error'})
      }
    } catch (error) {
      Toast({message: '服务异常！请联系网站管理', type: 'error'})
      console.log(error)
    }
  }

	return (
		<div className='mx-auto pt-[15%] md:pt-32 w-3/4 md:w-[300px] '>
      <div className='mb-6 text-xl text-center'>登录</div>
      <form onSubmit={handleLogin}>
        <p className='grid grid-cols-1 gap-6 mb-8 text-base text-gray-700 md:text-sm'>
          <label className='block'>
            <span>昵称</span>
            <input
              type='text'
              name='username'
              className='form-input '
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



