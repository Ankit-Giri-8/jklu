"use client";

import { AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustGauge({ verdict = "Unknown", confidence = 0 }: { verdict: string, confidence: number }) {
  
  let colorClass = "from-yellow-500 to-yellow-600 text-yellow-500 bg-yellow-500/10 border-yellow-500/30";
  let bgGradient = "from-yellow-500";
  let Icon = HelpCircle;
  let text = "UNCERTAIN";

  if (verdict?.toUpperCase() === "VERIFIED" || verdict?.toUpperCase() === "TRUE") {
    colorClass = "from-green-500 to-green-600 text-green-500 bg-green-500/10 border-green-500/30";
    bgGradient = "from-green-500";
    Icon = CheckCircle;
    text = "VERIFIED";
  } else if (verdict?.toUpperCase() === "FAKE" || verdict?.toUpperCase() === "FALSE") {
    colorClass = "from-red-500 to-red-600 text-red-500 bg-red-500/10 border-red-500/30";
    bgGradient = "from-red-500";
    Icon = AlertTriangle;
    text = "FAKE";
  } else if (verdict?.toUpperCase() === "MISLEADING") {
    colorClass = "from-orange-500 to-orange-600 text-orange-500 bg-orange-500/10 border-orange-500/30";
    bgGradient = "from-orange-500";
    Icon = AlertTriangle;
    text = "MISLEADING";
  }

  return (
    <div className={`relative overflow-hidden p-8 rounded-2xl border ${colorClass.split(" ")[3]} bg-zinc-950/60 backdrop-blur-xl shadow-2xl`}>
      {/* Background Glow */}
      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${bgGradient} to-transparent opacity-10 rounded-full blur-3xl -mr-20 -mt-20`}></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        <div className="flex items-center gap-6">
          <div className={`p-4 rounded-xl ${colorClass.split(" ")[2]}`}>
            <Icon className="w-12 h-12" />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-zinc-400 mb-1">Final Verdict</h2>
            <h1 className={`text-5xl font-black tracking-tighter ${colorClass.split(" ")[0]} bg-clip-text text-transparent`}>
              {text}
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end w-full md:w-auto mt-4 md:mt-0">
          <span className="text-sm font-medium text-zinc-400 mb-2 tracking-wide uppercase">Confidence Score</span>
          <div className="flex items-center gap-4 w-full md:w-64">
            <div className="flex-1 h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${colorClass.split(" ")[0]} ${colorClass.split(" ")[1]}`}
              />
            </div>
            <span className={`text-xl font-bold ${colorClass.split(" ")[1].replace('to-', 'text-')}`}>
              {confidence}%
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
