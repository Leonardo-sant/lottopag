"use client";

import { useActionState, useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, CheckCircle2, Loader2, Mail, Phone } from "lucide-react";
import { submitContact } from "./actions";
import { contactSubjects, monthlyVolumeOptions, type ContactSubjectId } from "@/content/catalog";
import { LIMITS, validate, type ContactFields, type ContactState, type FieldErrors } from "@/lib/contact";

type Fallback = { email: string | null; phone: string | null; phoneHref: string | null };

const emptyFields: ContactFields = {
  nome: "",
  empresa: "",
  email: "",
  telefone: "",
  segmento: "",
  volume: "",
  assunto: "",
  mensagem: "",
};

const fieldOrder: (keyof ContactFields)[] = [
  "nome",
  "empresa",
  "email",
  "telefone",
  "segmento",
  "volume",
  "assunto",
  "mensagem",
];

/** Lê ?assunto= dos CTAs do site para pré-preencher o formulário. */
export function ContactFormWithParams({ fallback }: { fallback: Fallback }) {
  const params = useSearchParams();
  const subjectId = params.get("assunto");
  const subject = subjectId && subjectId in contactSubjects ? contactSubjects[subjectId as ContactSubjectId] : "";

  return <ContactForm fallback={fallback} initial={{ assunto: subject }} />;
}

export function ContactForm({
  fallback,
  initial = {},
}: {
  fallback: Fallback;
  initial?: Partial<ContactFields>;
}) {
  const [round, setRound] = useState(0);
  return <ContactFormInner key={round} fallback={fallback} initial={initial} onReset={() => setRound((r) => r + 1)} />;
}

function ContactFormInner({
  fallback,
  initial,
  onReset,
}: {
  fallback: Fallback;
  initial: Partial<ContactFields>;
  onReset: () => void;
}) {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(submitContact, { status: "idle" });
  const [values, setValues] = useState<ContactFields>({ ...emptyFields, ...initial });
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const errors: FieldErrors = clientErrors ?? (state.status === "invalid" ? state.errors : {});

  // Move o foco para o resultado do envio, para leitores de tela e teclado.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    else if (state.status === "not_configured" || state.status === "error") statusRef.current?.focus();
    else if (state.status === "invalid") focusFirstError(state.errors);
  }, [state]);

  function focusFirstError(fieldErrors: FieldErrors) {
    const first = fieldOrder.find((key) => fieldErrors[key]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (clientErrors?.[name as keyof ContactFields]) {
      setClientErrors((current) => {
        if (!current) return current;
        const next = { ...current };
        delete next[name as keyof ContactFields];
        return next;
      });
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const trimmed = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()]),
    ) as ContactFields;
    const found = validate(trimmed);
    if (Object.keys(found).length > 0) {
      event.preventDefault();
      setClientErrors(found);
      focusFirstError(found);
      return;
    }
    setClientErrors(null);
  }

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl bg-white p-8 ring-1 ring-rule outline-none md:p-10"
      >
        <CheckCircle2 aria-hidden className="size-8 text-brand-ink" />
        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em]">Mensagem enviada.</h2>
        <p className="mt-3 max-w-md leading-relaxed text-ink-muted">
          Recebemos seu contato. O time comercial da Lottopag vai responder pelo e-mail informado.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-8 font-semibold text-ink underline decoration-brand decoration-2 underline-offset-[6px] hover:decoration-ink"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const showStatus = !clientErrors && (state.status === "not_configured" || state.status === "error");

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-busy={pending}
      aria-describedby="campos-obrigatorios"
      className="rounded-2xl bg-white p-6 ring-1 ring-rule sm:p-8 md:p-10"
    >
      <p id="campos-obrigatorios" className="text-sm text-ink-muted">
        Todos os campos são obrigatórios, exceto os marcados como opcionais.
      </p>

      <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <TextField label="Nome" name="nome" autoComplete="name" value={values.nome} onChange={onChange} error={errors.nome} maxLength={LIMITS.nome} />
        <TextField label="Empresa" name="empresa" autoComplete="organization" value={values.empresa} onChange={onChange} error={errors.empresa} maxLength={LIMITS.empresa} />
        <TextField
          label="E-mail corporativo"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={onChange}
          error={errors.email}
          maxLength={LIMITS.email}
        />
        <TextField
          label="Telefone"
          name="telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          optional
          value={values.telefone}
          onChange={onChange}
          error={errors.telefone}
          maxLength={LIMITS.telefone}
        />
        <TextField
          label="Segmento de atuação"
          name="segmento"
          placeholder="Ex.: e-commerce, marketplace, serviços"
          value={values.segmento}
          onChange={onChange}
          error={errors.segmento}
          maxLength={LIMITS.segmento}
        />
        <SelectField label="Volume mensal estimado" name="volume" optional value={values.volume} onChange={onChange} error={errors.volume}>
          <option value="">Prefiro não informar</option>
          {monthlyVolumeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectField>
        <div className="sm:col-span-2">
          <TextField
            label="Assunto"
            name="assunto"
            optional
            placeholder="Ex.: Integração de Cash-In via Pix"
            value={values.assunto}
            onChange={onChange}
            error={errors.assunto}
            maxLength={LIMITS.assunto}
          />
        </div>
        <div className="sm:col-span-2">
          <Field label="Mensagem" name="mensagem" error={errors.mensagem} hint="Conte como sua operação recebe, paga e concilia hoje.">
            {(describedBy) => (
              <textarea
                id="campo-mensagem"
                name="mensagem"
                rows={5}
                value={values.mensagem}
                onChange={onChange}
                maxLength={LIMITS.mensagem}
                aria-invalid={Boolean(errors.mensagem)}
                aria-describedby={describedBy}
                className={inputClass(Boolean(errors.mensagem))}
              />
            )}
          </Field>
        </div>
      </div>

      {/* Campo-armadilha para robôs */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Site
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {showStatus && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-8 flex gap-3 rounded-xl bg-[#fbf3dc] p-5 text-[0.9375rem] leading-relaxed text-[#5c4409] ring-1 ring-[#e8d29a] outline-none"
        >
          <AlertTriangle aria-hidden className="mt-0.5 size-5 shrink-0" />
          <div>
            {state.status === "not_configured" ? (
              <>
                <p className="font-semibold">O envio pelo formulário ainda não está ativo.</p>
                <p>Sua mensagem não foi enviada. Seus dados continuam preenchidos no formulário.</p>
              </>
            ) : (
              <>
                <p className="font-semibold">Não conseguimos enviar sua mensagem agora.</p>
                <p>Seus dados continuam preenchidos. Tente novamente em alguns instantes.</p>
              </>
            )}
            <FallbackContact fallback={fallback} />
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted">Usamos seus dados apenas para responder a este contato.</p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 font-semibold whitespace-nowrap text-white transition-colors hover:bg-coal-700 disabled:cursor-progress disabled:bg-ink/70"
        >
          {pending && <Loader2 aria-hidden className="size-4 animate-spin" />}
          {pending ? "Enviando…" : "Enviar mensagem"}
        </button>
      </div>
    </form>
  );
}

function FallbackContact({ fallback }: { fallback: Fallback }) {
  if (!fallback.email && !fallback.phone) return null;
  return (
    <div className="mt-3">
      <p>Você também pode falar com o comercial por:</p>
      <ul className="mt-2 space-y-1.5">
        {fallback.email && (
          <li>
            <a href={`mailto:${fallback.email}`} className="inline-flex items-center gap-2 font-semibold underline underline-offset-4">
              <Mail aria-hidden className="size-4" />
              {fallback.email}
            </a>
          </li>
        )}
        {fallback.phone && fallback.phoneHref && (
          <li>
            <a href={fallback.phoneHref} className="tabular inline-flex items-center gap-2 font-semibold underline underline-offset-4">
              <Phone aria-hidden className="size-4" />
              {fallback.phone}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

function inputClass(invalid: boolean) {
  return `block w-full rounded-lg bg-paper px-3.5 py-3 text-base text-ink ring-1 ring-inset transition-shadow placeholder:text-[#76767a] focus:bg-white focus:ring-2 focus:outline-none ${
    invalid ? "ring-[#b42318] focus:ring-[#b42318]" : "ring-[#cfcfca] hover:ring-[#9a9a95] focus:ring-brand-ink"
  }`;
}

function Field({
  label,
  name,
  optional,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: (describedBy: string | undefined) => ReactNode;
}) {
  const hintId = hint ? `dica-${name}` : undefined;
  const errorId = error ? `erro-${name}` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={`campo-${name}`} className="mb-1.5 block text-[0.9375rem] font-semibold">
        {label}
        {optional && <span className="ml-1.5 font-normal text-ink-muted">(opcional)</span>}
      </label>
      {hint && (
        <p id={hintId} className="mb-2 text-sm text-ink-muted">
          {hint}
        </p>
      )}
      {children(describedBy)}
      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-[#b42318]">
          <AlertTriangle aria-hidden className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = {
  label: string;
  name: keyof ContactFields;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  optional?: boolean;
  type?: string;
  inputMode?: "email" | "tel" | "text";
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
};

function TextField({ label, name, error, optional, type = "text", ...rest }: InputProps) {
  return (
    <Field label={label} name={name} optional={optional} error={error}>
      {(describedBy) => (
        <input
          id={`campo-${name}`}
          name={name}
          type={type}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={inputClass(Boolean(error))}
          {...rest}
        />
      )}
    </Field>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  error,
  optional,
  children,
}: {
  label: string;
  name: keyof ContactFields;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <Field label={label} name={name} optional={optional} error={error}>
      {(describedBy) => (
        <select
          id={`campo-${name}`}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`${inputClass(Boolean(error))} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%230e0e10' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_0.875rem_center] bg-no-repeat pr-10`}
        >
          {children}
        </select>
      )}
    </Field>
  );
}
