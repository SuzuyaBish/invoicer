import { InvoiceTableItem } from "./types"

export const calculateSubTotal = (table: InvoiceTableItem[]) => {
  let sum = 0

  if (table && table.length > 0) {
    table.forEach((el) => {
      sum += Number(el.price)
    })
  }

  return sum === 0 ? -1 : sum
}

export const calculateTax = (subTotal: number, tax: number) => {
  return Number.isNaN(Math.round(subTotal * tax * 100) / 100)
    ? -1
    : Math.round(subTotal * tax * 100) / 100
}

export const calculateTotal = (subTotal: number, tax: number) => {
  return Number.isNaN(subTotal + tax)
    ? -1
    : Math.round((subTotal + tax) * 100) / 100
}
