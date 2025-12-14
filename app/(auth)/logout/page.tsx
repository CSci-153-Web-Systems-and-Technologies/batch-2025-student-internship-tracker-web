"use client";

import { LogoutButton } from "@/components/logout-button";

export default function LogoutPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <p>You are about to log out.</p>
      <LogoutButton />
    </div>
  );
}