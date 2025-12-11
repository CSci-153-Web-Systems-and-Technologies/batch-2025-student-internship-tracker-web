import { getUserProfile } from "@/lib/org-actions"
import { redirect } from "next/navigation";
import MentorDashboard from './_components/MentorDashboard';
import StudentDashboard from "./_components/StudentDashboard";

export default async function UserDashboard(
  props: { params: Promise<{ org_id: string }> }
) {
  const { org_id } = await props.params;

  const { user, isMentor } = await getUserProfile();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      {isMentor ? (
        <MentorDashboard org_id={org_id} />
      ) : (
        <StudentDashboard/>
      )}
    </main>
  );
}
