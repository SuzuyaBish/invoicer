import { classNames } from "@/constants/tailwind-constants"

const tabs = [
  { name: "Open", href: "#", current: true },
  { name: "Closed", href: "#", current: false },
]

export default function EditorTabs() {
  return (
    <div className="border-b">
      <div className="sm:flex sm:items-baseline">
        <h3 className="text-foreground text-base font-semibold leading-6">
          Sections
        </h3>
        <div className="mt-4 sm:ml-10 sm:mt-0">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:border-foreground hover:text-foreground",
                  "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
