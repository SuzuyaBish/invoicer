import { FC } from "react"
import { classNames } from "@/constants/tailwind-constants"

const stats = [
  {
    name: "Revenue",
    value: "$405,091.00",
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "Overdue invoices",
    value: "$12,787.00",
    change: "+54.02%",
    changeType: "negative",
  },
  {
    name: "Outstanding invoices",
    value: "$245,988.00",
    change: "-1.39%",
    changeType: "positive",
  },
  {
    name: "Expenses",
    value: "$30,156.00",
    change: "+10.18%",
    changeType: "negative",
  },
]

interface DashboardStatsProps {}

const DashboardStats: FC<DashboardStatsProps> = ({}) => {
  return (
    <div className="border-b lg:border-t">
      <dl className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
        {stats.map((stat, statIdx) => (
          <div
            key={stat.name}
            className={classNames(
              statIdx % 2 === 1
                ? "sm:border-l"
                : statIdx === 2
                ? "lg:border-l"
                : "",
              "flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
            )}
          >
            <dt className="text-muted-foreground text-sm font-medium leading-6">
              {stat.name}
            </dt>
            <dd
              className={classNames(
                stat.changeType === "negative"
                  ? "text-rose-600"
                  : "text-muted-foreground",
                "text-xs font-medium"
              )}
            >
              {stat.change}
            </dd>
            <dd className="text-foreground w-full flex-none text-3xl font-medium leading-10 tracking-tight">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default DashboardStats
