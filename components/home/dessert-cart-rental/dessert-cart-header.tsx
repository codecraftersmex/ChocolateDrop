import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DessertCartHeader() {
  return (
    <CardHeader
      className={`
        space-y-2 p-0
        sm:space-y-3
      `}
    >
      <CardTitle
        className={`
          font-display text-2xl leading-tight font-bold tracking-tight
          md:text-4xl
        `}
      >
        Renta de Carrito y Mesa de Postres para Eventos
      </CardTitle>
      <CardDescription
        className={`
          text-base leading-relaxed
          sm:text-lg
        `}
      >
        Haz de tu celebración un momento inolvidable con nuestras opciones de
        renta: el encantador <strong>Carrito de Postres</strong> para eventos
        especiales o la elegante <strong>Mesa de Postres</strong> ideal para
        bodas, fiestas grandes y eventos corporativos.
      </CardDescription>
    </CardHeader>
  );
}
