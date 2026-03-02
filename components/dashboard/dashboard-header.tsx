"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/lib/contexts/auth-context";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const getPageTitle = () => {
    if (pathname.startsWith("/dashboard/orders")) {
      return "Pedidos";
    }

    if (pathname.startsWith("/dashboard/events")) {
      return "Eventos";
    }

    return "Dashboard";
  };

  return (
    <header
      className={`
        sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur
        supports-[backdrop-filter]:bg-white/60
      `}
    >
      <div
        className={`
          flex min-h-14 items-center gap-1 px-3
          pt-[env(safe-area-inset-top)]
          sm:px-4
        `}
      >
        <SidebarTrigger className="h-9 w-9 shrink-0" />
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            {getPageTitle()}
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              className={`
                hidden text-gray-600
                hover:text-gray-900
                sm:flex
              `}
              onClick={logout}
              size="sm"
              variant="ghost"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
