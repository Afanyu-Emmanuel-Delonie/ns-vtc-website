"use client";

import Link from "next/link";
import Image from "next/image";
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
  {
    href: "/admin/jobs",
    label: "Jobs",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
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
      <aside className="flex w-56 flex-none flex-col border-r border-white/10 bg-navy-dark">
        <div className="border-b border-white/10 px-5 py-4">
          <Image src="/assets/logos/logo-2.svg" alt="NS-VTC" width={120} height={40} className="h-9 w-auto" />
          <p className="mt-1.5 font-heading text-xs font-semibold uppercase tracking-widest text-white/40">Admin Panel</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-card px-3 py-2 font-body text-sm font-medium transition-colors ${
                  active ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <p className="truncate px-3 pb-2 font-body text-xs text-white/40">{user.email}</p>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2.5 rounded-card px-3 py-2 font-body text-sm font-medium text-white/60 transition-colors hover:bg-red-500/20 hover:text-red-400"
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
