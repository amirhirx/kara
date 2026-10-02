import ProjectCard from "@/components/base/ProjectCard";
import SidebarLayout from "@/components/layouts/SidebarLayouts";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { toast } from "@/components/ui/toast";
import { getAllProjects } from "@/services/projects";
import type { Project } from "@/types";
import { Folder } from "lucide-react";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllProjects()
      .then((res) => {
        if (res.projects) {
          setProjects(res.projects);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.add({
          title: "Error",
          description: "Failed to get projects",
          type: "erro",
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <SidebarLayout>
      <div className="py-6 lg:px-8 px-4 space-y-4">
        <h1 className="font-bold text-xl">Projects</h1>
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <section className="space-y-4">
              {projects ? (
                projects.length > 0 ? (
                  projects.map((p) => {
                    return <ProjectCard key={`project-${p._id}`} {...p} />;
                  })
                ) : (
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Folder />
                      </EmptyMedia>
                      <EmptyTitle>No Projects Yet</EmptyTitle>
                      <EmptyDescription>
                        You haven't created any projects yet. <br />
                        Get started by creating your first project.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )
              ) : (
                <p>Error!</p>
              )}
            </section>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}
