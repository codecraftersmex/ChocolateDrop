import {
  type EventDetailsProcessedData,
  type EventDetailsFormData,
  eventDetailsFormSchema,
  transformEventDetailsFormData,
} from "@/lib/schemas/event-details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UseEventDetailsFormProps {
  defaultValues?: {
    city?: string;
    date?: string;
    name?: string;
    phone?: string;
    type?: string;
  };
  onSubmit?: (data: EventDetailsProcessedData) => void;
}

export function useEventDetailsForm({
  defaultValues = {
    city: "",
    date: "",
    name: "",
    phone: "",
    type: "social",
  },
  onSubmit,
}: UseEventDetailsFormProps = {}) {
  const form = useForm<EventDetailsFormData>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(eventDetailsFormSchema),
  });

  const {
    formState: { dirtyFields, errors, isValid },
  } = form;

  const isNameValid = !errors.name && dirtyFields.name;
  const isPhoneValid = !errors.phone && dirtyFields.phone;
  const isCityValid = !errors.city && dirtyFields.city;
  const isDateValid = !errors.date && dirtyFields.date;

  const handleSubmit = form.handleSubmit((data) => {
    const processedData = transformEventDetailsFormData(data);
    onSubmit?.(processedData);
  });

  return {
    errors,
    form,
    getValues: form.getValues,
    handleSubmit,
    isCityValid,
    isDateValid,
    isNameValid,
    isPhoneValid,
    isValid,
    setValue: form.setValue,
    watch: form.watch,
  };
}
