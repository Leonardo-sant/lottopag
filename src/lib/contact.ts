import { monthlyVolumeOptions } from "@/content/catalog";

/** Validação do formulário de contato, compartilhada entre cliente e servidor. */

export type ContactFields = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  segmento: string;
  volume: string;
  assunto: string;
  mensagem: string;
};

export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: FieldErrors; values: ContactFields }
  | { status: "success" }
  | { status: "not_configured"; values: ContactFields }
  | { status: "error"; values: ContactFields };

export const LIMITS = {
  nome: 120,
  empresa: 160,
  email: 160,
  telefone: 30,
  segmento: 120,
  assunto: 120,
  mensagem: 3000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readFields(formData: FormData): ContactFields {
  const get = (key: keyof ContactFields) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return {
    nome: get("nome"),
    empresa: get("empresa"),
    email: get("email"),
    telefone: get("telefone"),
    segmento: get("segmento"),
    volume: get("volume"),
    assunto: get("assunto"),
    mensagem: get("mensagem"),
  };
}

export function validate(fields: ContactFields): FieldErrors {
  const errors: FieldErrors = {};

  if (!fields.nome) errors.nome = "Informe seu nome.";
  else if (fields.nome.length > LIMITS.nome) errors.nome = `Use até ${LIMITS.nome} caracteres.`;

  if (!fields.empresa) errors.empresa = "Informe o nome da empresa.";
  else if (fields.empresa.length > LIMITS.empresa) errors.empresa = `Use até ${LIMITS.empresa} caracteres.`;

  if (!fields.email) errors.email = "Informe seu e-mail corporativo.";
  else if (!EMAIL_PATTERN.test(fields.email) || fields.email.length > LIMITS.email)
    errors.email = "Informe um e-mail válido, como nome@empresa.com.br.";

  if (fields.telefone) {
    const digits = fields.telefone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13 || fields.telefone.length > LIMITS.telefone)
      errors.telefone = "Informe o telefone com DDD, como (11) 91234-5678.";
  }

  if (!fields.segmento) errors.segmento = "Informe o segmento de atuação da empresa.";
  else if (fields.segmento.length > LIMITS.segmento) errors.segmento = `Use até ${LIMITS.segmento} caracteres.`;

  if (fields.volume && !(monthlyVolumeOptions as readonly string[]).includes(fields.volume))
    errors.volume = "Selecione uma faixa da lista.";

  if (fields.assunto.length > LIMITS.assunto) errors.assunto = `Use até ${LIMITS.assunto} caracteres.`;

  if (!fields.mensagem) errors.mensagem = "Conte um pouco sobre a sua operação.";
  else if (fields.mensagem.length < 10) errors.mensagem = "Escreva pelo menos uma frase sobre a sua operação.";
  else if (fields.mensagem.length > LIMITS.mensagem) errors.mensagem = `Use até ${LIMITS.mensagem} caracteres.`;

  return errors;
}
