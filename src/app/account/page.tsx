"use client"

import { Fragment } from "react"
import { clients, statuses } from "@/constants/constants"
import { classNames } from "@/constants/tailwind-constants"
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  PlusSmallIcon,
} from "@heroicons/react/20/solid"

import ClientBlock from "@/components/clients/ClientBlock"
import { Button } from "@/components/ui/button"

const secondaryNavigation = [
  { name: "Last 7 days", href: "#", current: true },
  { name: "Last 30 days", href: "#", current: false },
  { name: "All-time", href: "#", current: false },
]
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

export default function Account() {
  return (
    <main>
      <div className="relative isolate overflow-hidden ">
        {/* Secondary navigation */}
        <header className="pb-4 sm:pb-6">
          <div className="mx-auto flex flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
            <h1 className="text-foreground text-base font-semibold leading-7">
              Cashflow
            </h1>
            <div className="sm:border-muted order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:pl-6 sm:leading-7">
              {secondaryNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={
                    item.current ? "text-primary" : "text-muted-foreground"
                  }
                >
                  {item.name}
                </a>
              ))}
            </div>
            <Button
              className="ml-auto"
            >
              <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
              New invoice
            </Button>
          </div>
        </header>

        {/* Stats */}
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
      </div>

      <div className="space-y-16 py-16 xl:space-y-20">
        {/* Recent activity table */}
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

        {/* Recent client list*/}
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="flex items-center justify-between">
              <h2 className="text-muted-foreground text-base font-semibold leading-7">
                Recent clients
              </h2>
              <a
                href="#"
                className="text-primary hover:text-primary text-sm font-semibold leading-6"
              >
                View all<span className="sr-only">, clients</span>
              </a>
            </div>
            <ul
              role="list"
              className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
            >
              {clients.map((client) => (
                <ClientBlock key={client.name} {...client} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
