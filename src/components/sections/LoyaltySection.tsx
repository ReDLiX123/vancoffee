"use client";

import React, { useState } from "react";
import { LOYALTY_TIERS } from "@/data/coffeeData";
import { useApp } from "@/context/AppContext";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { BorderBeam } from "@/components/ui/BorderBeam";
import {
  Gift,
  CheckCircle2,
  Smartphone,
  Zap,
  Coffee,
} from "lucide-react";
import confetti from "canvas-confetti";

export const LoyaltySection: React.FC = () => {
  const { language } = useApp();
  const [activeTier, setActiveTier] = useState<number>(0);
  const [monthlyCups, setMonthlyCups] = useState<number>(20);
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [phoneInput, setPhoneInput] = useState<string>("");

  const averageCupPrice = 320;
  const currentTier = LOYALTY_TIERS[activeTier];
  const monthlySpend = monthlyCups * averageCupPrice;
  const yearlyCashback = Math.round(monthlySpend * 12 * (currentTier.cashback / 100));
  const freeCupsYear = Math.floor(yearlyCashback / averageCupPrice);

  const presets = [10, 20, 30, 45, 60];

  const getConsumptionStatus = (cups: number) => {
    if (language === "ru") {
      if (cups <= 12) return "Редкий гость (~1-2 чашки в неделю)";
      if (cups <= 24) return "Стандартный ритм (~1 чашка в день)";
      if (cups <= 39) return "Любитель кофе (~1-2 чашки в день)";
      return "Кофейный гурман (2+ чашки каждый день)";
    }
    if (language === "en") {
      if (cups <= 12) return "Occasional Visitor (~1-2 cups / week)";
      if (cups <= 24) return "Daily Habit (~1 cup / day)";
      if (cups <= 39) return "Coffee Enthusiast (~1-2 cups / day)";
      return "True Connoisseur (2+ cups every day)";
    }
    if (cups <= 12) return "偶尔品饮（约每周 1-2 杯）";
    if (cups <= 24) return "日常习惯（约每日 1 杯）";
    if (cups <= 39) return "咖啡爱好者（约每日 1-2 杯）";
    return "重度咖啡达人（每日 2 杯以上）";
  };

  const handleJoinClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput || phoneInput.length < 10) return;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#A84B2C", "#606C38", "#DDA15E"],
    });

    setIsJoined(true);
  };

  const t = {
    ru: {
      tag: "Программа лояльности",
      title: "Vincent Van Club",
      desc: "Цифровая карта привилегий для гостей сети кофеен Vincent Van Coffee в Иркутске.",
      tierPrefix: "Уровень",
      cashbackSuffix: "Кэшбэк",
      immediatelyAfterReg: "Сразу после регистрации",
      spendThresholdPrefix: "Порог покупок от",
      selectedForCalc: "Выбран для расчета",
      clickToSelect: "Нажмите для выбора",
      calcTitle: "Калькулятор прогнозируемой выгоды",
      calcCups: "Сколько чашек кофе вы выпиваете в месяц?",
      calcResultYear: "Прогнозируемая экономия в год:",
      calcFreeCups: "Бесплатных чашек авторского кофе в год",
      joinTitle: "Оформить электронную карту",
      joinSub: "Получите карту лояльности в Apple Wallet или Google Wallet прямо сейчас.",
      phonePlaceholder: "+7 (999) 000-00-00",
      joinBtn: "Оформить карту",
      congrats: "Карта успешно выпущена!",
      congratsSub: "Электронная карта активирована. Приятных визитов в Vincent Van Coffee!",
      presetsLabel: "Пресеты:",
      cupsSuffix: "чашек",
      cupsMonthSuffix: "чашек/мес",
      currencySymbol: "₽",
    },
    en: {
      tag: "Loyalty Program",
      title: "Vincent Van Club",
      desc: "Digital guest pass and rewards framework for coffee lovers in Irkutsk.",
      tierPrefix: "Tier",
      cashbackSuffix: "Cashback",
      immediatelyAfterReg: "Immediately upon registration",
      spendThresholdPrefix: "Spend threshold from",
      selectedForCalc: "Selected for calculation",
      clickToSelect: "Click to select",
      calcTitle: "Calculate Your Annual Perks",
      calcCups: "How many cups of coffee do you enjoy monthly?",
      calcResultYear: "Projected annual value:",
      calcFreeCups: "Complimentary cups per year",
      joinTitle: "Get Your Digital Pass",
      joinSub: "Add your personal coffee pass to Apple Wallet or Google Wallet.",
      phonePlaceholder: "+7 (999) 000-00-00",
      joinBtn: "Get Digital Pass",
      congrats: "Pass Successfully Issued!",
      congratsSub: "Your digital pass is active. Enjoy your visits to Vincent Van Coffee!",
      presetsLabel: "Presets:",
      cupsSuffix: "cups",
      cupsMonthSuffix: "cups/mo",
      currencySymbol: "RUB",
    },
    zh: {
      tag: "会员俱乐部",
      title: "凡高艺术咖啡俱乐部",
      desc: "为伊尔库茨克咖啡常客量身打造的专属数字化会员特权体系。",
      tierPrefix: "等级",
      cashbackSuffix: "返现",
      immediatelyAfterReg: "注册即可直接享有",
      spendThresholdPrefix: "累计消费达",
      selectedForCalc: "已选定测算",
      clickToSelect: "点击选择此级别",
      calcTitle: "会员收益模拟测算",
      calcCups: "您每月大约品饮多少杯咖啡？",
      calcResultYear: "预计全年为您节省：",
      calcFreeCups: "相当于每年获赠咖啡杯数",
      joinTitle: "领取专属电子会员卡",
      joinSub: "即刻开通并添加至 Apple 钱包或 Google 钱包。",
      phonePlaceholder: "+7 (999) 000-00-00",
      joinBtn: "立即开通会员",
      congrats: "会员卡领取成功！",
      congratsSub: "您的电子会员卡已激活，欢迎常来品味艺术咖啡！",
      presetsLabel: "快捷预设:",
      cupsSuffix: "杯",
      cupsMonthSuffix: "杯/月",
      currencySymbol: "₽",
    },
  }[language];

  const currentTierName = currentTier.nameI18n?.[language] || currentTier.name;

  return (
    <section id="loyalty" className="relative py-24 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
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
            <Gift className="h-3.5 w-3.5" />
            <span>{t.tag}</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            {t.title}
          </h2>
          <p style={{ color: "var(--theme-muted)" }} className="mt-4 text-base sm:text-lg">
            {t.desc}
          </p>
        </div>

        {/* 3 Loyalty Tier Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {LOYALTY_TIERS.map((tier, idx) => {
            const isSelected = idx === activeTier;
            const tierName = tier.nameI18n?.[language] || tier.name;
            const tierTagline = tier.taglineI18n?.[language] || tier.tagline;
            const tierPerks = tier.perksI18n?.[language] || tier.perks;

            return (
              <div
                key={tier.id}
                onClick={() => setActiveTier(idx)}
                style={{
                  backgroundColor: isSelected ? "var(--theme-surface-elevated)" : "var(--theme-surface)",
                  borderColor: isSelected ? "var(--theme-primary)" : "var(--theme-surface-border)",
                }}
                className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border p-6 sm:p-8 cursor-pointer transition-all duration-300 shadow-sm ${
                  isSelected ? "shadow-xl scale-[1.02]" : "hover:opacity-100"
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span
                      style={{ color: "var(--theme-primary)" }}
                      className="text-xs font-bold uppercase tracking-widest"
                    >
                      {t.tierPrefix} {idx + 1}
                    </span>
                    <div
                      style={{
                        backgroundColor: "var(--theme-badge-bg)",
                        color: "var(--theme-primary)",
                        borderColor: "var(--theme-surface-border)",
                      }}
                      className="rounded-full border px-3 py-1 text-xs font-bold"
                    >
                      {tier.cashback}% {t.cashbackSuffix}
                    </div>
                  </div>

                  <h3 className="mt-4 font-serif text-2xl font-bold">
                    {tierName}
                  </h3>
                  <p style={{ color: "var(--theme-muted)" }} className="mt-1 text-xs">{tierTagline}</p>

                  {/* Spend condition */}
                  <div
                    style={{
                      backgroundColor: "var(--theme-surface)",
                      borderColor: "var(--theme-surface-border)",
                    }}
                    className="mt-4 rounded-xl p-3 text-xs border"
                  >
                    {tier.spendThreshold === 0 ? (
                      <span>{t.immediatelyAfterReg}</span>
                    ) : (
                      <span>{t.spendThresholdPrefix} <strong>{tier.spendThreshold.toLocaleString()} {t.currencySymbol}</strong></span>
                    )}
                  </div>

                  {/* Perks list */}
                  <div className="mt-6 space-y-2.5 text-xs">
                    {tierPerks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 style={{ color: "var(--theme-primary)" }} className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span style={{ color: "var(--theme-muted)" }} className="text-[11px]">
                    {isSelected ? t.selectedForCalc : t.clickToSelect}
                  </span>
                  <div
                    style={{ backgroundColor: isSelected ? "var(--theme-primary)" : "var(--theme-surface-border)" }}
                    className="h-2.5 w-2.5 rounded-full"
                  />
                </div>

                {isSelected && <BorderBeam size={200} duration={12} colorFrom="var(--theme-primary)" colorTo="var(--theme-accent)" />}
              </div>
            );
          })}
        </div>

        {/* Interactive Cashback & Benefits Calculator */}
        <div
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-surface-border)",
          }}
          className="mt-12 rounded-3xl border p-6 sm:p-10 shadow-xl backdrop-blur-xl transition-all duration-500"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
            {/* Left: Slider & Dynamic presets */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <Zap style={{ color: "var(--theme-primary)" }} className="h-5 w-5" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  {t.calcTitle}
                </h3>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <span style={{ color: "var(--theme-muted)" }} className="text-xs sm:text-sm">{t.calcCups}</span>
                  <span style={{ color: "var(--theme-primary)" }} className="font-serif text-3xl font-bold">
                    {monthlyCups} <span style={{ color: "var(--theme-text)" }} className="text-sm font-normal">{t.cupsMonthSuffix}</span>
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={1}
                  value={monthlyCups}
                  onChange={(e) => setMonthlyCups(parseInt(e.target.value, 10))}
                  style={{ accentColor: "var(--theme-primary)" }}
                  className="mt-4 w-full cursor-pointer h-2.5 rounded-lg"
                />

                {/* Quick Presets Buttons */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span style={{ color: "var(--theme-muted)" }} className="text-[11px] font-semibold mr-1">
                      {t.presetsLabel}
                    </span>
                    {presets.map((count) => {
                      const isPresetActive = monthlyCups === count;
                      return (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setMonthlyCups(count)}
                          style={{
                            backgroundColor: isPresetActive ? "var(--theme-primary)" : "var(--theme-surface-elevated)",
                            borderColor: isPresetActive ? "var(--theme-primary)" : "var(--theme-surface-border)",
                            color: isPresetActive ? "#FFFFFF" : "var(--theme-text)",
                          }}
                          className="rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all hover:scale-105"
                        >
                          {count} {t.cupsSuffix}
                        </button>
                      );
                    })}
                  </div>

                  <span style={{ color: "var(--theme-primary)" }} className="text-[11px] font-bold">
                    {getConsumptionStatus(monthlyCups)}
                  </span>
                </div>
              </div>

              {/* Form to issue card */}
              <div className="border-t border-black/5 dark:border-white/5 pt-6">
                {!isJoined ? (
                  <form onSubmit={handleJoinClub} className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider">
                      {t.joinTitle}
                    </div>
                    <p style={{ color: "var(--theme-muted)" }} className="text-xs">{t.joinSub}</p>

                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <input
                        type="tel"
                        required
                        placeholder={t.phonePlaceholder}
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        style={{
                          backgroundColor: "var(--theme-surface-elevated)",
                          borderColor: "var(--theme-surface-border)",
                          color: "var(--theme-text)",
                        }}
                        className="rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--theme-primary)] flex-1"
                      />
                      <ShimmerButton type="submit" className="py-3 px-6 text-xs font-bold whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Smartphone className="h-4 w-4" />
                          <span>{t.joinBtn}</span>
                        </div>
                      </ShimmerButton>
                    </div>
                  </form>
                ) : (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-4 text-center">
                    <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-500" />
                    <div className="mt-2 text-sm font-bold text-emerald-600 dark:text-emerald-300">{t.congrats}</div>
                    <p style={{ color: "var(--theme-muted)" }} className="text-xs mt-1">{t.congratsSub}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Calculated Outcome Card */}
            <div
              style={{
                backgroundColor: "var(--theme-surface-elevated)",
                borderColor: "var(--theme-surface-border)",
              }}
              className="lg:col-span-5 flex flex-col justify-center rounded-2xl border p-6 sm:p-8 text-center shadow-lg"
            >
              <div
                style={{ color: "var(--theme-primary)" }}
                className="text-xs font-bold uppercase tracking-wider"
              >
                {t.tierPrefix} «{currentTierName}» ({currentTier.cashback}%)
              </div>

              <div
                style={{ color: "var(--theme-primary)" }}
                className="mt-4 font-serif text-4xl sm:text-5xl font-bold"
              >
                ~{yearlyCashback.toLocaleString()} {t.currencySymbol}
              </div>
              <div style={{ color: "var(--theme-muted)" }} className="text-xs mt-1">{t.calcResultYear}</div>

              <div className="my-6 border-t border-black/5 dark:border-white/5" />

              <div className="flex items-center justify-center gap-3">
                <div
                  style={{
                    backgroundColor: "var(--theme-badge-bg)",
                    color: "var(--theme-primary)",
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                >
                  <Coffee className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-serif text-2xl font-bold">
                    + {freeCupsYear} {t.cupsSuffix}
                  </div>
                  <div style={{ color: "var(--theme-muted)" }} className="text-[11px]">{t.calcFreeCups}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
