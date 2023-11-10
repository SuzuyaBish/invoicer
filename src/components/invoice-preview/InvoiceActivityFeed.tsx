"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"
import { classNames } from "@/constants/tailwind-constants"
import { differenceInDays } from "date-fns"
import { Eraser } from "lucide-react"

import { clearActivity } from "@/lib/actions"
import { InvoiceActivity } from "@/lib/types"

import TooltipHover from "../Tooltip"
import { ScrollArea } from "../ui/scroll-area"

interface InvoiceActivityFeedProps {
  id: string
  activity: InvoiceActivity[]
}

const InvoiceActivityFeed: FC<InvoiceActivityFeedProps> = ({
  id,
  activity,
}) => {
  const router = useRouter()
  return (
    <div className="lg:col-start-3">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-sm font-semibold leading-6">
          Activity
        </h2>
        <TooltipHover description="Clear activity history">
          <Eraser
            onClick={async () => {
              await clearActivity(id).then(() => {
                router.refresh()
              })
            }}
            className="text-muted-foreground hover:text-foreground h-4 w-4 hover:cursor-pointer"
          />
        </TooltipHover>
      </div>
      <ScrollArea className="h-72">
        <ul role="list" className="mt-6 space-y-6">
          {activity.map(
            (activityItem: InvoiceActivity, activityItemIdx: number) => (
              <li key={activityItemIdx} className="relative flex gap-x-4">
                <div
                  className={classNames(
                    activityItemIdx === activity.length - 1
                      ? "h-6"
                      : "-bottom-6",
                    "absolute left-0 top-0 flex w-6 justify-center"
                  )}
                >
                  <div className="bg-muted w-px" />
                </div>
                <div className="bg-background relative flex h-6 w-6 flex-none items-center justify-center">
                  <div className="bg-foreground h-1.5 w-1.5 rounded-full ring-1 ring-gray-300" />
                </div>
                <p className="text-muted-foreground flex-auto py-0.5 text-xs leading-5">
                  <span className="text-foreground font-medium">
                    {activityItem.name}
                  </span>{" "}
                  {activityItem.action}.
                </p>
                <time
                  dateTime={activityItem.timestamp}
                  className="text-muted-foreground flex-none py-0.5 text-xs leading-5"
                >
                  {differenceInDays(
                    new Date(),
                    new Date(activityItem.timestamp)
                  ) === 0
                    ? "Today"
                    : differenceInDays(
                        new Date(),
                        new Date(activityItem.timestamp)
                      ) === 1
                    ? "Yesterday"
                    : differenceInDays(
                        new Date(),
                        new Date(activityItem.timestamp)
                      ) + " days ago"}
                </time>
              </li>
            )
          )}
        </ul>
      </ScrollArea>
    </div>
  )
}

export default InvoiceActivityFeed
