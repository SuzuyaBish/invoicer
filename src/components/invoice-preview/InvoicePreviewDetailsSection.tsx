"use client"

import { FC } from "react"
import { format } from "date-fns"
import { AnimatePresence, motion } from "framer-motion"

import { InvoiceInformation } from "@/lib/types"

interface InvoicePreviewDetailsSectionProps extends InvoiceInformation {}

const InvoicePreviewDetailsSection: FC<InvoicePreviewDetailsSectionProps> = (
  props
) => {
  return (
    <AnimatePresence>
      <motion.div
        key={props.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <h2 className="text-foreground text-base font-semibold leading-6">
          {props.title}
        </h2>
        <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
          <div className="sm:pr-4">
            <dt className="text-muted-foreground inline">Issued on</dt>{" "}
            <dd className="text-muted-foreground inline">
              {props.invoicedDate !== "" ? (
                <time dateTime="2023-23-01">
                  {format(new Date(props.invoicedDate), "PP")}
                </time>
              ) : (
                <div>N/A</div>
              )}
            </dd>
          </div>
          <div className="mt-2 sm:mt-0 sm:pl-4">
            <dt className="text-muted-foreground inline">Due on</dt>{" "}
            <dd className="text-muted-foreground inline">
              {props.dueDate !== "" ? (
                <time dateTime="2023-23-01">
                  {format(new Date(props.dueDate), "PP")}
                </time>
              ) : (
                <div>N/A</div>
              )}
            </dd>
          </div>
          <div className="mt-6 border-t  pt-6 sm:pr-4">
            <dt className="text-foreground font-semibold">From</dt>
            <dd className="text-muted-foreground mt-2">
              <span className="text-foreground font-medium">
                {props.from.name}
              </span>
              <br />
              {props.from.address}
              <br />
              {props.from.city}, {props.from.state}, {props.from.zipCode}
            </dd>
          </div>
          <div className="sm: mt-8 sm:mt-6 sm:border-t sm:pl-4 sm:pt-6">
            <dt className="text-foreground font-semibold">To</dt>
            <dd className="text-muted-foreground mt-2">
              <span className="text-foreground font-medium">
                {props.to.name}
              </span>
              <br />
              {props.to.address}
              <br />
              {props.to.city}, {props.to.state}, {props.to.zipCode}
            </dd>
          </div>
        </dl>
      </motion.div>
    </AnimatePresence>
  )
}

export default InvoicePreviewDetailsSection
