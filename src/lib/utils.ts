import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const basePath = process.env.NODE_ENV === "production" ? "/vancoffee" : "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
