"use client"

import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

import { User } from "@/lib/types"

import { Button } from "../ui/button"
import UserAvatar from "../UserAvatar"

export default function FriendsList({ userData }: { userData: User }) {
  const searchParams = useSearchParams()
  return (
    <AnimatePresence>
      <ul role="list" className="max-w-2xl divide-y">
        {userData.friends
          .filter((friend) => {
            if (searchParams.get("tab") === "friends") {
              return true
            }
            if (searchParams.get("tab") === "pending") {
              return friend.status === "pending" && friend.type === "received"
            }
            if (searchParams.get("tab") === "sent") {
              return friend.status === "pending" && friend.type === "sent"
            }
          })
          .map((person, index) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: (idx) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: idx * 0.05,
                  },
                }),
              }}
              initial="hidden"
              animate="visible"
              custom={index}
              key={person.email_address}
              className="flex items-center justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <UserAvatar
                  imageUrl={person.imageUrl}
                  userName={person.first_name + " " + person.last_name}
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-foreground text-sm font-semibold leading-6">
                    {person.first_name} {person.last_name}
                  </p>
                  <p className="text-muted-foreground mt-1 truncate text-xs leading-5">
                    {person.email_address}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="secondary">
                Remove
              </Button>
            </motion.li>
          ))}
      </ul>
    </AnimatePresence>
  )
}
