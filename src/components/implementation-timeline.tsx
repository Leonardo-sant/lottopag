import { Check } from "lucide-react";
import { implementationSteps } from "@/content/catalog";

/**
 * Linha do tempo da implantação.
 * `compact`: horizontal no desktop, só com o resumo (home).
 * `detailed`: vertical, com as atividades de cada etapa (página de implantação).
 */
export function ImplementationTimeline({ variant = "compact" }: { variant?: "compact" | "detailed" }) {
  if (variant === "compact") {
    return (
      <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
        <span aria-hidden className="absolute top-[15px] right-0 left-0 hidden h-px bg-rule md:block" />
        <span aria-hidden className="absolute top-0 bottom-0 left-[15px] w-px bg-rule md:hidden" />
        {implementationSteps.map((step, index) => (
          <li key={step.name} className="relative pl-12 md:pl-0">
            <span
              aria-hidden
              className="tabular absolute top-0 left-0 inline-flex size-[31px] items-center justify-center rounded-full bg-ink text-sm font-semibold text-white ring-4 ring-paper md:relative"
            >
              {index + 1}
            </span>
            <h3 className="text-lg font-semibold tracking-[-0.01em] md:mt-6">
              <span className="sr-only">Etapa {index + 1}: </span>
              {step.name}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{step.summary}</p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="relative">
      {implementationSteps.map((step, index) => (
        <li key={step.name} className="relative grid gap-6 pb-14 pl-14 last:pb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-14 md:pl-20">
          {index < implementationSteps.length - 1 && (
            <span aria-hidden className="absolute top-10 bottom-0 left-[19px] w-px bg-rule md:left-[23px]" />
          )}
          <span
            aria-hidden
            className="tabular absolute top-0 left-0 inline-flex size-10 items-center justify-center rounded-full bg-ink text-base font-semibold text-white md:size-12 md:text-lg"
          >
            {index + 1}
          </span>
          <div className="md:pt-2">
            <h2 id={`etapa-${index + 1}`} className="text-2xl font-semibold tracking-[-0.02em] md:text-[1.75rem]">
              <span className="sr-only">Etapa {index + 1}: </span>
              {step.name}
            </h2>
            <p className="mt-3 max-w-md text-[1.0625rem] leading-relaxed text-ink-muted">{step.summary}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 ring-1 ring-rule md:mt-1">
            <h3 className="text-sm font-semibold text-ink-muted">O que acontece nesta etapa</h3>
            <ul className="mt-4 space-y-3">
              {step.activities.map((activity) => (
                <li key={activity} className="flex gap-3 text-[0.9375rem] leading-snug">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-ink" strokeWidth={2.5} />
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
