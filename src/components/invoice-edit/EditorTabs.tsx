'use client'

import { useSearchParams } from "next/navigation"
import { classNames } from "@/constants/tailwind-constants"
import Link from "next/link"

const tabs = [
  { name: "General", href: "?section=general" },
  { name: "Details", href: "?section=details" },
  { name: "Fields", href: "?section=fields" },
]

export default function EditorTabs() {
  const searchParams = useSearchParams()
  const currentSection = searchParams.get("section")
  return (
    <div className="border-b">
      <div className="sm:flex sm:items-baseline">
        <h3 className="text-foreground text-base font-semibold leading-6">
          Sections
        </h3>
        <div className="mt-4 sm:ml-10 sm:mt-0">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={classNames(
                  currentSection === tab.name.toLocaleLowerCase()
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:border-foreground hover:text-foreground",
                  "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                )}
                aria-current={
                  currentSection === tab.name.toLowerCase() ? "page" : undefined
                }
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
