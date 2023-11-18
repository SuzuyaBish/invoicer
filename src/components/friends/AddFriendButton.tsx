"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Check, Plus, Search } from "lucide-react"
import { toast } from "sonner"

import { findUserByEmail, sendFriendRequest } from "@/lib/functions"
import { Friend } from "@/lib/types"
import { cn } from "@/lib/utils"

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
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function AddFriendButton() {
  const supabase = createClientComponentClient()

  const [open, setOpen] = useState(false)

  const [loading, setLoading] = useState(false)
  const [addFriendLoading, setAddFriendLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [friendData, setFriendData] = useState<Friend>({} as Friend)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    const friendData = await findUserByEmail(email.trim(), supabase)

    if (friendData) {
      setLoading(false)
      setFriendData(friendData)
    } else {
      setLoading(false)
      toast.error("No user found with that email address.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="ml-3">
          <Plus className="mr-2 h-4 w-4" />
          Add Friend
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Find Friend</DialogTitle>
          <DialogDescription>
            Enter you friends email address.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              placeholder="Email Address"
              type="email"
              required
              disabled={loading || addFriendLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            disabled={loading || addFriendLoading}
            type="submit"
            size="sm"
            className={cn(
              "px-3",
              friendData.id ? "bg-emerald-500 text-white" : ""
            )}
          >
            <span className="sr-only">Copy</span>
            {loading ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {friendData.id ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </>
            )}
          </Button>
        </form>
        <DialogFooter className="sm:justify-start">
          <Button
            disabled={loading || addFriendLoading}
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          {friendData.id && (
            <Button
              type="button"
              variant="default"
              disabled={addFriendLoading}
              onClick={async () => {
                setAddFriendLoading(true)

                const newFriend: Friend = {
                  id: friendData.id,
                  email_address: friendData.email_address,
                  first_name: friendData.first_name,
                  last_name: friendData.last_name,
                  imageUrl: friendData.imageUrl,
                  seen: false,
                  type: "sent",
                  status: "pending",
                }

                await sendFriendRequest(newFriend, supabase).then((v) => {
                  setEmail("")
                  setFriendData({} as Friend)
                  setAddFriendLoading(false)
                  setOpen(false)
                })
              }}
            >
              Send Friend Request
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
