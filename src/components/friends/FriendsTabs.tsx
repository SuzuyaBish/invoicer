"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { classNames } from "@/constants/tailwind-constants"

import { User } from "@/lib/types"
import { countTotalFriends, countTotalPendingFriendRequests, countTotalSentFriendRequests } from "@/lib/functions/friend-functions"

let tabs = [
  { name: "Friends", href: "/account/friends?tab=friends", count: "0" },
  { name: "Pending Requests", href: "/account/friends?tab=pending", count: "0" },
  { name: "Sent Requests", href: "/account/friends?tab=sent", count: "0" },
]

export default function FriendsTabs({ userData }: { userData: User }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  tabs[0].count = countTotalFriends(userData).toString()
  tabs[1].count = countTotalPendingFriendRequests(userData).toString()
  tabs[2].count = countTotalSentFriendRequests(userData).toString()

  return (
    <div className="">
      <div className="border-b">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.href === pathname + "?tab=" + searchParams.get("tab")
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:border-foreground hover:text-foreground",
                "flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors duration-300"
              )}
              aria-current={
                tab.href === pathname + "?tab=" + searchParams.get("tab")
                  ? "page"
                  : undefined
              }
            >
              {tab.name}
              {tab.count ? (
                <span
                  className={classNames(
                    tab.href === pathname + "?tab=" + searchParams.get("tab")
                      ? "bg-muted text-foreground"
                      : "bg-muted text-muted-foreground",
                    "ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
                  )}
                >
                  {tab.count}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
