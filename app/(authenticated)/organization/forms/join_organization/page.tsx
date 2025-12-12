"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, ArrowLeft } from "lucide-react";
import { JoinOrganization } from "@/lib/org-actions";
import { useRouter } from "next/navigation";
export default function JoinOrgForm() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">

      <div className="relative w-full max-w-md">
        <button
          onClick={() => router.replace('/organization')}
          className="flex items-center text-slate-300 hover:text-white mb-4 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">

          <form action={JoinOrganization}>
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <CardTitle className="text-white">Join an Organization</CardTitle>
                <CardDescription className="text-slate-400">
                  Enter the invite code to join an existing organization
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteCode" className="text-slate-300">
                  Invite Code
                </Label>

                <Input
                  id="inviteCode"
                  name="inviteCode"
                  type="text"
                  required
                  placeholder="Enter invite code"
                  className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500"
                />

                <p className="text-slate-500 text-sm">
                  Your organization admin gave you this code
                </p>
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Join Organization
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
