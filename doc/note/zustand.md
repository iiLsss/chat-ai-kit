
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

