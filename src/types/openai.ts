
// 消息体
export interface Messages {
  role: string
  content: string
  name?: string
}
// completions接口 入参
export interface SendMessageBody {
  model: string
  messages: Messages[]
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

// 常量角色
export enum Role  {
  USER ='user',
  ASSISTANT = 'assistant'
}

export interface MessageItem {
	id: string
	object?: string
	created?: number
	role: Role
	content: string
	finish_reason?: string
  status?: MessageStatus
  question?: string
}

export interface Session {
	id: string
	title: string
  model: string
	// createTime: string
	messages: MessageItem[]
}

// 消息状态
export enum MessageStatus {
  // 收取中
  RUNNING = 'running',
  // 成功
  SUCCESS = 'success',
  // 失败
  ERROR = 'error',
  // 暂停
  PAUSE = 'pause'
}