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

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0C0A09] text-[#FAF7F2] overflow-x-hidden selection:bg-[#D49B45] selection:text-[#0C0A09]">
      {/* Fixed Header */}
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
