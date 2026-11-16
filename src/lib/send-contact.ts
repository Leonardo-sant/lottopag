import type { ContactFields, ContactState } from "@/lib/contact";

/**
 * Envio do formulário de contato direto do navegador (o site é estático, sem servidor).
 *
 * O destino é NEXT_PUBLIC_CONTACT_ENDPOINT: um serviço de formulários que aceite POST JSON
 * do navegador (Formspree, Getform, Basin, um webhook de automação com CORS liberado ou uma
 * API própria). Sem a variável, o envio responde `not_configured` e a página mostra esse
 * estado real. A confirmação só aparece quando o serviço responde com status 2xx.
 *
 * Atenção: por rodar no navegador, essa URL é pública. Não use endpoints que exijam segredo.
 */
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim() || null;

export async function sendContact(values: ContactFields): Promise<ContactState> {
  if (!endpoint) return { status: "not_configured", values };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ origem: "site-lottopag", ...values }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(`[contato] Serviço respondeu ${response.status}`);
      return { status: "error", values };
    }
    return { status: "success" };
  } catch (error) {
    console.error("[contato] Falha ao enviar", error);
    return { status: "error", values };
  }
}
