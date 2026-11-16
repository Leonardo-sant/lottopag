"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { ButtonLink } from "@/components/button-link";
import { mainNav, siteConfig } from "@/config/site";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  // O menu fica aberto apenas para a rota em que foi aberto: navegar fecha o menu.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenOn(null);
        toggleRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="surface-dark sticky top-0 z-50 border-b border-rule-dark/70 bg-coal-900">
      <div className="mx-auto flex h-[var(--header-h)] max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 rounded-sm" aria-label={`${siteConfig.name} — página inicial`}>
          <BrandMark preload />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors duration-200 ${
                      active ? "text-white" : "text-mist hover:text-white"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span aria-hidden className="absolute inset-x-3.5 -bottom-[3px] h-0.5 rounded-full bg-brand" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/contato" className="h-10! px-4! text-sm! max-sm:hidden!">
            Falar com o comercial
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-white ring-1 ring-inset ring-white/20 hover:bg-white/5 md:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-[var(--header-h)] bottom-0 overflow-y-auto border-t border-rule-dark/70 bg-coal-900 md:hidden"
      >
        <nav aria-label="Principal (menu móvel)" className="px-4 pt-4 pb-10 sm:px-6">
          <ul className="divide-y divide-rule-dark/70 border-b border-rule-dark/70">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpenOn(null)}
                    className={`flex items-center justify-between py-4 text-xl ${active ? "text-white" : "text-mist-strong"}`}
                  >
                    {item.label}
                    {active && <span aria-hidden className="size-2 rounded-full bg-brand" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink href="/contato" arrow className="mt-8 w-full" onClick={() => setOpenOn(null)}>
            Falar com o comercial
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
