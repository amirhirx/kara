import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../base/AppSidebar";
import { Link } from "react-router-dom";

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
            <Link to="/" className="font-bold">
              Kara
            </Link>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </SidebarProvider>
  );
}
