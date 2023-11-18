"use client"

import { useEffect } from "react"
import { BellIcon } from "@heroicons/react/24/outline"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"

import { Friend } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function NotificationBell() {
  const supabase = createClientComponentClient()

  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    return user?.id
  }

  useEffect(() => {
    getUserId().then((userId) => {
      supabase
        .channel("room1")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "users",
            filter: "user_id=eq." + userId,
          },
          (payload) => {
            const { new: newUser } = payload
            const friend = newUser as Friend

            if (friend.friend_requests.length > 0) {
              if (
                friend.friend_requests[friend.friend_requests.length - 1]
                  .type === "sent"
              ) {
                toast.success("Friend request sent!")
              } else {
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
        >
          <div className="absolute right-[11px] top-2 h-2 w-2 rounded-full bg-rose-500" />
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
