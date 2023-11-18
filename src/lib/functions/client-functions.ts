import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Client } from "../types"
import { toast } from "sonner"

const supabase = createClientComponentClient()

export const fetchClientById = async (id: string): Promise<any | null> => {
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

export const deleteClient = async (id: string): Promise<boolean> => {
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

export const checkIfUserHasClients = async (): Promise<boolean> => {
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
