import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { UserNav } from "./user-nav";

const Sidebar = dynamic(() => import("./sidebar"), { ssr: false });

export default function LayoutAdmin(page: ReactElement) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signin");
    }
  }, [router]);

  return (
    <div className="admin-page-shell relative h-screen w-full">
      <div className="fixed h-screen min-w-[240px] max-w-[240px] overflow-y-auto border-r border-border bg-card/70 p-4 backdrop-blur">
        <Sidebar />
      </div>
      <div className="absolute left-[240px] right-0">
        <div className="sticky top-0 z-50 flex max-h-[56px] min-h-[56px] w-full items-center justify-between border-b border-border bg-background/85 px-6 backdrop-blur">
          <div className="flex flex-1 items-center justify-end space-x-4">
            <UserNav />
          </div>
        </div>
        <main className="min-h-[calc(100vh-56px)] bg-background px-6 py-6 text-foreground">
          {page}
        </main>
      </div>
    </div>
  );
}
