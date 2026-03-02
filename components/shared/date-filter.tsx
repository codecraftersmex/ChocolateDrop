"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DateFilterOption =
  | "all"
  | "month"
  | "quarter"
  | "today"
  | "week"
  | "year";

interface DateFilterProps {
  className?: string;
  onChange: (value: DateFilterOption) => void;
  value: DateFilterOption;
}

const filterOptions = [
  { label: "Hoy", value: "today" as const },
  { label: "Esta semana", value: "week" as const },
  { label: "Este mes", value: "month" as const },
  { label: "Este año", value: "year" as const },
  { label: "Todo", value: "all" as const },
];

export function DateFilter({ className, onChange, value }: DateFilterProps) {
  return (
    <div
      className={cn(
        "mobile-scroll-smooth w-full overflow-x-auto pb-1 sm:w-auto",
        className,
      )}
    >
      <div className="flex w-max min-w-full gap-2 sm:min-w-0">
        {filterOptions.map((option) => (
          <Button
            className="h-9 rounded-full px-3 text-xs sm:h-8 sm:px-3"
            key={option.value}
            onClick={() => onChange(option.value)}
            size="sm"
            variant={value === option.value ? "default" : "outline"}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function getDateRange(filter: DateFilterOption): {
  end: Date;
  start: Date;
} {
  const now = new Date();
  const start = new Date();
  const end = new Date();

  switch (filter) {
    case "all": {
      start.setFullYear(2000, 0, 1);
      end.setFullYear(2100, 11, 31);
      break;
    }
    case "month": {
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      end.setMonth(start.getMonth() + 1, 0);
      end.setHours(23, 59, 59, 999);
      break;
    }
    case "quarter": {
      const quarter = Math.floor(now.getMonth() / 3);
      start.setMonth(quarter * 3, 1);
      start.setHours(0, 0, 0, 0);
      end.setMonth(quarter * 3 + 3, 0);
      end.setHours(23, 59, 59, 999);
      break;
    }
    case "today": {
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      break;
    }
    case "week": {
      const dayOfWeek = now.getDay();
      start.setDate(now.getDate() - dayOfWeek);
      start.setHours(0, 0, 0, 0);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      break;
    }
    case "year": {
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      end.setMonth(11, 31);
      end.setHours(23, 59, 59, 999);
      break;
    }
  }

  return { end, start };
}
