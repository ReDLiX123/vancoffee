"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, MessageSquare, Sparkles, CheckCircle2, ThumbsUp } from "lucide-react";
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
      colors: ["#D49B45", "#F3CA74", "#FAF7F2"],
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
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[#D49B45]/30 bg-[#16120F] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] sm:p-8"
        >
          {/* Header subtle glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-[#D49B45]/15 blur-3xl" />

          {/* Close button */}
          <button
            onClick={closeFeedbackModal}
            className="absolute right-5 top-5 rounded-full p-2 text-[#A89B8D] transition-colors hover:bg-white/5 hover:text-[#FAF7F2]"
          >
            <X className="h-5 w-5" />
          </button>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="relative z-10">
              {/* Badge & Title */}
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D49B45]/30 bg-[#D49B45]/10 text-[#F3CA74]">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#D49B45]">
                  Вы делаете нас лучше
                </span>
              </div>

              <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-[#FAF7F2]">
                Оставить отзыв
              </h3>
              <p className="mt-1.5 text-sm text-[#A89B8D]">
                Поделитесь впечатлением от посещения «Vincent Van Coffee». Мы читаем каждое слово и постоянно растем!
              </p>

              {/* Location Select */}
              <div className="mt-5">
                <label className="text-xs font-medium text-[#A89B8D] uppercase tracking-wider">
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
                        className={`flex flex-col items-start rounded-xl border p-2 text-left text-xs transition-all ${
                          isSelected
                            ? "border-[#D49B45] bg-[#D49B45]/15 text-[#FAF7F2]"
                            : "border-white/10 bg-[#1D1714] text-[#A89B8D] hover:border-white/20"
                        }`}
                      >
                        <span className="font-semibold text-white truncate">{loc.shortName}</span>
                        <span className="truncate text-[10px] text-[#A89B8D]">{loc.landmark}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Star Rating */}
              <div className="mt-5">
                <label className="text-xs font-medium text-[#A89B8D] uppercase tracking-wider">
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
                          className={`h-7 w-7 transition-colors ${
                            isFilled
                              ? "fill-[#F3CA74] text-[#F3CA74]"
                              : "fill-transparent text-[#70655B]"
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-2 text-xs font-semibold text-[#F3CA74]">
                    {rating === 5 ? "Превосходно!" : rating === 4 ? "Очень хорошо" : `${rating} из 5`}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4">
                <label className="text-xs font-medium text-[#A89B8D] uppercase tracking-wider">
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
                        className={`rounded-full border px-3 py-1 text-xs transition-all ${
                          active
                            ? "border-[#D49B45] bg-[#D49B45]/20 text-[#F3CA74]"
                            : "border-white/10 bg-[#1D1714] text-[#A89B8D] hover:border-white/20"
                        }`}
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
                  <label className="text-xs font-medium text-[#A89B8D] uppercase tracking-wider">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например, Анна"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#1D1714] px-4 py-2.5 text-sm text-[#FAF7F2] placeholder-[#70655B] outline-none transition-colors focus:border-[#D49B45]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#A89B8D] uppercase tracking-wider">
                    Отзыв или пожелание
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Расскажите о вашем любимом напитке или моменте..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#1D1714] px-4 py-2.5 text-sm text-[#FAF7F2] placeholder-[#70655B] outline-none transition-colors focus:border-[#D49B45]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="mt-6">
                <ShimmerButton type="submit" className="w-full py-3.5 text-base font-semibold">
                  <div className="flex items-center justify-center gap-2">
                    <span>Отправить отзыв</span>
                    <Sparkles className="h-4 w-4 text-[#F3CA74]" />
                  </div>
                </ShimmerButton>
              </div>
            </form>
          ) : (
            <div className="relative z-10 py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#D49B45]/40 bg-[#D49B45]/15 text-[#F3CA74]">
                <CheckCircle2 className="h-8 w-8 text-[#F3CA74]" />
              </div>
              <h3 className="mt-4 font-serif text-2xl font-semibold text-[#FAF7F2]">
                Благодарим вас, {authorName || "дорогой гость"}!
              </h3>
              <p className="mt-2 text-sm text-[#A89B8D]">
                Ваш отзыв согрел наши сердца и передан управляющему точки «{activeLoc.shortName}». Вы действительно делаете нас лучше!
              </p>

              <div className="mt-6">
                <button
                  onClick={handleClose}
                  className="rounded-xl border border-[#D49B45] bg-[#D49B45] px-6 py-2.5 text-xs font-semibold text-[#0C0A09] transition-transform hover:scale-105"
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
