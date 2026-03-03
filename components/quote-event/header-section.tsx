import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function HeaderSection() {
  return (
    <Card className="relative overflow-hidden border-border bg-card shadow-sm">
      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_top,hsla(34,100%,90%,.45),transparent_55%)]
        `}
      />
      <CardHeader
        className={`
          relative items-center space-y-3 px-4 py-6 text-center
          sm:px-6
        `}
      >
        <CardTitle
          className={`
            font-display text-[clamp(1.5rem,6vw,2.4rem)] leading-tight font-bold
            tracking-tight text-balance
          `}
        >
          Diseña tu mesa ideal
        </CardTitle>

        <CardDescription
          className={`
            max-w-[50ch] text-sm text-foreground/80
            sm:text-base
          `}
        >
          Conoce nuestros Brigadeiros y Mini Pastelitos, y arma tu pedido con
          una mezcla variada de sabores.
        </CardDescription>

        <Separator className="w-full max-w-xs" />
        <p
          className={`
            text-[11px] text-muted-foreground
            sm:text-xs
          `}
        >
          Atención personalizada • Calidad premium • Entrega puntual
        </p>
      </CardHeader>
    </Card>
  );
}
