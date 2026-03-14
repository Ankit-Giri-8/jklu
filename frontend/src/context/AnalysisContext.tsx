"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// The context type
type AnalysisContextType = {
  resultData: any | null;
  setResultData: (data: any | null) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
};

// Creating context
const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

// Provider Component
export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [resultData, setResultData] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <AnalysisContext.Provider value={{ resultData, setResultData, isAnalyzing, setIsAnalyzing }}>
      {children}
    </AnalysisContext.Provider>
  );
}

// Custom hook to use the context
export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
}
