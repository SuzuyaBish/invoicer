"use server"

import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Invoice } from "./types"

const cookieStore = cookies()
const supabase = createServerComponentClient({ cookies: () => cookieStore })

export async function createInvoice(
  title: string,
  clientId: string
): Promise<"error" | string> {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .insert([
        {
          client: clientId,
          status: "draft",
          information: {
            title: title,
            invoicedDate: "",
            dueDate: "",
            currency: "",
            from: {
              name: "",
              address: "",
              city: "",
              state: "",
              zipCode: "",
            },
            to: {
              name: "",
              address: "",
              city: "",
              state: "",
              zipCode: "",
            },
          },
          table: {
            subTotal: "",
            tax: "",
            total: "",
            items: [],
          },
        },
      ])
      .select("*")

    if (error) {
      console.log(error.message)
      return "error"
    }
    if (data) {
      return data[0].id
    }
  } catch (error) {
    return "error"
  }
  return "success"
}

export const saveInvoice = async (invoice: Invoice): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .update(invoice)
      .eq("id", invoice.id)
      .single()

    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .update({ lastInvoice: invoice.id })
      .eq("id", invoice.client)
      .single()

    if (error) {
      console.log(error.message)
      return false
    }
    if (data) {
      return true
    }
  } catch (error) {
    return false
  }
  return false
}
