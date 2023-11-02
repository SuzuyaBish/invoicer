import { FC } from "react"

interface EditorPreviewDetailsProps {}

const EditorPreviewDetails: FC<EditorPreviewDetailsProps> = ({}) => {
  return (
    <>
      <h2 className="text-base font-semibold leading-6 text-black">Invoice</h2>
      <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
        <div className="sm:pr-4">
          <dt className="inline text-gray-500">Issued on</dt>{" "}
          <dd className="inline text-gray-500">
            <time dateTime="2023-23-01">January 23, 2023</time>
          </dd>
        </div>
        <div className="mt-2 sm:mt-0 sm:pl-4">
          <dt className="inline text-gray-500">Due on</dt>{" "}
          <dd className="inline text-gray-500">
            <time dateTime="2023-31-01">January 31, 2023</time>
          </dd>
        </div>
        <div className="mt-6 border-t  pt-6 sm:pr-4">
          <dt className="font-semibold text-black">From</dt>
          <dd className="mt-2 text-gray-500">
            <span className="font-medium text-black">Acme, Inc.</span>
            <br />
            7363 Cynthia Pass
            <br />
            Toronto, ON N3Y 4H8
          </dd>
        </div>
        <div className="sm: mt-8 sm:mt-6 sm:border-t sm:pl-4 sm:pt-6">
          <dt className="font-semibold text-black">To</dt>
          <dd className="mt-2 text-gray-500">
            <span className="font-medium text-black">Tuple, Inc</span>
            <br />
            886 Walter Street
            <br />
            New York, NY 12345
          </dd>
        </div>
      </dl>
    </>
  )
}

export default EditorPreviewDetails
