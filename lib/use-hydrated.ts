"use client";

import { startTransition, useEffect, useState } from "react";

/** True only after client mount — avoids SSR vs Zustand-persist mismatches. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    startTransition(() => {
      setHydrated(true);
    });
  }, []);
  return hydrated;
}
