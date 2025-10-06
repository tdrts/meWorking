import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "./StatusBadge";
import type { ProfileSectionKey } from "@/data/questions";

interface ProgressCardProps {
  section: ProfileSectionKey;
  title: string;
  answered: number;
  total: number;
  status: "not-started" | "in-progress" | "complete";
  onContinue: () => void;
}

export function ProgressCard({
  title,
  answered,
  total,
  status,
  onContinue,
}: ProgressCardProps) {
  const percentage = total > 0 ? Math.floor((answered / total) * 100) : 0;

  return (
    <Card className="flex h-full flex-col justify-between border border-border/80 shadow-card">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <StatusBadge status={status} />
        </div>
        <p className="text-sm text-muted-foreground">
          {answered} of {total} questions answered
        </p>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} className="h-2 rounded-full" />
        <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
          {percentage}% complete
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onContinue}>
          {status === "complete" ? "Review section" : "Continue section"}
        </Button>
      </CardFooter>
    </Card>
  );
}
