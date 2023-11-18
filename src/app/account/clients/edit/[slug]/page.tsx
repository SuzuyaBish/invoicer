"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Save, Trash } from "lucide-react"

import {
  deleteClient,
  fetchClientById,
  saveClient,
} from "@/lib/functions/client-functions"
import { useClientStore } from "@/lib/stores/client-profile"
import { Client } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/Icons"
import UserAvatar from "@/components/UserAvatar"

export default function ClientEdit({ params }: { params: { slug: string } }) {
  const clientStore = useClientStore()
  const client = clientStore.client
  const router = useRouter()

  const [saveLoading, setSaveLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  useEffect(() => {
    fetchClientById(params.slug).then((client) => {
      clientStore.setClient(client as Client)
    })
  }, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSaveLoading(true)
    await saveClient(client, selectedImage).then(() => {
      setSaveLoading(false)
    })
  }
  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-7xl">
      <div className="space-y-12">
        <div className="border-b  pb-12">
          <h2 className="text-foreground text-base font-semibold leading-7">
            Profile
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <Label
                htmlFor="photo"
                className="text-foreground block text-sm font-medium leading-6"
              >
                Photo
              </Label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserAvatar
                  imageUrl={
                    selectedImage !== null
                      ? URL.createObjectURL(selectedImage)
                      : client.imageUrl
                  }
                  userName={client.first_name + " " + client.last_name}
                />
                <Input
                  type="file"
                  id="photo"
                  name="photo"
                  className="w-fit"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    if (e.target.files) {
                      setSelectedImage(e.target.files[0])
                    }
                  }}
                />
              </div>
            </div>
            <div className="col-span-full">
              <Label
                htmlFor="about"
                className="text-foreground block text-sm font-medium leading-6"
              >
                About
              </Label>
              <div className="mt-2">
                <Textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="text-foreground block w-full rounded-md py-1.5 shadow-sm"
                  value={client.about}
                  onChange={(e) => {
                    const newClient: Client = {
                      ...client,
                      about: e.target.value,
                    }
                    clientStore.updateClient(newClient)
                  }}
                />
              </div>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                Write a few sentences about yourself.
              </p>
            </div>
          </div>
        </div>

        <div className="border-b  pb-12">
          <h2 className="text-foreground text-base font-semibold leading-7">
            Personal Information
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Label htmlFor="first-name">
                First name <span className="text-rose-500">*</span>
              </Label>
              <div className="mt-2">
                <Input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={client.first_name}
                  required
                  onChange={(e) => {
                    const newClient: Client = {
                      ...client,
                      first_name: e.target.value,
                    }
                    clientStore.updateClient(newClient)
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <Label htmlFor="last-name">
                Last name <span className="text-rose-500">*</span>
              </Label>
              <div className="mt-2">
                <Input
                  required
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  value={client.last_name}
                  onChange={(e) => {
                    const newClient: Client = {
                      ...client,
                      last_name: e.target.value,
                    }
                    clientStore.updateClient(newClient)
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <Label htmlFor="email">Email address</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={client.email_address}
                  onChange={(e) => {
                    const newClient: Client = {
                      ...client,
                      email_address: e.target.value,
                    }
                    clientStore.updateClient(newClient)
                  }}
                />
              </div>
            </div>

            <div className="col-span-full">
              <Label htmlFor="street-address">Street address</Label>
              <div className="mt-2">
                <Input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  value={client.street_address}
                  onChange={(e) => {
                    const newClient: Client = {
                      ...client,
                      street_address: e.target.value,
                    }
                    clientStore.updateClient(newClient)
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <Label htmlFor="city">City</Label>
              <div className="mt-2">
                <Input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  value={client.city}
                  onChange={(e) => {
                    const newClient: Client = {
                      ...client,
                      city: e.target.value,
                    }
                    clientStore.updateClient(newClient)
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="region">State / Province</Label>
              <div className="mt-2">
                <Input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  value={client.state}
                  onChange={(e) => {
                    const newClient: Client = {
                      ...client,
                      state: e.target.value,
                    }
                    clientStore.updateClient(newClient)
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="postal-code">ZIP / Postal code</Label>
              <div className="mt-2">
                <Input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  value={client.zip}
                  onChange={(e) => {
                    const newClient: Client = {
                      ...client,
                      zip: e.target.value,
                    }
                    clientStore.updateClient(newClient)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button
          type="button"
          disabled={saveLoading}
          variant="destructive"
          onClick={async () => {
            setSaveLoading(true)
            await deleteClient(client.id).then(() => {
              router.replace("/account/clients")
            })
          }}
        >
          {saveLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Trash className="mr-2 h-4 w-4" />
          )}
          Delete Client
        </Button>
        <div className="flex items-center gap-x-6">
          <Button
            type="button"
            disabled={saveLoading}
            variant="secondary"
            onClick={() => {
              router.replace("/account/clients")
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saveLoading}>
            {saveLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save
          </Button>
        </div>
      </div>
    </form>
  )
}
