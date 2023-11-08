import { create } from "zustand"

import { Client } from "../types"

interface ClientStore {
  client: Client
  setClient: (client: Client) => void
  updateClient: (client: Client) => void
}

export const useClientStore = create<ClientStore>((set, get) => ({
  client: {} as Client,
  setClient: (client) => set({ client }),
  updateClient: (client) => set({ client: { ...get().client, ...client } }),
}))
