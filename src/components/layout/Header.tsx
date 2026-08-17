"use client";

import React, { useState, useEffect } from "react";
import { useApp, Language, LocationId } from "@/context/AppContext";
import { LOCATIONS } from "@/data/coffeeData";
import {
  MapPin,
  Heart,
  Globe,
  Menu as MenuIcon,
  X,
  Sparkles,
  ChevronDown,
  Navigation,
  Palette,
} from "lucide-react";
import { ShimmerButton } from "@/components/ui/ShimmerButton";

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    selectedLocationId,
    setSelectedLocationId,
    selectedLocation,
    openTipsModal,
    openRouteModal,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: { ru: "Локации & Темы", en: "Locations", zh: "门店与主题" }, href: "#locations" },
    { label: { ru: "Меню", en: "Menu", zh: "菜单" }, href: "#menu" },
    { label: { ru: "КБЖУ", en: "Nutrition", zh: "热量与营养" }, href: "#nutrition" },
    { label: { ru: "Клуб (Концепт)", en: "Club", zh: "会员俱乐部" }, href: "#loyalty" },
    { label: { ru: "Отзывы", en: "Reviews", zh: "客评" }, href: "#feedback" },
    { label: { ru: "Новости", en: "Journal", zh: "动态" }, href: "#news" },
  ];

  return (
    <>
      <header
        style={{
          backgroundColor: isScrolled ? "var(--theme-header-bg)" : "transparent",
          borderBottomColor: isScrolled ? "var(--theme-surface-border)" : "transparent",
        }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "border-b backdrop-blur-xl shadow-md py-3.5"
            : "bg-gradient-to-b from-[var(--theme-bg)]/90 via-[var(--theme-bg)]/40 to-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Monogram & Name */}
          <a href="#" className="group flex items-center gap-3">
            <div
              style={{
                borderColor: "var(--theme-primary)",
                backgroundColor: "var(--theme-surface)",
                color: "var(--theme-primary)",
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm transition-transform group-hover:scale-105"
            >
              <span className="font-serif text-lg font-bold">V</span>
              <span
                style={{ backgroundColor: "var(--theme-accent)" }}
                className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white/50"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight leading-tight">
                Vincent Van Coffee
              </span>
              <span
                style={{ color: "var(--theme-primary)" }}
                className="text-[10px] tracking-widest uppercase font-semibold"
              >
                Иркутск • {selectedLocation.theme.styleName}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider opacity-75 transition-all hover:opacity-100"
                style={{ color: "var(--theme-text)" }}
              >
                {link.label[language]}
              </a>
            ))}
          </nav>

          {/* Right Action Tools */}
          <div className="hidden items-center gap-3 sm:flex">
            {/* Location & Dynamic Theme Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLocationDropdownOpen(!isLocationDropdownOpen);
                  setIsLangDropdownOpen(false);
                }}
                style={{
                  backgroundColor: "var(--theme-surface)",
                  borderColor: "var(--theme-surface-border)",
                  color: "var(--theme-text)",
                }}
                className="flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur-md transition-all hover:shadow-md"
              >
                <div
                  style={{ backgroundColor: selectedLocation.theme.primaryColor }}
                  className="h-2 w-2 rounded-full animate-pulse"
                />
                <span className="max-w-[130px] truncate font-semibold">{selectedLocation.shortName}</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </button>

              {isLocationDropdownOpen && (
                <div
                  style={{
                    backgroundColor: "var(--theme-surface)",
                    borderColor: "var(--theme-surface-border)",
                  }}
                  className="absolute right-0 top-full mt-2 w-72 rounded-2xl border p-2 shadow-2xl backdrop-blur-2xl z-50"
                >
                  <div
                    style={{ color: "var(--theme-muted)" }}
                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between"
                  >
                    <span>Локации и стили оформления</span>
                    <Palette className="h-3 w-3" />
                  </div>
                  {LOCATIONS.map((loc) => {
                    const isSelected = loc.id === selectedLocationId;
                    return (
                      <button
                        key={loc.id}
                        onClick={() => {
                          setSelectedLocationId(loc.id as LocationId);
                          setIsLocationDropdownOpen(false);
                        }}
                        style={{
                          backgroundColor: isSelected ? "var(--theme-badge-bg)" : "transparent",
                          color: isSelected ? "var(--theme-primary)" : "var(--theme-text)",
                        }}
                        className="flex w-full flex-col rounded-xl px-3 py-2 text-left text-xs transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{loc.shortName}</span>
                          <span
                            style={{ backgroundColor: loc.theme.primaryColor }}
                            className="h-2 w-2 rounded-full"
                          />
                        </div>
                        <span className="text-[10px] opacity-70 truncate">{loc.theme.styleName}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLangDropdownOpen(!isLangDropdownOpen);
                  setIsLocationDropdownOpen(false);
                }}
                style={{
                  backgroundColor: "var(--theme-surface)",
                  borderColor: "var(--theme-surface-border)",
                  color: "var(--theme-text)",
                }}
                className="flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-semibold backdrop-blur-md transition-colors"
              >
                <Globe className="h-3.5 w-3.5 opacity-70" />
                <span className="uppercase">{language}</span>
              </button>

              {isLangDropdownOpen && (
                <div
                  style={{
                    backgroundColor: "var(--theme-surface)",
                    borderColor: "var(--theme-surface-border)",
                  }}
                  className="absolute right-0 top-full mt-2 w-28 rounded-2xl border p-1.5 shadow-2xl z-50"
                >
                  {(
                    [
                      { code: "ru", label: "Русский" },
                      { code: "en", label: "English" },
                      { code: "zh", label: "中文" },
                    ] as const
                  ).map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        language === l.code ? "font-bold text-[var(--theme-primary)]" : "hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-[10px] uppercase opacity-60">{l.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Tips Button */}
            <ShimmerButton
              onClick={() => openTipsModal()}
              className="px-4 py-2 text-xs"
            >
              <div className="flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 fill-current" />
                <span className="font-semibold">Чаевые</span>
              </div>
            </ShimmerButton>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                backgroundColor: "var(--theme-surface)",
                borderColor: "var(--theme-surface-border)",
                color: "var(--theme-text)",
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border"
              aria-label="Открыть меню"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          style={{ backgroundColor: "var(--theme-bg)" }}
          className="fixed inset-0 z-30 flex flex-col pt-24 px-6 pb-8 backdrop-blur-2xl md:hidden overflow-y-auto"
        >
          {/* Language selector for mobile */}
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
            <span className="text-xs font-medium opacity-70 uppercase tracking-wider">
              Язык меню / Language
            </span>
            <div className="flex gap-1.5">
              {(["ru", "en", "zh"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  style={{
                    backgroundColor: language === l ? "var(--theme-primary)" : "var(--theme-surface)",
                    color: language === l ? "#FFFFFF" : "var(--theme-text)",
                  }}
                  className="rounded-lg px-2.5 py-1 text-xs font-bold uppercase transition-colors"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Location & Theme quick picker */}
          <div className="mt-4 border-b border-black/10 dark:border-white/10 pb-4">
            <span className="text-xs font-medium opacity-70 uppercase tracking-wider">
              Локация и оформление
            </span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {LOCATIONS.map((loc) => {
                const isSelected = loc.id === selectedLocationId;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocationId(loc.id as LocationId)}
                    style={{
                      backgroundColor: isSelected ? "var(--theme-surface-elevated)" : "var(--theme-surface)",
                      borderColor: isSelected ? "var(--theme-primary)" : "var(--theme-surface-border)",
                    }}
                    className="rounded-xl border p-2.5 text-left text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold truncate">{loc.shortName}</span>
                      <span
                        style={{ backgroundColor: loc.theme.primaryColor }}
                        className="h-2 w-2 rounded-full shrink-0 ml-1"
                      />
                    </div>
                    <div className="text-[10px] opacity-70 truncate mt-0.5">{loc.theme.styleName}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-2xl font-semibold transition-colors hover:text-[var(--theme-primary)]"
              >
                {link.label[language]}
              </a>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-auto pt-8 flex flex-col gap-3">
            <ShimmerButton
              onClick={() => {
                setIsMobileMenuOpen(false);
                openTipsModal();
              }}
              className="w-full py-3 text-sm font-semibold"
            >
              <div className="flex items-center justify-center gap-2">
                <Heart className="h-4 w-4 fill-current" />
                <span>Оставить чаевые бариста</span>
              </div>
            </ShimmerButton>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openRouteModal();
              }}
              style={{
                backgroundColor: "var(--theme-surface)",
                borderColor: "var(--theme-surface-border)",
                color: "var(--theme-text)",
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-xs font-semibold"
            >
              <Navigation className="h-4 w-4 text-[var(--theme-primary)]" />
              <span>Маршрут до {selectedLocation.shortName}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
