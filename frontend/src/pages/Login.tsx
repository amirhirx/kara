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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login: ", { email, password });
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
          <CardFooter className="mt-4">
            <Button type="submit" className="w-full py-4">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
