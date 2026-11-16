export type TxStatus = "pendente" | "processado" | "liquidado";

const tone: Record<TxStatus, { tone: "dark" | "light"; dot: string; dark: string; light: string }> = {
  pendente: {
    tone: "dark",
    dot: "bg-state-pending",
    dark: "bg-white/5 text-mist ring-white/15",
    light: "bg-paper-2 text-ink-muted ring-rule",
  },
  processado: {
    tone: "dark",
    dot: "bg-state-processed",
    dark: "bg-white/10 text-white ring-white/35",
    light: "bg-white text-ink ring-ink/30",
  },
  liquidado: {
    tone: "dark",
    dot: "bg-state-settled",
    dark: "bg-brand text-coal-950 ring-brand",
    light: "bg-ink text-white ring-ink",
  },
};

/** Chip de estado de transação: sempre com rótulo textual, nunca só cor. */
export function StatusChip({
  status,
  surface = "dark",
  animate = false,
}: {
  status: TxStatus;
  surface?: "dark" | "light";
  animate?: boolean;
}) {
  const t = tone[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.75rem] leading-none font-medium capitalize ring-1 ring-inset ${
        surface === "dark" ? t.dark : t.light
      } ${animate ? "chip-enter" : ""}`}
    >
      <span aria-hidden className={`size-1.5 rounded-full ${status === "liquidado" ? (surface === "light" ? "bg-brand" : "bg-coal-950") : t.dot}`} />
      {status}
    </span>
  );
}
