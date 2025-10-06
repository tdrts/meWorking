import { useNavigate } from "react-router-dom";
import { ProgressCard } from "@/components/shared/ProgressCard";
import {
  SECTION_LABELS,
  SECTION_ORDER,
  type ProfileSectionKey,
} from "@/data/questions";
import { useProfileContext } from "@/context/ProfileContext";
import { Button } from "@/components/ui/button";
import { ShareModal } from "@/components/modals/ShareModal";
import { useState } from "react";

export function HomeScreen() {
  const navigate = useNavigate();
  const { sectionCounts, sectionStatus } = useProfileContext();
  const [isShareOpen, setShareOpen] = useState(false);

  const handleOpenSection = (section: ProfileSectionKey) => {
    navigate(`/sections/${section}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-card md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Build clarity for your collaborators
          </h2>
          <p className="text-sm text-muted-foreground">
            Complete each section to help teammates understand how you do your best work. Share when you are ready.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/preview")}>
            Preview profile
          </Button>
          <Button onClick={() => setShareOpen(true)}>Share</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SECTION_ORDER.map((section) => (
          <ProgressCard
            key={section}
            section={section}
            title={SECTION_LABELS[section]}
            answered={sectionCounts[section].answered}
            total={sectionCounts[section].total}
            status={sectionStatus[section]}
            onContinue={() => handleOpenSection(section)}
          />
        ))}
      </div>

      <ShareModal open={isShareOpen} onOpenChange={setShareOpen} />
    </div>
  );
}
