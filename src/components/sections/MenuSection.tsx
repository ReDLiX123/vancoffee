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
  Leaf,
  Heart,
  ChevronRight,
  Filter,
  Check,
  Utensils,
  Eye,
} from "lucide-react";

export const MenuSection: React.FC = () => {
  const { language, selectedLocationId, setSelectedLocationId, selectedLocation } = useApp();
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
    // Check category
    if (activeCategory !== "all" && item.category !== activeCategory) {
      return false;
    }
    // Check tag
    if (activeTag !== "all" && !item.tags.includes(activeTag as any)) {
      return false;
    }
    return true;
  });

  const sectionText = {
    ru: {
      tag: "Барная & Гастрономическая карта",
      title: "Палитра вкусов Vincent Van Coffee",
      desc: "Каждый напиток — это гармония температур, текстур и выверенного зерна свежей обжарки.",
      viewingFor: "Меню адаптировано для точки:",
      switchLoc: "Сменить локацию",
      priceCurrency: "₽",
      detailsBtn: "Состав и КБЖУ",
      notInLocation: "Только в кафе с кухней",
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
    },
  };

  const t = sectionText[language];

  return (
    <section id="menu" className="relative py-24 bg-[#0C0A09]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D49B45]/30 bg-[#1A1410] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#F3CA74]">
            <Coffee className="h-3.5 w-3.5 text-[#D49B45]" />
            <span>{t.tag}</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F2]">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D4C8BC]">
            {t.desc}
          </p>

          {/* Location Active Indicator Banner */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#16120F] px-4 py-2 text-xs">
            <span className="text-[#A89B8D]">{t.viewingFor}</span>
            <span className="font-bold text-[#F3CA74]">{selectedLocation.name}</span>
            <span className="text-[#70655B]">|</span>
            <a href="#locations" className="text-xs text-[#D49B45] hover:underline font-semibold">
              {t.switchLoc}
            </a>
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
                className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#D49B45] text-[#0C0A09] shadow-[0_0_20px_rgba(212,155,69,0.3)] scale-105"
                    : "bg-[#181310] text-[#A89B8D] border border-white/10 hover:border-[#D49B45]/30 hover:text-white"
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
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs transition-all ${
                  isTagActive
                    ? "border border-[#F3CA74] bg-[#F3CA74]/15 text-[#F3CA74]"
                    : "border border-white/5 bg-white/[0.02] text-[#A89B8D] hover:border-white/15"
                }`}
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
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isAvailableHere
                      ? "border-[#D49B45]/15 bg-[#171310] hover:border-[#D49B45]/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1"
                      : "border-white/5 bg-[#120F0D] opacity-70"
                  }`}
                >
                  <div>
                    {/* Item Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-[#221A15]">
                      <img
                        src={item.image}
                        alt={item.name[language]}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#171310] via-transparent to-transparent" />

                      {/* Badge if present */}
                      {item.badge && (
                        <div className="absolute top-3 left-3 rounded-full border border-[#D49B45]/40 bg-black/60 px-2.5 py-0.5 text-[11px] font-semibold text-[#F3CA74] backdrop-blur-md">
                          {item.badge[language]}
                        </div>
                      )}

                      {/* Volume */}
                      <div className="absolute bottom-2 right-3 rounded-lg bg-black/70 px-2 py-0.5 text-[11px] font-medium text-[#FAF7F2] backdrop-blur-md">
                        {item.volume}
                      </div>

                      {/* Not available in current location alert */}
                      {!isAvailableHere && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4 text-center backdrop-blur-xs">
                          <span className="rounded-lg bg-[#2B1B15] border border-amber-800/40 px-3 py-1 text-xs font-medium text-amber-200">
                            {t.notInLocation}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-lg font-bold text-[#FAF7F2] group-hover:text-[#F3CA74] transition-colors leading-tight">
                          {item.name[language]}
                        </h3>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-[#A89B8D] line-clamp-2">
                        {item.description[language]}
                      </p>

                      {/* Taste notes */}
                      {item.tasteNotes && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {item.tasteNotes.slice(0, 3).map((note, i) => (
                            <span
                              key={i}
                              className="rounded-md bg-[#221A15] px-2 py-0.5 text-[10px] text-[#D49B45]"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Price & Calories */}
                  <div className="flex items-center justify-between border-t border-white/5 px-5 py-3.5">
                    <div>
                      <span className="text-base font-bold text-[#F3CA74]">{item.price} ₽</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#A89B8D] group-hover:text-white transition-colors">
                      <span>{item.nutrition.calories} ккал</span>
                      <ChevronRight className="h-3.5 w-3.5 text-[#D49B45]" />
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
            className="inline-flex items-center gap-2 rounded-xl border border-[#D49B45]/30 bg-[#1D1714] px-6 py-3 text-xs font-semibold text-[#F3CA74] transition-all hover:bg-[#281F19] hover:border-[#D49B45]"
          >
            <Flame className="h-4 w-4" />
            <span>Смотреть полную таблицу калорийности и БЖУ</span>
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
