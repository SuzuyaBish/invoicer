"use server"

import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { User } from "@/lib/types"
import AddFriendButton from "@/components/friends/AddFriendButton"
import FriendsList from "@/components/friends/FriendsList"
import FriendsTabs from "@/components/friends/FriendsTabs"

export default async function FriendsPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user?.id)

  const userData = data![0] as User
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-foreground text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
            Your Friends
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <AddFriendButton />
        </div>
      </div>
      <FriendsTabs userData={userData} />
      <FriendsList userData={userData} />
    </>
  )
}
