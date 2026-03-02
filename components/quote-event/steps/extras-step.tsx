import type { Event } from "@/lib/types/event";

import { FeatureRow } from "@/components/quote-event/info-feature-rows";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CART_RENTAL_PRICE,
  SERVICE_HOURS,
} from "@/lib/constants/quote-event-constants";
import { cn } from "@/lib/utils";
import { pesos } from "@/lib/utils/quote-event-utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ExtrasStepProps {
  event: Event;
  onEventChange: (event: Partial<Event>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ExtrasStep({
  event,
  onEventChange,
  onNext,
  onPrev,
}: ExtrasStepProps) {
  return (
    <Card className="overflow-hidden shadow-xl">
      <CardHeader
        className={`
          space-y-1.5 pb-3
          sm:pb-6
        `}
      >
        <CardTitle
          className={`
            text-lg
            sm:text-xl
          `}
        >
          3) Agrega extras
        </CardTitle>
        <CardDescription className="text-sm">
          Personaliza con carrito y servicios adicionales por {SERVICE_HOURS}{" "}
          horas.
        </CardDescription>
      </CardHeader>

      <CardContent className={`
        p-4 pt-0
        sm:p-6 sm:pt-0
      `}>
        <div
          className={cn(
            `
              group w-full cursor-pointer overflow-hidden rounded-xl border
              bg-card/60 text-left transition
              hover:bg-muted/40
            `,
            event.products.withCart &&
              "border-primary bg-primary/5 ring-2 ring-primary/20",
          )}
          onClick={() =>
            onEventChange({
              products: {
                ...event.products,
                withCart: !event.products.withCart,
              },
            })
          }
        >
          <div
            className={`
              grid gap-2
              md:grid-cols-[320px_1fr]
            `}
          >
            {/* Media */}
            <div className="relative">
              <div
                className={`
                  relative aspect-[4/3] w-full overflow-hidden rounded-xl
                  bg-muted
                  sm:aspect-square
                `}
              >
                <Image
                  alt="Carrito"
                  className={`
                    object-cover transition-transform duration-300
                    group-hover:scale-[1.01]
                  `}
                  fill
                  priority={false}
                  sizes="(min-width: 768px) 320px, 100vw"
                  src="/carousel/1.jpg"
                />
              </div>
            </div>

            {/* Content */}
            <div
              className={`
                flex flex-col gap-3 p-3
                sm:p-4
                md:p-6
              `}
            >
              <div className={`
                flex items-start gap-2.5
                sm:gap-3
              `}>
                <Checkbox
                  checked={event.products.withCart}
                  className="mt-1 shrink-0"
                  id="withCart"
                  onCheckedChange={(checked) =>
                    onEventChange({
                      products: { ...event.products, withCart: !!checked },
                    })
                  }
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <div className={`
                    text-sm font-medium
                    sm:text-base
                  `}>
                    Renta de Carrito
                  </div>
                  <p className={`
                    text-xs text-muted-foreground
                    sm:text-sm
                  `}>
                    Incluye montaje, desmontaje y atención personalizada por{" "}
                    {SERVICE_HOURS} horas.
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">
                      {pesos(CART_RENTAL_PRICE)}
                    </Badge>
                    <Badge variant="outline">
                      Montaje y desmontaje incluidos
                    </Badge>
                  </div>

                  <div
                    className={`
                      mt-4 grid gap-2
                      sm:grid-cols-2
                    `}
                  >
                    <FeatureRow text="Carrito elegante y personalizable" />
                    <FeatureRow text="Variedad de brigadeiros y dulces" />
                    <FeatureRow text="Mesa amplia para eventos grandes" />
                    <FeatureRow text="Decoración acorde al tema" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <Button onClick={onPrev} variant="ghost">
          <ChevronLeft className="mr-2 h-4 w-4" /> Atrás
        </Button>
        <Button onClick={onNext}>
          Continuar <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
