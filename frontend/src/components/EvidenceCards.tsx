"use client";

import { ExternalLink, Database } from "lucide-react";

export default function EvidenceCards({ evidence = [] }: { evidence: any[] }) {
  if (!evidence || evidence.length === 0) return null;

  return (
    <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-bold tracking-tight text-white">Verified Sources</h2>
        </div>
        <span className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full font-semibold">{evidence.length} Sources Analyzed</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {evidence.map((item, i) => (
          <div key={i} className="group bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800 hover:border-orange-500/50 p-5 rounded-xl transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full pointer-events-none transition-all group-hover:scale-150 relative -z-10"></div>
            
            <div>
              <div className="flex items-center justify-between mb-3 z-10">
                <span className="font-bold text-zinc-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {item.source}
                </span>
                <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 uppercase tracking-wider font-semibold">Trusted</span>
              </div>
              <p className="text-zinc-400 text-sm italic mb-4 leading-relaxed line-clamp-3">"{item.quote}"</p>
            </div>
            
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 font-medium z-10 self-start mt-auto">
              View Full Source <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
