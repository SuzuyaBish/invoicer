"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { PlusSmallIcon } from "@heroicons/react/24/outline"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"

import { createClient, createInvoice } from "@/lib/actions"
import { checkIfUserHasClients } from "@/lib/functions"
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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import ClientSelectBox from "../clients/ClientSelectBox"
import { Icons } from "../Icons"

export function NewInvoiceButton({ clients }: { clients: Client[] }) {
  const supabase = createClientComponentClient()

  const router = useRouter()
  const [title, setTitle] = useState("")
  const [selectedClientId, setSelectedClientId] = useState("")
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  const [open, setOpen] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    setLoading(true)

    if (title === "" || selectedClientId === "") {
      toast.error("Error", {
        description: "Please fill out all fields.",
        important: true,
      })
      setLoading(false)
      return
    }

    const response = await createInvoice(title, selectedClientId)

    if (response === "error") {
      setLoading(false)
      toast.error("Error", {
        description: "There was an error creating the invoice.",
        important: true,
      })
    } else {
      setLoading(false)
      toast.success("Success", {
        description: "Invoice created successfully.",
      })
      router.push(`/account/invoice-list/edit/${response}?section=general`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <Button
        variant="secondary"
        className="ml-auto"
        disabled={buttonLoading}
        onClick={async () => {
          setButtonLoading(true)
          await checkIfUserHasClients(supabase).then((res) => {
            if (!res) {
              toast.message("Please create a client first.", {
                important: true,
                action: {
                  label: "Create Client",
                  onClick: async () => {
                    await createClient().then(async (res) => {
                      if (res) {
                        router.replace(`/account/clients/edit/${res}`)
                      }
                      setLoading(false)
                    })
                  },
                },
              })
            } else {
              setOpen(true)
            }
            setButtonLoading(false)
          })
        }}
      >
        {buttonLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
        )}
        New Invoice
      </Button>
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
