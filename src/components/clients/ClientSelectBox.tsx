"use client"

import * as React from "react"
import { FC } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Client } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ClientSelectBoxProps {
  clients: Client[]
  setSelectedClient: (client: string) => void
}

const ClientSelectBox: FC<ClientSelectBoxProps> = ({
  clients,
  setSelectedClient,
}) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? clients.find(
                (client) =>
                  client.first_name.toLowerCase() === value.toLowerCase()
              )?.first_name
            : "Select client..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-96">
          <CommandInput placeholder="Search clients..." />
          <CommandEmpty>No client found.</CommandEmpty>
          <CommandGroup className="w-full">
            {clients.map((client) => (
              <CommandItem
                key={client.id}
                value={client.first_name}
                onSelect={(currentValue: string) => {
                  setValue(currentValue === value ? "" : currentValue)

                  const selectedClientId = clients.find(
                    (client) =>
                      client.first_name.toLowerCase() ===
                      currentValue.toLowerCase()
                  )?.id
                  console.log(selectedClientId)

                  setSelectedClient(selectedClientId?.toString() || "")
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === client.first_name ? "opacity-100" : "opacity-0"
                  )}
                />
                {client.first_name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ClientSelectBox
