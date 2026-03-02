"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/contexts/auth-context";
import { Calendar, LayoutDashboard, LogOut, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    icon: Package,
    title: "Pedidos",
    url: "/dashboard/orders",
  },
  {
    icon: Calendar,
    title: "Eventos",
    url: "/dashboard/events",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const { logout } = useAuth();

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const isItemActive = (url: string) => {
    if (url === "/dashboard") {
      return pathname === url;
    }

    return pathname === url || pathname.startsWith(`${url}/`);
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/40 px-4 py-1">
        <Link
          className={`
            flex items-center gap-2
            sm:pr-2
          `}
          href="/dashboard"
          onClick={handleNavClick}
        >
          <div
            className={`
              relative flex h-20 w-20 items-center justify-center
              overflow-hidden
            `}
          >
            <Image
              alt="ChocolateDrop Logo"
              className="object-contain"
              height={100}
              src="/logo.png"
              width={100}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">
              ChocolateDrop
            </span>
            <span className="text-xs text-muted-foreground">Dashboard</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2">
        <SidebarGroup>
          <SidebarGroupLabel
            className={`
              mb-3 text-sm font-semibold tracking-wider text-muted-foreground
              uppercase
              sm:text-base
            `}
          >
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`
                      w-full justify-start gap-3 rounded-lg px-3 py-2.5
                      text-base font-medium transition-colors
                      hover:bg-accent hover:text-accent-foreground
                    `}
                    isActive={isItemActive(item.url)}
                  >
                    <Link href={item.url} onClick={handleNavClick}>
                      <item.icon className="!size-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup
          className={`
            mt-auto
            sm:hidden
          `}
        >
          <SidebarGroupContent>
            <Button
              className={`
                w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-base
                font-medium text-gray-600
                hover:bg-accent hover:text-gray-900
              `}
              onClick={logout}
              size="sm"
              variant="ghost"
            >
              <LogOut className="!size-5" />
              <span>Salir</span>
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
