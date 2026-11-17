import type { ReactNode } from "react";

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-20 w-20 flex-none items-center justify-center">
      <svg viewBox="0 0 80 80" className="absolute inset-0 h-full w-full">
        <circle cx="40" cy="40" r="40" className="fill-navy/5" />
      </svg>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative text-navy/70">
        {children}
      </svg>
    </div>
  );
}

export function EmptyInboxIcon() {
  return (
    <IconFrame>
      <path d="M4 13 7.5 5h9L20 13" />
      <path d="M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6h-4.5l-1 2h-5l-1-2H4Z" />
      <circle cx="12" cy="17.2" r="0.6" fill="var(--color-orange)" stroke="none" />
    </IconFrame>
  );
}

export function EmptyDocumentsIcon() {
  return (
    <IconFrame>
      <path d="M8 3h6l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M14 3v4h4" />
      <path d="M8.5 12h7M8.5 15h4.5" />
      <circle cx="16.3" cy="16.3" r="0.6" fill="var(--color-orange)" stroke="none" />
    </IconFrame>
  );
}

export function EmptyBriefcaseIcon() {
  return (
    <IconFrame>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" strokeDasharray="1.5 2.5" />
      <circle cx="12" cy="13" r="0.9" fill="var(--color-orange)" stroke="none" />
    </IconFrame>
  );
}

export function EmptyArchiveIcon() {
  return (
    <IconFrame>
      <rect x="3" y="4" width="18" height="5" rx="1.2" />
      <path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" />
      <path d="M10 13h4" />
    </IconFrame>
  );
}

export function EmptySearchIcon() {
  return (
    <IconFrame>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.3-4.3" />
      <path d="M8 10.5h5" className="text-orange" stroke="var(--color-orange)" />
    </IconFrame>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 px-6 py-14 text-center ${className}`}>
      {icon}
      <div>
        <p className="font-heading text-sm font-bold text-ink">{title}</p>
        {description && <p className="mx-auto mt-1 max-w-xs font-body text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
