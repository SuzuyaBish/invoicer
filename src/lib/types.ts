export type Client = {
  id: number
  name: string
  imageUrl: string
  lastInvoice: {
    date: string
    dateTime: string
    amount: string
    status: string
  }
}

export type Invoice = {
  subTotal: string
  tax: string
  total: string
  items: InvoiceItem[]
}

export type InvoiceItem = {
  id: number
  title: string
  description: string
  hours: string
  rate: string
  price: string
}