import { FC } from "react"

import { useEditorTableStateStore } from "@/lib/stores/editor-table"
import { InvoiceTableItem } from "@/lib/types"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface FieldAccordianProps {
  items: InvoiceTableItem[]
}

const FieldAccordian: FC<FieldAccordianProps> = ({ items }) => {
  const table = useEditorTableStateStore()
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full xl:w-[calc(0.3_*_100vw)]"
    >
      {items.map((item, index) => {
        return (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <form className="grid grid-cols-2 gap-5 px-1">
                <div className="grid gap-y-3">
                  <Label>Item Title</Label>
                  <Input
                    placeholder="Pet Sitting May 2023"
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const newItem: InvoiceTableItem = {
                        ...item,
                        title: e.target.value,
                      }
                      table.updateInvoiceItem(newItem)
                    }}
                  />
                </div>
                <div className="grid gap-y-3">
                  <Label>Item Description</Label>
                  <Input
                    placeholder="Pet Sitting"
                    type="text"
                    value={item.description}
                    onChange={(e) => {
                      const newItem: InvoiceTableItem = {
                        ...item,
                        description: e.target.value,
                      }
                      table.updateInvoiceItem(newItem)
                    }}
                  />
                </div>
                <div className="grid gap-y-3">
                  <Label>Item Hours</Label>
                  <Input
                    placeholder="5"
                    type="number"
                    value={item.hours}
                    onChange={(e) => {
                      const newItem: InvoiceTableItem = {
                        ...item,
                        hours: e.target.value,
                      }
                      table.updateInvoiceItem(newItem)
                    }}
                  />
                </div>
                <div className="grid gap-y-3">
                  <Label>Item Rate</Label>
                  <Input
                    placeholder="100"
                    type="number"
                    value={item.rate}
                    onChange={(e) => {
                      const newItem: InvoiceTableItem = {
                        ...item,
                        rate: e.target.value,
                      }
                      table.updateInvoiceItem(newItem)
                    }}
                  />
                </div>
              </form>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default FieldAccordian
