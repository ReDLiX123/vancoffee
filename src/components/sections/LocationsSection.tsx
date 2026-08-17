"use client";

import React from "react";
import { LOCATIONS } from "@/data/coffeeData";
import { useApp } from "@/context/AppContext";
import { TiltCard } from "@/components/ui/TiltCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { getAssetPath } from "@/lib/utils";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Heart,
  ExternalLink,
  Sparkles,
  Coffee,
  Palette,
} from "lucide-react";

export const LocationsSection: React.FC = () => {
  const { selectedLocationId, setSelectedLocationId, openTipsModal, openRouteModal, language } = useApp();

  const activeLoc = LOCATIONS.find((l) => l.id === selectedLocationId) || LOCATIONS[0];

  const handleSelectLocation = (id: string) => {
    setSelectedLocationId(id as any);
  };

  const sectionHeadings = {
    ru: {
      tag: "Пространства в Иркутске",
      title: "4 точки. 4 уникальных характера",
      desc: "Каждая кофейня Vincent Van Coffee обладает своей архитектурной эстетикой и палитрой. Выберите локацию, чтобы применить её визуальную тему к сайту.",
      statusOpen: "Открыто сейчас",
      btnRoute: "Маршрут",
      btnTips: "Чаевые",
      btn2gis: "2ГИС",
      btnYandex: "Яндекс.Карты",
      popular: "Фирменный напиток локации:",
      paletteLabel: "Палитра интерьера:",
    },
    en: {
      tag: "Spaces in Irkutsk",
      title: "4 Locations. 4 Unique Aesthetics",
      desc: "Each Vincent Van Coffee location boasts its own interior soul and palette. Click a spot to apply its dynamic visual theme across the site.",
      statusOpen: "Open Now",
      btnRoute: "Get Directions",
      btnTips: "Tip Barista",
      btn2gis: "2GIS",
      btnYandex: "Yandex Maps",
      popular: "Signature Location Drink:",
      paletteLabel: "Interior Palette:",
    },
    zh: {
      tag: "伊尔库茨克空间",
      title: "4 家门店 • 4 种独特空间美学",
      desc: "每家凡高咖啡门店均拥有独特的建筑灵感与调色盘。点击选择任意门店，即可将整站实时切换为该店专属视觉主题。",
      statusOpen: "正在营业",
      btnRoute: "路线导航",
      btnTips: "打赏咖啡师",
      btn2gis: "2GIS 地图",
      btnYandex: "Yandex 地图",
      popular: "本店特色招牌推荐：",
      paletteLabel: "空间配色：",
    },
  };

  const t = sectionHeadings[language];

  return (
    <section id="locations" className="relative py-24 canvas-texture transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div
            style={{
              backgroundColor: "var(--theme-badge-bg)",
              color: "var(--theme-primary)",
              borderColor: "var(--theme-surface-border)",
            }}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-wider"
          >
            <Palette className="h-3.5 w-3.5" />
            <span>{t.tag}</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            {t.title}
          </h2>
          <p style={{ color: "var(--theme-muted)" }} className="mt-4 text-base sm:text-lg">
            {t.desc}
          </p>
        </div>

        {/* Location selector tabs with style names */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {LOCATIONS.map((loc) => {
            const isActive = loc.id === selectedLocationId;
            return (
              <button
                key={loc.id}
                onClick={() => handleSelectLocation(loc.id)}
                style={{
                  backgroundColor: isActive ? "var(--theme-surface-elevated)" : "var(--theme-surface)",
                  borderColor: isActive ? loc.theme.primaryColor : "var(--theme-surface-border)",
                  color: isActive ? "var(--theme-text)" : "var(--theme-muted)",
                }}
                className={`relative rounded-2xl px-5 py-3.5 text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  isActive ? "shadow-lg scale-105" : "hover:opacity-100 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    style={{ backgroundColor: loc.theme.primaryColor }}
                    className={`h-2.5 w-2.5 rounded-full ring-2 ring-white/30 ${isActive ? "scale-125" : ""}`}
                  />
                  <span>{loc.shortName}</span>
                  <span className="text-[10px] opacity-60 font-normal hidden md:inline">
                    ({loc.theme.styleName.split("&")[0]})
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Showcase Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left: 3D Photo Showcase Card with clean glassmorphic info panel */}
          <div className="lg:col-span-7 flex flex-col">
            <TiltCard className="h-full min-h-[520px] sm:min-h-[580px] p-0 flex flex-col justify-between relative group overflow-hidden shadow-2xl rounded-3xl border border-black/10 dark:border-white/10">
              {/* Photo layer */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-stone-900">
                <img
                  key={activeLoc.id}
                  src={getAssetPath(activeLoc.image)}
                  alt={activeLoc.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Multi-stage dark gradient scrim to ensure absolute text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
              </div>

              {/* Top Bar with Status and Theme Badges */}
              <div className="relative z-10 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-black/70 px-3.5 py-1.5 backdrop-blur-md shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-300">{t.statusOpen}</span>
                </div>

                <div
                  style={{
                    borderColor: activeLoc.theme.primaryColor,
                  }}
                  className="flex items-center gap-2 rounded-full border bg-black/70 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-sm"
                >
                  <span
                    style={{ backgroundColor: activeLoc.theme.primaryColor }}
                    className="h-2 w-2 rounded-full ring-2 ring-white/30"
                  />
                  <span>{activeLoc.theme.styleName}</span>
                </div>
              </div>

              {/* Bottom Content Card - Clean Glass Overlay with High Contrast */}
              <div className="relative z-10 p-5 sm:p-6">
                <div className="rounded-2xl border border-white/15 bg-black/75 p-5 sm:p-6 backdrop-blur-xl shadow-2xl text-white space-y-3">
                  {/* Landmark Header */}
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                    <Sparkles className="h-4 w-4 shrink-0 text-amber-400" />
                    <span className="truncate">{activeLoc.landmark}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {activeLoc.name}
                  </h3>

                  {/* Atmosphere Description */}
                  <p className="text-xs sm:text-sm leading-relaxed text-stone-200">
                    {activeLoc.atmosphere}
                  </p>

                  {/* Interior Palette preview */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-stone-300">
                    <span className="font-bold text-amber-300 text-xs">{t.paletteLabel}</span>
                    <span className="text-xs text-stone-200">{activeLoc.theme.paletteDescription}</span>
                  </div>

                  {/* Popular Drink Pill */}
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-amber-300">
                      <Coffee className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-stone-300">{t.popular}</div>
                      <div className="text-xs font-bold text-white truncate">{activeLoc.popularDrink}</div>
                    </div>
                  </div>
                </div>
              </div>

              <BorderBeam
                size={280}
                duration={12}
                colorFrom={activeLoc.theme.primaryColor}
                colorTo={activeLoc.theme.accentColor}
              />
            </TiltCard>
          </div>

          {/* Right: Info Card & Actions */}
          <div
            style={{
              backgroundColor: "var(--theme-surface)",
              borderColor: "var(--theme-surface-border)",
            }}
            className="lg:col-span-5 flex flex-col justify-between rounded-3xl border p-6 sm:p-8 shadow-xl backdrop-blur-xl transition-all duration-500"
          >
            <div className="space-y-6">
              {/* Address */}
              <div>
                <span
                  style={{ color: "var(--theme-primary)" }}
                  className="text-[11px] font-bold uppercase tracking-wider"
                >
                  Точный адрес
                </span>
                <div className="mt-2 flex items-start gap-3">
                  <MapPin style={{ color: "var(--theme-primary)" }} className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-base">{activeLoc.address}</p>
                    <p style={{ color: "var(--theme-muted)" }} className="text-xs mt-0.5">{activeLoc.landmark}</p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="border-t border-black/5 dark:border-white/5 pt-5">
                <span
                  style={{ color: "var(--theme-primary)" }}
                  className="text-[11px] font-bold uppercase tracking-wider"
                >
                  Режим работы
                </span>
                <div className="mt-2 flex items-start gap-3">
                  <Clock style={{ color: "var(--theme-primary)" }} className="h-5 w-5 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm space-y-1 w-full">
                    <div className="flex justify-between gap-4">
                      <span style={{ color: "var(--theme-muted)" }}>Будние дни:</span>
                      <span className="font-semibold">{activeLoc.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span style={{ color: "var(--theme-muted)" }}>Выходные:</span>
                      <span className="font-semibold">{activeLoc.hours.weekends}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="border-t border-black/5 dark:border-white/5 pt-5">
                <span
                  style={{ color: "var(--theme-primary)" }}
                  className="text-[11px] font-bold uppercase tracking-wider"
                >
                  Телефон локации
                </span>
                <div className="mt-2 flex items-center gap-3">
                  <Phone style={{ color: "var(--theme-primary)" }} className="h-5 w-5" />
                  <a
                    href={`tel:${activeLoc.phone}`}
                    className="font-bold text-sm sm:text-base hover:underline"
                  >
                    {activeLoc.phone}
                  </a>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="border-t border-black/5 dark:border-white/5 pt-5">
                <span style={{ color: "var(--theme-muted)" }} className="text-[11px] font-bold uppercase tracking-wider">
                  Особенности пространства
                </span>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activeLoc.features.map((feature, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: "var(--theme-surface-elevated)",
                        borderColor: "var(--theme-surface-border)",
                      }}
                      className="rounded-lg border px-3 py-1 text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3 pt-6 border-t border-black/5 dark:border-white/5">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={activeLoc.gis2Url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#2EB67D]/40 bg-[#2EB67D]/10 py-3 text-xs font-bold text-[#2EB67D] transition-all hover:bg-[#2EB67D]/20 hover:scale-[1.02]"
                >
                  <span>{t.btn2gis}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <a
                  href={activeLoc.yandexMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#FC3F1D]/40 bg-[#FC3F1D]/10 py-3 text-xs font-bold text-[#FC3F1D] transition-all hover:bg-[#FC3F1D]/20 hover:scale-[1.02]"
                >
                  <span>{t.btnYandex}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => openRouteModal(activeLoc.id as any)}
                  style={{
                    backgroundColor: "var(--theme-surface-elevated)",
                    borderColor: "var(--theme-surface-border)",
                    color: "var(--theme-text)",
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border py-3 text-xs font-semibold transition-colors hover:shadow-sm"
                >
                  <Navigation style={{ color: "var(--theme-primary)" }} className="h-3.5 w-3.5" />
                  <span>{t.btnRoute}</span>
                </button>

                <button
                  onClick={() => openTipsModal(activeLoc.id as any)}
                  style={{
                    backgroundColor: "var(--theme-primary)",
                    color: "#FFFFFF",
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-transform hover:scale-[1.02] shadow-md"
                >
                  <Heart className="h-3.5 w-3.5 fill-current" />
                  <span>{t.btnTips}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
