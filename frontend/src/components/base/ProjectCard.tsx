import type { Project } from "@/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Archive, Edit, Link2, MoreVertical, Trash } from "lucide-react";
import {
  archiveProject,
  deleteProject,
  unArchiveProject,
  updateProjectById,
} from "@/services/projects";
import { toast } from "../ui/toast";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function ProjectCard({
  _id,
  title,
  description,
  isArchived,
}: Project) {
  const projectPath = `/projects/${_id}`;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEditPending, setIsEditPending] = useState(false);

  const handleDeleteProject = async () => {
    const res = await deleteProject({ id: _id });
    if (!res) {
      toast.add({ title: "Failed to delete project", type: "error" });
      return;
    }

    toast.add({ title: "Project is deleted" });
  };

  const handleArchiveOrUnArchiveProject = async () => {
    const res = isArchived
      ? await unArchiveProject({ id: _id })
      : await archiveProject({ id: _id });

    if (!res) {
      toast.add({ title: "Failed to unarchived project", type: "error" });
      return;
    }

    toast.add({ title: "Project is archived" });
  };

  const handleEditProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("project-title") as string;
    const description = formData.get("project-description") as string;

    setIsEditPending(true);
    const res = await updateProjectById({
      id: _id,
      updated: { title, description },
    });

    if (!res) {
      toast.add({ title: "Failed to edit project", type: "error" });
      return;
    }

    toast.add({ title: "Project updated successfully" });
    setIsEditDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <Link to={projectPath}>
          <CardTitle>{title}</CardTitle>
        </Link>
        <CardAction>
          <Dialog
            triggerId={"edit-project-dialog"}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit</DialogTitle>
              </DialogHeader>
              <form
                className="flex flex-col gap-2.5"
                onSubmit={handleEditProject}
              >
                <Label htmlFor="project-title">Title</Label>
                <Input
                  id="project-title"
                  name="project-title"
                  type="text"
                  placeholder="e.g. Landing page redesign"
                  autoFocus
                  defaultValue={title}
                />
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  name="project-description"
                  placeholder="description"
                  defaultValue={description}
                />
                <DialogFooter>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isEditPending}>
                    Update
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Link to={projectPath}>
                <DropdownMenuItem>
                  <Link2 />
                  Open
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <Edit />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClickCapture={handleArchiveOrUnArchiveProject}
              >
                <Archive />
                {isArchived ? "Unarchive" : "Archive"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDeleteProject}
                variant="destructive"
              >
                <Trash />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Link to={projectPath}>
          <CardDescription>{description}</CardDescription>
        </Link>
      </CardContent>
    </Card>
  );
}
