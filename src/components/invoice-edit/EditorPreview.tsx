"use client"

import { FC } from "react"
import { motion } from "framer-motion"
import { Margin, Options, usePDF } from "react-to-pdf"

import EditorPreviewDetails from "./EditorPreviewDetails"
import EditorPreviewTable from "./EditorPreviewTable"

const options: Options = {
  page: {
    margin: Margin.LARGE,
  },
}

interface EditorPreviewProps {}

const EditorPreview: FC<EditorPreviewProps> = ({}) => {
  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" })
  return (
    <motion.aside
      // slide down
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="sticky top-28 hidden flex-1 shrink-0 rounded bg-white xl:block"
    >
      {/* <Button onClick={() => toPDF(options)}>Download</Button> */}
      <div ref={targetRef}>
        <div className="m-7">
          <EditorPreviewDetails />
          <EditorPreviewTable />
        </div>
      </div>
    </motion.aside>
  )
}

export default EditorPreview
