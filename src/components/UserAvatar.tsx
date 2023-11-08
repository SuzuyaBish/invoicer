import { FC } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface UserAvatarProps {
  imageUrl?: string
  userName?: string
}

const UserAvatar: FC<UserAvatarProps> = ({ imageUrl, userName }) => {
  const firstName = userName?.split(" ")[0][0]
  const lastName = userName?.split(" ")[1][0]
  const initials = firstName! + lastName!

  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={imageUrl} alt="url" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
