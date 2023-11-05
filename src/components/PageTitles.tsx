"use client"

import { FC } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface PageTitlesProps {
  title: string
}

const PageTitles: FC<PageTitlesProps> = ({ title }) => {
  return (
    <AnimatePresence>
      <motion.h3
        key={title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-foreground text-base font-semibold leading-6"
      >
        {title}
      </motion.h3>
    </AnimatePresence>
  )
}

export default PageTitles
