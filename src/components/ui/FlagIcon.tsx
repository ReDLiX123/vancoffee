import React from "react";
import { Language } from "@/context/AppContext";

interface FlagIconProps {
  language: Language;
  className?: string;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ language, className = "h-3.5 w-5" }) => {
  if (language === "ru") {
    return (
      <svg
        viewBox="0 0 640 480"
        className={`inline-block rounded-xs shadow-2xs shrink-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <g fillRule="evenodd" strokeWidth="1pt">
          <path fill="#ffffff" d="M0 0h640v160H0z" />
          <path fill="#0039a6" d="M0 160h640v160H0z" />
          <path fill="#d52b1e" d="M0 320h640v160H0z" />
        </g>
      </svg>
    );
  }

  if (language === "en") {
    return (
      <svg
        viewBox="0 0 640 480"
        className={`inline-block rounded-xs shadow-2xs shrink-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <path fill="#012169" d="M0 0h640v480H0z" />
        <path fill="#FFFFFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-179L0 64V0h75z" />
        <path fill="#C8102E" d="m424 288 216 159v33h-44L380 320h44zM640 0v10L456 148h44L640 10V0zM0 480v-10l183-137h-43L0 469v11zM184 192 0 55V22h44l184 137h-44z" />
        <path fill="#FFFFFF" d="M240 0v480h160V0H240zM0 160v160h640V160H0z" />
        <path fill="#C8102E" d="M272 0v480h96V0h-96zM0 192v96h640v-96H0z" />
      </svg>
    );
  }

  if (language === "zh") {
    return (
      <svg
        viewBox="0 0 640 480"
        className={`inline-block rounded-xs shadow-2xs shrink-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <path fill="#de2910" d="M0 0h640v480H0z" />
        <g fill="#ffde00">
          <polygon points="120,40 131,74 167,74 138,95 149,129 120,108 91,129 102,95 73,74 109,74" />
          <polygon points="200,32 203,42 213,42 205,48 208,58 200,52 192,58 195,48 187,42 197,42" />
          <polygon points="240,72 243,82 253,82 245,88 248,98 240,92 232,98 235,88 227,82 237,82" />
          <polygon points="240,128 243,138 253,138 245,144 248,154 240,148 232,154 235,144 227,138 237,138" />
          <polygon points="200,168 203,178 213,178 205,184 208,194 200,188 192,194 195,184 187,178 197,178" />
        </g>
      </svg>
    );
  }

  return null;
};
