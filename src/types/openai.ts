
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
  // 用户
  USER ='user',
  // 机器人
  ASSISTANT = 'assistant',
  // 系统
  SYSTEM = 'system'
}

export interface MessageItem {
	id: string
  // 对象
	object?: string
  // 创建时间
	created?: number
  // 角色
	role: Role
  // 消息内容
	content: string
  // 完成原因
	finish_reason?: string
  // 消息状态
  status?: MessageStatus
  // 问题
  question?: string
  // 是否隐藏
  hidden?: boolean
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