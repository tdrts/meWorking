import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  SECTION_LABELS,
  SECTION_QUESTIONS,
  type ProfileSectionKey,
  type SectionQuestion,
} from "@/data/questions";
import { FieldCard } from "@/components/shared/FieldCard";
import { Button } from "@/components/ui/button";
import { useProfileContext } from "@/context/ProfileContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function isSectionKey(value: string | undefined): value is ProfileSectionKey {
  return value === "principles" || value === "communication" || value === "decisionMaking";
}

export function SectionEditor() {
  const params = useParams<{ sectionId: string }>();
  const sectionKey = params.sectionId;
  const navigate = useNavigate();
  const { answers, skipped, updateAnswer, toggleSkip, sectionCounts, sectionStatus } =
    useProfileContext();

  if (!isSectionKey(sectionKey)) {
    return <Navigate to="/dashboard" replace />;
  }

  const questions = SECTION_QUESTIONS[sectionKey];
  const sectionLabel = SECTION_LABELS[sectionKey];
  const answered = sectionCounts[sectionKey]?.answered ?? 0;
  const total = sectionCounts[sectionKey]?.total ?? questions.length;
  const status = sectionStatus[sectionKey];

  const nextSection = useMemo(() => {
    const keys: ProfileSectionKey[] = ["principles", "communication", "decisionMaking"];
    const currentIndex = keys.indexOf(sectionKey);
    return currentIndex >= 0 && currentIndex < keys.length - 1
      ? keys[currentIndex + 1]
      : undefined;
  }, [sectionKey]);

  const handleContinue = () => {
    if (nextSection) {
      navigate(`/sections/${nextSection}`);
    } else {
      navigate("/preview");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-3xl bg-white p-6 shadow-card">
        <div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={cn("border-0 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary")}>
              {sectionLabel}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {answered} of {total} answered
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">
            Tell your team about your {sectionLabel.toLowerCase()}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="uppercase tracking-wide">
            {status === "not-started"
              ? "Not started"
              : status === "in-progress"
                ? "In progress"
                : "Complete"}
          </Badge>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Save & Exit
          </Button>
          <Button onClick={handleContinue}>Save & Continue</Button>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question: SectionQuestion) => (
          <FieldCard
            key={question.id}
            question={question}
            value={answers[sectionKey][question.id]}
            skipped={skipped[sectionKey].includes(question.id)}
            onChange={(value) => updateAnswer(sectionKey, question.id, value)}
            onToggleSkip={() => toggleSkip(sectionKey, question.id)}
          />
        ))}
      </div>
    </div>
  );
}
