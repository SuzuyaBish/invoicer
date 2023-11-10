"use client"

import { FC, Fragment, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { classNames } from "@/constants/tailwind-constants"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import { Save } from "lucide-react"

import { saveInvoice } from "@/lib/actions"
import { Invoice } from "@/lib/types"

import { Icons } from "../Icons"
import { Button } from "../ui/button"

interface InvoicePreviewHeaderProps {
  editVisible?: boolean
  sendOrSave?: "send" | "save"
  copyVisible?: boolean
  info: Invoice
}

const InvoicePreviewHeader: FC<InvoicePreviewHeaderProps> = ({
  editVisible = true,
  info,
  sendOrSave = "send",
  copyVisible = true,
}) => {
  const [loading, setLoading] = useState(false)
  return (
    <header className="relative isolate">
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
      </div>

      <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-x-8 space-y-10 md:flex-row md:space-y-0 lg:mx-0 lg:max-w-none">
          <div className="flex items-center gap-x-6">
            <Image
              src={info.client.imageUrl}
              alt=""
              height={64}
              width={64}
              className="h-16 w-16 flex-none rounded-full ring-1 ring-gray-900/10"
            />
            <h1>
              <div className="text-muted-foreground text-sm leading-6">
                Invoice{" "}
                <span className="text-muted-foreground">#{info.id}</span>
              </div>
              <div className="text-foreground mt-1 text-base font-semibold leading-6">
                {info.information.title}
              </div>
            </h1>
          </div>
          <div className="flex items-center gap-x-4 sm:gap-x-6">
            {copyVisible && (
              <Button variant="ghost" disabled={loading}>
                Copy URL
              </Button>
            )}
            {editVisible && (
              <Link
                href={`/account/invoice-list/edit/${info.id}?section=general`}
              >
                <Button variant="outline">Edit</Button>
              </Link>
            )}
            {sendOrSave === "send" ? (
              <Button>Send</Button>
            ) : (
              <Button
                disabled={loading}
                onClick={async () => {
                  setLoading(true)

                  const newInvoice: Invoice = {
                    ...info,
                    activity: [
                      ...info.activity,
                      {
                        name: "Current User",
                        action: "updated the invoice",
                        timestamp: new Date().toISOString(),
                      },
                    ],
                  }

                  await saveInvoice(newInvoice).then(() => setLoading(false))
                }}
              >
                {loading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save
              </Button>
            )}

            <Menu as="div" className="relative sm:hidden">
              <Menu.Button className="-m-3 block p-3">
                <span className="sr-only">More</span>
                <EllipsisVerticalIcon
                  className="text-muted-foreground h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block w-full px-3 py-1 text-left text-sm leading-6 text-foreground"
                        )}
                      >
                        Copy URL
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="#"
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-foreground"
                        )}
                      >
                        Edit
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  )
}

export default InvoicePreviewHeader
