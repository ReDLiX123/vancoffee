"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp, LocationId } from "@/context/AppContext";
import { LOCATIONS } from "@/data/coffeeData";
import {
  Heart,
  Globe,
  Menu as MenuIcon,
  X,
  ChevronDown,
  Navigation,
  Palette,
} from "lucide-react";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { BrushStroke } from "@/components/ui/BrushStroke";

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

  const [activeSection, setActiveSection] = useState<string>("#locations");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { label: { ru: "Локации", en: "Locations", zh: "门店" }, href: "#locations" },
    { label: { ru: "Меню", en: "Menu", zh: "菜单" }, href: "#menu" },
    { label: { ru: "КБЖУ", en: "Nutrition", zh: "热量与营养" }, href: "#nutrition" },
    { label: { ru: "Клуб", en: "Club", zh: "会员俱乐部" }, href: "#loyalty" },
    { label: { ru: "Отзывы", en: "Reviews", zh: "客评" }, href: "#feedback" },
    { label: { ru: "Новости", en: "Journal", zh: "动态" }, href: "#news" },
  ];

  // Scroll detection & Scroll-Spy with IntersectionObserver
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sectionIds = ["locations", "menu", "nutrition", "loyalty", "feedback", "news"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${id}`);
            }
          });
        },
        { rootMargin: "-25% 0px -55% 0px", threshold: 0.1 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const strokeColor = selectedLocation.theme.primaryColor;

  return (
    <>
      <header
        style={{
          backgroundColor: isScrolled ? "var(--theme-header-bg)" : "transparent",
          borderBottomColor: isScrolled ? "var(--theme-surface-border)" : "transparent",
        }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "border-b backdrop-blur-xl shadow-md py-3"
            : "bg-gradient-to-b from-[var(--theme-bg)]/90 via-[var(--theme-bg)]/40 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Monogram & Name */}
          <a href="#" className="group flex items-center gap-3 shrink-0">
            <div
              style={{
                borderColor: "var(--theme-primary)",
                backgroundColor: "var(--theme-surface)",
                color: "var(--theme-primary)",
              }}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-transform group-hover:scale-105"
            >
              <span className="font-serif text-lg font-bold">V</span>
              <span
                style={{ backgroundColor: "var(--theme-primary)" }}
                className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white/50 transition-colors duration-500"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight leading-tight whitespace-nowrap">
                Vincent Van Coffee
              </span>
              <span
                style={{ color: "var(--theme-primary)" }}
                className="text-[10px] tracking-widest uppercase font-semibold whitespace-nowrap transition-colors duration-500"
              >
                Иркутск • {selectedLocation.shortName}
              </span>
            </div>
          </a>

          {/* Desktop Navigation with Animated Brush Strokes */}
          <nav className="hidden items-center gap-5 md:flex lg:gap-8 shrink-0">
            {navLinks.map((link, idx) => {
              const isCurrent = activeSection === link.href;
              const isHovered = hoveredLink === link.href;
              const isHighlighted = isHovered || (!hoveredLink && isCurrent);

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative py-1.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                    isHighlighted ? "text-[var(--theme-text)] opacity-100" : "text-[var(--theme-muted)] hover:opacity-100"
                  }`}
                >
                  <span className="relative z-10">{link.label[language]}</span>

                  {/* Dynamic Brush Stroke Indicator using active location primary color */}
                  <AnimatePresence>
                    {isHighlighted && (
                      <BrushStroke
                        variant={(idx % 3) as 0 | 1 | 2}
                        color={strokeColor}
                      />
                    )}
                  </AnimatePresence>
                </a>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="hidden items-center gap-3 sm:flex shrink-0">
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
                className="flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur-md transition-all hover:shadow-md whitespace-nowrap"
              >
                <div
                  style={{ backgroundColor: selectedLocation.theme.primaryColor }}
                  className="h-2 w-2 rounded-full animate-pulse shrink-0 transition-colors duration-500"
                />
                <span className="max-w-[130px] truncate font-semibold">{selectedLocation.shortName}</span>
                <ChevronDown className="h-3 w-3 opacity-60 shrink-0" />
              </button>

              {isLocationDropdownOpen && (
                <div
                  style={{
                    backgroundColor: "var(--theme-surface)",
                    borderColor: "var(--theme-surface-border)",
                  }}
                  className="absolute right-0 top-full mt-2 w-72 rounded-2xl border p-2 shadow-2xl backdrop-blur-2xl z-50 transition-colors duration-500"
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
                  className="absolute right-0 top-full mt-2 w-28 rounded-2xl border p-1.5 shadow-2xl z-50 transition-colors duration-500"
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
              className="flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm transition-transform active:scale-95"
              aria-label="Открыть меню"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Staggered Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: "var(--theme-bg)",
              color: "var(--theme-text)",
            }}
            className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 md:hidden backdrop-blur-3xl overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-5">
              <div className="flex items-center gap-2.5">
                <div
                  style={{
                    backgroundColor: "var(--theme-surface)",
                    borderColor: "var(--theme-primary)",
                    color: "var(--theme-primary)",
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border font-serif font-bold text-base"
                >
                  V
                </div>
                <div>
                  <div className="font-serif font-bold text-base leading-tight">Vincent Van Coffee</div>
                  <div style={{ color: "var(--theme-primary)" }} className="text-[10px] uppercase tracking-wider font-semibold">
                    {selectedLocation.shortName}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  backgroundColor: "var(--theme-surface)",
                  borderColor: "var(--theme-surface-border)",
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border"
                aria-label="Закрыть меню"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Staggered Navigation Items with Brush Stroke on Active */}
            <div className="my-auto py-8 space-y-4">
              {navLinks.map((link, idx) => {
                const isCurrent = activeSection === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{
                      duration: 0.4,
                      delay: 0.08 * idx,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group relative inline-flex items-baseline gap-3 text-3xl sm:text-4xl font-serif font-bold transition-colors"
                    >
                      <span
                        style={{ color: "var(--theme-primary)" }}
                        className="text-xs font-mono font-semibold tracking-wider opacity-60"
                      >
                        0{idx + 1}
                      </span>
                      <span className="group-hover:text-[var(--theme-primary)] transition-colors">
                        {link.label[language]}
                      </span>

                      {isCurrent && (
                        <BrushStroke
                          variant={(idx % 3) as 0 | 1 | 2}
                          color={strokeColor}
                          className="-bottom-2"
                        />
                      )}
                    </a>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Controls: Language, Location Switcher & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="space-y-4 border-t border-black/10 dark:border-white/10 pt-5"
            >
              {/* Location Picker */}
              <div>
                <div style={{ color: "var(--theme-muted)" }} className="text-[11px] font-bold uppercase tracking-wider mb-2">
                  Стиль атмосферы и локация:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {LOCATIONS.map((loc) => {
                    const isSelected = loc.id === selectedLocationId;
                    return (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocationId(loc.id as LocationId)}
                        style={{
                          backgroundColor: isSelected ? "var(--theme-surface-elevated)" : "var(--theme-surface)",
                          borderColor: isSelected ? loc.theme.primaryColor : "var(--theme-surface-border)",
                        }}
                        className="rounded-xl border p-2 text-left text-xs transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold truncate">{loc.shortName}</span>
                          <span
                            style={{ backgroundColor: loc.theme.primaryColor }}
                            className="h-2 w-2 rounded-full shrink-0 ml-1"
                          />
                        </div>
                        <div style={{ color: "var(--theme-muted)" }} className="text-[10px] truncate mt-0.5">
                          {loc.theme.styleName.split("&")[0]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Language + CTA */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="flex gap-1">
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

                <ShimmerButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openTipsModal();
                  }}
                  className="py-2.5 px-4 text-xs font-bold"
                >
                  <div className="flex items-center gap-1.5">
                    <Heart className="h-3.5 w-3.5 fill-current" />
                    <span>Чаевые</span>
                  </div>
                </ShimmerButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
