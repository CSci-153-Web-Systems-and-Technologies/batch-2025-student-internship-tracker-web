import {NavBar} from "@/components/navbar-main";

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