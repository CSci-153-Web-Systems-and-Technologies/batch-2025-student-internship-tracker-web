"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getUserProfile } from "@/lib/org-actions";

export function useSidebarData() {
  const { org_id } = useParams() as { org_id: string };
  const [inviteCode, setInviteCode] = useState("");
  const [isMentor, setIsMentor] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const { data: org } = await supabase
        .from("organizations")
        .select("invite_code")
        .eq("id", org_id)
        .single();

      if (org?.invite_code) setInviteCode(org.invite_code);

      const { isMentor } = await getUserProfile();
      setIsMentor(isMentor);
    }

    load();
  }, [org_id]);

  return { inviteCode, isMentor, org_id };
}