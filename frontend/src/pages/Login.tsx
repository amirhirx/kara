import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import type { LoginPayload } from "@/types";
import { login } from "@/services/auth";
import { useUserStore } from "@/store/useUserStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.add({
        title: "Error",
        description: "Please fill all fields",
        type: "error",
      });
      return;
    }

    const payload: LoginPayload = { email, password };
    const res = await login(payload);

    if (!res) {
      toast.add({
        title: "Error",
        description: "Login failed",
        type: "error",
      });
    }

    toast.add({
      title: "Welcome back!",
      description: "login successful",
    });
    navigate("/");
    setUser(res.user);
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-8 px-4 bg-muted">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-bold">Welcome Back!</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="mt-4 flex flex-col gap-2">
            <Button type="submit" className="w-full py-4">
              Login
            </Button>
            <Link to="/signUp">Don't have an account? Sign up</Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
