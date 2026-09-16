import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatYear(year: number): string {
  return new Date(year, 0).getFullYear().toString();
}

export function getProficiencyColor(proficiency: string): string {
  switch (proficiency) {
    case "Core":
      return "var(--color-core)";
    case "Used":
      return "var(--color-used)";
    case "Familiar":
      return "var(--color-familiar)";
    case "Exploring":
      return "var(--color-exploring)";
    default:
      return "var(--color-fg-muted)";
  }
}

export function getProficiencyBg(proficiency: string): string {
  switch (proficiency) {
    case "Core":
      return "var(--color-core-muted)";
    case "Used":
      return "var(--color-used-muted)";
    case "Familiar":
      return "color-mixed(var(--color-familiar), transparent, 0.15)";
    case "Exploring":
      return "color-mixed(var(--color-exploring), transparent, 0.15)";
    default:
      return "var(--color-border)";
  }
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function isInViewport(element: HTMLElement, offset = 100): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= offset
  );
}

export function getScrollProgress(): number {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return scrollTop / docHeight;
}