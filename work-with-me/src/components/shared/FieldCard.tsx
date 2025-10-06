import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChipSelector } from "./ChipSelector";
import type { SectionQuestion } from "@/data/questions";
import type { SectionAnswerValue } from "@/lib/profile-schema";

interface FieldCardProps {
  question: SectionQuestion;
  value: SectionAnswerValue;
  skipped: boolean;
  onChange: (value: SectionAnswerValue) => void;
  onToggleSkip: () => void;
}

export function FieldCard({ question, value, skipped, onChange, onToggleSkip }: FieldCardProps) {
  const isDisabled = skipped;
  const [customValue, setCustomValue] = useState("");

  const selectedValues = Array.isArray(value) ? value : [];
  const baseOptions = question.options ?? [];

  const currentCustomValue = useMemo(() => {
    return selectedValues.find((item) => !baseOptions.includes(item));
  }, [selectedValues, baseOptions]);

  useEffect(() => {
    if (currentCustomValue) {
      setCustomValue(currentCustomValue);
    } else if (!selectedValues.includes("Other")) {
      setCustomValue("");
    }
  }, [currentCustomValue, selectedValues]);

  const effectiveSelection = useMemo(() => {
    if (!Array.isArray(value)) return [];
    if (!currentCustomValue) {
      return value;
    }
    // Represent custom value as "Other" for the selector.
    const known = value.filter((item) => baseOptions.includes(item));
    return [...known, "Other"];
  }, [value, baseOptions, currentCustomValue]);

  const handleChipChange = (selection: string[]) => {
    const includesOther = selection.includes("Other");
    const filtered = selection.filter((option) => option !== "Other");
    if (!includesOther) {
      onChange(filtered);
      setCustomValue("");
      return;
    }

    const placeholderCustom = customValue || currentCustomValue || "Other";
    const next = [...filtered, placeholderCustom];
    onChange(next);
  };

  const handleCustomChange = (nextValue: string) => {
    setCustomValue(nextValue);
    const filtered = selectedValues.filter(
      (item) => baseOptions.includes(item),
    );
    if (!nextValue) {
      onChange(filtered);
      return;
    }
    onChange([...filtered, nextValue]);
  };

  const helperText = question.helperText;

  return (
    <Card
      className="border border-border/70 bg-white shadow-sm transition hover:shadow-card"
      data-disabled={isDisabled}
    >
      <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {question.prompt}
          </h3>
          {helperText ? (
            <p className="text-sm text-muted-foreground">{helperText}</p>
          ) : null}
        </div>
        {question.isOptional ? (
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Optional
          </span>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">
        {question.type === "chips" && Array.isArray(value) ? (
          <ChipSelector
            options={baseOptions}
            value={effectiveSelection}
            minSelections={question.minSelections}
            maxSelections={question.maxSelections}
            customValue={customValue}
            onChange={handleChipChange}
            onCustomChange={handleCustomChange}
          />
        ) : null}

        {question.type === "textarea" ? (
          <Textarea
            value={typeof value === "string" ? value : ""}
            placeholder={question.placeholder}
            rows={4}
            disabled={isDisabled}
            onChange={(event) => onChange(event.target.value)}
          />
        ) : null}

        {question.type === "text" ? (
          <Input
            value={typeof value === "string" ? value : ""}
            placeholder={question.placeholder}
            disabled={isDisabled}
            onChange={(event) => onChange(event.target.value)}
          />
        ) : null}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Toggle
          pressed={skipped}
          onPressedChange={() => onToggleSkip()}
          className="text-sm font-medium"
        >
          {skipped ? "Unskip question" : "Skip question"}
        </Toggle>
        {!question.isOptional && (
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
            Required
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
