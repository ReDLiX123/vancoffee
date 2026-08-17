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
  Phone,
} from "lucide-react";
import { SoundToggle } from "@/components/ui/SoundToggle";
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
    { label: { ru: "Локации", en: "Locations", zh: "门店" }, href: "#locations" },
    { label: { ru: "Меню", en: "Menu", zh: "菜单" }, href: "#menu" },
    { label: { ru: "КБЖУ", en: "Nutrition", zh: "热量与营养" }, href: "#nutrition" },
    { label: { ru: "Клуб", en: "Club", zh: "会员俱乐部" }, href: "#loyalty" },
    { label: { ru: "Отзывы", en: "Reviews", zh: "客评" }, href: "#feedback" },
    { label: { ru: "Новости", en: "Journal", zh: "动态" }, href: "#news" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "border-b border-[#D49B45]/15 bg-[#0C0A09]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3.5"
            : "bg-gradient-to-b from-[#0C0A09]/95 via-[#0C0A09]/60 to-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Monogram & Name */}
          <a href="#" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#D49B45]/40 bg-gradient-to-br from-[#291F18] to-[#120F0D] shadow-[0_0_15px_rgba(212,155,69,0.2)] transition-transform group-hover:scale-105">
              <span className="font-serif text-lg font-bold text-[#F3CA74]">V</span>
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#D49B45]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#FAF7F2] group-hover:text-[#F3CA74] transition-colors">
                Vincent Van Coffee
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#D49B45]/90">
                Иркутск • Specialty Coffee
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium uppercase tracking-wider text-[#A89B8D] transition-colors hover:text-[#F3CA74]"
              >
                {link.label[language]}
              </a>
            ))}
          </nav>

          {/* Right Action Tools */}
          <div className="hidden items-center gap-3 sm:flex">
            {/* Location selector dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLocationDropdownOpen(!isLocationDropdownOpen);
                  setIsLangDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#16120F]/90 px-3 py-1.5 text-xs text-[#FAF7F2] backdrop-blur-md transition-colors hover:border-[#D49B45]/40"
              >
                <MapPin className="h-3.5 w-3.5 text-[#D49B45]" />
                <span className="max-w-[110px] truncate font-medium">{selectedLocation.shortName}</span>
                <ChevronDown className="h-3 w-3 text-[#A89B8D]" />
              </button>

              {isLocationDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-[#D49B45]/30 bg-[#16120F] p-2 shadow-2xl backdrop-blur-xl">
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#A89B8D]">
                    Выберите кофейню в Иркутске
                  </div>
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setSelectedLocationId(loc.id as LocationId);
                        setIsLocationDropdownOpen(false);
                      }}
                      className={`flex w-full flex-col rounded-xl px-3 py-2 text-left text-xs transition-colors ${
                        loc.id === selectedLocationId
                          ? "bg-[#D49B45]/20 text-[#F3CA74]"
                          : "text-[#FAF7F2] hover:bg-white/5"
                      }`}
                    >
                      <span className="font-semibold">{loc.shortName}</span>
                      <span className="text-[10px] text-[#A89B8D] truncate">{loc.landmark}</span>
                    </button>
                  ))}
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
                className="flex items-center gap-1 rounded-full border border-white/10 bg-[#16120F]/90 px-2.5 py-1.5 text-xs font-semibold text-[#A89B8D] backdrop-blur-md transition-colors hover:border-[#D49B45]/40 hover:text-white"
              >
                <Globe className="h-3.5 w-3.5 text-[#D49B45]" />
                <span className="uppercase">{language}</span>
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-28 rounded-2xl border border-[#D49B45]/30 bg-[#16120F] p-1.5 shadow-2xl">
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
                        language === l.code
                          ? "bg-[#D49B45]/20 text-[#F3CA74]"
                          : "text-[#FAF7F2] hover:bg-white/5"
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-[10px] uppercase text-[#A89B8D]">{l.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sound Ambiance Toggle */}
            <SoundToggle />

            {/* CTA Tips Button */}
            <ShimmerButton
              onClick={() => openTipsModal()}
              className="px-4 py-2 text-xs"
            >
              <div className="flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 text-[#F3CA74] fill-[#F3CA74]/20" />
                <span className="font-semibold">Чаевые</span>
              </div>
            </ShimmerButton>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 md:hidden">
            <SoundToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#16120F] text-[#FAF7F2]"
              aria-label="Открыть меню"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col bg-[#0C0A09]/98 pt-24 px-6 pb-8 backdrop-blur-2xl md:hidden overflow-y-auto">
          {/* Language selector for mobile */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-medium text-[#A89B8D] uppercase tracking-wider">
              Язык меню / Language
            </span>
            <div className="flex gap-1.5">
              {(["ru", "en", "zh"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold uppercase transition-colors ${
                    language === l
                      ? "bg-[#D49B45] text-[#0C0A09]"
                      : "bg-white/5 text-[#A89B8D]"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Location quick picker */}
          <div className="mt-4 border-b border-white/10 pb-4">
            <span className="text-xs font-medium text-[#A89B8D] uppercase tracking-wider">
              Текущая кофейня
            </span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocationId(loc.id as LocationId)}
                  className={`rounded-xl border p-2 text-left text-xs ${
                    loc.id === selectedLocationId
                      ? "border-[#D49B45] bg-[#D49B45]/20 text-[#F3CA74]"
                      : "border-white/10 bg-[#16120F] text-[#FAF7F2]"
                  }`}
                >
                  <div className="font-semibold truncate">{loc.shortName}</div>
                  <div className="text-[10px] text-[#A89B8D] truncate">{loc.landmark}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-2xl font-semibold text-[#FAF7F2] transition-colors hover:text-[#F3CA74]"
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
                <Heart className="h-4 w-4 text-[#F3CA74] fill-[#F3CA74]/20" />
                <span>Оставить чаевые бариста</span>
              </div>
            </ShimmerButton>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openRouteModal();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#1D1714] py-3 text-xs font-semibold text-[#FAF7F2]"
            >
              <Navigation className="h-4 w-4 text-[#D49B45]" />
              <span>Маршрут до {selectedLocation.shortName}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
