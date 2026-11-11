"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useAuthGuard } from "../../lib/useAuthGuard";

const nav = [
  {
    href: "/admin",
    label: "Overview",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: "/admin/applications",
    label: "Applications",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthGuard();
  const pathname = usePathname();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <span className="font-body text-sm text-muted">Loading...</span>
      </div>
    );
  }

  async function handleSignOut() {
    await signOut(auth);
    router.replace("/signin");
  }

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="flex w-56 flex-none flex-col border-r border-border bg-white">
        <div className="border-b border-border px-5 py-5">
          <span className="font-heading text-xs font-extrabold uppercase tracking-widest text-orange">NS-VTC</span>
          <p className="mt-0.5 font-heading text-sm font-bold text-ink">Admin Panel</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-card px-3 py-2 font-body text-sm font-medium transition-colors ${
                  active ? "bg-navy text-white" : "text-ink hover:bg-surface"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-3">
          <p className="truncate px-3 pb-2 font-body text-xs text-muted">{user.email}</p>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2.5 rounded-card px-3 py-2 font-body text-sm font-medium text-ink transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
