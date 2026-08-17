"use client";

import React from "react";
import { motion } from "framer-motion";
import { StarryCanvas } from "@/components/ui/StarryCanvas";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { useApp } from "@/context/AppContext";
import { LOCATIONS } from "@/data/coffeeData";
import { Sparkles, MapPin, Coffee, ArrowRight, Heart, Award, Compass, Palette } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { language, selectedLocationId, setSelectedLocationId, selectedLocation, openTipsModal } = useApp();

  const titles = {
    ru: {
      tag: "Сеть кофеен в Иркутске",
      titleMain: "Искусство в каждой чашке",
      titleSub: "Спешелти кофе, вдохновленный живописью",
      desc: "Четыре особенных пространства в сердце Иркутска. Чистый вкус свежей обжарки, авторские рафы, ремесленная выпечка и индивидуальный характер каждой локации.",
      menuBtn: "Исследовать меню",
      mapBtn: "Стили & Локации",
      tipsBtn: "Чаевые бариста",
      stat1: "100% Арабика",
      stat1Sub: "Микролоты свежей обжарки",
      stat2: "4 Локации",
      stat2Sub: "4 уникальных стиля интерьера",
      stat3: "Авторская карта",
      stat3Sub: "Напитки с душой художника",
    },
    en: {
      tag: "Specialty Coffee Chain in Irkutsk",
      titleMain: "Art in Every Single Cup",
      titleSub: "Specialty Coffee Inspired by Painting",
      desc: "Four distinctive coffee spaces in the heart of Irkutsk. Fresh roast clarity, signature botanical rafs, artisanal bakeries, and unique interior aesthetics.",
      menuBtn: "Explore Menu",
      mapBtn: "Spaces & Styles",
      tipsBtn: "Tip the Barista",
      stat1: "100% Arabica",
      stat1Sub: "Single-origin micro-lots",
      stat2: "4 Locations",
      stat2Sub: "4 distinct interior aesthetics",
      stat3: "Signature Menu",
      stat3Sub: "Crafted with painter's soul",
    },
    zh: {
      tag: "伊尔库茨克精品艺术咖啡连锁",
      titleMain: "每一杯皆是艺术",
      titleSub: "以绘画为灵感的精品咖啡空间",
      desc: "坐落于伊尔库茨克核心区域的四家特色门店。新鲜自烘豆单、招牌特调咖啡、手作烘焙与各具特色的空间美学。",
      menuBtn: "浏览精选菜单",
      mapBtn: "门店空间与风格",
      tipsBtn: "打赏咖啡师",
      stat1: "100% 精品豆",
      stat1Sub: "原产地微批次新鲜现烘",
      stat2: "4 家门店",
      stat2Sub: "4 种独特空间设计美学",
      stat3: "独家特调",
      stat3Sub: "融合画家灵魂与风味",
    },
  };

  const t = titles[language];

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 transition-colors duration-500">
      {/* Dynamic Starry Canvas matching theme palette */}
      <StarryCanvas />

      {/* Atmospheric dynamic glow */}
      <div
        style={{ backgroundColor: "var(--theme-glow)" }}
        className="pointer-events-none absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] transition-all duration-700"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-surface-border)",
            color: "var(--theme-text)",
          }}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur-md shadow-sm"
        >
          <span
            style={{ backgroundColor: "var(--theme-primary)" }}
            className="flex h-2 w-2 rounded-full animate-ping"
          />
          <span className="text-xs font-bold tracking-wider uppercase">
            {t.tag}
          </span>
          <span className="opacity-40">•</span>
          <span
            style={{ color: "var(--theme-primary)" }}
            className="text-xs font-semibold"
          >
            Тема: {selectedLocation.theme.styleName}
          </span>
        </motion.div>

        {/* Editorial Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 space-y-2"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08]">
            <span className="block">{t.titleMain}</span>
            <span
              style={{ color: "var(--theme-primary)" }}
              className="block italic font-medium mt-1 transition-colors duration-500"
            >
              {t.titleSub}
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ color: "var(--theme-muted)" }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed transition-colors duration-500"
        >
          {t.desc}
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#menu">
            <ShimmerButton className="px-7 py-4 text-sm font-semibold tracking-wide shadow-lg">
              <div className="flex items-center gap-2.5">
                <Coffee className="h-4 w-4 text-white" />
                <span>{t.menuBtn}</span>
                <ArrowRight className="h-4 w-4 text-white/80" />
              </div>
            </ShimmerButton>
          </a>

          <a
            href="#locations"
            style={{
              backgroundColor: "var(--theme-surface)",
              borderColor: "var(--theme-surface-border)",
              color: "var(--theme-text)",
            }}
            className="flex items-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold backdrop-blur-md transition-all hover:scale-[1.02] shadow-sm"
          >
            <MapPin style={{ color: "var(--theme-primary)" }} className="h-4 w-4" />
            <span>{t.mapBtn}</span>
          </a>

          <button
            onClick={() => openTipsModal()}
            style={{
              backgroundColor: "var(--theme-badge-bg)",
              borderColor: "var(--theme-surface-border)",
              color: "var(--theme-primary)",
            }}
            className="flex items-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-semibold backdrop-blur-md transition-all hover:scale-[1.02]"
          >
            <Heart className="h-4 w-4 fill-current" />
            <span>{t.tipsBtn}</span>
          </button>
        </motion.div>

        {/* Quick Location & Style Switcher Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-surface-border)",
          }}
          className="mt-12 mx-auto max-w-3xl rounded-2xl border p-3 shadow-lg backdrop-blur-xl transition-all duration-500"
        >
          <div
            style={{ color: "var(--theme-muted)" }}
            className="mb-2 flex items-center justify-between px-3 text-[11px] font-bold tracking-wider uppercase"
          >
            <span className="flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5 text-[var(--theme-primary)]" />
              Выберите точку и стиль атмосферы:
            </span>
            <span className="text-[var(--theme-primary)] font-semibold">Иркутск (4 локации)</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {LOCATIONS.map((loc) => {
              const isSelected = loc.id === selectedLocationId;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocationId(loc.id as any)}
                  style={{
                    backgroundColor: isSelected ? "var(--theme-badge-bg)" : "var(--theme-surface-elevated)",
                    borderColor: isSelected ? loc.theme.primaryColor : "transparent",
                    color: isSelected ? "var(--theme-text)" : "var(--theme-muted)",
                  }}
                  className={`relative flex flex-col items-start rounded-xl p-2.5 text-left text-xs transition-all border ${
                    isSelected ? "shadow-md scale-[1.02] font-bold" : "hover:opacity-100"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-xs">{loc.shortName}</span>
                    <span
                      style={{ backgroundColor: loc.theme.primaryColor }}
                      className="h-2 w-2 rounded-full ring-2 ring-white/20"
                    />
                  </div>
                  <span className="mt-0.5 text-[10px] opacity-80 truncate w-full">
                    {loc.theme.styleName.split("&")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 3 Value Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 text-left"
        >
          <div
            style={{
              backgroundColor: "var(--theme-surface)",
              borderColor: "var(--theme-surface-border)",
            }}
            className="relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-3">
              <div
                style={{
                  backgroundColor: "var(--theme-badge-bg)",
                  color: "var(--theme-primary)",
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl"
              >
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{t.stat1}</h4>
                <p style={{ color: "var(--theme-muted)" }} className="text-xs">{t.stat1Sub}</p>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--theme-surface)",
              borderColor: "var(--theme-surface-border)",
            }}
            className="relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-3">
              <div
                style={{
                  backgroundColor: "var(--theme-badge-bg)",
                  color: "var(--theme-primary)",
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl"
              >
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{t.stat2}</h4>
                <p style={{ color: "var(--theme-muted)" }} className="text-xs">{t.stat2Sub}</p>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--theme-surface)",
              borderColor: "var(--theme-surface-border)",
            }}
            className="relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-3">
              <div
                style={{
                  backgroundColor: "var(--theme-badge-bg)",
                  color: "var(--theme-primary)",
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl"
              >
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{t.stat3}</h4>
                <p style={{ color: "var(--theme-muted)" }} className="text-xs">{t.stat3Sub}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
