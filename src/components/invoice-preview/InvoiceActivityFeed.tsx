import { FC } from "react"
import { classNames } from "@/constants/tailwind-constants"
import { CheckCircleIcon } from "@heroicons/react/24/outline"

interface InvoiceActivityFeedProps {
  activity: any
}

const InvoiceActivityFeed: FC<InvoiceActivityFeedProps> = ({ activity }) => {
  return (
    <div className="lg:col-start-3">
      {/* Activity feed */}
      <h2 className="text-foreground text-sm font-semibold leading-6">
        Activity
      </h2>
      <ul role="list" className="mt-6 space-y-6">
        {activity.map((activityItem: any, activityItemIdx: any) => (
          <li key={activityItem.id} className="relative flex gap-x-4">
            <div
              className={classNames(
                activityItemIdx === activity.length - 1 ? "h-6" : "-bottom-6",
                "absolute left-0 top-0 flex w-6 justify-center"
              )}
            >
              <div className="bg-muted w-px" />
            </div>
            <div className="bg-background relative flex h-6 w-6 flex-none items-center justify-center">
              {activityItem.type === "paid" ? (
                <CheckCircleIcon
                  className="h-6 w-6 text-indigo-600"
                  aria-hidden="true"
                />
              ) : (
                <div className="bg-foreground h-1.5 w-1.5 rounded-full ring-1 ring-gray-300" />
              )}
            </div>
            <p className="text-muted-foreground flex-auto py-0.5 text-xs leading-5">
              <span className="text-foreground font-medium">
                {activityItem.person.name}
              </span>{" "}
              {activityItem.type} the invoice.
            </p>
            <time
              dateTime={activityItem.dateTime}
              className="text-muted-foreground flex-none py-0.5 text-xs leading-5"
            >
              {activityItem.date}
            </time>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InvoiceActivityFeed
