"use client";

import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "#F3CA74",
      shimmerSize = "0.08em",
      shimmerDuration = "3s",
      borderRadius = "12px",
      background = "linear-gradient(180deg, #2B211A 0%, #17120F 100%)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-[#D49B45]/30 px-6 py-3.5 text-[#FAF7F2] font-medium tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.4)] [background:var(--bg)] [border-radius:var(--radius)]",
          "transform-gpu transition-all duration-300 ease-out hover:border-[#D49B45]/70 hover:shadow-[0_0_25px_rgba(212,155,69,0.25)] active:scale-[0.98]",
          className
        )}
        ref={ref}
        {...props}
      >
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "absolute inset-0 overflow-visible [container-type:size]"
          )}
        >
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>
        {children}
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
