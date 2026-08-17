"use client";

import React, { useState, useMemo } from "react";
import { MENU_ITEMS, MenuItem } from "@/data/coffeeData";
import { useApp } from "@/context/AppContext";
import {
  Flame,
  Search,
  Filter,
  Check,
  Zap,
  Leaf,
  ShieldCheck,
  ArrowUpDown,
  Coffee,
} from "lucide-react";

export const NutritionSection: React.FC = () => {
  const { language } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortField, setSortField] = useState<"calories" | "protein" | "carbs" | "fat">("calories");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const categories = [
    { id: "all", label: { ru: "Все позиции", en: "All", zh: "全部" } },
    { id: "signature", label: { ru: "Авторские", en: "Signature", zh: "特调" } },
    { id: "classic", label: { ru: "Классика", en: "Classic", zh: "经典" } },
    { id: "tea_matcha", label: { ru: "Чай & Матча", en: "Tea", zh: "茶饮" } },
    { id: "kitchen", label: { ru: "Кухня", en: "Kitchen", zh: "餐食" } },
    { id: "desserts", label: { ru: "Десерты", en: "Desserts", zh: "甜点" } },
  ];

  const quickFilters = [
    { id: "low_cal", label: "До 150 ккал", check: (i: MenuItem) => i.nutrition.calories <= 150 },
    { id: "high_protein", label: "Высокий белок (>15г)", check: (i: MenuItem) => i.nutrition.protein >= 15 },
    { id: "sugar_free", label: "Без сахара", check: (i: MenuItem) => i.tags.includes("sugar_free") },
    { id: "vegan", label: "Vegan", check: (i: MenuItem) => i.tags.includes("vegan") },
  ];

  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

  const filteredAndSortedItems = useMemo(() => {
    let list = MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName =
          item.name.ru.toLowerCase().includes(q) ||
          item.name.en.toLowerCase().includes(q) ||
          item.description.ru.toLowerCase().includes(q);
        if (!matchesName) return false;
      }
      // Quick filter
      if (activeQuickFilter) {
        const f = quickFilters.find((qf) => qf.id === activeQuickFilter);
        if (f && !f.check(item)) return false;
      }
      return true;
    });

    list.sort((a, b) => {
      const valA = a.nutrition[sortField];
      const valB = b.nutrition[sortField];
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });

    return list;
  }, [searchQuery, selectedCategory, activeQuickFilter, sortField, sortOrder]);

  const toggleSort = (field: "calories" | "protein" | "carbs" | "fat") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const t = {
    ru: {
      tag: "Прозрачность & Здоровье",
      title: "Энергетическая ценность и КБЖУ",
      desc: "Полные данные по калорийности, белкам, жирам и углеводам для каждого напитка и блюда в сети Vincent Van Coffee.",
      searchPlaceholder: "Поиск по названию (например, «Раф», «Матча», «Круассан»)...",
      colName: "Позиция",
      colVolume: "Объем / Вес",
      colCal: "Калории",
      colProt: "Белки",
      colFat: "Жиры",
      colCarbs: "Углеводы",
      colTags: "Особенности",
      noResults: "Позиции не найдены. Попробуйте изменить параметры поиска.",
    },
    en: {
      tag: "Transparency & Nutrition",
      title: "Nutritional Values & Macro Breakdown",
      desc: "Full transparency on calories, proteins, fats, and carbohydrates for all drinks and culinary items.",
      searchPlaceholder: "Search item (e.g., 'Raf', 'Matcha', 'Croissant')...",
      colName: "Item",
      colVolume: "Size",
      colCal: "Calories",
      colProt: "Protein",
      colFat: "Fat",
      colCarbs: "Carbs",
      colTags: "Features",
      noResults: "No items found matching your filter.",
    },
    zh: {
      tag: "营养与热量透明公开",
      title: "能量与宏观营养素表 (КБЖУ)",
      desc: "完整提供凡高咖啡全线饮品与餐食的热量、蛋白质、脂肪和碳水化合物数据，助您轻松管理健康生活。",
      searchPlaceholder: "搜索单品（例如：拉夫、抹茶、可颂）...",
      colName: "出品名称",
      colVolume: "分量",
      colCal: "热量 (kcal)",
      colProt: "蛋白质 (g)",
      colFat: "脂肪 (g)",
      colCarbs: "碳水 (g)",
      colTags: "特色标签",
      noResults: "未找到符合条件的单品，请尝试其他关键词。",
    },
  }[language];

  return (
    <section id="nutrition" className="relative py-24 bg-[#0C0A09]/95 canvas-texture border-t border-[#D49B45]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D49B45]/30 bg-[#1A1410] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#F3CA74]">
            <Flame className="h-3.5 w-3.5 text-[#D49B45]" />
            <span>{t.tag}</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F2]">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D4C8BC]">
            {t.desc}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#16120F] p-4 sm:p-6 shadow-xl backdrop-blur-xl">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A89B8D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border border-white/10 bg-[#1D1714] pl-11 pr-4 py-3 text-sm text-[#FAF7F2] placeholder-[#70655B] outline-none transition-colors focus:border-[#D49B45]"
            />
          </div>

          {/* Categories & Quick Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isActive = cat.id === selectedCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-[#D49B45] text-[#0C0A09] font-semibold shadow-sm"
                        : "bg-[#1D1714] text-[#A89B8D] hover:text-white"
                    }`}
                  >
                    {cat.label[language]}
                  </button>
                );
              })}
            </div>

            {/* Quick tag chips */}
            <div className="flex flex-wrap gap-1.5">
              {quickFilters.map((qf) => {
                const isChipActive = activeQuickFilter === qf.id;
                return (
                  <button
                    key={qf.id}
                    onClick={() => setActiveQuickFilter(isChipActive ? null : qf.id)}
                    className={`rounded-lg border px-2.5 py-1 text-xs transition-all ${
                      isChipActive
                        ? "border-[#F3CA74] bg-[#F3CA74]/20 text-[#F3CA74] font-semibold"
                        : "border-white/10 bg-white/5 text-[#A89B8D] hover:border-white/20"
                    }`}
                  >
                    {qf.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="mt-8 hidden lg:block overflow-hidden rounded-2xl border border-white/10 bg-[#16120F] shadow-2xl">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-[#1D1714] text-[#A89B8D] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">{t.colName}</th>
                <th className="px-4 py-4">{t.colVolume}</th>
                <th
                  onClick={() => toggleSort("calories")}
                  className="px-4 py-4 cursor-pointer text-[#F3CA74] hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{t.colCal}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("protein")}
                  className="px-4 py-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{t.colProt}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("fat")}
                  className="px-4 py-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{t.colFat}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("carbs")}
                  className="px-4 py-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{t.colCarbs}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4">{t.colTags}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#FAF7F2]">
              {filteredAndSortedItems.length > 0 ? (
                filteredAndSortedItems.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-[#201A16]/60 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name[language]}
                          className="h-10 w-10 rounded-lg object-cover border border-white/10"
                        />
                        <div>
                          <div className="font-semibold text-sm text-white group-hover:text-[#F3CA74] transition-colors">
                            {item.name[language]}
                          </div>
                          <div className="text-[11px] text-[#A89B8D]">{item.price} ₽</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-mono text-[#A89B8D]">{item.volume}</td>
                    <td className="px-4 py-4 font-bold text-sm text-[#F3CA74]">
                      {item.nutrition.calories} <span className="text-[10px] font-normal text-[#A89B8D]">ккал</span>
                    </td>
                    <td className="px-4 py-4 font-mono">{item.nutrition.protein} г</td>
                    <td className="px-4 py-4 font-mono">{item.nutrition.fat} г</td>
                    <td className="px-4 py-4 font-mono">{item.nutrition.carbs} г</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tg, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-[#A89B8D]"
                          >
                            {tg === "vegan"
                              ? "Vegan"
                              : tg === "sugar_free"
                              ? "Без сахара"
                              : tg === "specialty"
                              ? "Спешелти"
                              : "Шеф-выбор"}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-[#A89B8D]">
                    {t.noResults}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Cards View */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {filteredAndSortedItems.length > 0 ? (
            filteredAndSortedItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-[#16120F] p-4 text-xs"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={item.image}
                    alt={item.name[language]}
                    className="h-12 w-12 rounded-xl object-cover border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-white truncate">
                      {item.name[language]}
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-[#A89B8D] mt-0.5">
                      <span>{item.volume}</span>
                      <span className="font-bold text-[#F3CA74]">{item.price} ₽</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-4 gap-1.5 rounded-xl bg-[#1D1714] p-2 text-center">
                  <div>
                    <div className="font-bold text-[#F3CA74]">{item.nutrition.calories}</div>
                    <div className="text-[9px] text-[#A89B8D]">ккал</div>
                  </div>
                  <div>
                    <div className="font-bold text-white">{item.nutrition.protein}г</div>
                    <div className="text-[9px] text-[#A89B8D]">Белки</div>
                  </div>
                  <div>
                    <div className="font-bold text-white">{item.nutrition.fat}г</div>
                    <div className="text-[9px] text-[#A89B8D]">Жиры</div>
                  </div>
                  <div>
                    <div className="font-bold text-white">{item.nutrition.carbs}г</div>
                    <div className="text-[9px] text-[#A89B8D]">Углев.</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-sm text-[#A89B8D]">
              {t.noResults}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
