"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg";

const maxH: Record<Size, string> = {
  sm: "max-h-5",
  md: "max-h-8",
  lg: "max-h-10",
};

/**
 * Horizontal Renatus wordmark — uses black-on-white asset (no CSS filters).
 */
export function RenatusWordmark({
  size = "md",
  className,
  priority = false,
}: {
  size?: Size;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={cn(
          "font-display font-semibold tracking-[0.12em] text-zinc-900",
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-lg",
          className,
        )}
      >
        RENATUS
      </span>
    );
  }

  return (
    <Image
      src="/logos/renatus-horizontal.png"
      alt="Renatus"
      width={220}
      height={48}
      priority={priority}
      unoptimized
      onError={() => setFailed(true)}
      className={cn(
        "h-auto w-auto max-w-[min(220px,100%)] object-contain object-right",
        maxH[size],
        className,
      )}
    />
  );
}
