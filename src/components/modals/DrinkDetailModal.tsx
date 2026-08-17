"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Check, Leaf, ShieldCheck, Award, ChefHat } from "lucide-react";
import { MenuItem, LOCATIONS, getLocalizedTasteNote } from "@/data/coffeeData";
import { Language } from "@/context/AppContext";

interface DrinkDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  language: Language;
  onViewInNutrition?: (itemId: string) => void;
}

export const DrinkDetailModal: React.FC<DrinkDetailModalProps> = ({
  item,
  onClose,
  language,
}) => {
  if (!item) return null;

  const t = {
    ru: {
      priceCurrency: "₽",
      tagVegan: "Vegan / Растительное",
      tagSugarFree: "Без сахара",
      tagSpecialty: "Спешелти 100%",
      tagChefPick: "Выбор шефа",
      tagNoAllergens: "Без аллергенов",
      tasteNotesLabel: "Дескрипторы вкуса",
      energyTitle: "Энергетическая ценность",
      perServing: "на порцию",
      unitWeight: "г/мл",
      unitG: "г",
      unitCal: "ккал",
      protLabel: "Белки",
      fatLabel: "Жиры",
      carbsLabel: "Углеводы",
      whereToOrder: "Где заказать в Иркутске:",
      closeBtn: "Закрыть",
    },
    en: {
      priceCurrency: "RUB",
      tagVegan: "Plant-based / Vegan",
      tagSugarFree: "Sugar-Free",
      tagSpecialty: "100% Specialty Arabica",
      tagChefPick: "Chef's Pick",
      tagNoAllergens: "Allergen Free",
      tasteNotesLabel: "Flavor Descriptors",
      energyTitle: "Nutritional Value",
      perServing: "per serving",
      unitWeight: "g/ml",
      unitG: "g",
      unitCal: "kcal",
      protLabel: "Protein",
      fatLabel: "Fat",
      carbsLabel: "Carbs",
      whereToOrder: "Available in Irkutsk spaces:",
      closeBtn: "Close",
    },
    zh: {
      priceCurrency: "₽",
      tagVegan: "纯素 / 植物基",
      tagSugarFree: "无添加糖",
      tagSpecialty: "100% 精品阿拉比卡",
      tagChefPick: "主厨推荐",
      tagNoAllergens: "低敏配方",
      tasteNotesLabel: "风味特征与风味轮",
      energyTitle: "能量与宏观营养指标",
      perServing: "每份含量",
      unitWeight: "克/毫升",
      unitG: "克",
      unitCal: "千卡",
      protLabel: "蛋白质",
      fatLabel: "脂肪",
      carbsLabel: "碳水化合物",
      whereToOrder: "伊尔库茨克供应门店：",
      closeBtn: "关闭",
    },
  }[language];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-surface-border)",
            color: "var(--theme-text)",
          }}
          className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border shadow-2xl z-10"
        >
          {/* Header Image */}
          <div className="relative h-64 w-full overflow-hidden sm:h-72 bg-black/20">
            <img
              src={item.image}
              alt={item.name[language]}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/90"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Badge */}
            {item.badge && (
              <div className="absolute left-6 bottom-4 rounded-full border border-white/30 bg-black/60 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                {item.badge[language]}
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8">
            {/* Title & Price */}
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                {item.name[language]}
              </h3>
              <div style={{ color: "var(--theme-primary)" }} className="text-xl font-bold">
                {item.price} {t.priceCurrency}
              </div>
            </div>

            <p style={{ color: "var(--theme-muted)" }} className="mt-1 text-xs font-medium">{item.volume}</p>

            {/* Description */}
            <p style={{ color: "var(--theme-muted)" }} className="mt-4 text-sm leading-relaxed">
              {item.description[language]}
            </p>

            {/* Tags & Taste Notes */}
            <div className="mt-5 space-y-3">
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tg, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: "var(--theme-surface-elevated)",
                        borderColor: "var(--theme-surface-border)",
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium"
                    >
                      {tg === "vegan" ? (
                        <>
                          <Leaf className="h-3 w-3 text-emerald-500" />
                          <span>{t.tagVegan}</span>
                        </>
                      ) : tg === "sugar_free" ? (
                        <>
                          <ShieldCheck className="h-3 w-3 text-sky-500" />
                          <span>{t.tagSugarFree}</span>
                        </>
                      ) : tg === "specialty" ? (
                        <>
                          <Award className="h-3 w-3 text-amber-500" />
                          <span>{t.tagSpecialty}</span>
                        </>
                      ) : tg === "chef_pick" ? (
                        <>
                          <ChefHat className="h-3 w-3 text-rose-500" />
                          <span>{t.tagChefPick}</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="h-3 w-3 text-indigo-500" />
                          <span>{t.tagNoAllergens}</span>
                        </>
                      )}
                    </span>
                  ))}
                </div>
              )}

              {item.tasteNotes && item.tasteNotes.length > 0 && (
                <div>
                  <span
                    style={{ color: "var(--theme-primary)" }}
                    className="text-xs font-bold uppercase tracking-wider"
                  >
                    {t.tasteNotesLabel}
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.tasteNotes.map((note, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: "var(--theme-badge-bg)",
                          color: "var(--theme-primary)",
                        }}
                        className="rounded-lg px-2.5 py-1 text-xs font-medium"
                      >
                        {getLocalizedTasteNote(note, language)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* KBJU Breakdown */}
            <div
              style={{
                backgroundColor: "var(--theme-surface-elevated)",
                borderColor: "var(--theme-surface-border)",
              }}
              className="mt-6 rounded-2xl border p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  <Flame style={{ color: "var(--theme-primary)" }} className="h-4 w-4" />
                  {t.energyTitle}
                </span>
                <span style={{ color: "var(--theme-muted)" }} className="text-xs">{t.perServing} ({item.nutrition.weightG} {t.unitWeight})</span>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                <div
                  style={{ backgroundColor: "var(--theme-surface)" }}
                  className="rounded-xl p-2.5 shadow-xs border border-black/5 dark:border-white/5"
                >
                  <div style={{ color: "var(--theme-primary)" }} className="text-base font-bold">{item.nutrition.calories}</div>
                  <div style={{ color: "var(--theme-muted)" }} className="text-[10px]">{t.unitCal}</div>
                </div>
                <div
                  style={{ backgroundColor: "var(--theme-surface)" }}
                  className="rounded-xl p-2.5 shadow-xs border border-black/5 dark:border-white/5"
                >
                  <div className="text-base font-bold">{item.nutrition.protein} {t.unitG}</div>
                  <div style={{ color: "var(--theme-muted)" }} className="text-[10px]">{t.protLabel}</div>
                </div>
                <div
                  style={{ backgroundColor: "var(--theme-surface)" }}
                  className="rounded-xl p-2.5 shadow-xs border border-black/5 dark:border-white/5"
                >
                  <div className="text-base font-bold">{item.nutrition.fat} {t.unitG}</div>
                  <div style={{ color: "var(--theme-muted)" }} className="text-[10px]">{t.fatLabel}</div>
                </div>
                <div
                  style={{ backgroundColor: "var(--theme-surface)" }}
                  className="rounded-xl p-2.5 shadow-xs border border-black/5 dark:border-white/5"
                >
                  <div className="text-base font-bold">{item.nutrition.carbs} {t.unitG}</div>
                  <div style={{ color: "var(--theme-muted)" }} className="text-[10px]">{t.carbsLabel}</div>
                </div>
              </div>
            </div>

            {/* Available in locations */}
            <div className="mt-5">
              <span style={{ color: "var(--theme-muted)" }} className="text-xs font-bold uppercase tracking-wider">
                {t.whereToOrder}
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                {LOCATIONS.map((loc) => {
                  const isAvailable = item.availableLocations.includes(loc.id as any);
                  const locShort = loc.shortNameI18n?.[language] || loc.shortName;
                  return (
                    <div
                      key={loc.id}
                      style={{
                        backgroundColor: isAvailable ? "var(--theme-badge-bg)" : "var(--theme-surface-elevated)",
                        borderColor: isAvailable ? "var(--theme-primary)" : "var(--theme-surface-border)",
                        opacity: isAvailable ? 1 : 0.4,
                      }}
                      className={`flex items-center gap-2 rounded-xl border p-2.5 ${
                        isAvailable ? "font-semibold" : "line-through"
                      }`}
                    >
                      <Check className={`h-3.5 w-3.5 ${isAvailable ? "text-[var(--theme-primary)]" : "opacity-0"}`} />
                      <span className="truncate">{locShort}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex justify-end gap-3 border-t border-black/5 dark:border-white/5 pt-4">
              <button
                onClick={onClose}
                style={{
                  backgroundColor: "var(--theme-btn-bg, var(--theme-primary))",
                  color: "var(--theme-btn-text, #FFFFFF)",
                }}
                className="rounded-xl px-5 py-2 text-xs font-bold hover:scale-105 shadow-md transition-transform"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
