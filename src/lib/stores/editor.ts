import { create } from "zustand"

import { Invoice, InvoiceItem } from "../types"

interface EditorState {
  invoice: Invoice
  currency: string
  rate: number
  taxRate: number
  setTaxRate: (rate: number) => void
  setRate: (rate: number) => void
  setCurrency: (currency: string) => void
  setInvoiceTotal: () => void
  setInvoiceSubTotal: () => void
  setInvoiceTax: () => void
  insertInvoiceItem: (item: InvoiceItem) => void
  updateInvoiceItem: (item: InvoiceItem) => void
  deleteInvoiceItem: (id: number) => void
}

export const useEditorStateStore = create<EditorState>((set, get) => ({
  invoice: {
    subTotal: "$0.00",
    tax: "$0.00",
    total: "$0.00",
    items: [
      {
        description: "New logo and digital asset playbook.",
        hours: "20.0",
        id: 1,
        price: "$2,000.00",
        rate: "$100.00",
        title: "Logo redesign",
      },
    ],
  },
  currency: "$",
  rate: 150,
  taxRate: 0.2,
  setTaxRate: (rate) => set({ taxRate: rate }),
  setRate: (rate) => set({ rate }),
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
  insertInvoiceItem: (item) =>
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
}))
