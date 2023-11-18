import { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"

import { Client, Friend, Invoice, InvoiceTableItem } from "./types"

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

export const deleteClient = async (
  supabase: SupabaseClient,
  id: string
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("clients")
      .delete()
      .eq("id", id)
      .single()

    if (error) {
      toast.error("Can't delete client if an invoice is assigned to them.")
      return false
    } else {
      toast.success("Client deleted successfully.")
      return true
    }
  } catch (error) {
    return false
  }
}

export const checkIfUserHasClients = async (
  supabase: SupabaseClient
): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from("clients").select("*").single()

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

export const findUserByEmail = async (
  email: string,
  supabase: SupabaseClient
): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select(
        "id, first_name, last_name, imageUrl, email_address, friend_requests"
      )
      .eq("email_address", email)
      .single()

    if (error) {
      console.log(error.message)
      return false
    }
    if (data) {
      return data
    }
  } catch (error) {
    return false
  }
  return false
}

export const sendFriendRequest = async (
  friend: Friend,
  supabase: SupabaseClient
): Promise<boolean> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data: currentUserData, error: currentUserError } = await supabase
      .from("users")
      .select("id, friend_requests")
      .eq("user_id", user?.id)
      .single()

    const friendInFriendRequests = currentUserData?.friend_requests?.find(
      (el: any) => el.id === friend.id
    ) as Friend

    if (friendInFriendRequests) {
      return false
    } else {
      const { data, error } = await supabase
        .from("users")
        .update({
          friend_requests: [
            ...currentUserData?.friend_requests,
            {
              id: friend.id,
              email_address: friend.email_address,
              status: "pending",
              type: "sent",
            },
          ],
        })
        .eq("user_id", user?.id)
      const { data: friendData, error: friendError } = await supabase
        .from("users")
        .update({
          friend_requests: [
            ...friend.friend_requests,
            {
              id: currentUserData?.id,
              email_address: user?.email,
              status: "pending",
              type: "received",
            },
          ],
        })
        .eq("id", friend.id)
      if (error?.message) {
        console.log("Me", error?.message)
        return false
      }
      if (friendError?.message) {
        console.log("Friend", friendError?.message)
        return false
      }
    }

    if (currentUserError?.message) {
      console.log("Current User", currentUserError?.message)
      return false
    }
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
