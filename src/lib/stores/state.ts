import { create } from "zustand"

interface State {
  searchBarOpen: boolean
  multiSelectOn: boolean
  selectedIndexes: number[]
  newNotification: boolean
  setSearchBarOpen: () => void
  setSearchBarClosed: () => void
  setMultiSelectOn: () => void
  setMultiSelectOff: () => void
  insertSelectedIndex: (index: number) => void
  setNewNotification: (v: boolean) => void
}

export const useStateStore = create<State>((set, get) => ({
  searchBarOpen: false,
  multiSelectOn: false,
  selectedIndexes: [],
  newNotification: false,
  setSearchBarOpen: () => set({ searchBarOpen: true }),
  setSearchBarClosed: () => set({ searchBarOpen: false }),
  setMultiSelectOn: () => set({ multiSelectOn: true }),
  setMultiSelectOff: () => set({ multiSelectOn: false }),
  insertSelectedIndex: (index: number) => {
    const { selectedIndexes } = get()
    if (selectedIndexes.includes(index)) {
      set({ selectedIndexes: selectedIndexes.filter((i) => i !== index) })
    } else {
      set({ selectedIndexes: [...selectedIndexes, index] })
    }
  },
  setNewNotification: (v: boolean) => set({ newNotification: v }),
}))
