"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { LOCATIONS } from "@/data/coffeeData";
import {
  MapPin,
  Phone,
  Mail,
  Heart,
} from "lucide-react";

export const Footer: React.FC = () => {
  const { language, selectedLocation, openTipsModal, openFeedbackModal } = useApp();

  return (
    <footer
      style={{
        backgroundColor: "var(--theme-surface)",
        borderColor: "var(--theme-surface-border)",
      }}
      className="border-t py-16 transition-colors duration-500"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div
                style={{
                  backgroundColor: "var(--theme-badge-bg)",
                  borderColor: "var(--theme-primary)",
                  color: "var(--theme-primary)",
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border font-serif text-lg font-bold"
              >
                V
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">
                Vincent Van Coffee
              </span>
            </div>

            <p style={{ color: "var(--theme-muted)" }} className="text-xs leading-relaxed max-w-sm">
              Живописный спешелти кофе и 4 пространства в Иркутске. Каждая точка оформлена в своей авторской палитре.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://t.me/vancoffee38"
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: "var(--theme-surface-elevated)",
                  borderColor: "var(--theme-surface-border)",
                }}
                className="rounded-xl border p-2.5 transition-transform hover:scale-110"
                aria-label="Telegram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.92 9.06c-.14.65-.53.81-1.07.5l-2.95-2.18-1.42 1.37c-.16.16-.29.29-.6.29l.21-3.01 5.48-4.95c.24-.21-.05-.33-.37-.12l-6.78 4.27-2.92-.91c-.63-.2-.65-.63.13-.94l11.41-4.4c.53-.19.99.13.84.97z" />
                </svg>
              </a>
              <a
                href="https://vk.com/vincentvancoffee"
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: "var(--theme-surface-elevated)",
                  borderColor: "var(--theme-surface-border)",
                }}
                className="rounded-xl border p-2.5 transition-transform hover:scale-110"
                aria-label="VK"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.684 0H8.316C2.992 0 0 2.992 0 8.316v7.368C0 21.008 2.992 24 8.316 24h7.368C21.008 24 24 21.008 24 15.684V8.316C24 2.992 21.008 0 15.684 0zm3.602 17.158h-1.674c-.633 0-.827-.503-1.966-1.644-1-.96-1.442-1.084-1.69-1.084-.347 0-.446.099-.446.57v1.492c0 .4-.124.64-1.19.64-1.76 0-3.714-1.066-5.09-3.05-2.083-2.92-2.653-5.116-2.653-5.562 0-.248.099-.472.57-.472h1.674c.421 0 .57.198.744.67.818 2.378 2.182 4.464 2.752 4.464.223 0 .322-.099.322-.644V10.87c-.074-1.14-.669-1.24-.669-1.644 0-.198.174-.4.446-.4h2.777c.372 0 .521.198.521.62v3.344c0 .347.149.472.248.472.223 0 .421-.124.843-.546 1.314-1.464 2.256-3.714 2.256-3.714.124-.248.322-.472.744-.472h1.674c.521 0 .644.273.521.644-.223.992-2.306 3.937-2.306 3.937-.198.322-.273.472 0 .843.198.273.843.818 1.289 1.34 1.017 1.165 1.81 2.145 2.033 2.815.223.644-.124.943-.719.943z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider">
              Локации в Иркутске
            </h4>
            <ul style={{ color: "var(--theme-muted)" }} className="space-y-2 text-xs">
              {LOCATIONS.map((loc) => (
                <li key={loc.id}>
                  <a href="#locations" className="hover:text-[var(--theme-text)] transition-colors">
                    {loc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
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
                  Таблица КБЖУ
                </a>
              </li>
              <li>
                <a href="#loyalty" className="hover:text-[var(--theme-text)] transition-colors">
                  Vincent Van Club
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

        {/* Bottom copyright */}
        <div style={{ color: "var(--theme-muted)" }} className="mt-12 border-t border-black/5 dark:border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} Vincent Van Coffee (Иркутск). Все права защищены.
          </div>
          <div className="flex items-center gap-3">
            <span>Сеть авторских кофеен</span>
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
