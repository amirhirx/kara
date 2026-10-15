import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/types";
import {
  ChartNoAxesColumnIncreasing,
  CircleCheck,
  History,
  ListTodo,
  Users,
} from "lucide-react";

export default function ProjectOverview(project: Project) {
  return (
    <div>
      <div className="py-4">
        <h1 className="text-2xl font-bold line-clamp-1">{project?.title}</h1>
        <p>{project?.description}</p>
      </div>
      <div>
        <h2 className="text-lg font-medium">At a glance</h2>
        <div className="grid lg:grid-cols-4 grid-cols-2 my-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-3xl">10</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="flex items-center gap-2">
                <ListTodo className="size-4" aria-hidden="true" />
                All tasks
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">10 / 24</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="flex items-center gap-2">
                <CircleCheck className="size-4" aria-hidden="true" />
                Completed tasks
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">6</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="flex items-center gap-2">
                <Users className="size-4" aria-hidden="true" /> Team members
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-3xl">25%</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="flex items-center gap-2">
                <ChartNoAxesColumnIncreasing
                  className="size-4"
                  aria-hidden="true"
                />
                Overall progress
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <History className="size-4" /> Recent tasks
        </h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>task 1</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>task 2</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>task 3</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
