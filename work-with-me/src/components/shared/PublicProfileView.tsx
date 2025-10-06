import {
  SECTION_LABELS,
  SECTION_ORDER,
  SECTION_QUESTIONS,
  type SectionQuestion,
} from "@/data/questions";
import { useProfileContext } from "@/context/ProfileContext";
import { format } from "date-fns";

interface PublicProfileViewProps {
  mode?: "preview" | "public";
}

export function PublicProfileView({ mode = "public" }: PublicProfileViewProps) {
  const { answers, sectionStatus } = useProfileContext();

  const lastUpdated = format(new Date(), "MMM d, yyyy");

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-border/60 bg-white p-8 shadow-card">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white shadow-card">
              JD
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Jordan Doe
              </h1>
              <p className="text-sm text-muted-foreground">
                Updated {lastUpdated}
              </p>
              {mode === "preview" ? (
                <p className="mt-2 max-w-lg text-sm text-slate-600">
                  This is what your teammates will see when you share your Work With Me profile.
                </p>
              ) : (
                <p className="mt-2 max-w-lg text-sm text-slate-600">
                  Sharing how I work best so we can collaborate with clarity and momentum.
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <ActionButton label="Copy as text" />
            <ActionButton label="Copy LLM context" emphasis />
          </div>
        </div>
      </header>

      <div className="grid gap-6">
        {SECTION_ORDER.map((section) => (
          <section
            key={section}
            className="rounded-3xl border border-border/70 bg-white p-6 shadow-card"
          >
            <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                {SECTION_LABELS[section]}
              </h2>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {sectionStatus[section] === "complete"
                  ? "Ready to share"
                  : "Still editing"}
              </span>
            </header>

            <div className="grid gap-4">
              {SECTION_QUESTIONS[section].map((question) => (
                <QuestionDisplay
                  key={question.id}
                  question={question}
                  answer={answers[section][question.id]}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {mode === "public" && (
        <footer className="flex items-center justify-center rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Ready to create your own?
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">
              Build your Work With Me profile and help your team collaborate with you.
            </h3>
          </div>
        </footer>
      )}
    </div>
  );
}

function QuestionDisplay({
  question,
  answer,
}: {
  question: SectionQuestion;
  answer: unknown;
}) {
  const content =
    Array.isArray(answer) && answer.length > 0
      ? answer.join(", ")
      : typeof answer === "string" && answer
        ? answer
        : "Draft in progress";

  return (
    <div className="rounded-2xl border border-border/60 bg-slate-50/40 p-4">
      <h3 className="text-sm font-semibold text-slate-700">
        {question.prompt}
      </h3>
      <p className="mt-2 whitespace-pre-line text-sm text-slate-700">
        {content}
      </p>
    </div>
  );
}

function ActionButton({
  label,
  emphasis = false,
}: {
  label: string;
  emphasis?: boolean;
}) {
  return (
    <button
      type="button"
      className={
        emphasis
          ? "rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-card transition hover:bg-primary-hover"
          : "rounded-xl border border-border/60 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary/50 hover:text-primary"
      }
    >
      {label}
    </button>
  );
}
