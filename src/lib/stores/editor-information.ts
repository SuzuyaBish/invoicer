import { create } from "zustand"

import { InvoiceInformation } from "../types"

interface EditorInformationState {
  information: InvoiceInformation
  setTitle: (title: string) => void
  setInvoicedDate: (date: string) => void
  setDueDate: (date: string) => void
}

export const useEditorInformationStore = create<EditorInformationState>(
  (set, get) => ({
    information: {
      dueDate: "",
      invoicedDate: "",
      title: "",
      from: {
        name: "",
        address: "",
        addressLine2: "",
        city: "",
        zipCode: "",
        state: "",
      },
      to: {
        name: "",
        address: "",
        addressLine2: "",
        city: "",
        zipCode: "",
        state: "",
      },
    },
    setTitle: (title) => set({ information: { ...get().information, title } }),
    setInvoicedDate: (invoicedDate) =>
      set({ information: { ...get().information, invoicedDate } }),
    setDueDate: (dueDate) =>
      set({ information: { ...get().information, dueDate } }),
  })
)
