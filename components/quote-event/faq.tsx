import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CART_RENTAL_PRICE,
  MIN_BRIGADEIROS,
  MIN_PASTELITOS,
  SERVICE_HOURS,
} from "@/lib/constants/quote-event-constants";
import { pesos } from "@/lib/utils/quote-event-utils";

export function Faq() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preguntas frecuentes</CardTitle>
        <CardDescription>
          Transparencia total para una experiencia sin sorpresas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion className="w-full" collapsible type="single">
          <AccordionItem value="q1">
            <AccordionTrigger>
              ¿Cuáles son los mínimos por producto?
            </AccordionTrigger>
            <AccordionContent>
              Pastelitos: mínimo {MIN_PASTELITOS} piezas. Brigadeiros: mínimo{" "}
              {MIN_BRIGADEIROS} piezas. Los mínimos no se combinan.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>
              ¿Qué incluye la renta del carrito?
            </AccordionTrigger>
            <AccordionContent>
              Montaje, desmontaje y atención personalizada por {SERVICE_HOURS}{" "}
              horas. Costo fijo de {pesos(CART_RENTAL_PRICE)}.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>¿Cómo reservo mi fecha?</AccordionTrigger>
            <AccordionContent>
              Con un anticipo del 50% del total de tu cotización. El saldo se
              liquida el día del evento o la entrega.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
