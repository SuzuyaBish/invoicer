import { FC } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface UserAvatarProps {
  imageUrl?: string
}

const UserAvatar: FC<UserAvatarProps> = ({imageUrl}) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
