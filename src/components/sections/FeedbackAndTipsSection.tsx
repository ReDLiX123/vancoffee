"use client";

import React, { useState } from "react";
import { useApp, LocationId } from "@/context/AppContext";
import { LOCATIONS, REVIEWS } from "@/data/coffeeData";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { Marquee } from "@/components/ui/Marquee";
import {
  Heart,
  MessageSquare,
  Star,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";

export const FeedbackAndTipsSection: React.FC = () => {
  const {
    language,
    selectedLocationId,
    setSelectedLocationId,
    openFeedbackModal,
  } = useApp();

  const [tipAmount, setTipAmount] = useState<number>(200);
  const [customTip, setCustomTip] = useState<string>("");

  const presetAmounts = [100, 200, 300, 500];
  const activeLoc = LOCATIONS.find((l) => l.id === selectedLocationId) || LOCATIONS[0];

  const handleSendTip = () => {
    const amount = customTip ? parseInt(customTip, 10) : tipAmount;
    if (isNaN(amount) || amount <= 0) return;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#A84B2C", "#606C38", "#DDA15E"],
    });

    setTimeout(() => {
      window.open(activeLoc.sbtipsUrl, "_blank");
    }, 1000);
  };

  const t = {
    ru: {
      tag: "Вы делаете нас лучше",
      title: "Чаевые бариста и Гостевая книга",
      desc: "Возможность поблагодарить бариста за улыбку и идеальную чашку, а также оставить обратную связь команде.",
      tipsTitle: "Отправить чаевые бариста",
      tipsSub: "Выберите точку и сумму. Перевод поступит смене бариста через СБП / sbtips.",
      btnSendTip: "Поблагодарить",
      leaveReviewBtn: "Написать отзыв о кофейне",
    },
    en: {
      tag: "You Make Us Better",
      title: "Barista Appreciation & Guestbook",
      desc: "Cashless tips for the team and guestbook testimonials.",
      tipsTitle: "Tip the Barista Directly",
      tipsSub: "Select location and amount. Direct cashless transfer via sbtips gateway.",
      btnSendTip: "Send Appreciation",
      leaveReviewBtn: "Write a Guest Review",
    },
    zh: {
      tag: "因你而更美好",
      title: "咖啡师打赏与宾客心声",
      desc: "直接向用心调制的咖啡师团队表达心意与建议。",
      tipsTitle: "即时打赏咖啡师团队",
      tipsSub: "选择对应门店与金额，打赏将直接通过安全支付通道转付当班咖啡师。",
      btnSendTip: "致谢咖啡师",
      leaveReviewBtn: "留下您的品饮体验与评价",
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

              {/* Location Select Grid */}
              <div className="mt-6">
                <label style={{ color: "var(--theme-muted)" }} className="text-xs font-bold uppercase tracking-wider">
                  Выберите точку в Иркутске
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2.5">
                  {LOCATIONS.map((loc) => {
                    const isSelected = loc.id === selectedLocationId;
                    return (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocationId(loc.id as LocationId)}
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

              {/* Preset Amounts */}
              <div className="mt-6">
                <label style={{ color: "var(--theme-muted)" }} className="text-xs font-bold uppercase tracking-wider">
                  Сумма чаевых
                </label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {presetAmounts.map((amt) => {
                    const isSelected = !customTip && tipAmount === amt;
                    return (
                      <button
                        key={amt}
                        onClick={() => {
                          setTipAmount(amt);
                          setCustomTip("");
                        }}
                        style={{
                          backgroundColor: isSelected ? "var(--theme-primary)" : "var(--theme-surface-elevated)",
                          color: isSelected ? "#FFFFFF" : "var(--theme-text)",
                          borderColor: isSelected ? "var(--theme-primary)" : "var(--theme-surface-border)",
                        }}
                        className="rounded-xl border py-3 text-sm font-bold transition-all shadow-xs"
                      >
                        {amt} ₽
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2.5">
                  <input
                    type="number"
                    placeholder="Или другая сумма (₽)..."
                    value={customTip}
                    onChange={(e) => setCustomTip(e.target.value)}
                    style={{
                      backgroundColor: "var(--theme-surface-elevated)",
                      borderColor: "var(--theme-surface-border)",
                      color: "var(--theme-text)",
                    }}
                    className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--theme-primary)]"
                  />
                </div>
              </div>
            </div>

            {/* Action Tip Button */}
            <div className="mt-8">
              <ShimmerButton
                onClick={handleSendTip}
                className="w-full py-4 text-base font-bold"
              >
                <div className="flex items-center justify-center gap-2">
                  <Heart className="h-4 w-4 fill-current" />
                  <span>{t.btnSendTip} ({customTip ? `${customTip} ₽` : `${tipAmount} ₽`})</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </ShimmerButton>

              <div style={{ color: "var(--theme-muted)" }} className="mt-2.5 text-center text-[11px]">
                Перевод напрямую через СБП / sbtips.ru (Точка: «{activeLoc.shortName}»)
              </div>
            </div>
          </div>

          {/* Right: Review & Ratings Card */}
          <div
            style={{
              backgroundColor: "var(--theme-surface)",
              borderColor: "var(--theme-surface-border)",
            }}
            className="lg:col-span-6 rounded-3xl border p-6 sm:p-8 shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all duration-500"
          >
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <span
                    style={{ color: "var(--theme-primary)" }}
                    className="text-xs font-bold uppercase tracking-wider"
                  >
                    Рейтинг гостей
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-serif text-4xl sm:text-5xl font-bold">
                      4.9
                    </span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span style={{ color: "var(--theme-muted)" }} className="text-xs">На основе отзывов в</span>
                  <div className="mt-1 flex items-center justify-end gap-1.5 font-bold text-xs">
                    <span>2ГИС & Яндекс</span>
                  </div>
                </div>
              </div>

              {/* Direct Maps Links */}
              <div className="mt-6 space-y-3">
                <div style={{ color: "var(--theme-muted)" }} className="text-xs font-bold uppercase tracking-wider">
                  Оставить отзыв на картах точки «{activeLoc.shortName}»:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={activeLoc.gis2Url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      backgroundColor: "var(--theme-surface-elevated)",
                      borderColor: "var(--theme-surface-border)",
                    }}
                    className="flex items-center justify-between rounded-2xl border p-4 transition-all hover:scale-[1.02] group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-xs">
                        2Г
                      </div>
                      <div className="text-xs font-bold">2ГИС Иркутск</div>
                    </div>
                    <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>

                  <a
                    href={activeLoc.yandexMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      backgroundColor: "var(--theme-surface-elevated)",
                      borderColor: "var(--theme-surface-border)",
                    }}
                    className="flex items-center justify-between rounded-2xl border p-4 transition-all hover:scale-[1.02] group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-xs">
                        Я
                      </div>
                      <div className="text-xs font-bold">Яндекс.Карты</div>
                    </div>
                    <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>

            {/* In-app review trigger button */}
            <div className="mt-8 border-t border-black/5 dark:border-white/5 pt-6">
              <button
                onClick={() => openFeedbackModal()}
                style={{
                  backgroundColor: "var(--theme-surface-elevated)",
                  borderColor: "var(--theme-primary)",
                  color: "var(--theme-text)",
                }}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border py-4 text-sm font-bold transition-all hover:scale-[1.01]"
              >
                <MessageSquare className="h-4 w-4 text-[var(--theme-primary)]" />
                <span>{t.leaveReviewBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Marquee with guest quotes */}
        <div className="mt-14">
          <div style={{ color: "var(--theme-muted)" }} className="mb-4 text-center text-xs font-bold uppercase tracking-wider">
            Отзывы наших гостей
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
