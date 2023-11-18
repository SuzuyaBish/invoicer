import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"

import { Friend, User } from "../types"
import { getCurrentUser } from "./functions"

const supabase = createClientComponentClient()

export const findUserByEmail = async (email: string): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, first_name, last_name, imageUrl, email_address, friends")
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

export const sendFriendRequest = async (friend: Friend): Promise<boolean> => {
  try {
    const currentUser = await getCurrentUser()
    const friendInFriends = currentUser.friends.find((f) => f.id === friend.id)

    if (friendInFriends) {
      toast.error("You are already friends with this person.")
      return false
    }

    const newFriends = [...currentUser.friends, friend]

    const { data, error } = await supabase
      .from("users")
      .update({ friends: newFriends })
      .eq("id", currentUser?.id)
      .single()

    // const get friends list of friends
    const { data: friendsFriends, error: friendsFriendsError } = await supabase
      .from("users")
      .select("friends")
      .eq("id", friend.id)
      .single()

    // update the friends list of friends
    const { data: friendsFriendsData, error: friendsFriendsDataError } =
      await supabase
        .from("users")
        .update({
          friends: [
            ...friendsFriends?.friends,
            {
              id: currentUser?.id,
              first_name: currentUser?.first_name,
              last_name: currentUser?.last_name,
              email_address: currentUser?.email_address,
              imageUrl: currentUser?.imageUrl,
              status: "pending",
              type: "received",
              seen: false,
            },
          ],
        })
        .eq("id", friend.id)
        .single()
  } catch (error) {
    throw error
  }
  return false
}

export const acceptFriendRequest = async (
  friendToAdd: Friend,
  friendsFriends: Friend[]
): Promise<boolean> => {
  try {
    const currentUser = await getCurrentUser()

    const newFriends = currentUser.friends.map((f) => {
      if (f.id === friendToAdd.id) {
        return { ...f, status: "accepted", seen: true }
      }
      return f
    })

    const { data, error } = await supabase
      .from("users")
      .update({ friends: newFriends })
      .eq("id", currentUser.id)
      .single()

    const { data: friendsFriendsData, error: friendsFriendsDataError } =
      await supabase
        .from("users")
        .update({
          friends: friendsFriends.map((f) => {
            if (f.id === currentUser.id) {
              return { ...f, status: "accepted" }
            }
            return f
          }),
        })
        .eq("id", friendToAdd.id)
        .single()

    if (error || friendsFriendsDataError) {
      console.log(error?.message || friendsFriendsDataError?.message)
      return false
    } else {
      toast.success("Friend request accepted.")
    }
  } catch (error) {
    return false
  }
  return false
}

export const declineFriendRequest = async (
  friendToAdd: Friend,
  friendsFriends: Friend[]
): Promise<boolean> => {
  try {
    const currentUser = await getCurrentUser()

    const newFriends = currentUser.friends.filter(
      (f) => f.id !== friendToAdd.id
    )

    const { data, error } = await supabase
      .from("users")
      .update({ friends: newFriends })
      .eq("id", currentUser.id)
      .single()

    const { data: friendsFriendsData, error: friendsFriendsDataError } =
      await supabase
        .from("users")
        .update({
          friends: friendsFriends.filter((f) => f.id !== currentUser.id),
        })
        .eq("id", friendToAdd.id)
        .single()

    if (error || friendsFriendsDataError) {
      console.log(error?.message || friendsFriendsDataError?.message)
      return false
    } else {
      toast.success("Friend request declined.")
    }
  } catch (error) {
    return false
  }
  return false
}

export const clearNotifications = async (): Promise<boolean> => {
  try {
    const currentUser = await getCurrentUser()

    const newFriends = currentUser.friends.map((f) => {
      return { ...f, seen: true }
    })

    const { data, error } = await supabase
      .from("users")
      .update({ friends: newFriends })
      .eq("id", currentUser.id)
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

export const countTotalPendingFriendRequests = (currentUser: User): number => {
  const total = currentUser.friends.filter(
    (f) => f.status === "pending" && f.type === "received"
  ).length

  return total
}

export const countTotalSentFriendRequests = (currentUser: User): number => {
  const total = currentUser.friends.filter(
    (f) => f.status === "pending" && f.type === "sent"
  ).length

  return total
}

export const countTotalFriends = (currentUser: User): number => {
  const total = currentUser.friends.filter(
    (f) => f.status === "accepted"
  ).length

  return total
}
