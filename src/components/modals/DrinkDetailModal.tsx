"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Flame, ShieldAlert, Check } from "lucide-react";
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
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-[#D49B45]/30 bg-[#16120F] shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
        >
          {/* Header Image */}
          <div className="relative h-64 w-full overflow-hidden sm:h-72">
            <img
              src={item.image}
              alt={item.name[language]}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#16120F] via-[#16120F]/40 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Badge */}
            {item.badge && (
              <div className="absolute left-6 bottom-4 rounded-full border border-[#D49B45]/50 bg-[#D49B45]/20 px-3.5 py-1 text-xs font-semibold text-[#F3CA74] backdrop-blur-md">
                {item.badge[language]}
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8">
            {/* Title & Price */}
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#FAF7F2]">
                {item.name[language]}
              </h3>
              <div className="text-xl font-bold text-[#F3CA74]">{item.price} ₽</div>
            </div>

            <p className="mt-1 text-xs font-medium text-[#A89B8D]">{item.volume}</p>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-[#D4C8BC]">
              {item.description[language]}
            </p>

            {/* Taste Notes */}
            {item.tasteNotes && item.tasteNotes.length > 0 && (
              <div className="mt-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D49B45]">
                  Дескрипторы вкуса
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.tasteNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-[#D49B45]/20 bg-[#221A15] px-2.5 py-1 text-xs text-[#F3CA74]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* KBJU Breakdown */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#1D1714] p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
                  <Flame className="h-4 w-4 text-[#D49B45]" />
                  Энергетическая ценность
                </span>
                <span className="text-xs text-[#A89B8D]">на порцию ({item.nutrition.weightG} г/мл)</span>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                <div className="rounded-xl bg-white/5 p-2.5">
                  <div className="text-base font-bold text-[#F3CA74]">{item.nutrition.calories}</div>
                  <div className="text-[10px] text-[#A89B8D]">ккал</div>
                </div>
                <div className="rounded-xl bg-white/5 p-2.5">
                  <div className="text-base font-bold text-white">{item.nutrition.protein} г</div>
                  <div className="text-[10px] text-[#A89B8D]">Белки</div>
                </div>
                <div className="rounded-xl bg-white/5 p-2.5">
                  <div className="text-base font-bold text-white">{item.nutrition.fat} г</div>
                  <div className="text-[10px] text-[#A89B8D]">Жиры</div>
                </div>
                <div className="rounded-xl bg-white/5 p-2.5">
                  <div className="text-base font-bold text-white">{item.nutrition.carbs} г</div>
                  <div className="text-[10px] text-[#A89B8D]">Углеводы</div>
                </div>
              </div>
            </div>

            {/* Available in locations */}
            <div className="mt-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A89B8D]">
                Где попробовать в Иркутске:
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                {LOCATIONS.map((loc) => {
                  const isAvailable = item.availableLocations.includes(loc.id as any);
                  return (
                    <div
                      key={loc.id}
                      className={`flex items-center gap-2 rounded-xl border p-2.5 ${
                        isAvailable
                          ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
                          : "border-white/5 bg-white/[0.02] text-[#70655B] line-through"
                      }`}
                    >
                      <Check className={`h-3.5 w-3.5 ${isAvailable ? "text-emerald-400" : "opacity-0"}`} />
                      <span className="font-medium">{loc.shortName}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex justify-end gap-3 border-t border-white/10 pt-4">
              {onViewInNutrition && (
                <button
                  onClick={() => {
                    onClose();
                    onViewInNutrition(item.id);
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-[#FAF7F2] hover:bg-white/10"
                >
                  Сравнить в таблице КБЖУ
                </button>
              )}
              <button
                onClick={onClose}
                className="rounded-xl border border-[#D49B45] bg-[#D49B45] px-5 py-2 text-xs font-semibold text-[#0C0A09] hover:scale-105"
              >
                Понятно
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
