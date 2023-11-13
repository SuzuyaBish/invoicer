"use server"

import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Invoice } from "./types"
import { toast } from "sonner"

const cookieStore = cookies()
const supabase = createServerComponentClient({ cookies: () => cookieStore })

export async function createInvoice(
  title: string,
  clientId: string
): Promise<"error" | string> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data: invoiceData, error: invoiceError } = await supabase
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
          activity: [
            {
              name: "Current User",
              action: "created the invoice",
              timestamp: new Date().toISOString(),
            },
          ],
          user_id: user?.id,
          auth_users: [],
        },
      ])
      .select("*")

    if (invoiceError) {
      return "error"
    }
    if (invoiceData) {
      const { data: clientData, error: clientError } = await supabase
        .from("clients")
        .select("*")
        .eq("id", clientId)
        .single()

      const { data: updateClientData, error: updateClientError } =
        await supabase
          .from("clients")
          .update({
            lastInvoice: invoiceData[0].id,
            invoices: [
              ...clientData.invoices,
              {
                id: invoiceData[0].id,
                title: title,
              },
            ],
          })
          .eq("id", clientId)
          .single()

      return invoiceData[0].id
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
      .update({
        client: invoice.client.id,
        status: invoice.status,
        information: invoice.information,
        table: invoice.table,
        last_updated: new Date().toISOString(),
        activity: invoice.activity,
      })
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

export const deleteInvoice = async (id: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .delete()
      .eq("id", id)
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

export const clearActivity = async (id: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .update({ activity: [] })
      .eq("id", id)
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

export const createClient = async (): Promise<boolean> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from("clients")
      .insert([
        {
          first_name: "",
          imageUrl: "",
          about: "",
          last_name: "",
          email_address: "",
          street_address: "",
          city: "",
          state: "",
          zip: "",
          invoices: [],
          user_id: user?.id,
          auth_users: [],
        },
      ])
      .select("*")

    if (error) {
      console.log(error.message)
      return false
    }
    if (data) {
      return data[0].id
    }
  } catch (error) {
    return false
  }
  return false
}
