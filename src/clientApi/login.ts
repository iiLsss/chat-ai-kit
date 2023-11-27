import { LoginBody } from '@/types/login'
 

export const fetchLogin = (body: LoginBody) => {
  return fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}


export const fetchUserInfo = async (rest: RequestInit) => {
  const res = await fetch('http://localhost:4010/api/user/info', {
    credentials: 'include',
    method: 'GET',
    ...rest
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}