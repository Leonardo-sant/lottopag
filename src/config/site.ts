/**
 * Configuração central do site: marca, domínio, contatos e textos legais.
 * Valores sensíveis ao ambiente vêm de variáveis documentadas em `.env.example`.
 */

function clean(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeUrl(value: string | null): URL | null {
  if (!value) return null;
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

const configuredUrl = normalizeUrl(clean(process.env.NEXT_PUBLIC_SITE_URL));

export const siteConfig = {
  name: "Lottopag",
  tagline: "Gateway de pagamentos, integração financeira e gestão de transações",
  description:
    "A Lottopag conecta meios de pagamento, canais de venda e sistemas para sua empresa acompanhar entradas, saídas e liquidações com rastreabilidade.",
  locale: "pt_BR",

  /**
   * Domínio de publicação. Enquanto NEXT_PUBLIC_SITE_URL não estiver definido,
   * canonical e sitemap não são emitidos e o robots.txt bloqueia a indexação.
   */
  url: configuredUrl ?? new URL("http://localhost:3000"),
  isDomainConfirmed: configuredUrl !== null,

  /**
   * Logotipo oficial (arquivos em /public/brand).
   * `onDark`: "Lotto" em branco, para cabeçalho e rodapé escuros.
   * `onLight`: "Lotto" em preto, para fundos claros.
   */
  logo: {
    onDark: "/brand/lottopag-logo-negativo.png",
    onLight: "/brand/lottopag-logo.png",
    width: 1880,
    height: 481,
  },

  /** Contatos comerciais oficiais. Só aparecem no site quando preenchidos. */
  contact: {
    email: clean(process.env.COMMERCIAL_EMAIL),
    phone: clean(process.env.COMMERCIAL_PHONE),
  },

  /** Textos legais. Adicione apenas quando o conteúdo oficial estiver publicado. */
  legalLinks: [] as { label: string; href: string }[],
} as const;

export const mainNav = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Implantação", href: "/implantacao" },
  { label: "Contato", href: "/contato" },
] as const;

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
