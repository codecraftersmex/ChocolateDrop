import type { Event } from "@/lib/types/event";

import { z } from "zod";

import { EventStatus } from "../constants/event-constants";

// Customer schema for reuse
const customerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener 10 dígitos")
    .max(10, "El teléfono debe tener 10 dígitos")
    .regex(/^\d+$/, "El teléfono solo debe contener números"),
});

// Event details schema
const eventDetailsSchema = z.object({
  city: z.string().min(1, "Selecciona una ciudad"),
  date: z.date().optional(),
  type: z.string().min(1, "Selecciona un tipo de evento"),
});

// Event products schema
const eventProductsSchema = z.object({
  qtyBrigadeiros: z.number().min(0),
  qtyPastelitos: z.number().min(0),
  withCart: z.boolean(),
});

// Event totals schema
const eventTotalsSchema = z.object({
  subtotalExtras: z.number().optional(),
  subtotalProducts: z.number().optional(),
  total: z.number(),
});

// Schema for form input (date as string)
export const eventDetailsFormSchema = z.object({
  city: z.string().min(1, "Selecciona una ciudad"),
  date: z.string().min(1, "Selecciona una fecha"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener 10 dígitos")
    .max(10, "El teléfono debe tener 10 dígitos")
    .regex(/^\d+$/, "El teléfono solo debe contener números"),
  type: z.string().min(1, "Selecciona un tipo de evento"),
});

// Schema for processed data (date as Date object)
export const eventDetailsProcessedSchema = z.object({
  customer: customerSchema,
  details: eventDetailsSchema,
});

export const eventSchema = z.object({
  customer: customerSchema,
  details: eventDetailsSchema,
  products: eventProductsSchema,
  totals: eventTotalsSchema,
});

export type EventDetailsFormData = z.infer<typeof eventDetailsFormSchema>;
export type EventDetailsProcessedData = z.infer<
  typeof eventDetailsProcessedSchema
>;
export type EventFormData = z.infer<typeof eventSchema>;

// Helper function to create a new Event with default values
export const createDefaultEvent = (): Event => ({
  createdAt: new Date(),
  customer: {
    name: "",
    phone: "",
  },
  details: {
    city: "",
    date: undefined,
    type: "social",
  },
  id: undefined,
  products: {
    qtyBrigadeiros: 0,
    qtyPastelitos: 0,
    withCart: false,
  },
  status: EventStatus.LEAD,
  totals: {
    subtotalExtras: undefined,
    subtotalProducts: undefined,
    total: 0,
  },
  updatedAt: new Date(),
});

// Helper function to transform form data to processed data
export const transformEventDetailsFormData = (
  formData: EventDetailsFormData,
): EventDetailsProcessedData => {
  return {
    customer: {
      name: formData.name,
      phone: formData.phone,
    },
    details: {
      city: formData.city,
      date: formData.date ? new Date(formData.date) : undefined,
      type: formData.type,
    },
  };
};

// Helper function to validate and prepare Event for Firestore
export const prepareEventForFirestore = (event: Event) => {
  return eventSchema.parse(event);
};
