import { useParams } from "react-router-dom";
import { PublicProfileView } from "@/components/shared/PublicProfileView";

export function PublicProfile() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 bg-[var(--color-background)] px-6 py-12">
      <div className="rounded-2xl border border-dashed border-primary/30 bg-white px-6 py-3 text-sm text-muted-foreground">
        Viewing profile for <span className="font-semibold text-slate-900">{slug ?? "guest"}</span>
      </div>
      <PublicProfileView mode="public" />
    </div>
  );
}
