"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Mail } from "lucide-react";
import { useRouter } from "next/navigation";


export default function CheckEmailPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full"></div>
      </div>

      <div className="relative w-full max-w-md">
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-white">Check your email</CardTitle>
              <CardDescription className="text-slate-400">
                We've sent you a verification link to your email address. Please check your inbox and click the link to continue.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 text-center">
              <p className="text-slate-400">
                Didn't receive the email? Check your spam folder or try again in a few minutes.
              </p>
            </div>
            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick= {() => router.push('/login')}
            >
              Back to Login
            </Button>
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <Rocket className="w-4 h-4" />
              <span>LaunchPad</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}