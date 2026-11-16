import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ink" | "secondary-dark" | "secondary-light" | "text";

const styles: Record<Variant, string> = {
  primary:
    "bg-brand text-coal-950 hover:bg-brand-soft active:bg-brand px-5 h-12 rounded-full font-semibold",
  ink: "bg-ink text-white hover:bg-coal-700 px-5 h-12 rounded-full font-semibold",
  "secondary-dark":
    "text-white ring-1 ring-inset ring-white/30 hover:ring-white/70 hover:bg-white/5 px-5 h-12 rounded-full font-medium",
  "secondary-light":
    "text-ink ring-1 ring-inset ring-ink/25 hover:ring-ink/60 hover:bg-white px-5 h-12 rounded-full font-medium",
  text: "text-ink font-semibold underline decoration-brand decoration-2 underline-offset-[6px] hover:decoration-ink",
};

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  children: ReactNode;
  arrow?: boolean;
  className?: string;
};

export function ButtonLink({ variant = "primary", children, arrow = false, className = "", ...props }: Props) {
  return (
    <Link
      {...props}
      className={`group inline-flex items-center justify-center gap-2 text-[0.9375rem] transition-[background-color,color,box-shadow,text-decoration-color] duration-200 ${styles[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      )}
    </Link>
  );
}
