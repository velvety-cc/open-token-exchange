"use client";

import { Toaster as Sonner } from "sonner";

function Toaster(props) {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-paper group-[.toaster]:text-ink group-[.toaster]:border group-[.toaster]:border-line group-[.toaster]:shadow-xl group-[.toaster]:rounded-xl group-[.toaster]:font-sans",
          title: "group-[.toast]:text-ink group-[.toast]:font-medium",
          description: "group-[.toast]:text-mut",
        },
      }}
      style={{
        "--normal-bg": "var(--paper)",
        "--normal-text": "var(--ink)",
        "--normal-border": "var(--line)",
      }}
      {...props}
    />
  );
}

export { Toaster };
