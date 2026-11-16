import type { Metadata } from "next";
import { Info } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/page-hero";
import { PaymentLists } from "@/components/payment-lists";
import { SectionHeader } from "@/components/section-header";
import { StatusChip } from "@/components/status-chip";
import { contactHref, gatewayFeatures, reconciliationFeatures } from "@/content/catalog";
import { siteConfig } from "@/config/site";

const description =
  "Cash-In, Cash-Out, gateway de pagamentos, conciliação e integrações via API da Lottopag: receba, pague e acompanhe cada transação em uma operação integrada.";

export const metadata: Metadata = {
  title: "Soluções",
  description,
  openGraph: { title: `Soluções · ${siteConfig.name}`, description },
  alternates: siteConfig.isDomainConfirmed ? { canonical: "/solucoes" } : undefined,
};

const integrationSteps = [
  {
    name: "APIs",
    detail:
      "Sua plataforma se conecta ao gateway por API para registrar recebimentos, solicitar pagamentos e consultar status e retornos das transações.",
  },
  {
    name: "Usuários e permissões",
    detail:
      "Perfis de acesso são configurados por função, separando quem opera, quem aprova e quem acompanha a conciliação.",
  },
  {
    name: "Regras operacionais",
    detail:
      "Regras de cobrança, repasses, split e canais vinculados são parametrizadas conforme o modelo operacional definido no projeto.",
  },
];

const anchors = [
  { href: "#cash-in", label: "Cash-In" },
  { href: "#cash-out", label: "Cash-Out" },
  { href: "#gateway", label: "Gateway" },
  { href: "#conciliacao", label: "Conciliação" },
  { href: "#integracoes", label: "Integrações" },
];

export default function SolucoesPage() {
  return (
    <div className="[&_[id]]:scroll-mt-16">
      <PageHero
        title="Gateway, Cash-In, Cash-Out e conciliação conectados ao seu fluxo."
        lead="Uma camada única para receber, pagar e acompanhar transações, configurada conforme o modelo operacional da sua empresa."
      >
        <ButtonLink href={contactHref({ assunto: "condicoes-comerciais" })} arrow>
          Consultar condições comerciais
        </ButtonLink>
      </PageHero>

      <nav aria-label="Nesta página" className="sticky top-[var(--header-h)] z-30 border-b border-rule bg-paper">
        <ul className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-4 py-2.5 text-[0.9375rem] sm:px-6 lg:px-8">
          {anchors.map((anchor) => (
            <li key={anchor.href} className="shrink-0">
              <a href={anchor.href} className="inline-block rounded-full px-3.5 py-1.5 text-ink-muted hover:bg-white hover:text-ink">
                {anchor.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Cash-In e Cash-Out */}
      <section aria-labelledby="movimentacao" className="py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="movimentacao"
            title="Meios de pagamento e movimentação."
            lead="Entradas e saídas organizadas em uma única camada, com rastreabilidade e visão do fluxo financeiro de ponta a ponta."
          />
          <PaymentLists />
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <ButtonLink href={contactHref({ assunto: "cash-in" })} variant="text" arrow>
              Falar sobre recebimentos
            </ButtonLink>
            <ButtonLink href={contactHref({ assunto: "cash-out" })} variant="text" arrow>
              Falar sobre pagamentos
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Gateway */}
      <section aria-labelledby="gateway" className="border-t border-rule bg-white py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="gateway"
            title="Gateway de pagamentos."
            lead="Uma camada para conectar diferentes jornadas de pagamento, integrar canais e centralizar a gestão das transações."
            aside={
              <ButtonLink href={contactHref({ assunto: "gateway" })} variant="text" arrow>
                Falar sobre o gateway
              </ButtonLink>
            }
          />
          <dl className="grid gap-x-12 border-t-2 border-ink sm:grid-cols-2">
            {gatewayFeatures.map((feature) => (
              <div key={feature.name} className="border-b border-rule py-6">
                <dt className="text-lg font-semibold tracking-[-0.01em]">{feature.name}</dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{feature.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Conciliação */}
      <section aria-labelledby="conciliacao" className="surface-dark bg-coal-900 py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:px-8">
          <div>
            <h2 id="conciliacao" className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.025em] sm:text-[2.5rem]">
              Conciliação e gestão.
            </h2>
            <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-mist-strong">
              Depois da implantação, o foco passa a ser acompanhar cada transação até a liquidação e saber
              exatamente o que ainda está pendente.
            </p>
            <ul aria-label="Estados de transação" className="mt-8 space-y-4">
              <li className="flex items-center gap-4">
                <StatusChip status="processado" />
                <span className="text-[0.9375rem] text-mist-strong">transação recebida e tratada pelo gateway</span>
              </li>
              <li className="flex items-center gap-4">
                <StatusChip status="liquidado" />
                <span className="text-[0.9375rem] text-mist-strong">valor efetivamente liquidado</span>
              </li>
              <li className="flex items-center gap-4">
                <StatusChip status="pendente" />
                <span className="text-[0.9375rem] text-mist-strong">aguardando retorno ou liquidação</span>
              </li>
            </ul>
            <div className="mt-10">
              <ButtonLink href={contactHref({ assunto: "conciliacao" })} variant="secondary-dark" arrow>
                Falar sobre conciliação
              </ButtonLink>
            </div>
          </div>
          <ul className="divide-y divide-rule-dark border-y border-rule-dark">
            {reconciliationFeatures.map((feature) => (
              <li key={feature.name} className="py-5">
                <h3 className="text-lg font-semibold">{feature.name}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-mist">{feature.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Integrações */}
      <section aria-labelledby="integracoes" className="py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="integracoes"
            title="Integrações configuradas para o seu projeto."
            lead="APIs, permissões e regras operacionais são definidas na implantação, a partir do mapeamento do seu fluxo, e homologadas antes da entrada em operação."
            aside={
              <ButtonLink href="/implantacao" variant="text" arrow>
                Ver as etapas de implantação
              </ButtonLink>
            }
          />
          <ol className="grid gap-px overflow-hidden rounded-2xl bg-rule ring-1 ring-rule md:grid-cols-3">
            {integrationSteps.map((step) => (
              <li key={step.name} className="bg-white p-7">
                <h3 className="text-lg font-semibold tracking-[-0.01em]">{step.name}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{step.detail}</p>
              </li>
            ))}
          </ol>

          <aside className="mt-12 flex gap-4 rounded-2xl bg-paper-2 p-6 ring-1 ring-rule md:items-center md:p-7">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-ink md:mt-0" />
            <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
              <strong className="font-semibold text-ink">Escopo de cada operação.</strong> Os meios de
              pagamento, as integrações e as condições operacionais são definidos conforme o escopo do projeto
              e a disponibilidade dos parceiros habilitados.
            </p>
          </aside>
        </div>
      </section>

      <ClosingCta
        title="Quer saber quanto custa para a sua operação?"
        lead="As condições comerciais variam conforme os serviços, o volume e o desenho do projeto. Fale com o comercial para receber uma proposta."
        href={contactHref({ assunto: "condicoes-comerciais" })}
        cta="Consultar condições comerciais"
      />
    </div>
  );
}
