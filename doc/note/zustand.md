
1. 安装依赖`npm i zustand`
2. 创建store
   
```tsx
  import { create } from 'zustand'
  type States = {
    count: number
    addCount: () => void
  }
  const store = create<States>((set) => ({
    count: 0,
    addCount: set((state) => ({count: state.count + 1})),
  }))
```

使用immer
```js
import produce from 'immer'

const useLushStore = create((set) => ({
  lush: { forest: { contains: { a: 'bear' } } },
  clearForest: () =>
    set(
      produce((state) => {
        state.lush.forest.contains = null
      })
    ),
}))

const clearForest = useLushStore((state) => state.clearForest)
clearForest()
```


使用persist

```js
export interface chatGPTStates {
	currentSessionId: string
	sessionList: Map<string, Session>
}

const chatGPTStateCreator: StateCreator<chatGPTStates> = (set, get) => ({
	sessionList: new Map(),
	currentSessionId: '',

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
})
const useChatGPTStore = create(persistState)

```

> Error: Hydration failed because the initial UI does not match what was rendered on the server.


解决方式
https://docs.pmnd.rs/zustand/integrations/persisting-store-data#skiphydration
https://dev.to/abdulsamad/how-to-use-zustands-persist-middleware-in-nextjs-4lb5
