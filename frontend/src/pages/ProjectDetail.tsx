import SidebarLayout from "@/components/layouts/SidebarLayouts";
import { toast } from "@/components/ui/toast";
import { getProjectById } from "@/services/projects";
import type { Project } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, LayoutDashboard, Settings } from "lucide-react";

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
        <div className="p-2">
          <div className="px-4 py-2">
            <Breadcrumb className="hidden lg:block">
              <BreadcrumbList>
                <BreadcrumbLink render={<a href="/projects" />}>
                  Projects
                </BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbLink render={<a href={`/projects/${id}`} />}>
                  {project?.title}
                </BreadcrumbLink>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Tabs>
            <TabsList variant="line">
              <TabsTrigger value="overview">
                <LayoutDashboard /> Overview
              </TabsTrigger>
              <TabsTrigger value="tasks">
                <CheckCircle /> Tasks
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings /> Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-2 py-2 px-4">
              <h1 className="text-2xl font-bold line-clamp-1">
                {project?.title}
              </h1>
              <p>{project?.description}</p>
            </TabsContent>
            <TabsContent value="tasks">
              <p>Tasks content goes here.</p>
            </TabsContent>
            <TabsContent value="settings">
              <p>Settings content goes here.</p>
            </TabsContent>
            <TabsContent value="notebook">
              <p>Notebook content goes here.</p>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </SidebarLayout>
  );
}
