import { SendMessageBody } from '../types/openai'

type SendMessageOptions = {
  onMessage: (val: string) => void
  cancelFetch?: (func: () => void) => void
}
type SendMessage = (body: SendMessageBody , option: SendMessageOptions ) => void

const defaultBody = {
  stream: true
}
/**
 * 为给定的聊天对话创建一个模型响应。
 * @param body 
 * @param option 
 * @returns 
 */
export const sendMessage: SendMessage = async (body: SendMessageBody, option) => {
  const { onMessage, cancelFetch } = option
  const controller = new AbortController();
  const signal = controller.signal;

  // const 
  const response = await fetch('/api/openai/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body && JSON.stringify(body),
    signal,

  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = response.body;
  let responseText = "";
  // console.log(data)
  // const reader = res.body?.getReader();

  if (!data) {
    return;
  }
  if (body.stream) {
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value,  { stream: true });
      // try {
      //   let info = JSON.parse(chunkValue)
      // } catch (err){
        responseText +=chunkValue
        onMessage(responseText)
      // }
     
    }
  } else {
    // onMessage(data)
  }

  cancelFetch && cancelFetch(() => controller.abort())
}