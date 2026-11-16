import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { mainNav, phoneHref, siteConfig } from "@/config/site";

export function SiteFooter() {
  const { contact, legalLinks } = siteConfig;

  return (
    <footer className="surface-dark bg-coal-950 text-mist">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <BrandMark />
          <p className="mt-4 text-[0.9375rem] leading-relaxed">
            Gateway de pagamentos, integração financeira e gestão de transações para operações que
            precisam receber, pagar e conciliar com rastreabilidade.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="text-sm font-semibold text-white">Navegação</h2>
          <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-white">Comercial</h2>
          <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
            <li>
              <Link href="/contato" className="hover:text-white">
                Falar com o comercial
              </Link>
            </li>
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </li>
            )}
            {contact.phone && (
              <li>
                <a href={phoneHref(contact.phone)} className="tabular hover:text-white">
                  {contact.phone}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-rule-dark/60">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-4 py-6 text-[0.8125rem] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {siteConfig.name}. Meios de pagamento, integrações e condições
            operacionais conforme escopo contratado.
          </p>
          {legalLinks.length > 0 && (
            <ul className="flex gap-5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
