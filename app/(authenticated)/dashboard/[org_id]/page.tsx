import { getUserProfile } from "@/lib/user-actions"
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/ui/loading"
import MentorDashboard from './_components/MentorDashboard';
import StudentDashboard from "./_components/StudentDashboard";
export default async function UserDashboard(){
    const {user, isMentor} = await getUserProfile();

    if(!user){
        redirect("/login");
    }

    return(
        <Suspense fallback={<Loading/>}>
                <main>
                    {isMentor ? <MentorDashboard/>:<StudentDashboard/>}
                </main>
        </Suspense>
    )
}