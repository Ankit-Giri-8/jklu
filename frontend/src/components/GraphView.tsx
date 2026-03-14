"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Network } from "lucide-react";

// @ts-ignore
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

export default function GraphView({ triplets = [] }: { triplets: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nodesMap = new Map();
  const links: any[] = [];

  // Always have a root node
  nodesMap.set("Claim", { id: "Claim", label: "Claim Root", group: 1 });

  triplets.forEach((t) => {
    const sId = t.subject;
    const oId = t.object;
    if (!nodesMap.has(sId)) nodesMap.set(sId, { id: sId, label: sId, group: 2 });
    if (!nodesMap.has(oId)) nodesMap.set(oId, { id: oId, label: oId, group: 3 });
    
    // Connect subject to root
    links.push({ source: "Claim", target: sId, label: 'contains' });
    // Connect subject to object
    links.push({ source: sId, target: oId, label: t.relation });
  });

  const graphData = {
    nodes: Array.from(nodesMap.values()),
    links,
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col relative h-[450px] overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -mr-20 -mt-20 mr-0 z-0 pointer-events-none"></div>
      
      <div className="flex items-center justify-between p-6 pb-2 z-10 pointer-events-none">
        <div className="flex items-center gap-3">
          <Network className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-bold tracking-tight text-white">Knowledge Graph</h2>
        </div>
        <div className="flex gap-4">
            <span className="flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-widest font-semibold"><div className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Entities</span>
            <span className="flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-widest font-semibold"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Objects</span>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 w-full h-full z-10 cursor-move">
        {typeof window !== "undefined" && dimensions.width > 0 && (
          <ForceGraph2D
            width={dimensions.width}
            height={dimensions.height}
            graphData={graphData}
            nodeLabel="label"
            nodeColor={(node: any) => node.id === 'Claim' ? '#ef4444' : node.group === 2 ? '#f97316' : '#3b82f6'}
            linkColor={() => "rgba(255,255,255,0.1)"}
            nodeRelSize={8}
            linkWidth={2}
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            backgroundColor="transparent"
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.3}
          />
        )}
      </div>
    </div>
  );
}
