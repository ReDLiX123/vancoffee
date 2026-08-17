"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { LOCATIONS, LocationItem } from "@/data/coffeeData";

export type Language = "ru" | "en" | "zh";
export type LocationId = "kievskaya" | "madyar" | "silver" | "noviy";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  selectedLocationId: LocationId;
  setSelectedLocationId: (id: LocationId) => void;
  selectedLocation: LocationItem;
  
  // Modals
  isTipsModalOpen: boolean;
  openTipsModal: (locId?: LocationId) => void;
  closeTipsModal: () => void;
  
  isFeedbackModalOpen: boolean;
  openFeedbackModal: (locId?: LocationId) => void;
  closeFeedbackModal: () => void;

  isRouteModalOpen: boolean;
  openRouteModal: (locId?: LocationId) => void;
  closeRouteModal: () => void;
  
  isMenuDrawerOpen: boolean;
  setIsMenuDrawerOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("ru");
  const [selectedLocationId, setSelectedLocationId] = useState<LocationId>("kievskaya");
  
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  const selectedLocation = LOCATIONS.find((l) => l.id === selectedLocationId) || LOCATIONS[0];

  const openTipsModal = (locId?: LocationId) => {
    if (locId) setSelectedLocationId(locId);
    setIsTipsModalOpen(true);
  };

  const closeTipsModal = () => setIsTipsModalOpen(false);

  const openFeedbackModal = (locId?: LocationId) => {
    if (locId) setSelectedLocationId(locId);
    setIsFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => setIsFeedbackModalOpen(false);

  const openRouteModal = (locId?: LocationId) => {
    if (locId) setSelectedLocationId(locId);
    setIsRouteModalOpen(true);
  };

  const closeRouteModal = () => setIsRouteModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        selectedLocationId,
        setSelectedLocationId,
        selectedLocation,
        isTipsModalOpen,
        openTipsModal,
        closeTipsModal,
        isFeedbackModalOpen,
        openFeedbackModal,
        closeFeedbackModal,
        isRouteModalOpen,
        openRouteModal,
        closeRouteModal,
        isMenuDrawerOpen,
        setIsMenuDrawerOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
