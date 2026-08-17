"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LOYALTY_TIERS } from "@/data/coffeeData";
import { useApp } from "@/context/AppContext";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { BorderBeam } from "@/components/ui/BorderBeam";
import {
  CreditCard,
  Gift,
  Sparkles,
  CheckCircle2,
  Smartphone,
  Send,
  Zap,
  Coffee,
  Award,
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

  const handleJoinClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput || phoneInput.length < 10) return;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D49B45", "#F3CA74", "#FAF7F2"],
    });

    setIsJoined(true);
  };

  const t = {
    ru: {
      tag: "Программа лояльности",
      title: "Vincent Van Club",
      desc: "Накапливайте кэшбэк с каждой чашки, получайте подарки в день рождения и дегустируйте закрытые микролоты зерна.",
      calcTitle: "Калькулятор вашей выгоды",
      calcCups: "Сколько чашек кофе вы выпиваете в месяц?",
      calcResultYear: "Экономия и бонусы в год:",
      calcFreeCups: "Бесплатных чашек авторского кофе в год",
      joinTitle: "Получить электронную карту в 1 клик",
      joinSub: "Без пластика. Карта сохраняется в Apple Wallet, Google Wallet или Telegram.",
      phonePlaceholder: "+7 (999) 000-00-00",
      joinBtn: "Выпустить карту бесплатно",
      congrats: "Карта лояльности успешно выпущена!",
      congratsSub: "Мы начислили вам 100 приветственных бонусов. Ссылка отправлена по SMS.",
    },
    en: {
      tag: "Loyalty Program",
      title: "Vincent Van Club",
      desc: "Earn cash back on every cup, receive gifts on your birthday, and taste exclusive private micro-lots.",
      calcTitle: "Calculate Your Annual Perks",
      calcCups: "How many cups of coffee do you enjoy monthly?",
      calcResultYear: "Annual cashback value:",
      calcFreeCups: "Complimentary signature cups per year",
      joinTitle: "Get Your Digital Pass in 1 Click",
      joinSub: "Eco-friendly, 100% digital pass for Apple Wallet, Google Wallet or Telegram.",
      phonePlaceholder: "+7 (999) 000-00-00",
      joinBtn: "Issue Digital Card Free",
      congrats: "Welcome to Vincent Van Club!",
      congratsSub: "100 welcome points have been added to your account.",
    },
    zh: {
      tag: "尊享会员计划",
      title: "凡高艺术咖啡俱乐部 (Van Club)",
      desc: "每杯消费皆享积分返现，生日尊享礼遇，并抢先品鉴未公开发售的珍稀原产地微批次豆单。",
      calcTitle: "会员收益模拟测算",
      calcCups: "您每月大约品饮多少杯咖啡？",
      calcResultYear: "预计全年为您节省与返现：",
      calcFreeCups: "相当于每年免费获赠精品咖啡杯数",
      joinTitle: "1 秒免费领取电子会员卡",
      joinSub: "无卡化环保设计，直接添加至 Apple 钱包、Google 钱包或 Telegram。",
      phonePlaceholder: "+7 (999) 000-00-00",
      joinBtn: "立即免费开通会员",
      congrats: "恭喜您成为凡高俱乐部尊贵会员！",
      congratsSub: "100 点迎新奖励积分已即刻存入您的账户。",
    },
  }[language];

  return (
    <section id="loyalty" className="relative py-24 bg-[#0C0A09] overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D49B45]/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D49B45]/30 bg-[#1A1410] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#F3CA74]">
            <Gift className="h-3.5 w-3.5 text-[#D49B45]" />
            <span>{t.tag}</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F2]">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D4C8BC]">
            {t.desc}
          </p>
        </div>

        {/* 3 Loyalty Tier Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {LOYALTY_TIERS.map((tier, idx) => {
            const isSelected = idx === activeTier;
            return (
              <div
                key={tier.id}
                onClick={() => setActiveTier(idx)}
                className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border p-6 sm:p-8 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border-[#D49B45] bg-gradient-to-b from-[#251A13] to-[#140F0C] shadow-[0_15px_40px_rgba(212,155,69,0.2)] scale-[1.02]"
                    : "border-white/10 bg-[#16120F] hover:border-white/20 opacity-90"
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#D49B45]">
                      Уровень {idx + 1}
                    </span>
                    <div className="rounded-full border border-[#D49B45]/40 bg-[#D49B45]/15 px-3 py-1 text-xs font-bold text-[#F3CA74]">
                      {tier.cashback}% Кэшбэк
                    </div>
                  </div>

                  <h3 className="mt-4 font-serif text-2xl font-bold text-[#FAF7F2]">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#A89B8D]">{tier.tagline}</p>

                  {/* Spend condition */}
                  <div className="mt-4 rounded-xl bg-black/40 p-3 text-xs text-[#D4C8BC] border border-white/5">
                    {tier.spendThreshold === 0 ? (
                      <span>Сразу после регистрации</span>
                    ) : (
                      <span>Сумма покупок от <strong className="text-white">{tier.spendThreshold.toLocaleString()} ₽</strong></span>
                    )}
                  </div>

                  {/* Perks list */}
                  <div className="mt-6 space-y-2.5 text-xs text-[#E5DCD3]">
                    {tier.perks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F3CA74] mt-0.5" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#A89B8D]">
                    {isSelected ? "Выбран для расчета" : "Нажмите для выбора"}
                  </span>
                  <div className={`h-2.5 w-2.5 rounded-full ${isSelected ? "bg-[#D49B45] shadow-[0_0_8px_#D49B45]" : "bg-white/20"}`} />
                </div>

                {isSelected && <BorderBeam size={200} duration={12} colorFrom="#F3CA74" colorTo="#D49B45" />}
              </div>
            );
          })}
        </div>

        {/* Interactive Cashback & Benefits Calculator */}
        <div className="mt-12 rounded-3xl border border-[#D49B45]/20 bg-[#16120F]/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
            {/* Left: Slider */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-[#F3CA74]" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
                  {t.calcTitle}
                </h3>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs sm:text-sm text-[#A89B8D]">{t.calcCups}</span>
                  <span className="font-serif text-2xl font-bold text-[#F3CA74]">
                    {monthlyCups} <span className="text-sm font-normal text-[#FAF7F2]">чашек/мес</span>
                  </span>
                </div>

                <input
                  type="range"
                  min={5}
                  max={60}
                  step={1}
                  value={monthlyCups}
                  onChange={(e) => setMonthlyCups(parseInt(e.target.value, 10))}
                  className="mt-4 w-full accent-[#D49B45] cursor-pointer h-2 bg-[#261E19] rounded-lg"
                />

                <div className="mt-2 flex justify-between text-[11px] text-[#70655B]">
                  <span>5 чашек (редко)</span>
                  <span>20 чашек (стандарт)</span>
                  <span>60 чашек (кофеман)</span>
                </div>
              </div>

              {/* Form to issue card */}
              <div className="border-t border-white/10 pt-6">
                {!isJoined ? (
                  <form onSubmit={handleJoinClub} className="space-y-3">
                    <div className="text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider">
                      {t.joinTitle}
                    </div>
                    <p className="text-xs text-[#A89B8D]">{t.joinSub}</p>

                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <input
                        type="tel"
                        required
                        placeholder={t.phonePlaceholder}
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        className="rounded-xl border border-white/10 bg-[#1D1714] px-4 py-3 text-sm text-[#FAF7F2] placeholder-[#70655B] outline-none transition-colors focus:border-[#D49B45] flex-1"
                      />
                      <ShimmerButton type="submit" className="py-3 px-6 text-xs font-bold whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Smartphone className="h-4 w-4 text-[#F3CA74]" />
                          <span>{t.joinBtn}</span>
                        </div>
                      </ShimmerButton>
                    </div>
                  </form>
                ) : (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-center">
                    <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-400" />
                    <div className="mt-2 text-sm font-bold text-emerald-300">{t.congrats}</div>
                    <p className="text-xs text-[#A89B8D] mt-1">{t.congratsSub}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Calculated Outcome Card */}
            <div className="lg:col-span-5 flex flex-col justify-center rounded-2xl border border-[#D49B45]/30 bg-gradient-to-br from-[#241A14] to-[#140F0D] p-6 sm:p-8 text-center shadow-xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#D49B45]">
                Уровень «{currentTier.name}» ({currentTier.cashback}%)
              </div>

              <div className="mt-4 font-serif text-4xl sm:text-5xl font-bold text-[#F3CA74]">
                {yearlyCashback.toLocaleString()} ₽
              </div>
              <div className="text-xs text-[#A89B8D] mt-1">{t.calcResultYear}</div>

              <div className="my-6 border-t border-white/10" />

              <div className="flex items-center justify-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D49B45]/15 text-[#F3CA74]">
                  <Coffee className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-serif text-2xl font-bold text-[#FAF7F2]">
                    + {freeCupsYear} чашек
                  </div>
                  <div className="text-[11px] text-[#A89B8D]">{t.calcFreeCups}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
