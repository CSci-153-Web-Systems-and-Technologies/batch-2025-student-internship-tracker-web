"use client"
import { CreateOrganization } from "@/lib/org-actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Rocket ,ArrowLeft} from "lucide-react";

export default function CreateOrgForm() {
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
          <form action={CreateOrganization}>
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <CardTitle className="text-white">Create New Organization</CardTitle>
                <CardDescription className="text-slate-400">
                  Set up your organization to start collaborating
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Organization Name</Label>
                <Input id="name" name="name" type="text" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" />
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                Create Organization
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
