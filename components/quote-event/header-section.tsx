
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock3, ShieldCheck } from "lucide-react";

export function HeaderSection() {
  return (
    <Card
      className={`
        relative overflow-hidden border-[hsl(33_45%_82%)] bg-background/80
        shadow-sm
      `}
    >
      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b
          from-[hsl(34_100%_92%/.85)] to-transparent
        `}
      />

      <CardHeader
        className={`
          relative space-y-3 px-4 py-4
          sm:px-6 sm:py-5
        `}
      >

        <CardTitle
          className={`
            font-display text-[clamp(1.45rem,5.8vw,2.4rem)] leading-[1.06]
            font-bold tracking-tight text-balance
            sm:text-3xl
            md:text-4xl
          `}
        >
          Mesa de Postres para Eventos
        </CardTitle>

        <CardDescription
          className={`
            max-w-[45ch] text-sm leading-snug text-foreground/80
            sm:text-base
            md:leading-relaxed
          `}
        >
          Diseña tu mesa ideal y recibe una cotización clara al instante.
          Presentación premium incluida.
        </CardDescription>

        <Separator
          className={`
            mt-0.5
            sm:mt-2
          `}
        />

        <div
          className={`
            grid grid-cols-2 gap-2 text-[11px]
            sm:flex sm:flex-wrap sm:items-center sm:gap-2.5 sm:text-xs
          `}
        >
          <div
            className={`
              inline-flex items-center gap-1.5 rounded-md bg-muted/60 px-2 py-1
              text-muted-foreground
            `}
          >
            <Clock3 className="h-3.5 w-3.5" />
            Respuesta rápida
          </div>
          <div
            className={`
              inline-flex items-center gap-1.5 rounded-md bg-muted/60 px-2 py-1
              text-muted-foreground
            `}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Calidad garantizada
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
