import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface UiContextValue {
  assistantOpen: boolean;
  openAssistant: (seed?: string) => void;
  closeAssistant: () => void;
  seedQuestion: string | null;
  clearSeed: () => void;
  interestedService: string | null;
  setInterestedService: (service: string | null) => void;
}

const UiContext = createContext<UiContextValue | undefined>(undefined);

export function UiProvider({ children }: {children: React.ReactNode;}) {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [seedQuestion, setSeedQuestion] = useState<string | null>(null);
  const [interestedService, setInterestedService] = useState<string | null>(null);

  const openAssistant = useCallback((seed?: string) => {
    if (seed) setSeedQuestion(seed);
    setAssistantOpen(true);
  }, []);

  const closeAssistant = useCallback(() => setAssistantOpen(false), []);
  const clearSeed = useCallback(() => setSeedQuestion(null), []);

  const value = useMemo(
    () => ({
      assistantOpen,
      openAssistant,
      closeAssistant,
      seedQuestion,
      clearSeed,
      interestedService,
      setInterestedService
    }),
    [assistantOpen, openAssistant, closeAssistant, seedQuestion, clearSeed, interestedService]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi(): UiContextValue {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error('useUi must be used within a UiProvider');
  return ctx;
}