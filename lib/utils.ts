import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    pending: "#f59e0b",
    submitted: "#6366f1",
    graded: "#10b981",
    at_risk: "#ef4444",
    critical: "#ef4444",
    good: "#10b981",
    excellent: "#22d3ee",
    average: "#f59e0b",
    low: "#10b981",
    medium: "#f59e0b",
    high: "#ef4444",
  };
  return map[status] || "#94a3b8";
}

export function daysUntil(dateStr: string): number {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function avatarColor(name: string): string {
  const colors = [
    "linear-gradient(135deg, #6366f1, #8b5cf6)",
    "linear-gradient(135deg, #22d3ee, #06b6d4)",
    "linear-gradient(135deg, #f59e0b, #f97316)",
    "linear-gradient(135deg, #10b981, #059669)",
    "linear-gradient(135deg, #ec4899, #db2777)",
    "linear-gradient(135deg, #a855f7, #7c3aed)",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}
