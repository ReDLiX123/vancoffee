"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export const SoundToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRefs = useRef<OscillatorNode[]>([]);

  const startAmbiance = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2); // Soft pleasant warm level
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft warm vinyl-like harmonic hum / coffeehouse chords (A major 432Hz ambient chord)
      const frequencies = [108, 162, 216, 324];
      const oscs: OscillatorNode[] = [];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Subtle LFO vibrato
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.15 + idx * 0.05;
        lfoGain.gain.value = 0.8;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        oscGain.gain.value = 0.25 / frequencies.length;
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        oscs.push(osc);
      });

      oscillatorRefs.current = oscs;
      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio Ambiance not allowed or failed:", e);
    }
  };

  const stopAmbiance = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
      setTimeout(() => {
        oscillatorRefs.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        oscillatorRefs.current = [];
        if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
          audioCtxRef.current.close();
        }
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 1100);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleAmbiance = () => {
    if (isPlaying) {
      stopAmbiance();
    } else {
      startAmbiance();
    }
  };

  useEffect(() => {
    return () => {
      stopAmbiance();
    };
  }, []);

  return (
    <button
      onClick={toggleAmbiance}
      aria-label={isPlaying ? "Выключить фоновую атмосферу" : "Включить атмосферу кофейни"}
      className="group relative flex items-center gap-2 rounded-full border border-[#D49B45]/20 bg-[#171310]/80 px-3 py-1.5 text-xs text-[#A89B8D] backdrop-blur-md transition-all hover:border-[#D49B45]/50 hover:text-[#FAF7F2]"
      title={isPlaying ? "Фоновая атмосфера включена" : "Включить тёплую атмосферу кофейни (432Hz ambient)"}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5">
            <span className="h-2 w-0.5 animate-pulse rounded-full bg-[#D49B45]" />
            <span className="h-3.5 w-0.5 animate-pulse rounded-full bg-[#F3CA74] [animation-delay:200ms]" />
            <span className="h-2.5 w-0.5 animate-pulse rounded-full bg-[#D49B45] [animation-delay:400ms]" />
          </div>
          <span className="hidden sm:inline text-[11px] text-[#F3CA74]">Атмосфера кофейни</span>
          <Volume2 className="h-3.5 w-3.5 text-[#F3CA74]" />
        </>
      ) : (
        <>
          <VolumeX className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
          <span className="hidden sm:inline text-[11px]">Звук атмосферы</span>
        </>
      )}
    </button>
  );
};
