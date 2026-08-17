"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { LOCATIONS } from "@/data/coffeeData";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import confetti from "canvas-confetti";

export const FeedbackModal: React.FC = () => {
  const { isFeedbackModalOpen, closeFeedbackModal, selectedLocationId, setSelectedLocationId } = useApp();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>(["Вкусный кофе"]);
  const [authorName, setAuthorName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isFeedbackModalOpen) return null;

  const activeLoc = LOCATIONS.find((l) => l.id === selectedLocationId) || LOCATIONS[0];

  const availableTags = [
    "Вкусный кофе",
    "Улыбка бариста",
    "Уютная атмосфера",
    "Любимая музыка",
    "Быстрая отдача",
    "Свежая выпечка",
    "Красивая подача",
    "Чистота и свет",
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#A84B2C", "#606C38", "#DDA15E"],
    });
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setAuthorName("");
    setReviewText("");
    closeFeedbackModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeFeedbackModal}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-surface-border)",
            color: "var(--theme-text)",
          }}
          className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border p-6 shadow-2xl sm:p-8 z-10"
        >
          {/* Close button */}
          <button
            onClick={closeFeedbackModal}
            className="absolute right-5 top-5 rounded-full p-2 opacity-60 transition-opacity hover:opacity-100"
          >
            <X className="h-5 w-5" />
          </button>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="relative z-10">
              {/* Badge & Title */}
              <div className="flex items-center gap-2">
                <div
                  style={{
                    backgroundColor: "var(--theme-badge-bg)",
                    color: "var(--theme-primary)",
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                >
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span style={{ color: "var(--theme-primary)" }} className="text-xs font-bold tracking-wider uppercase">
                  Вы делаете нас лучше
                </span>
              </div>

              <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-bold">
                Оставить отзыв
              </h3>
              <p style={{ color: "var(--theme-muted)" }} className="mt-1.5 text-sm">
                Поделитесь впечатлением от посещения «Vincent Van Coffee».
              </p>

              {/* Location Select */}
              <div className="mt-5">
                <label style={{ color: "var(--theme-muted)" }} className="text-xs font-bold uppercase tracking-wider">
                  Кофейня
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {LOCATIONS.map((loc) => {
                    const isSelected = loc.id === selectedLocationId;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setSelectedLocationId(loc.id as any)}
                        style={{
                          backgroundColor: isSelected ? "var(--theme-surface-elevated)" : "transparent",
                          borderColor: isSelected ? loc.theme.primaryColor : "var(--theme-surface-border)",
                        }}
                        className="flex flex-col items-start rounded-xl border p-2 text-left text-xs transition-all"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-bold truncate">{loc.shortName}</span>
                          <span
                            style={{ backgroundColor: loc.theme.primaryColor }}
                            className="h-2 w-2 rounded-full"
                          />
                        </div>
                        <span style={{ color: "var(--theme-muted)" }} className="truncate text-[10px]">{loc.landmark}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Star Rating */}
              <div className="mt-5">
                <label style={{ color: "var(--theme-muted)" }} className="text-xs font-bold uppercase tracking-wider">
                  Ваша оценка
                </label>
                <div className="mt-2 flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="rounded-lg p-1 transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          style={{
                            color: isFilled ? "var(--theme-primary)" : "var(--theme-surface-border)",
                            fill: isFilled ? "var(--theme-primary)" : "transparent",
                          }}
                          className="h-7 w-7 transition-colors"
                        />
                      </button>
                    );
                  })}
                  <span style={{ color: "var(--theme-primary)" }} className="ml-2 text-xs font-bold">
                    {rating === 5 ? "Превосходно!" : rating === 4 ? "Очень хорошо" : `${rating} из 5`}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4">
                <label style={{ color: "var(--theme-muted)" }} className="text-xs font-bold uppercase tracking-wider">
                  Что вам особенно понравилось?
                </label>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {availableTags.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        style={{
                          backgroundColor: active ? "var(--theme-badge-bg)" : "var(--theme-surface-elevated)",
                          borderColor: active ? "var(--theme-primary)" : "var(--theme-surface-border)",
                          color: active ? "var(--theme-primary)" : "var(--theme-text)",
                        }}
                        className="rounded-full border px-3 py-1 text-xs transition-all font-medium"
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Text */}
              <div className="mt-4 space-y-3">
                <div>
                  <label style={{ color: "var(--theme-muted)" }} className="text-xs font-bold uppercase tracking-wider">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например, Анна"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    style={{
                      backgroundColor: "var(--theme-surface-elevated)",
                      borderColor: "var(--theme-surface-border)",
                      color: "var(--theme-text)",
                    }}
                    className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--theme-primary)]"
                  />
                </div>
                <div>
                  <label style={{ color: "var(--theme-muted)" }} className="text-xs font-bold uppercase tracking-wider">
                    Отзыв или пожелание
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Расскажите о вашем впечатлении..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    style={{
                      backgroundColor: "var(--theme-surface-elevated)",
                      borderColor: "var(--theme-surface-border)",
                      color: "var(--theme-text)",
                    }}
                    className="mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--theme-primary)]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="mt-6">
                <ShimmerButton type="submit" className="w-full py-3.5 text-base font-bold">
                  <div className="flex items-center justify-center gap-2">
                    <span>Отправить отзыв</span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                </ShimmerButton>
              </div>
            </form>
          ) : (
            <div className="relative z-10 py-6 text-center">
              <div
                style={{
                  backgroundColor: "var(--theme-badge-bg)",
                  color: "var(--theme-primary)",
                }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              >
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold">
                Благодарим вас, {authorName || "дорогой гость"}!
              </h3>
              <p style={{ color: "var(--theme-muted)" }} className="mt-2 text-sm">
                Ваш отзыв передан управляющему точки «{activeLoc.shortName}». Вы действительно делаете нас лучше!
              </p>

              <div className="mt-6">
                <button
                  onClick={handleClose}
                  style={{
                    backgroundColor: "var(--theme-primary)",
                    color: "#FFFFFF",
                  }}
                  className="rounded-xl px-6 py-2.5 text-xs font-bold transition-transform hover:scale-105"
                >
                  Вернуться на сайт
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
