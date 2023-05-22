import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

import {produce, enableMapSet} from "immer"
import { sendMessage } from '@/clientApi/openai'
import { uuid } from '../utils'
enableMapSet()
interface Message {
  id: string
  object?: string
  created?: number
  role: string
  content: string
  finish_reason?:string
}

interface Session {
  id: string
  title: string
  // createTime: string
  messages: Message[]
}


const defaultMsg = {
  // content: '`zustand` 是一个非常棒的状态管理库。在 `zustand` 中，可以使用 `thunk` 和 `async` 选项来处理异步操作。\n\n我们可以使用 `thunk` 选项来编写一个异步操作，例如：\n\n```typescript\nimport create from \"zustand\";\n\ntype User = {\n  id: number;\n  name: string;\n};\n\ntype State = {\n  users: User[];\n  loading: boolean;\n  getUsers: () => Promise<void>;\n};\n\nconst useStore = create<State>((set, get) => ({\n  users: [],\n  loading: false,\n  getUsers: async () => {\n    set({ loading: true });\n    const response = await fetch(\"https://api.example.com/users\");\n    const data = await response.json();\n    set({ users: data, loading: false });\n  },\n}));\n\nexport default useStore;\n```\n\n在这个例子中，我们使用 `async` 关键字来声明异步函数 `getUsers`。在函数中执行异步操作，通过 `set` 方法更新 `loading` 和 `users` 状态。\n\n在调用 `getUsers()` 时，`loading` 状态将设置为 true，然后执行异步操作，获取数据并存储到 `users` 状态中，最后将`loading` 状态设置为 false。\n\n在外部组件中使用 `useStore` 钩子，可以通过 `getUsers` 方法来触发异步请求。例如：\n\n```typescript\nimport useStore from \"./useStore\";\n\nconst UserList = () => {\n  const { users, loading, getUsers } = useStore();\n\n  useEffect(() => {\n    getUsers();\n  }, []);\n\n  if (loading) {\n    return <div>Loading...</div>;\n  }\n\n  return (\n    <ul>\n      {users.map((user) => (\n        <li key={user.id}>{user.name}</li>\n      ))}\n    </ul>\n  );\n};\n\nexport default UserList;\n```\n\n在这个例子中，我们使用 `useEffect` 钩子来在组件挂载时触发异步请求并更新 `users` 和 `loading` 状态。如果 `loading` 状态为 true，则显示 \"Loading...\"。最后，我们在组件中渲染 `users` 状态，通过 `map` 方法将每个用户渲染到页面上。',
  content: "`react-markdown` 是一个非常流行的用于渲染 Markdown 的 React 组件库，它支持使用各种插件来扩展其功能。\n\n以下是一些常用的 `react-markdown` 插件：\n\n1. `remark-gfm`\n\n支持 GitHub Flavored Markdown （GFM）扩展，包括表格、任务列表、删除线等。使用方法：\n\n```jsx\nimport gfm from 'remark-gfm';\nimport ReactMarkdown from 'react-markdown';\n\n//...\n\n<ReactMarkdown plugins={[gfm]}>{markdown}</ReactMarkdown>\n```\n\n2. `remark-emoji`\n\n转换文本表情符号为图标。使用方法：\n\n```jsx\nimport emoji from 'remark-emoji';\nimport ReactMarkdown from 'react-markdown';\n\n//...\n\n<ReactMarkdown plugins={[emoji]}>{markdown}</ReactMarkdown>\n```\n\n3. `remark-toc`\n\n在文档中创建一个目录，用于快速导航到文章的各个部分。使用方法：\n\n```jsx\nimport toc from 'remark-toc';\nimport ReactMarkdown from 'react-markdown';\n\n//...\n\n<ReactMarkdown plugins={[toc]}>{markdown}</ReactMarkdown>\n```\n\n4. `remark-slug`\n\n为标题自动生成 slug ，用于在目录中创建链接。使用方法：\n\n```jsx\nimport slug from 'remark-slug';\nimport ReactMarkdown from 'react-markdown';\n\n//...\n\n<ReactMarkdown plugins={[slug]}>{markdown}</ReactMarkdown>\n```\n\n5. `rehype-raw`\n\n允许在 Markdown 中包含原始的 HTML 标记。使用方法：\n\n```jsx\nimport raw from 'rehype-raw';\nimport ReactMarkdown from 'react-markdown';\n\n//...\n\n<ReactMarkdown rehypePlugins={[raw]}>{markdown}</ReactMarkdown>\n```\n\n还有很多其他的插件可供选择，可以根据自己的需求来选择使用。",
  role: "assistant"
}

// {
//   "id": "chatcmpl-123",
//   "object": "chat.completion",
//   "created": 1677652288,
//   "choices": [{
//     "index": 0,
//     "message": {
//       "role": "assistant",
//       "content": "\n\nHello there, how may I assist you today?",
//     },
//     "finish_reason": "stop"
//   }],
//   "usage": {
//     "prompt_tokens": 9,
//     "completion_tokens": 12,
//     "total_tokens": 21
//   }
// }



interface chatGPTStates {
  // 当前激活的session
  currentSessionId: string | null
  // session列表
  sessionList: Map<string, Session>
  // 增加session
  addSession: () => void
  // 删除session
  deleteSession: (sessionId: string) => void
  // 获取session的回答
  getSessionAnswer: (value: string) => void
}


const chatGPTStateCreator: StateCreator<chatGPTStates> = ((set, get) => ({

  sessionList: new Map(),
  currentSessionId: null,
  // 增加session
  addSession: () => {
    const key = uuid()
    set(produce((state:chatGPTStates) => {
      state.sessionList.set(key, {
        id: key,
        title: 'test',
        messages: []
      })
      state.currentSessionId = key
    }))
  },
  // 删除session
  deleteSession: (sessionId: string) => {
    set(produce((state) => {
      state.sessionList.delete(sessionId)
    }))
  },
  getSessionAnswer: async (value: string) => {
    const  { currentSessionId, sessionList} = get()
   
    set(produce((state) => {
      const currentSession = state.sessionList.get(currentSessionId!)
      currentSession?.messages.push(
        {
          id: uuid(),
          role: "user",
          content: value,
        }
      )
    }))

    try {
      let replyId = ''
      await sendMessage({
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": value}],
        stream: true
      }, {
        onMessage(val){
          
          if (replyId) {
            set(produce((state) => {
              const currentSession = state.sessionList.get(currentSessionId!)
              let currentMessage = currentSession?.messages.find((item: Message) => item.id === replyId)
              console.log(currentMessage)
              currentMessage.content = val
            }))
          } else {
            replyId = uuid()
            set(produce((state) => {
              const currentSession = state.sessionList.get(currentSessionId!)
              currentSession?.messages.push(
                {
                  id: replyId,
                  role: "assistant",
                  content: val,
                }
              )
            }))
          }
         
        }
      })
      
    } catch (error) {
        console.log(error)
    }

    // const session = chatGPTStore.getState().sessionList.get(chatGPTStore.getState().currentSessionId)
    // return session?.messages[session.messages.length - 1]
  }
}))

const persistState = persist(chatGPTStateCreator, { name: 'chat-gpt', storage: {
  getItem: (name) => {
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
},});
const useChatGPTStore = create(persistState);

export default useChatGPTStore
