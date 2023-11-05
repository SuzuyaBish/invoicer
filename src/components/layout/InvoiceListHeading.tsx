"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { tabs } from "@/constants/nav-constants"
import { classNames } from "@/constants/tailwind-constants"
import { AnimatePresence, motion } from "framer-motion"

import PageTitles from "../PageTitles"
import { Button } from "../ui/button"

export default function InvoiceListHeading() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const path = pathname + "?" + searchParams
  return (
    <div className="relative border-b pb-5 sm:pb-0">
      <div className="md:flex md:items-center md:justify-between">
        <PageTitles title="Invoices" />
        <div className="mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0">
          <Button variant="secondary">Share</Button>
          <Button className="ml-3">Create</Button>
        </div>
      </div>
      <div className="mt-4">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="ring-muted-foreground focus:ring-primary block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset"
            // defaultValue={tabs.find((tab) => tab.current)?.name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            <AnimatePresence>
              {tabs.map((tab, index) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    path === tab.href
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:border-muted-foreground hover:text-foreground",
                    "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                  )}
                  aria-current={path === tab.href ? "page" : undefined}
                >
                  <motion.div
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
                    custom={index}
                  >
                    {tab.name}
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </nav>
        </div>
      </div>
    </div>
  )
}
