import { FC } from "react"
import { usePDF } from "react-to-pdf"
import EditorPreviewDetails from "./EditorPreviewDetails"
import EditorPreviewTable from "./EditorPreviewTable"

interface EditorPreviewProps {}

const EditorPreview: FC<EditorPreviewProps> = ({}) => {
  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" })
  return (
    <aside className="sticky top-8 hidden flex-1 shrink-0 rounded bg-white xl:block">
      {/* <Button onClick={() => toPDF(options)}>Download</Button> */}
      <div ref={targetRef}>
        <div className="m-5">
          <EditorPreviewDetails />
          <EditorPreviewTable />
        </div>
      </div>
    </aside>
  )
}

export default EditorPreview
