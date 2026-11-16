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

## Publicação (GitHub Pages)

O site é exportado como HTML estático (`output: "export"` em `next.config.ts`) e publicado pelo
workflow `.github/workflows/deploy.yml` a cada push na `main`. Em **Settings → Pages**, a fonte
deve ser **GitHub Actions**.

As variáveis ficam em **Settings → Secrets and variables → Actions → Variables** (não são segredos;
vão para o HTML): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_ENDPOINT`, `COMMERCIAL_EMAIL`,
`COMMERCIAL_PHONE`. Sem domínio próprio, o endereço é `https://leonardo-sant.github.io/lottopag/`.
Ao ligar um domínio próprio em Settings → Pages, crie também a variável `CUSTOM_DOMAIN` (qualquer
valor, ex. o próprio domínio) para o site passar a ser servido na raiz.

## Publicação na HostGator (lottopag.com)

O workflow `.github/workflows/deploy-hostgator.yml` gera o site para a raiz do domínio e envia a
pasta `out/` por FTPS para `public_html/` a cada push na `main`, junto com o `.htaccess` de
`deploy/htaccess-hostgator` (HTTPS obrigatório, `www` → domínio sem `www`, página 404 e cache).

Configuração única no GitHub (Settings → Secrets and variables → Actions):

- **Secrets:** `FTP_SERVER` (ex.: `ftp.lottopag.com` ou o servidor mostrado no cPanel), `FTP_USERNAME`, `FTP_PASSWORD`.
- **Variables (opcionais):** `HOSTGATOR_SITE_URL` (padrão `https://lottopag.com`), `FTP_SERVER_DIR` (padrão `./public_html/`), `FTP_PROTOCOL` (padrão `ftps`; use `ftp` só se o FTPS falhar).

Sem os segredos, o workflow termina sem publicar nada.

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

Como o site é estático, o envio sai do navegador (`src/lib/send-contact.ts`) com `POST` JSON para
`NEXT_PUBLIC_CONTACT_ENDPOINT` (por exemplo, Formspree).

- Sem endpoint configurado: o visitante vê "O envio pelo formulário ainda não está ativo" e os dados continuam no formulário.
- Serviço respondeu 2xx: confirmação de envio.
- Serviço falhou ou não respondeu em 10 s: mensagem de erro, dados preservados.
- Em ambos os casos de falha, `COMMERCIAL_EMAIL` e `COMMERCIAL_PHONE` (se definidos) aparecem como canal alternativo.

Os CTAs do site pré-preenchem o assunto do formulário com `?assunto=` (`cash-in`, `cash-out`,
`gateway`, `conciliacao`, `integracoes`, `implantacao`, `condicoes-comerciais`).

## Regras de conteúdo

A proposta comercial é referência interna e não faz parte do repositório. Não publicar preços,
tarifas, prazos, licenças, certificações, parceiros, métricas ou SLA sem evidência aprovada.
