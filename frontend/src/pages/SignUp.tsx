import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/toast";
import { signUp } from "@/services/auth";
import { useUserStore } from "@/store/useUserStore";
import type { SignUpPayload } from "@/types";
import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload: SignUpPayload = {
      firstName,
      email,
      lastName,
      password,
    };

    if (!firstName || !lastName || !email || !password) {
      toast.add({
        title: "Error",
        description: "Please fill all fields",
        type: "error",
      });
      return;
    }

    if (password.length < 8) {
      toast.add({
        title: "Error",
        description: "Password must be at least 8 characters",
        type: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.add({
        title: "Error",
        description: "Passwords do not match",
        type: "error",
      });
      return;
    }

    const res = await signUp(payload);

    if (!res || res.message) {
      toast.add({
        title: "Error",
        description: res?.message || "Sign up failed",
        type: "error",
      });
      return;
    }

    toast.add({ title: "Success", description: "Account created!" });
    navigate("/");
    setUser(res.user);
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create an account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2 mb-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <Link to="/login">Already have an account? Sign in</Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
