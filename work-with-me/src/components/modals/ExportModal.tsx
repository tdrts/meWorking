import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMemo } from "react";
import { useProfileContext } from "@/context/ProfileContext";
import { SECTION_ORDER, SECTION_QUESTIONS } from "@/data/questions";

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const { answers } = useProfileContext();

  const plainText = useMemo(() => {
    return SECTION_ORDER.map((section) => {
      const lines = SECTION_QUESTIONS[section].map((question) => {
        const value = answers[section][question.id];
        const formatted = Array.isArray(value) ? value.join(", ") : value ?? "";
        return `${question.prompt}: ${formatted}`;
      });
      return [`${section.toUpperCase()}`, ...lines].join("\n");
    }).join("\n\n");
  }, [answers]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Export profile</DialogTitle>
          <DialogDescription>
            Copy your profile as plain text or an AI-ready prompt to share with collaborators.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-800">Plain text</p>
            <Textarea readOnly rows={10} value={plainText} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-800">LLM context</p>
            <Textarea
              readOnly
              rows={10}
              value={`You are collaborating with Jordan Doe. Adapt your output to these preferences:\n\n${plainText}`}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
