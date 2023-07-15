import { PropsWithChildren } from 'react'
import Link, {LinkProps} from 'next/link'
import { cookies } from 'next/headers'
 
const LoginLink: React.FC<PropsWithChildren<LinkProps>> = ({ children, ...reset}) => {
  const props = {...reset}
  const cookieStore = cookies()
  console.log(cookieStore);
  const userLogin = cookieStore.get('sdiqiu_username')
  if (!userLogin){
    props.href = `/login?redirect=${props.href}`
  }

  return <Link {...props}>{children}</Link>
}

export default LoginLink