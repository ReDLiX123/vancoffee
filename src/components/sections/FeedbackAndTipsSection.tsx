"use client";

import React, { useState } from "react";
import { REVIEWS, LOCATIONS } from "@/data/coffeeData";
import { useApp } from "@/context/AppContext";
import { Marquee } from "@/components/ui/Marquee";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import {
  Heart,
  MessageSquare,
  Star,
  ExternalLink,
  Info,
} from "lucide-react";
import confetti from "canvas-confetti";

export const FeedbackAndTipsSection: React.FC = () => {
  const { language, selectedLocationId, setSelectedLocationId, openFeedbackModal } = useApp();
  const [tipAmount, setTipAmount] = useState<number>(200);
  const [customTip, setCustomTip] = useState<string>("");
  const [tipLocation, setTipLocation] = useState<string>(selectedLocationId);

  const activeLoc = LOCATIONS.find((l) => l.id === tipLocation) || LOCATIONS[0];
  const amounts = [100, 200, 300, 500];

  const handleDirectTip = () => {
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#A84B2C", "#606C38", "#DDA15E"],
    });

    setTimeout(() => {
      window.open(activeLoc.sbtipsUrl, "_blank");
    }, 800);
  };

  const t = {
    ru: {
      tag: "Вы делаете нас лучше",
      title: "Чаевые бариста и Гостевая книга",
      desc: "Возможность поблагодарить бариста за улыбку и идеальную чашку, а также оставить обратную связь команде.",
      demoBadge: "ℹ️ Демо-отзывы для тестирования интерфейса — в релизной версии блок синхронизируется с API 2ГИС и Яндекс.Карт",
      tipsTitle: "Отправить чаевые бариста",
      tipsSub: "Выберите точку и сумму. Перевод поступит смене бариста через СБП / sbtips.",
      btnSendTip: "Поблагодарить",
      leaveReviewBtn: "Написать отзыв о кофейне",
    },
    en: {
      tag: "You Make Us Better",
      title: "Barista Appreciation & Guestbook",
      desc: "Cashless tips for the team and guestbook testimonials.",
      demoBadge: "ℹ️ Demo reviews for UI validation — will sync with live 2GIS & Yandex Maps API in production",
      tipsTitle: "Tip the Barista Directly",
      tipsSub: "Select location and amount. Direct cashless transfer via sbtips gateway.",
      btnSendTip: "Send Appreciation",
      leaveReviewBtn: "Write a Guest Review",
    },
    zh: {
      tag: "因你而更美好",
      title: "咖啡师打赏与宾客心声",
      desc: "直接向用心调制的咖啡师团队表达心意与建议。",
      demoBadge: "ℹ️ 客评演示数据 — 正式版本将对接 2GIS 与 Yandex Maps 官方真实评分流",
      tipsTitle: "即时打赏咖啡师团队",
      tipsSub: "选择消费门店及打赏金额，款项将通过 sbtips 实时结算。",
      btnSendTip: "立即打赏送心意",
      leaveReviewBtn: "撰写您的咖啡体验",
    },
  }[language];

  return (
    <section id="feedback" className="relative py-24 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
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
            <Heart className="h-3.5 w-3.5 fill-current" />
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
            <span>{t.demoBadge}</span>
          </div>
        </div>

        {/* 2-Column: Left Direct Tips Widget | Right Review Actions */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left: Interactive Tip Widget */}
          <div
            style={{
              backgroundColor: "var(--theme-surface)",
              borderColor: "var(--theme-surface-border)",
            }}
            className="lg:col-span-6 rounded-3xl border p-6 sm:p-8 shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all duration-500"
          >
            <div>
              <div className="flex items-center gap-3">
                <div
                  style={{
                    backgroundColor: "var(--theme-badge-bg)",
                    color: "var(--theme-primary)",
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl"
                >
                  <Heart className="h-6 w-6 fill-current" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">
                    {t.tipsTitle}
                  </h3>
                  <p style={{ color: "var(--theme-muted)" }} className="text-xs">{t.tipsSub}</p>
                </div>
              </div>

              {/* Location Select for Tips */}
              <div className="mt-6">
                <label style={{ color: "var(--theme-muted)" }} className="text-[11px] font-bold uppercase tracking-wider">
                  Локация смены
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {LOCATIONS.map((loc) => {
                    const isSelected = loc.id === tipLocation;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setTipLocation(loc.id)}
                        style={{
                          backgroundColor: isSelected ? "var(--theme-surface-elevated)" : "transparent",
                          borderColor: isSelected ? loc.theme.primaryColor : "var(--theme-surface-border)",
                        }}
                        className="flex flex-col items-start rounded-xl border p-2.5 text-left text-xs transition-all"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-bold">{loc.shortName}</span>
                          <span
                            style={{ backgroundColor: loc.theme.primaryColor }}
                            className="h-2 w-2 rounded-full"
                          />
                        </div>
                        <span style={{ color: "var(--theme-muted)" }} className="truncate text-[10px]">{loc.landmark}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amount buttons */}
              <div className="mt-5">
                <label style={{ color: "var(--theme-muted)" }} className="text-[11px] font-bold uppercase tracking-wider">
                  Сумма чаевых
                </label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {amounts.map((amt) => {
                    const isSelected = !customTip && tipAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setTipAmount(amt);
                          setCustomTip("");
                        }}
                        style={{
                          backgroundColor: isSelected ? "var(--theme-primary)" : "var(--theme-surface-elevated)",
                          color: isSelected ? "#FFFFFF" : "var(--theme-text)",
                          borderColor: isSelected ? "var(--theme-primary)" : "var(--theme-surface-border)",
                        }}
                        className="rounded-xl border py-3 text-sm font-bold transition-all"
                      >
                        {amt} ₽
                      </button>
                    );
                  })}
                </div>

                <input
                  type="number"
                  placeholder="Или введите свою сумму (₽)"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  style={{
                    backgroundColor: "var(--theme-surface-elevated)",
                    borderColor: "var(--theme-surface-border)",
                    color: "var(--theme-text)",
                  }}
                  className="mt-2.5 w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--theme-primary)]"
                />
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <ShimmerButton
                onClick={handleDirectTip}
                className="w-full py-4 text-sm font-bold"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>
                    {t.btnSendTip} ({customTip ? `${customTip} ₽` : `${tipAmount} ₽`})
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </ShimmerButton>
              <div style={{ color: "var(--theme-muted)" }} className="text-center text-[10px]">
                Переход на защищенный шлюз sbtips.ru (Точка: «{activeLoc.shortName}»)
              </div>
            </div>
          </div>

          {/* Right: Write Review Box + CTA */}
          <div
            style={{
              backgroundColor: "var(--theme-surface)",
              borderColor: "var(--theme-surface-border)",
            }}
            className="lg:col-span-6 rounded-3xl border p-6 sm:p-8 flex flex-col justify-between shadow-md transition-all duration-500"
          >
            <div>
              <div className="flex items-center gap-3">
                <div
                  style={{
                    backgroundColor: "var(--theme-badge-bg)",
                    color: "var(--theme-primary)",
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl"
                >
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">
                    Поделитесь мнением
                  </h3>
                  <p style={{ color: "var(--theme-muted)" }} className="text-xs">
                    Ваш отзыв помогает делать каждую чашку и пространство еще уютнее.
                  </p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "var(--theme-surface-elevated)",
                  borderColor: "var(--theme-surface-border)",
                }}
                className="mt-6 rounded-2xl border p-5 shadow-sm"
              >
                <div className="flex items-center gap-1 text-[var(--theme-primary)]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                  <span className="ml-2 font-bold text-sm">5.0 / 5.0</span>
                </div>
                <p style={{ color: "var(--theme-muted)" }} className="mt-3 text-xs leading-relaxed">
                  «Мы читаем каждое пожелание гостей во всех 4 кофейнях Иркутска. Оставляйте ваши впечатления!»
                </p>
                <div style={{ color: "var(--theme-primary)" }} className="mt-3 text-[11px] font-bold">
                  — Команда Vincent Van Coffee
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => openFeedbackModal()}
                style={{
                  backgroundColor: "var(--theme-badge-bg)",
                  borderColor: "var(--theme-primary)",
                  color: "var(--theme-primary)",
                }}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border py-4 text-sm font-bold transition-all hover:scale-[1.01]"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{t.leaveReviewBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Marquee with guest quotes */}
        <div className="mt-14">
          <div style={{ color: "var(--theme-muted)" }} className="mb-4 text-center text-xs font-bold uppercase tracking-wider">
            Отзывы гостей (Демо-выгрузка)
          </div>

          <Marquee duration="40s" pauseOnHover={true}>
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                style={{
                  backgroundColor: "var(--theme-surface)",
                  borderColor: "var(--theme-surface-border)",
                }}
                className="w-80 sm:w-96 shrink-0 rounded-2xl border p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr ${rev.avatarBg} text-xs font-bold text-white`}>
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-xs">{rev.author}</div>
                      <div style={{ color: "var(--theme-muted)" }} className="text-[10px]">{rev.role}</div>
                    </div>
                  </div>
                  <div className="flex text-[var(--theme-primary)]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p style={{ color: "var(--theme-muted)" }} className="mt-3 text-xs leading-relaxed italic">
                  "{rev.text}"
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-2 text-[10px] opacity-70">
                  <span>{rev.location}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};
