import { NextResponse, NextRequest } from 'next/server'
import { REQUEST_COED } from '@/types/common'
const { CODE } = process.env
export async function POST(request: NextRequest) {
  const {password} = await request.json();
  console.log(password, CODE)
  if (password === CODE) {
    return new NextResponse(JSON.stringify({code: REQUEST_COED.SUCCESS,  msg: '登录成功'}))
  }
  return new NextResponse(JSON.stringify({code: REQUEST_COED.FAIL,  msg: '密码错误'}))
}

export const runtime = "edge";

