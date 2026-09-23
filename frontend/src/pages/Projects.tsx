import ProjectCard from "@/components/base/ProjectCard";
import SidebarLayout from "@/components/layouts/SidebarLayouts";
import { toast } from "@/components/ui/toast";
import { getAllProjects } from "@/services/projects";
import type { Project } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <div className="py-6 px-8 space-y-4">
        <h1 className="font-bold text-xl">Projects</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <section className="space-y-4">
            {projects ? (
              projects.length > 0 ? (
                projects.map((p) => {
                  return (
                    <Link
                      to={`/projects/${p._id}`}
                      key={`project-${p._id}`}
                      className="block"
                    >
                      <ProjectCard {...p} />
                    </Link>
                  );
                })
              ) : (
                <p>empty projects</p>
              )
            ) : (
              <p>Error!</p>
            )}
          </section>
        )}
      </div>
    </SidebarLayout>
  );
}
