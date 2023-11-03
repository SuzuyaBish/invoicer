"use server"

import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"

const cookieStore = cookies()
const supabase = createServerComponentClient({ cookies: () => cookieStore })

export async function createInvoice(
  title: string,
  clientId: string
): Promise<"error" | string> {
  try {
    const { data, error } = await supabase.from("invoices").insert([
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
        table: {}
      },
    ]).select("*")

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
