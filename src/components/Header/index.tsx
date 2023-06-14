'use client'
import userStore from '@/store/user'

const Header = () => {
	const { username } = userStore()

	return (
		<div className='flex items-center justify-between w-full px-4 py-4 border-b h-14 border-slate-900/10 lg:px-8 dark:border-slate-300/10 lg:mx-0'>
			<div className='hidden w-56 text-center md:block'>AI-Kit</div>
      <div className='md:hidden'>AI-Kit</div>
			<div className='text-sm text-gray-600'>{username}</div>
		</div>
	)
}

export default Header