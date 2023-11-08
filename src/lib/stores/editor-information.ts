import { create } from "zustand"

import { InvoiceInformation } from "../types"
import { SelectSingleEventHandler } from "react-day-picker"

interface EditorInformationState {
  information: InvoiceInformation
  setTitle: (title: string) => void
  setInvoicedDate: (date: string) => void
  setDueDate: (date: string) => void
  setFromName: (name: string) => void
  setFromAddress: (address: string) => void
  setFromCity: (city: string) => void
  setFromZipCode: (zipCode: string) => void
  setFromState: (state: string) => void
  setToName: (name: string) => void
  setToAddress: (address: string) => void
  setToCity: (city: string) => void
  setToZipCode: (zipCode: string) => void
  setToState: (state: string) => void
}

export const useEditorInformationStore = create<EditorInformationState>(
  (set, get) => ({
    information: {
      dueDate: "",
      invoicedDate: "",
      title: "",
      currency: "",
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
    setFromName: (name) =>
      set({
        information: {
          ...get().information,
          from: { ...get().information.from, name },
        },
      }),
    setFromAddress: (address) =>
      set({
        information: {
          ...get().information,
          from: { ...get().information.from, address },
        },
      }),
    setFromCity: (city) =>
      set({
        information: {
          ...get().information,
          from: { ...get().information.from, city },
        },
      }),
    setFromZipCode: (zipCode) =>
      set({
        information: {
          ...get().information,
          from: { ...get().information.from, zipCode },
        },
      }),
    setFromState: (state) =>
      set({
        information: {
          ...get().information,
          from: { ...get().information.from, state },
        },
      }),
    setToName: (name) =>
      set({
        information: {
          ...get().information,
          to: { ...get().information.to, name },
        },
      }),
    setToAddress: (address) =>
      set({
        information: {
          ...get().information,
          to: { ...get().information.to, address },
        },
      }),
    setToCity: (city) =>
      set({
        information: {
          ...get().information,
          to: { ...get().information.to, city },
        },
      }),
    setToZipCode: (zipCode) =>
      set({
        information: {
          ...get().information,
          to: { ...get().information.to, zipCode },
        },
      }),
    setToState: (state) =>
      set({
        information: {
          ...get().information,
          to: { ...get().information.to, state },
        },
      }),
  })
)
