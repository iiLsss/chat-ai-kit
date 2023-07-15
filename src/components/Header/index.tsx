'use client'
import userStore from '@/store/user'
import BackIcon from '@/assets/icon/back.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

const Header = () => {
	const { username } = userStore()
	const pathname = usePathname()

	const router = useRouter()
	console.log('===pathname',router );
	const backHome = () => {
		router.push('/')
	}

	return (
		<div className='flex items-center justify-between w-full px-4 py-4 bg-white border-b h-14 border-slate-900/10 lg:px-8 dark:border-slate-300/10 lg:mx-0'>
			{
				pathname !== '/' ? (
					<BackIcon onClick={backHome} />
				) : <div></div>
			}
			<div className='hidden w-56 text-center md:block'>AI-Kit</div>
      <div className='md:hidden'>AI-Kit</div>
			<div className='text-sm text-gray-600'>
				{
					username ? <Image
						src='./img/placeholder.jpg'
						width={32}
						height={32}
						className='rounded-full'
						alt='avatar'
					></Image> : <div className='px-3 py-1 border-[1px] rounded-md '>登录</div>
				}
			</div>
		</div>
	)
}

export default Header