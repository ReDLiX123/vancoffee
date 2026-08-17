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
  Compass,
  Coffee,
  Palette,
  Wifi,
  PawPrint,
  Utensils,
  Croissant,
  Disc,
  Zap,
  Leaf,
  CreditCard,
  Sun,
  Check,
} from "lucide-react";

export const getFeatureIcon = (feature: string) => {
  const f = feature.toLowerCase();
  if (f.includes("wi-fi") || f.includes("wifi") || f.includes("розетк") || f.includes("socket") || f.includes("充电")) {
    return <Wifi className="h-3.5 w-3.5 text-[var(--theme-primary)] shrink-0" />;
  }
  if (f.includes("dog") || f.includes("собак") || f.includes("питомц") || f.includes("животн") || f.includes("pet") || f.includes("宠物")) {
    return <PawPrint className="h-3.5 w-3.5 text-[var(--theme-primary)] shrink-0" />;
  }
  if (f.includes("vegan") || f.includes("эко") || f.includes("растительн") || f.includes("сахар") || f.includes("eco") || f.includes("环保") || f.includes("无糖") || f.includes("植物")) {
    return <Leaf className="h-3.5 w-3.5 text-[var(--theme-primary)] shrink-0" />;
  }
  if (f.includes("завтрак") || f.includes("кухн") || f.includes("еда") || f.includes("breakfast") || f.includes("kitchen") || f.includes("早午餐") || f.includes("厨房")) {
    return <Utensils className="h-3.5 w-3.5 text-[var(--theme-primary)] shrink-0" />;
  }
  if (f.includes("выпечк") || f.includes("тарт") || f.includes("макарон") || f.includes("десерт") || f.includes("pastr") || f.includes("tart") || f.includes("macaron") || f.includes("dessert") || f.includes("烘焙") || f.includes("甜点") || f.includes("马卡龙")) {
    return <Croissant className="h-3.5 w-3.5 text-[var(--theme-primary)] shrink-0" />;
  }
  if (f.includes("винил") || f.includes("музык") || f.includes("vinyl") || f.includes("music") || f.includes("黑胶") || f.includes("音乐")) {
    return <Disc className="h-3.5 w-3.5 text-[var(--theme-primary)] shrink-0" />;
  }
  if (f.includes("to-go") || f.includes("быстр") || f.includes("express") || f.includes("fast") || f.includes("外带") || f.includes("极速")) {
    return <Zap className="h-3.5 w-3.5 text-[var(--theme-primary)] shrink-0" />;
  }
  if (f.includes("оплат") || f.includes("карт") || f.includes("безналич") || f.includes("pay") || f.includes("card") || f.includes("支付") || f.includes("闪付")) {
    return <CreditCard className="h-3.5 w-3.5 text-[var(--theme-primary)] shrink-0" />;
  }
  if (f.includes("арт") || f.includes("экспозиц") || f.includes("коллаборац") || f.includes("art") || f.includes("collab") || f.includes("gallery") || f.includes("艺术") || f.includes("联名") || f.includes("展")) {
    return <Palette className="h-3.5 w-3.5 text-[var(--theme-primary)] shrink-0" />;
  }
  if (f.includes("террас") || f.includes("окн") || f.includes("столик") || f.includes("terrace") || f.includes("window") || f.includes("seating") || f.includes("露台") || f.includes("沿窗")) {
    return <Sun className="h-3.5 w-3.5 text-[var(--theme-primary)] shrink-0" />;
  }
  if (f.includes("фильтр") || f.includes("каппинг") || f.includes("кофе") || f.includes("зерн") || f.includes("filter") || f.includes("cupping") || f.includes("coffee") || f.includes("brew") || f.includes("手冲") || f.includes("杯测") || f.includes("咖啡")) {
    return <Coffee className="h-3.5 w-3.5 text-[var(--theme-primary)] shrink-0" />;
  }
  return <Check className="h-3.5 w-3.5 text-[var(--theme-primary)] shrink-0" />;
};

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
      styleLabel: "Стиль:",
      addressLabel: "Точный адрес",
      hoursLabel: "Режим работы",
      weekdaysLabel: "Будние дни:",
      weekendsLabel: "Выходные:",
      phoneLabel: "Телефон локации",
      featuresLabel: "Особенности пространства",
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
      styleLabel: "Style:",
      addressLabel: "Exact Address",
      hoursLabel: "Opening Hours",
      weekdaysLabel: "Weekdays:",
      weekendsLabel: "Weekends:",
      phoneLabel: "Location Phone",
      featuresLabel: "Space Features & Amenities",
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
      styleLabel: "风格：",
      addressLabel: "详细地址",
      hoursLabel: "营业时间",
      weekdaysLabel: "工作日：",
      weekendsLabel: "周末：",
      phoneLabel: "门店电话",
      featuresLabel: "空间特色与设施",
    },
  };

  const t = sectionHeadings[language];

  const activeLocName = activeLoc.nameI18n?.[language] || activeLoc.name;
  const activeLocLandmark = activeLoc.landmarkI18n?.[language] || activeLoc.landmark;
  const activeLocAtmosphere = activeLoc.atmosphereI18n?.[language] || activeLoc.atmosphere;
  const activeLocAddress = activeLoc.addressI18n?.[language] || activeLoc.address;
  const activeLocPopular = activeLoc.popularDrinkI18n?.[language] || activeLoc.popularDrink;
  const activeLocFeatures = activeLoc.featuresI18n?.[language] || activeLoc.features;
  const activeLocStyle = activeLoc.theme.styleNameI18n?.[language] || activeLoc.theme.styleName;
  const activeLocPalette = activeLoc.theme.paletteDescriptionI18n?.[language] || activeLoc.theme.paletteDescription;

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
            const locShort = loc.shortNameI18n?.[language] || loc.shortName;
            const locStyle = loc.theme.styleNameI18n?.[language] || loc.theme.styleName;
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
                  <span>{locShort}</span>
                  <span className="text-[10px] opacity-60 font-normal hidden md:inline">
                    ({locStyle.split("&")[0]})
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Showcase Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left: Magazine-style 3D Visual Showcase Card */}
          <div className="lg:col-span-7 flex flex-col">
            <TiltCard className="h-full p-0 flex flex-col justify-between group overflow-hidden">
              {/* 1. Large Unobstructed Photo Window */}
              <div className="relative h-72 sm:h-80 md:h-[340px] w-full overflow-hidden bg-black/10 shrink-0">
                <img
                  key={activeLoc.id}
                  src={getAssetPath(activeLoc.image)}
                  alt={activeLocName}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle vignette scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

                {/* Floating Top Header Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-black/65 px-3 py-1.5 backdrop-blur-md shadow-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-300">{t.statusOpen}</span>
                  </div>

                  <div
                    style={{ borderColor: activeLoc.theme.primaryColor }}
                    className="flex items-center gap-2 rounded-full border bg-black/65 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-md"
                  >
                    <span
                      style={{ backgroundColor: activeLoc.theme.primaryColor }}
                      className="h-2 w-2 rounded-full ring-2 ring-white/30"
                    />
                    <span>{activeLocStyle}</span>
                  </div>
                </div>

                {/* Floating Landmark Tag on Bottom of Photo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 drop-shadow-md">
                  <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-3 py-1 backdrop-blur-md text-white">
                    <Compass className="h-3.5 w-3.5 text-amber-300" />
                    <span className="truncate">{activeLocLandmark}</span>
                  </div>
                </div>
              </div>

              {/* 2. Clear, Unobstructed Content Section below photo */}
              <div
                style={{
                  backgroundColor: "var(--theme-surface)",
                  color: "var(--theme-text)",
                }}
                className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4 transition-colors duration-500"
              >
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight group-hover:text-[var(--theme-primary)] transition-colors">
                    {activeLocName}
                  </h3>

                  <p style={{ color: "var(--theme-muted)" }} className="mt-2.5 text-xs sm:text-sm leading-relaxed">
                    {activeLocAtmosphere}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-black/5 dark:border-white/5">
                  {/* Palette information with color dots */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span style={{ color: "var(--theme-primary)" }} className="font-bold text-xs">
                        {t.paletteLabel}
                      </span>
                      <span style={{ color: "var(--theme-muted)" }} className="text-xs">
                        {activeLocPalette}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        title="Primary Color"
                        style={{ backgroundColor: activeLoc.theme.primaryColor }}
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10 dark:ring-white/20 shadow-xs"
                      />
                      <span
                        title="Accent Color"
                        style={{ backgroundColor: activeLoc.theme.accentColor }}
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10 dark:ring-white/20 shadow-xs"
                      />
                      {activeLoc.theme.accentColor2 && (
                        <span
                          title="Accent Color 2"
                          style={{ backgroundColor: activeLoc.theme.accentColor2 }}
                          className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10 dark:ring-white/20 shadow-xs"
                        />
                      )}
                    </div>
                  </div>

                  {/* Signature Drink Row */}
                  <div
                    style={{
                      backgroundColor: "var(--theme-surface-elevated)",
                      borderColor: "var(--theme-surface-border)",
                    }}
                    className="flex items-center gap-3 rounded-2xl border p-3 shadow-xs"
                  >
                    <div
                      style={{
                        backgroundColor: "var(--theme-badge-bg)",
                        color: "var(--theme-primary)",
                      }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    >
                      <Coffee className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div style={{ color: "var(--theme-muted)" }} className="text-[10px] font-bold uppercase tracking-wider">
                        {t.popular}
                      </div>
                      <div style={{ color: "var(--theme-text)" }} className="text-xs font-bold truncate mt-0.5">
                        {activeLocPopular}
                      </div>
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
                  {t.addressLabel}
                </span>
                <div className="mt-2 flex items-start gap-3">
                  <MapPin style={{ color: "var(--theme-primary)" }} className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-base">{activeLocAddress}</p>
                    <p style={{ color: "var(--theme-muted)" }} className="text-xs mt-0.5">{activeLocLandmark}</p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="border-t border-black/5 dark:border-white/5 pt-5">
                <span
                  style={{ color: "var(--theme-primary)" }}
                  className="text-[11px] font-bold uppercase tracking-wider"
                >
                  {t.hoursLabel}
                </span>
                <div className="mt-2 flex items-start gap-3">
                  <Clock style={{ color: "var(--theme-primary)" }} className="h-5 w-5 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm space-y-1 w-full">
                    <div className="flex justify-between gap-4">
                      <span style={{ color: "var(--theme-muted)" }}>{t.weekdaysLabel}</span>
                      <span className="font-semibold">{activeLoc.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span style={{ color: "var(--theme-muted)" }}>{t.weekendsLabel}</span>
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
                  {t.phoneLabel}
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
                  {t.featuresLabel}
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeLocFeatures.map((feature, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: "var(--theme-surface-elevated)",
                        borderColor: "var(--theme-surface-border)",
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium shadow-2xs"
                    >
                      {getFeatureIcon(feature)}
                      <span>{feature}</span>
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
                    backgroundColor: "var(--theme-btn-bg, var(--theme-primary))",
                    color: "var(--theme-btn-text, #FFFFFF)",
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
