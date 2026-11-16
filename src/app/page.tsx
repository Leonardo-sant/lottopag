import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ClosingCta } from "@/components/closing-cta";
import { FlowIllustration } from "@/components/flow-illustration";
import { HeroNetwork } from "@/components/hero-network";
import { ImplementationTimeline } from "@/components/implementation-timeline";
import { PaymentLists } from "@/components/payment-lists";
import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} · Gateway de pagamentos e conciliação` },
  description: siteConfig.description,
  alternates: siteConfig.isDomainConfirmed ? { canonical: "/" } : undefined,
};

const platformRows = [
  {
    name: "Gateway de pagamentos",
    detail: "Split, cobrança recorrente, links de pagamento, checkout de e-commerce e POS quando previsto no projeto.",
    href: "/solucoes#gateway",
  },
  {
    name: "Conciliação e gestão",
    detail: "Valores processados, liquidados e pendentes, status e retornos de cada transação e registros para prestação de contas.",
    href: "/solucoes#conciliacao",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-titulo" className="surface-dark hero-field relative overflow-hidden text-white">
        <HeroNetwork />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-4 pt-14 pb-20 sm:px-6 md:pt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12 lg:px-8 lg:pt-24 lg:pb-28">
          <div>
            <h1
              id="hero-titulo"
              className="text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.035em] sm:text-[3.25rem] lg:text-[3.75rem]"
            >
              Receba, pague e concilie em uma operação integrada.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist-strong sm:text-xl">
              A Lottopag conecta meios de pagamento, canais de venda e sistemas para sua empresa
              acompanhar entradas, saídas e liquidações com rastreabilidade.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contato" arrow>
                Falar com o comercial
              </ButtonLink>
              <ButtonLink href="/solucoes" variant="secondary-dark">
                Conhecer as soluções
              </ButtonLink>
            </div>
          </div>
          <FlowIllustration />
        </div>
      </section>

      {/* Soluções */}
      <section aria-labelledby="solucoes" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="solucoes"
            title="Entradas e saídas na mesma camada de controle."
            lead="Cash-In e Cash-Out passam pelo mesmo gateway, com status, retornos e conciliação de cada movimentação."
            aside={
              <ButtonLink href="/solucoes" variant="text" arrow>
                Ver as soluções em detalhe
              </ButtonLink>
            }
          />
          <PaymentLists compact headingLevelIds={false} />

          <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-rule ring-1 ring-rule md:grid-cols-2">
            {platformRows.map((row) => (
              <li key={row.name} className="bg-white">
                <Link href={row.href} className="group flex h-full flex-col gap-3 p-7 transition-colors hover:bg-paper-2 md:p-8">
                  <span className="flex items-center justify-between gap-4 text-xl font-semibold tracking-[-0.01em]">
                    {row.name}
                    <ArrowRight
                      aria-hidden
                      className="size-5 shrink-0 text-brand-ink transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                    />
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-ink-muted">{row.detail}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Implantação */}
      <section aria-labelledby="implantacao" className="border-t border-rule bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="implantacao"
            title="Do mapeamento à ativação assistida."
            lead="A implantação é conduzida em quatro etapas, com o fluxo desenhado antes da configuração e acompanhamento na entrada em operação."
            aside={
              <ButtonLink href="/implantacao" variant="text" arrow>
                Como funciona a implantação
              </ButtonLink>
            }
          />
          <ImplementationTimeline variant="compact" />
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
