import {NavBar} from "@/components/navbar-unauthenticated";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}