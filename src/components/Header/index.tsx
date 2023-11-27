'use client'
import userStore from '@/store/user'
import BackIcon from '@/assets/icon/back.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

type Props = {
	children?: React.ReactNode
}

const Header = ({ children }: Props) => {
	const { username } = userStore()
	const pathname = usePathname()

	const router = useRouter()
	console.log('===pathname', router)

	return (
		<div className='flex items-center justify-between w-full px-4 py-4 bg-white border-b h-14 border-slate-900/10 lg:px-8 dark:border-slate-300/10 lg:mx-0'>
			{children}
			<div className='hidden w-56 text-center md:block'>AI-Kit</div>
			<div className='md:hidden'>AI-Kit</div>
			<div className='flex items-center content-center w-8 h-8 overflow-hidden text-sm text-gray-600 rounded-full'>
				{username ? (
					username.charAt(0).toUpperCase()
				) : (
					<img src='./img/placeholder.jpg' className='w-8 h-8' alt='avatar'></img>
				)}
			</div>
		</div>
	)
}

export default Header
