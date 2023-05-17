
// 消息体
export interface messages {
  role: string
  content: string
  name?: string
}
// completions接口 入参
export interface SendMessageBody {
  model: string
  messages: messages[]
  temperature?: number
  top_p?: number
  n?: number
  stream?: boolean
  stop?: string | []
  max_tokens?: number
  presence_penalty?: number
  frequency_penalty?: number
  logit_bias?: [] 
  user?: string
}
// 