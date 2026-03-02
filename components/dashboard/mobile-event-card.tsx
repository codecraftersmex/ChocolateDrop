"use client";

import type { Event } from "@/lib/types/event";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { EventStatus, statusLabels, statusVariants } from "@/lib/constants/event-constants";
import { formatDateOnly, formatPrice } from "@/lib/utils/format-utils";
import { getEventTypeLabel } from "@/lib/utils/event-utils";
import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  MapPin,
  PartyPopper,
  Phone,
  User,
} from "lucide-react";

export interface MobileEventCardProps {
  event: Event;
  isExpanded: boolean;
  isUpdating?: boolean;
  onStatusChange: (status: EventStatus) => void;
  onToggleExpanded: () => void;
}

export function MobileEventCard({
  event,
  isExpanded,
  isUpdating = false,
  onStatusChange,
  onToggleExpanded,
}: MobileEventCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Evento</p>
          <p className="text-base font-semibold text-foreground">#{event.id}</p>
          <p className="text-xs text-muted-foreground">
            {formatDateOnly(event.createdAt)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-muted-foreground">Total</p>
          <p className="text-lg font-semibold text-primary">
            {formatPrice(event.totals.total)}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2 rounded-lg bg-muted/30 p-3">
        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
          <User className="h-4 w-4 text-muted-foreground" />
          {event.customer.name}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          {event.customer.phone}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <PartyPopper className="h-4 w-4" />
          {getEventTypeLabel(event.details.type)}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {event.details.city}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-muted/20 p-3">
        <div>
          <p className="text-xs text-muted-foreground">Brigadeiros</p>
          <p className="text-sm font-semibold">{event.products.qtyBrigadeiros}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Pastelitos</p>
          <p className="text-sm font-semibold">{event.products.qtyPastelitos}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Estatus</p>
        <Select
          disabled={isUpdating}
          onValueChange={(value) => onStatusChange(value as EventStatus)}
          value={event.status}
        >
          <SelectTrigger className="h-10 w-full">
            <Badge variant={statusVariants[event.status]}>
              {statusLabels[event.status]}
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {Object.values(EventStatus).map((statusKey) => (
              <SelectItem key={statusKey} value={statusKey}>
                <Badge variant={statusVariants[statusKey]}>
                  {statusLabels[statusKey]}
                </Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Collapsible className="mt-4" open={isExpanded}>
        <CollapsibleTrigger asChild>
          <button
            className={`
              flex w-full items-center justify-between rounded-lg border
              border-border/80 px-3 py-2 text-sm font-medium text-foreground
              transition-colors
              hover:bg-muted/30
            `}
            onClick={onToggleExpanded}
            type="button"
          >
            <span>Ver más detalles</span>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-3 space-y-2 rounded-lg border border-border/70 bg-background p-3">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                Fecha del evento
              </span>
              <span className="text-right font-medium text-foreground">
                {event.details.date ? formatDateOnly(event.details.date) : "-"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="text-muted-foreground">Con carrito</span>
              <Badge
                tone="soft"
                variant={event.products.withCart ? "processing" : "outline"}
              >
                {event.products.withCart ? "Sí" : "No"}
              </Badge>
            </div>
            {event.totals.subtotalProducts !== undefined && (
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="text-muted-foreground">Subtotal productos</span>
                <span className="font-medium text-foreground">
                  {formatPrice(event.totals.subtotalProducts)}
                </span>
              </div>
            )}
            {event.totals.subtotalExtras !== undefined && (
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="text-muted-foreground">Subtotal extras</span>
                <span className="font-medium text-foreground">
                  {formatPrice(event.totals.subtotalExtras)}
                </span>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
