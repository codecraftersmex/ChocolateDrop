"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { PasswordDialog } from "@/components/dashboard/password-dialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from "@/lib/contexts/auth-context";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return <PasswordDialog onAuthenticated={login} open={true} />;
  }

  return (
    <SidebarProvider className="overflow-x-clip">
      <AppSidebar />
      <main
        className={`
          mobile-vh-fix flex min-w-0 flex-1 flex-col overflow-x-clip
          bg-background
        `}
      >
        <DashboardHeader />
        <div className="min-w-0 flex-1 overflow-x-clip">{children}</div>
      </main>
    </SidebarProvider>
  );
}

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardContent>{children}</DashboardContent>
    </AuthProvider>
  );
}
