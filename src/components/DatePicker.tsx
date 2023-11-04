"use client"

import { FC } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { useEditorInformationStore } from "@/lib/stores/editor-information"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date: Date 
  setDate: (date: number) => void
}

const DatePicker: FC<DatePickerProps> = ({ date, setDate }) => {
  const info = useEditorInformationStore()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date.toString()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date !== undefined ? Date.parse(date.toISOString()) : Date.now())
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
