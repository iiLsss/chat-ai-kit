import { NextResponse, NextRequest } from 'next/server'
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser"
import {requestOpenAI} from '../common'


// https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions
export async function handleStream(res: Response) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  let counter = 0
  
  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data
          if (data === "[DONE]") {
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].text
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return
            }
            const queue = encoder.encode(text)
            controller.enqueue(queue)
            counter++
          } catch (e) {
            controller.error(e)
          }
        }
      }

     // stream response (SSE) from OpenAI may be fragmented into multiple chunks
     // this ensures we properly read chunks & invoke an event for each SSE event stream
     const parser = createParser(onParse)

      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    }
  })

  return stream
}

/**
 * https://platform.openai.com/docs/api-reference/completions
 * @param request  NextRequest
 * @returns 
 */

export async function POST(request: NextRequest) {
  try {
    const res = await requestOpenAI(request, 'completions')
    // TODO: 判断是否stream
    const stream = await handleStream(res)
    return new Response(stream)
  } catch (error) {
    // TODO: 错误日志规范
    console.error('')
    return new Response()
  }
}
