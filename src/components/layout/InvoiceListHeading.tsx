"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { tabs } from "@/constants/nav-constants"
import { classNames } from "@/constants/tailwind-constants"
import { AnimatePresence, motion } from "framer-motion"
import { XIcon } from "lucide-react"

import { useStateStore } from "@/lib/stores/state"
import { Client } from "@/lib/types"

import { NewInvoiceButton } from "../invoice-edit/NewInvoiceButton"
import PageTitles from "../PageTitles"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export default function InvoiceListHeading({ clients }: { clients: Client[] }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const path = pathname + "?" + searchParams

  const globalState = useStateStore()
  return (
    <div className="relative border-b pb-5 sm:pb-0">
      <div className="md:flex md:items-center md:justify-between">
        <PageTitles title="Invoices" />
        <div className="mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0">
          <Button
            variant={globalState.multiSelectOn ? "default" : "outline"}
            className="mr-2"
            onClick={() => globalState.setMultiSelectOn()}
          >
            Share
          </Button>
          {globalState.multiSelectOn ? (
            <Button
              variant="outline"
              onClick={() => globalState.setMultiSelectOff()}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          ) : (
            <NewInvoiceButton clients={clients} />
          )}
        </div>
      </div>
      <div className="mt-4">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <Select
            onValueChange={(v) => {
              router.push(v)
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  searchParams.get("tab")?.split("")[0].toUpperCase() +
                  searchParams.get("tab")?.slice(1)!
                }
              />
            </SelectTrigger>
            <SelectContent>
              {tabs.map((tab) => {
                return (
                  <SelectItem key={tab.name} value={tab.href}>
                    {tab.name}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
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
                    "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium transition-colors duration-300"
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
