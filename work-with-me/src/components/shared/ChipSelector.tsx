import { useMemo } from "react";
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
          const isDisabled = !isSelected && metrics.maxReached;

          return (
            <button
              key={option}
              type="button"
              onClick={() => handleToggle(option)}
              disabled={isDisabled}
              className={cn(
                "inline-flex h-[22px] items-center justify-center rounded-[10px] border px-2 py-[2px] text-xs font-medium transition-colors",
                {
                  "bg-[#0a66c2] text-white border-transparent": isSelected,
                  "bg-white text-neutral-950 border-[rgba(0,0,0,0.1)] hover:bg-neutral-50": !isSelected && !isDisabled,
                  "opacity-50 cursor-not-allowed": isDisabled,
                }
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {(minSelections || maxSelections) && (
        <p className="text-xs text-[#717182]">
          {minSelections
            ? `Select at least ${minSelections}`
            : null}
          {minSelections && maxSelections ? " • " : null}
          {maxSelections ? `Up to ${maxSelections} selections` : null}
        </p>
      )}
      {showCustomInput && onCustomChange && (
        <div className="space-y-2">
          <span className="text-xs font-medium text-[#717182]">
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
