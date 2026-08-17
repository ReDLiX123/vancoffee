"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LOCATIONS, LocationItem } from "@/data/coffeeData";
import { useApp } from "@/context/AppContext";
import { TiltCard } from "@/components/ui/TiltCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Heart,
  ExternalLink,
  Sparkles,
  Coffee,
  CheckCircle2,
  Utensils,
  Wifi,
} from "lucide-react";

export const LocationsSection: React.FC = () => {
  const { selectedLocationId, setSelectedLocationId, openTipsModal, openRouteModal, language } = useApp();
  const [activeTab, setActiveTab] = useState<string>(selectedLocationId);

  const activeLoc = LOCATIONS.find((l) => l.id === activeTab) || LOCATIONS[0];

  const handleSelectLocation = (id: string) => {
    setActiveTab(id);
    setSelectedLocationId(id as any);
  };

  const sectionHeadings = {
    ru: {
      tag: "Пространства в Иркутске",
      title: "4 точки. 4 уникальных характера",
      desc: "От просторного исторического кафе с кухней до динамичных островков to-go в главных торговых центрах города.",
      statusOpen: "Открыто сейчас",
      btnRoute: "Маршрут",
      btnTips: "Чаевые бариста",
      btn2gis: "2ГИС",
      btnYandex: "Яндекс.Карты",
      popular: "Фирменный напиток локации:",
    },
    en: {
      tag: "Spaces in Irkutsk",
      title: "4 Locations. 4 Unique Vibes",
      desc: "From a spacious historic café with warm breakfasts to vibrant to-go espresso bars in premier shopping destinations.",
      statusOpen: "Open Now",
      btnRoute: "Get Directions",
      btnTips: "Tip Barista",
      btn2gis: "2GIS",
      btnYandex: "Yandex Maps",
      popular: "Signature Location Drink:",
    },
    zh: {
      tag: "伊尔库茨克空间",
      title: "4 家门店 • 4 种独特氛围",
      desc: "从提供丰富早午餐的历史街区旗舰店，到各大购物中心的快捷精品咖啡站。",
      statusOpen: "正在营业",
      btnRoute: "路线导航",
      btnTips: "打赏咖啡师",
      btn2gis: "2GIS 地图",
      btnYandex: "Yandex 地图",
      popular: "本店特色招牌推荐：",
    },
  };

  const t = sectionHeadings[language];

  return (
    <section id="locations" className="relative py-24 bg-[#0C0A09]/80 canvas-texture">
      {/* Background glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#D49B45]/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D49B45]/30 bg-[#1A1410] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#F3CA74]">
            <MapPin className="h-3.5 w-3.5 text-[#D49B45]" />
            <span>{t.tag}</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F2]">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D4C8BC]">
            {t.desc}
          </p>
        </div>

        {/* Location selector tabs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {LOCATIONS.map((loc) => {
            const isActive = loc.id === activeTab;
            return (
              <button
                key={loc.id}
                onClick={() => handleSelectLocation(loc.id)}
                className={`relative rounded-2xl px-5 py-3.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[#281E17] text-[#F3CA74] border border-[#D49B45] shadow-[0_0_25px_rgba(212,155,69,0.25)] scale-105"
                    : "bg-[#16120F] text-[#A89B8D] border border-white/10 hover:border-white/20 hover:text-[#FAF7F2]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${isActive ? "bg-[#D49B45]" : "bg-[#70655B]"}`} />
                  <span>{loc.shortName}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Showcase Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left: 3D Image & Visual presentation */}
          <div className="lg:col-span-7 flex flex-col">
            <TiltCard className="h-full min-h-[380px] sm:min-h-[460px] p-0 flex flex-col justify-end relative group">
              <img
                src={activeLoc.image}
                alt={activeLoc.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09] via-[#0C0A09]/60 to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full border border-emerald-500/40 bg-black/60 px-3.5 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-300">{t.statusOpen}</span>
              </div>

              {/* Bottom overlay content */}
              <div className="relative z-10 p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D49B45]">
                  <Sparkles className="h-4 w-4" />
                  <span>{activeLoc.landmark}</span>
                </div>
                <h3 className="mt-2 font-serif text-2xl sm:text-4xl font-bold text-[#FAF7F2]">
                  {activeLoc.name}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#E5DCD3]">
                  {activeLoc.atmosphere}
                </p>

                {/* Popular Drink */}
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-[#16120F]/90 p-3 backdrop-blur-md">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D49B45]/20 text-[#F3CA74]">
                    <Coffee className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#A89B8D]">{t.popular}</div>
                    <div className="text-xs font-bold text-[#FAF7F2]">{activeLoc.popularDrink}</div>
                  </div>
                </div>
              </div>

              <BorderBeam size={250} duration={14} colorFrom="#F3CA74" colorTo="#D49B45" />
            </TiltCard>
          </div>

          {/* Right: Info Card & Route/Tips Action */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-[#D49B45]/20 bg-[#16120F]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <div className="space-y-6">
              {/* Address */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D49B45]">
                  Точный адрес
                </span>
                <div className="mt-2 flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-[#F3CA74] mt-0.5" />
                  <div>
                    <p className="font-semibold text-base text-[#FAF7F2]">{activeLoc.address}</p>
                    <p className="text-xs text-[#A89B8D] mt-0.5">{activeLoc.landmark}</p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="border-t border-white/10 pt-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D49B45]">
                  Режим работы
                </span>
                <div className="mt-2 flex items-start gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-[#F3CA74] mt-0.5" />
                  <div className="text-xs sm:text-sm space-y-1">
                    <div className="flex justify-between gap-4 text-[#FAF7F2]">
                      <span>Будние дни:</span>
                      <span className="font-semibold">{activeLoc.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between gap-4 text-[#FAF7F2]">
                      <span>Выходные:</span>
                      <span className="font-semibold">{activeLoc.hours.weekends}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="border-t border-white/10 pt-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D49B45]">
                  Телефон точки
                </span>
                <div className="mt-2 flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#F3CA74]" />
                  <a
                    href={`tel:${activeLoc.phone}`}
                    className="font-semibold text-sm sm:text-base text-[#FAF7F2] hover:text-[#F3CA74] transition-colors"
                  >
                    {activeLoc.phone}
                  </a>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="border-t border-white/10 pt-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A89B8D]">
                  Особенности пространства
                </span>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activeLoc.features.map((feature, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-white/10 bg-[#201915] px-3 py-1 text-xs text-[#E5DCD3]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3 pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={activeLoc.gis2Url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#2EB67D]/40 bg-[#2EB67D]/10 py-3 text-xs font-semibold text-[#82E7BA] transition-all hover:bg-[#2EB67D]/20 hover:scale-[1.02]"
                >
                  <span>{t.btn2gis}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <a
                  href={activeLoc.yandexMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#FC3F1D]/40 bg-[#FC3F1D]/10 py-3 text-xs font-semibold text-[#FF8566] transition-all hover:bg-[#FC3F1D]/20 hover:scale-[1.02]"
                >
                  <span>{t.btnYandex}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => openRouteModal(activeLoc.id as any)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-xs font-semibold text-[#FAF7F2] transition-colors hover:bg-white/10"
                >
                  <Navigation className="h-3.5 w-3.5 text-[#D49B45]" />
                  <span>{t.btnRoute}</span>
                </button>

                <button
                  onClick={() => openTipsModal(activeLoc.id as any)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#D49B45] bg-[#D49B45] py-3 text-xs font-semibold text-[#0C0A09] transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(212,155,69,0.25)]"
                >
                  <Heart className="h-3.5 w-3.5 fill-[#0C0A09]" />
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
