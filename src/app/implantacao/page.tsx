import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ClosingCta } from "@/components/closing-cta";
import { ImplementationTimeline } from "@/components/implementation-timeline";
import { PageHero } from "@/components/page-hero";
import { contactHref } from "@/content/catalog";
import { siteConfig } from "@/config/site";

const description =
  "Como funciona a implantação do gateway Lottopag: mapeamento do fluxo, configuração, integração e homologação e ativação assistida. Perguntas frequentes.";

export const metadata: Metadata = {
  title: "Implantação",
  description,
  openGraph: { title: `Implantação · ${siteConfig.name}`, description },
  alternates: siteConfig.isDomainConfirmed ? { canonical: "/implantacao" } : undefined,
};

const faq: { question: string; answer: ReactNode }[] = [
  {
    question: "Quais meios de pagamento a Lottopag atende?",
    answer: (
      <>
        <p>
          No Cash-In: Pix, boleto, TED e transferências, transferências internas e recebimentos de canais físicos
          e digitais. No Cash-Out: Pix, transferências, TED e pagamento de contas, boletos e tributos conforme a
          estrutura contratada. O gateway também prevê split, cobrança recorrente, links de pagamento, checkout de
          e-commerce e POS quando previstos no projeto.
        </p>
        <p>
          A disponibilidade de cada meio depende do escopo contratado, dos parceiros habilitados e da configuração
          técnica prevista para a operação.{" "}
          <Link href="/solucoes#movimentacao" className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
            Ver meios de pagamento
          </Link>
        </p>
      </>
    ),
  },
  {
    question: "A integração é feita via API?",
    answer: (
      <p>
        Sim. A plataforma da sua empresa se conecta ao gateway por API. Na etapa de configuração definimos APIs,
        usuários, permissões e ambiente operacional; na homologação validamos os meios de pagamento e as jornadas
        previstas no projeto antes da entrada em operação.
      </p>
    ),
  },
  {
    question: "Quais são as etapas da implantação?",
    answer: (
      <p>
        São quatro: mapeamento do fluxo, configuração do gateway, integração e homologação e ativação assistida.
        Cada etapa parte do que foi definido na anterior, e o acompanhamento continua depois da entrada em
        operação, com conciliação e ajustes conforme a operação evolui.
      </p>
    ),
  },
  {
    question: "Quanto tempo leva para entrar em operação?",
    answer: (
      <p>
        O prazo depende do escopo técnico, das integrações e dos meios de pagamento de cada projeto, e é definido
        com o time comercial no momento da contratação.{" "}
        <Link href={contactHref({ assunto: "implantacao" })} className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
          Falar sobre prazos
        </Link>
      </p>
    ),
  },
  {
    question: "Como funcionam as condições comerciais?",
    answer: (
      <p>
        As condições variam conforme os serviços contratados, o volume processado e o desenho do projeto. O time
        comercial apresenta a proposta depois de entender a sua operação.{" "}
        <Link href={contactHref({ assunto: "condicoes-comerciais" })} className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
          Consultar condições comerciais
        </Link>
      </p>
    ),
  },
  {
    question: "O que acontece depois da ativação?",
    answer: (
      <p>
        A operação passa a ser acompanhada com foco em processamento das transações, conciliação financeira,
        gestão dos canais, monitoramento de inconsistências e registros para prestação de contas. Regras e
        integrações podem ser ajustadas conforme a operação cresce.
      </p>
    ),
  },
];

export default function ImplantacaoPage() {
  return (
    <>
      <PageHero
        title="Do desenho do fluxo à operação acompanhada."
        lead="A implantação conecta canais, meios de pagamento e regras operacionais em quatro etapas, com o fluxo definido antes de qualquer configuração."
      >
        <ButtonLink href={contactHref({ assunto: "implantacao" })} arrow>
          Falar com o comercial
        </ButtonLink>
      </PageHero>

      <section aria-label="Etapas da implantação" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <ImplementationTimeline variant="detailed" />
        </div>
      </section>

      <section aria-labelledby="perguntas" className="border-t border-rule bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16 lg:px-8">
          <div>
            <h2 id="perguntas" className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.025em] sm:text-[2.5rem]">
              Perguntas frequentes
            </h2>
            <p className="mt-4 max-w-sm text-[1.0625rem] leading-relaxed text-ink-muted">
              Prazos, meios disponíveis e condições específicas da sua operação são tratados com o time comercial.
            </p>
          </div>
          <div className="border-t-2 border-ink">
            {faq.map((item) => (
              <details key={item.question} className="group border-b border-rule">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <Plus
                    aria-hidden
                    className="size-5 shrink-0 text-brand-ink transition-transform duration-300 ease-out-expo group-open:rotate-45"
                  />
                </summary>
                <div className="max-w-[65ch] space-y-3 pb-6 text-[0.9375rem] leading-relaxed text-ink-muted">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
