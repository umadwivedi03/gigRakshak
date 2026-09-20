import React, { createContext, useContext, useState, useEffect } from "react";

interface AppContextType {
  isWoman: boolean;
  setIsWoman: (v: boolean) => void;
  isNightWorker: boolean;
  setIsNightWorker: (v: boolean) => void;
  workerName: string;
  setWorkerName: (v: string) => void;
  platform: string;
  setPlatform: (v: string) => void;
  plan: string;
  setPlan: (v: string) => void;
  zone: string;
  setZone: (v: string) => void;
  sosActive: boolean;
  setSosActive: (v: boolean) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType>({
  isWoman: false,
  setIsWoman: () => {},
  isNightWorker: false,
  setIsNightWorker: () => {},
  workerName: "Arjun Sharma",
  setWorkerName: () => {},
  platform: "Zomato",
  setPlatform: () => {},
  plan: "Standard",
  setPlan: () => {},
  zone: "Andheri West",
  setZone: () => {},
  sosActive: false,
  setSosActive: () => {},
  theme: "dark",
  toggleTheme: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWoman, setIsWoman] = useState(false);
  const [isNightWorker, setIsNightWorker] = useState(false);
  const [workerName, setWorkerName] = useState("Arjun Sharma");
  const [platform, setPlatform] = useState("Zomato");
  const [plan, setPlan] = useState("Standard");
  const [zone, setZone] = useState("Andheri West");
  const [sosActive, setSosActive] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{
      isWoman, setIsWoman,
      isNightWorker, setIsNightWorker,
      workerName, setWorkerName,
      platform, setPlatform,
      plan, setPlan,
      zone, setZone,
      sosActive, setSosActive,
      theme, toggleTheme,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
