import { ButtonLink } from "@/components/button-link";

/** Encerramento comercial, comum a todas as páginas de conteúdo. */
export function ClosingCta({
  title = "Vamos desenhar o fluxo de pagamentos da sua operação?",
  lead = "Conte como sua empresa recebe, paga e concilia hoje. O time comercial mapeia o fluxo com você e apresenta o escopo e as condições para o seu projeto.",
  href = "/contato",
  cta = "Falar com o comercial",
}: {
  title?: string;
  lead?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <section aria-labelledby="encerramento" className="surface-brand bg-brand text-ink">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-20 sm:px-6 md:grid-cols-[1.5fr_1fr] md:items-end md:py-24 lg:px-8">
        <div>
          <h2 id="encerramento" className="max-w-2xl text-[2rem] leading-[1.1] font-semibold tracking-[-0.025em] sm:text-[2.75rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">{lead}</p>
        </div>
        <div className="md:justify-self-end">
          <ButtonLink href={href} variant="ink" arrow className="h-14! px-7! text-base!">
            {cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
