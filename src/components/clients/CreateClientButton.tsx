"use client"

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { PersonIcon } from "@radix-ui/react-icons"

import { createClient } from "@/lib/actions"

import { Icons } from "../Icons"
import { Button } from "../ui/button"

interface CreateClientButtonProps {}

const CreateClientButton: FC<CreateClientButtonProps> = ({}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  return (
    <Button
      variant="secondary"
      disabled={loading}
      onClick={async () => {
        setLoading(true)
        await createClient().then((res) => {
          if (res) {
            router.replace(`/account/clients/edit/${res}`)
          }
          setLoading(false)
        })
      }}
    >
      {loading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <PersonIcon className="mr-2 h-4 w-4" />
      )}
      Create Client
    </Button>
  )
}

export default CreateClientButton
