import { FC, Fragment } from "react"
import { statuses } from "@/constants/constants"
import { classNames } from "@/constants/tailwind-constants"
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline"

const days = [
  {
    date: "Today",
    dateTime: "2023-03-22",
    transactions: [
      {
        id: 1,
        invoiceNumber: "00012",
        href: "#",
        amount: "$7,600.00 USD",
        tax: "$500.00",
        status: "Paid",
        client: "Reform",
        description: "Website redesign",
        icon: ArrowUpCircleIcon,
      },
      {
        id: 2,
        invoiceNumber: "00011",
        href: "#",
        amount: "$10,000.00 USD",
        status: "Withdraw",
        client: "Tom Cook",
        description: "Salary",
        icon: ArrowDownCircleIcon,
      },
      {
        id: 3,
        invoiceNumber: "00009",
        href: "#",
        amount: "$2,000.00 USD",
        tax: "$130.00",
        status: "Overdue",
        client: "Tuple",
        description: "Logo design",
        icon: ArrowPathIcon,
      },
    ],
  },
  {
    date: "Yesterday",
    dateTime: "2023-03-21",
    transactions: [
      {
        id: 4,
        invoiceNumber: "00010",
        href: "#",
        amount: "$14,000.00 USD",
        tax: "$900.00",
        status: "Paid",
        client: "SavvyCal",
        description: "Website redesign",
        icon: ArrowUpCircleIcon,
      },
    ],
  },
]

interface DashboardRecentActivityProps {}

const DashboardRecentActivity: FC<DashboardRecentActivityProps> = ({}) => {
  return (
    <div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-muted-foreground mx-auto max-w-2xl text-base font-semibold leading-6 lg:mx-0 lg:max-w-none">
          Recent activity
        </h2>
      </div>
      <div className="mt-6 overflow-hidden border-t">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <table className="w-full text-left">
              <thead className="sr-only">
                <tr>
                  <th>Amount</th>
                  <th className="hidden sm:table-cell">Client</th>
                  <th>More details</th>
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <Fragment key={day.dateTime}>
                    <tr className="text-muted-foreground text-sm leading-6">
                      <th
                        scope="colgroup"
                        colSpan={3}
                        className="relative isolate py-2 font-semibold"
                      >
                        <time dateTime={day.dateTime}>{day.date}</time>
                        <div className="bg-muted absolute inset-y-0 right-full -z-10 w-screen border-b" />
                        <div className="bg-muted absolute inset-y-0 left-0 -z-10 w-screen border-b" />
                      </th>
                    </tr>
                    {day.transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="relative py-5 pr-6">
                          <div className="flex gap-x-6">
                            <transaction.icon
                              className="text-muted-foreground hidden h-6 w-5 flex-none sm:block"
                              aria-hidden="true"
                            />
                            <div className="flex-auto">
                              <div className="flex items-start gap-x-3">
                                <div className="text-foreground text-sm font-medium leading-6">
                                  {transaction.amount}
                                </div>
                                <div
                                  className={classNames(
                                    statuses[transaction.status],
                                    "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                                  )}
                                >
                                  {transaction.status}
                                </div>
                              </div>
                              {transaction.tax ? (
                                <div className="text-muted-foreground mt-1 text-xs leading-5">
                                  {transaction.tax} tax
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="bg-muted absolute bottom-0 right-full h-px w-screen" />
                          <div className="bg-muted absolute bottom-0 left-0 h-px w-screen" />
                        </td>
                        <td className="hidden py-5 pr-6 sm:table-cell">
                          <div className="text-foreground text-sm leading-6">
                            {transaction.client}
                          </div>
                          <div className="text-muted-foreground mt-1 text-xs leading-5">
                            {transaction.description}
                          </div>
                        </td>
                        <td className="py-5 text-right">
                          <div className="flex justify-end">
                            <a
                              href={transaction.href}
                              className="text-primary hover:text-primary text-sm font-medium leading-6"
                            >
                              View
                              <span className="hidden sm:inline">
                                {" "}
                                transaction
                              </span>
                              <span className="sr-only">
                                , invoice #{transaction.invoiceNumber},{" "}
                                {transaction.client}
                              </span>
                            </a>
                          </div>
                          <div className="text-foreground mt-1 text-xs leading-5">
                            Invoice{" "}
                            <span className="text-muted-foreground">
                              #{transaction.invoiceNumber}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardRecentActivity
