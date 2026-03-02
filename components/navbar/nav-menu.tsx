import type { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import type { LucideIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Calendar, Home, Package, Users } from "lucide-react";
import Link from "next/link";

interface NavMenuProps extends NavigationMenuProps {
  onItemClick?: () => void;
}

const navItems: {
  description: string;
  href: string;
  icon: LucideIcon;
  label: string;
}[] = [
  {
    description: "Pagina principal",
    href: "/",
    icon: Home,
    label: "Inicio",
  },
  {
    description: "Arma tu caja ideal",
    href: "/build-a-box",
    icon: Package,
    label: "Empaques",
  },
  {
    description: "Bodas, fiestas y mas",
    href: "/#events",
    icon: Calendar,
    label: "Eventos",
  },
  {
    description: "Conoce nuestra historia",
    href: "/#about-us",
    icon: Users,
    label: "Nosotros",
  },
];

export const NavMenu = ({
  onItemClick,
  orientation,
  ...props
}: NavMenuProps) => {
  const isVertical = orientation === "vertical";

  return (
    <NavigationMenu orientation={orientation} {...props}>
      <NavigationMenuList
        className={`
          gap-1 space-x-0
          data-[orientation=vertical]:flex-col
          data-[orientation=vertical]:items-start
          data-[orientation=vertical]:gap-0
          sm:gap-2
        `}
      >
        {navItems.map((item) => (
          <NavigationMenuItem className="w-full" key={item.href}>
            <NavigationMenuLink asChild>
              {isVertical ? (
                <Link
                  className={`
                    group flex w-full items-center gap-3 rounded-lg px-3 py-3
                    text-primary transition-colors
                    hover:bg-accent hover:text-accent-foreground
                    active:bg-accent/70
                  `}
                  href={item.href}
                  onClick={onItemClick}
                >
                  <div
                    className={`
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-md bg-primary/10 text-primary transition-colors
                      group-hover:bg-primary group-hover:text-primary-foreground
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-semibold">
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                </Link>
              ) : (
                <Link
                  className={`
                    group inline-flex h-10 w-max items-center justify-center
                    gap-1.5 rounded-md px-2 py-2 text-xl font-medium
                    text-primary transition-colors
                    hover:bg-accent hover:text-accent-foreground
                    disabled:pointer-events-none disabled:opacity-50
                    data-[active]:bg-accent/50
                    data-[state=open]:bg-accent/50
                    sm:gap-2 sm:px-4
                    lg:gap-2.5 lg:px-4
                  `}
                  href={item.href}
                  onClick={onItemClick}
                >
                  <item.icon className={`
                    h-5 w-5
                    sm:hidden
                  `} />
                  <span>{item.label}</span>
                </Link>
              )}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
