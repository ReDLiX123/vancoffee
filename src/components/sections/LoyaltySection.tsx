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
  Info,
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
    if (cups <= 12) return "Редкий гость (~1-2 чашки в неделю)";
    if (cups <= 24) return "Стандартный ритм (~1 чашка в день)";
    if (cups <= 39) return "Любитель кофе (~1-2 чашки в день)";
    return "Кофейный гурман (2+ чашки каждый день)";
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
      tag: "Концепт программы лояльности",
      title: "Vincent Van Club (Проект)",
      desc: "Предварительная концепция цифровой карты лояльности для гостей сети кофеен в Иркутске.",
      conceptBadge: "ℹ️ Проект концепта (на согласовании) — параметры кэшбэка и привилегии могут быть скорректированы клиентом",
      calcTitle: "Калькулятор прогнозируемой выгоды",
      calcCups: "Сколько чашек кофе вы выпиваете в месяц?",
      calcResultYear: "Прогнозируемая экономия в год:",
      calcFreeCups: "Бесплатных чашек авторского кофе в год",
      joinTitle: "Тестирование выпуска карты",
      joinSub: "Форма для проверки прототипа привязки карты в Apple / Google Wallet.",
      phonePlaceholder: "+7 (999) 000-00-00",
      joinBtn: "Протестировать выпуск",
      congrats: "Тестовая карта успешно сформирована!",
      congratsSub: "Прототип подтвержден. Реальная интеграция будет подключена к CRM-системе кофейни.",
    },
    en: {
      tag: "Loyalty Program Concept",
      title: "Vincent Van Club (Concept Draft)",
      desc: "Proposed digital loyalty pass framework for coffee lovers in Irkutsk.",
      conceptBadge: "ℹ️ Concept Draft — cashback tiers and rewards are subject to final client approval",
      calcTitle: "Calculate Your Annual Perks",
      calcCups: "How many cups of coffee do you enjoy monthly?",
      calcResultYear: "Projected annual value:",
      calcFreeCups: "Complimentary cups per year",
      joinTitle: "Test Pass Generation",
      joinSub: "Prototype demo for Apple / Google Wallet pass onboarding.",
      phonePlaceholder: "+7 (999) 000-00-00",
      joinBtn: "Test Pass Issuing",
      congrats: "Prototype Pass Generated!",
      congratsSub: "Ready for client CRM webhook integration.",
    },
    zh: {
      tag: "会员体系提案概念",
      title: "凡高艺术咖啡俱乐部 (概念草案)",
      desc: "为伊尔库茨克咖啡常客量身定制的数字化会员方案雏形。",
      conceptBadge: "ℹ️ 方案草案（待审核）— 积分返现比例与特权将在正式上线前由客户最终定稿",
      calcTitle: "会员收益模拟测算",
      calcCups: "您每月大约品饮多少杯咖啡？",
      calcResultYear: "预计全年为您节省：",
      calcFreeCups: "相当于每年获赠咖啡杯数",
      joinTitle: "测试电子卡申领流程",
      joinSub: "用于测试添加至 Apple 钱包或 Google 钱包的交互原型。",
      phonePlaceholder: "+7 (999) 000-00-00",
      joinBtn: "体验测试开通",
      congrats: "测试会员卡生成成功！",
      congratsSub: "原型验证完毕，后续将对接真实 CRM 积分系统。",
    },
  }[language];

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

          <div
            style={{
              backgroundColor: "var(--theme-surface-elevated)",
              borderColor: "var(--theme-surface-border)",
              color: "var(--theme-muted)",
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs text-left shadow-sm"
          >
            <Info className="h-3.5 w-3.5 shrink-0 text-[var(--theme-primary)]" />
            <span>{t.conceptBadge}</span>
          </div>
        </div>

        {/* 3 Loyalty Tier Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {LOYALTY_TIERS.map((tier, idx) => {
            const isSelected = idx === activeTier;
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
                      Уровень {idx + 1} (Концепт)
                    </span>
                    <div
                      style={{
                        backgroundColor: "var(--theme-badge-bg)",
                        color: "var(--theme-primary)",
                        borderColor: "var(--theme-surface-border)",
                      }}
                      className="rounded-full border px-3 py-1 text-xs font-bold"
                    >
                      {tier.cashback}% Кэшбэк
                    </div>
                  </div>

                  <h3 className="mt-4 font-serif text-2xl font-bold">
                    {tier.name}
                  </h3>
                  <p style={{ color: "var(--theme-muted)" }} className="mt-1 text-xs">{tier.tagline}</p>

                  {/* Spend condition */}
                  <div
                    style={{
                      backgroundColor: "var(--theme-surface)",
                      borderColor: "var(--theme-surface-border)",
                    }}
                    className="mt-4 rounded-xl p-3 text-xs border"
                  >
                    {tier.spendThreshold === 0 ? (
                      <span>Сразу после регистрации</span>
                    ) : (
                      <span>Порог покупок от <strong>{tier.spendThreshold.toLocaleString()} ₽</strong></span>
                    )}
                  </div>

                  {/* Perks list */}
                  <div className="mt-6 space-y-2.5 text-xs">
                    {tier.perks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 style={{ color: "var(--theme-primary)" }} className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span style={{ color: "var(--theme-muted)" }} className="text-[11px]">
                    {isSelected ? "Выбран для расчета" : "Нажмите для выбора"}
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
                    {monthlyCups} <span style={{ color: "var(--theme-text)" }} className="text-sm font-normal">чашек/мес</span>
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
                      Пресеты:
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
                          {count} чашек
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
                Уровень «{currentTier.name.split("(")[0].trim()}» ({currentTier.cashback}%)
              </div>

              <div
                style={{ color: "var(--theme-primary)" }}
                className="mt-4 font-serif text-4xl sm:text-5xl font-bold"
              >
                ~{yearlyCashback.toLocaleString()} ₽
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
                    + {freeCupsYear} чашек
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
