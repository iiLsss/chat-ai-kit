import { NextResponse, NextRequest } from 'next/server'
import { REQUEST_COED } from '@/types/common'

const CODE = process.env.CODE || 'test'

export async function GET(request: NextRequest) {
  const authKey = request.headers.get('authorization')
  if (!authKey) {
    return new NextResponse(JSON.stringify({code: REQUEST_COED.FAIL,  msg: '用户未登录'}))
  }
  const isLogin = true
  if (isLogin) {
    return new NextResponse(JSON.stringify({code: REQUEST_COED.SUCCESS,  msg: '成功'}))
  }
  return new NextResponse(JSON.stringify({code: REQUEST_COED.FAIL,  msg: '用户未登录'}))
}



// src/app/api/user/info/route.ts