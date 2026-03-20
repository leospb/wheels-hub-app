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
          "flex max-w-fit fixed top-4 md:top-6 inset-x-0 mx-auto border border-black/10 dark:border-white/20 rounded-[2rem] dark:bg-slate-900/80 bg-white/80 backdrop-blur-md shadow-[0px_4px_24px_-10px_rgba(0,0,0,0.5)] z-[5000] pr-2 pl-6 py-2 items-center justify-center space-x-6",
          className
        )}
      >
        {logo && (
          <div className="flex items-center mr-4">{logo}</div>
        )}
        <div className="flex space-x-4">
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-slate-300 items-center flex space-x-1 text-slate-600 dark:hover:text-cyan-400 hover:text-cyan-600 transition-colors font-medium text-sm"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block">{navItem.name}</span>
            </Link>
          ))}
        </div>
        {actionButton && (
          <div className="pl-4 border-l border-slate-200 dark:border-slate-800">
            {actionButton}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
