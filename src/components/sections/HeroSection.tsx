"use client";

import React from "react";
import { motion } from "framer-motion";
import { StarryCanvas } from "@/components/ui/StarryCanvas";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { useApp } from "@/context/AppContext";
import { LOCATIONS } from "@/data/coffeeData";
import { Sparkles, MapPin, Coffee, ArrowRight, Heart, Award, Compass } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { language, selectedLocationId, setSelectedLocationId, openTipsModal, openRouteModal } = useApp();

  const titles = {
    ru: {
      tag: "Сеть кофеен в Иркутске",
      titleMain: "Искусство в каждой чашке",
      titleSub: "Спешелти кофе, вдохновленный живописью",
      desc: "Четыре особенных пространства в сердце Иркутска. Чистый вкус свежей обжарки, авторские рафы, ремесленная выпечка и атмосфера живого творчества.",
      menuBtn: "Исследовать меню",
      mapBtn: "Выбрать кофейню",
      tipsBtn: "Сказать спасибо бариста",
      stat1: "100% Арабика",
      stat1Sub: "Микролоты свежей обжарки",
      stat2: "4 Локации",
      stat2Sub: "Центр, ТЦ и Арт-квартал",
      stat3: "Авторская карта",
      stat3Sub: "Напитки с душой художника",
    },
    en: {
      tag: "Specialty Coffee Chain in Irkutsk",
      titleMain: "Art in Every Single Cup",
      titleSub: "Specialty Coffee Inspired by Painting",
      desc: "Four distinctive coffee spaces in the heart of Irkutsk. Fresh roast clarity, signature botanical rafs, artisanal bakeries, and an art-gallery vibe.",
      menuBtn: "Explore Menu",
      mapBtn: "Find Locations",
      tipsBtn: "Tip the Barista",
      stat1: "100% Arabica",
      stat1Sub: "Single-origin micro-lots",
      stat2: "4 Locations",
      stat2Sub: "Downtown & shopping malls",
      stat3: "Signature Menu",
      stat3Sub: "Crafted with painter's soul",
    },
    zh: {
      tag: "伊尔库茨克精品艺术咖啡连锁",
      titleMain: "每一杯皆是艺术",
      titleSub: "以绘画为灵感的精品咖啡空间",
      desc: "坐落于伊尔库茨克核心区域的四家特色门店。新鲜自烘豆单、招牌特调咖啡、手作烘焙与艺术画廊般的温馨氛围。",
      menuBtn: "浏览精选菜单",
      mapBtn: "查看门店地图",
      tipsBtn: "打赏咖啡师",
      stat1: "100% 精品豆",
      stat1Sub: "原产地微批次新鲜现烘",
      stat2: "4 家门店",
      stat2Sub: "历史中心与各大购物中心",
      stat3: "独家特调",
      stat3Sub: "融合画家灵魂与风味",
    },
  };

  const t = titles[language];

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Canvas dynamic starry embers background */}
      <StarryCanvas />

      {/* Atmospheric ambient radiant glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#D49B45]/15 via-[#1A3756]/15 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-72 w-72 rounded-full bg-[#D49B45]/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-20 right-10 h-80 w-80 rounded-full bg-[#182C44]/25 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#D49B45]/30 bg-[#1A1410]/80 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(212,155,69,0.15)]"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#D49B45] animate-ping" />
          <span className="text-xs font-semibold tracking-wider uppercase text-[#F3CA74]">
            {t.tag}
          </span>
          <span className="text-[#A89B8D]">•</span>
          <span className="text-xs text-[#FAF7F2]">4 точки открыты</span>
        </motion.div>

        {/* Editorial Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 space-y-2"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FAF7F2] leading-[1.08]">
            <span className="block">{t.titleMain}</span>
            <span className="block gold-gradient-text italic font-medium mt-1">
              {t.titleSub}
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#D4C8BC]"
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
                <Coffee className="h-4 w-4 text-[#F3CA74]" />
                <span>{t.menuBtn}</span>
                <ArrowRight className="h-4 w-4 text-[#F3CA74]" />
              </div>
            </ShimmerButton>
          </a>

          <a
            href="#locations"
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-[#1A1410]/80 px-6 py-3.5 text-sm font-semibold text-[#FAF7F2] backdrop-blur-md transition-all hover:border-[#D49B45]/50 hover:bg-[#221A15] hover:scale-[1.02]"
          >
            <MapPin className="h-4 w-4 text-[#D49B45]" />
            <span>{t.mapBtn}</span>
          </a>

          <button
            onClick={() => openTipsModal()}
            className="flex items-center gap-2 rounded-xl border border-[#D49B45]/30 bg-[#D49B45]/10 px-5 py-3.5 text-sm font-semibold text-[#F3CA74] backdrop-blur-md transition-all hover:bg-[#D49B45]/20 hover:scale-[1.02]"
          >
            <Heart className="h-4 w-4 fill-[#F3CA74]/20" />
            <span>{t.tipsBtn}</span>
          </button>
        </motion.div>

        {/* Quick Location Pills Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#16120F]/70 p-2.5 backdrop-blur-xl"
        >
          <div className="mb-2 flex items-center justify-between px-3 text-[11px] font-semibold tracking-wider uppercase text-[#A89B8D]">
            <span>Быстрый выбор вашей точки:</span>
            <span className="text-[#D49B45] font-normal">Иркутск</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {LOCATIONS.map((loc) => {
              const isSelected = loc.id === selectedLocationId;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocationId(loc.id as any)}
                  className={`relative flex flex-col items-start rounded-xl p-2.5 text-left text-xs transition-all ${
                    isSelected
                      ? "bg-[#2A1F18] border border-[#D49B45] text-white shadow-[0_0_20px_rgba(212,155,69,0.2)]"
                      : "bg-[#1D1714]/60 border border-transparent text-[#A89B8D] hover:bg-[#1D1714] hover:text-white"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-bold text-white text-xs">{loc.shortName}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="mt-0.5 text-[10px] text-[#A89B8D] truncate w-full">
                    {loc.landmark}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 3 Pillars / Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 text-left"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#16120F]/80 p-5 backdrop-blur-md transition-all hover:border-[#D49B45]/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D49B45]/10 text-[#F3CA74] border border-[#D49B45]/20">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#FAF7F2]">{t.stat1}</h4>
                <p className="text-xs text-[#A89B8D]">{t.stat1Sub}</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#16120F]/80 p-5 backdrop-blur-md transition-all hover:border-[#D49B45]/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D49B45]/10 text-[#F3CA74] border border-[#D49B45]/20">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#FAF7F2]">{t.stat2}</h4>
                <p className="text-xs text-[#A89B8D]">{t.stat2Sub}</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#16120F]/80 p-5 backdrop-blur-md transition-all hover:border-[#D49B45]/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D49B45]/10 text-[#F3CA74] border border-[#D49B45]/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#FAF7F2]">{t.stat3}</h4>
                <p className="text-xs text-[#A89B8D]">{t.stat3Sub}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
