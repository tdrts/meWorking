import type {
  ProfileSectionKey,
  QuestionInputType,
  SectionQuestion,
} from "@/data/questions";

export type SectionAnswerValue = string | string[] | null;

export type SectionAnswers = Record<string, SectionAnswerValue>;

export type ProfileAnswers = Record<ProfileSectionKey, SectionAnswers>;

export type SectionStatus = "not-started" | "in-progress" | "complete";

export interface SectionProgress {
  section: ProfileSectionKey;
  answered: number;
  total: number;
  status: SectionStatus;
}

export interface ProfileDraft {
  id?: string;
  ownerId?: string;
  answers: ProfileAnswers;
  skipped: Record<ProfileSectionKey, string[]>;
  isPublished: boolean;
  updatedAt: string;
}

export interface PublishedProfile {
  slug: string;
  displayName: string;
  avatarUrl?: string;
  lastUpdated: string;
  answers: ProfileAnswers;
}

export const DEFAULT_SECTION_STATUS: SectionStatus = "not-started";

export function createEmptyAnswers(
  sections: Record<ProfileSectionKey, SectionQuestion[]>,
): ProfileAnswers {
  return Object.fromEntries(
    Object.entries(sections).map(([key, questions]) => [
      key,
      Object.fromEntries(
        questions.map((question) => [question.id, getDefaultValue(question)]),
      ),
    ]),
  ) as ProfileAnswers;
}

function getDefaultValue(question: SectionQuestion): SectionAnswerValue {
  if (question.type === "chips") {
    return [];
  }
  return "";
}

export function deriveStatus(
  answers: SectionAnswers,
  skipped: string[] = [],
): SectionStatus {
  const total = Object.keys(answers).length;
  const answered = Object.entries(answers).filter(([key, value]) => {
    if (skipped.includes(key)) {
      return false;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return Boolean(value && value.trim().length > 0);
  }).length;

  if (answered === 0) return "not-started";
  if (answered >= total - skipped.length) return "complete";
  return "in-progress";
}

export function countAnswered(
  answers: SectionAnswers,
  skipped: string[] = [],
): number {
  return Object.entries(answers).reduce((acc, [key, value]) => {
    if (skipped.includes(key)) return acc;
    if (Array.isArray(value)) {
      return value.length > 0 ? acc + 1 : acc;
    }
    return value && value.trim().length > 0 ? acc + 1 : acc;
  }, 0);
}

export function isQuestionSkipped(skipped: string[], id: string) {
  return skipped.includes(id);
}

export function toggleSkip(skipped: string[], id: string) {
  if (skipped.includes(id)) {
    return skipped.filter((item) => item !== id);
  }
  return [...skipped, id];
}

export function coerceAnswer(
  type: QuestionInputType,
  value: SectionAnswerValue,
): SectionAnswerValue {
  if (type === "chips") {
    return Array.isArray(value) ? value : [];
  }
  return typeof value === "string" ? value : "";
}
