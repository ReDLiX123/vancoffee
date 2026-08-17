"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Navigation, ExternalLink, Copy, Check, Clock, Phone } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { LOCATIONS } from "@/data/coffeeData";

export const RouteModal: React.FC = () => {
  const { isRouteModalOpen, closeRouteModal, selectedLocationId, setSelectedLocationId } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isRouteModalOpen) return null;

  const activeLoc = LOCATIONS.find((l) => l.id === selectedLocationId) || LOCATIONS[0];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(activeLoc.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeRouteModal}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#D49B45]/30 bg-[#16120F] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] sm:p-8"
        >
          {/* Header subtle glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-[#D49B45]/15 blur-3xl" />

          {/* Close button */}
          <button
            onClick={closeRouteModal}
            className="absolute right-5 top-5 rounded-full p-2 text-[#A89B8D] transition-colors hover:bg-white/5 hover:text-[#FAF7F2]"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative z-10">
            {/* Badge & Title */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D49B45]/30 bg-[#D49B45]/10 text-[#F3CA74]">
                <Navigation className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#D49B45]">
                Построить маршрут
              </span>
            </div>

            <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-[#FAF7F2]">
              {activeLoc.name}
            </h3>

            {/* Location Switcher */}
            <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1">
              {LOCATIONS.map((loc) => {
                const isSelected = loc.id === selectedLocationId;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocationId(loc.id as any)}
                    className={`whitespace-nowrap rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                      isSelected
                        ? "border-[#D49B45] bg-[#D49B45]/20 text-[#F3CA74]"
                        : "border-white/10 bg-[#1D1714] text-[#A89B8D] hover:border-white/20"
                    }`}
                  >
                    {loc.shortName}
                  </button>
                );
              })}
            </div>

            {/* Address & Meta */}
            <div className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-[#1D1714] p-4 text-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D49B45]" />
                  <div>
                    <p className="font-medium text-[#FAF7F2]">{activeLoc.address}</p>
                    <p className="text-xs text-[#A89B8D]">{activeLoc.landmark}</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="flex shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-[#A89B8D] transition-colors hover:text-white"
                  title="Скопировать адрес"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Копировать</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2.5 border-t border-white/5 pt-3 text-xs text-[#A89B8D]">
                <Clock className="h-4 w-4 text-[#D49B45]" />
                <span>
                  Будни: <strong className="text-white">{activeLoc.hours.weekdays}</strong> • Выходные:{" "}
                  <strong className="text-white">{activeLoc.hours.weekends}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2.5 border-t border-white/5 pt-3 text-xs text-[#A89B8D]">
                <Phone className="h-4 w-4 text-[#D49B45]" />
                <a href={`tel:${activeLoc.phone}`} className="text-white hover:underline">
                  {activeLoc.phone}
                </a>
              </div>
            </div>

            {/* Map Open Buttons */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={activeLoc.gis2Url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-[#2EB67D]/40 bg-[#2EB67D]/10 py-3 text-xs font-semibold text-[#82E7BA] transition-all hover:bg-[#2EB67D]/20 hover:scale-[1.02]"
              >
                <span>Открыть в 2ГИС</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href={activeLoc.yandexMapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-[#FC3F1D]/40 bg-[#FC3F1D]/10 py-3 text-xs font-semibold text-[#FF8566] transition-all hover:bg-[#FC3F1D]/20 hover:scale-[1.02]"
              >
                <span>Яндекс.Карты</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={closeRouteModal}
                className="text-xs text-[#A89B8D] hover:text-white"
              >
                Закрыть окно
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
