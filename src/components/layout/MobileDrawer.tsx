"use client"

import { Fragment } from "react"
import { usePathname } from "next/navigation"
import { navigation, teams } from "@/constants/nav-constants"
import { classNames } from "@/constants/tailwind-constants"
import { Dialog, Transition } from "@headlessui/react"
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline"

import { useStateStore } from "@/lib/stores/state"
import Link from "next/link"

export function MobileDrawer() {
  const stateStore = useStateStore()
  const pathname = usePathname()
  return (
    <Transition.Root show={stateStore.searchBarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        onClose={stateStore.setSearchBarClosed}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => stateStore.setSearchBarClosed()}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="bg-background flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                pathname.endsWith(item.href.split("?")[0])
                                  ? "bg-muted text-foreground"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                            >
                              <item.icon
                                className="h-6 w-6 shrink-0"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <div className="text-muted-foreground text-xs font-semibold leading-6">
                        Your teams
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <Link
                              href={team.href}
                              className={classNames(
                                team.current
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:text-primary-foreground hover:bg-primary",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                            >
                              <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium group-hover:text-white">
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <Link
                        href="/account/settings"
                        className="text-muted-foreground hover:bg-primary hover:text-primary-foreground group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                      >
                        <Cog6ToothIcon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        Settings
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
