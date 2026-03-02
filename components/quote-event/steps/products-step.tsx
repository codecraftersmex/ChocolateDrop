import type { Event } from "@/lib/types/event";

import { InfoRow } from "@/components/quote-event/info-feature-rows";
import { ProductCarousel } from "@/components/quote-event/product-carousel";
import { ProductQtyCard } from "@/components/quote-event/product-qty-card";
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
import {
  MIN_BRIGADEIROS,
  MIN_PASTELITOS,
  UNIT_PRICE_BRIGADEIROS,
  UNIT_PRICE_PASTELITOS,
} from "@/lib/constants/quote-event-constants";
import { BRIGADEIROS, CAKES } from "@/lib/data/products";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

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
    <Card className="overflow-hidden shadow-xl">
      <CardHeader
        className={`
          pb-3
          sm:pb-6
        `}
      >
        <CardTitle
          className={`
            text-lg
            sm:text-xl
          `}
        >
          2) Conoce sabores y define cantidades
        </CardTitle>
        <CardDescription className="text-sm">
          Primero revisa sabores y bases. Después elige cuántas piezas
          necesitas.
        </CardDescription>
      </CardHeader>

      <CardContent
        className={`
          space-y-4 p-4 pt-0
          sm:space-y-6 sm:p-6 sm:pt-0
        `}
      >
        <div
          className={`
            rounded-xl border bg-muted/20 p-3
            sm:p-4
          `}
        >
          <p className="text-sm font-medium">Sabores y bases disponibles</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Esta sección es informativa. En este paso solo eliges cantidades.
          </p>
          <div
            className={`
              mt-3 grid gap-4
              md:grid-cols-2
            `}
          >
            <FlavorList activeBrigadeiros={activeBrigadeiros} />

            <div>
              <div className="mb-2 text-sm font-medium">Mini pastelitos</div>
              <p className="text-xs text-muted-foreground">Pan base:</p>
              <ul
                className={`
                  mt-1 list-disc space-y-0.5 pl-4 text-sm text-foreground/90
                `}
              >
                <li>Chocolate</li>
                <li>Red Velvet</li>
                <li>Vainilla</li>
                <li>Zanahoria</li>
              </ul>
              <p className="mt-2 text-xs text-muted-foreground">
                Cobertura: arriba puedes elegir un brigadeiro de la lista de
                sabores.
              </p>
            </div>
          </div>
        </div>

        <div
          className={`
            flex flex-col gap-3
            sm:gap-4
          `}
        >
          {/* Image Carousel */}
          <p className="text-sm font-medium">Nuestros Mini Pastelitos Gourmet</p>
          <ProductCarousel images={carouselImages} />
        </div>

        {/* Product Quantities */}
        <div
          className={`
            space-y-2 rounded-xl border bg-muted/20 p-3
            sm:p-4
          `}
        >
          <p className="text-sm font-medium">Selecciona cantidades</p>
          <p className="text-xs text-muted-foreground">
            Aquí solo defines cuántas piezas deseas de cada producto.
          </p>
          <div
            className={`
              grid gap-3 pt-1
              sm:gap-4
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
}: {
  activeBrigadeiros: { description?: string; name: string }[];
}) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium">Brigadeiros (sabores)</div>
      <div className="flex flex-wrap gap-2">
        {activeBrigadeiros.map((item) => (
          <Badge key={item.name} variant="secondary">
            {item.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
