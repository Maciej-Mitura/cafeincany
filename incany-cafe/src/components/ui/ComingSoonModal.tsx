import React from "react";

export interface ComingSoonModalProps {
  active: boolean;
  title?: string;
  subtitle?: string;
  "aria-label"?: string;
  children: React.ReactNode;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  active,
  title = "Coming soon!",
  subtitle,
  "aria-label": ariaLabel,
  children,
}) => {
  const label = ariaLabel ?? "Coming soon dialog";

  return (
    <div className="relative">
      <div className={active ? "pointer-events-none select-none" : ""}>
        {children}
      </div>

      {active && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-neutral-900/60 text-neutral-50 backdrop-blur-md"
          role="dialog"
          aria-label={label}
          aria-modal="true"
        >
          <div className="mx-4 max-w-md text-center">
            <p className="text-xl font-semibold tracking-wide sm:text-2xl">
              {title}
            </p>
            {subtitle && (
              <p className="mt-2 text-sm sm:text-base text-neutral-100/90">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComingSoonModal;

