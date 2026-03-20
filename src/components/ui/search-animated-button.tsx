import { Button } from "@/components/ui/button";
import { ChevronRight, Search } from "lucide-react";
import React from "react";

export function SearchAnimatedButton({ onClick, className }: { onClick?: () => void, className?: string }) {
  return (
    <Button 
      className={`group relative overflow-hidden bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 ${className}`} 
      size="lg"
      onClick={onClick}
    >
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0 font-bold uppercase tracking-wider text-xs">
        ПОИСК
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-white/20 dark:bg-black/10 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-white dark:text-slate-900">
        <Search size={16} strokeWidth={3} aria-hidden="true" className="group-hover:hidden" />
        <ChevronRight size={18} strokeWidth={3} aria-hidden="true" className="hidden group-hover:block" />
      </i>
    </Button>
  );
}
