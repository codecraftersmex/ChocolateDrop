import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function HeaderSection() {
  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardHeader className="space-y-1 p-0">
        <CardTitle
          className={`
            font-display text-2xl leading-tight font-bold tracking-tight
            md:text-4xl
          `}
        >
          Mesa de Postres para Eventos
        </CardTitle>

        <CardDescription
          className={`
            max-w-prose leading-snug text-foreground/80
            md:leading-relaxed
          `}
        >
          Cotiza en minutos. Presentación premium incluida.
        </CardDescription>

        <Separator />
      </CardHeader>
    </Card>
  );
}
