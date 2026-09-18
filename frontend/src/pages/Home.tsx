import SidebarLayout from "@/components/layouts/SidebarLayouts";
import { getUserDetails } from "@/services/auth";
import type { User } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserDetails().then(({ user }) => {
      setUser(user);
    });
  }, []);

  const quote = {
    text: "Start with the smallest task you can complete.",
    type: "tip",
  };

  return (
    <SidebarLayout>
      <div className="w-full py-1 px-4">
        {user && (
          <h2 className="text-2xl font-bold">Welcome {user.firstName}!</h2>
        )}
        <div className="text-lg">{quote.text}</div>
      </div>
    </SidebarLayout>
  );
}
