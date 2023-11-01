import { clients } from "@/constants/constants"

import { Button } from "@/components/ui/button"
import ClientBlock from "@/components/clients/ClientBlock"

export default function ClientsPage() {
  return (
    <div className="relative pb-5 sm:pb-0">
      <div className="md:flex md:items-center md:justify-between">
        <h3 className="text-foreground text-base font-semibold leading-6">
          Clients
        </h3>
        <div className="mt-3 flex md:absolute md:right-0 md:mt-0">
          <Button>Create</Button>
        </div>
      </div>
      <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
        {clients.map((client) => (
          <>
            <ClientBlock key={client.name} {...client} />
            <ClientBlock key={client.name} {...client} />
          </>
        ))}
      </ul>
    </div>
  )
}
