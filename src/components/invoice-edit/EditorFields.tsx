import { classNames } from "@/constants/tailwind-constants"
import { ChevronRightIcon } from "@heroicons/react/20/solid"

import { useEditorTableStateStore } from "@/lib/stores/editor-table"
import { InvoiceTableItem } from "@/lib/types"

import { EditFieldDialog } from "./EditFieldDialog"
import { FieldDialog } from "./FieldDialog"

const environments = {
  Preview: "text-gray-400 bg-gray-400/10 ring-gray-400/20",
  Production: "text-indigo-400 bg-indigo-400/10 ring-indigo-400/30",
}

const statuses = {
  offline: "text-gray-500 bg-gray-100/10",
  online: "text-green-400 bg-green-400/10",
  error: "text-rose-400 bg-rose-400/10",
}

export default function EditorFields() {
  const table = useEditorTableStateStore()
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-base font-semibold leading-7">
            Field Values
          </h2>
          <p className="text-muted-foreground mt-1 max-w-sm text-sm leading-6">
            These are the fields that will be used in the table of your invoice.
          </p>
        </div>

        <FieldDialog />
      </div>
      <div className="mt-10 grid gap-5">
        <FieldList
          items={table.invoice.table.items}
          currency={table.invoice.information.currency}
        />
      </div>
    </div>
  )
}

function FieldList({
  items,
  currency,
}: {
  items: InvoiceTableItem[]
  currency: string
}) {
  return (
    <ul role="list" className="divide-y divide-white/5">
      {items !== undefined && (
        <>
          {items.map((deployment) => (
            <EditFieldDialog key={deployment.id} item={deployment}>
              <li
                key={deployment.id}
                className="relative flex items-center space-x-4 py-4 hover:cursor-pointer"
              >
                <div className="min-w-0 flex-auto">
                  <div className="flex items-center gap-x-3">
                    <div
                      className={classNames(
                        statuses.online,
                        "flex-none rounded-full p-1"
                      )}
                    >
                      <div className="h-2 w-2 rounded-full bg-current" />
                    </div>
                    <h2 className="text-foreground min-w-0 text-sm font-semibold leading-6">
                      <div className="flex gap-x-2">
                        <span className="truncate">{deployment.title}</span>
                        <span className="text-muted-foreground">/</span>
                        <span className="whitespace-nowrap">
                          {deployment.hours} hours
                        </span>
                        <span className="absolute inset-0" />
                      </div>
                    </h2>
                  </div>
                  <div className="text-muted-foreground mt-3 flex items-center gap-x-2.5 text-xs leading-5">
                    <p className="truncate">{deployment.description}</p>
                    <svg
                      viewBox="0 0 2 2"
                      className="fill-muted-foreground h-0.5 w-0.5 flex-none"
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <p className="whitespace-nowrap">
                      {currency}
                      {deployment.rate} / hour
                    </p>
                  </div>
                </div>
                <div
                  className={classNames(
                    environments.Production,
                    "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {currency}
                  {deployment.price}
                </div>
                <ChevronRightIcon
                  className="text-muted-foreground h-5 w-5 flex-none"
                  aria-hidden="true"
                />
              </li>
            </EditFieldDialog>
          ))}
        </>
      )}
    </ul>
  )
}
