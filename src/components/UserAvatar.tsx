import { FC } from "react"

import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface UserAvatarProps {
  imageUrl?: string
  userName?: string
  isLarge?: boolean
}

const UserAvatar: FC<UserAvatarProps> = ({
  imageUrl,
  userName,
  isLarge = false,
}) => {
  const firstName = userName?.split(" ")[0][0]
  const lastName = userName?.split(" ")[1][0]
  const initials = firstName! + lastName!

  return (
    <Avatar className={cn("", isLarge ? "h-16 w-16" : "h-12 w-12")}>
      <AvatarImage src={imageUrl} alt="url" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
