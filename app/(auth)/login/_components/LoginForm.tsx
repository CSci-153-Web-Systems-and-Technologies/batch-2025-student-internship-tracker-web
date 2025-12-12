"use client";
import { useActionState } from "react";
import Link from "next/link";
import { Rocket, ArrowLeft } from "lucide-react";
import { login } from "@/lib/auth-actions";
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
import { useRouter } from "next/navigation";  

const initialState = { error: "" };

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);
  const router = useRouter();   

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
      <CardHeader>
         <button
          onClick={() => router.push('/')}
          className="flex items-center text-slate-300 hover:text-white mb-4 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center text-white">Login</CardTitle>
        <CardDescription className="text-center text-slate-400">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction}>
          <div className="grid gap-4">

            {state.error && (
              <div className="text-center text-red-400 text-sm">
                {state.error}
              </div>
            )}

            <div className="grid gap-2">
              <Label className="text-slate-300" htmlFor="email">
                Email
              </Label>
              <Input
                className="border-slate-400 text-white"
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label className="text-slate-300" htmlFor="password">
                  Password
                </Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline text-blue-400 hover:text-blue-300 transition-color"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                className="border-slate-400 text-white"
                id="password"
                name="password"
                type="password"
                placeholder="*****"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Login
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="underline text-blue-400 hover:text-blue-300 transition-color"
          >
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
