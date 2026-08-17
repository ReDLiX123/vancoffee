"use client";

import React from "react";
import { LOCATIONS } from "@/data/coffeeData";
import { useApp } from "@/context/AppContext";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  ExternalLink,
  Heart,
  Sparkles,
} from "lucide-react";

export const Footer: React.FC = () => {
  const { openTipsModal, openFeedbackModal } = useApp();

  return (
    <footer className="relative border-t border-[#D49B45]/15 bg-[#080706] pt-16 pb-12 text-[#A89B8D]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D49B45]/40 bg-gradient-to-br from-[#291F18] to-[#120F0D]">
                <span className="font-serif text-lg font-bold text-[#F3CA74]">V</span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-[#FAF7F2]">
                  Vincent Van Coffee
                </span>
                <p className="text-[10px] uppercase tracking-widest text-[#D49B45]">
                  Иркутск • Сеть спешелти кофеен
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#A89B8D] max-w-sm">
              Мы создаем не просто кофе, а живописное пространство для ваших мыслей, встреч и вдохновения. Каждая чашка приготовлена на спешелти зерне свежей обжарки.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/vancoffee_irk"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#16120F] text-[#FAF7F2] transition-colors hover:border-[#D49B45] hover:text-[#F3CA74]"
                aria-label="Telegram канал"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="https://vk.com/vancoffee_irk"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#16120F] text-[#FAF7F2] transition-colors hover:border-[#D49B45] hover:text-[#F3CA74]"
                aria-label="ВКонтакте"
              >
                <span className="text-xs font-bold">VK</span>
              </a>
              <a
                href="https://instagram.com/vancoffee_irk"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#16120F] text-[#FAF7F2] transition-colors hover:border-[#D49B45] hover:text-[#F3CA74]"
                aria-label="Instagram"
              >
                <span className="text-xs font-bold">IG</span>
              </a>
            </div>
          </div>

          {/* Locations Col */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#FAF7F2]">
              4 точки в Иркутске
            </h4>
            <ul className="space-y-2 text-xs">
              {LOCATIONS.map((loc) => (
                <li key={loc.id}>
                  <a
                    href={loc.gis2Url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col transition-colors hover:text-[#F3CA74]"
                  >
                    <span className="font-semibold text-white group-hover:text-[#F3CA74] flex items-center gap-1">
                      {loc.shortName}
                      <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-[10px] text-[#70655B]">{loc.landmark}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Col */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#FAF7F2]">
              Разделы
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Барная карта & Меню
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-colors">
                  Точки на карте
                </a>
              </li>
              <li>
                <a href="#nutrition" className="hover:text-white transition-colors">
                  Таблица КБЖУ и аллергенов
                </a>
              </li>
              <li>
                <a href="#loyalty" className="hover:text-white transition-colors">
                  Vincent Van Club (Бонусы)
                </a>
              </li>
              <li>
                <button
                  onClick={() => openFeedbackModal()}
                  className="hover:text-white transition-colors text-left"
                >
                  Оставить отзыв
                </button>
              </li>
              <li>
                <button
                  onClick={() => openTipsModal()}
                  className="text-[#D49B45] hover:text-[#F3CA74] transition-colors text-left flex items-center gap-1"
                >
                  <Heart className="h-3 w-3 fill-[#D49B45]" />
                  <span>Чаевые бариста</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts & Support */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#FAF7F2]">
              Контакты
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#D49B45]" />
                <a href="tel:+79025104413" className="hover:text-white transition-colors">
                  +7 (902) 510-44-13
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#D49B45]" />
                <a href="mailto:hello@vancoffee.ru" className="hover:text-white transition-colors">
                  hello@vancoffee.ru
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[11px] text-[#70655B]">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#D49B45] mt-0.5" />
                <span>г. Иркутск, ул. Киевская, 1 (Центральный офис)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal note */}
        <div className="mt-12 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#70655B]">
          <div>
            © {new Date().getFullYear()} Vincent Van Coffee. Все права защищены.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">
              Политика конфиденциальности
            </a>
            <span>•</span>
            <a href="#" className="hover:underline">
              Публичная оферта
            </a>
            <span>•</span>
            <span>ИП Vincent Van Coffee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
