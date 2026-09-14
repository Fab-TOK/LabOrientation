import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "on-slate" | "ghost-on-slate" | "slate";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  "on-slate": "btn-on-slate",
  "ghost-on-slate": "btn-ghost-on-slate",
  slate: "bg-slate text-cream hover:bg-slate/90",
};

type CommonProps = {
  variant?: Variant;
  /** `lg` reprend le gabarit des grands boutons de bandeau (desktop only). */
  size?: "md" | "lg";
  block?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};
type NativeProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

function classes({ variant = "primary", size = "md", block, className }: CommonProps) {
  return cn(
    "btn",
    variantClass[variant],
    size === "lg" && "btn-lg",
    block && "btn-block",
    className,
  );
}

export function ButtonLink({ href, external, onClick, ...props }: LinkProps) {
  const { children } = props;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        onClick={onClick}
        className={classes(props)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes(props)}>
      {children}
    </Link>
  );
}

export function Button({ variant, size, block, className, children, ...rest }: NativeProps) {
  return (
    <button className={classes({ variant, size, block, className, children })} {...rest}>
      {children}
    </button>
  );
}
