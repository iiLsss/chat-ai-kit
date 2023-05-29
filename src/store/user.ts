import { create, StateCreator } from 'zustand'


export interface userStates {
  username: string
}

const userStateCreator: StateCreator<userStates> = (set, get) => ({
  username: '',
})

export const useUserStore = create<userStates>(userStateCreator)