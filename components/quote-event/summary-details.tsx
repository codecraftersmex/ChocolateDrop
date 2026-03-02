import type { Event } from "@/lib/types/event";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CART_RENTAL_PRICE,
  EVENT_TYPES,
  SERVICE_HOURS,
  UNIT_PRICE_BRIGADEIROS,
  UNIT_PRICE_PASTELITOS,
} from "@/lib/constants/quote-event-constants";
import { formatDateOnly } from "@/lib/utils/format-utils";
import { pesos } from "@/lib/utils/quote-event-utils";
import {
  Calendar,
  MapPin,
  PartyPopper,
  ShoppingBasket,
  Sparkles,
  Wallet,
} from "lucide-react";

interface SummaryDetailsProps {
  event: Event;
  total: number;
}

export function SummaryDetails({ event, total }: SummaryDetailsProps) {
  const eventTypeLabel =
    EVENT_TYPES.find((t) => t.id === event.details.type)?.label ?? "-";

  return (
    <div className={`
      grid gap-2.5 text-sm leading-snug
      sm:gap-3 sm:text-[15px]
    `}>
      {/* Detalles del evento */}
      <Card className="bg-card shadow-sm">
        <CardHeader className="pb-2.5">
          <div className="flex items-center gap-2">
            <PartyPopper className={`
              size-4 text-muted-foreground
              sm:size-5
            `} />
            <CardTitle className={`
              text-sm
              sm:text-base
            `}>Detalles del evento</CardTitle>
          </div>
        </CardHeader>
        <CardContent className={`
          grid gap-2 p-4 pt-0 text-muted-foreground
          sm:p-6 sm:pt-0
        `}>
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>Fecha:</span>
            <span className="font-medium text-foreground">
              {event.details.date ? formatDateOnly(event.details.date) : "-"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>Ciudad:</span>
            <span className="font-medium text-foreground">
              {event.details.city || "-"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Tipo de evento:</span>
            <span className="font-medium text-foreground">
              {eventTypeLabel}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Tu seleccion */}
      <Card className="bg-card shadow-sm">
        <CardHeader className="pb-2.5">
          <div className="flex items-center gap-2">
            <ShoppingBasket className={`
              size-4 text-muted-foreground
              sm:size-5
            `} />
            <CardTitle className={`
              text-sm
              sm:text-base
            `}>Tu selección</CardTitle>
          </div>
        </CardHeader>
        <CardContent className={`
          grid gap-2 p-4 pt-0
          sm:p-6 sm:pt-0
        `}>
          {event.products.qtyPastelitos > 0 && (
            <div className={`
              flex flex-col gap-1
              sm:flex-row sm:items-center sm:justify-between
            `}>
              <span className="text-muted-foreground">
                <span>Mini pastelitos gourmet</span>
                <Badge className="ml-2 px-2" variant="outline">
                  x {event.products.qtyPastelitos}
                </Badge>
              </span>
              <span className="font-medium">
                {pesos(event.products.qtyPastelitos * UNIT_PRICE_PASTELITOS)}
              </span>
            </div>
          )}
          {event.products.qtyBrigadeiros > 0 && (
            <div className={`
              flex flex-col gap-1
              sm:flex-row sm:items-center sm:justify-between
            `}>
              <span className="text-muted-foreground">
                <span>Brigadeiros gourmet</span>
                <Badge className="ml-2 px-2" variant="outline">
                  x {event.products.qtyBrigadeiros}
                </Badge>
              </span>
              <span className="font-medium">
                {pesos(event.products.qtyBrigadeiros * UNIT_PRICE_BRIGADEIROS)}
              </span>
            </div>
          )}
          {event.products.withCart && (
            <div className={`
              flex flex-col gap-1
              sm:flex-row sm:items-center sm:justify-between
            `}>
              <span className="text-muted-foreground">
                Carrito de postres ({SERVICE_HOURS}h)
              </span>
              <span className="font-medium">{pesos(CART_RENTAL_PRICE)}</span>
            </div>
          )}
          {/* If nothing selected, show a gentle hint */}
          {event.products.qtyPastelitos <= 0 &&
            event.products.qtyBrigadeiros <= 0 &&
            !event.products.withCart && (
              <span className="text-sm text-muted-foreground">
                Sin productos seleccionados.
              </span>
            )}
        </CardContent>
      </Card>

      {/* Totales */}
      <Card className="bg-card shadow-sm">
        <CardHeader className="pb-2.5">
          <div className="flex items-center gap-2">
            <Wallet className={`
              size-4 text-muted-foreground
              sm:size-5
            `} />
            <CardTitle className={`
              text-sm
              sm:text-base
            `}>Totales</CardTitle>
          </div>
        </CardHeader>
        <CardContent className={`
          space-y-2 p-4 pt-0
          sm:p-6 sm:pt-0
        `}>
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold">Total</span>
            <span className="text-base font-semibold text-primary">
              {pesos(total)}
            </span>
          </div>
          <Separator className="my-1.5" />
          <div className="grid gap-1.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Anticipo (50%)</span>
              {pesos(total * 0.5)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
