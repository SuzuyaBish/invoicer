"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

import { fetchInvoiceById } from "@/lib/functions/invoice-functions"
import { useEditorTableStateStore } from "@/lib/stores/editor-table"
import { Button } from "@/components/ui/button"
import EditorPreview from "@/components/invoice-edit/EditorPreview"
import EditorTabs from "@/components/invoice-edit/EditorTabs"
import EditorTabViewer from "@/components/invoice-edit/EditorTabViewer"
import InvoicePreviewHeader from "@/components/invoice-preview/InvoicePreviewHeader"

export default function InvoiceEdit({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState(true)
  const tableState = useEditorTableStateStore()
  const router = useRouter()

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
          <Button
            className="w-fit"
            variant="outline"
            onClick={() => {
              router.replace(`/account/invoice-list/preview/${params.slug}`)
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <div>Go Back</div>
          </Button>
          <AnimatePresence>
            <motion.div
              key="header"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InvoicePreviewHeader
                sendOrSave="save"
                copyVisible={false}
                editVisible={false}
                info={tableState.invoice}
              />
            </motion.div>
          </AnimatePresence>
          <EditorTabs />
          <EditorTabViewer />
        </main>

        <EditorPreview />
      </div>
    </div>
  )
}
