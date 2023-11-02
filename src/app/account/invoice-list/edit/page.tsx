"use client"

import { Margin, Options } from "react-to-pdf"

import EditorPreview from "@/components/invoice-edit/EditorPreview"
import InvoicePreviewHeader from "@/components/invoice-preview/InvoicePreviewHeader"

const invoice = {
  subTotal: "$8,800.00",
  tax: "$1,760.00",
  total: "$10,560.00",
  items: [
    {
      id: 1,
      title: "Logo redesign",
      description: "New logo and digital asset playbook.",
      hours: "20.0",
      rate: "$100.00",
      price: "$2,000.00",
    },
    {
      id: 2,
      title: "Website redesign",
      description: "Design and program new company website.",
      hours: "52.0",
      rate: "$100.00",
      price: "$5,200.00",
    },
    {
      id: 3,
      title: "Business cards",
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: "12.0",
      rate: "$100.00",
      price: "$1,200.00",
    },
    {
      id: 4,
      title: "T-shirt design",
      description: "Three t-shirt design concepts.",
      hours: "4.0",
      rate: "$100.00",
      price: "$400.00",
    },
  ],
}

const options: Options = {
  page: {
    margin: Margin.LARGE,
  },
}

export default function InvoiceEdit() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full items-start gap-x-8 px-4 sm:px-6 lg:px-8">
        <main className="w-full xl:w-[calc(0.3_*_100vw)]">
          <InvoicePreviewHeader editVisible={false} />
        </main>

        <EditorPreview />
      </div>
    </div>
  )
}
