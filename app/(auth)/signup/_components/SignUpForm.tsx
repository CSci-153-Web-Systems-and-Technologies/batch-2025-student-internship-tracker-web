'use client';
import Link from "next/link";
import { Rocket,ArrowLeft} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/auth-actions";
import { useRouter } from "next/navigation";
export function SignUpForm() {
  const router = useRouter();
  
  return (
    <div className="mx-auto max-w-sm">
      <Button
        variant="ghost"
        onClick={() => router.push('/login')}
        className="flex items-center gap-1 text-slate-300 hover:text-black mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <Card className="mx-auto max-w-sm bg-slate-900/50 border-slate-800 backdrop-blur-sm">
       <div className="flex justify-center pt-6">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
       </div>
      <CardHeader>
        
        <CardTitle className="text-xl text-center text-white">Create your account</CardTitle>
        <CardDescription className="text-center text-slate-400">
          Join LaunchPad and start building amazing things
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action="">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-slate-300" htmlFor="first-name">First name</Label>
                <Input
                  name="first-name"
                  id="first-name"
                  placeholder="James&lsquo;&lsquo;nel&rsquo;&rsquo;"
                  className="border rounded-md p-2 bg-slate-950/50 border-slate-700 text-white"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-slate-300" htmlFor="last-name">Last name</Label>
                <Input
                  name="last-name"
                  id="last-name"
                  placeholder="Chavez"
                  className="border rounded-md p-2 bg-slate-950/50 border-slate-700 text-white"
                  required
                  
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-slate-300" htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                className="border rounded-md p-2 bg-slate-950/50 border-slate-700 text-white"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-slate-300 " htmlFor="password">Password</Label>
              <Input 
                name="password" 
                id="password" 
                type="password"
                className="border rounded-md p-2 bg-slate-950/50 border-slate-700 text-white"
                placeholder="*****"
                required
                />
            </div>
            <div className="grid gap-2">
              <Label className="text-slate-300 " htmlFor="role">Account Type</Label>
                <select 
                  id="role"
                  name="role"
                  className="border rounded-md p-2 bg-slate-950/50 border-slate-700 text-white"
                  required
                >
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                </select>
            </div>
            <Button formAction={signup} type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Create an account
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="underline text-blue-400 hover:text-blue-300 transition-color">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>
    
  );
}