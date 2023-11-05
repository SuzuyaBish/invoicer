"use client"

import { FC } from "react"
import { AnimatePresence } from "framer-motion"

import { Client } from "@/lib/types"

import ClientBlock from "./ClientBlock"

interface ClientListProps {
  clients: Client[]
}

const ClientList: FC<ClientListProps> = ({ clients }) => {
  return (
    <AnimatePresence>
      {clients.map((client, idx) => (
        <ClientBlock key={client.name} {...client} idx={idx} />
      ))}
    </AnimatePresence>
  )
}

export default ClientList
