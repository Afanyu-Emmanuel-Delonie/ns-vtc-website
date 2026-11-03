import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "secondaryOnDark" | "accent";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 font-body text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-navy-dark hover:bg-white/90 focus-visible:ring-white",
  secondary:
    "border-[1.5px] border-navy bg-transparent text-navy hover:bg-navy/5 focus-visible:ring-navy",
  secondaryOnDark:
    "border-[1.5px] border-white bg-transparent text-white hover:bg-white/10 focus-visible:ring-white",
  accent:
    "bg-orange text-navy-dark hover:opacity-90 focus-visible:ring-orange",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
};

type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
