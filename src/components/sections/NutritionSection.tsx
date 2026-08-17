"use client";

import React, { useState, useMemo } from "react";
import { MENU_ITEMS, MenuItem } from "@/data/coffeeData";
import { useApp } from "@/context/AppContext";
import {
  Flame,
  Search,
  AlertTriangle,
  ArrowUpDown,
  Info,
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
      desc: "Интерактивная таблица для расчета калорийности, белков, жиров и углеводов.",
      disclaimerTitle: "ДЕМОНСТРАЦИОННЫЕ ДАННЫЕ КБЖУ (ОЖИДАЮТ СОГЛАСОВАНИЯ)",
      disclaimerDesc: "Представленные ниже цифры калорийности и БЖУ носят иллюстративный характер и предназначены для тестирования интерфейса. Официальные данные будут внесены после утверждения технологических карт клиентом.",
      searchPlaceholder: "Поиск по названию (например, «Раф», «Матча», «Круассан»)...",
      colName: "Позиция",
      colVolume: "Объем / Вес",
      colCal: "Калории (демо)",
      colProt: "Белки",
      colFat: "Жиры",
      colCarbs: "Углеводы",
      colTags: "Особенности",
      noResults: "Позиции не найдены. Попробуйте изменить параметры поиска.",
    },
    en: {
      tag: "Transparency & Nutrition",
      title: "Nutritional Values & Macro Breakdown",
      desc: "Interactive nutrition guide with filtering and search.",
      disclaimerTitle: "DEMO NUTRITIONAL VALUES (PENDING FINAL CLIENT CERTIFICATION)",
      disclaimerDesc: "The calorie and macro data displayed below are placeholders for interface validation. Certified laboratory lab-cards will be provided prior to official launch.",
      searchPlaceholder: "Search item (e.g., 'Raf', 'Matcha', 'Croissant')...",
      colName: "Item",
      colVolume: "Size",
      colCal: "Calories (demo)",
      colProt: "Protein",
      colFat: "Fat",
      colCarbs: "Carbs",
      colTags: "Features",
      noResults: "No items found matching your filter.",
    },
    zh: {
      tag: "营养与热量透明公开",
      title: "能量与宏观营养素表 (КБЖУ)",
      desc: "便捷的营养成分查询与健康筛选工具。",
      disclaimerTitle: "营养数据测试展示（待客户最终审核确认）",
      disclaimerDesc: "下表展示之卡路里及蛋白质/脂肪/碳水数据为演示参数，正式上线前将按客户经核准之标准配方表全面更新。",
      searchPlaceholder: "搜索单品（例如：拉夫、抹茶、可颂）...",
      colName: "出品名称",
      colVolume: "分量",
      colCal: "热量 (测试值)",
      colProt: "蛋白质",
      colFat: "脂肪",
      colCarbs: "碳水",
      colTags: "特色标签",
      noResults: "未找到符合条件的单品，请尝试其他关键词。",
    },
  }[language];

  return (
    <section id="nutrition" className="relative py-24 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
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
            <Flame className="h-3.5 w-3.5" />
            <span>{t.tag}</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            {t.title}
          </h2>
          <p style={{ color: "var(--theme-muted)" }} className="mt-4 text-base sm:text-lg">
            {t.desc}
          </p>

          {/* CRITICAL DISCLAIMER BANNER */}
          <div
            style={{
              backgroundColor: "var(--theme-badge-bg)",
              borderColor: "var(--theme-primary)",
            }}
            className="mt-6 rounded-2xl border p-4 text-left shadow-sm flex items-start gap-3"
          >
            <AlertTriangle className="h-5 w-5 shrink-0 text-[var(--theme-primary)] mt-0.5" />
            <div>
              <div style={{ color: "var(--theme-primary)" }} className="text-xs font-bold uppercase tracking-wider">
                {t.disclaimerTitle}
              </div>
              <p style={{ color: "var(--theme-muted)" }} className="mt-1 text-xs leading-relaxed">
                {t.disclaimerDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-surface-border)",
          }}
          className="mt-10 flex flex-col gap-4 rounded-2xl border p-4 sm:p-6 shadow-md backdrop-blur-xl transition-all duration-500"
        >
          {/* Search Input */}
          <div className="relative">
            <Search style={{ color: "var(--theme-muted)" }} className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              style={{
                backgroundColor: "var(--theme-surface-elevated)",
                borderColor: "var(--theme-surface-border)",
                color: "var(--theme-text)",
              }}
              className="w-full rounded-xl border pl-11 pr-4 py-3 text-sm outline-none transition-colors focus:border-[var(--theme-primary)]"
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
                    style={{
                      backgroundColor: isActive ? "var(--theme-primary)" : "var(--theme-surface-elevated)",
                      color: isActive ? "#FFFFFF" : "var(--theme-muted)",
                    }}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
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
                    style={{
                      backgroundColor: isChipActive ? "var(--theme-badge-bg)" : "transparent",
                      borderColor: isChipActive ? "var(--theme-primary)" : "var(--theme-surface-border)",
                      color: isChipActive ? "var(--theme-primary)" : "var(--theme-muted)",
                    }}
                    className="rounded-lg border px-2.5 py-1 text-xs transition-all font-medium"
                  >
                    {qf.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
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
              className="border-b border-black/5 dark:border-white/5 uppercase tracking-wider font-semibold"
            >
              <tr>
                <th className="px-6 py-4">{t.colName}</th>
                <th className="px-4 py-4">{t.colVolume}</th>
                <th
                  onClick={() => toggleSort("calories")}
                  className="px-4 py-4 cursor-pointer text-[var(--theme-primary)] transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{t.colCal}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("protein")}
                  className="px-4 py-4 cursor-pointer hover:opacity-100 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{t.colProt}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("fat")}
                  className="px-4 py-4 cursor-pointer hover:opacity-100 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{t.colFat}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("carbs")}
                  className="px-4 py-4 cursor-pointer hover:opacity-100 transition-colors"
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
                    className="transition-colors hover:bg-black/5 dark:hover:bg-white/5 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name[language]}
                          className="h-10 w-10 rounded-lg object-cover border border-black/10 dark:border-white/10"
                        />
                        <div>
                          <div className="font-bold text-sm group-hover:text-[var(--theme-primary)] transition-colors">
                            {item.name[language]}
                          </div>
                          <div style={{ color: "var(--theme-muted)" }} className="text-[11px]">{item.price} ₽</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "var(--theme-muted)" }} className="px-4 py-4 font-mono">{item.volume}</td>
                    <td style={{ color: "var(--theme-primary)" }} className="px-4 py-4 font-bold text-sm">
                      {item.nutrition.calories} <span style={{ color: "var(--theme-muted)" }} className="text-[10px] font-normal">ккал</span>
                    </td>
                    <td className="px-4 py-4 font-mono font-medium">{item.nutrition.protein} г</td>
                    <td className="px-4 py-4 font-mono font-medium">{item.nutrition.fat} г</td>
                    <td className="px-4 py-4 font-mono font-medium">{item.nutrition.carbs} г</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tg, i) => (
                          <span
                            key={i}
                            style={{
                              backgroundColor: "var(--theme-surface-elevated)",
                              color: "var(--theme-muted)",
                            }}
                            className="rounded-md px-2 py-0.5 text-[10px]"
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
                  <td colSpan={7} style={{ color: "var(--theme-muted)" }} className="px-6 py-12 text-center text-sm">
                    {t.noResults}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
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
                      <span>{item.volume}</span>
                      <span style={{ color: "var(--theme-primary)" }} className="font-bold">{item.price} ₽</span>
                    </div>
                  </div>
                </div>

                <div
                  style={{ backgroundColor: "var(--theme-surface-elevated)" }}
                  className="mt-3 grid grid-cols-4 gap-1.5 rounded-xl p-2 text-center"
                >
                  <div>
                    <div style={{ color: "var(--theme-primary)" }} className="font-bold">{item.nutrition.calories}</div>
                    <div style={{ color: "var(--theme-muted)" }} className="text-[9px]">ккал (демо)</div>
                  </div>
                  <div>
                    <div className="font-bold">{item.nutrition.protein}г</div>
                    <div style={{ color: "var(--theme-muted)" }} className="text-[9px]">Белки</div>
                  </div>
                  <div>
                    <div className="font-bold">{item.nutrition.fat}г</div>
                    <div style={{ color: "var(--theme-muted)" }} className="text-[9px]">Жиры</div>
                  </div>
                  <div>
                    <div className="font-bold">{item.nutrition.carbs}г</div>
                    <div style={{ color: "var(--theme-muted)" }} className="text-[9px]">Углев.</div>
                  </div>
                </div>
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
