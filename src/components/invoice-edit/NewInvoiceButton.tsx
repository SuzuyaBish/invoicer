"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { PlusSmallIcon } from "@heroicons/react/24/outline"

import { createInvoice } from "@/lib/actions"
import { Client } from "@/lib/types"
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

import ClientSelectBox from "../clients/ClientSelectBox"
import { useToast } from "../ui/use-toast"

const initialState = {
  message: null,
}

export function NewInvoiceButton({ clients }: { clients: Client[] }) {
  const { toast } = useToast()
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [selectedClientId, setSelectedClientId] = useState("")
  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    setLoading(true)

    if (title === "" || selectedClientId === "") {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    const response = await createInvoice(title, selectedClientId)

    if (response === "error") {
      setLoading(false)
      toast({
        title: "Error",
        description: "There was an error creating the invoice.",
        variant: "destructive",
      })
    } else {
      setLoading(false)
      toast({
        title: "Success",
        description: "Invoice created successfully.",
      })
      router.push(`/account/invoice-list/edit/${response}?section=general`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button className="ml-auto">
          <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
          New Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Invoice</DialogTitle>
          <DialogDescription>
            All fields are required in order to create an invoice.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid gap-5">
          <div className="grid gap-y-3">
            <Label>Invoice Title</Label>
            <Input
              placeholder="Pet Sitting May 2023"
              type="text"
              value={title}
              required
              disabled={loading}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-y-3">
            <Label>Client</Label>
            <ClientSelectBox
              clients={clients}
              setSelectedClient={setSelectedClientId}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={loading}>
                Close
              </Button>
            </DialogClose>

            <Button type="submit" variant="default" disabled={loading}>
              Create Invoice
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
