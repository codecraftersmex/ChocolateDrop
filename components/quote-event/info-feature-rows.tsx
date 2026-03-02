import type React from "react";

import { Check } from "lucide-react";

export function InfoRow({ children }: { children: React.ReactNode }) {
  return (
    <div className={`
      flex items-start gap-2 rounded-lg bg-muted/50 p-2.5 text-xs
      sm:p-3 sm:text-sm
    `}>
      {children}
    </div>
  );
}

export function FeatureRow({ text }: { text: string }) {
  return (
    <div className={`
      flex items-start gap-2 text-xs text-muted-foreground
      sm:text-sm
    `}>
      <div
        className={`
          mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center
          rounded-full bg-primary/20
          sm:h-5 sm:w-5
        `}
      >
        <Check className={`
          h-2.5 w-2.5 text-primary
          sm:h-3 sm:w-3
        `} />
      </div>
      <span>{text}</span>
    </div>
  );
}
