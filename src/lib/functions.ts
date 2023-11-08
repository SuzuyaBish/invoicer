import { SupabaseClient } from "@supabase/auth-helpers-nextjs"

import { Invoice, InvoiceTableItem } from "./types"

export const calculateSubTotal = (table?: InvoiceTableItem[]) => {
  let sum = 0

  if (table) {
    if (table && table.length > 0) {
      table.forEach((el) => {
        sum += Number(el.price)
      })
    }
  }

  return sum === 0 ? -1 : sum
}

export const calculateTax = (subTotal: number, tax: number) => {
  return Number.isNaN(Math.round(subTotal * tax * 100) / 100)
    ? -1
    : Math.round(subTotal * (tax / 100) * 100) / 100
}

export const calculateTotal = (subTotal: number, tax: number): string => {
  return (subTotal + tax) < 0
    ? "N/A"
    : (Math.round((subTotal + tax) * 100) / 100).toString()
}

export const fetchInvoiceById = async (
  id: string,
  supabase: SupabaseClient
): Promise<Invoice | null> => {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.log(error.message)
      return null
    }
    if (data) {
      console.log(data)
      return data
    }
  } catch (error) {
    return null
  }
  return null
}
