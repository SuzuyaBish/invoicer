"use client"

import { FC } from "react"
import Link from "next/link"
import { statuses } from "@/constants/constants"
import { classNames } from "@/constants/tailwind-constants"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { Edit, Expand, View } from "lucide-react"

import {
  calculateSubTotal,
  calculateTax,
  calculateTotal,
} from "@/lib/functions"
import { Client } from "@/lib/types"

import { Button } from "../ui/button"
import UserAvatar from "../UserAvatar"

interface ClientBlockProps extends Client {
  idx: number
}

const ClientBlock: FC<ClientBlockProps> = (props) => {
  return (
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
      custom={props.idx}
      key={props.id}
      className="overflow-hidden rounded-xl border"
    >
      <div
        key={props.id}
        className="bg-muted flex items-center gap-x-4 border-b border-gray-900/5 p-6"
      >
        <UserAvatar
          imageUrl={props.imageUrl}
          userName={props.first_name + " " + props.last_name}
        />
        <div className="text-foreground text-sm font-medium leading-6">
          {props.first_name} {props.last_name}
        </div>
        <div className="ml-auto">
          <Link href={`/account/clients/view/${props.id}`}>
            <Button variant="ghost">
              <Expand className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      <dl className="divide -my-3 divide-y px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-foreground">Last invoice</dt>
          <dd className="text-muted-foreground">
            {props.lastInvoice !== null ? (
              <time dateTime={props.lastInvoice?.information.dueDate}>
                {format(new Date(props.lastInvoice?.information.dueDate), "PP")}
              </time>
            ) : (
              <span className="text-foreground">N/A</span>
            )}
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-foreground">Amount</dt>
          <dd className="flex items-start gap-x-2">
            {props.lastInvoice !== null ? (
              <div className="text-muted-foreground font-medium">
                {props.lastInvoice?.information.currency}{" "}
                {props.lastInvoice !== undefined && props !== null && (
                  <>
                    {calculateTotal(
                      calculateSubTotal(props?.lastInvoice?.table.items),
                      calculateTax(
                        calculateSubTotal(props?.lastInvoice?.table.items),
                        Number(props?.lastInvoice?.table.tax)
                      )
                    )}
                  </>
                )}
              </div>
            ) : (
              <span className="text-foreground">N/A</span>
            )}
            {props.lastInvoice !== null && (
              <div
                className={classNames(
                  statuses[props?.lastInvoice?.status],
                  "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset capitalize"
                )}
              >
                {props?.lastInvoice?.status}
              </div>
            )}
          </dd>
        </div>
      </dl>
    </motion.li>
  )
}

export default ClientBlock
