import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

import { produce, enableMapSet } from 'immer'
import { sendMessage } from '@/clientApi/openai'
import { uuid } from '../utils'
import { chatGPTStates, MessageStatus, Role } from '@/types/openai'
enableMapSet()


const defaultSystemMessage = {
	id: uuid(),
	role: Role.SYSTEM,
	content: '你好！ 今天我能为您提供什么帮助？',
}

const defaultTitle = '新的对话'

const chatGPTStateCreator: StateCreator<chatGPTStates> = (set, get) => ({
	sessionList: new Map(),
	currentSessionId: '',
	setCurrentSessionId: (sessionId: string) => {
		set(
			produce(state => {
				state.currentSessionId = sessionId
			})
		)
	},
	// 增加session
	addSession: content => {
		const key = uuid()
		set(
			produce((state: chatGPTStates) => {
				state.sessionList.set(key, {
					id: key,
					title: content ?? defaultTitle,
					model: 'gpt-3.5-turbo',
					streaming: false,
					createTime: Date.now(),
					messages: [
						{
							...defaultSystemMessage,
							createTime: Date.now(),
							hidden: !!content,
						},
					],
				})
				state.currentSessionId = key
			})
		)
	},
	// 删除session
	deleteSession: (sessionId: string) => {
		set(
			produce(state => {
				let ids = [...state.sessionList.keys()]
				let index = ids.indexOf(sessionId) 
				let nextIndex = (index + 1) % ids.length
				state.sessionList.delete(sessionId)
				if (state.currentSessionId === sessionId) {
					state.currentSessionId = ids[nextIndex]
				}
			})
		)
	},
	// 增加消息提问
	createMessageQuestion: (value: string) => {
		set(
			produce(state => {
				const { sessionList, currentSessionId } = state
				const currentSession = sessionList.get(currentSessionId!)
				currentSession?.messages.push({
					id: uuid(),
					role: 'user',
					content: value,
					createTime: Date.now(),
				})
			})
		)
	},
	// 增加消息回答
	createMessageAnswer: info => {
		set(
			produce(state => {
				const { sessionList, currentSessionId } = state
				const currentSession = sessionList.get(currentSessionId)
				currentSession?.messages.push({
					role: 'assistant',
					...info,
				})
				currentSession.streaming = true
			})
		)
	},
	// 更新消息回答
	updateMessageAnswer: (info, messageId: string) => {
		set(
			produce((state: chatGPTStates) => {
				const { sessionList, currentSessionId } = state
				const currentMessages = sessionList.get(currentSessionId)?.messages || []
				const index = currentMessages.findIndex(item => item.id === messageId)
				if (index !== -1) {
					const updatedMessage = { ...currentMessages[index], ...info }
					currentMessages[index] = updatedMessage
				}
				if (info.status === MessageStatus.SUCCESS) {
					sessionList.get(currentSessionId)!.streaming = false
				}
			})
		)
	},
	// 获取消息回答
	getMessageAnswer: async (value: string) => {
		const { sessionList, currentSessionId ,createMessageQuestion, updateMessageAnswer, createMessageAnswer } = get()
		createMessageQuestion(value)

		let messageId = ''
		const onMessage = (val: string) => {
			if (messageId) {
				updateMessageAnswer(
					{
						content: val,
					},
					messageId
				)
			} else {
				messageId = uuid()
				createMessageAnswer({
					id: messageId,
					content: val,
					createTime: Date.now(),
					status: MessageStatus.RUNNING,
					question: value,
				})
			}
		}

		const onSuccess = () => {
			const currentSession = sessionList.get(currentSessionId)
			if (currentSession?.title === defaultTitle){
				// TODO：如果是新的对话，就更新title 
			}
			updateMessageAnswer(
				{
					status: MessageStatus.SUCCESS,
				},
				messageId
			)
		}
		const cancelFetch = (cb: () => void) => {
			cb()
		}
		const option = {
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: value }],
			stream: true,
		}
		try {
			await sendMessage(option, {
				onMessage,
				onSuccess,
				cancelFetch,
			})
		} catch (error) {
			console.log(error)
		}
	},
})

const persistState = persist(chatGPTStateCreator, {
	name: 'chat-gpt',
	storage: {
		getItem: name => {
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
		removeItem: name => localStorage.removeItem(name),
	},
	skipHydration: true,
})
const useChatGPTStore = create(persistState)

export default useChatGPTStore
