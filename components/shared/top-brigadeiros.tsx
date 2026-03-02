import type { BrigadeiroStats } from "@/lib/utils/dashboard-utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface TopBrigadeirosProps {
  brigadeiros: BrigadeiroStats[];
  className?: string;
  limit?: number;
}

export function TopBrigadeiros({
  brigadeiros,
  className,
  limit = 5,
}: TopBrigadeirosProps) {
  const displayBrigadeiros = brigadeiros.slice(0, limit);

  return (
    <Card className={cn("border shadow-sm", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-accent/60 p-1.5 ring-1 ring-border">
            <Star className="h-4 w-4 text-foreground/80" />
          </div>
          <div>
            <CardTitle className="text-base leading-tight">
              Top {limit} Brigadeiros
            </CardTitle>
            <CardDescription className="text-xs">
              Más pedidos por unidades
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {displayBrigadeiros.length > 0 ? (
          <ol className="divide-y divide-border/70">
            {displayBrigadeiros.map((brigadeiro, index) => {
              const rank = index + 1;
              const rankColor =
                rank === 1
                  ? "bg-[hsl(45_85%_75%)] text-[hsl(25_40%_25%)]"
                  : rank === 2
                    ? "bg-[hsl(39_90%_70%)] text-[hsl(25_40%_25%)]"
                    : rank === 3
                      ? "bg-[hsl(33_80%_65%)] text-[hsl(25_40%_25%)]"
                      : "bg-secondary text-secondary-foreground";

              return (
                <li
                  className={cn(
                    "group flex items-center gap-3 px-4 py-3 transition-colors",
                    "hover:bg-muted/40",
                  )}
                  key={brigadeiro.id}
                >
                  {/* Rank */}
                  <div
                    aria-label={`Posición ${rank}`}
                    className={cn(
                      `
                        flex h-8 w-8 shrink-0 items-center justify-center
                        rounded-full text-sm font-semibold
                      `,
                      rankColor,
                      "ring-1 ring-border/60",
                    )}
                    title={`#${rank}`}
                  >
                    {rank}
                  </div>

                  {/* Name + orders */}
                  <div className="min-w-0 flex-1">
                    <div
                      className={`
                        flex flex-col items-start gap-1
                        sm:flex-row sm:items-baseline sm:justify-between
                      `}
                    >
                      <h3 className="truncate font-medium text-foreground">
                        {brigadeiro.name}
                      </h3>
                      {/* Units */}
                      <div className="text-left sm:text-right">
                        <div
                          className={`
                            text-sm font-semibold text-foreground tabular-nums
                          `}
                        >
                          {brigadeiro.totalQuantity.toLocaleString("es-MX")}
                        </div>
                        <div
                          className={`
                            text-[11px] leading-none text-muted-foreground
                          `}
                        >
                          unidades
                        </div>
                      </div>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      En {brigadeiro.orderCount.toLocaleString("es-MX")} órdenes
                    </p>
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
            <Star className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No hay datos de brigadeiros para el período seleccionado.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
