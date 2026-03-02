"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterTab {
  count?: number;
  label: string;
  value: string;
}

interface FilterTabsProps {
  className?: string;
  onValueChange: (value: string) => void;
  tabs: FilterTab[];
  value: string;
}

export function FilterTabs({
  className,
  onValueChange,
  tabs,
  value,
}: FilterTabsProps) {
  const isMobile = useIsMobile();

  return (
    <Tabs className={className} onValueChange={onValueChange} value={value}>
      <div className="mobile-scroll-smooth w-full overflow-x-auto pb-1">
        <TabsList
          className={`
            mt-0 flex h-auto w-max min-w-full gap-1.5 p-3
            sm:mt-4 sm:gap-2 sm:p-2
            ${isMobile ? "justify-start" : "justify-center"}
          `}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              className={`
                flex min-h-9 min-w-fit items-center gap-1.5 rounded-md px-3 py-2
                text-xs whitespace-nowrap transition-colors
                hover:bg-orange-50
                data-[state=active]:bg-orange-100
                data-[state=active]:text-orange-800
                data-[state=inactive]:text-muted-foreground
                sm:min-h-10 sm:gap-2 sm:px-4 sm:text-sm
              `}
              key={tab.value}
              value={tab.value}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <Badge
                  className={`
                    text-[11px]
                    ${
                      isMobile
                        ? "h-5 min-w-[22px] px-1.5 py-0"
                        : "px-2 py-0.5"
                    }
                  `}
                  variant="secondary"
                >
                  {tab.count}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
}
