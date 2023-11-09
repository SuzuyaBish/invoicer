import DesktopDrawer from "@/components/layout/DesktopDrawer"
import { HeroPattern } from "@/components/layout/HeroPattern"
import { MobileDrawer } from "@/components/layout/MobileDrawer"
import { SearchBar } from "@/components/layout/SearchBar"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <MobileDrawer />
      <DesktopDrawer />

      <div className="ml-auto">
        <HeroPattern />
      </div>

      <div className="lg:pl-72">
        <SearchBar />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
