import { InvoiceTable, InvoiceTableItem } from "./types";

export const calculateSubTotal = (table: InvoiceTableItem[]) => {
  let sum = 0;

  table.forEach(el => {
    sum += Number(el.price); 
  });

  return sum;
}

export const calculateTax = (subTotal: number, tax: number) => {
  return Math.round((subTotal * tax) * 100) / 100;
}

export const calculateTotal = (subTotal: number, tax: number) => {
  return subTotal + tax;
}