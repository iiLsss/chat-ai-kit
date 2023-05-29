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