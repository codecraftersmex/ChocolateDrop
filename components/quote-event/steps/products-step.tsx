import type { Event } from "@/lib/types/event";

import { ProductCarouselQtyCard } from "@/components/quote-event/product-carousel-qty-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  MIN_BRIGADEIROS,
  MIN_PASTELITOS,
  UNIT_PRICE_BRIGADEIROS,
  UNIT_PRICE_PASTELITOS,
} from "@/lib/constants/quote-event-constants";
import { BRIGADEIROS, CAKES } from "@/lib/data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MINI_CAKE_BASES = ["Chocolate", "Red Velvet", "Vainilla", "Zanahoria"];

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
  const featuredBrigadeiros = activeBrigadeiros.slice(0, 5);

  const activeCakes = CAKES.filter((c) => c.isActive);

  const cakeCarouselImages = [
    ...activeCakes.map((c) => ({
      alt: c.name,
      src: c.image,
      title: c.name,
    })),
  ];

  const brigadeiroCarouselImages = [
    ...featuredBrigadeiros.map((b) => ({
      alt: b.name,
      src: b.image,
      title: b.name,
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
          Descubre sabores y elige cantidades
        </CardTitle>
      </CardHeader>

      <CardContent
        className={`
          space-y-4 p-4 pt-0
          sm:space-y-6 sm:p-6 sm:pt-0
        `}
      >
        <div className="rounded-2xl border bg-muted/10 shadow-sm">
          <div
            className={`
              px-3
              sm:hidden
            `}
          >
            <Accordion collapsible type="single">
              <AccordionItem className="border-b-0" value="product-guide">
                <AccordionTrigger
                  className={`
                    py-3 text-sm font-semibold
                    hover:no-underline
                  `}
                >
                  <span className="inline-flex items-center gap-2">
                    Brigadeiros y Mini Pastelitos
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <ProductGuideContent activeBrigadeiros={activeBrigadeiros} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div
            className={`
              hidden p-4
              sm:block
            `}
          >
            <p className="text-sm font-semibold">
              Brigadeiros y Mini Pastelitos
            </p>
            <div className="mt-3">
              <ProductGuideContent activeBrigadeiros={activeBrigadeiros} />
            </div>
          </div>
        </div>

        {/* Product Quantities */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Selecciona tus productos</p>
          </div>
          <div
            className={`
              space-y-2
              sm:p-4
            `}
          >
            <ProductCarouselQtyCard
              images={cakeCarouselImages}
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
            <ProductCarouselQtyCard
              imageMode="contain"
              images={brigadeiroCarouselImages}
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

      <CardFooter
        className={`
          flex items-center justify-between border-t bg-muted/10 px-4 py-3
          sm:px-6
        `}
      >
        <Button
          className="w-32 justify-center"
          onClick={onPrev}
          variant="secondary"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Atrás
        </Button>
        <Button
          className="w-32 justify-center"
          disabled={!isValid}
          onClick={onNext}
        >
          Continuar
          <ChevronRight className="ml-2 h-4 w-4" />
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
    <div className="rounded-xl border bg-background/70 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium">Brigadeiros</div>
        <span className="text-[11px] text-muted-foreground">
          {activeBrigadeiros.length}
        </span>
      </div>
      <div
        className={`
          max-h-36 overflow-y-auto pr-1
          sm:max-h-none sm:overflow-visible sm:pr-0
        `}
      >
        <div
          className={`
            flex flex-wrap gap-1.5
            sm:gap-2
          `}
        >
          {activeBrigadeiros.map((item) => (
            <Badge className="text-[11px]" key={item.name} variant="secondary">
              {item.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductGuideContent({
  activeBrigadeiros,
}: {
  activeBrigadeiros: { description?: string; name: string }[];
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Explora los sabores disponibles para tu evento.
      </p>
      <div
        className={`
          grid gap-3
          md:grid-cols-2
        `}
      >
        <FlavorList activeBrigadeiros={activeBrigadeiros} />
        <div className="rounded-xl border bg-background/70 p-3">
          <div className="text-sm font-medium">Mini pastelitos</div>
          <p className="mt-1 text-xs text-muted-foreground">Pan base:</p>
          <div
            className={`
              mt-2 flex flex-wrap gap-1.5
              sm:gap-2
            `}
          >
            {MINI_CAKE_BASES.map((base) => (
              <Badge className="text-[11px]" key={base} variant="outline">
                {base}
              </Badge>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Cobertura: arriba puedes elegir un brigadeiro de la lista de
            sabores.
          </p>
        </div>
      </div>
    </div>
  );
}
