import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChipSelectorProps {
  options: string[];
  value: string[];
  minSelections?: number;
  maxSelections?: number;
  customValue?: string;
  onChange: (value: string[]) => void;
  onCustomChange?: (value: string) => void;
}

export function ChipSelector({
  options,
  value,
  minSelections,
  maxSelections,
  customValue = "",
  onChange,
  onCustomChange,
}: ChipSelectorProps) {
  const metrics = useMemo(() => {
    return {
      minReached: typeof minSelections === "number" && value.length >= minSelections,
      maxReached:
        typeof maxSelections === "number" && value.length >= maxSelections,
    };
  }, [value, minSelections, maxSelections]);

  const handleToggle = (option: string) => {
    const isSelected = value.includes(option);
    if (isSelected) {
      onChange(value.filter((item) => item !== option));
      if (option === "Other" && onCustomChange) {
        onCustomChange("");
      }
      return;
    }

    if (metrics.maxReached) {
      return;
    }
    onChange([...value, option]);
  };

  const showCustomInput = value.includes("Other");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value.includes(option);
          return (
            <Button
              key={option}
              type="button"
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition",
                isSelected
                  ? "bg-primary text-white hover:bg-primary-hover"
                  : "border-border/80 text-slate-700 hover:border-primary/50 hover:text-primary",
              )}
              onClick={() => handleToggle(option)}
            >
              {option}
            </Button>
          );
        })}
      </div>
      {(minSelections || maxSelections) && (
        <p className="text-xs text-muted-foreground">
          {minSelections
            ? `Select at least ${minSelections}`
            : null}
          {minSelections && maxSelections ? " • " : null}
          {maxSelections ? `Up to ${maxSelections} selections` : null}
        </p>
      )}
      {showCustomInput && onCustomChange && (
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground">
            Add a custom value
          </span>
          <Input
            value={customValue}
            onChange={(event) => onCustomChange(event.target.value)}
            placeholder="Type your custom value"
          />
        </div>
      )}
    </div>
  );
}
