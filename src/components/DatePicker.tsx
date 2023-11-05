"use client"

import { FC } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import moment from "moment"

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
  date: string | null
  setDate: (date: string) => void
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
          {date ? format(moment(date).toDate(), "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={new Date(date!)}
          onSelect={(date) => {
            const now = moment()
            const pickedMoment = moment(date?.toDateString())
            setDate(date !== undefined ? pickedMoment.format() : now.format())
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
