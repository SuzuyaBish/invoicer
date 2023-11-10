import { SupabaseClient } from "@supabase/auth-helpers-nextjs"

import { Client, Invoice, InvoiceTableItem } from "./types"

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

export const fetchInvoiceById = async (
  id: string,
  supabase: SupabaseClient
): Promise<Invoice | null> => {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .select("*, client(imageUrl)")
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

export const fetchClientById = async (
  id: string,
  supabase: SupabaseClient
): Promise<any | null> => {
  try {
    const { data, error } = await supabase
      .from("clients")
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

export const saveClient = async (
  supabase: SupabaseClient,
  client: Client,
  image?: any
): Promise<boolean> => {
  try {
    if (image) {
      console.log("Image logic called")

      const yearInSecs = 31556952

      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { data: imageData, error: imageError } = await supabase.storage
        .from("client_images")
        .upload(`${user?.id}/${client.id}`, image, {
          upsert: true,
        })

      const { data: imageUrl } = await supabase.storage
        .from("client_images")
        .createSignedUrl(`${user?.id}/${client.id}`, yearInSecs)

      const newClient: Client = {
        ...client,
        imageUrl: imageUrl!.signedUrl,
      }

      client = newClient
    }

    const { data, error } = await supabase
      .from("clients")
      .update(client)
      .eq("id", client.id)
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
