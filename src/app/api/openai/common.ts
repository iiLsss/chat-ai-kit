import { NextRequest } from "next/server"

const BASE_API = 'https://api.openai.com/v1'
const OPEN_AI_KEY = process.env.OPEN_AI_KEY

export async function requestOpenAI(request: NextRequest, path: string) {
  const body = await request.json();
  console.log(body)
  console.log(OPEN_AI_KEY)
  return fetch(`${BASE_API}/${path}`, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPEN_AI_KEY}`
    },
    body: JSON.stringify(body)
  })
} 
