"use client";
import { Award, ShieldCheck, Download, Share2, Star, Flame, Sparkles } from "lucide-react";
import { certificates, badges } from "@/lib/mock-data";

export default function CertificatesPage() {
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Achievements & Certificates</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Verifiable blockchain credentials and achievement badges</p>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
        {[
          { label: "Level Completed", value: "Level 12", color: "#6366f1" },
          { label: "Badges Unlocked", value: `${badges.filter(b => b.unlocked).length} / ${badges.length}`, color: "#f59e0b" },
          { label: "Verified Credentials", value: certificates.length, color: "#10b981" },
          { label: "Global Percentile", value: "Top 15%", color: "#22d3ee" },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 900, color: s.color }}>{s.value}</p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
        {/* Certificate list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            <Award size={20} color="#10b981" /> Verified Certificates
          </h2>
          {certificates.map((cert) => (
            <div key={cert.id} className="certificate-card" style={{
              display: "flex", flexDirection: "column", gap: "1.25rem",
              background: "linear-gradient(135deg, rgba(26, 16, 64, 0.9), rgba(15, 32, 64, 0.9))",
              border: "1px solid rgba(99,102,241,0.25)", borderRadius: "var(--radius-xl)",
              padding: "1.75rem", position: "relative"
            }}>
              {/* Seal image overlay */}
              <div style={{ position: "absolute", right: 24, top: 24, opacity: 0.15, color: "#f59e0b" }}>
                <Award size={100} />
              </div>

              <div>
                <span style={{ fontSize: "0.65rem", padding: "2px 8px", borderRadius: "999px", background: "rgba(16,185,129,0.15)", color: "#10b981", fontWeight: 700, textTransform: "uppercase" }}>
                  Credential ID: {cert.credentialId}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 800, marginTop: "0.5rem", color: "var(--text-primary)" }}>{cert.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>Issued by {cert.issuedBy} on {cert.issuedDate}</p>
              </div>

              {/* Skills list */}
              <div>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6 }}>Certified Skills</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {cert.skills.map((skill, index) => (
                    <span key={index} style={{ fontSize: "0.68rem", padding: "3px 10px", borderRadius: "999px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem" }}>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ fontSize: "0.75rem" }}>
                    <p style={{ color: "var(--text-muted)" }}>Grade Received</p>
                    <p style={{ fontWeight: 700, color: "#10b981", fontSize: "0.9rem" }}>{cert.grade} ({cert.score}%)</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button className="btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.75rem" }}>
                    <Download size={14} /> Download PDF
                  </button>
                  <a href={cert.verifyUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                    <button className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.75rem", background: "var(--gradient-primary)" }}>
                      <ShieldCheck size={14} /> Verify Credential
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Badges board */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={20} color="#f59e0b" /> Badge Collection
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.875rem" }}>
            {badges.map((badge) => (
              <div key={badge.id} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem",
                padding: "1rem 0.5rem", borderRadius: "12px",
                background: badge.unlocked ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.02)",
                border: badge.unlocked ? "1px solid rgba(99,102,241,0.2)" : "1px solid var(--border)",
                opacity: badge.unlocked ? 1 : 0.4, textAlign: "center", cursor: "pointer",
                filter: badge.unlocked ? "none" : "grayscale(100%)", transition: "all 0.2s"
              }} className="tooltip" data-tip={badge.description}>
                <span style={{ fontSize: "1.75rem" }}>{badge.emoji}</span>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: badge.unlocked ? "var(--text-primary)" : "var(--text-muted)" }}>{badge.name}</span>
                <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: 2 }}>{badge.unlocked ? "Unlocked" : "Locked"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
