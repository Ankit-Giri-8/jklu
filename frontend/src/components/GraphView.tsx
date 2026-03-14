"use client";

import { Network } from "lucide-react";

export default function GraphView({ triplets = [] }: { triplets: any[] }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col relative h-[450px] overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -mr-20 -mt-20 mr-0 z-0 pointer-events-none"></div>

      <div className="flex items-center justify-between p-6 pb-2 z-10">
        <div className="flex items-center gap-3">
          <Network className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-bold tracking-tight text-white">Knowledge Graph</h2>
        </div>
        <div className="flex gap-4">
            <span className="flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-widest font-semibold"><div className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Entities</span>
            <span className="flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-widest font-semibold"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Objects</span>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="space-y-4">
          {triplets.map((triplet, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 hover:border-orange-500/30 transition-colors">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-400 font-semibold text-sm">
                  {triplet.subject}
                </div>
                <div className="px-2 py-1 text-xs text-zinc-500 font-medium uppercase tracking-wider">
                  {triplet.relation}
                </div>
                <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 font-semibold text-sm">
                  {triplet.object}
                </div>
              </div>
            </div>
          ))}
          {triplets.length === 0 && (
            <div className="text-center text-zinc-500 py-12">
              No knowledge graph data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
