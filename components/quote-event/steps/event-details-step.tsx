import type { Event } from "@/lib/types/event";

import {
  FormFieldInput,
  FormFieldToggleGroup,
} from "@/components/shared/forms/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useEventDetailsForm } from "@/hooks/event/use-event-details-form";
import { CITIES, EVENT_TYPES } from "@/lib/constants/quote-event-constants";
import { toLocalISODate } from "@/lib/utils/utils";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useCallback, useState } from "react";

interface EventDetailsStepProps {
  event: Event;
  onEventChange: (event: Partial<Event>) => void;
  onNext: () => void;
  onPrev: () => void;
  piecesTotal: number;
}

export function EventDetailsStep({
  event,
  onEventChange,
  onNext,
}: EventDetailsStepProps) {
  const [dateError, setDateError] = useState<string>("");

  const { form, isCityValid, isDateValid, isNameValid, isPhoneValid, isValid } =
    useEventDetailsForm({
      defaultValues: {
        city: event.details.city,
        date: event.details.date ? toLocalISODate(event.details.date) : "",
        name: event.customer.name,
        phone: event.customer.phone,
        type: event.details.type,
      },
      onSubmit: () => {
        handleNext();
      },
    });

  const handleFieldChange = useCallback(
    (field: string, value: null | number | string) => {
      if (field === "date" && typeof value === "string") {
        // Create a local date to avoid timezone issues
        const [year, month, day] = value.split("-").map(Number);
        const localDate = new Date(year, month - 1, day);

        onEventChange({
          details: { ...event.details, date: localDate },
        });
      } else if (field === "name" || field === "phone") {
        onEventChange({
          customer: { ...event.customer, [field]: value },
        });
      } else if (field === "city" || field === "type") {
        onEventChange({
          details: { ...event.details, [field]: value },
        });
      }
    },
    [onEventChange, event.details, event.customer],
  );

  const handleNext = () => {
    const currentDate = form.getValues("date");
    if (currentDate) {
      // Create a local date to avoid timezone issues
      const [year, month, day] = currentDate.split("-").map(Number);
      const selectedDate = new Date(year, month - 1, day);

      const yesterday = new Date();
      yesterday.setHours(0, 0, 0, 0);
      yesterday.setDate(yesterday.getDate() - 1);

      if (selectedDate < yesterday) {
        setDateError("La fecha del evento no puede ser anterior a ayer");
        return;
      }
    }

    setDateError("");
    onNext();
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>1) Datos del evento</CardTitle>
        <CardDescription>Cuéntanos lo esencial para tu evento.</CardDescription>
      </CardHeader>
      <CardContent
        className={`
          grid gap-4
          sm:grid-cols-2
        `}
      >
        <Form {...form}>
          <form className="contents">
            <FormFieldInput
              control={form.control}
              icon={User}
              isValid={isNameValid}
              label="Nombre completo"
              name="name"
              onFieldChange={(value) => handleFieldChange("name", value)}
              placeholder="Ej: María González López"
              required
            />

            <FormFieldInput
              control={form.control}
              icon={Phone}
              inputMode="numeric"
              isValid={isPhoneValid}
              label="Teléfono"
              maxLength={10}
              name="phone"
              onFieldChange={(value) => handleFieldChange("phone", value)}
              placeholder="Ej: 5512345678"
              required
            />

            <FormFieldInput
              control={form.control}
              icon={MapPin}
              isValid={isCityValid}
              label="Ciudad"
              list="city-list"
              name="city"
              onFieldChange={(value) => handleFieldChange("city", value)}
              placeholder="Ej. San Pedro"
              required
            />
            <datalist id="city-list">
              {CITIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>

            <div>
              <FormFieldInput
                control={form.control}
                icon={Calendar}
                isValid={isDateValid && !dateError}
                label="Fecha del evento"
                min={toLocalISODate(new Date())}
                name="date"
                onFieldChange={(value) => {
                  handleFieldChange("date", value);
                  setDateError("");
                }}
                required
                type="date"
              />
              {dateError && (
                <p className="mt-1 text-sm font-medium text-destructive">
                  {dateError}
                </p>
              )}
            </div>

            <FormFieldToggleGroup
              containerClassName="col-span-full"
              control={form.control}
              label="Tipo de evento"
              name="type"
              onFieldChange={(value) => handleFieldChange("type", value)}
              options={EVENT_TYPES}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button disabled variant="ghost">
          <ChevronLeft className="mr-2 h-4 w-4" /> Atrás
        </Button>
        <Button disabled={!isValid} onClick={handleNext}>
          Continuar <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
