"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { REVIEWS, LOCATIONS } from "@/data/coffeeData";
import { useApp } from "@/context/AppContext";
import { Marquee } from "@/components/ui/Marquee";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import {
  Heart,
  MessageSquare,
  Star,
  Sparkles,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Quote,
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
      colors: ["#D49B45", "#F3CA74", "#FAF7F2"],
    });

    setTimeout(() => {
      window.open(activeLoc.sbtipsUrl, "_blank");
    }, 800);
  };

  const t = {
    ru: {
      tag: "Вы делаете нас лучше",
      title: "Чаевые бариста и Гостевая книга",
      desc: "Искренние отзывы наших гостей и прямая возможность поблагодарить бариста за улыбку, идеальную пенку и теплое утро.",
      tipsTitle: "Отправить чаевые бариста",
      tipsSub: "Выберите точку и сумму перевода. Средства сразу поступят смене бариста через СБП / sbtips.",
      btnSendTip: "Поблагодарить",
      leaveReviewBtn: "Написать отзыв о кофейне",
    },
    en: {
      tag: "You Make Us Better",
      title: "Barista Appreciation & Guestbook",
      desc: "Genuine stories from our community and instant cashless tips for the baristas who craft your day.",
      tipsTitle: "Tip the Barista Directly",
      tipsSub: "Select location and amount. Tips go directly to today's shift team via sbtips / Fast Payment System.",
      btnSendTip: "Send Appreciation",
      leaveReviewBtn: "Write a Guest Review",
    },
    zh: {
      tag: "因你而更美好",
      title: "咖啡师打赏与宾客心声",
      desc: "倾听客人的真实评价，并可直接向用心调制每杯咖啡的咖啡师送上一份暖心打赏与感谢。",
      tipsTitle: "即时打赏咖啡师团队",
      tipsSub: "选择消费门店及打赏金额，款项将直接实时打入当班咖啡师账户。",
      btnSendTip: "立即打赏送心意",
      leaveReviewBtn: "撰写您的咖啡体验",
    },
  }[language];

  return (
    <section id="feedback" className="relative py-24 bg-[#0C0A09] canvas-texture overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-0 bottom-1/4 h-96 w-96 rounded-full bg-[#D49B45]/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D49B45]/30 bg-[#1A1410] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#F3CA74]">
            <Heart className="h-3.5 w-3.5 text-[#D49B45] fill-[#D49B45]/20" />
            <span>{t.tag}</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F2]">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D4C8BC]">
            {t.desc}
          </p>
        </div>

        {/* 2-Column: Left Direct Tips Widget | Right Review Actions */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left: Interactive Tip Widget */}
          <div className="lg:col-span-6 rounded-3xl border border-[#D49B45]/30 bg-[#16120F] p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D49B45]/15 text-[#F3CA74] border border-[#D49B45]/30">
                  <Heart className="h-6 w-6 fill-[#F3CA74]/20" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
                    {t.tipsTitle}
                  </h3>
                  <p className="text-xs text-[#A89B8D]">{t.tipsSub}</p>
                </div>
              </div>

              {/* Location Select for Tips */}
              <div className="mt-6">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#A89B8D]">
                  Локация бариста
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {LOCATIONS.map((loc) => {
                    const isSelected = loc.id === tipLocation;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setTipLocation(loc.id)}
                        className={`flex flex-col items-start rounded-xl border p-2.5 text-left text-xs transition-all ${
                          isSelected
                            ? "border-[#D49B45] bg-[#291F18] text-[#F3CA74]"
                            : "border-white/10 bg-[#1D1714] text-[#A89B8D] hover:border-white/20"
                        }`}
                      >
                        <span className="font-semibold text-white">{loc.shortName}</span>
                        <span className="truncate text-[10px] text-[#A89B8D]">{loc.landmark}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amount buttons */}
              <div className="mt-5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#A89B8D]">
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
                        className={`rounded-xl border py-3 text-sm font-bold transition-all ${
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

                <input
                  type="number"
                  placeholder="Или своя сумма (₽)"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  className="mt-2.5 w-full rounded-xl border border-white/10 bg-[#1D1714] px-4 py-2.5 text-sm text-[#FAF7F2] placeholder-[#70655B] outline-none transition-colors focus:border-[#D49B45]"
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
                  <ExternalLink className="h-4 w-4 text-[#F3CA74]" />
                </div>
              </ShimmerButton>
              <div className="text-center text-[10px] text-[#70655B]">
                Переход на безопасный шлюз sbtips.ru для точки «{activeLoc.shortName}»
              </div>
            </div>
          </div>

          {/* Right: Write Review Box + CTA */}
          <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-[#16120F] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1A3756]/40 text-[#7EAEF5] border border-[#1A3756]">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
                    Поделитесь впечатлением
                  </h3>
                  <p className="text-xs text-[#A89B8D]">
                    Мы бережно сохраняем каждый отзыв и постоянно совершенствуем рецепты.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-[#1D1714] p-5">
                <div className="flex items-center gap-1 text-[#F3CA74]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-[#F3CA74]" />
                  ))}
                  <span className="ml-2 font-bold text-sm text-white">5.0 / 5.0</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#D4C8BC]">
                  «Благодарим наших гостей за доверие в Иркутске. Отзывы вдохновляют бариста создавать новые шедевры каждый день!»
                </p>
                <div className="mt-3 text-[11px] font-semibold text-[#D49B45]">
                  — Команда Vincent Van Coffee
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => openFeedbackModal()}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-[#D49B45]/40 bg-[#D49B45]/10 py-4 text-sm font-semibold text-[#F3CA74] transition-all hover:bg-[#D49B45]/20 hover:scale-[1.01]"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{t.leaveReviewBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Marquee with guest quotes */}
        <div className="mt-14">
          <div className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-[#A89B8D]">
            Что говорят гости о наших кофейнях
          </div>

          <Marquee duration="45s" pauseOnHover={true}>
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="w-80 sm:w-96 shrink-0 rounded-2xl border border-white/10 bg-[#16120F] p-5 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr ${rev.avatarBg} text-xs font-bold text-white`}>
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-white">{rev.author}</div>
                      <div className="text-[10px] text-[#A89B8D]">{rev.role}</div>
                    </div>
                  </div>
                  <div className="flex text-[#F3CA74]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#F3CA74]" />
                    ))}
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-[#D4C8BC] italic">
                  "{rev.text}"
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-[#70655B]">
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
