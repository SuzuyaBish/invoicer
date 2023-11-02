import { useEditorInformationStore } from "@/lib/stores/editor-information"
import { useEditorTableStateStore } from "@/lib/stores/editor-table"

import DatePicker from "../DatePicker"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function EditorGeneral() {
  const table = useEditorTableStateStore()
  const info = useEditorInformationStore()
  return (
    <div className="flex flex-col space-y-12">
      <div>
        <h2 className="text-foreground text-base font-semibold leading-7">
          General Information
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-6">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <form className="mt-10 grid grid-cols-2 gap-5">
        <div className="grid gap-y-3">
          <Label>Invoice Title</Label>
          <Input
            placeholder="Pet Sitting May 2023"
            type="text"
            value={info.information.title}
            onChange={(e) => info.setTitle(e.target.value)}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Currency Delimiter</Label>
          <Input
            placeholder="$"
            type="text"
            value={table.currency}
            onChange={(e) => table.setCurrency(e.target.value)}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Tax Rate (percentage)</Label>
          <Input
            placeholder="14"
            type="text"
            value={table.taxRate}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0
              table.setTaxRate(value)
            }}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Invoiced Date</Label>
          <DatePicker
            date={new Date(info.information.invoicedDate)}
            setDate={info.setInvoicedDate}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Due Date</Label>
          <DatePicker
            date={new Date(info.information.dueDate)}
            setDate={info.setDueDate}
          />
        </div>
      </form>
    </div>
  )
}
