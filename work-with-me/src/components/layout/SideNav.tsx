import { NavLink } from "react-router-dom";
import { SECTION_LABELS, SECTION_ORDER } from "@/data/questions";
import { Badge } from "@/components/ui/badge";
import { useProfileContext } from "@/context/ProfileContext";
import { cn } from "@/lib/utils";

const STATUS_VARIANTS: Record<string, string> = {
  "not-started": "bg-slate-100 text-slate-500",
  "in-progress": "bg-primary/10 text-primary",
  complete: "bg-green-100 text-green-700",
};

export function SideNav() {
  const { sectionCounts, sectionStatus } = useProfileContext();

  return (
    <nav className="space-y-2 rounded-2xl border border-border/60 bg-white p-4 shadow-card">
      <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Sections
      </div>
      <ul className="space-y-1">
        {SECTION_ORDER.map((section) => {
          const status = sectionStatus[section];
          const count = sectionCounts[section];
          return (
            <li key={section}>
              <NavLink
                to={`/sections/${section}`}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-all",
                    "hover:bg-primary/10 hover:text-primary",
                    isActive ? "bg-primary text-white shadow-card" : "bg-white",
                  )
                }
              >
                <span>{SECTION_LABELS[section]}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "border-0 text-xs font-medium",
                    STATUS_VARIANTS[status],
                  )}
                >
                  {status === "not-started"
                    ? "Not started"
                    : `${count.answered}/${count.total}`}
                </Badge>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
