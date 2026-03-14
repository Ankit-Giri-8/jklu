"use client";

import { useAnalysis } from "@/context/AnalysisContext";
import GraphView from "@/components/GraphView";
import Timeline from "@/components/Timeline";
import { Network, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GraphPage() {
  const { resultData } = useAnalysis();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mis-match

  if (!resultData) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
            <h2 className="text-2xl font-bold mb-4">No Data for Graph</h2>
            <p className="text-zinc-400 mb-8">Please run an analysis first.</p>
            <Link href="/" className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                <ArrowLeft size={18} /> New Analysis
            </Link>
        </div>
    )
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden p-6 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center gap-4 shrink-0 px-4">
        <Network className="w-8 h-8 text-orange-500" />
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Graph & Timeline</h1>
      </header>
      
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative h-full rounded-2xl overflow-hidden glass-panel">
            <GraphView triplets={resultData.triplets} />
          </div>
          <div className="lg:col-span-1 h-full overflow-y-auto pr-2 custom-scrollbar">
            <Timeline events={resultData.timeline} />
          </div>
      </div>
    </div>
  );
}
