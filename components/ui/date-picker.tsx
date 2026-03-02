"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"

interface DatePickerProps {
  className?: string
  date?: Date
  disabled?: (date: Date) => boolean
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
}

export function DatePicker({
  className,
  date,
  disabled,
  onDateChange,
  placeholder = "Selecciona una fecha",
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            `
              h-10 w-full justify-start text-left font-normal
              data-[empty=true]:text-muted-foreground
            `,
            className
          )}
          data-empty={!date}
          variant="outline"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: es }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 ">
        <Calendar
          disabled={disabled}
          mode="single"
          onSelect={onDateChange}
          selected={date}
        />
      </PopoverContent>
    </Popover>
  )
}