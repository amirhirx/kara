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

  return (
    <div className="w-full">
      {user ? <p>Welcome {user.firstName}!</p> : <p>Login/Sign up</p>}
    </div>
  );
}
