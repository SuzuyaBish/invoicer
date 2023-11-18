import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Invoice } from "../types"

const supabase = createClientComponentClient()

export const fetchInvoiceById = async (id: string): Promise<Invoice | null> => {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .select("*, client(*)")
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
