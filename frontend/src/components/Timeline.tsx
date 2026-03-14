"use client";

import { Activity } from "lucide-react";

export default function Timeline({ events = [] }: { events: any[] }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col relative h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-10 -mt-10 mr-0"></div>
      
      <div className="flex items-center gap-3 mb-6 z-10">
         <Activity className="w-5 h-5 text-orange-500" />
         <h2 className="text-lg font-bold tracking-tight text-white">Narrative Timeline</h2>
      </div>

      <div className="relative pl-4 border-l border-zinc-800 space-y-8 flex-1 z-10 py-4">
        {events.map((event, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-orange-500 ring-4 ring-zinc-900 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
            <div className="mb-1 text-xs font-bold uppercase tracking-widest text-orange-500/80">
              {event.time}
            </div>
            <div className="text-zinc-300 text-sm leading-relaxed">
              {event.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
