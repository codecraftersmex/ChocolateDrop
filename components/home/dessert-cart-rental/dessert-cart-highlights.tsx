import { Check } from "lucide-react";

const cartFeatures = [
  {
    id: "cart-elegant",
    text: "Carrito elegante y personalizable para cualquier tipo de evento",
  },
  {
    id: "cart-variety",
    text: "Variedad de brigadeiros y dulces para elegir",
  },
  {
    id: "cart-setup",
    text: "Montaje y desmontaje incluidos",
  },
];

const barFeatures = [
  {
    id: "bar-spacious",
    text: "Mesa amplia y elegante ideal para eventos grandes",
  },
  {
    id: "bar-decoration",
    text: "Decoración adaptable al tema del evento",
  },
  {
    id: "bar-service",
    text: "Asistencia de personal para servicio durante el evento",
  },
];

export function DessertCartHighlights() {
  return (
    <div
      className={`
        space-y-4
        sm:space-y-6
      `}
    >
      {/* Carrito de Postres */}
      <div
        className={`
          space-y-2
          sm:space-y-3
        `}
      >
        <h3
          className={`
            text-lg font-semibold
            sm:text-xl
          `}
        >
          Carrito de Postres
        </h3>
        <div
          className={`
            space-y-2
            sm:space-y-3
          `}
        >
          {cartFeatures.map((feature) => (
            <div className="flex items-start gap-3" key={feature.id}>
              <div
                className={`
                  mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center
                  rounded-full bg-primary/20
                `}
              >
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span
                className={`
                  text-sm leading-relaxed text-muted-foreground
                  sm:text-base
                `}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mesa de Postres */}
      <div
        className={`
          space-y-2
          sm:space-y-3
        `}
      >
        <h3
          className={`
            text-lg font-semibold
            sm:text-xl
          `}
        >
          Mesa de Postres
        </h3>
        <div
          className={`
            space-y-2
            sm:space-y-3
          `}
        >
          {barFeatures.map((feature) => (
            <div className="flex items-start gap-3" key={feature.id}>
              <div
                className={`
                  mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center
                  rounded-full bg-primary/20
                `}
              >
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span
                className={`
                  text-sm leading-relaxed text-muted-foreground
                  sm:text-base
                `}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
