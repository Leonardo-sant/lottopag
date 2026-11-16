import type { ReactNode } from "react";

export function SectionHeader({
  id,
  title,
  lead,
  aside,
}: {
  id: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-end">
      <div>
        <h2 id={id} className="max-w-2xl text-[2rem] leading-[1.1] font-semibold tracking-[-0.025em] sm:text-[2.5rem]">
          {title}
        </h2>
        {lead && <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-ink-muted">{lead}</p>}
      </div>
      {aside && <div className="md:justify-self-end">{aside}</div>}
    </div>
  );
}
