"use client"

import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"

import { useStateStore } from "@/lib/stores/state"

import { ModeToggle } from "../ModeToggle"
import { Input } from "../ui/input"
import UserMenuDropdown from "./UserMenuDropdown"

export function SearchBar() {
  const stateStore = useStateStore()
  return (
    <div className="bg-background sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="text-foreground -m-2.5 p-2.5 lg:hidden"
        onClick={() => stateStore.setSearchBarOpen()}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <MagnifyingGlassIcon
            className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 h-full w-5"
            aria-hidden="true"
          />
          <Input
            id="search-field"
            className="text-foreground placeholder:text-muted-foreground block h-full w-full border-0 py-0 pl-8 pr-0 focus:ring-0 sm:text-sm"
            placeholder="Search..."
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground -m-2.5 p-2.5"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <ModeToggle />

          <div
            className="lg:bg-muted hidden lg:block lg:h-6 lg:w-px"
            aria-hidden="true"
          />

          <UserMenuDropdown />
        </div>
      </div>
    </div>
  )
}
