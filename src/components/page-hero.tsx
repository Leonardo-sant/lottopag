import type { ReactNode } from "react";

/** Abertura escura das páginas internas. */
export function PageHero({
  title,
  lead,
  children,
}: {
  title: ReactNode;
  lead: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="surface-dark hero-field relative overflow-hidden text-white">
      <div className="relative mx-auto max-w-[1200px] px-4 pt-16 pb-16 sm:px-6 md:pt-24 md:pb-20 lg:px-8">
        <h1 className="max-w-3xl text-[2.25rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl md:text-[3.5rem]">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist-strong">{lead}</p>
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
