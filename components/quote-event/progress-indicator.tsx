import { cn } from "@/lib/utils";

interface ProgressProps {
  step: number; // 0-indexed
}

export function Progress({ step }: ProgressProps) {
  const steps = ["Evento", "Elige", "Extras", "Resumen"];
  const total = steps.length;
  const currentStep = Math.min(total - 1, Math.max(0, step));

  return (
    <nav
      aria-label="Progreso"
      className={cn(
        `
          rounded-2xl border bg-card p-2.5 shadow-sm
          sm:p-4
        `,
      )}
    >
      <ol className="flex items-start">
        {steps.map((label, idx) => {
          const isActiveOrDone = idx <= currentStep;
          const isCurrent = idx === currentStep;

          return (
            <li
              aria-current={isCurrent ? "step" : undefined}
              className={`
                relative flex flex-1 flex-col items-center gap-1.5 text-center
                sm:gap-2
              `}
              key={label}
            >
              {idx < total - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    `
                      absolute top-[18px] left-[calc(50%+18px)] h-px
                      w-[calc(100%-36px)]
                      sm:top-[22px] sm:left-[calc(50%+22px)]
                      sm:w-[calc(100%-44px)]
                    `,
                    idx < currentStep ? "bg-primary/60" : "bg-border",
                  )}
                />
              )}

              <span
                className={cn(
                  `
                    relative z-[1] flex h-9 w-9 items-center justify-center
                    rounded-full border text-base font-semibold
                    sm:h-11 sm:w-11 sm:text-xl
                  `,
                  isActiveOrDone
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground",
                )}
              >
                {idx + 1}
              </span>

              <span
                className={cn(
                  `
                    text-xs leading-none
                    sm:text-base
                  `,
                  isCurrent
                    ? "font-semibold text-foreground"
                    : "text-foreground/70",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
