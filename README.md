# Site institucional Lottopag

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Conteúdo em pt-BR.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Verificações

```bash
npm run lint        # ESLint
npm run typecheck   # tipos de rota + tsc
npm run build       # build de produção (todas as rotas são estáticas)
npm start           # serve o build
```

## Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Hero com fluxo ilustrativo, Cash-In/Cash-Out, implantação, encerramento comercial |
| `/solucoes` | Cash-In, Cash-Out, gateway, conciliação e gestão, integrações |
| `/implantacao` | Quatro etapas e perguntas frequentes |
| `/contato` | Formulário comercial |

## Onde configurar

- **Marca, domínio, contatos, links legais:** `src/config/site.ts`
- **Textos de produtos, etapas e assuntos do formulário:** `src/content/catalog.ts`
- **Variáveis de ambiente:** `.env.example` (copie para `.env.local`)

### Logotipo

Arquivos oficiais em `public/brand/` (versão negativa para fundo escuro, versão positiva para fundo
claro e o símbolo usado no favicon). Caminhos e proporção ficam em `logo`, em `src/config/site.ts`.
Se houver versões em SVG, basta trocar os caminhos.

### Domínio

Enquanto `NEXT_PUBLIC_SITE_URL` estiver vazio, o site não emite canonical nem sitemap e bloqueia a
indexação (`robots.txt` e meta robots). Defina a variável quando o domínio de publicação for confirmado.

### Formulário de contato

O envio usa uma Server Action (`src/app/contato/actions.ts`) que faz `POST` JSON para
`CONTACT_WEBHOOK_URL` (CRM, Zapier, Make, n8n ou API própria), com `CONTACT_WEBHOOK_TOKEN` opcional
como Bearer.

- Sem webhook configurado: o visitante vê "O envio pelo formulário ainda não está ativo" e os dados continuam no formulário.
- Webhook respondeu 2xx: confirmação de envio.
- Webhook falhou ou não respondeu em 10 s: mensagem de erro, dados preservados.
- Em ambos os casos de falha, `COMMERCIAL_EMAIL` e `COMMERCIAL_PHONE` (se definidos) aparecem como canal alternativo.

Os CTAs do site pré-preenchem o assunto do formulário com `?assunto=` (`cash-in`, `cash-out`,
`gateway`, `conciliacao`, `integracoes`, `implantacao`, `condicoes-comerciais`).

## Regras de conteúdo

A proposta comercial é referência interna e não faz parte do repositório. Não publicar preços,
tarifas, prazos, licenças, certificações, parceiros, métricas ou SLA sem evidência aprovada.
