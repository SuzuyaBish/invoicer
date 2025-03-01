"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navigation, teams } from "@/constants/nav-constants"
import { classNames } from "@/constants/tailwind-constants"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"

export default function DesktopDrawer() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r px-6 pb-4">
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
                    <Link
                      href={item.href}
                      className={classNames(
                        pathname.endsWith(item.href.split("?")[0])
                          ? "bg-muted text-foreground border-border"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted border-transparent",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors border duration-300 items-center"
                      )}
                    >
                      <item.icon
                        className="h-5 w-5 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
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
                    <a
                      href={team.href}
                      className={classNames(
                        team.current
                          ? "bg-muted text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-300"
                      )}
                    >
                      <span className="bg-muted text-muted-foreground group-hover:text-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium">
                        {team.initial}
                      </span>
                      <span className="truncate">{team.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <Link
                href="/account/settings"
                className="text-muted-foreground hover:bg-muted hover:text-muted-foreground hover:border-border group -mx-2 flex items-center gap-x-3 rounded-md border border-transparent p-2 text-sm font-semibold leading-6 transition-colors duration-300"
              >
                <Cog6ToothIcon
                  className="h-5 w-5 shrink-0"
                  aria-hidden="true"
                />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
