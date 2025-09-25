// src/components/ui/Button.tsx
"use client";

export function Button({
  children,
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "destructive" }) {
  const base = "px-4 py-2 rounded text-white font-medium";
  const classes =
    variant === "destructive"
      ? `${base} bg-red-500 hover:bg-red-600`
      : `${base} bg-orange-500 hover:bg-orange-600`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
