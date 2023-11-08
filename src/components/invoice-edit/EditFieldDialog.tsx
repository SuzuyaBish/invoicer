"use client"

import { useState } from "react"

import { useEditorTableStateStore } from "@/lib/stores/editor-table"
import { InvoiceTableItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function EditFieldDialog({
  item,
  children,
}: {
  item: InvoiceTableItem
  children: React.ReactNode
}) {
  const table = useEditorTableStateStore()

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Invoice Item</DialogTitle>
          <DialogDescription>
            Fields are not required but the invoice will not be complete without
            them.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-5">
          <div className="grid gap-y-3">
            <Label>Item Title</Label>
            <Input
              placeholder="Pet Sitting May 2023"
              type="text"
              value={item.title}
              onChange={(e) => {
                const newItem: InvoiceTableItem = {
                  ...item,
                  title: e.target.value,
                }

                table.updateInvoiceItem(newItem)
              }}
            />
          </div>
          <div className="grid gap-y-3">
            <Label>Item Description</Label>
            <Input
              placeholder="Pet Sitting"
              type="text"
              value={item.description}
              onChange={(e) => {
                const newItem: InvoiceTableItem = {
                  ...item,
                  description: e.target.value,
                }

                table.updateInvoiceItem(newItem)
              }}
            />
          </div>
          <div className="grid gap-y-3">
            <Label>Item Hours</Label>
            <Input
              placeholder="5"
              type="number"
              value={item.hours}
              onChange={(e) => {
                const newItem: InvoiceTableItem = {
                  ...item,
                  hours: e.target.value,
                  price: (Number(e.target.value) * Number(item.rate)).toString(),
                }

                table.updateInvoiceItem(newItem)
              }}
            />
          </div>
          <div className="grid gap-y-3">
            <Label>Item Rate</Label>
            <Input
              placeholder="100"
              type="number"
              value={item.rate}
              onChange={(e) => {
                const newItem: InvoiceTableItem = {
                  ...item,
                  rate: e.target.value,
                  price: (Number(item.hours) * Number(e.target.value)).toString(),
                }

                table.updateInvoiceItem(newItem)
              }}
            />
          </div>
        </form>
        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              table.deleteInvoiceItem(item.id)
              setOpen(false)
            }}
          >
            Remove
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={() => {
              setOpen(false)
            }}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
