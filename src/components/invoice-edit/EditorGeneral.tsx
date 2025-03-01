import { useEditorTableStateStore } from "@/lib/stores/editor-table"

import DatePicker from "../DatePicker"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import DeleteButton from "./DeleteButton"

export default function EditorGeneral() {
  const table = useEditorTableStateStore()
  const info = table.invoice.information
  return (
    <div className="flex flex-col space-y-12">
      <div>
        <h2 className="text-foreground text-base font-semibold leading-7">
          General Information
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-6">
          This is general information that will be applied throughout the
          invoice.
        </p>
      </div>
      <form className="mt-10 grid grid-cols-2 gap-5">
        <div className="grid gap-y-3">
          <Label>Invoice Title</Label>
          <Input
            placeholder="Pet Sitting May 2023"
            type="text"
            value={info.title}
            onChange={(e) => {
              const newInvoice = {
                ...table.invoice,
                information: { ...info, title: e.target.value },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Currency Delimiter</Label>
          <Input
            placeholder="$"
            type="text"
            value={info.currency}
            maxLength={1}
            onChange={(e) => {
              const newInvoice = {
                ...table.invoice,
                information: { ...info, currency: e.target.value },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Tax Rate (percentage)</Label>
          <Input
            placeholder="14"
            type="text"
            value={table.invoice.table.tax}
            onChange={(e) => {
              const newInvoice = {
                ...table.invoice,
                table: { ...table.invoice.table, tax: e.target.value },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Invoiced Date</Label>
          <DatePicker
            date={info.invoicedDate === "" ? null : info.invoicedDate}
            setDate={(date) => {
              const newInvoice = {
                ...table.invoice,
                information: {
                  ...info,
                  invoicedDate: date,
                },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Due Date</Label>
          <DatePicker
            date={info.dueDate === "" ? null : info.dueDate}
            setDate={(date) => {
              console.log(date)
              const newInvoice = {
                ...table.invoice,
                information: {
                  ...info,
                  dueDate: date,
                },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
      </form>
      <div className="border-t">
        <h2 className="mt-10 text-base font-semibold leading-7 text-rose-500">
          Danger Zone
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-6">
          The actions here cannot be undone.
        </p>
        <div className="mt-10">
          <DeleteButton info={table.invoice} />
        </div>
      </div>
    </div>
  )
}
