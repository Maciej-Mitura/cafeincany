"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development, but avoid exposing details in production
    if (process.env.NODE_ENV === "development") {
      console.error("Error boundary caught:", error);
    }
  }, [error]);

  return (
    <html lang="nl-BE">
      <body className="antialiased">
        <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-8">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto bg-[var(--error)]/10 rounded-full flex items-center justify-center border border-[var(--error)]/20">
              <svg
                className="w-10 h-10 text-[var(--error)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Message */}
            <div className="space-y-3">
              <h1 className="text-3xl font-[family:var(--font-heading)] text-[var(--text)]">
                Er ging iets mis
              </h1>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Sorry, er is een onverwachte fout opgetreden. Probeer het opnieuw of ga terug naar de homepagina.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-[var(--accent)] text-[var(--background)] rounded-[var(--radius)] hover:bg-[var(--accent-hover)] transition-colors font-medium inline-flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Probeer opnieuw
              </button>

              <Link
                href="/"
                className="px-6 py-3 bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] rounded-[var(--radius)] hover:bg-[var(--surface-elevated)] transition-colors font-medium inline-flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Terug naar home
              </Link>
            </div>

            {/* Error reference (only in development) */}
            {process.env.NODE_ENV === "development" && error.digest && (
              <div className="pt-8 border-t border-[var(--border)]">
                <p className="text-xs text-[var(--muted)]">
                  Error ID: {error.digest}
                </p>
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
