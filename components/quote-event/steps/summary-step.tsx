import type { Event } from "@/lib/types/event";

import { SummaryDetails } from "@/components/quote-event/summary-details";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

interface SummaryStepProps {
  event: Event;
  onPrev: () => void;
  onSubmit: () => void;
  total: number;
}

export function SummaryStep({
  event,
  onPrev,
  onSubmit,
  total,
}: SummaryStepProps) {
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle>Resumen de tu Evento</CardTitle>
        <CardDescription>
          Revisa los detalles antes de enviar tu cotización.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SummaryDetails event={event} total={total} />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button onClick={onPrev} variant="ghost">
          <ChevronLeft className="mr-2 h-4 w-4" /> Atrás
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={onSubmit}>Enviar cotización</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
