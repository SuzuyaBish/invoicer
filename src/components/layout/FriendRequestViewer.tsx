import { FC, useState } from "react"
import { SupabaseClient } from "@supabase/auth-helpers-nextjs"

import { Friend } from "@/lib/types"

import { Icons } from "../Icons"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
// import { acceptFriendRequest } from "@/lib/functions"

interface FriendRequestViewerProps {
  friend: string
  friend_email: string
  supabase: SupabaseClient
  open: boolean
  setOpen: (open: boolean) => void
}

const FriendRequestViewer: FC<FriendRequestViewerProps> = ({
  friend,
  open,
  setOpen,
  friend_email,
  supabase,
}) => {
  const [loading, setLoading] = useState(false)
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <div className="bg-secondary rounded px-3 py-1 text-sm hover:cursor-pointer">
          <div className="text-secondary-foreground">View</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Friend Request</DialogTitle>
          <DialogDescription>
            Do you want to add the user with email {friend_email} as a friend?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" disabled={loading} onClick={() => {}}>
            Decline
          </Button>
          <Button
            variant="secondary"
            disabled={loading}
            onClick={async () => {
              setLoading(true)

              const { data } = await supabase
                .from("users")
                .select("*")
                .eq("id", friend)

              const friendData = data![0] as Friend

              // await acceptFriendRequest(friendData, supabase).then(() => {
              //   setOpen(false)
              // })
            }}
          >
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Add Friend
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FriendRequestViewer
