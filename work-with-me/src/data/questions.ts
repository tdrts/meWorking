export type QuestionInputType = "chips" | "textarea" | "text" | "time-window";

export interface SectionQuestion {
  id: string;
  prompt: string;
  helperText?: string;
  type: QuestionInputType;
  options?: string[];
  minSelections?: number;
  maxSelections?: number;
  isOptional?: boolean;
  placeholder?: string;
}

export type ProfileSectionKey =
  | "principles"
  | "communication"
  | "decisionMaking";

export const SECTION_LABELS: Record<ProfileSectionKey, string> = {
  principles: "Principles",
  communication: "Communication",
  decisionMaking: "Decision-Making",
};

export const SECTION_QUESTIONS: Record<
  ProfileSectionKey,
  SectionQuestion[]
> = {
  principles: [
    {
      id: "core-values",
      prompt: "Core values",
      helperText: "Select the values that best describe how you operate.",
      type: "chips",
      options: [
        "Transparency",
        "Autonomy",
        "Speed",
        "Craft",
        "Impact",
        "Learning",
        "Reliability",
        "Empathy",
        "Ownership",
        "Creativity",
        "Other",
      ],
      minSelections: 3,
      maxSelections: 6,
    },
    {
      id: "top-strengths",
      prompt: "Top strengths",
      type: "chips",
      helperText: "Highlight the strengths teammates can rely on.",
      options: [
        "Strategy",
        "Execution",
        "Storytelling",
        "Coaching",
        "Systems thinking",
        "Facilitation",
        "Prioritization",
        "Focus",
        "Resilience",
        "Other",
      ],
      minSelections: 3,
      maxSelections: 3,
    },
    {
      id: "learning-style",
      prompt: "Learning style",
      type: "textarea",
      placeholder: "Example: I learn fast by pairing with someone and taking notes.",
    },
    {
      id: "motivators",
      prompt: "Motivators",
      type: "textarea",
      placeholder: "What keeps you engaged or energized?",
    },
    {
      id: "drainers",
      prompt: "Drainers",
      type: "textarea",
      placeholder: "What slows you down or drains energy?",
    },
    {
      id: "recharge",
      prompt: "How I recharge",
      type: "textarea",
      isOptional: true,
    },
    {
      id: "great-day",
      prompt: "A great day looks like",
      type: "textarea",
    },
    {
      id: "great-week",
      prompt: "A great week looks like",
      type: "textarea",
    },
    {
      id: "focus-hours",
      prompt: "Focus hours",
      helperText:
        "When do you prefer to block deep work or avoid meetings?",
      type: "text",
      placeholder: "Example: 9am - 11am ET, Mon-Thu",
    },
  ],
  communication: [
    {
      id: "channels",
      prompt: "Communication channels",
      helperText: "Outline which channels you prefer for different topics.",
      type: "textarea",
    },
    {
      id: "give-feedback",
      prompt: "How I give feedback",
      type: "textarea",
    },
    {
      id: "receive-feedback",
      prompt: "How I like to receive feedback",
      type: "textarea",
    },
    {
      id: "conflict-style",
      prompt: "How I deal with conflict",
      type: "textarea",
      isOptional: true,
    },
  ],
  decisionMaking: [
    {
      id: "style",
      prompt: "Decision-making style",
      type: "textarea",
    },
    {
      id: "decide-quickly",
      prompt: "What I decide quickly on",
      type: "textarea",
    },
    {
      id: "need-alignment",
      prompt: "Where I need more time or alignment",
      type: "textarea",
    },
    {
      id: "experimenting",
      prompt: "What I'm comfortable experimenting with",
      type: "textarea",
    },
    {
      id: "guardrails",
      prompt: "My guardrails",
      helperText: "What are you careful or intentional about?",
      type: "textarea",
    },
  ],
};

export const SECTION_ORDER: ProfileSectionKey[] = [
  "principles",
  "communication",
  "decisionMaking",
];
