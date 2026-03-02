import { cn } from "@/lib/utils";
import LogoSVG from "@/public/logo.svg?react";

export const Logo = ({ className }: { className?: string }) => (
  <LogoSVG
    className={cn(
      `
        h-12 w-12 fill-primary
        sm:h-16 sm:w-16
      `,
      className,
    )}
  />
);
