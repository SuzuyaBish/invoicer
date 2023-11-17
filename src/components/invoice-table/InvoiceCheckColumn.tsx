"use client"

import { FC } from "react"
import { classNames } from "@/constants/tailwind-constants"
import { AnimatePresence, motion } from "framer-motion"

import { useStateStore } from "@/lib/stores/state"

import { Checkbox } from "../ui/checkbox"

interface InvoiceListCheckProps {
  index: string
  itemsLength: number
}

const InvoiceListCheck: FC<InvoiceListCheckProps> = ({
  index,
  itemsLength,
}) => {
  const globalState = useStateStore()
  return (
    <AnimatePresence>
      {globalState.multiSelectOn && (
        <motion.td
          key="check-column"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          scope="col"
          className={classNames(
            Number(index) !== itemsLength - 1 ? "border-b" : "",
            "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-foreground sm:pl-6 lg:pl-8"
          )}
        >
          <Checkbox
            className=""
            onClick={() => {
              globalState.insertSelectedIndex(Number(index))
            }}
            checked={
              globalState.selectedIndexes.includes(Number(index)) ? true : false
            }
          />
        </motion.td>
      )}
    </AnimatePresence>
  )
}

export function InvoiceListCheckColumn() {
  const globalState = useStateStore()
  return (
    <AnimatePresence>
      {globalState.multiSelectOn && (
        <motion.th
          key="check-column"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          scope="col"
          className="bg-background/75 text-muted-foreground sticky top-16 z-10 border-b py-3.5 pl-4 pr-3 text-left text-sm font-semibold backdrop-blur sm:pl-6 lg:pl-8"
        >
          Select
        </motion.th>
      )}
    </AnimatePresence>
  )
}

export { InvoiceListCheck }
