"use client";

import React from "react";
import { NEWS_ITEMS } from "@/data/coffeeData";
import { useApp } from "@/context/AppContext";
import { Newspaper, ArrowRight, Calendar, Clock } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export const NewsSection: React.FC = () => {
  const { language } = useApp();

  const t = {
    ru: {
      tag: "Арт-хроника & События",
      title: "Новости и сезонные релизы",
      desc: "Новые поступления спешелти зерна, каппинги и сезонные обновления меню.",
      readMore: "Подробнее",
    },
    en: {
      tag: "Art Journal & Events",
      title: "News & Seasonal Releases",
      desc: "Stay updated on origin bean drops, cupping sessions, and seasonal specials.",
      readMore: "Read Story",
    },
    zh: {
      tag: "艺术动态与活动资讯",
      title: "最新资讯与季节限定新品",
      desc: "实时了解新批次精品咖啡豆到店与季节性菜单更新。",
      readMore: "查看详情",
    },
  }[language];

  const getCategoryName = (cat: string) => {
    if (cat.includes("Обжарка") || cat.includes("Roast")) {
      return { ru: "Кофе & Обжарка", en: "Coffee & Roasting", zh: "精品咖啡与自烘" }[language];
    }
    if (cat.includes("Сезон") || cat.includes("Season")) {
      return { ru: "Сезонное меню", en: "Seasonal Menu", zh: "季候限定菜单" }[language];
    }
    if (cat.includes("Спешелти") || cat.includes("Specialty")) {
      return { ru: "Спешелти зерно", en: "Specialty Origin", zh: "单品微批次" }[language];
    }
    return { ru: "События & Арт", en: "Events & Art", zh: "艺术与体验活动" }[language];
  };

  return (
    <section id="news" className="relative py-24 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
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
            <Newspaper className="h-3.5 w-3.5" />
            <span>{t.tag}</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            {t.title}
          </h2>
          <p style={{ color: "var(--theme-muted)" }} className="mt-4 text-base sm:text-lg">
            {t.desc}
          </p>
        </div>

        {/* News Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {NEWS_ITEMS.map((item) => {
            const title = item.titleI18n?.[language] || item.title;
            const summary = item.summaryI18n?.[language] || item.summary;
            const date = item.dateI18n?.[language] || item.date;
            const readTime = item.readTimeI18n?.[language] || item.readTime;
            const cat = getCategoryName(item.category);

            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: "var(--theme-surface)",
                  borderColor: "var(--theme-surface-border)",
                }}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-black/5">
                    <img
                      src={getAssetPath(item.image)}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/60 px-3 py-0.5 text-xs font-semibold text-white backdrop-blur-md">
                      {cat}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div style={{ color: "var(--theme-muted)" }} className="flex items-center gap-3 text-[11px]">
                      <div className="flex items-center gap-1">
                        <Calendar style={{ color: "var(--theme-primary)" }} className="h-3.5 w-3.5" />
                        <span>{date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{readTime}</span>
                      </div>
                    </div>

                    <h3 className="mt-3 font-serif text-lg font-bold group-hover:text-[var(--theme-primary)] transition-colors leading-snug">
                      {title}
                    </h3>

                    <p style={{ color: "var(--theme-muted)" }} className="mt-2.5 text-xs leading-relaxed line-clamp-3">
                      {summary}
                    </p>
                  </div>
                </div>

                {/* Link CTA */}
                <div className="border-t border-black/5 dark:border-white/5 px-6 py-4">
                  <div style={{ color: "var(--theme-primary)" }} className="flex items-center justify-between text-xs font-bold">
                    <span>{t.readMore}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
