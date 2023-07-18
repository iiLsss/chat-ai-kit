import { NextResponse, NextRequest } from 'next/server'
import { REQUEST_COED } from '@/types/common'

import { hashPassword, checkPassword } from '@/utils/bcrypt'

const CODE = process.env.CODE || 'test'

export async function GET(request: NextRequest) {
  console.log('authKey');

  const authKey = request.cookies.get('sdiqiu_auth')?.value
  if (!authKey) {
    return new NextResponse(JSON.stringify({code: REQUEST_COED.FAIL,  msg: '用户未登录'}))
  }
  const code = await hashPassword(CODE)
  const isLogin = await checkPassword(authKey, code)
  if (isLogin) {
    return new NextResponse(JSON.stringify({code: REQUEST_COED.SUCCESS,  msg: '成功'}))
  }
  return new NextResponse(JSON.stringify({code: REQUEST_COED.FAIL,  msg: '用户未登录'}))
}



// src/app/api/user/info/route.ts