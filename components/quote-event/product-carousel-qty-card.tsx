import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

interface ProductCarouselImage {
  alt: string;
  src: string;
  title: string;
}

interface ProductCarouselQtyCardProps {
  className?: string;
  images: ProductCarouselImage[];
  min: number;
  setValue: (n: number) => void;
  subtitle: string;
  title: string;
  value: number;
}

export function ProductCarouselQtyCard({
  className,
  images,
  min,
  setValue,
  subtitle,
  title,
  value,
}: ProductCarouselQtyCardProps) {
  const meetsMin = value === 0 || value >= min;
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Card
      className={cn(
        "relative overflow-hidden shadow-lg",
        !meetsMin &&
          `
            shadow-[0_0_0_2px_theme(colors.destructive/20)]
            border-destructive/60
          `,
        className,
      )}
    >
      <Badge
        className={`
          absolute top-3 right-3 z-10 rounded-full px-2 py-0.5 text-xs
          font-medium
        `}
        variant="secondary"
      >
        Mín: {min}
      </Badge>

      <CardHeader
        className={`
          py-3
          sm:pb-3
        `}
      >
        <CardTitle
          className={`
            pr-8 text-sm
            sm:text-base
            md:text-lg
          `}
        >
          {title}
        </CardTitle>
        <CardDescription
          className={`
            text-sm font-medium
            sm:text-base
          `}
        >
          {subtitle}
        </CardDescription>
      </CardHeader>

      <CardContent
        className={`
          p-0 px-2
          sm:space-y-4 sm:p-6 sm:pt-0
        `}
      >
        <div
          className={`
            rounded-xl border bg-muted/10 p-0
            sm:p-3
          `}
        >
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {images.map((img) => (
                <CarouselItem className="basis-full" key={img.src}>
                  <div
                    className={`
                      relative aspect-[4/3] overflow-hidden rounded-lg bg-muted
                    `}
                  >
                    <Image
                      alt={img.alt}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      src={img.src}
                    />
                    <div
                      className={`
                        absolute inset-x-0 bottom-0 bg-gradient-to-t
                        from-black/60 to-transparent p-3
                      `}
                    >
                      <p className="text-sm font-medium text-white">
                        {img.title}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </Carousel>
        </div>

        <div
          className={`
            mt-0 flex w-full items-center justify-center gap-2 py-4
            sm:gap-4
          `}
        >
          <Button
            aria-label="Restar diez"
            className={`
              h-10 w-14 rounded-xl text-sm font-semibold
              sm:h-11 sm:w-16 sm:text-base
            `}
            onClick={() => setValue(Math.max(0, value - 10))}
            type="button"
            variant="outline"
          >
            -10
          </Button>

          <Input
            aria-describedby={!meetsMin ? "qty-error-carousel" : undefined}
            aria-invalid={!meetsMin}
            aria-label="Cantidad"
            className={cn(
              `
                h-10 w-24 rounded-xl text-center text-base font-medium
                tabular-nums shadow-inner
                sm:h-11 sm:w-28 sm:text-lg
                md:w-32
              `,
              !meetsMin &&
                `
                  border-destructive/60
                  focus-visible:ring-destructive/30
                `,
            )}
            inputMode="numeric"
            onChange={(e) =>
              setValue(Math.max(0, Number.parseInt(e.target.value || "0") || 0))
            }
            onFocus={() => inputRef.current?.select()}
            pattern="\\d*"
            placeholder="0"
            ref={inputRef}
            value={value}
          />

          <Button
            aria-label="Sumar diez"
            className={`
              h-10 w-14 rounded-xl text-sm font-semibold
              sm:h-11 sm:w-16 sm:text-base
            `}
            onClick={() => setValue(value + 10)}
            type="button"
            variant="outline"
          >
            +10
          </Button>
        </div>

        {!meetsMin && (
          <p
            aria-live="polite"
            className={`
              text-center text-xs text-destructive
              sm:text-sm
            `}
            id="qty-error-carousel"
            role="alert"
          >
            Mínimo {min} para continuar.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
