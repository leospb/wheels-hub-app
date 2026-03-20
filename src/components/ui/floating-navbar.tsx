"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
  actionButton,
  logo,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  actionButton?: React.ReactNode;
  logo?: React.ReactNode;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // ALWAYS show at top
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex w-full md:w-[calc(100%-2rem)] max-w-screen-2xl fixed top-0 md:top-4 inset-x-0 mx-auto border-b md:border border-black/10 dark:border-white/20 md:rounded-2xl dark:bg-slate-900/80 bg-white/80 backdrop-blur-md shadow-sm md:shadow-[0px_4px_24px_-10px_rgba(0,0,0,0.5)] z-[5000] px-4 md:px-6 py-2.5 items-center justify-between",
          className
        )}
      >
        {logo && (
          <div className="flex items-center shrink-0 mr-2 md:mr-8">{logo}</div>
        )}
        <div className="flex flex-1 items-center justify-center space-x-1 md:space-x-3 overflow-x-auto no-scrollbar">
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium text-[13px] md:text-sm whitespace-nowrap"
              )}
            >
              <span className="block">{navItem.icon}</span>
              <span className="hidden sm:block">{navItem.name}</span>
            </Link>
          ))}
        </div>
        {actionButton && (
          <div className="flex items-center pl-2 md:pl-6 shrink-0 md:border-l border-slate-200 dark:border-slate-800 ml-auto">
            {actionButton}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
