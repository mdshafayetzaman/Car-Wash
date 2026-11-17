"use client";

import { ToastContainer } from "react-toastify";

/**
 * Global react-toastify container.
 *
 * Mounted once in the root layout so toasts survive route changes — e.g. the
 * sign-up form fires `toast.success(...)` and immediately redirects to
 * /dashboard, which would unmount any container living inside the auth layout.
 *
 * Dark theme matches the auth shell; it also looks right over the light pages
 * since the toast has its own solid background.
 */
export function AppToast() {
  return (
    <ToastContainer
      position="bottom-right"
      theme="dark"
      newestOnTop
      autoClose={4000}
      closeOnClick
      pauseOnHover
      limit={3}
    />
  );
}
