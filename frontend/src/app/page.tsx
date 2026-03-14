"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import InputPanel from "@/components/InputPanel";
import LoadingSteps from "@/components/LoadingSteps";
import { useAnalysis } from "@/context/AnalysisContext";

export default function Home() {
  const router = useRouter();
  const { setResultData, isAnalyzing, setIsAnalyzing } = useAnalysis();

  const handleAnalyze = async (claim: string) => {
    setIsAnalyzing(true);
    setResultData(null);
    try {
      // Pointing to our FastAPI backend
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ claim }),
      });
      const data = await response.json();
      setResultData(data);
      // Navigate to dashboard immediately after data is ready
      router.push("/dashboard");
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen p-6 md:p-10 max-w-4xl mx-auto flex flex-col justify-center">
      {!isAnalyzing ? (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="flex flex-col items-center justify-center text-center space-y-4 py-10">
            <div className="flex items-center gap-3 bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              <span className="text-orange-500 font-semibold tracking-wide text-sm uppercase">AI-Powered Verification</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Verify the <span className="text-orange-500">Truth</span> in Seconds.
            </h1>
            <p className="text-zinc-400 max-w-2xl text-lg md:text-xl">
              Combat misinformation with live neural-network analysis. Paste any news claim to evaluate its authenticity against actual live web data.
            </p>
          </header>

          <div className="space-y-6">
            <InputPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center animate-in zoom-in-95 duration-500">
          <LoadingSteps />
        </div>
      )}
    </main>
  );
}
