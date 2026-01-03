"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      richColors
      closeButton
      style={
        {
          "--normal-bg": "white",
          "--normal-text": "var(--forest-roast)",
          "--normal-border": "var(--forest-roast)",
        } as React.CSSProperties
      }
    />
  );
}
