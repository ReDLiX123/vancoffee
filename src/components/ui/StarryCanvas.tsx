"use client";

import React, { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";

interface StarParticle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  angle: number;
  swirlRadius: number;
  colorIdx: number;
}

export const StarryCanvas: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { selectedLocationId } = useApp();

  const themePaletteRef = useRef<string[]>([
    "rgba(168, 75, 44, ",  // Terracotta
    "rgba(96, 108, 56, ",  // Olive
    "rgba(221, 161, 94, ", // Brass
    "rgba(198, 139, 89, ", // Warm gold
  ]);

  useEffect(() => {
    if (selectedLocationId === "kievskaya") {
      themePaletteRef.current = [
        "rgba(168, 75, 44, ",  // Terracotta
        "rgba(96, 108, 56, ",  // Olive
        "rgba(221, 161, 94, ", // Brass
        "rgba(198, 139, 89, ", // Copper
      ];
    } else if (selectedLocationId === "silver") {
      themePaletteRef.current = [
        "rgba(58, 90, 64, ",   // Forest Green
        "rgba(88, 129, 87, ",  // Sage
        "rgba(212, 163, 115, ",// Light wood
        "rgba(163, 177, 138, ",// Olive leaf
      ];
    } else if (selectedLocationId === "noviy") {
      themePaletteRef.current = [
        "rgba(245, 190, 80, ", // Garland Yellow
        "rgba(230, 126, 34, ", // Amber
        "rgba(255, 230, 150, ",// Light Bulb Glow
        "rgba(243, 156, 18, ", // Neon
      ];
    } else if (selectedLocationId === "madyar") {
      themePaletteRef.current = [
        "rgba(0, 229, 255, ",  // Cyan
        "rgba(255, 64, 129, ", // Pink
        "rgba(124, 77, 255, ", // Violet
        "rgba(100, 255, 218, ",// Aqua
      ];
    }
  }, [selectedLocationId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particleCount = Math.min(55, Math.floor(width / 24));
    const particles: StarParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.003 + 0.001,
        angle: Math.random() * Math.PI * 2,
        swirlRadius: Math.random() * 35 + 15,
        colorIdx: Math.floor(Math.random() * 4),
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const palette = themePaletteRef.current;

      // Dynamic ambient nebula glow
      const grad1 = ctx.createRadialGradient(
        width * 0.25 + Math.sin(time * 0.3) * 50,
        height * 0.35 + Math.cos(time * 0.2) * 40,
        10,
        width * 0.25,
        height * 0.35,
        width * 0.55
      );
      grad1.addColorStop(0, `${palette[0]}0.08)`);
      grad1.addColorStop(0.6, `${palette[1]}0.03)`);
      grad1.addColorStop(1, "transparent");

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.75 + Math.cos(time * 0.25) * 50,
        height * 0.65 + Math.sin(time * 0.3) * 40,
        10,
        width * 0.75,
        height * 0.65,
        width * 0.5
      );
      grad2.addColorStop(0, `${palette[2]}0.08)`);
      grad2.addColorStop(0.6, `${palette[3] || palette[0]}0.02)`);
      grad2.addColorStop(1, "transparent");

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render particles
      for (const p of particles) {
        p.angle += p.speed;
        const currentX = p.x + Math.cos(p.angle) * p.swirlRadius;
        const currentY = p.y + Math.sin(p.angle * 0.8) * (p.swirlRadius * 0.6);
        const currentAlpha = Math.max(0.1, Math.min(0.85, p.alpha + Math.sin(time * 2 + p.angle * 3) * 0.2));
        const colorPrefix = palette[p.colorIdx % palette.length];

        // Soft outer halo
        const halo = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          p.radius * 3.5
        );
        halo.addColorStop(0, `${colorPrefix}${currentAlpha * 0.7})`);
        halo.addColorStop(0.6, `${colorPrefix}${currentAlpha * 0.15})`);
        halo.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(currentX, currentY, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Core star
        ctx.beginPath();
        ctx.arc(currentX, currentY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${colorPrefix}${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700 ${className || ""}`}
    />
  );
};
