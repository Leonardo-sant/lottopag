/**
 * Conteúdo compartilhado entre páginas: produtos, etapas de implantação
 * e os assuntos usados para pré-preencher o formulário de contato.
 */

export type PaymentMethod = { name: string; detail: string };

export const cashIn: PaymentMethod[] = [
  { name: "Pix", detail: "Recebimentos instantâneos integrados ao fluxo operacional." },
  { name: "Boleto", detail: "Cobrança e entrada de recursos com baixa rastreável." },
  { name: "TED e transferências", detail: "Valores originados de outras instituições." },
  { name: "Transferências internas", detail: "Movimentação entre contas e estruturas vinculadas ao ecossistema." },
  { name: "Canais de venda", detail: "Recebimentos gerados por canais físicos e digitais." },
];

export const cashOut: PaymentMethod[] = [
  { name: "Pix", detail: "Envio de recursos integrado ao fluxo de pagamentos." },
  { name: "Transferências", detail: "Movimentação entre contas e estruturas vinculadas." },
  { name: "TED", detail: "Transferências para outras instituições." },
  { name: "Contas e boletos", detail: "Pagamento de compromissos operacionais e cobranças." },
  { name: "Tributos", detail: "Pagamento de tributos conforme a estrutura contratada." },
];

export const gatewayFeatures = [
  {
    name: "Split de pagamento",
    detail: "Regras de distribuição de valores entre os participantes do fluxo, aplicadas no processamento.",
  },
  {
    name: "Cobrança recorrente",
    detail: "Estrutura para pagamentos recorrentes e jornadas de cobrança programada.",
  },
  {
    name: "Links de pagamento e e-commerce",
    detail: "Integração com checkout e jornadas digitais para pagamentos online.",
  },
  {
    name: "POS e canais físicos",
    detail: "Conexão com canais presenciais quando previstos no projeto.",
  },
];

export const reconciliationFeatures = [
  {
    name: "Valores processados, liquidados e pendentes",
    detail: "Visão consolidada do que entrou, do que foi liquidado e do que ainda aguarda retorno.",
  },
  {
    name: "Status e retornos de transações",
    detail: "Acompanhamento dos eventos de entrada, saída, status e retornos de cada transação.",
  },
  {
    name: "Monitoramento de inconsistências",
    detail: "Identificação de divergências e acompanhamento do comportamento operacional.",
  },
  {
    name: "Gestão de canais",
    detail: "Acompanhamento dos canais digitais, integrações e pontos vinculados à operação.",
  },
  {
    name: "Registros para prestação de contas",
    detail: "Informações consolidadas para apoiar conferência, gestão e auditoria.",
  },
];

export type ImplementationStep = {
  name: string;
  summary: string;
  activities: string[];
};

export const implementationSteps: ImplementationStep[] = [
  {
    name: "Mapeamento do fluxo",
    summary: "Desenhamos a jornada financeira da operação antes de configurar qualquer coisa.",
    activities: [
      "Jornada financeira de ponta a ponta",
      "Canais de venda e de pagamento envolvidos",
      "Regras de cobrança e repasses",
      "Necessidades de integração com seus sistemas",
    ],
  },
  {
    name: "Configuração do gateway",
    summary: "A plataforma é parametrizada para o modelo operacional definido no mapeamento.",
    activities: [
      "APIs e credenciais de integração",
      "Usuários e perfis de acesso",
      "Permissões e regras operacionais",
      "Ambiente operacional",
    ],
  },
  {
    name: "Integração e homologação",
    summary: "Validamos cada meio de pagamento e cada jornada prevista no projeto.",
    activities: [
      "Integração dos meios de recebimento e pagamento",
      "Testes das jornadas de Cash-In e Cash-Out",
      "Validação de status e retornos",
      "Ajustes antes da entrada em operação",
    ],
  },
  {
    name: "Ativação assistida",
    summary: "A operação entra em produção com acompanhamento próximo da Lottopag.",
    activities: [
      "Entrada em operação dos fluxos contratados",
      "Acompanhamento inicial das transações",
      "Conciliação dos primeiros ciclos",
      "Ajustes conforme a operação evolui",
    ],
  },
];

/** Assuntos aceitos em /contato?assunto=... */
export const contactSubjects = {
  "cash-in": "Cash-In · Recebimentos",
  "cash-out": "Cash-Out · Pagamentos",
  gateway: "Gateway de pagamentos",
  conciliacao: "Conciliação e gestão",
  integracoes: "Integrações via API",
  implantacao: "Implantação",
  "condicoes-comerciais": "Condições comerciais",
} as const;

export type ContactSubjectId = keyof typeof contactSubjects;

export const monthlyVolumeOptions = [
  "Até R$ 500 mil",
  "De R$ 500 mil a R$ 2 milhões",
  "De R$ 2 milhões a R$ 10 milhões",
  "Acima de R$ 10 milhões",
] as const;

export function contactHref(params: { assunto?: ContactSubjectId }) {
  return params.assunto ? `/contato?assunto=${params.assunto}` : "/contato";
}
