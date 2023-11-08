import { useEditorTableStateStore } from "@/lib/stores/editor-table"
import { Invoice } from "@/lib/types"

import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function EditorDetails() {
  const table = useEditorTableStateStore()
  const info = table.invoice.information
  return (
    <div className="flex flex-col space-y-12">
      <div>
        <h2 className="text-foreground text-base font-semibold leading-7">
          Your Information
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-6">
          This is your personal information including your name and address.
        </p>
      </div>
      <form className="mt-10 grid grid-cols-2 gap-5">
        <div className="grid gap-y-3">
          <Label>Full Name</Label>
          <Input
            placeholder="Jane Doe"
            type="text"
            value={info.from.name}
            onChange={(e) => {
              const newInvoice: Invoice = {
                ...table.invoice,
                information: {
                  ...info,
                  from: { ...info.from, name: e.target.value },
                },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Address</Label>
          <Input
            placeholder="123 Main St"
            type="text"
            value={info.from.address}
            onChange={(e) => {
              const newInvoice = {
                ...table.invoice,
                information: {
                  ...info,
                  from: { ...info.from, address: e.target.value },
                },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>City</Label>
          <Input
            placeholder="Buffalo"
            type="text"
            value={info.from.city}
            onChange={(e) => {
              const newInvoice = {
                ...table.invoice,
                information: {
                  ...info,
                  from: { ...info.from, city: e.target.value },
                },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>State</Label>
          <Input
            placeholder="New York"
            type="text"
            value={info.from.state}
            onChange={(e) => {
              const newInvoice = {
                ...table.invoice,
                information: {
                  ...info,
                  from: { ...info.from, state: e.target.value },
                },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Zip Code</Label>
          <Input
            placeholder="10001"
            type="text"
            value={info.from.zipCode}
            onChange={(e) => {
              const newInvoice = {
                ...table.invoice,
                information: {
                  ...info,
                  from: { ...info.from, zipCode: e.target.value },
                },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
      </form>

      <div className="border-t">
        <h2 className="text-foreground mt-5 text-base font-semibold leading-7">
          Client Information
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-6">
          This is the clients information including their name and address.
        </p>
      </div>
      <form className="mt-10 grid grid-cols-2 gap-5">
        <div className="grid gap-y-3">
          <Label>Full Name</Label>
          <Input
            placeholder="Jane Doe"
            type="text"
            value={info.to.name}
            onChange={(e) => {
              const newInvoice = {
                ...table.invoice,
                information: {
                  ...info,
                  to: { ...info.to, name: e.target.value },
                },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Address</Label>
          <Input
            placeholder="123 Main St"
            type="text"
            value={info.to.address}
            onChange={(e) => {
              const newInvoice = {
                ...table.invoice,
                information: {
                  ...info,
                  to: { ...info.to, address: e.target.value },
                },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>City</Label>
          <Input
            placeholder="Buffalo"
            type="text"
            value={info.to.city}
            onChange={(e) => {
              const newInvoice = {
                ...table.invoice,
                information: {
                  ...info,
                  to: { ...info.to, city: e.target.value },
                },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>State</Label>
          <Input
            placeholder="New York"
            type="text"
            value={info.to.state}
            onChange={(e) => {
              const newInvoice = {
                ...table.invoice,
                information: {
                  ...info,
                  to: { ...info.to, state: e.target.value },
                },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
        <div className="grid gap-y-3">
          <Label>Zip Code</Label>
          <Input
            placeholder="10001"
            type="text"
            value={info.to.zipCode}
            onChange={(e) => {
              const newInvoice = {
                ...table.invoice,
                information: {
                  ...info,
                  to: { ...info.to, zipCode: e.target.value },
                },
              }
              table.updateInvoice(newInvoice)
            }}
          />
        </div>
      </form>
    </div>
  )
}
