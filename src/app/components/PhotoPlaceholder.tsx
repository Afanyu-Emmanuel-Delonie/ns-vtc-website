export default function PhotoPlaceholder({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border border-dashed border-todo bg-surface p-4 text-center ${className}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="text-todo"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <p className="font-body text-xs font-semibold text-todo">
        Photo coming soon
      </p>
    </div>
  );
}
