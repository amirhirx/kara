import type { Project } from "@/types";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

export default function ProjectCard({ title, description }: Project) {
  return (
    <Card>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
