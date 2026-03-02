import type { Event } from "@/lib/types/event";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventStatus } from "@/lib/constants/event-constants";
import { cn } from "@/lib/utils";
import { getEventTypeLabel } from "@/lib/utils/event-utils";
import { formatDateOnly } from "@/lib/utils/format-utils";
import { Calendar, MapPin, Users } from "lucide-react";

interface UpcomingEventsProps {
  className?: string;
  events: Event[];
  limit?: number;
}

export function UpcomingEvents({
  className,
  events,
  limit = 5,
}: UpcomingEventsProps) {
  // Helper function to convert Firestore Timestamp to Date
  const toDate = (date: any): Date => {
    if (date && typeof date.toDate === "function") {
      return date.toDate();
    }
    return date instanceof Date ? date : new Date(date);
  };

  // Filter confirmed events and sort by date
  const confirmedEvents = events
    .filter((event) => event.status === EventStatus.CONFIRMADO)
    .filter((event) => event.details.date) // Only events with dates
    .sort((a, b) => {
      const dateA = toDate(a.details.date!);
      const dateB = toDate(b.details.date!);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, limit);

  const isUpcoming = (date: any) => {
    const eventDate = toDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  };

  return (
    <Card className={cn("border shadow-sm", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-accent/60 p-1.5 ring-1 ring-border">
            <Calendar className="h-4 w-4 text-foreground/80" />
          </div>
          <div>
            <CardTitle className="text-base leading-tight">
              Próximos {limit} Eventos
            </CardTitle>
            <CardDescription className="text-xs">
              Eventos confirmados por fecha
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {confirmedEvents.length > 0 ? (
          <ol className="divide-y divide-border/70">
            {confirmedEvents.map((event) => {
              const upcoming = isUpcoming(event.details.date!);

              return (
                <li
                  className={cn(
                    "group flex items-center gap-3 px-4 py-3 transition-colors",
                    "hover:bg-muted/40",
                  )}
                  key={event.id}
                >
                  {/* Date indicator */}
                  <div
                    className={cn(
                      `
                        flex h-8 w-8 shrink-0 items-center justify-center
                        rounded-full text-xs font-semibold
                      `,
                      upcoming
                        ? "bg-green-100 text-green-700 ring-1 ring-green-200"
                        : "bg-orange-100 text-orange-700 ring-1 ring-orange-200",
                    )}
                    title={upcoming ? "Próximo" : "Pasado"}
                  >
                    {toDate(event.details.date!).getDate()}
                  </div>

                  {/* Event details */}
                  <div className="min-w-0 flex-1">
                    <div
                      className={`
                        flex flex-col items-start gap-1
                        sm:flex-row sm:items-baseline sm:justify-between
                      `}
                    >
                      <h3 className="truncate font-medium text-foreground">
                        {event.customer.name}
                      </h3>
                      {/* Total */}
                      <div className="text-left sm:text-right">
                        <div
                          className={`
                            text-sm font-semibold text-foreground tabular-nums
                          `}
                        >
                          ${event.totals.total.toLocaleString("es-MX")}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`
                        mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs
                        text-muted-foreground
                      `}
                    >
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDateOnly(event.details.date!)}
                      </div>
                      <div className="flex max-w-[130px] items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{event.details.city}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {getEventTypeLabel(event.details.type)}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <div
            className={`
              flex flex-col items-center justify-center gap-2 px-6 py-12
              text-center
            `}
          >
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No hay eventos confirmados para el período seleccionado.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
