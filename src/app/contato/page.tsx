import type { Metadata } from "next";
import { Suspense } from "react";
import { phoneHref, siteConfig } from "@/config/site";
import { ContactForm, ContactFormWithParams } from "./contact-form";

const description =
  "Fale com o comercial da Lottopag sobre gateway de pagamentos, Cash-In, Cash-Out, conciliação e integrações para a sua operação.";

export const metadata: Metadata = {
  title: "Falar com o comercial",
  description,
  openGraph: { title: `Falar com o comercial · ${siteConfig.name}`, description },
  alternates: siteConfig.isDomainConfirmed ? { canonical: "/contato" } : undefined,
};

const nextSteps = [
  "Entendemos como sua operação recebe, paga e concilia hoje.",
  "Mapeamos canais, meios de pagamento e integrações necessárias.",
  "Apresentamos o escopo e as condições comerciais do projeto.",
];

export default function ContatoPage() {
  const { email, phone } = siteConfig.contact;
  const fallback = { email, phone, phoneHref: phone ? phoneHref(phone) : null };

  return (
    <>
      {/* A faixa escura contém só o título; o formulário sobe sobre ela com uma sobreposição fixa. */}
      <section aria-labelledby="contato-titulo" className="surface-dark hero-field text-white">
        <div className="mx-auto max-w-[1200px] px-4 pt-14 pb-24 sm:px-6 md:pt-20 lg:px-8 lg:pb-56">
          <div className="max-w-md">
            <h1 id="contato-titulo" className="text-[2.25rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl">
              Fale com o comercial.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-mist-strong">
              Conte sobre a sua operação e o time comercial retorna para desenhar o fluxo de pagamentos com você.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 pb-20 sm:px-6 md:pb-28 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:gap-16 lg:px-8">
        <div className="-mt-14 rounded-2xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.22)] lg:order-2 lg:-mt-44">
          <Suspense fallback={<ContactForm fallback={fallback} />}>
            <ContactFormWithParams fallback={fallback} />
          </Suspense>
        </div>

        <aside aria-labelledby="proximos-passos" className="lg:order-1 lg:pt-14">
          <h2 id="proximos-passos" className="text-lg font-semibold">
            O que acontece depois do contato
          </h2>
          <ol className="mt-5 space-y-4">
            {nextSteps.map((step, index) => (
              <li key={step} className="flex gap-4 text-[0.9375rem] leading-relaxed text-ink-muted">
                <span
                  aria-hidden
                  className="tabular inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white"
                >
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </>
  );
}
