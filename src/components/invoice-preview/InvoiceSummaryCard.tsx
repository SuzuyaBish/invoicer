import { FC } from "react"
import Link from "next/link"
import {
  CalendarDaysIcon,
  CreditCardIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import { format } from "date-fns"

import {
  calculateSubTotal,
  calculateTax,
  calculateTotal,
} from "@/lib/functions/functions"
import { Invoice } from "@/lib/types"

interface InvoiceSummaryCardProps extends Invoice {}

const InvoiceSummaryCard: FC<InvoiceSummaryCardProps> = (props) => {
  const total = Number(
    calculateTotal(
      calculateSubTotal(props.table.items),
      calculateTax(
        calculateSubTotal(props.table.items),
        Number(props.table.tax)
      )
    )
  ).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return (
    <div className="lg:col-start-3 lg:row-end-1">
      <h2 className="sr-only">Summary</h2>
      <div className="bg-muted border-foreground/20 rounded-lg border shadow-sm">
        <dl className="flex flex-wrap">
          <div className="flex-auto pl-6 pt-6">
            <dt className="text-foreground text-sm font-semibold leading-6">
              Amount
            </dt>
            <dd className="text-foreground mt-1 text-base font-semibold leading-6">
              {props.information.currency} {total}
            </dd>
          </div>
          <div className="flex-none self-end px-6 pt-4">
            <dt className="sr-only">Status</dt>
            <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium capitalize text-green-600 ring-1 ring-inset ring-green-600/20">
              {props.status}
            </dd>
          </div>
          <div className="mt-6 flex w-full flex-none gap-x-4 border-t  px-6 pt-6">
            <dt className="flex-none">
              <span className="sr-only">Client</span>
              <UserCircleIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-foreground text-sm font-medium leading-6">
              {props.client.first_name} {props.client.last_name}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Due date</span>
              <CalendarDaysIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-muted-foreground text-sm leading-6">
              {props.information.invoicedDate !== "" ? (
                <time dateTime="2023-01-31">
                  {format(new Date(props.information.invoicedDate), "PP")}
                </time>
              ) : (
                <div>N/A</div>
              )}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Status</span>
              <CreditCardIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-muted-foreground text-sm leading-6">
              Paid with MasterCard
            </dd>
          </div>
        </dl>
        <div className="mt-6 border-t  p-6">
          <Link
            href={`/account/invoice-list/download/${props.id}`}
            className="text-foreground text-sm font-semibold leading-6"
          >
            Download invoice <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InvoiceSummaryCard
