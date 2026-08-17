"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_ITEMS, MenuItem, LOCATIONS } from "@/data/coffeeData";
import { useApp } from "@/context/AppContext";
import { DrinkDetailModal } from "@/components/modals/DrinkDetailModal";
import {
  Coffee,
  Sparkles,
  Flame,
  ChevronRight,
  Info,
} from "lucide-react";

export const MenuSection: React.FC = () => {
  const { language, selectedLocationId, selectedLocation } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  const categories = [
    { id: "all", label: { ru: "Все позиции", en: "All Items", zh: "全出品" } },
    { id: "signature", label: { ru: "Авторские напитки", en: "Signature Art", zh: "艺术特调" } },
    { id: "classic", label: { ru: "Классика спешелти", en: "Specialty Classic", zh: "经典单品" } },
    { id: "tea_matcha", label: { ru: "Чай & Матча", en: "Tea & Matcha", zh: "特级茶饮" } },
    { id: "kitchen", label: { ru: "Завтраки & Еда", en: "Kitchen & Breakfast", zh: "全天早午餐" } },
    { id: "desserts", label: { ru: "Десерты", en: "Art Desserts", zh: "手作法甜" } },
  ];

  const tags = [
    { id: "all", label: { ru: "Все вкусы", en: "All", zh: "全部" } },
    { id: "specialty", label: { ru: "Спешелти 100%", en: "Specialty", zh: "精品豆" } },
    { id: "vegan", label: { ru: "Vegan / На растительном", en: "Plant-based", zh: "植物基" } },
    { id: "sugar_free", label: { ru: "Без сахара", en: "Sugar-Free", zh: "无添加糖" } },
    { id: "chef_pick", label: { ru: "Выбор шефа", en: "Chef's Pick", zh: "主厨推荐" } },
  ];

  // Filter items by category, tag, and whether available at selected location
  const filteredItems = MENU_ITEMS.filter((item) => {
    if (activeCategory !== "all" && item.category !== activeCategory) {
      return false;
    }
    if (activeTag !== "all" && !item.tags.includes(activeTag as any)) {
      return false;
    }
    return true;
  });

  const sectionText = {
    ru: {
      tag: "Барная & Гастрономическая карта",
      title: "Палитра вкусов Vincent Van Coffee",
      desc: "Каждый рецепт — это гармония температур, текстур и выверенного зерна свежей обжарки.",
      viewingFor: "Меню адаптировано для точки:",
      switchLoc: "Сменить локацию",
      priceCurrency: "₽",
      detailsBtn: "Состав и КБЖУ",
      notInLocation: "Только в кафе с кухней",
      disclaimer: "ℹ️ Концепт-меню — иллюстративные фото и предварительные рецептуры. Актуальный прейскурант и сезонные позиции уточняйте у бариста.",
    },
    en: {
      tag: "Bar & Culinary Menu",
      title: "The Flavor Palette of Vincent Van Coffee",
      desc: "Each recipe is an exquisite balance of temperatures, silky micro-textures, and freshly roasted origin beans.",
      viewingFor: "Showing menu for location:",
      switchLoc: "Change location",
      priceCurrency: "RUB",
      detailsBtn: "Nutrition & Details",
      notInLocation: "Available at full café only",
      disclaimer: "ℹ️ Concept menu showcase. Real prices and seasonal items will be finalized with live bar inventory.",
    },
    zh: {
      tag: "精品咖啡与烘焙菜单",
      title: "凡高咖啡风味艺术调色板",
      desc: "每一款出品皆是温度、奶沫微质感与原产地新鲜烘焙咖啡豆的精妙融合。",
      viewingFor: "当前显示门店菜单：",
      switchLoc: "切换门店",
      priceCurrency: "卢布",
      detailsBtn: "配方与营养成分",
      notInLocation: "仅限带厨房全日餐厅供应",
      disclaimer: "ℹ️ 概念菜单展示 — 实际出品价格与季节特调以店内当季收银系统为准。",
    },
  };

  const t = sectionText[language];

  return (
    <section id="menu" className="relative py-24 transition-colors duration-500">
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
            <Coffee className="h-3.5 w-3.5" />
            <span>{t.tag}</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            {t.title}
          </h2>
          <p style={{ color: "var(--theme-muted)" }} className="mt-4 text-base sm:text-lg">
            {t.desc}
          </p>

          {/* Location Active Indicator Banner */}
          <div
            style={{
              backgroundColor: "var(--theme-surface)",
              borderColor: "var(--theme-surface-border)",
            }}
            className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border px-4 py-2 text-xs shadow-sm"
          >
            <span style={{ color: "var(--theme-muted)" }}>{t.viewingFor}</span>
            <span style={{ color: "var(--theme-primary)" }} className="font-bold">{selectedLocation.name}</span>
            <span className="opacity-40">|</span>
            <a href="#locations" style={{ color: "var(--theme-primary)" }} className="text-xs hover:underline font-semibold">
              {t.switchLoc}
            </a>
          </div>

          {/* Disclaimer badge */}
          <div
            style={{
              backgroundColor: "var(--theme-surface-elevated)",
              borderColor: "var(--theme-surface-border)",
              color: "var(--theme-muted)",
            }}
            className="mt-3 inline-flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-[11px]"
          >
            <Info className="h-3.5 w-3.5 shrink-0 text-[var(--theme-primary)]" />
            <span>{t.disclaimer}</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-12 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  backgroundColor: isActive ? "var(--theme-primary)" : "var(--theme-surface)",
                  color: isActive ? "#FFFFFF" : "var(--theme-muted)",
                  borderColor: isActive ? "var(--theme-primary)" : "var(--theme-surface-border)",
                }}
                className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all border ${
                  isActive ? "shadow-md scale-105" : "hover:opacity-100 shadow-sm"
                }`}
              >
                {cat.label[language]}
              </button>
            );
          })}
        </div>

        {/* Tag Filters */}
        <div className="mt-4 flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2">
          {tags.map((tag) => {
            const isTagActive = tag.id === activeTag;
            return (
              <button
                key={tag.id}
                onClick={() => setActiveTag(tag.id)}
                style={{
                  backgroundColor: isTagActive ? "var(--theme-badge-bg)" : "var(--theme-surface)",
                  color: isTagActive ? "var(--theme-primary)" : "var(--theme-muted)",
                  borderColor: isTagActive ? "var(--theme-primary)" : "var(--theme-surface-border)",
                }}
                className="whitespace-nowrap rounded-full border px-3 py-1 text-xs transition-all font-medium"
              >
                {tag.label[language]}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isAvailableHere = item.availableLocations.includes(selectedLocationId);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  onClick={() => setSelectedItemForModal(item)}
                  style={{
                    backgroundColor: "var(--theme-surface)",
                    borderColor: "var(--theme-surface-border)",
                  }}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer shadow-sm ${
                    isAvailableHere
                      ? "hover:scale-[1.02] hover:shadow-xl"
                      : "opacity-60"
                  }`}
                >
                  <div>
                    {/* Item Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-black/5">
                      <img
                        src={item.image}
                        alt={item.name[language]}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      {/* Badge if present */}
                      {item.badge && (
                        <div className="absolute top-3 left-3 rounded-full border border-white/30 bg-black/60 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
                          {item.badge[language]}
                        </div>
                      )}

                      {/* Volume */}
                      <div className="absolute bottom-2 right-3 rounded-lg bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-md">
                        {item.volume}
                      </div>

                      {/* Not available in current location alert */}
                      {!isAvailableHere && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4 text-center backdrop-blur-xs">
                          <span className="rounded-lg bg-black/80 border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                            {t.notInLocation}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-lg font-bold group-hover:text-[var(--theme-primary)] transition-colors leading-tight">
                          {item.name[language]}
                        </h3>
                      </div>

                      <p style={{ color: "var(--theme-muted)" }} className="mt-2 text-xs leading-relaxed line-clamp-2">
                        {item.description[language]}
                      </p>

                      {/* Taste notes */}
                      {item.tasteNotes && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {item.tasteNotes.slice(0, 3).map((note, i) => (
                            <span
                              key={i}
                              style={{
                                backgroundColor: "var(--theme-badge-bg)",
                                color: "var(--theme-primary)",
                              }}
                              className="rounded-md px-2 py-0.5 text-[10px] font-medium"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Price & Calories */}
                  <div className="flex items-center justify-between border-t border-black/5 dark:border-white/5 px-5 py-3.5">
                    <div>
                      <span style={{ color: "var(--theme-primary)" }} className="text-base font-bold">{item.price} ₽</span>
                    </div>
                    <div style={{ color: "var(--theme-muted)" }} className="flex items-center gap-1.5 text-xs group-hover:text-[var(--theme-text)] transition-colors">
                      <span>{item.nutrition.calories} ккал</span>
                      <ChevronRight className="h-3.5 w-3.5 text-[var(--theme-primary)]" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Direct Link to Nutrition Table */}
        <div className="mt-12 text-center">
          <a
            href="#nutrition"
            style={{
              backgroundColor: "var(--theme-surface)",
              borderColor: "var(--theme-surface-border)",
              color: "var(--theme-primary)",
            }}
            className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-xs font-bold transition-all hover:scale-105 shadow-sm"
          >
            <Flame className="h-4 w-4" />
            <span>Смотреть таблицу КБЖУ (Демо-значения)</span>
          </a>
        </div>
      </div>

      {/* Drink Detail Modal */}
      <DrinkDetailModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        language={language}
      />
    </section>
  );
};
