import { NextResponse, NextRequest } from 'next/server'
import { REQUEST_COED } from '@/types/common'
import bcrypt from 'bcrypt'

const CODE = process.env.CODE || 'test'

export async function GET(request: NextRequest) {
  const authKey = request.cookies.get('sdiqiu_auth')?.value
  if (!authKey) {
    return new NextResponse(JSON.stringify({code: REQUEST_COED.FAIL,  msg: '用户未登录'}))
  }
  const code = await bcrypt.hash(CODE, 10)
  const isLogin = await bcrypt.compare(authKey, code)
  if (isLogin) {
    return new NextResponse(JSON.stringify({code: REQUEST_COED.SUCCESS,  msg: '成功'}))
  }
  return new NextResponse(JSON.stringify({code: REQUEST_COED.FAIL,  msg: '用户未登录'}))
}

