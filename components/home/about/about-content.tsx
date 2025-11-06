export function AboutContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2
          className={`
            font-display text-center text-3xl font-extrabold tracking-tight
            md:text-left md:text-5xl
          `}
        >
          Acerca de Nosotros
        </h2>

        <p
          className={`
            mx-auto max-w-2xl leading-relaxed text-muted-foreground
            md:mx-0 md:text-lg
          `}
        >
          <span className="mb-2 block font-semibold text-primary">
            Chocolate Drop nace de la pasión por el detalle.
          </span>
          Cada pieza es un tributo al arte del{" "}
          <span className="italic">chocolate artesanal</span>, creado a mano,
          con ingredientes premium y alma brasileña.
        </p>
      </div>

      <div className="space-y-4 text-muted-foreground">
        <p>
          Hemos transformado esta tradición brasileña en algo único, adaptándola
          a nuestros conocimientos y al gusto mexicano. Cada creación utiliza
          exclusivamente <strong>chocolate belga</strong> e{" "}
          <strong>ingredientes orgánicos</strong>, garantizando la más alta
          calidad en cada bocado.
        </p>

        <p>
          La innovación es parte de nuestra esencia:{" "}
          <strong>creamos un sabor nuevo cada mes</strong>, explorando
          combinaciones que sorprenden y deleitan a nuestros clientes.
        </p>
      </div>
    </div>
  );
}
