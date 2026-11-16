import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-28 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Página não encontrada.</h1>
      <p className="mt-4 max-w-md text-lg text-ink-muted">O endereço acessado não existe ou foi alterado.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="secondary-light">
          Voltar para o início
        </ButtonLink>
        <ButtonLink href="/contato" arrow>
          Falar com o comercial
        </ButtonLink>
      </div>
    </section>
  );
}
