# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Repositório estava vazio; stack indicada no briefing.

## Users

Decisores de operações, financeiro e tecnologia de empresas que precisam receber, pagar e conciliar em canais físicos e digitais. Chegam avaliando um parceiro de infraestrutura de pagamentos e querem entender rapidamente o que a Lottopag conecta e como seria a implantação antes de falar com o comercial.

## Product Purpose

Site institucional (landing page) da Lottopag. Explica o gateway de pagamentos, Cash-In, Cash-Out, conciliação e integrações e leva o visitante ao contato comercial.

## Positioning

Infraestrutura de pagamentos B2B: receber, pagar e conciliar em uma operação integrada, com rastreabilidade de cada transação (processado, liquidado, pendente). Sem foco setorial declarado no site: o usuário pediu (2026-11-16) para remover todo o tema de jogos e loterias (iGaming, loterias, loterias passivas, VLTs).

## Capabilities and Constraints

- Cash-In: Pix, boleto, TED/transferências, transferências internas, canais de venda físicos e digitais.
- Cash-Out: Pix, transferências, TED, contas e boletos, tributos conforme estrutura contratada.
- Gateway: split, cobrança recorrente, link e e-commerce, POS e canais físicos quando previstos no projeto.
- Meios de pagamento, integrações, prazos e condições são definidos conforme escopo e disponibilidade dos parceiros habilitados.
- Preços e tarifas nunca aparecem no site: sempre "Consultar condições comerciais".
- O formulário de contato não tem serviço de envio definido (usuário: "é apenas uma LP"). Webhook opcional por variável de ambiente; sem ele, o site mostra o estado real.

## Brand Commitments

- Nome: Lottopag (o PDF da proposta usava "LottoPay"; o usuário corrigiu em 2026-11-16).
- Logotipo oficial fornecido pelo usuário: `public/brand/lottopag-logo-negativo.png` (fundo escuro), `public/brand/lottopag-logo.png` (fundo claro); símbolo recortado em `public/brand/lottopag-simbolo.png`.
- Cores do logotipo: amarelo #F2B70C e preto. Substituem a paleta azul/turquesa da proposta.
- Tipografia: Instrument Sans (fixada no briefing).
- Tom comercial direto, pt-BR.

## Evidence on Hand

- Proposta comercial (PDF, confidencial, fora do repositório): fonte de posicionamento e produtos.
- Não existem e não devem ser inventados: licenças, certificações, parceiros, clientes, métricas de desempenho, SLA, prazos, preços.
- Domínio de publicação não confirmado (a proposta citava www.lottopay.net.br; a marca agora é Lottopag). Contato comercial oficial pendente.

## Product Principles

1. Mostrar o fluxo operacional, não prometer resultados.
2. Toda condição específica (meios, prazos, preços) é encaminhada ao comercial.
3. Linguagem de infraestrutura empresarial, sem referência a jogos ou loterias.
