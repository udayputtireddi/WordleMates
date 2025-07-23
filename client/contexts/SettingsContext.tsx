import { createContext, useContext, useState, ReactNode } from "react";

interface GameSettings {
  hardMode: boolean;
  confettiMode: boolean;
  soundEffects: boolean;
}

interface SettingsContextType {
  settings: GameSettings;
  updateSetting: <K extends keyof GameSettings>(
    key: K,
    value: GameSettings[K],
  ) => void;
}

const defaultSettings: GameSettings = {
  hardMode: false,
  confettiMode: true,
  soundEffects: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<GameSettings>(() => {
    // Try to load settings from localStorage
    try {
      const saved = localStorage.getItem("wordlemates-settings");
      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const updateSetting = <K extends keyof GameSettings>(
    key: K,
    value: GameSettings[K],
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    // Save to localStorage
    try {
      localStorage.setItem("wordlemates-settings", JSON.stringify(newSettings));
    } catch {
      // Handle localStorage errors silently
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
