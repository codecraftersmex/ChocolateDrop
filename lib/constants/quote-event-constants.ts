import {
  Baby,
  BriefcaseBusiness,
  Cake,
  Heart,
  PartyPopper,
} from "lucide-react";

// Pricing constants
export const UNIT_PRICE_PASTELITOS = 85; // MXN
export const UNIT_PRICE_BRIGADEIROS = 60; // MXN
export const MIN_PASTELITOS = 50;
export const MIN_BRIGADEIROS = 100;
export const CART_RENTAL_PRICE = 2800; // MXN flat
export const SERVICE_HOURS = 3; // for copy only

// Event types configuration
export const EVENT_TYPES = [
  { icon: PartyPopper, id: "social", label: "Social" },
  { icon: Heart, id: "boda", label: "Boda" },
  { icon: BriefcaseBusiness, id: "corporativo", label: "Corporativo" },
  { icon: Cake, id: "cumpleaños", label: "Cumpleaños" },
  { icon: Baby, id: "baby", label: "Baby Shower" },
];

// Cities list
export const CITIES = [
  "Monterrey",
  "San Pedro",
  "San Nicolás",
  "Guadalupe",
  "Apodaca",
  "Santa Catarina",
  "General Escobedo",
];
