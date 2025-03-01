import { FC } from "react"

import { Client } from "@/lib/types"

import { NewInvoiceButton } from "../invoice-edit/NewInvoiceButton"

const secondaryNavigation = [
  { name: "Last 7 days", href: "#", current: true },
  { name: "Last 30 days", href: "#", current: false },
  { name: "All-time", href: "#", current: false },
]

interface DashBoardHeaderProps {
  clients: Client[]
}

const DashBoardHeader: FC<DashBoardHeaderProps> = ({ clients }) => {
  return (
    <header className="pb-4 sm:pb-6">
      <div className="mx-auto flex flex-wrap items-center gap-6 sm:flex-nowrap">
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
        <NewInvoiceButton clients={clients} />
      </div>
    </header>
  )
}

export default DashBoardHeader
