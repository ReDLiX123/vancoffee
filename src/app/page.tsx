"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { MenuSection } from "@/components/sections/MenuSection";
import { NutritionSection } from "@/components/sections/NutritionSection";
import { LoyaltySection } from "@/components/sections/LoyaltySection";
import { FeedbackAndTipsSection } from "@/components/sections/FeedbackAndTipsSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { Footer } from "@/components/layout/Footer";

import { TipsModal } from "@/components/modals/TipsModal";
import { FeedbackModal } from "@/components/modals/FeedbackModal";
import { RouteModal } from "@/components/modals/RouteModal";
import { useApp } from "@/context/AppContext";

export default function HomePage() {
  const { selectedLocationId } = useApp();

  return (
    <main
      data-location={selectedLocationId}
      className="theme-container relative min-h-screen overflow-x-hidden selection:bg-[var(--theme-primary)] selection:text-white"
    >
      {/* Fixed Dynamic Header */}
      <Header />

      {/* Main Content Sections */}
      <HeroSection />
      <LocationsSection />
      <MenuSection />
      <NutritionSection />
      <LoyaltySection />
      <FeedbackAndTipsSection />
      <NewsSection />

      {/* Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <TipsModal />
      <FeedbackModal />
      <RouteModal />
    </main>
  );
}
