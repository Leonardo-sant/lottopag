"use client";

import { useEffect, useState } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { StatusChip, type TxStatus } from "@/components/status-chip";

type Tx = {
  id: string;
  method: string;
  direction: "in" | "out";
  cents: number;
  status: TxStatus;
};

// Dados fictícios, apenas para ilustrar o fluxo.
const initialRows: Tx[] = [
  { id: "TX-48210", method: "Pix", direction: "in", cents: 125000, status: "liquidado" },
  { id: "TX-48211", method: "Boleto", direction: "in", cents: 389990, status: "processado" },
  { id: "TX-48212", method: "TED", direction: "out", cents: 1200000, status: "pendente" },
  { id: "TX-48213", method: "Pix", direction: "out", cents: 48750, status: "processado" },
  { id: "TX-48214", method: "Canal físico", direction: "in", cents: 76420, status: "pendente" },
];

const sequence: TxStatus[] = ["pendente", "processado", "liquidado"];

const stages = [
  { label: "Recebimento", status: "pendente" as TxStatus },
  { label: "Processamento", status: "processado" as TxStatus },
  { label: "Pagamento e conciliação", status: "liquidado" as TxStatus },
];

function formatBRL(cents: number) {
  const reais = Math.floor(cents / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const centavos = (cents % 100).toString().padStart(2, "0");
  return `R$ ${reais},${centavos}`;
}

export function FlowIllustration() {
  const [rows, setRows] = useState(initialRows);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setRows((current) => {
        const next = [...current];
        // Avança a transação mais antiga que ainda não foi liquidada.
        const index = next.findIndex((row) => row.status !== "liquidado");
        if (index !== -1) {
          const step = sequence.indexOf(next[index].status);
          next[index] = { ...next[index], status: sequence[step + 1] };
        }
        // Mantém o extrato rodando: a liquidada mais antiga sai e uma nova entra pendente.
        if (index === -1 || next.filter((row) => row.status === "liquidado").length > 2) {
          const oldest = next.findIndex((row) => row.status === "liquidado");
          const serial = Math.max(...next.map((row) => Number(row.id.slice(3)))) + 1;
          next.splice(oldest, 1);
          next.push({
            id: `TX-${serial}`,
            method: ["Pix", "Boleto", "TED", "Canal físico"][serial % 4],
            direction: serial % 3 ? "in" : "out",
            cents: 25000 + ((serial * 7919) % 900000),
            status: "pendente",
          });
        }
        return next;
      });
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  const totals = sequence.map((status) => ({
    status,
    cents: rows.filter((row) => row.status === status).reduce((sum, row) => sum + row.cents, 0),
  }));

  return (
    <figure className="relative overflow-hidden rounded-2xl bg-coal-800 text-left shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-rule-dark">
      <figcaption className="flex items-center justify-between border-b border-rule-dark px-5 py-3.5 text-[0.8125rem] text-mist">
        <span className="font-semibold text-white">Fluxo ilustrativo</span>
        <span>Dados fictícios</span>
      </figcaption>

      {/* Estágios do fluxo */}
      <ol className="grid grid-cols-3 gap-0 border-b border-rule-dark px-3 py-4 sm:px-5">
        {stages.map((stage, i) => {
          const count = rows.filter((row) => row.status === stage.status).length;
          return (
            <li key={stage.label} className="relative flex flex-col items-start px-2">
              <div className="flex w-full items-center">
                <span
                  aria-hidden
                  className={`relative z-10 size-3 shrink-0 rounded-full ring-4 ring-coal-800 ${
                    stage.status === "pendente"
                      ? "bg-state-pending"
                      : stage.status === "processado"
                        ? "bg-state-processed"
                        : "bg-state-settled"
                  }`}
                />
                {i < stages.length - 1 && (
                  <svg aria-hidden className="ml-1 h-2 flex-1 text-brand/70" preserveAspectRatio="none" viewBox="0 0 100 2">
                    <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeWidth="2" className="flow-dash" vectorEffect="non-scaling-stroke" />
                  </svg>
                )}
              </div>
              <span className="mt-2.5 text-[0.75rem] leading-tight font-semibold text-white sm:text-[0.8125rem]">
                {stage.label}
              </span>
              <span className="tabular mt-0.5 text-[0.75rem] text-mist">
                {count} {count === 1 ? "transação" : "transações"}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Extrato de transações */}
      <table className="tabular w-full text-[0.8125rem]">
        <caption className="sr-only">Transações fictícias e seus estados</caption>
        <thead className="text-left text-[0.75rem] text-mist">
          <tr>
            <th scope="col" className="py-2.5 pl-5 font-medium">
              Transação
            </th>
            <th scope="col" className="hidden py-2.5 font-medium sm:table-cell">
              Meio
            </th>
            <th scope="col" className="py-2.5 text-right font-medium">
              Valor
            </th>
            <th scope="col" className="py-2.5 pr-5 text-right font-medium">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-rule-dark/70">
              <td className="py-3 pl-5">
                <span className="flex items-center gap-2 text-white">
                  {row.direction === "in" ? (
                    <ArrowDownLeft aria-label="Entrada" className="size-3.5 text-brand" strokeWidth={2.25} />
                  ) : (
                    <ArrowUpRight aria-label="Saída" className="size-3.5 text-mist" strokeWidth={2.25} />
                  )}
                  {row.id}
                </span>
                <span className="mt-0.5 block pl-5.5 text-[0.75rem] text-mist sm:hidden">{row.method}</span>
              </td>
              <td className="hidden py-3 text-mist-strong sm:table-cell">
                {row.method} · {row.direction === "in" ? "Cash-In" : "Cash-Out"}
              </td>
              <td className="py-3 text-right text-white">{formatBRL(row.cents)}</td>
              <td className="py-3 pr-5 text-right">
                <StatusChip
                  key={`${row.id}-${row.status}`}
                  status={row.status}
                  animate={!initialRows.some((r) => r.id === row.id && r.status === row.status)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Resumo de conciliação */}
      <dl className="grid grid-cols-3 border-t border-rule-dark bg-coal-900/60">
        {totals.map((total) => (
          <div key={total.status} className="border-r border-rule-dark px-3 py-3.5 last:border-r-0 sm:px-5">
            <dt className="text-[0.75rem] text-mist capitalize">{total.status}</dt>
            <dd className="tabular mt-0.5 text-[0.8125rem] font-semibold text-white sm:text-sm">{formatBRL(total.cents)}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
