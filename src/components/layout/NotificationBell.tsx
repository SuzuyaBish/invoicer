"use client"

import { useEffect, useState } from "react"
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BellIcon,
} from "@heroicons/react/24/outline"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { XIcon } from "lucide-react"
import { toast } from "sonner"

import { clearNotifications } from "@/lib/functions"
import { useStateStore } from "@/lib/stores/state"
import { Friend, FriendRequest } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Icons } from "../Icons"

export function NotificationBell() {
  const supabase = createClientComponentClient()
  const state = useStateStore()
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([])
  const [userId, setUserId] = useState<string | undefined>("")
  const [clearLoading, setClearLoading] = useState(false)

  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user?.id)

    const unseenFriendRequests = data![0].friend_requests.filter(
      (v: FriendRequest) => !v.seen
    ) as FriendRequest[]

    return {
      userId: user?.id,
      friendRequests: unseenFriendRequests,
    }
  }

  useEffect(() => {
    getUserId().then((data) => {
      setUserId(data!.userId)
      setFriendRequests(data.friendRequests)

      supabase
        .channel("room1")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "users",
            filter: "user_id=eq." + data.userId,
          },
          (payload) => {
            const { new: newUser } = payload
            const friend = newUser as Friend

            const unseenFriendRequests = friend.friend_requests.filter(
              (v) => !v.seen
            ) as FriendRequest[]

            setFriendRequests(unseenFriendRequests)

            if (friend.friend_requests.length > 0) {
              if (
                friend.friend_requests[friend.friend_requests.length - 1]
                  .type === "sent"
              ) {

                state.setNewNotification(true)
                toast.success("Friend request sent!")

              } else {
                state.setNewNotification(true)
                toast.message("Friend request received!", {
                  description:
                    "From: " +
                    friend.friend_requests[friend.friend_requests.length - 1]
                      .email_address,
                  action: {
                    label: "View",
                    onClick: () => console.log(friend.friend_requests),
                  },
                })
              }
            }
          }
        )
        .subscribe()
    })

    return () => {
      supabase.removeAllChannels()
    }
  }, [])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          type="button"
          className="text-muted-foreground hover:text-foreground relative -m-2.5 p-2.5"
          onClick={() => {
            state.setNewNotification(false)
          }}
        >
          {state.newNotification && (
            <div className="absolute right-[11px] top-2 h-2 w-2 rounded-full bg-rose-500" />
          )}
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-5">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium leading-none">Notifications</h4>
              {friendRequests.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    setClearLoading(true)

                    const seenFriendRequests = friendRequests.map((v) => {
                      return { ...v, seen: true }
                    })

                    await clearNotifications(
                      userId!,
                      seenFriendRequests,
                      supabase
                    ).then((v) => {
                      state.setNewNotification(false)
                      setFriendRequests(seenFriendRequests)
                      setClearLoading(false)
                    })
                  }}
                >
                  {clearLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <XIcon className="mr-2 h-4 w-4" />
                  )}
                  Clear
                </Button>
              )}
            </div>
            <p className="text-muted-foreground text-sm">
              Recent notifications
            </p>
          </div>
          <div className="grid gap-3">
            {friendRequests.length > 0 ? (
              <>
                {friendRequests.map((friendRequest, index) => {
                  return (
                    <div
                      key={friendRequest.id}
                      className={cn(
                        "flex items-center justify-between",
                        index === friendRequests.length - 1
                          ? ""
                          : "border-b pb-3"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        {friendRequest.type === "sent" ? (
                          <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <ArrowTrendingDownIcon className="h-4 w-4 text-emerald-500" />
                        )}
                        <div className="text-sm">
                          {friendRequest.type === "sent"
                            ? "Friend Request Sent"
                            : "Friend Request Received"}
                        </div>
                      </div>
                      {friendRequest.type === "sent" ? (
                        <div className="bg-secondary rounded px-3 py-1 text-sm">
                          <div className="text-secondary-foreground">
                            Cancel
                          </div>
                        </div>
                      ) : (
                        <div className="bg-secondary rounded px-3 py-1 text-sm">
                          <div className="text-secondary-foreground">View</div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </>
            ) : (
              <div className="text-sm">No new notifications</div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
