"use client";

import { useRouter } from "next/navigation";
import { Bell, CheckCircle } from "lucide-react";
import { Notification } from "@/types";
import { markAsRead } from "@/lib/dashboard-actions";

interface NotificationProp{
  notif: Notification
}
export default function NotificationItem({ notif }:NotificationProp) {
  const router = useRouter();

  const handleMarkRead = async () => {
  try {
    await markAsRead(notif);
    router.refresh();
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div
      className={`p-4 rounded-xl border cursor-pointer transition-all ${
        notif.is_read
          ? "border-slate-700 bg-slate-800/50"
          : "border-blue-500/30 bg-blue-700/20"
      }`}
      onClick={()=>handleMarkRead}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-white">{notif.title}</h3>
          <p className="text-gray-300">{notif.message}</p>

          <span className="text-xs text-gray-400">
            {new Date(notif.created_at).toLocaleString()}
          </span>
        </div>

        {notif.is_read ? (
          <CheckCircle className="text-green-400" size={22} />
        ) : (
          <Bell className="text-blue-400" size={22} />
        )}
      </div>
    </div>
  );
}
