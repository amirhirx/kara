import { ChevronsUpDown, Folder, LogOut, Plus, Settings } from "lucide-react";
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
import { Link, useNavigate } from "react-router-dom";
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
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function AppSidebar() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const [projects, setProjects] = useState<Project[] | null>(null);
  const [isCreatingDialogOpen, setIsCreatingDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!title) {
      toast.add({
        title: "Title is missing",
        description: "Project must have a title",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createProject({ title, description });

      if (!res || !res.project) {
        toast.add({
          title: "Error",
          description: res?.message ?? "Failed to create project",
          type: "error",
        });
        return;
      }

      setProjects((prev) => (prev ? [...prev, res.project] : [res.project]));
      toast.add({
        title: "Project created",
        description: `"${res.project.title}" added`,
      });

      setIsCreatingDialogOpen(false);
    } catch (error) {
      console.log(error);

      toast.add({
        title: "Unexpected error",
        description: "Please try again",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold group-data-[collapsible=icon]:hidden">
            <Link to="/">Kara</Link>
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
                    placeholder="e.g. Landing page redesign"
                    autoFocus
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
                      type="button"
                      onClick={() => setIsCreatingDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      Create Project
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link to="/projects">Projects</Link>
          </SidebarGroupLabel>
          {projects && (
            <SidebarGroupContent>
              {projects.map(({ _id, title }) => (
                <Link key={_id} to={`/projects/${_id}`}>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Folder />
                      <span>{title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
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
                render={
                  <SidebarMenuButton>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarFallback>
                          {user?.firstName[0]}
                          {user?.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span>
                        {user?.firstName} {user?.lastName}
                      </span>
                      <ChevronsUpDown />
                    </div>
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
