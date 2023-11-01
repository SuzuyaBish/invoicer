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
