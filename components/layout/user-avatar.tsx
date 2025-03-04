import { AvatarProps } from "@radix-ui/react-avatar"
 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserType } from "@/types/user"
import { User2 } from "lucide-react"

interface UserAvatarProps extends AvatarProps {
  user: UserType
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.photoURL ? (
        <AvatarImage alt="Picture" src={user.photoURL} referrerPolicy="no-referrer" />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.displayName}</span>
          <User2 className="size-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
