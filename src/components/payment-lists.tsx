import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { cashIn, cashOut, type PaymentMethod } from "@/content/catalog";

function MethodList({
  id,
  title,
  subtitle,
  direction,
  methods,
  compact,
}: {
  id: string;
  title: string;
  subtitle: string;
  direction: "in" | "out";
  methods: PaymentMethod[];
  compact?: boolean;
}) {
  const Icon = direction === "in" ? ArrowDownLeft : ArrowUpRight;
  return (
    <div id={id} className="min-w-0">
      <div className="flex items-start gap-3 border-b-2 border-ink pb-4">
        <span
          aria-hidden
          className={`mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full ${
            direction === "in" ? "bg-brand text-ink" : "bg-ink text-white"
          }`}
        >
          <Icon className="size-[18px]" strokeWidth={2.25} />
        </span>
        <div>
          <h3 className="text-xl font-semibold tracking-[-0.01em]">{title}</h3>
          <p className="text-[0.9375rem] text-ink-muted">{subtitle}</p>
        </div>
      </div>
      <ul className="divide-y divide-rule">
        {methods.map((method) => (
          <li
            key={method.name}
            className={`grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6 ${compact ? "md:grid-cols-[9.5rem_1fr]" : ""}`}
          >
            <span className="font-semibold">{method.name}</span>
            <span className="text-[0.9375rem] leading-relaxed text-ink-muted">{method.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Listas comparáveis de Cash-In e Cash-Out, lado a lado no desktop. */
export function PaymentLists({ compact = false, headingLevelIds = true }: { compact?: boolean; headingLevelIds?: boolean }) {
  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
      <MethodList
        id={headingLevelIds ? "cash-in" : "home-cash-in"}
        title="Cash-In · Recebimentos"
        subtitle="Entradas de recursos na operação"
        direction="in"
        methods={cashIn}
        compact={compact}
      />
      <MethodList
        id={headingLevelIds ? "cash-out" : "home-cash-out"}
        title="Cash-Out · Pagamentos"
        subtitle="Saídas de recursos da operação"
        direction="out"
        methods={cashOut}
        compact={compact}
      />
    </div>
  );
}
