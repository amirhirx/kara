import SidebarLayout from "@/components/layouts/SidebarLayouts";
import { toast } from "@/components/ui/toast";
import { getProjectById } from "@/services/projects";
import type { Project } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProjectById({ id: id as string })
      .then((res) => {
        console.log(res);
        if (res.project) {
          setProject(res.project);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.add({
          title: "Error",
          type: "error",
          description: "Failed to get project",
        });
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <SidebarLayout>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="py-4 md:px-8 px-2 space-y-2">
          <h1 className="text-xl font-bold line-clamp-1">{project?.title}</h1>
          <p className="line-clamp-3">{project?.description}</p>
        </div>
      )}
    </SidebarLayout>
  );
}
