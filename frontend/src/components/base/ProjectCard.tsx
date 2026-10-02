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
import { Archive, Link2, MoreVertical, Trash } from "lucide-react";
import {
  archiveProject,
  deleteProject,
  unArchiveProject,
} from "@/services/projects";
import { toast } from "../ui/toast";
import { Link } from "react-router-dom";

export default function ProjectCard({
  _id,
  title,
  description,
  isArchived,
}: Project) {
  const projectPath = `/projects/${_id}`;

  const handleDeleteProject = async () => {
    const res = await deleteProject({ id: _id });
    if (!res) {
      toast.add({ title: "Failed to delete project" });
      return;
    }

    toast.add({ title: "Project is deleted" });
  };

  const handleArchiveOrUnArchiveProject = async () => {
    const res = isArchived
      ? await unArchiveProject({ id: _id })
      : await archiveProject({ id: _id });

    if (!res) {
      toast.add({ title: "Failed to unarchived project" });
      return;
    }

    toast.add({ title: "Project is archived" });
  };

  return (
    <Card>
      <CardHeader>
        <Link to={projectPath}>
          <CardTitle>{title}</CardTitle>
        </Link>
        <CardAction>
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
              {/* <DropdownMenuItem>
                <Edit />
                Edit
              </DropdownMenuItem> */}
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
