"use client";

import type { Order } from "@/lib/types/order";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { statusLabels, statusVariants } from "@/lib/constants/order-constants";
import { formatDate, formatPrice } from "@/lib/utils/format-utils";
import { ChevronDown, ChevronRight, Phone, User } from "lucide-react";

export interface MobileOrderCardProps {
  isExpanded: boolean;
  isUpdating?: boolean;
  onStatusChange: (status: Order["status"]) => void;
  onToggleExpanded: () => void;
  order: Order;
}

export function MobileOrderCard({
  isExpanded,
  isUpdating = false,
  onStatusChange,
  onToggleExpanded,
  order,
}: MobileOrderCardProps) {
  const boxSummary = Object.entries(
    order.items.reduce(
      (acc, item) => {
        const boxName = item.boxType.name;
        if (!acc[boxName]) {
          acc[boxName] = { count: 0, totalBrigadeiros: 0 };
        }
        acc[boxName].count += 1;
        acc[boxName].totalBrigadeiros += item.brigadeiros.length;
        return acc;
      },
      {} as Record<string, { count: number; totalBrigadeiros: number }>,
    ),
  );

  const visibleSummary = boxSummary.slice(0, 2);
  const hiddenSummaryCount = boxSummary.length - visibleSummary.length;

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Pedido</p>
          <p className="text-base font-semibold text-foreground">
            #{order.orderNumber || order.id}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-muted-foreground">Total</p>
          <p className="text-lg font-semibold text-primary">
            {formatPrice(order.total)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-muted/30 p-3">
        <div className="space-y-1">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <User className="h-4 w-4 text-muted-foreground" />
            {order.customer.name}
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            {order.customer.phone}
          </p>
        </div>

        <div className="mt-3 space-y-1.5">
          {visibleSummary.map(([boxName, details]) => (
            <div className="flex items-center justify-between" key={boxName}>
              <p className="truncate pr-2 text-sm text-foreground">{boxName}</p>
              <div className="flex items-center gap-1">
                <Badge tone="soft" variant="secondary">
                  {details.count} caja{details.count > 1 ? "s" : ""}
                </Badge>
              </div>
            </div>
          ))}
          {hiddenSummaryCount > 0 && (
            <p className="text-xs text-muted-foreground">
              +{hiddenSummaryCount} tipo{hiddenSummaryCount > 1 ? "s" : ""} de
              caja
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Estatus</p>
        <Select
          disabled={isUpdating}
          onValueChange={(value) => onStatusChange(value as Order["status"])}
          value={order.status}
        >
          <SelectTrigger className="h-10 w-full">
            <Badge variant={statusVariants[order.status]}>
              {statusLabels[order.status]}
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {[
              "pending",
              "confirmed",
              "preparing",
              "ready",
              "delivered",
              "cancelled",
            ].map((statusKey) => (
              <SelectItem key={statusKey} value={statusKey}>
                <Badge
                  variant={
                    statusVariants[statusKey as keyof typeof statusVariants]
                  }
                >
                  {statusLabels[statusKey as keyof typeof statusLabels]}
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
            <span>Ver detalle de productos</span>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="mt-3 space-y-2">
            {order.items.map((item, index) => (
              <div
                className="rounded-lg border border-border/70 bg-background p-3"
                key={`${item.boxType.name}-${index}`}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">
                    {index + 1}. {item.boxType.name}
                  </p>
                  <Badge tone="soft" variant="secondary">
                    {formatPrice(item.totalPrice)}
                  </Badge>
                </div>

                <div className="space-y-1">
                  {item.brigadeiros.map((brigadeiro) => (
                    <div
                      className="flex items-center justify-between text-xs"
                      key={`${brigadeiro.id}-${brigadeiro.quantity}`}
                    >
                      <span className="truncate pr-2 text-muted-foreground">
                        {brigadeiro.name}
                      </span>
                      <span className="font-medium text-foreground">
                        x{brigadeiro.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
