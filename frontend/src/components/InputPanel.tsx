"use client";

import { useState } from "react";
import { Copy, Trash, ArrowRight } from "lucide-react";

export default function InputPanel({ onAnalyze, isAnalyzing }: { onAnalyze: (claim: string) => void, isAnalyzing: boolean }) {
  const [claim, setClaim] = useState("");

  const handleAnalyze = () => {
    if (!claim.trim()) return;
    onAnalyze(claim);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col h-full relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10 mr-0"></div>
      
      <div className="flex items-center justify-between mb-4 z-10">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-zinc-400">Paste Claim Or Article</h2>
        <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-md tracking-wider">MAX 5000 WORDS</span>
      </div>

      <textarea
        className="flex-1 w-full p-4 bg-zinc-950/50 text-zinc-200 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500/50 resize-none min-h-[300px] z-10 font-mono text-sm leading-relaxed"
        placeholder="E.g., 'A new study claims that coffee can help you live until 150...' or paste the full text of a news report here."
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        disabled={isAnalyzing}
      />

      <div className="flex gap-2 justify-end mt-4 mb-8 z-10">
        <button 
          onClick={() => navigator.clipboard.readText().then(setClaim)}
          className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 transition"
          title="Paste from clipboard"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setClaim("")}
          className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 transition"
          title="Clear"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing || !claim.trim()}
        className={`mt-auto w-full group relative flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-all overflow-hidden z-10 ${
          isAnalyzing || !claim.trim() 
            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
            : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
        }`}
      >
        <span className="relative z-10 flex items-center gap-2 tracking-wide">
          {isAnalyzing ? "ANALYZING..." : "ANALYZE CLAIM"} 
          {!isAnalyzing && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
        </span>
      </button>

      {/* Decorative stat */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none mt-4 opacity-50 z-0 hidden lg:flex">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-zinc-700 border border-zinc-900"></div>
          <div className="w-6 h-6 rounded-full bg-zinc-600 border border-zinc-900"></div>
          <div className="w-6 h-6 rounded-full bg-zinc-500 border border-zinc-900"></div>
        </div>
        <span className="text-xs text-zinc-500">+12k claims checked today</span>
      </div>
    </div>
  );
}
