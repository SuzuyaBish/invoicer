import { FC, Fragment } from "react"
import { statuses } from "@/constants/constants"
import { classNames } from "@/constants/tailwind-constants"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"

import { Client } from "@/lib/types"

interface ClientBlockProps extends Client {}

const ClientBlock: FC<ClientBlockProps> = (props) => {
  return (
    <li key={props.id} className="overflow-hidden rounded-xl border">
      <div className="bg-muted flex items-center gap-x-4 border-b border-gray-900/5 p-6">
        <img
          src={props.imageUrl}
          alt={props.name}
          className="bg-muted h-12 w-12 flex-none rounded-lg object-cover ring-1 ring-gray-900/10"
        />
        <div className="text-foreground text-sm font-medium leading-6">
          {props.name}
        </div>
        <Menu as="div" className="relative ml-auto">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open options</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                    )}
                  >
                    View
                    <span className="sr-only">, {props.name}</span>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                    )}
                  >
                    Edit
                    <span className="sr-only">, {props.name}</span>
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <dl className="divide -my-3 divide-y px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-foreground">Last invoice</dt>
          <dd className="text-muted-foreground">
            <time dateTime={props.lastInvoice.dateTime}>
              {props.lastInvoice.date}
            </time>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-foreground">Amount</dt>
          <dd className="flex items-start gap-x-2">
            <div className="text-muted-foreground font-medium">
              {props.lastInvoice.amount}
            </div>
            <div
              className={classNames(
                statuses[props.lastInvoice.status],
                "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
              )}
            >
              {props.lastInvoice.status}
            </div>
          </dd>
        </div>
      </dl>
    </li>
  )
}

export default ClientBlock
