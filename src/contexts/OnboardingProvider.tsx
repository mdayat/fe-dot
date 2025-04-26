import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

interface OnboardingContextType {
  showOnboarding: boolean;
  selectedApp: "task" | "product";
  handleAppSelect: (app: OnboardingContextType["selectedApp"]) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

function OnboardingProvider({ children }: PropsWithChildren) {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [selectedApp, setSelectedApp] =
    useState<OnboardingContextType["selectedApp"]>("task");

  const handleAppSelect = useCallback(
    (app: OnboardingContextType["selectedApp"]) => {
      setSelectedApp(app);
      setShowOnboarding(false);
    },
    []
  );

  const value = useMemo((): OnboardingContextType => {
    return { showOnboarding, selectedApp, handleAppSelect };
  }, [handleAppSelect, selectedApp, showOnboarding]);

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

function useOnboardingContext() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error(
      "useOnboardingContext must be used within a OnboardingProvider"
    );
  }
  return context;
}

export { OnboardingProvider, useOnboardingContext };
export type { OnboardingContextType };
