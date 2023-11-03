import { create } from "zustand"

import { InvoiceTable, InvoiceTableItem } from "../types"

interface EditorTableState {
  invoice: InvoiceTable
  currency: string
  taxRate: number
  setTaxRate: (rate: number) => void
  setCurrency: (currency: string) => void
  setInvoiceTotal: () => void
  setInvoiceSubTotal: () => void
  setInvoiceTax: () => void
  insertInvoiceItem: (item: InvoiceTableItem) => void
  updateInvoiceItem: (item: InvoiceTableItem) => void
  deleteInvoiceItem: (id: string) => void
}

export const useEditorTableStateStore = create<EditorTableState>(
  (set, get) => ({
    invoice: {
      subTotal: "0.00",
      tax: "0.00",
      total: "0.00",
      items: [],
    },
    currency: "$",
    taxRate: 0.2,
    setTaxRate: (rate) => set({ taxRate: rate }),
    setCurrency: (currency) => set({ currency }),
    setInvoiceTotal: () =>
      set((state) => ({
        invoice: {
          ...state.invoice,
          total: get().invoice.subTotal + get().invoice.tax,
        },
      })),
    setInvoiceSubTotal: () =>
      set((state) => ({
        invoice: {
          ...state.invoice,
          subTotal: state.invoice.items
            .reduce((acc, item) => acc + parseFloat(item.price), 0)
            .toString(),
        },
      })),
    setInvoiceTax: () =>
      set((state) => ({
        invoice: {
          ...state.invoice,
          tax: (parseInt(state.invoice.subTotal) * get().taxRate).toString(),
        },
      })),
    insertInvoiceItem: (item: InvoiceTableItem) =>
      set((state) => ({
        invoice: {
          ...state.invoice,
          items: [...state.invoice.items, item],
        },
      })),
    updateInvoiceItem: (item) =>
      set((state) => ({
        invoice: {
          ...state.invoice,
          items: state.invoice.items.map((i) => (i.id === item.id ? item : i)),
        },
      })),
    deleteInvoiceItem: (id) =>
      set((state) => ({
        invoice: {
          ...state.invoice,
          items: state.invoice.items.filter((i) => i.id !== id),
        },
      })),
  })
)
