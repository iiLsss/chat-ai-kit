import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

import { produce, enableMapSet } from 'immer'
import { sendMessage } from '@/clientApi/openai'
import { uuid } from '../utils'
import { Role } from '@/types/openai'
enableMapSet()
interface Message {
	id: string
	object?: string
	created?: number
	role: Role
	content: string
	finish_reason?: string
}

interface Session {
	id: string
	title: string
	// createTime: string
	messages: Message[]
}


export interface chatGPTStates {
	// 当前激活的session
	currentSessionId: string
	setCurrentSessionId: (sessionId: string) => void
	// session列表
	sessionList: Map<string, Session>
	// 增加session
	addSession: () => void
	// 删除session
	deleteSession: (sessionId: string) => void
	// 获取session的回答
	getSessionAnswer: (value: string) => void
}

const chatGPTStateCreator: StateCreator<chatGPTStates> = (set, get) => ({
	sessionList: new Map(),
	currentSessionId: '',
	setCurrentSessionId: (sessionId: string) => {
		set(
			produce((state) => {
				state.currentSessionId = sessionId
			})
		)
	},
	// 增加session
	addSession: () => {
		const key = uuid()
		set(
			produce((state: chatGPTStates) => {
				state.sessionList.set(key, {
					id: key,
					title: 'New Chat',
					messages: [],
				})
				state.currentSessionId = key
			})
		)
	},
	// 删除session
	deleteSession: (sessionId: string) => {
		set(
			produce((state) => {
				state.sessionList.delete(sessionId)
			})
		)
	},
	getSessionAnswer: async (value: string) => {
		const { currentSessionId, sessionList } = get()

		set(
			produce((state) => {
				const currentSession = state.sessionList.get(currentSessionId!)
				currentSession?.messages.push({
					id: uuid(),
					role: 'user',
					content: value,
				})

			})
		)

		try {
			let replyId = ''
			await sendMessage(
				{
					model: 'gpt-3.5-turbo',
					messages: [{ role: 'user', content: value }],
					stream: true,
				},
				{
					onMessage(val) {
						if (replyId) {
							set(
								produce((state) => {
									const currentSession = state.sessionList.get(
										currentSessionId!
									)
									let currentMessage = currentSession?.messages.find(
										(item: Message) => item.id === replyId
									)
									// console.log(currentMessage)
									currentMessage.content = val
								})
							)
						} else {
							replyId = uuid()
							set(
								produce((state) => {
									const currentSession = state.sessionList.get(
										currentSessionId!
									)
									currentSession?.messages.push({
										id: replyId,
										role: 'assistant',
										content: val,
									})
								})
							)
						}
					},
				}
			)
		} catch (error) {
			console.log(error)
		}

		// const session = chatGPTStore.getState().sessionList.get(chatGPTStore.getState().currentSessionId)
		// return session?.messages[session.messages.length - 1]
	},
})

const persistState = persist(chatGPTStateCreator, {
	name: 'chat-gpt',
	storage: {
		getItem: (name) => {
			console.log('getItem')
			const str = localStorage.getItem(name) || '{}'
			return {
				state: {
					...JSON.parse(str).state,
					sessionList: new Map(JSON.parse(str).state.sessionList),
				},
			}
		},
		setItem: (name, newValue) => {
			const str = JSON.stringify({
				state: {
					...newValue.state,
					sessionList: Array.from(newValue.state.sessionList.entries()),
				},
			})
			localStorage.setItem(name, str)
		},
		removeItem: (name) => localStorage.removeItem(name),
	},
	skipHydration: true,
})
const useChatGPTStore = create(persistState)

export default useChatGPTStore
