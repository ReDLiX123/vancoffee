"use client";

import React, { useEffect, useRef } from "react";

interface StarParticle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  angle: number;
  swirlRadius: number;
  color: string;
  twinkleSpeed: number;
}

export const StarryCanvas: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const colors = [
      "rgba(243, 202, 116, ", // Warm gold
      "rgba(212, 155, 69, ",  // Ochre
      "rgba(255, 230, 180, ", // Pale star
      "rgba(140, 185, 245, ", // Starry night blue
      "rgba(186, 120, 50, ",  // Amber
    ];

    const particleCount = Math.min(65, Math.floor(width / 20));
    const particles: StarParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.003 + 0.001,
        angle: Math.random() * Math.PI * 2,
        swirlRadius: Math.random() * 40 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Subtle dynamic nebula gradients
      const grad1 = ctx.createRadialGradient(
        width * 0.2 + Math.sin(time * 0.3) * 60,
        height * 0.3 + Math.cos(time * 0.2) * 50,
        10,
        width * 0.2,
        height * 0.3,
        width * 0.6
      );
      grad1.addColorStop(0, "rgba(212, 155, 69, 0.07)");
      grad1.addColorStop(0.5, "rgba(14, 27, 42, 0.04)");
      grad1.addColorStop(1, "transparent");

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8 + Math.cos(time * 0.25) * 60,
        height * 0.6 + Math.sin(time * 0.3) * 40,
        10,
        width * 0.8,
        height * 0.6,
        width * 0.5
      );
      grad2.addColorStop(0, "rgba(24, 44, 68, 0.08)");
      grad2.addColorStop(0.6, "rgba(212, 155, 69, 0.03)");
      grad2.addColorStop(1, "transparent");

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render gentle swirling particles
      for (const p of particles) {
        p.angle += p.speed;
        const currentX = p.x + Math.cos(p.angle) * p.swirlRadius;
        const currentY = p.y + Math.sin(p.angle * 0.8) * (p.swirlRadius * 0.6);
        const currentAlpha = Math.max(0.1, Math.min(0.9, p.alpha + Math.sin(time * 2 + p.angle * 4) * 0.25));

        // Soft outer halo
        const halo = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          p.radius * 3.5
        );
        halo.addColorStop(0, `${p.color}${currentAlpha * 0.8})`);
        halo.addColorStop(0.5, `${p.color}${currentAlpha * 0.2})`);
        halo.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(currentX, currentY, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Core bright star
        ctx.beginPath();
        ctx.arc(currentX, currentY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
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
      className={`pointer-events-none absolute inset-0 h-full w-full ${className || ""}`}
    />
  );
};
