import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../base/AppSidebar";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <div className="md:hidden flex items-center justify-between py-2 px-4">
          <div className="flex gap-2 items-center">
            <SidebarTrigger />
            <h2 className="font-bold">Kara</h2>
          </div>
          <Button variant="secondary">
            <Plus />
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </SidebarProvider>
  );
}
