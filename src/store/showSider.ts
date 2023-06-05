import { create, StateCreator } from 'zustand'


export interface SiderStates {
  show: boolean
  setShow: () => void
}

const showSider: StateCreator<SiderStates> = (set, get) => ({
  show: false,
  setShow: () => set({ show:  !get().show })
})

const useShowSider = create<SiderStates>(showSider)

export default useShowSider