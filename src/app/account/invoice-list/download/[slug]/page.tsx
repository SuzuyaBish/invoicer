"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { fetchInvoiceById } from "@/lib/functions"
import { useEditorTableStateStore } from "@/lib/stores/editor-table"
import EditorPreview from "@/components/invoice-edit/EditorPreview"

export default function DownloadInvoicePage({
  params,
}: {
  params: { slug: string }
}) {
  const [loading, setLoading] = useState(true)
  const tableState = useEditorTableStateStore()
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchInvoiceById(params.slug, supabase).then((data) => {
      tableState.setInfo(data!)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="relative min-h-full items-center justify-center">
      <EditorPreview downloadView />
    </div>
  )
}
