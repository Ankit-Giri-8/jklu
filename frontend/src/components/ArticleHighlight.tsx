"use client";

import { FileText } from "lucide-react";

export default function ArticleHighlight({ analysis = [] }: { analysis: any[] }) {
  if (!analysis || analysis.length === 0) return null;

  const getColorClasses = (label: string) => {
    switch (label?.toUpperCase()) {
      case "VERIFIED":
      case "TRUE":
        return "bg-green-500/20 text-green-300 hover:bg-green-500/30 border-green-500/30";
      case "UNCERTAIN":
      case "MISLEADING":
        return "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 border-yellow-500/30";
      case "FALSE":
      case "FAKE":
        return "bg-red-500/20 text-red-300 hover:bg-red-500/30 border-red-500/30";
      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl relative overflow-hidden">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-zinc-800 gap-4">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-orange-500" />
          <h2 className="text-xl font-bold tracking-tight text-white">Article Fact Analysis</h2>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold tracking-widest uppercase">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="text-green-400">Verified</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div><span className="text-yellow-400">Uncertain</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><span className="text-red-400">False</span></div>
        </div>
      </div>

      <div className="leading-relaxed text-lg flex flex-wrap gap-x-1 gap-y-2 font-medium">
        {analysis.map((item, i) => (
          <span
            key={i}
            className={`group relative px-1.5 py-0.5 rounded cursor-help border border-transparent transition-colors ${getColorClasses(item.label)}`}
          >
            {item.sentence}
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold tracking-widest uppercase" 
                      style={{ color: item.label === 'VERIFIED' ? '#4ade80' : item.label === 'FALSE' ? '#f87171' : '#facc15' }}>
                  {item.label} ({item.confidence}%)
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-normal leading-normal">{item.reason}</p>
              
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-700"></div>
            </div>
          </span>
        ))}
      </div>
      
    </div>
  );
}
