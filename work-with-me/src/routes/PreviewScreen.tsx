import { PublicProfileView } from "@/components/shared/PublicProfileView";

export function PreviewScreen() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-medium text-primary shadow-card">
        Private preview — only you can see this
      </div>
      <PublicProfileView mode="preview" />
    </div>
  );
}
