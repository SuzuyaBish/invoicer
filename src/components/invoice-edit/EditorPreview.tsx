"use client"

import { FC } from "react"
import { motion } from "framer-motion"
import { Margin, Options, usePDF } from "react-to-pdf"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import EditorPreviewDetails from "./EditorPreviewDetails"
import EditorPreviewTable from "./EditorPreviewTable"

const options: Options = {
  page: {
    margin: Margin.LARGE,
  },
}

interface EditorPreviewProps {
  downloadView?: boolean
}

const EditorPreview: FC<EditorPreviewProps> = ({ downloadView }) => {
  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" })
  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className={cn(
        "sticky top-28 flex-1 shrink-0 rounded",
        downloadView ? "mx-auto xl:w-[70%]" : "hidden xl:block"
      )}
    >
      {downloadView && (
        <div className="flex items-end">
          <Button onClick={() => toPDF(options)} className="ml-auto">
            Download
          </Button>
        </div>
      )}
      <div ref={targetRef} className="bg-white">
        <div className="m-7 pb-10 pt-20">
          <EditorPreviewDetails />
          <EditorPreviewTable />
        </div>
      </div>
    </motion.aside>
  )
}

export default EditorPreview
