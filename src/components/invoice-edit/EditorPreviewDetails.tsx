import { format } from "date-fns"

import { useEditorTableStateStore } from "@/lib/stores/editor-table"

export function EditorPreviewDetails() {
  const info = useEditorTableStateStore().invoice.information
  return (
    <>
      <h2 className="text-base font-semibold leading-6 text-black">
        {info.title}
      </h2>
      <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
        <div className="sm:pr-4">
          <dt className="inline text-gray-500">Issued on</dt>{" "}
          <dd className="inline text-gray-500">
            {info.invoicedDate && (
              <time dateTime="2023-23-01">
                {format(info.invoicedDate, "P")}
              </time>
            )}
          </dd>
        </div>
        <div className="mt-2 sm:mt-0 sm:pl-4">
          <dt className="inline text-gray-500">Due on</dt>{" "}
          <dd className="inline text-gray-500">
            {info.dueDate && (
              <time dateTime="2023-31-01">{format(info.dueDate, "P")}</time>
            )}
          </dd>
        </div>
        <div className="mt-6 border-t  pt-6 sm:pr-4">
          <dt className="font-semibold text-black">From</dt>
          <dd className="mt-2 text-gray-500">
            <span className="font-medium text-black">{info.from.name}</span>
            <br />
            {info.from.address}
            <br />
            {info.from.city}, {info.from.state}, {info.from.zipCode}
          </dd>
        </div>
        <div className="sm: mt-8 sm:mt-6 sm:border-t sm:pl-4 sm:pt-6">
          <dt className="font-semibold text-black">To</dt>
          <dd className="mt-2 text-gray-500">
            <span className="font-medium text-black">{info.to.name}</span>
            <br />
            {info.to.address}
            <br />
            {info.to.city}, {info.to.state}, {info.to.zipCode}
          </dd>
        </div>
      </dl>
    </>
  )
}

export default EditorPreviewDetails
