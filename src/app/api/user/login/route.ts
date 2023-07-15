import { NextResponse, NextRequest } from 'next/server'
import { REQUEST_COED } from '@/types/common'
import bcrypt from 'bcrypt'
const { CODE } = process.env

export async function POST(request: NextRequest) {
  const {name,password} = await request.json();
  if (password === CODE) {
    const response = new NextResponse(JSON.stringify({code: REQUEST_COED.SUCCESS,  msg: '登录成功'}))
    const auth = await bcrypt.hash(password, 10)
    response.cookies.set('sdiqiu_auth', auth, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    response.cookies.set('sdiqiu_username', encodeURIComponent(name), {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    return response
  }
  return new NextResponse(JSON.stringify({code: REQUEST_COED.FAIL,  msg: '密码错误'}))
}


