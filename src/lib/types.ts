export type Client = {
  id: string
  name: string
  imageUrl: string
  lastInvoice: Invoice
}

export type Invoice = {
  id: string
  client: Client
  status: string
  information: InvoiceInformation
  table: InvoiceTable
}

export type InvoiceInformation = {
  title: string
  invoicedDate: string
  dueDate: string
  currency: string
  from: UserInfo
  to: UserInfo
}

export type UserInfo = {
  name: string
  address: string
  city: string
  state: string
  zipCode: string
}

export type InvoiceTable = {
  subTotal: string
  tax: string
  total: string
  items: InvoiceTableItem[]
}

export type InvoiceTableItem = {
  id: string
  title: string
  description: string
  hours: string
  rate: string
  price: string
}
