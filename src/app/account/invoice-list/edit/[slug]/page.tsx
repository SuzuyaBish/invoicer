"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { fetchInvoiceById } from "@/lib/actions"
import { useEditorTableStateStore } from "@/lib/stores/editor-table"
import EditorPreview from "@/components/invoice-edit/EditorPreview"
import InvoicePreviewHeader from "@/components/invoice-preview/InvoicePreviewHeader"
import EditorTabs from "@/components/invoice-edit/EditorTabs"
import EditorTabViewer from "@/components/invoice-edit/EditorTabViewer"

export default function InvoiceEdit({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState(true)
  const tableState = useEditorTableStateStore()
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchInvoiceById(params.slug).then((data) => {
      tableState.setInfo(data!)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full items-start gap-x-8 px-4 sm:px-6 lg:px-8">
        <main className="flex w-full flex-col space-y-5 xl:w-[calc(0.3_*_100vw)]">
          <InvoicePreviewHeader sendOrSave="save" editVisible={false} info={tableState.invoice} />
          <EditorTabs />
          <EditorTabViewer />
        </main>

        <EditorPreview />
      </div>
    </div>
  )
}
