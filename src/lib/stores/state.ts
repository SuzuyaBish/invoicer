import { create } from "zustand"

interface State {
  searchBarOpen: boolean
  setSearchBarOpen: () => void
  setSearchBarClosed: () => void
}

export const useStateStore = create<State>((set, get) => ({
  searchBarOpen: false,
  setSearchBarOpen: () => set({ searchBarOpen: true }),
  setSearchBarClosed: () => set({ searchBarOpen: false }),
}))
