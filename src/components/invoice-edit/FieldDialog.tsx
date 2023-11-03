"use client"

import { useState } from "react"

import { useEditorTableStateStore } from "@/lib/stores/editor-table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InvoiceTableItem } from "@/lib/types"

export function FieldDialog() {
  const table = useEditorTableStateStore()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [hours, setHours] = useState("")
  const [rate, setRate] = useState("")

  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button>New Item</Button>
      </DialogTrigger>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-y-3">
            <Label>Item Description</Label>
            <Input
              placeholder="Pet Sitting"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-y-3">
            <Label>Item Hours</Label>
            <Input
              placeholder="5"
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
          <div className="grid gap-y-3">
            <Label>Item Rate</Label>
            <Input
              placeholder="100"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="default"
            onClick={() => {
              const newItem: InvoiceTableItem = {
                title: title,
                description: description,
                hours: hours,
                rate: rate,
                price: (Number(hours) * Number(rate)).toString(),
                id: Math.random().toString(),
              }

              table.insertInvoiceItem(newItem)
              setOpen(false)
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
