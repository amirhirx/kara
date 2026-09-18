import {
  ChevronsUpDown,
  Folder,
  LogOut,
  Plus,
  Settings,
  User,
} from "lucide-react";
import {
  SidebarHeader,
  SidebarFooter,
  Sidebar,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useUserStore } from "@/store/useUserStore";
import { logout } from "@/services/auth";
import { toast } from "../ui/toast";
import { useNavigate } from "react-router-dom";

const projects = [
  { id: 1, name: "test 1" },
  { id: 2, name: "test 2" },
  { id: 3, name: "test 3" },
  { id: 4, name: "test 4" },
  { id: 5, name: "test 5" },
];

export default function AppSidebar() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      clearUser();
      toast.add({ title: "Logout", description: "logout successfully" });
      navigate("/login");
    } else {
      toast.add({
        title: "Logout",
        description: "logout failed",
        type: "error",
      });
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold group-data-[collapsible=icon]:hidden">
            Kara
          </h1>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Projects</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            {projects.map(({ id, name }) => (
              <SidebarMenuItem key={id}>
                <SidebarMenuButton>
                  <Folder />
                  <span>{name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="w-full"
                render={
                  <SidebarMenuButton>
                    <div className="flex items-center gap-2 w-full">
                      <User />
                      <span>
                        {user?.firstName} {user?.lastName}
                      </span>
                    </div>
                    <ChevronsUpDown />
                  </SidebarMenuButton>
                }
              />
              <DropdownMenuContent className="space-y-1">
                <DropdownMenuItem>
                  <User />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <LogOut />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
