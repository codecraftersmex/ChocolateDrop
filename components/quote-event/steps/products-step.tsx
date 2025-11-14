import type { Event } from "@/lib/types/event";

import { InfoRow } from "@/components/quote-event/info-feature-rows";
import { ProductCarousel } from "@/components/quote-event/product-carousel";
import { ProductQtyCard } from "@/components/quote-event/product-qty-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  MIN_BRIGADEIROS,
  MIN_PASTELITOS,
  UNIT_PRICE_BRIGADEIROS,
  UNIT_PRICE_PASTELITOS,
} from "@/lib/constants/quote-event-constants";
import { BRIGADEIROS, CAKES } from "@/lib/data/products";
import { ChevronDown, ChevronLeft, ChevronRight, Info } from "lucide-react";

interface ProductsStepProps {
  event: Event;
  isValid: boolean;
  onEventChange: (event: Partial<Event>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ProductsStep({
  event,
  isValid,
  onEventChange,
  onNext,
  onPrev,
}: ProductsStepProps) {
  // Active flavors
  const activeBrigadeiros = BRIGADEIROS.filter(
    (b) => b.isActive && !b.isSeasonal,
  );

  const activeCakes = CAKES.filter((c) => c.isActive);

  const carouselImages = [
    ...activeCakes.map((c) => ({
      alt: c.name,
      src: c.image,
      title: c.name,
    })),
  ];

  return (
    <Card className="bg-background shadow-xl">
      <CardHeader>
        <CardTitle>2) Productos, presentación y sabores</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Product Quantities */}
        <div
          className={`
            grid gap-4 pb-6
            md:grid-cols-2
          `}
        >
          <ProductQtyCard
            imageSrc="/mini-cakes/cake.jpeg"
            min={MIN_PASTELITOS}
            setValue={(qty) =>
              onEventChange({
                products: { ...event.products, qtyPastelitos: qty },
              })
            }
            subtitle={`$${UNIT_PRICE_PASTELITOS} c/u`}
            title="Mini pastelitos gourmet"
            value={event.products.qtyPastelitos}
          />
          <ProductQtyCard
            imageSrc="/hero.jpg"
            min={MIN_BRIGADEIROS}
            setValue={(qty) =>
              onEventChange({
                products: { ...event.products, qtyBrigadeiros: qty },
              })
            }
            subtitle={`$${UNIT_PRICE_BRIGADEIROS} c/u`}
            title="Brigadeiros gourmet"
            value={event.products.qtyBrigadeiros}
          />
        </div>

        <div className="flex flex-col gap-4 pb-4">
          {/* Info Row */}
          <InfoRow>
            <Info className="h-4 w-4" />
            <p className="text-muted-foregroun text-sm">
              Incluye moldecitos decorativos y presentación lista para mesa o
              recuerdo.
            </p>
          </InfoRow>
          {/* Image Carousel */}
          Nuestros Mini Pastelitos Gourmet
          <ProductCarousel images={carouselImages} />
        </div>

        {/* Sabores (visual only) — COLLAPSIBLE on mobile, OPEN on desktop */}
        {/* Mobile */}
        <div className="md:col-span-2 md:hidden">
          <Collapsible>
            <div className="rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">
                    * Sabores disponibles (mezcla incluida)
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Se entrega en <strong>mezcla variada</strong> según
                    disponibilidad.
                  </p>
                </div>

                <CollapsibleTrigger asChild>
                  <Button className="gap-1" size="sm" variant="ghost">
                    Ver lista{" "}
                    <ChevronDown
                      className={`
                        h-4 w-4 transition-transform
                        data-[state=open]:rotate-180
                      `}
                    />
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="mt-3 grid gap-4">
                <FlavorList
                  activeBrigadeiros={activeBrigadeiros}
                  activeCakes={activeCakes}
                />
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>

        {/* Desktop (always expanded) */}
        <div
          className={`
            hidden rounded-xl border p-4 shadow-lg
            md:col-span-2 md:block
          `}
        >
          <div className="mb-2 text-sm font-medium">
            * Sabores disponibles (mezcla incluida)
          </div>
          <FlavorList
            activeBrigadeiros={activeBrigadeiros}
            activeCakes={activeCakes}
          />
          <p className="mt-4 text-xs text-muted-foreground">
            Nota: la mezcla exacta puede variar por temporada y disponibilidad.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <Button onClick={onPrev} variant="ghost">
          <ChevronLeft className="mr-2 h-4 w-4" /> Atrás
        </Button>
        <Button disabled={!isValid} onClick={onNext}>
          Continuar <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

/* -------------------------------------------
   Small helper to avoid duplicating markup
-------------------------------------------- */
function FlavorList({
  activeBrigadeiros,
  activeCakes,
}: {
  activeBrigadeiros: { description?: string; name: string }[];
  activeCakes: { description?: string; name: string }[];
}) {
  return (
    <div
      className={`
        grid gap-4
        md:grid-cols-2
      `}
    >
      {/* Brigadeiros */}
      <div>
        <div className="mb-2 text-sm font-medium">Brigadeiros</div>
        <div className="flex flex-wrap gap-2">
          {activeBrigadeiros.map((item) => (
            <Badge key={item.name} variant="secondary">
              {item.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Pastelitos */}
      <div>
        <div className="mb-2 text-sm font-medium">Mini pastelitos</div>
        <div className="flex flex-wrap gap-2">
          {activeCakes.map((item) => (
            <Badge key={item.name} variant="secondary">
              {item.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
