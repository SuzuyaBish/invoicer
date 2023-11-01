import { FC } from "react"

interface InvoicePreviewTableProps {
  invoice: any
}

const InvoicePreviewTable: FC<InvoicePreviewTableProps> = ({ invoice }) => {
  return (
    <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
      <colgroup>
        <col className="w-full" />
        <col />
        <col />
        <col />
      </colgroup>
      <thead className="text-foreground  border-b">
        <tr>
          <th scope="col" className="px-0 py-3 font-semibold">
            Projects
          </th>
          <th
            scope="col"
            className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
          >
            Hours
          </th>
          <th
            scope="col"
            className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
          >
            Rate
          </th>
          <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        {invoice.items.map((item: any) => (
          <tr key={item.id} className="border-b ">
            <td className="max-w-0 px-0 py-5 align-top">
              <div className="text-foreground truncate font-medium">
                {item.title}
              </div>
              <div className="text-muted-foreground truncate">
                {item.description}
              </div>
            </td>
            <td className="text-muted-foreground hidden py-5 pl-8 pr-0 text-right align-top tabular-nums sm:table-cell">
              {item.hours}
            </td>
            <td className="text-muted-foreground hidden py-5 pl-8 pr-0 text-right align-top tabular-nums sm:table-cell">
              {item.rate}
            </td>
            <td className="text-muted-foreground py-5 pl-8 pr-0 text-right align-top tabular-nums">
              {item.price}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th
            scope="row"
            className="text-muted-foreground px-0 pb-0 pt-6 font-normal sm:hidden"
          >
            Subtotal
          </th>
          <th
            scope="row"
            colSpan={3}
            className="text-muted-foreground hidden px-0 pb-0 pt-6 text-right font-normal sm:table-cell"
          >
            Subtotal
          </th>
          <td className="text-foreground pb-0 pl-8 pr-0 pt-6 text-right tabular-nums">
            {invoice.subTotal}
          </td>
        </tr>
        <tr>
          <th
            scope="row"
            className="text-muted-foreground pt-4 font-normal sm:hidden"
          >
            Tax
          </th>
          <th
            scope="row"
            colSpan={3}
            className="text-muted-foreground hidden pt-4 text-right font-normal sm:table-cell"
          >
            Tax
          </th>
          <td className="text-foreground pb-0 pl-8 pr-0 pt-4 text-right tabular-nums">
            {invoice.tax}
          </td>
        </tr>
        <tr>
          <th
            scope="row"
            className="text-foreground pt-4 font-semibold sm:hidden"
          >
            Total
          </th>
          <th
            scope="row"
            colSpan={3}
            className="text-foreground hidden pt-4 text-right font-semibold sm:table-cell"
          >
            Total
          </th>
          <td className="text-foreground pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums">
            {invoice.total}
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default InvoicePreviewTable
