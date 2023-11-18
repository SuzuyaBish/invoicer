import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { InvoiceTableItem, User } from "./types"

const supabase = createClientComponentClient()

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user?.id)
    .single()

  return data as User
}

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
  return subTotal + tax < 0
    ? "N/A"
    : (Math.round((subTotal + tax) * 100) / 100).toString()
}
