import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  SECTION_LABELS,
  SECTION_QUESTIONS,
  type ProfileSectionKey,
  type SectionQuestion,
} from "@/data/questions";
import {
  countAnswered,
  createEmptyAnswers,
  deriveStatus,
  toggleSkip,
  type ProfileAnswers,
  type SectionAnswerValue,
  type SectionStatus,
} from "@/lib/profile-schema";

interface ProfileContextValue {
  answers: ProfileAnswers;
  skipped: Record<ProfileSectionKey, string[]>;
  sectionStatus: Record<ProfileSectionKey, SectionStatus>;
  sectionCounts: Record<ProfileSectionKey, { answered: number; total: number }>;
  updateAnswer: (
    section: ProfileSectionKey,
    questionId: string,
    value: SectionAnswerValue,
  ) => void;
  toggleSkip: (section: ProfileSectionKey, questionId: string) => void;
  resetSection: (section: ProfileSectionKey) => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined,
);

const defaultAnswers = createEmptyAnswers(SECTION_QUESTIONS);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<ProfileAnswers>(defaultAnswers);
  const [skipped, setSkipped] = useState<Record<ProfileSectionKey, string[]>>({
    principles: [],
    communication: [],
    decisionMaking: [],
  });

  const sectionCounts = useMemo(() => {
    return Object.entries(SECTION_QUESTIONS).reduce<
      Record<ProfileSectionKey, { answered: number; total: number }>
    >((acc, [sectionKey, questions]) => {
      const typedKey = sectionKey as ProfileSectionKey;
      const total = questions.length;
      return {
        ...acc,
        [typedKey]: {
          answered: countAnswered(answers[typedKey], skipped[typedKey]),
          total,
        },
      };
    }, {} as Record<ProfileSectionKey, { answered: number; total: number }>);
  }, [answers, skipped]);

  const sectionStatus = useMemo(() => {
    return Object.entries(SECTION_QUESTIONS).reduce<
      Record<ProfileSectionKey, SectionStatus>
    >((acc, [sectionKey]) => {
      const typedKey = sectionKey as ProfileSectionKey;
      return {
        ...acc,
        [typedKey]: deriveStatus(answers[typedKey], skipped[typedKey]),
      };
    }, {} as Record<ProfileSectionKey, SectionStatus>);
  }, [answers, skipped]);

  const updateAnswer = useCallback<
    ProfileContextValue["updateAnswer"]
  >((section, questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [questionId]: value,
      },
    }));
  }, []);

  const handleToggleSkip = useCallback<
    ProfileContextValue["toggleSkip"]
  >((section, questionId) => {
    setSkipped((prev) => ({
      ...prev,
      [section]: toggleSkip(prev[section], questionId),
    }));
  }, []);

  const resetSection = useCallback<
    ProfileContextValue["resetSection"]
  >((section) => {
    const defaults = createEmptyAnswers({
      [section]: SECTION_QUESTIONS[section],
    } as Record<ProfileSectionKey, SectionQuestion[]>);
    setAnswers((prev) => ({
      ...prev,
      [section]: defaults[section],
    }));
    setSkipped((prev) => ({
      ...prev,
      [section]: [],
    }));
  }, []);

  const value = useMemo<ProfileContextValue>(
    () => ({
      answers,
      skipped,
      sectionStatus,
      sectionCounts,
      updateAnswer,
      toggleSkip: handleToggleSkip,
      resetSection,
    }),
    [answers, skipped, sectionStatus, sectionCounts, updateAnswer, handleToggleSkip, resetSection],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within ProfileProvider");
  }
  return context;
}

export function useSectionMeta(section: ProfileSectionKey) {
  const { sectionCounts, sectionStatus } = useProfileContext();
  return {
    label: SECTION_LABELS[section],
    ...sectionCounts[section],
    status: sectionStatus[section],
  };
}
