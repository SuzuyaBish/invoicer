"use server"

import EditorPreview from "@/components/invoice-edit/EditorPreview"
import EditorTabs from "@/components/invoice-edit/EditorTabs"
import EditorTabViewer from "@/components/invoice-edit/EditorTabViewer"

export default async function InvoiceEdit({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full items-start gap-x-8 px-4 sm:px-6 lg:px-8">
        <main className="flex w-full flex-col space-y-5 xl:w-[calc(0.3_*_100vw)]">
          {/* <InvoicePreviewHeader editVisible={false} /> */}
          <EditorTabs />
          <EditorTabViewer />
        </main>

        <EditorPreview />
      </div>
    </div>
  )
}
