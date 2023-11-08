"use client"

import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

import EditorDetails from "./EditorDetails"
import EditorFields from "./EditorFields"
import EditorGeneral from "./EditorGeneral"

export default function EditorTabViewer() {
  const searchParams = useSearchParams()
  const currentSection = searchParams.get("section")
  const tabPages = [
    <EditorGeneral key={1} />,
    <EditorDetails key={2} />,
    <EditorFields key={3} />,
  ]
  return (
    <AnimatePresence>
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className="border-b pb-12"
      >
        {
          tabPages[
            currentSection === "general"
              ? 0
              : currentSection === "details"
              ? 1
              : 2
          ]
        }
      </motion.div>
    </AnimatePresence>
  )
}
