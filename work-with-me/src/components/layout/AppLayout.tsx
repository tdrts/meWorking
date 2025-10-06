import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SideNav } from "./SideNav";
import { cn } from "@/lib/utils";

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isPreview = location.pathname === "/preview";

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-slate-900">
      <header className="border-b border-border/60 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 border-0 bg-transparent p-0 font-semibold tracking-tight text-slate-900"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white shadow-card">
              W
            </span>
            <span className="text-xl">Work With Me</span>
          </button>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/preview")}
              className={cn(
                "border-primary/40 text-primary hover:bg-primary/10",
                isPreview && "bg-primary/10",
              )}
            >
              Preview profile
            </Button>
            <Button onClick={() => navigate("/profile/me")}>
              Share profile
            </Button>
          </div>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-6 py-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <SideNav />
        </aside>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
