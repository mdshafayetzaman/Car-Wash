"use client";

import { useEffect } from "react";

/**
 * Applies the `.dark` theme to `<html>` while a dark screen (e.g. the auth
 * pages) is mounted.
 *
 * The auth pages already carry `.dark` on their own wrapper, but portal-based
 * UI — toasts, dialogs, tooltips — is rendered at the document body, outside
 * that wrapper. Scoping to `<html>` keeps those in sync too.
 *
 * Removes itself on unmount, so the rest of the app stays on the light theme.
 */
export function useDarkTheme() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");

    return () => {
      root.classList.remove("dark");
    };
  }, []);
}
