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
  Palette,
} from "lucide-react";

export const Footer: React.FC = () => {
  const { openTipsModal, openFeedbackModal, selectedLocation } = useApp();

  return (
    <footer
      style={{
        backgroundColor: "var(--theme-surface)",
        borderTopColor: "var(--theme-surface-border)",
      }}
      className="relative border-t pt-16 pb-12 transition-colors duration-500"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div
                style={{
                  backgroundColor: "var(--theme-surface-elevated)",
                  borderColor: "var(--theme-primary)",
                  color: "var(--theme-primary)",
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm"
              >
                <span className="font-serif text-lg font-bold">V</span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold">
                  Vincent Van Coffee
                </span>
                <p style={{ color: "var(--theme-primary)" }} className="text-[10px] uppercase tracking-widest font-semibold">
                  Иркутск • 4 локации со своим характером
                </p>
              </div>
            </div>

            <p style={{ color: "var(--theme-muted)" }} className="text-xs leading-relaxed max-w-sm">
              Живописный спешелти кофе и 4 концептуальных пространства в Иркутске. Каждая точка оформлена в своей авторской палитре.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/vancoffee_irk"
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: "var(--theme-surface-elevated)",
                  borderColor: "var(--theme-surface-border)",
                }}
                className="flex h-9 w-9 items-center justify-center rounded-xl border transition-colors hover:border-[var(--theme-primary)]"
                aria-label="Telegram"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="https://vk.com/vancoffee_irk"
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: "var(--theme-surface-elevated)",
                  borderColor: "var(--theme-surface-border)",
                }}
                className="flex h-9 w-9 items-center justify-center rounded-xl border transition-colors hover:border-[var(--theme-primary)]"
                aria-label="ВКонтакте"
              >
                <span className="text-xs font-bold">VK</span>
              </a>
              <a
                href="https://2gis.ru/irkutsk/search/Vincent%20Van%20Coffee"
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: "var(--theme-surface-elevated)",
                  borderColor: "var(--theme-surface-border)",
                }}
                className="flex h-9 w-9 items-center justify-center rounded-xl border transition-colors hover:border-[var(--theme-primary)]"
                aria-label="2ГИС Иркутск"
              >
                <span className="text-xs font-bold">2ГИС</span>
              </a>
            </div>
          </div>

          {/* Locations Col */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider">
              4 точки в Иркутске
            </h4>
            <ul className="space-y-2.5 text-xs">
              {LOCATIONS.map((loc) => (
                <li key={loc.id}>
                  <a
                    href={loc.gis2Url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col transition-colors hover:text-[var(--theme-primary)]"
                  >
                    <div className="flex items-center gap-1.5 font-bold">
                      <span
                        style={{ backgroundColor: loc.theme.primaryColor }}
                        className="h-2 w-2 rounded-full shrink-0"
                      />
                      <span>{loc.shortName}</span>
                      <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span style={{ color: "var(--theme-muted)" }} className="text-[10px] pl-3.5">{loc.landmark}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Col */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider">
              Разделы
            </h4>
            <ul style={{ color: "var(--theme-muted)" }} className="space-y-2 text-xs">
              <li>
                <a href="#locations" className="hover:text-[var(--theme-text)] transition-colors">
                  Локации и визуальные темы
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[var(--theme-text)] transition-colors">
                  Барная карта & Меню
                </a>
              </li>
              <li>
                <a href="#nutrition" className="hover:text-[var(--theme-text)] transition-colors">
                  Таблица КБЖУ (Демо)
                </a>
              </li>
              <li>
                <a href="#loyalty" className="hover:text-[var(--theme-text)] transition-colors">
                  Vincent Van Club (Концепт)
                </a>
              </li>
              <li>
                <button
                  onClick={() => openFeedbackModal()}
                  className="hover:text-[var(--theme-text)] transition-colors text-left"
                >
                  Оставить отзыв
                </button>
              </li>
              <li>
                <button
                  onClick={() => openTipsModal()}
                  style={{ color: "var(--theme-primary)" }}
                  className="hover:underline transition-colors text-left flex items-center gap-1 font-bold"
                >
                  <Heart className="h-3 w-3 fill-current" />
                  <span>Чаевые бариста</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider">
              Контакты
            </h4>
            <div style={{ color: "var(--theme-muted)" }} className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone style={{ color: "var(--theme-primary)" }} className="h-3.5 w-3.5" />
                <a href={`tel:${selectedLocation.phone}`} className="font-semibold hover:text-[var(--theme-text)] transition-colors">
                  {selectedLocation.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail style={{ color: "var(--theme-primary)" }} className="h-3.5 w-3.5" />
                <a href="mailto:hello@vancoffee.ru" className="hover:text-[var(--theme-text)] transition-colors">
                  hello@vancoffee.ru
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[11px]">
                <MapPin style={{ color: "var(--theme-primary)" }} className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>г. Иркутск, ул. Киевская, 1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and disclaimers */}
        <div style={{ color: "var(--theme-muted)" }} className="mt-12 border-t border-black/5 dark:border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} Vincent Van Coffee (Иркутск). Все права защищены.
          </div>
          <div className="flex items-center gap-3">
            <span>Прототип сайта сети кофеен</span>
            <span>•</span>
            <a href="https://2gis.ru/irkutsk/firm/70000001034459238" target="_blank" rel="noreferrer" className="hover:underline">
              Профиль в 2ГИС
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
