import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { User, UserRoles } from "@/types";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical, Trash } from "lucide-react";
export default function MemberCard({
  user,
  role,
  canRemove = false,
  onRemove,
}: {
  user: User;
  role: UserRoles;
  canRemove?: boolean;
  onRemove?: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        {canRemove && (
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem variant="destructive" onClick={onRemove}>
                  <Trash /> Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        )}
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarFallback>
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>
              <span className="mx-1">
                {user.firstName} {user.lastName}
              </span>
              <Badge>{role}</Badge>
            </CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
