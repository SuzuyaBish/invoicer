import { create } from "zustand"

import { Invoice, InvoiceTableItem } from "../types"

interface EditorTableState {
  invoice: Invoice
  setInfo: (info: Invoice) => void
  setTaxRate: (rate: number) => void
  setCurrency: (currency: string) => void
  insertInvoiceItem: (item: InvoiceTableItem) => void
  updateInvoiceItem: (item: InvoiceTableItem) => void
  deleteInvoiceItem: (id: string) => void
  updateInvoice: (invoice: Invoice) => void
}

export const useEditorTableStateStore = create<EditorTableState>(
  (set, get) => ({
    invoice: {} as Invoice,
    setInfo: (info: Invoice) => {
      set({ invoice: {} as Invoice })
      set({ invoice: info })
    },
    setTaxRate: (rate) => {
      set((state) => ({
        invoice: {
          ...state.invoice,
          taxRate: rate,
        },
      }))
    },
    setCurrency: (currency) => {
      set((state) => ({
        invoice: {
          ...state.invoice,
          currency: currency,
        },
      }))
    },
    insertInvoiceItem: (item) => {
      set((state) => ({
        invoice: {
          ...state.invoice,
          table: {
            ...state.invoice.table,
            items: [...state.invoice.table.items, item],
          },
        },
      }))
    },
    updateInvoiceItem: (item) => {
      set((state) => ({
        invoice: {
          ...state.invoice,
          table: {
            ...state.invoice.table,
            items: state.invoice.table.items.map((i) =>
              i.id === item.id ? item : i
            ),
          },
        },
      }))
    },
    deleteInvoiceItem: (id) => {
      set((state) => ({
        invoice: {
          ...state.invoice,
          table: {
            ...state.invoice.table,
            items: state.invoice.table.items.filter((i) => i.id !== id),
          },
        },
      }))
    },
    updateInvoice: (invoice) => {
      set({ invoice })
    },
  })
)
