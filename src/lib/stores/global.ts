'use client'

import { create } from "zustand"

import { Client, Invoice } from "../types"

interface GlobalState {
  invoices: Invoice[]
  clients: Client[]
  setAll: (invoices: Invoice[], clients: Client[]) => void
}

export const useGlobalStateStore = create<GlobalState>((set, get) => ({
  invoices: [],
  clients: [],
  setAll: (invoices, clients) => set({ invoices, clients }),
}))
