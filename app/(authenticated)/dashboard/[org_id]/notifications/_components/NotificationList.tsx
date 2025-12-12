// app/dashboard/notifications/NotificationList.tsx
import NotificationItem from "./NotificationItem";
import {Notification} from "@/types"

interface NotificationProps{
    notifications: Notification[];
}

export default function NotificationList({ notifications }: NotificationProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-gray-400 text-center py-10">
        No notifications yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notif) => (
        <NotificationItem key={notif.id} notif={notif} />
      ))}
    </div>
  );
}
