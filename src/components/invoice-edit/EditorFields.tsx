import { useEditorInformationStore } from "@/lib/stores/editor-information"
import { useEditorTableStateStore } from "@/lib/stores/editor-table"

import { Button } from "../ui/button"
import FieldAccordian from "./FieldAccordian"

export default function EditorFields() {
  const table = useEditorTableStateStore()
  const info = useEditorInformationStore()
  return (
    <div className="flex flex-col space-y-12">
      <div>
        <h2 className="text-foreground text-base font-semibold leading-7">
          Field Values
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-6">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <div className="mt-10 grid gap-5">
        <div className="flex items-center justify-between border-b pb-5">
          <div>Current Items</div>
          <Button
            onClick={() => {
              table.insertInvoiceItem()
            }}
          >
            New Item
          </Button>
        </div>
        <FieldAccordian items={table.invoice.items} />
      </div>
    </div>
  )
}
