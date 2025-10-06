import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  "not-started": "bg-slate-100 text-slate-600",
  "in-progress": "bg-primary/10 text-primary",
  complete: "bg-green-100 text-green-700",
};

export function StatusBadge({
  status,
  className,
}: {
  status: "not-started" | "in-progress" | "complete";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        STATUS_STYLES[status],
        className,
      )}
    >
      {status === "not-started"
        ? "Not started"
        : status === "in-progress"
          ? "In progress"
          : "Complete"}
    </span>
  );
}
