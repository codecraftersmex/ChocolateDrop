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
    <Card className="overflow-hidden shadow-xl">
      <CardHeader
        className={`
          space-y-1.5 pb-3
          sm:pb-6
        `}
      >
        <CardTitle
          className={`
            text-lg
            sm:text-xl
          `}
        >
          Revisa y confirma
        </CardTitle>
        <CardDescription className="text-sm">
          Valida todo antes de enviar tu cotización.
        </CardDescription>
      </CardHeader>
      <CardContent
        className={`
          p-4 pt-0
          sm:p-6 sm:pt-0
        `}
      >
        <SummaryDetails event={event} total={total} />
      </CardContent>
      <CardFooter
        className={`
          flex items-center justify-between border-t bg-muted/10 px-4 py-3
          sm:px-6
        `}
      >
        <Button className="w-32 justify-center" onClick={onPrev} variant="secondary">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Atrás
        </Button>
        <Button className="min-w-32 justify-center" onClick={onSubmit}>
          Enviar cotización
        </Button>
      </CardFooter>
    </Card>
  );
}
