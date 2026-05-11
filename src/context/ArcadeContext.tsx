import { createContext, useContext, useState, type ReactNode } from 'react';

export type ViewMode = 'arcade' | 'dashboard' | null;

interface ArcadeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const ArcadeContext = createContext<ArcadeContextType | undefined>(undefined);

export function ArcadeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>(null);
  const [activeSection, setActiveSection] = useState('about');

  return (
    <ArcadeContext.Provider value={{ viewMode, setViewMode, activeSection, setActiveSection }}>
      {children}
    </ArcadeContext.Provider>
  );
}

export function useArcade() {
  const context = useContext(ArcadeContext);
  if (!context) throw new Error('useArcade must be used within ArcadeProvider');
  return context;
}
