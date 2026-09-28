"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Panel = "enquiry" | "search" | "look" | "menu" | null;

type UI = {
  enquiry: string[];
  addEnquiry: (slug: string) => void;
  removeEnquiry: (slug: string) => void;
  hasEnquiry: (slug: string) => boolean;
  panel: Panel;
  open: (panel: Exclude<Panel, null>, look?: { title: string; products: string[] }) => void;
  close: () => void;
  look: { title: string; products: string[] } | null;
};

const Ctx = createContext<UI | null>(null);
const KEY = "kk-enquiry-v1";

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [enquiry, setEnquiry] = useState<string[]>([]);
  const [panel, setPanel] = useState<Panel>(null);
  const [look, setLook] = useState<UI["look"]>(null);

  // Enquiry list is a per-viewer convenience: storage may be unavailable.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(saved)) setEnquiry(saved.filter((s) => typeof s === "string"));
    } catch {}
  }, []);
  const persist = (list: string[]) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch {}
  };

  const addEnquiry = useCallback((slug: string) => {
    setEnquiry((prev) => {
      const next = prev.includes(slug) ? prev : [...prev, slug];
      persist(next);
      return next;
    });
  }, []);
  const removeEnquiry = useCallback((slug: string) => {
    setEnquiry((prev) => {
      const next = prev.filter((s) => s !== slug);
      persist(next);
      return next;
    });
  }, []);

  const open = useCallback<UI["open"]>((p, lk) => {
    if (lk) setLook(lk);
    setPanel(p);
  }, []);
  const close = useCallback(() => setPanel(null), []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", panel !== null);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel]);

  const value = useMemo<UI>(
    () => ({
      enquiry,
      addEnquiry,
      removeEnquiry,
      hasEnquiry: (s) => enquiry.includes(s),
      panel,
      open,
      close,
      look,
    }),
    [enquiry, addEnquiry, removeEnquiry, panel, open, close, look],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUI() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}
