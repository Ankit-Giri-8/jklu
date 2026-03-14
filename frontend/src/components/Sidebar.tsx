import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Network, Library, Search } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "New Analysis", icon: Search },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/graph", label: "Knowledge Graph", icon: Network },
    { href: "/sources", label: "Evidence & Sources", icon: Library },
  ];

  return (
    <div className="w-64 h-screen glass-panel border-r border-zinc-800 flex flex-col pt-8 pb-4 px-4 sticky top-0 shrink-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20 blur-[2px]"></div>
          <span className="text-white font-bold text-lg relative z-10">V</span>
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Veri<span className="text-orange-500">Flow</span>
        </h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 border border-transparent"
              }`}
            >
              <link.icon size={20} className={isActive ? "text-orange-400" : "text-zinc-500"} />
              <span className="font-medium text-sm">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-zinc-800 px-2">
        <p className="text-xs text-zinc-500 text-center">
          Hackathon Edition<br />
          Live AI Engine
        </p>
      </div>
    </div>
  );
}
