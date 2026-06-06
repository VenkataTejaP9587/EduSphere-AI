"use client";
import { useState } from "react";
import { Settings, Save, CheckCircle, Database, Link2, Shield, Eye } from "lucide-react";

export default function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState("EduSphere AI");
  const [domainWhitelist, setDomainWhitelist] = useState("edusphere.ai, dit.edu, techuni.edu");
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [enableAI, setEnableAI] = useState(true);

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Platform Settings</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Customize global defaults, branding palettes, and third-party API hook layers</p>
        </div>
        <button className="btn-primary" style={{ background: "var(--gradient-primary)" }}>
          <Save size={16} /> Save Configuration
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.5rem" }}>
        
        {/* Core parameters form */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            <Settings size={18} color="#6366f1" /> System Variables
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Platform Name</span>
            <input type="text" className="form-input" value={platformName} onChange={e => setPlatformName(e.target.value)} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Tenant Domain Whitelist</span>
            <input type="text" className="form-input" value={domainWhitelist} onChange={e => setDomainWhitelist(e.target.value)} />
            <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: 2 }}>Separate domains with commas (e.g. university.edu)</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Primary Brand Theme Color</span>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input type="color" className="form-input" style={{ width: 60, padding: 4, height: 38, cursor: "pointer" }} value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} />
              <input type="text" className="form-input" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0" }}>
            <input type="checkbox" id="enableAI" checked={enableAI} onChange={e => setEnableAI(e.target.checked)} style={{ width: 18, height: 18, accentColor: "#6366f1", cursor: "pointer" }} />
            <label htmlFor="enableAI" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", cursor: "pointer" }}>
              Enable AI recommendations and study coach integrations
            </label>
          </div>
        </div>

        {/* Integration switches */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            <Link2 size={18} color="#22d3ee" /> Integration Modules
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[
              { id: "stripe", title: "Stripe Subscriptions Gateway", desc: "For MRR collection and invoice records billing workflows", connected: true },
              { id: "google", title: "Google Classroom / Workspace SDK", desc: "Sync class rosters, lectures, calendars automatically", connected: true },
              { id: "discord", title: "Discord API Live Channels webhook", desc: "Used for community server discussions and notification logs", connected: false },
              { id: "zoom", title: "Zoom SDK Webinar Stream Linker", desc: "Generate classrooms webinars and meetings records", connected: false },
            ].map((module) => (
              <div key={module.id} style={{
                padding: "0.875rem", borderRadius: "12px",
                background: "rgba(255,255,255,0.01)", border: "1px solid var(--border)",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <h4 style={{ fontSize: "0.8rem", fontWeight: 700 }}>{module.title}</h4>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>{module.desc}</p>
                </div>
                <button className={module.connected ? "badge badge-success" : "badge badge-primary"} style={{ cursor: "pointer", border: "none" }}>
                  {module.connected ? "Active" : "Bind SDK"}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
