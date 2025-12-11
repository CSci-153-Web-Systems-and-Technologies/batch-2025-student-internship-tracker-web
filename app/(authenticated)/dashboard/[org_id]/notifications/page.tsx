import NotificationList from "./_components/NotificationList";
import { getNotification } from "@/lib/dashboard-actions";




export default async function NotificationsPage(props: { params: Promise<{ org_id: string }> }) {
  const { org_id } = await props.params;
  const { data: notifications, error } = await getNotification(org_id);

  if (!notifications || error) {
    console.error("Failed to fetch notifications:", error);
    return <div>Error loading notifications</div>;
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-white">Notifications</h1>
      <NotificationList notifications={notifications} />
    </main>
  );
}