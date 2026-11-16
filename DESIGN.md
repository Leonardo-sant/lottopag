# Design — site Lottopag

Registro do sistema visual como foi construído. Tokens em `src/app/globals.css` (`@theme`).

## Mundo

Extrato operacional: cada página lê como um fluxo de transações rastreáveis. Campos escuros inteiros
(hero, conciliação, encerramento) alternam com seções claras de leitura. Sem grades de cards com ícone;
listas com réguas finas e uma régua forte (2px, preto) abrindo cada lista comparável.

## Cor

Cores amostradas dos arquivos de logotipo: amarelo `#F2B70C` e preto.

| Token | Valor | Uso |
|---|---|---|
| `brand` | `#F2B70C` | CTA primário, encerramento comercial (campo inteiro), estado liquidado, rotas do fluxo. Texto sobre ele sempre preto |
| `brand-ink` | `#8A6400` | Dourado escuro para ícones, foco e anéis em fundo claro (≥ 3:1). Não usar para texto corrido |
| `coal-900` / `coal-950` | `#0E0E10` / `#050506` | Cabeçalho, hero, rodapé, seção de conciliação |
| `coal-800` | `#18181B` | Painel do fluxo ilustrativo |
| `ink` / `ink-muted` | `#0E0E10` / `#4A4A50` | Texto em fundo claro |
| `paper` / `paper-2` | `#F7F7F5` / `#EFEFEB` | Fundos claros |
| `mist` / `mist-strong` | `#A1A1AA` / `#D4D4D8` | Texto secundário em fundo escuro |

Links de texto: preto com sublinhado amarelo de 2px. Estados de transação: pendente (cinza),
processado (branco), liquidado (amarelo), sempre com rótulo.

## Logotipo

`BrandMark` (`src/components/brand-mark.tsx`) usa `lottopag-logo-negativo.png` em fundo escuro e
`lottopag-logo.png` em fundo claro, a 32px de altura. Favicon: símbolo recortado do logotipo.

## Tipografia

Instrument Sans (next/font), pesos 400–600. Display com tracking -0.025 a -0.035em; corpo 15–18px,
medida até ~65ch; numerais tabulares (`.tabular`) em valores e etapas.

## Componentes

- **Botões:** pílula; primário amarelo com texto preto, variante preta sobre o campo amarelo, secundários com contorno.
- **StatusChip:** pendente / processado / liquidado, ponto + rótulo, variantes para fundo claro e escuro.
- **Listas comparáveis:** Cash-In e Cash-Out em colunas paralelas com as mesmas linhas.
- **Linha do tempo:** horizontal compacta (home), vertical com atividades (implantação).
- **Cards:** apenas para conteúdo consultado separadamente (atividades por etapa, formulário).

## Movimento

**Malha de rotas no hero** (`src/components/hero-network.tsx`): um canvas com nós assimétricos
(abertos atrás do título, mais densos à direita e nas bordas) ligados aos vizinhos mais próximos.
Deriva lenta; a cada poucos segundos um pulso amarelo percorre uma rota. Perto do cursor, nós e
rotas passam a amarelo e surgem conexões latentes, com leve atração. Sem hover: só ambiente, menos
nós e pulsos mais espaçados. Com movimento reduzido: quadro estático. Pausa fora da tela.


Um momento autoral: o painel "Fluxo ilustrativo" avança estados das transações a cada 2,2 s e as rotas
tracejadas correm entre estágios. Hover com deslocamento curto de setas (ease-out-expo). Tudo
desligado com `prefers-reduced-motion`.
