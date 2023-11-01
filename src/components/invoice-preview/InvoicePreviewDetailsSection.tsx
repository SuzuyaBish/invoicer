import { FC } from "react"

interface InvoicePreviewDetailsSectionProps {}

const InvoicePreviewDetailsSection: FC<
  InvoicePreviewDetailsSectionProps
> = ({}) => {
  return (
    <>
      <h2 className="text-foreground text-base font-semibold leading-6">
        Invoice
      </h2>
      <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
        <div className="sm:pr-4">
          <dt className="text-muted-foreground inline">Issued on</dt>{" "}
          <dd className="text-muted-foreground inline">
            <time dateTime="2023-23-01">January 23, 2023</time>
          </dd>
        </div>
        <div className="mt-2 sm:mt-0 sm:pl-4">
          <dt className="text-muted-foreground inline">Due on</dt>{" "}
          <dd className="text-muted-foreground inline">
            <time dateTime="2023-31-01">January 31, 2023</time>
          </dd>
        </div>
        <div className="mt-6 border-t  pt-6 sm:pr-4">
          <dt className="text-foreground font-semibold">From</dt>
          <dd className="text-muted-foreground mt-2">
            <span className="text-foreground font-medium">Acme, Inc.</span>
            <br />
            7363 Cynthia Pass
            <br />
            Toronto, ON N3Y 4H8
          </dd>
        </div>
        <div className="sm: mt-8 sm:mt-6 sm:border-t sm:pl-4 sm:pt-6">
          <dt className="text-foreground font-semibold">To</dt>
          <dd className="text-muted-foreground mt-2">
            <span className="text-foreground font-medium">Tuple, Inc</span>
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

export default InvoicePreviewDetailsSection
