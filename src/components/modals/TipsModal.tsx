"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { LOCATIONS } from "@/data/coffeeData";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import confetti from "canvas-confetti";

export const TipsModal: React.FC = () => {
  const { isTipsModalOpen, closeTipsModal, selectedLocationId, setSelectedLocationId, language } = useApp();
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isSent, setIsSent] = useState<boolean>(false);

  if (!isTipsModalOpen) return null;

  const activeLoc = LOCATIONS.find((l) => l.id === selectedLocationId) || LOCATIONS[0];
  const amounts = [100, 200, 300, 500];

  const t = {
    ru: {
      tag: "Благодарность бариста",
      title: "Чаевые смене",
      desc: "Поблагодарите бариста за идеальную чашку и улыбку.",
      locLabel: "Кофейня",
      amtLabel: "Сумма благодарности",
      customPlaceholder: "Или введите свою сумму (₽)",
      sendBtnPrefix: "Отправить",
      gatewayNotice: "Перевод осуществляется через СБП / sbtips.ru (Точка:",
      thankTitle: "Спасибо за теплоту!",
      thankDesc: "Перенаправляем вас на защищенную страницу оплаты sbtips.ru для точки",
      proceedToPay: "Перейти к оплате",
      closeBtn: "Закрыть",
      currency: "₽",
    },
    en: {
      tag: "Barista Appreciation",
      title: "Tip the Shift",
      desc: "Show appreciation to the baristas for your perfect cup and warm smile.",
      locLabel: "Space Location",
      amtLabel: "Appreciation Amount",
      customPlaceholder: "Or enter custom amount...",
      sendBtnPrefix: "Send",
      gatewayNotice: "Processed securely via sbtips (Location:",
      thankTitle: "Thank you for your warmth!",
      thankDesc: "Redirecting to the secure sbtips payment gateway for",
      proceedToPay: "Proceed to Payment",
      closeBtn: "Close",
      currency: "RUB",
    },
    zh: {
      tag: "致谢咖啡师",
      title: "打赏当班团队",
      desc: "为咖啡师的用心调制与温暖微笑送上一份心意。",
      locLabel: "选择门店",
      amtLabel: "打赏金额",
      customPlaceholder: "或输入自定义金额...",
      sendBtnPrefix: "确认打赏",
      gatewayNotice: "通过安全通道直接转付当班团队（门店：",
      thankTitle: "感谢您的温暖与支持！",
      thankDesc: "正在为您跳转至安全支付页面（门店：",
      proceedToPay: "前往支付",
      closeBtn: "关闭",
      currency: "₽",
    },
  }[language];

  const activeLocShort = activeLoc.shortNameI18n?.[language] || activeLoc.shortName;

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
                  {t.tag}
                </span>
              </div>

              <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-bold">
                {t.title}
              </h3>
              <p style={{ color: "var(--theme-muted)" }} className="mt-1.5 text-sm">
                {t.desc}
              </p>

              {/* Location Select with strict min-w-0 and truncation */}
              <div className="mt-5">
                <label style={{ color: "var(--theme-muted)" }} className="text-xs font-bold uppercase tracking-wider">
                  {t.locLabel}
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2.5">
                  {LOCATIONS.map((loc) => {
                    const isSelected = loc.id === selectedLocationId;
                    const locShort = loc.shortNameI18n?.[language] || loc.shortName;
                    const locLandmark = loc.landmarkI18n?.[language] || loc.landmark;

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
                          <span className="font-bold truncate">{locShort}</span>
                          <span
                            style={{ backgroundColor: loc.theme.primaryColor }}
                            className="h-2 w-2 rounded-full shrink-0 ml-1.5"
                          />
                        </div>
                        <span style={{ color: "var(--theme-muted)" }} className="block w-full truncate text-[10px] mt-0.5">
                          {locLandmark}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amount buttons */}
              <div className="mt-5">
                <label style={{ color: "var(--theme-muted)" }} className="text-xs font-bold uppercase tracking-wider">
                  {t.amtLabel}
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
                        {amt} {t.currency}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2.5">
                  <input
                    type="number"
                    placeholder={t.customPlaceholder}
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
                    <span>{t.sendBtnPrefix} {customAmount ? `${customAmount} ${t.currency}` : `${selectedAmount} ${t.currency}`}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </ShimmerButton>

                <p style={{ color: "var(--theme-muted)" }} className="text-center text-[11px]">
                  {t.gatewayNotice} «{activeLocShort}»)
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
                {t.thankTitle}
              </h3>
              <p style={{ color: "var(--theme-muted)" }} className="mt-2 text-sm">
                {t.thankDesc} «{activeLocShort}».
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
                  <span>{t.proceedToPay}</span>
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
                  {t.closeBtn}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
