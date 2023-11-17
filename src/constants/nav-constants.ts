import {
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"

interface NavGroup {
  title: string
  links: Array<{
    title: string
    href: string
  }>
}

export const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
]

export const navigation = [
  { name: "Dashboard", href: "/account", icon: HomeIcon },
  {
    name: "Invoices",
    href: "/account/invoice-list?tab=all",
    icon: DocumentDuplicateIcon,
  },
  { name: "Clients", href: "/account/clients", icon: UsersIcon },
  { name: "Friends", href: "/account/friends", icon: ChatBubbleBottomCenterTextIcon },
  // { name: "Calendar", href: "#", icon: CalendarIcon },
  // { name: "Reports", href: "#", icon: ChartPieIcon },
]

export const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
]

export const tabs = [
  { name: "All", href: "/account/invoice-list?tab=all" },
  { name: "Pending", href: "/account/invoice-list?tab=pending" },
  { name: "Paid", href: "/account/invoice-list?tab=paid" },
  { name: "Drafts", href: "/account/invoice-list?tab=draft" },
]

export const navigations: Array<NavGroup> = [
  {
    title: "Dashboard",
    links: [
      { title: "Home", href: "/home" },
      { title: "Account", href: "/account" },
      { title: "Settings", href: "/settings" },
    ],
  },
  {
    title: "Invoices",
    links: [
      { title: "All", href: "/account/invoice-list?tab=all" },
      { title: "Pending", href: "/account/invoice-list?tab=pending" },
      { title: "Paid", href: "/account/invoice-list?tab=paid" },
      { title: "Drafts", href: "/account/invoice-list?tab=draft" },
    ],
  },
  {
    title: "Clients",
    links: [
      { title: "All", href: "/account/clients/" },
      {
        title: "Edit",
        href: "/account/clients/edit",
      },
      { title: "View", href: "/account/clients/view" },
    ],
  },
]
