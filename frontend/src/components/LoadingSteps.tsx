"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function LoadingSteps() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { name: "Initializing Temporal Search...", detail: "[OK] Synchronizing clock cycles" },
    { name: "Fetching trusted news sources...", detail: "[OK] 1,248 nodes connected" },
    { name: "Running linguistic analysis...", detail: "[RUNNING] Processing semantic clusters" },
    { name: "Extracting knowledge graph...", detail: "Awaiting semantic completion" },
    { name: "Comparing facts & generating verdict...", detail: "Awaiting logic validation" },
  ];

  useEffect(() => {
    // Automatically progress through steps for the "theatre" effect
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="bg-zinc-50 border border-zinc-200 p-8 rounded-xl shadow-2xl relative overflow-hidden dark:bg-zinc-950 dark:border-zinc-800">
      
      {/* Top OS Bar */}
      <div className="flex items-center gap-2 mb-6">
        <Terminal className="w-5 h-5 text-orange-500" />
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 uppercase">Theatre of Work</h2>
        <div className="ml-auto flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
      </div>

      <div className="text-orange-600 dark:text-orange-500 font-mono text-2xl font-bold mb-2">
        {'>_'} SYSTEM_INITIALIZATION
      </div>
      <div className="text-zinc-500 dark:text-zinc-400 font-mono text-xs uppercase tracking-widest mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        KERNEL: V8.4.2-STABLE | SOURCE: NEURAL_LINK_01
      </div>

      <div className="space-y-4 font-mono text-sm relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 z-0"></div>
        
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div key={index} className={`relative z-10 p-4 rounded-lg flex items-center justify-between transition-all duration-500 ${
              isCompleted ? "bg-orange-500/10 text-orange-800 dark:text-orange-200" :
              isCurrent ? "bg-orange-500/5 text-orange-600 dark:text-orange-400 border border-orange-500/20" :
              "text-zinc-400 dark:text-zinc-600 opacity-50"
            }`}>
              <div className="flex items-center gap-4">
                <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 ${isCompleted ? 'text-orange-500' : isCurrent ? 'text-orange-500' : 'text-zinc-300 dark:text-zinc-700'}`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : 
                   isCurrent ? <Loader2 className="w-5 h-5 animate-spin" /> : 
                   <div className="w-2 h-2 rounded-full bg-current"></div>}
                </div>
                <div>
                  <div className="font-bold">{step.name}</div>
                  <div className="text-xs mt-1 opacity-70">{step.detail}</div>
                </div>
              </div>

              {isCompleted && (
                 <span className="text-[10px] bg-orange-500/20 text-orange-700 dark:text-orange-300 px-2 py-1 rounded font-bold uppercase tracking-wider">Completed</span>
              )}

              {isCurrent && (
                <div className="flex items-center gap-2 opacity-50">
                  <motion.div initial={{ width: "0%" }} animate={{ width: "73%" }} transition={{ duration: 0.8 }} className="h-2 w-24 bg-orange-500 rounded-full"></motion.div>
                  <span className="text-[10px] font-bold">73%</span>
                </div>
              )}
              {isPending && (
                 <span className="text-[10px] px-2 py-1 uppercase tracking-wider opacity-50">Queued</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Mock terminal logs running at bottom */}
      <div className="mt-8 font-mono text-[10px] text-zinc-400 dark:text-zinc-600 space-y-1">
        <div>[0.0001] Bootstrapping secure sandbox...</div>
        <div>[0.0042] Encrypted tunnel established via port 8080</div>
        {currentStep > 0 && <div>[0.1293] Heuristic engine online: 12.4 TFLOPs available</div>}
        {currentStep > 1 && <div>[0.4502] Scanning global workforce patterns...</div>}
        {currentStep > 2 && <div>[0.8921] Current task: Analyze_Market_Sentiment_v3 <span className="animate-pulse bg-orange-500 w-2 h-3 inline-block align-middle ml-1"></span></div>}
      </div>
      
    </div>
  );
}
