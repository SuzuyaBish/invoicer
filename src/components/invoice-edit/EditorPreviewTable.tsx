import {
  calculateSubTotal,
  calculateTax,
  calculateTotal,
} from "@/lib/functions"
import { useEditorTableStateStore } from "@/lib/stores/editor-table"
import { InvoiceTableItem } from "@/lib/types"

export function EditorPreviewTable() {
  const table = useEditorTableStateStore()
  return (
    <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
      <colgroup>
        <col className="w-full" />
        <col />
        <col />
        <col />
      </colgroup>
      <thead className="border-b text-black">
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
        {table.invoice.table.items !== undefined && (
          <>
            {table.invoice.table.items.map((item: InvoiceTableItem) => (
              <tr key={item.id} className="border-b ">
                <td className="max-w-0 px-0 py-5 align-top">
                  <div className="truncate font-medium text-black">
                    {item.title}
                  </div>
                  <div className="truncate text-gray-500">
                    {item.description}
                  </div>
                </td>
                <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-500 sm:table-cell">
                  {item.hours}
                </td>
                <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-500 sm:table-cell">
                  {item.rate}
                </td>
                <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-500">
                  {Number(item.hours) * Number(item.rate)}
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
      <tfoot>
        <tr>
          <th
            scope="row"
            className="px-0 pb-0 pt-6 font-normal text-gray-500 sm:hidden"
          >
            Subtotal
          </th>
          <th
            scope="row"
            colSpan={3}
            className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-500 sm:table-cell"
          >
            Subtotal
          </th>
          <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-black">
            {table.invoice.information.currency}
            {calculateSubTotal(table.invoice.table.items)}
          </td>
        </tr>
        <tr>
          <th scope="row" className="pt-4 font-normal text-gray-500 sm:hidden">
            Tax ({table.invoice.table.tax}%)
          </th>
          <th
            scope="row"
            colSpan={3}
            className="hidden pt-4 text-right font-normal text-gray-500 sm:table-cell"
          >
            Tax ({table.invoice.table.tax}%)
          </th>
          <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-black">
            {table.invoice.information.currency}
            {calculateTax(
              calculateSubTotal(table.invoice.table.items),
              Number(table.invoice.table.tax)
            )}
          </td>
        </tr>
        <tr>
          <th scope="row" className="pt-4 font-semibold text-black sm:hidden">
            Total
          </th>
          <th
            scope="row"
            colSpan={3}
            className="hidden pt-4 text-right font-semibold text-black sm:table-cell"
          >
            Total
          </th>
          <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-black">
            {table.invoice.information.currency}
            {calculateTotal(
              calculateSubTotal(table.invoice.table.items),
              calculateTax(
                calculateSubTotal(table.invoice.table.items),
                Number(table.invoice.table.tax)
              )
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default EditorPreviewTable
