"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Coffee, Sparkles, ExternalLink, CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { LOCATIONS } from "@/data/coffeeData";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import confetti from "canvas-confetti";

export const TipsModal: React.FC = () => {
  const { isTipsModalOpen, closeTipsModal, selectedLocationId, setSelectedLocationId } = useApp();
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
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
      colors: ["#D49B45", "#F3CA74", "#FAF7F2", "#14283D"],
    });

    setIsSent(true);

    // Open direct payment link in background or redirect
    setTimeout(() => {
      window.open(activeLoc.sbtipsUrl, "_blank");
    }, 1200);
  };

  const handleReset = () => {
    setIsSent(false);
    setMessage("");
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
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#D49B45]/30 bg-[#16120F] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] sm:p-8"
        >
          {/* Header subtle glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-[#D49B45]/15 blur-3xl" />

          {/* Close button */}
          <button
            onClick={closeTipsModal}
            className="absolute right-5 top-5 rounded-full p-2 text-[#A89B8D] transition-colors hover:bg-white/5 hover:text-[#FAF7F2]"
          >
            <X className="h-5 w-5" />
          </button>

          {!isSent ? (
            <div className="relative z-10">
              {/* Badge & Title */}
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D49B45]/30 bg-[#D49B45]/10 text-[#F3CA74]">
                  <Heart className="h-5 w-5 fill-[#F3CA74]/20" />
                </div>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#D49B45]">
                  Благодарность команде
                </span>
              </div>

              <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-[#FAF7F2]">
                Чаевые бариста
              </h3>
              <p className="mt-1.5 text-sm text-[#A89B8D]">
                Каждая улыбка и чашка кофе создаются вручную. Поблагодарите бариста за тепло и мастерство.
              </p>

              {/* Location Select */}
              <div className="mt-5">
                <label className="text-xs font-medium text-[#A89B8D] uppercase tracking-wider">
                  Кофейня
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-2">
                  {LOCATIONS.map((loc) => {
                    const isSelected = loc.id === selectedLocationId;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setSelectedLocationId(loc.id as any)}
                        className={`flex flex-col items-start rounded-xl border p-2.5 text-left text-xs transition-all ${
                          isSelected
                            ? "border-[#D49B45] bg-[#D49B45]/15 text-[#FAF7F2] shadow-[0_0_15px_rgba(212,155,69,0.15)]"
                            : "border-white/10 bg-[#1D1714] text-[#A89B8D] hover:border-white/20 hover:text-[#FAF7F2]"
                        }`}
                      >
                        <span className="font-semibold text-white">{loc.shortName}</span>
                        <span className="truncate text-[10px] text-[#A89B8D]">
                          {loc.landmark}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amount buttons */}
              <div className="mt-5">
                <label className="text-xs font-medium text-[#A89B8D] uppercase tracking-wider">
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
                        className={`rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                          isSelected
                            ? "border-[#D49B45] bg-[#D49B45] text-[#0C0A09] shadow-[0_0_15px_rgba(212,155,69,0.3)]"
                            : "border-white/10 bg-[#1D1714] text-[#FAF7F2] hover:border-[#D49B45]/40"
                        }`}
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
                    className="w-full rounded-xl border border-white/10 bg-[#1D1714] px-4 py-2.5 text-sm text-[#FAF7F2] placeholder-[#70655B] outline-none transition-colors focus:border-[#D49B45]"
                  />
                </div>
              </div>

              {/* Message field */}
              <div className="mt-4">
                <label className="text-xs font-medium text-[#A89B8D] uppercase tracking-wider">
                  Теплые слова (по желанию)
                </label>
                <input
                  type="text"
                  placeholder="«Спасибо за невероятный раф и настроение!»"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#1D1714] px-4 py-2.5 text-sm text-[#FAF7F2] placeholder-[#70655B] outline-none transition-colors focus:border-[#D49B45]"
                />
              </div>

              {/* CTA Submit */}
              <div className="mt-6 flex flex-col gap-2.5">
                <ShimmerButton
                  onClick={handleSendTip}
                  className="w-full py-3.5 text-base font-semibold"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>Отправить {customAmount ? `${customAmount} ₽` : `${selectedAmount} ₽`}</span>
                    <Sparkles className="h-4 w-4 text-[#F3CA74]" />
                  </div>
                </ShimmerButton>

                <p className="text-center text-[11px] text-[#70655B]">
                  Перевод осуществляется через СБП / sbtips.ru без комиссии
                </p>
              </div>
            </div>
          ) : (
            <div className="relative z-10 py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#D49B45]/40 bg-[#D49B45]/15 text-[#F3CA74]">
                <CheckCircle2 className="h-8 w-8 text-[#F3CA74]" />
              </div>
              <h3 className="mt-4 font-serif text-2xl font-semibold text-[#FAF7F2]">
                Спасибо за теплоту!
              </h3>
              <p className="mt-2 text-sm text-[#A89B8D]">
                Перенаправляем вас на защищенную страницу оплаты sbtips.ru для точки «{activeLoc.shortName}».
              </p>

              <div className="mt-6 flex justify-center gap-3">
                <a
                  href={activeLoc.sbtipsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#D49B45] bg-[#D49B45] px-5 py-2.5 text-xs font-semibold text-[#0C0A09] transition-transform hover:scale-105"
                >
                  <span>Перейти к оплате</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-white/10 bg-[#1D1714] px-5 py-2.5 text-xs text-[#FAF7F2] hover:bg-white/5"
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
