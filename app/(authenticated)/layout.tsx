export const dynamic = "force-dynamic";

import LayoutClient from "./layout-client";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutClient> {children} </LayoutClient>
}
