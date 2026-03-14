"use client";

import { useAnalysis } from "@/context/AnalysisContext";
import TrustGauge from "@/components/TrustGauge";
import ArticleHighlight from "@/components/ArticleHighlight";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { resultData } = useAnalysis();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mis-match

  if (!resultData) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
            <h2 className="text-2xl font-bold mb-4">No Analysis Found</h2>
            <p className="text-zinc-400 mb-8">Please run an analysis first.</p>
            <Link href="/" className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                <ArrowLeft size={18} /> New Analysis
            </Link>
        </div>
    )
  }

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-10 flex items-center gap-4 border-b border-zinc-800 pb-6">
        <ShieldCheck className="w-8 h-8 text-orange-500" />
        <h1 className="text-3xl font-bold tracking-tight">Overview Dashboard</h1>
      </header>
      
      <TrustGauge verdict={resultData.verdict} confidence={resultData.confidence} />
      
      {resultData.sentence_analysis && (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Detailed Article Fact Analysis</h2>
            <ArticleHighlight analysis={resultData.sentence_analysis} />
        </div>
      )}
    </div>
  );
}
