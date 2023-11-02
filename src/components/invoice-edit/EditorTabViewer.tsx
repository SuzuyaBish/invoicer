"use client"

import { useSearchParams } from "next/navigation"

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
    <div className="border-b pb-12">
      {
        tabPages[
          currentSection === "general"
            ? 0
            : currentSection === "details"
            ? 1
            : 2
        ]
      }
    </div>
  )
}
