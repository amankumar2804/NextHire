"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, LogOut, ShieldCheck } from "lucide-react";

function decodeJwtRole(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    const token = localStorage.getItem("token");
    const role = token ? decodeJwtRole(token) : null;

    if (!token || role !== "admin") {
      router.replace("/admin/login");
      return;
    }

    setAdminEmail(localStorage.getItem("adminEmail") || "Admin");
    setChecking(false);
  }, [isLoginPage, pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminEmail");
    router.push("/admin/login");
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 size={22} className="animate-spin" />
          Checking admin access...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ADMIN PROFILE BAR */}
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
            <ShieldCheck size={16} className="text-indigo-600" />
            Admin Panel
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-700">{adminEmail}</span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
