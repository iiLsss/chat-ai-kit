import { create, StateCreator } from 'zustand'


export interface userStates {
  username: string
  setUsername: (username: string) => void
}

const userStateCreator: StateCreator<userStates> = (set, get) => ({
  username: '',
  setUsername: (username: string) => set({ username })
})

const useUserStore = create<userStates>(userStateCreator)

export default useUserStore