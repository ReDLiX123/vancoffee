"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { LOCATIONS } from "@/data/coffeeData";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import confetti from "canvas-confetti";

export const TipsModal: React.FC = () => {
  const { isTipsModalOpen, closeTipsModal, selectedLocationId, setSelectedLocationId } = useApp();
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isSent, setIsSent] = useState<boolean>(false);

  if (!isTipsModalOpen) return null;

  const activeLoc = LOCATIONS.find((l) => l.id === selectedLocationId) || LOCATIONS[0];
  const amounts = [100, 200, 300, 500];

  const handleSendTip = () => {
    const finalAmount = customAmount ? parseInt(customAmount, 10) : selectedAmount;
    if (isNaN(finalAmount) || finalAmount <= 0) return;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#A84B2C", "#606C38", "#DDA15E"],
    });

    setIsSent(true);

    setTimeout(() => {
      window.open(activeLoc.sbtipsUrl, "_blank");
    }, 1200);
  };

  const handleReset = () => {
    setIsSent(false);
    setCustomAmount("");
    closeTipsModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeTipsModal}
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
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border p-6 shadow-2xl sm:p-8 z-10"
        >
          {/* Close button */}
          <button
            onClick={closeTipsModal}
            className="absolute right-5 top-5 rounded-full p-2 opacity-60 transition-opacity hover:opacity-100"
          >
            <X className="h-5 w-5" />
          </button>

          {!isSent ? (
            <div className="relative z-10">
              {/* Badge & Title */}
              <div className="flex items-center gap-2">
                <div
                  style={{
                    backgroundColor: "var(--theme-badge-bg)",
                    color: "var(--theme-primary)",
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                >
                  <Heart className="h-5 w-5 fill-current" />
                </div>
                <span style={{ color: "var(--theme-primary)" }} className="text-xs font-bold tracking-wider uppercase">
                  Благодарность бариста
                </span>
              </div>

              <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-bold">
                Чаевые смене
              </h3>
              <p style={{ color: "var(--theme-muted)" }} className="mt-1.5 text-sm">
                Поблагодарите бариста за идеальную чашку и улыбку.
              </p>

              {/* Location Select with strict min-w-0 and truncation */}
              <div className="mt-5">
                <label style={{ color: "var(--theme-muted)" }} className="text-xs font-bold uppercase tracking-wider">
                  Кофейня
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2.5">
                  {LOCATIONS.map((loc) => {
                    const isSelected = loc.id === selectedLocationId;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setSelectedLocationId(loc.id as any)}
                        style={{
                          backgroundColor: isSelected ? "var(--theme-surface-elevated)" : "transparent",
                          borderColor: isSelected ? loc.theme.primaryColor : "var(--theme-surface-border)",
                        }}
                        className="flex flex-col items-start rounded-xl border p-2.5 text-left text-xs transition-all min-w-0 w-full overflow-hidden"
                      >
                        <div className="flex items-center justify-between w-full min-w-0">
                          <span className="font-bold truncate">{loc.shortName}</span>
                          <span
                            style={{ backgroundColor: loc.theme.primaryColor }}
                            className="h-2 w-2 rounded-full shrink-0 ml-1.5"
                          />
                        </div>
                        <span style={{ color: "var(--theme-muted)" }} className="block w-full truncate text-[10px] mt-0.5">
                          {loc.landmark}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amount buttons */}
              <div className="mt-5">
                <label style={{ color: "var(--theme-muted)" }} className="text-xs font-bold uppercase tracking-wider">
                  Сумма благодарности
                </label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {amounts.map((amt) => {
                    const isSelected = !customAmount && selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount("");
                        }}
                        style={{
                          backgroundColor: isSelected ? "var(--theme-primary)" : "var(--theme-surface-elevated)",
                          color: isSelected ? "#FFFFFF" : "var(--theme-text)",
                          borderColor: isSelected ? "var(--theme-primary)" : "var(--theme-surface-border)",
                        }}
                        className="rounded-xl border py-2.5 text-sm font-bold transition-all"
                      >
                        {amt} ₽
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2.5">
                  <input
                    type="number"
                    placeholder="Или введите свою сумму (₽)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    style={{
                      backgroundColor: "var(--theme-surface-elevated)",
                      borderColor: "var(--theme-surface-border)",
                      color: "var(--theme-text)",
                    }}
                    className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--theme-primary)]"
                  />
                </div>
              </div>

              {/* CTA Submit */}
              <div className="mt-6 flex flex-col gap-2.5">
                <ShimmerButton
                  onClick={handleSendTip}
                  className="w-full py-3.5 text-base font-bold"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Heart className="h-4 w-4 fill-current" />
                    <span>Отправить {customAmount ? `${customAmount} ₽` : `${selectedAmount} ₽`}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </ShimmerButton>

                <p style={{ color: "var(--theme-muted)" }} className="text-center text-[11px]">
                  Перевод осуществляется через СБП / sbtips.ru (Точка: «{activeLoc.shortName}»)
                </p>
              </div>
            </div>
          ) : (
            <div className="relative z-10 py-6 text-center">
              <div
                style={{
                  backgroundColor: "var(--theme-badge-bg)",
                  color: "var(--theme-primary)",
                }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              >
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold">
                Спасибо за теплоту!
              </h3>
              <p style={{ color: "var(--theme-muted)" }} className="mt-2 text-sm">
                Перенаправляем вас на защищенную страницу оплаты sbtips.ru для точки «{activeLoc.shortName}».
              </p>

              <div className="mt-6 flex justify-center gap-3">
                <a
                  href={activeLoc.sbtipsUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: "var(--theme-primary)",
                    color: "#FFFFFF",
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold transition-transform hover:scale-105"
                >
                  <span>Перейти к оплате</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={handleReset}
                  style={{
                    backgroundColor: "var(--theme-surface-elevated)",
                    borderColor: "var(--theme-surface-border)",
                  }}
                  className="rounded-xl border px-5 py-2.5 text-xs font-semibold"
                >
                  Закрыть
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
