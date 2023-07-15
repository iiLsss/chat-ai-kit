'use client'

import { fetchLogin } from '@/clientApi/login'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import Toast from '@/components/Toast'
import { REQUEST_COED } from '@/types/common'
import userStore from '@/store/user'
import './index.css'

// 校验username、password是否填写
function checkForm(username: string, password: string) {
	if (!username || !password) {
		Toast({ message: '请填写用户名和密码', type: 'warning' })
		return false
	}
	return true
}

const Login = () => {
	const router = useRouter()

	const { setUsername } = userStore()

	const handleLogin = async (name: string, password: string) => {
	
		if (!checkForm(name, password)) {
			return
		}
		setUsername(name)
		try {
			let res = await (await fetchLogin({name:name, password: password })).json()
			console.log(res)
			if (res.code === REQUEST_COED.SUCCESS) {
				Toast({ message: '登录成功', type: 'success' })
				router.push('/')
			} else {
				Toast({ message: '密码错误，请联系网站管理者', type: 'error' })
			}
		} catch (error) {
			Toast({ message: '服务异常！请联系网站管理', type: 'error' })
			console.log(error)
		}
	}

	return (
		<div className='relative flex flex-col flex-1 h-full px-4 py-8 overflow-hidden bg-white sm:px-6 lg:px-8'>
			<img
				src='./img/beams-cover@95.jpeg'
				alt='background'
				className='absolute left-1/2 top-0 -ml-[47.5rem] w-[122.5rem] max-w-none'
			/>
			<div className='absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]'>
				<svg className='absolute inset-0 w-full h-full' xmlns='http://www.w3.org/2000/svg'>
					<defs>
						<pattern
							id='grid-bg'
							width='32'
							height='32'
							patternUnits='userSpaceOnUse'
							x='100%'
							patternTransform='translate(0 -1)'>
							<path d='M0 32V.5H32' fill='none' stroke='currentColor'></path>
						</pattern>
					</defs>
					<rect width='100%' height='100%' fill='url(#grid-bg)'></rect>
				</svg>
			</div>
			<div className='relative flex flex-col items-center justify-center flex-1 pt-12 pb-16'>
				<div className='w-auto h-6 mx-auto mb-10 text-slate-900'>登录</div>
				<LoginForm onSubmit={handleLogin} />
			</div>
		</div>
	)
}

export default Login
