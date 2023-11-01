import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"

export const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
]

export const navigation = [
  { name: "Dashboard", href: "/account", icon: HomeIcon },
  {
    name: "Invoices",
    href: "/account/invoice-list",
    icon: DocumentDuplicateIcon,
  },
  { name: "Clients", href: "#", icon: UsersIcon },
  { name: "Projects", href: "#", icon: FolderIcon },
  { name: "Calendar", href: "#", icon: CalendarIcon },
  { name: "Reports", href: "#", icon: ChartPieIcon },
]

export const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
]

export const tabs = [
  { name: "Applied", href: "#", current: false },
  { name: "Phone Screening", href: "#", current: false },
  { name: "Interview", href: "#", current: true },
  { name: "Offer", href: "#", current: false },
  { name: "Hired", href: "#", current: false },
]