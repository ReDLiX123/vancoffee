"use client";

import React, { useState, useMemo } from "react";
import { MENU_ITEMS, MenuItem, formatVolume } from "@/data/coffeeData";
import { useApp } from "@/context/AppContext";
import {
  Flame,
  Search,
  ArrowUpDown,
  Zap,
  Leaf,
  ShieldCheck,
  Award,
  ChefHat,
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
    { id: "low_cal", label: { ru: "До 150 ккал", en: "Under 150 kcal", zh: "150 大卡以下" }, icon: Flame, check: (i: MenuItem) => i.nutrition.calories <= 150 },
    { id: "high_protein", label: { ru: "Высокий белок (>15г)", en: "High Protein (>15g)", zh: "高蛋白质 (>15g)" }, icon: Zap, check: (i: MenuItem) => i.nutrition.protein >= 15 },
    { id: "sugar_free", label: { ru: "Без сахара", en: "Sugar-Free", zh: "无添加糖" }, icon: ShieldCheck, check: (i: MenuItem) => i.tags.includes("sugar_free") },
    { id: "vegan", label: { ru: "Vegan", en: "Vegan", zh: "植物基" }, icon: Leaf, check: (i: MenuItem) => i.tags.includes("vegan") },
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
          item.name.zh.toLowerCase().includes(q) ||
          item.description.ru.toLowerCase().includes(q) ||
          item.description.en.toLowerCase().includes(q);
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
      desc: "Интерактивная таблица для расчета калорийности, белков, жиров и углеводов каждого напитка и блюда.",
      searchPlaceholder: "Поиск по названию (например, «Раф», «Матча», «Круассан»)...",
      colName: "Позиция",
      colVolume: "Объем / Вес",
      colCal: "Калории",
      colProt: "Белки",
      colFat: "Жиры",
      colCarbs: "Углеводы",
      colTags: "Особенности",
      noResults: "Позиции не найдены. Попробуйте изменить параметры поиска.",
      unitWeight: "г/мл",
      unitG: "г",
      unitCal: "ккал",
      priceCurrency: "₽",
      tagVegan: "Vegan",
      tagSugarFree: "Без сахара",
      tagSpecialty: "Спешелти",
      tagChefPick: "Шеф-выбор",
      macroProt: "Белки",
      macroFat: "Жиры",
      macroCarbs: "Углев.",
      quickFilterLabel: "Быстрый выбор:",
    },
    en: {
      tag: "Transparency & Nutrition",
      title: "Nutritional Values & Macro Breakdown",
      desc: "Interactive nutrition guide with filtering and search across all menu items.",
      searchPlaceholder: "Search by item (e.g., 'Raf', 'Matcha', 'Croissant')...",
      colName: "Item",
      colVolume: "Size / Weight",
      colCal: "Calories",
      colProt: "Protein",
      colFat: "Fat",
      colCarbs: "Carbs",
      colTags: "Features",
      noResults: "No items found matching your filter.",
      unitWeight: "g/ml",
      unitG: "g",
      unitCal: "kcal",
      priceCurrency: "RUB",
      tagVegan: "Vegan",
      tagSugarFree: "Sugar-Free",
      tagSpecialty: "Specialty",
      tagChefPick: "Chef's Pick",
      macroProt: "Protein",
      macroFat: "Fat",
      macroCarbs: "Carbs",
      quickFilterLabel: "Quick filters:",
    },
    zh: {
      tag: "营养与热量透明公开",
      title: "能量与宏观营养素表 (КБЖУ)",
      desc: "便捷的营养成分查询与健康筛选工具，轻松掌握每份单品的热量与营养。",
      searchPlaceholder: "搜索单品（例如：拉夫、抹茶、可颂）...",
      colName: "出品名称",
      colVolume: "分量",
      colCal: "热量",
      colProt: "蛋白质",
      colFat: "脂肪",
      colCarbs: "碳水",
      colTags: "特色标签",
      noResults: "未找到符合条件的单品，请尝试其他关键词。",
      unitWeight: "克/毫升",
      unitG: "克",
      unitCal: "千卡",
      priceCurrency: "₽",
      tagVegan: "植物基",
      tagSugarFree: "无添加糖",
      tagSpecialty: "精品豆",
      tagChefPick: "主厨推荐",
      macroProt: "蛋白质",
      macroFat: "脂肪",
      macroCarbs: "碳水",
      quickFilterLabel: "快捷筛选:",
    },
  }[language];

  return (
    <section id="nutrition" className="relative py-24 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div
            style={{
              backgroundColor: "var(--theme-badge-bg)",
              color: "var(--theme-primary)",
              borderColor: "var(--theme-surface-border)",
            }}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-wider"
          >
            <Flame className="h-3.5 w-3.5" />
            <span>{t.tag}</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            {t.title}
          </h2>
          <p style={{ color: "var(--theme-muted)" }} className="mt-4 text-base sm:text-lg">
            {t.desc}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-surface-border)",
          }}
          className="mt-12 rounded-3xl border p-4 sm:p-6 shadow-lg backdrop-blur-xl transition-all duration-500"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search style={{ color: "var(--theme-muted)" }} className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  backgroundColor: "var(--theme-surface-elevated)",
                  borderColor: "var(--theme-surface-border)",
                  color: "var(--theme-text)",
                }}
                className="w-full rounded-xl border pl-10 pr-4 py-2.5 text-xs outline-none transition-colors focus:border-[var(--theme-primary)]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isCatActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      backgroundColor: isCatActive ? "var(--theme-primary)" : "var(--theme-surface-elevated)",
                      color: isCatActive ? "#FFFFFF" : "var(--theme-muted)",
                      borderColor: isCatActive ? "var(--theme-primary)" : "var(--theme-surface-border)",
                    }}
                    className="whitespace-nowrap rounded-xl border px-3 py-2 text-xs font-semibold transition-all"
                  >
                    {cat.label[language]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 flex flex-wrap items-center gap-2">
            <span style={{ color: "var(--theme-muted)" }} className="text-xs font-semibold mr-1">
              {t.quickFilterLabel}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickFilters.map((qf) => {
                const isChipActive = activeQuickFilter === qf.id;
                const QfIcon = qf.icon;
                return (
                  <button
                    key={qf.id}
                    onClick={() => setActiveQuickFilter(isChipActive ? null : qf.id)}
                    style={{
                      backgroundColor: isChipActive ? "var(--theme-badge-bg)" : "transparent",
                      borderColor: isChipActive ? "var(--theme-primary)" : "var(--theme-surface-border)",
                      color: isChipActive ? "var(--theme-primary)" : "var(--theme-muted)",
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs transition-all font-medium"
                  >
                    <QfIcon className="h-3 w-3" />
                    <span>{qf.label[language]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-surface-border)",
          }}
          className="mt-8 hidden lg:block overflow-hidden rounded-2xl border shadow-xl transition-all duration-500"
        >
          <table className="w-full text-left text-xs">
            <thead
              style={{
                backgroundColor: "var(--theme-surface-elevated)",
                color: "var(--theme-muted)",
              }}
              className="border-b font-semibold uppercase tracking-wider text-[11px]"
            >
              <tr>
                <th className="px-6 py-4">{t.colName}</th>
                <th className="px-4 py-4">{t.colVolume}</th>
                <th
                  onClick={() => toggleSort("calories")}
                  className="cursor-pointer px-4 py-4 transition-colors hover:text-[var(--theme-primary)]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{t.colCal}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("protein")}
                  className="cursor-pointer px-4 py-4 transition-colors hover:text-[var(--theme-primary)]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{t.colProt}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("fat")}
                  className="cursor-pointer px-4 py-4 transition-colors hover:text-[var(--theme-primary)]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{t.colFat}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("carbs")}
                  className="cursor-pointer px-4 py-4 transition-colors hover:text-[var(--theme-primary)]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{t.colCarbs}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4">{t.colTags}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {filteredAndSortedItems.length > 0 ? (
                filteredAndSortedItems.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name[language]}
                          className="h-10 w-10 rounded-xl object-cover border border-black/5 dark:border-white/5"
                        />
                        <div>
                          <div className="font-bold text-sm">{item.name[language]}</div>
                          <div style={{ color: "var(--theme-muted)" }} className="text-[11px]">
                            {formatVolume(item.volume, language)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-mono font-medium">{item.nutrition.weightG} {t.unitWeight}</td>
                    <td className="px-4 py-4 font-mono font-bold text-[var(--theme-primary)]">
                      {item.nutrition.calories}
                    </td>
                    <td className="px-4 py-4 font-mono font-medium">{item.nutrition.protein} {t.unitG}</td>
                    <td className="px-4 py-4 font-mono font-medium">{item.nutrition.fat} {t.unitG}</td>
                    <td className="px-4 py-4 font-mono font-medium">{item.nutrition.carbs} {t.unitG}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tg, i) => (
                          <span
                            key={i}
                            style={{
                              backgroundColor: "var(--theme-surface-elevated)",
                              borderColor: "var(--theme-surface-border)",
                            }}
                            className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium"
                          >
                            {tg === "vegan" ? (
                              <>
                                <Leaf className="h-2.5 w-2.5 text-emerald-500" />
                                <span>{t.tagVegan}</span>
                              </>
                            ) : tg === "sugar_free" ? (
                              <>
                                <ShieldCheck className="h-2.5 w-2.5 text-sky-500" />
                                <span>{t.tagSugarFree}</span>
                              </>
                            ) : tg === "specialty" ? (
                              <>
                                <Award className="h-2.5 w-2.5 text-amber-500" />
                                <span>{t.tagSpecialty}</span>
                              </>
                            ) : (
                              <>
                                <ChefHat className="h-2.5 w-2.5 text-rose-500" />
                                <span>{t.tagChefPick}</span>
                              </>
                            )}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ color: "var(--theme-muted)" }} className="px-6 py-12 text-center text-sm">
                    {t.noResults}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {filteredAndSortedItems.length > 0 ? (
            filteredAndSortedItems.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "var(--theme-surface)",
                  borderColor: "var(--theme-surface-border)",
                }}
                className="rounded-2xl border p-4 text-xs shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={item.image}
                    alt={item.name[language]}
                    className="h-12 w-12 rounded-xl object-cover border border-black/10 dark:border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate">
                      {item.name[language]}
                    </div>
                    <div style={{ color: "var(--theme-muted)" }} className="flex justify-between items-center text-[11px] mt-0.5">
                      <span>{formatVolume(item.volume, language)}</span>
                      <span style={{ color: "var(--theme-primary)" }} className="font-bold">{item.price} {t.priceCurrency}</span>
                    </div>
                  </div>
                </div>

                <div
                  style={{ backgroundColor: "var(--theme-surface-elevated)" }}
                  className="mt-3 grid grid-cols-4 gap-1.5 rounded-xl p-2 text-center"
                >
                  <div>
                    <div style={{ color: "var(--theme-primary)" }} className="font-bold">{item.nutrition.calories}</div>
                    <div style={{ color: "var(--theme-muted)" }} className="text-[9px]">{t.unitCal}</div>
                  </div>
                  <div>
                    <div className="font-bold">{item.nutrition.protein}{t.unitG}</div>
                    <div style={{ color: "var(--theme-muted)" }} className="text-[9px]">{t.macroProt}</div>
                  </div>
                  <div>
                    <div className="font-bold">{item.nutrition.fat}{t.unitG}</div>
                    <div style={{ color: "var(--theme-muted)" }} className="text-[9px]">{t.macroFat}</div>
                  </div>
                  <div>
                    <div className="font-bold">{item.nutrition.carbs}{t.unitG}</div>
                    <div style={{ color: "var(--theme-muted)" }} className="text-[9px]">{t.macroCarbs}</div>
                  </div>
                </div>

                {item.tags.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {item.tags.map((tg, i) => (
                      <span
                        key={i}
                        style={{
                          backgroundColor: "var(--theme-surface-elevated)",
                          borderColor: "var(--theme-surface-border)",
                        }}
                        className="inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-medium"
                      >
                        {tg === "vegan" ? (
                          <>
                            <Leaf className="h-2 w-2 text-emerald-500" />
                            <span>{t.tagVegan}</span>
                          </>
                        ) : tg === "sugar_free" ? (
                          <>
                            <ShieldCheck className="h-2 w-2 text-sky-500" />
                            <span>{t.tagSugarFree}</span>
                          </>
                        ) : tg === "specialty" ? (
                          <>
                            <Award className="h-2 w-2 text-amber-500" />
                            <span>{t.tagSpecialty}</span>
                          </>
                        ) : (
                          <>
                            <ChefHat className="h-2 w-2 text-rose-500" />
                            <span>{t.tagChefPick}</span>
                          </>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div style={{ color: "var(--theme-muted)" }} className="col-span-full py-10 text-center text-sm">
              {t.noResults}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
