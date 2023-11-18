"use client"

import { FC } from "react"
import Link from "next/link"
import { classNames } from "@/constants/tailwind-constants"
import { format } from "date-fns"
import { AnimatePresence, motion } from "framer-motion"

import {
  calculateSubTotal,
  calculateTax,
  calculateTotal,
} from "@/lib/functions/functions"
import { Invoice } from "@/lib/types"

import { InvoiceListCheck } from "./InvoiceCheckColumn"

interface InvoiceTableItemsProps {
  items: Invoice[]
  searchParams: { [key: string]: string | string[] | undefined }
}

const InvoiceTableItems: FC<InvoiceTableItemsProps> = ({
  items,
  searchParams,
}) => {
  return (
    <tbody>
      <AnimatePresence>
        {items.filter((item) => {
          if (searchParams.tab === "all") {
            return item
          } else {
            return item.status === searchParams.tab
          }
        }).length > 0 ? (
          items
            .filter((item) => {
              if (searchParams.tab === "all") {
                return item
              } else {
                return item.status === searchParams.tab
              }
            })
            .map((item, itemIdx) => {
              const total = Number(
                calculateTotal(
                  calculateSubTotal(item.table.items),
                  calculateTax(
                    calculateSubTotal(item.table.items),
                    Number(item.table.tax)
                  )
                )
              ).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
              return (
                <>
                  <motion.tr
                    key={item.id}
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
                    custom={itemIdx}
                  >
                    <InvoiceListCheck
                      index={item.id}
                      itemsLength={items.length}
                    />
                    <td
                      className={classNames(
                        itemIdx !== items.length - 1 ? "border-b" : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-foreground sm:pl-6 lg:pl-8"
                      )}
                    >
                      INV# {item.id}
                    </td>
                    <td
                      className={classNames(
                        itemIdx !== items.length - 1 ? "border-b" : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-foreground sm:table-cell"
                      )}
                    >
                      {item.client.first_name}
                    </td>
                    <td
                      className={classNames(
                        itemIdx !== items.length - 1 ? "border-b" : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-foreground lg:table-cell"
                      )}
                    >
                      {item.information.invoicedDate !== "" ? (
                        <>
                          {format(
                            new Date(item.information.invoicedDate),
                            "PP"
                          )}
                        </>
                      ) : (
                        <div>N/A</div>
                      )}
                    </td>
                    <td
                      className={classNames(
                        itemIdx !== items.length - 1 ? "border-b" : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-foreground capitalize"
                      )}
                    >
                      {item.status}
                    </td>
                    <td
                      className={classNames(
                        itemIdx !== items.length - 1 ? "border-b" : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-foreground"
                      )}
                    >
                      {item.information.currency} {total}
                    </td>
                    <td
                      className={classNames(
                        itemIdx !== items.length - 1 ? "border-b" : "",
                        "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                      )}
                    >
                      <Link
                        href={`/account/invoice-list/preview/${item.id}`}
                        className="text-muted-foreground bg-muted hover:text-foreground rounded p-2"
                      >
                        Preview<span className="sr-only">, {item.id}</span>
                      </Link>
                    </td>
                  </motion.tr>
                </>
              )
            })
        ) : (
          <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <td
              colSpan={5}
              className="text-muted-foreground whitespace-nowrap px-6 py-4 text-center text-sm font-medium capitalize"
            >
              No invoices
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </tbody>
  )
}

export default InvoiceTableItems
