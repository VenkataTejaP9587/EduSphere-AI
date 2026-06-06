"use client";
import { ShieldAlert, Key, Lock, Terminal, Eye, ShieldCheck, HelpCircle } from "lucide-react";

export default function AdminSecurityPage() {
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Security & Access</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Supervise application credentials, API keys, credentials, and compliance telemetry</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.5rem" }}>
        
        {/* API keys directory */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            <Key size={18} color="#6366f1" /> Active API access keys
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { name: "LMS Syllabus Fetcher Service", access: "Read-only", key: "sk_live_...2j92", date: "2026-04-12" },
              { name: "Stripe Webhooks callback", access: "Read/Write", key: "sk_live_...9a12", date: "2026-02-18" },
              { name: "AI recommendations pipeline", access: "Full Control", key: "sk_live_...4f88", date: "2026-05-10" },
            ].map((k, idx) => (
              <div key={idx} style={{ padding: "0.875rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontSize: "0.8rem", fontWeight: 700 }}>{k.name}</h4>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>Permission: {k.access} · Created: {k.date}</p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <code style={{ fontSize: "0.75rem", padding: "2px 8px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 4, fontFamily: "monospace" }}>{k.key}</code>
                  <button className="badge badge-danger" style={{ border: "none", cursor: "pointer" }}>Revoke</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security configuration widgets */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            <ShieldCheck size={18} color="#10b981" /> Application Compliance
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[
              { label: "SSL Certificate Configuration", status: "Active (Auto-renews Dec 2026)", badge: <span className="badge badge-success">OK</span> },
              { label: "OAuth SSO Login integrations", status: "Google, GitHub providers binded", badge: <span className="badge badge-success">OK</span> },
              { label: "IP address restriction", status: "Disabled for student endpoints", badge: <span className="badge badge-warning">WARN</span> },
              { label: "WAF Rate Limit throttling", status: "1000 requests / minute max limit", badge: <span className="badge badge-success">OK</span> },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                <div>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600 }}>{c.label}</p>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>{c.status}</p>
                </div>
                {c.badge}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Compliance / Sys audit list */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 6 }}>
          <Terminal size={18} color="var(--text-secondary)" /> System Security Audits
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { actor: "adm-001 (Rajesh Kumar)", action: "Revoked API access key: sk_live_...1a01", time: "Today 10:24 AM" },
            { actor: "SYSTEM (WAF Agent)", action: "Blocked suspicious requests volume originating from subnet: 104.22.4.x", time: "Yesterday 11:30 PM" },
            { actor: "fac-001 (Dr. Priya Nair)", action: "Initiated bulk quiz generation from reference note uploads", time: "2 days ago" },
          ].map((audit, idx) => (
            <div key={idx} style={{ padding: "0.75rem 1rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border)", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                <strong>{audit.actor}</strong>: {audit.action}
              </div>
              <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{audit.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
