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
import { useEffect, useState } from "react";
import type { Project } from "@/types";
import { createProject, getAllProjects } from "@/services/projects";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export default function AppSidebar() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const [projects, setProjects] = useState<Project[] | null>(null);
  const [isCreatingDialogOpen, setIsCreatingDialogOpen] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  useEffect(() => {
    getAllProjects().then((res) => setProjects(res.projects));
  }, []);

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

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("project-title") as string;
    const description = formData.get("project-description") as string;

    if (!title.trim()) {
      toast.add({
        title: "Title is missing",
        description: "project must have title",
      });
    } else {
      setIsSubmiting(true);
      try {
        const res = await createProject({ title, description });
        if (res.project) {
          setProjects((prev) =>
            prev ? [...prev, res.project] : [res.project],
          );
          toast.add({ title: "Project created" });
        }
        setIsCreatingDialogOpen(false);
      } catch (error) {
        console.log(error);
        toast.add({
          title: "Error",
          description: "Failed to create project",
          type: "error",
        });
      } finally {
        setIsSubmiting(false);
      }
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
            <Dialog
              open={isCreatingDialogOpen}
              onOpenChange={setIsCreatingDialogOpen}
            >
              <DialogTrigger
                render={
                  <SidebarMenuButton>
                    <Plus />
                    <span>New Projects</span>
                  </SidebarMenuButton>
                }
              />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a new project</DialogTitle>
                  <DialogClose />
                </DialogHeader>
                <form
                  className="flex flex-col gap-2.5"
                  onSubmit={handleCreateProject}
                >
                  <Label htmlFor="project-title">Title</Label>
                  <Input
                    id="project-title"
                    name="project-title"
                    type="text"
                    placeholder="title"
                  />
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    name="project-description"
                    placeholder="description"
                  />
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreatingDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmiting}>
                      Create Project
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          {projects && (
            <SidebarGroupContent>
              {projects.map(({ _id, title }) => (
                <SidebarMenuItem key={_id}>
                  <SidebarMenuButton>
                    <Folder />
                    <span>{title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          )}
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
