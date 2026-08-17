"use client";

import React from "react";
import { motion } from "framer-motion";
import { NEWS_ITEMS } from "@/data/coffeeData";
import { useApp } from "@/context/AppContext";
import { Newspaper, ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";

export const NewsSection: React.FC = () => {
  const { language } = useApp();

  const t = {
    ru: {
      tag: "Арт-хроника & События",
      title: "Новости и сезонные релизы",
      desc: "Будьте в курсе новых поступлений спешелти зерна, каппингов, арт-встреч и сезонных обновлений меню.",
      readMore: "Подробнее",
    },
    en: {
      tag: "Art Journal & Events",
      title: "News & Seasonal Releases",
      desc: "Stay updated on new origin bean drops, cupping sessions, art workshops, and seasonal specials.",
      readMore: "Read Story",
    },
    zh: {
      tag: "艺术动态与活动资讯",
      title: "最新资讯与季节限定新品",
      desc: "实时了解新批次精品咖啡豆到店、杯测交流会、艺术画廊工作坊及季节性菜单更新。",
      readMore: "查看详情",
    },
  }[language];

  return (
    <section id="news" className="relative py-24 bg-[#0C0A09] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D49B45]/30 bg-[#1A1410] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#F3CA74]">
            <Newspaper className="h-3.5 w-3.5 text-[#D49B45]" />
            <span>{t.tag}</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F2]">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D4C8BC]">
            {t.desc}
          </p>
        </div>

        {/* News Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {NEWS_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#16120F] transition-all duration-300 hover:border-[#D49B45]/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden bg-[#221A15]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16120F] via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 rounded-full border border-[#D49B45]/40 bg-black/60 px-3 py-0.5 text-xs font-semibold text-[#F3CA74] backdrop-blur-md">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-[#A89B8D]">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[#D49B45]" />
                      <span>{item.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>

                  <h3 className="mt-3 font-serif text-lg font-bold text-[#FAF7F2] group-hover:text-[#F3CA74] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs leading-relaxed text-[#A89B8D] line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Link CTA */}
              <div className="border-t border-white/5 px-6 py-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[#D49B45] group-hover:text-[#F3CA74]">
                  <span>{item.linkText}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
