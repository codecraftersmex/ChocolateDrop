import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { Badge } from "../ui/badge";

interface ProductQtyCardProps {
  imageAlt?: string;
  /** Bubble through Next/Image priority when desired */
  imagePriority?: boolean;
  /** Override <Image> sizes if needed (defaults are good for this layout) */
  imageSizes?: string;
  /** Optional image props (static path from /public or remote if configured) */
  imageSrc?: string;
  min: number;

  setValue: (n: number) => void;
  subtitle: string;
  title: string;
  value: number;
}

export function ProductQtyCard({
  imageAlt,
  imagePriority = false,
  imageSizes = "(min-width: 640px) 112px, 100vw",
  imageSrc,
  min,
  setValue,
  subtitle,
  title,
  value,
}: ProductQtyCardProps) {
  const meetsMin = value === 0 || value >= min;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleFocus = () => inputRef.current?.select();

  return (
    <Card
      className={cn(
        "relative overflow-hidden shadow-lg",
        !meetsMin &&
          `
            shadow-[0_0_0_2px_theme(colors.destructive/20)]
            border-destructive/60
          `,
      )}
    >
      {/* min badge */}
      <Badge
        className={`
          absolute top-3 right-3 z-10 rounded-full px-2 py-0.5 text-xs
          font-medium
        `}
        variant={"secondary"}
      >
        Mín: {min}
      </Badge>

      <CardHeader
        className={`
          pb-2.5
          sm:pb-3
        `}
      >
        <div
          className={`
            grid gap-2.5
            sm:grid-cols-[112px_1fr] sm:items-center sm:gap-3
          `}
        >
          {/* Product image (or placeholder) */}
          <div
            className={`
              relative aspect-[16/10] overflow-hidden rounded-xl bg-muted
              sm:aspect-square sm:h-[112px]
            `}
          >
            {imageSrc ? (
              <Image
                alt={imageAlt ?? title ?? "Imagen del producto"}
                className={`
                  object-cover transition-transform duration-300
                  group-hover:scale-[1.02]
                `}
                fill
                priority={imagePriority}
                sizes={imageSizes}
                src={imageSrc}
              />
            ) : (
              <div
                className={`
                  flex h-full w-full items-center justify-center
                  text-muted-foreground
                `}
              >
                <ImageOff aria-hidden="true" className="h-6 w-6" />
              </div>
            )}
          </div>

          {/* Title + subtitle */}
          <div>
            <CardTitle
              className={`
                text-sm
                sm:text-base
                md:text-lg
              `}
            >
              {title}
            </CardTitle>
            <CardDescription className={`
              mt-1 text-sm font-medium
              sm:text-base
            `}>
              {subtitle}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className={`
        p-4 pt-0
        sm:p-6 sm:pt-0
      `}>
        <div
          className={cn(
            `
              mt-0 flex w-full items-center justify-center gap-2
              sm:mt-3 sm:gap-4
            `,
          )}
        >
          {/* -10 */}
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

          {/* input */}
          <Input
            aria-describedby={!meetsMin ? "qty-error" : undefined}
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
            onFocus={handleFocus}
            pattern="\d*"
            placeholder="0"
            ref={inputRef}
            value={value}
          />

          {/* +10 */}
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
              mt-2 text-center text-xs text-destructive
              sm:mt-3 sm:text-sm
            `}
            id="qty-error"
            role="alert"
          >
            Mínimo {min} para continuar.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
