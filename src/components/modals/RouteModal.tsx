"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Navigation, ExternalLink, Copy, Check, Clock, Phone } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { LOCATIONS } from "@/data/coffeeData";

export const RouteModal: React.FC = () => {
  const { isRouteModalOpen, closeRouteModal, selectedLocationId, setSelectedLocationId, language } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isRouteModalOpen) return null;

  const activeLoc = LOCATIONS.find((l) => l.id === selectedLocationId) || LOCATIONS[0];
  const activeLocName = activeLoc.nameI18n?.[language] || activeLoc.name;
  const activeLocAddress = activeLoc.addressI18n?.[language] || activeLoc.address;
  const activeLocLandmark = activeLoc.landmarkI18n?.[language] || activeLoc.landmark;

  const t = {
    ru: {
      tag: "Построить маршрут",
      copyBtn: "Копировать",
      copiedBtn: "Скопировано",
      weekdays: "Будни:",
      weekends: "Выходные:",
      open2gis: "Открыть в 2ГИС",
      openYandex: "Яндекс.Карты",
      closeBtn: "Закрыть окно",
    },
    en: {
      tag: "Get Directions",
      copyBtn: "Copy",
      copiedBtn: "Copied",
      weekdays: "Weekdays:",
      weekends: "Weekends:",
      open2gis: "Open in 2GIS",
      openYandex: "Yandex Maps",
      closeBtn: "Close Window",
    },
    zh: {
      tag: "路线规划导航",
      copyBtn: "复制",
      copiedBtn: "已复制",
      weekdays: "工作日：",
      weekends: "周末：",
      open2gis: "在 2GIS 中打开",
      openYandex: "Yandex 地图",
      closeBtn: "关闭窗口",
    },
  }[language];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(activeLocAddress);
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
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-surface-border)",
            color: "var(--theme-text)",
          }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border p-6 shadow-2xl sm:p-8 z-10"
        >
          {/* Close button */}
          <button
            onClick={closeRouteModal}
            className="absolute right-5 top-5 rounded-full p-2 opacity-60 transition-opacity hover:opacity-100"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative z-10">
            {/* Badge & Title */}
            <div className="flex items-center gap-2">
              <div
                style={{
                  backgroundColor: "var(--theme-badge-bg)",
                  color: "var(--theme-primary)",
                }}
                className="flex h-9 w-9 items-center justify-center rounded-xl"
              >
                <Navigation className="h-5 w-5" />
              </div>
              <span style={{ color: "var(--theme-primary)" }} className="text-xs font-bold tracking-wider uppercase">
                {t.tag}
              </span>
            </div>

            <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-bold">
              {activeLocName}
            </h3>

            {/* Location Switcher */}
            <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1">
              {LOCATIONS.map((loc) => {
                const isSelected = loc.id === selectedLocationId;
                const locShort = loc.shortNameI18n?.[language] || loc.shortName;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocationId(loc.id as any)}
                    style={{
                      backgroundColor: isSelected ? "var(--theme-surface-elevated)" : "transparent",
                      borderColor: isSelected ? loc.theme.primaryColor : "var(--theme-surface-border)",
                      color: isSelected ? "var(--theme-primary)" : "var(--theme-muted)",
                    }}
                    className="whitespace-nowrap rounded-xl border px-3 py-1.5 text-xs font-bold transition-all"
                  >
                    {locShort}
                  </button>
                );
              })}
            </div>

            {/* Address & Meta */}
            <div
              style={{
                backgroundColor: "var(--theme-surface-elevated)",
                borderColor: "var(--theme-surface-border)",
              }}
              className="mt-5 space-y-3 rounded-2xl border p-4 text-sm shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <MapPin style={{ color: "var(--theme-primary)" }} className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-bold">{activeLocAddress}</p>
                    <p style={{ color: "var(--theme-muted)" }} className="text-xs">{activeLocLandmark}</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyAddress}
                  style={{
                    backgroundColor: "var(--theme-surface)",
                    borderColor: "var(--theme-surface-border)",
                  }}
                  className="flex shrink-0 items-center gap-1 rounded-lg border px-2.5 py-1 text-xs transition-colors hover:shadow-xs"
                  title={t.copyBtn}
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      <span className="text-emerald-500 font-bold">{t.copiedBtn}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>{t.copyBtn}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2.5 border-t border-black/5 dark:border-white/5 pt-3 text-xs">
                <Clock style={{ color: "var(--theme-primary)" }} className="h-4 w-4" />
                <span>
                  {t.weekdays} <strong>{activeLoc.hours.weekdays}</strong> • {t.weekends}{" "}
                  <strong>{activeLoc.hours.weekends}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2.5 border-t border-black/5 dark:border-white/5 pt-3 text-xs">
                <Phone style={{ color: "var(--theme-primary)" }} className="h-4 w-4" />
                <a href={`tel:${activeLoc.phone}`} className="font-bold hover:underline">
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
                className="flex items-center justify-center gap-2 rounded-xl border border-[#2EB67D]/40 bg-[#2EB67D]/10 py-3 text-xs font-bold text-[#2EB67D] transition-all hover:bg-[#2EB67D]/20 hover:scale-[1.02]"
              >
                <span>{t.open2gis}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href={activeLoc.yandexMapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-[#FC3F1D]/40 bg-[#FC3F1D]/10 py-3 text-xs font-bold text-[#FC3F1D] transition-all hover:bg-[#FC3F1D]/20 hover:scale-[1.02]"
              >
                <span>{t.openYandex}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={closeRouteModal}
                style={{ color: "var(--theme-muted)" }}
                className="text-xs hover:underline"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
