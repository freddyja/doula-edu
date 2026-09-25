"use client";

import { useEffect } from "react";
import { basePath } from "@/lib/base-path";

export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register(`${basePath}/sw.js`, { scope: `${basePath}/` }).catch(() => {
      // The app still works online if registration fails.
    });
  }, []);

  return null;
}
