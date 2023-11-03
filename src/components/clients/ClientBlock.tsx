"use client"

import { FC } from "react"
import Link from "next/link"
import { statuses } from "@/constants/constants"
import { classNames } from "@/constants/tailwind-constants"
import { Edit } from "lucide-react"

import {
  calculateSubTotal,
  calculateTax,
  calculateTotal,
} from "@/lib/functions"
import { Client } from "@/lib/types"

import { Button } from "../ui/button"
import UserAvatar from "../UserAvatar"

interface ClientBlockProps extends Client {}

const ClientBlock: FC<ClientBlockProps> = (props) => {
  return (
    <li key={props.id} className="overflow-hidden rounded-xl border">
      <div className="bg-muted flex items-center gap-x-4 border-b border-gray-900/5 p-6">
        <UserAvatar />
        <div className="text-foreground text-sm font-medium leading-6">
          {props.name}
        </div>
        <div className="ml-auto">
          <Link href="/account/clients/edit">
            <Button variant="ghost">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      <dl className="divide -my-3 divide-y px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-foreground">Last invoice</dt>
          <dd className="text-muted-foreground">
            <time dateTime={props.lastInvoice.information.dueDate}>
              {props.lastInvoice.information.dueDate}
            </time>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-foreground">Amount</dt>
          <dd className="flex items-start gap-x-2">
            <div className="text-muted-foreground font-medium">
              {props.lastInvoice.information.currency}{" "}
              {calculateTotal(
                calculateSubTotal(props.lastInvoice.table.items),
                calculateTax(
                  calculateSubTotal(props.lastInvoice.table.items),
                  Number(props.lastInvoice.table.tax)
                )
              )}
            </div>
            <div
              className={classNames(
                statuses[props.lastInvoice.status],
                "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
              )}
            >
              {props.lastInvoice.status}
            </div>
          </dd>
        </div>
      </dl>
    </li>
  )
}

export default ClientBlock
