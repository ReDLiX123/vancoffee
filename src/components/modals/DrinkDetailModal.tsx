"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Check, Info } from "lucide-react";
import { MenuItem, LOCATIONS } from "@/data/coffeeData";
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
  onViewInNutrition,
}) => {
  if (!item) return null;

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
                {item.price} ₽
              </div>
            </div>

            <p style={{ color: "var(--theme-muted)" }} className="mt-1 text-xs font-medium">{item.volume}</p>

            {/* Description */}
            <p style={{ color: "var(--theme-muted)" }} className="mt-4 text-sm leading-relaxed">
              {item.description[language]}
            </p>

            {/* Taste Notes */}
            {item.tasteNotes && item.tasteNotes.length > 0 && (
              <div className="mt-5">
                <span
                  style={{ color: "var(--theme-primary)" }}
                  className="text-xs font-bold uppercase tracking-wider"
                >
                  Дескрипторы вкуса
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
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

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
                  Энергетическая ценность
                </span>
                <span style={{ color: "var(--theme-muted)" }} className="text-xs">на порцию ({item.nutrition.weightG} г/мл)</span>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                <div
                  style={{ backgroundColor: "var(--theme-surface)" }}
                  className="rounded-xl p-2.5 shadow-xs border border-black/5 dark:border-white/5"
                >
                  <div style={{ color: "var(--theme-primary)" }} className="text-base font-bold">{item.nutrition.calories}</div>
                  <div style={{ color: "var(--theme-muted)" }} className="text-[10px]">ккал</div>
                </div>
                <div
                  style={{ backgroundColor: "var(--theme-surface)" }}
                  className="rounded-xl p-2.5 shadow-xs border border-black/5 dark:border-white/5"
                >
                  <div className="text-base font-bold">{item.nutrition.protein} г</div>
                  <div style={{ color: "var(--theme-muted)" }} className="text-[10px]">Белки</div>
                </div>
                <div
                  style={{ backgroundColor: "var(--theme-surface)" }}
                  className="rounded-xl p-2.5 shadow-xs border border-black/5 dark:border-white/5"
                >
                  <div className="text-base font-bold">{item.nutrition.fat} г</div>
                  <div style={{ color: "var(--theme-muted)" }} className="text-[10px]">Жиры</div>
                </div>
                <div
                  style={{ backgroundColor: "var(--theme-surface)" }}
                  className="rounded-xl p-2.5 shadow-xs border border-black/5 dark:border-white/5"
                >
                  <div className="text-base font-bold">{item.nutrition.carbs} г</div>
                  <div style={{ color: "var(--theme-muted)" }} className="text-[10px]">Углеводы</div>
                </div>
              </div>
            </div>

            {/* Available in locations */}
            <div className="mt-5">
              <span style={{ color: "var(--theme-muted)" }} className="text-xs font-bold uppercase tracking-wider">
                Где заказать в Иркутске:
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                {LOCATIONS.map((loc) => {
                  const isAvailable = item.availableLocations.includes(loc.id as any);
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
                      <span className="truncate">{loc.shortName}</span>
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
                  backgroundColor: "var(--theme-primary)",
                  color: "#FFFFFF",
                }}
                className="rounded-xl px-5 py-2 text-xs font-bold hover:scale-105 shadow-md"
              >
                Закрыть
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
