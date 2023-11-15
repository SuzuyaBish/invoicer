"use client"

import { AnimatePresence, motion } from "framer-motion"

import { Skeleton } from "../ui/skeleton"

export default function ClientItemFallback() {
  return (
    <AnimatePresence>
      <motion.li
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden rounded-xl border"
      >
        <div className="bg-muted flex items-center gap-x-4 border-b border-gray-900/5 p-6">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="text-foreground text-sm font-medium leading-6">
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="ml-auto">
            <Skeleton className="h-4 w-4" />
          </div>
        </div>
        <dl className="divide -my-3 divide-y px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-foreground">Last invoice</dt>
            <dd className="text-muted-foreground">
              <Skeleton className="h-4 w-24" />
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-foreground">Amount</dt>
            <dd className="flex items-start gap-x-2">
              <div className="text-muted-foreground font-medium">
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="rounded-md px-2 py-1 text-xs font-medium">
                <Skeleton className="h-4 w-24" />
              </div>
            </dd>
          </div>
        </dl>
      </motion.li>
    </AnimatePresence>
  )
}
