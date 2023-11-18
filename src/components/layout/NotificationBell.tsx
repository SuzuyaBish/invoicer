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

import { getCurrentUser } from "@/lib/functions"
import { clearNotifications } from "@/lib/functions/friend-functions"
import { useStateStore } from "@/lib/stores/state"
import { Friend } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { User } from "../../lib/types"
import { Icons } from "../Icons"
import FriendRequestViewer from "./FriendRequestViewer"

export function NotificationBell() {
  const supabase = createClientComponentClient()
  const state = useStateStore()

  const [friends, setFriends] = useState<Friend[]>([])
  const [clearLoading, setClearLoading] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)

  useEffect(() => {
    getCurrentUser().then((data) => {
      if (data.friends.length > 0) {
        setFriends(
          data.friends.filter((v) => v.seen === false && v.status === "pending")
        )

        const dbFriends = data.friends.filter((v) => v.seen === false)
        if (dbFriends.length > 0) {
          state.setNewNotification(true)
        }
      }

      supabase
        .channel("room1")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "users",
            filter: "id=eq." + data.id,
          },
          (payload) => {
            const newUser = payload.new as User
            const dbFriends = newUser.friends.filter((v) => v.seen === false)

            const mostRecentFriend = dbFriends[dbFriends.length - 1]
            const showNewFriendRequest =
              mostRecentFriend?.type === "sent" &&
              mostRecentFriend?.seen === false &&
              mostRecentFriend.status === "pending"
                ? true
                : false
            const showReceivedFriendRequest =
              mostRecentFriend?.type === "received" &&
              mostRecentFriend?.seen === false &&
              mostRecentFriend.status === "pending"
                ? true
                : false

            if (dbFriends.length > 0) {
              setFriends(
                dbFriends.filter(
                  (v) => v.seen === false && v.status === "pending"
                )
              )
            }

            if (showNewFriendRequest) {
              state.setNewNotification(true)
              toast.success("Friend request sent!")
            }

            if (showReceivedFriendRequest) {
              state.setNewNotification(true)
              toast.message("Friend request received!", {
                description: "From: " + mostRecentFriend.email_address,
              })
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
              {friends?.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    setClearLoading(true)

                    await clearNotifications().then((v) => {
                      state.setNewNotification(false)
                      setFriends([])
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
            {friends?.length > 0 ? (
              <>
                {friends.map((friendRequest, index) => {
                  return (
                    <div
                      key={friendRequest.id}
                      className={cn(
                        "flex items-center justify-between",
                        index === friends.length - 1 ? "" : "border-b pb-3"
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
                        <FriendRequestViewer
                          friend={friendRequest}
                          open={viewOpen}
                          setOpen={setViewOpen}
                          supabase={supabase}
                        />
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
