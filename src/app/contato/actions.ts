"use server";

import { readFields, validate, type ContactState } from "@/lib/contact";

/**
 * Envio do formulário de contato.
 *
 * O destino é um webhook configurável (CRM, automação ou API própria) definido em
 * CONTACT_WEBHOOK_URL. Sem essa variável, o envio responde `not_configured` e a página
 * mostra esse estado real, sem simular sucesso. A confirmação só aparece quando o
 * serviço responde com status 2xx.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = readFields(formData);

  // Campo-armadilha para robôs: pessoas não o veem nem o preenchem.
  if (typeof formData.get("website") === "string" && formData.get("website") !== "") {
    return { status: "success" };
  }

  const errors = validate(values);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values };
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!endpoint) {
    return { status: "not_configured", values };
  }

  const token = process.env.CONTACT_WEBHOOK_TOKEN?.trim();

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        origem: "site-lottopag",
        enviadoEm: new Date().toISOString(),
        ...values,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`[contato] Webhook respondeu ${response.status}`);
      return { status: "error", values };
    }

    return { status: "success" };
  } catch (error) {
    console.error("[contato] Falha ao enviar para o webhook", error);
    return { status: "error", values };
  }
}
