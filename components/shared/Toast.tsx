"use client";
import { useEffect } from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: <CheckCircle2 size={18} color="#10b981" />,
  error: <AlertTriangle size={18} color="#ef4444" />,
  info: <Info size={18} color="#6366f1" />,
};

const colors = {
  success: { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", text: "#10b981" },
  error: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", text: "#ef4444" },
  info: { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.3)", text: "#818cf8" },
};

export default function Toast({ message, type = "success", visible, onClose, duration = 3500 }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onClose, duration);
      return () => clearTimeout(t);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const c = colors[type];
  return (
    <div style={{
      position: "fixed", top: 24, right: 24, zIndex: 9999,
      display: "flex", alignItems: "center", gap: 10,
      background: c.bg, border: `1px solid ${c.border}`,
      backdropFilter: "blur(12px)", borderRadius: 12,
      padding: "12px 16px", boxShadow: `0 8px 24px ${c.border}`,
      animation: "fadeInRight 0.3s ease-out", maxWidth: 360,
    }}>
      {icons[type]}
      <span style={{ fontSize: "0.85rem", color: "var(--text-primary)", flex: 1, lineHeight: 1.4 }}>{message}</span>
      <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 2, display: "flex" }}>
        <X size={14} />
      </button>
    </div>
  );
}
