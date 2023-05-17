import { NextRequest } from "next/server"

const BASE_API = 'https://api.openai.com/v1'
const OPEN_AI_KEY = process.env.OPEN_AI_KEY

export function requestOpenAI(req: NextRequest, path: string) {
  return fetch(`${BASE_API}/${path}`, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPEN_AI_KEY}`
    },
    body: req.body
  })
} 