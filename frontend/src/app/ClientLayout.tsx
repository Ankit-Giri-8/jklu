"use client";

import { AnalysisProvider } from "@/context/AnalysisContext";
import Sidebar from "@/components/Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-900/10 via-black to-black pointer-events-none"></div>
      
      <AnalysisProvider>
        <div className="flex relative z-10 w-full min-h-screen max-w-[1600px] mx-auto">
          {/* Sidebar matches all pages */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 overflow-x-hidden min-h-screen bg-black">
            {children}
          </main>
        </div>
      </AnalysisProvider>
    </>
  );
}
