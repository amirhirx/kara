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
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Create an account</CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full">
            Sign in
          </Button>
          <Link to="/login">Already have an account? Sign in</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
