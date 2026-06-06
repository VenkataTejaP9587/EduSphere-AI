"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Sparkles, GraduationCap, Users, ChevronLeft } from "lucide-react";

const roles = [
  { id: "student", label: "Student", icon: <GraduationCap size={20} />, color: "#6366f1" },
  { id: "faculty", label: "Faculty", icon: <Users size={20} />, color: "#22d3ee" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: selectedRole }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed. Please try again.');
        setLoading(false);
      } else {
        router.push(data.url);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--bg-primary)" }}>
      {/* Left Panel */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        padding: "3rem", position: "relative", overflow: "hidden",
        background: "var(--gradient-hero)"
      }}>
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 400, height: 400, background: "rgba(99,102,241,0.12)", borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%", filter: "blur(80px)", animation: "blob 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "5%", width: 300, height: 300, background: "rgba(34,211,238,0.08)", borderRadius: "50%", filter: "blur(60px)", animation: "blob 10s ease-in-out 2s infinite" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 460, width: "100%" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", textDecoration: "none", color: "var(--text-secondary)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.5rem", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--primary-light)"} onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"}>
            <ChevronLeft size={14} /> Back to Home
          </Link>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", marginBottom: "3rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.2rem", color: "white" }}>E</div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "var(--text-primary)" }}>EduSphere <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span></span>
          </Link>
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Create your account 🚀</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Start your AI-powered learning journey today</p>
          </div>
          {/* Role Selector */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.625rem" }}>Register as</label>
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {roles.map(role => (
                <button key={role.id} onClick={() => setSelectedRole(role.id)} style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.625rem", padding: "0.75rem 1rem",
                  borderRadius: "12px", border: selectedRole === role.id ? `2px solid ${role.color}` : "1px solid var(--border)",
                  background: selectedRole === role.id ? `${role.color}12` : "rgba(255,255,255,0.03)",
                  color: selectedRole === role.id ? role.color : "var(--text-secondary)",
                  cursor: "pointer", transition: "all 0.2s", fontWeight: 600, fontSize: "0.875rem", fontFamily: "var(--font-body)"
                }}>
                  {role.icon} {role.label}
                </button>
              ))}
            </div>
          </div>
          {/* Form */}
          {error && (
            <div style={{ padding: "0.75rem", marginBottom: "0.5rem", borderRadius: "8px", background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", fontSize: "0.875rem" }}>
              {error}
            </div>
          )}
          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.375rem" }}>Full Name</label>
              <input
                type="text" required className="form-input"
                placeholder="Enter your name"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.375rem" }}>Email</label>
              <input
                type="email" required className="form-input"
                placeholder="your.email@institution.edu"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.375rem" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"} required className="form-input"
                  placeholder="Create password" style={{ paddingRight: "2.75rem" }}
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)"
                }}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </div>
            <button type="submit" className="btn-primary" disabled={loading} style={{
              width: "100%", justifyContent: "center", padding: "0.875rem",
              borderRadius: "12px", fontSize: "0.95rem", marginTop: "0.25rem",
              opacity: loading ? 0.8 : 1
            }}>
              {loading ? "Registering..." : <>Register Account <ArrowRight size={16} /></>}
            </button>
          </form>
          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[
              { label: "Google", icon: "G", bg: "#4285f4" },
              { label: "Microsoft", icon: "M", bg: "#00a4ef" },
            ].map(p => (
              <button key={p.label} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                padding: "0.75rem", borderRadius: "12px", border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.03)", color: "var(--text-secondary)",
                cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500,
                transition: "all 0.2s"
              }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 800, color: "white" }}>{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--primary-light)", fontWeight: 600, textDecoration: "none" }}>Sign In</Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div style={{
        flex: 1, background: "var(--gradient-panel-right)",
        position: "relative", overflow: "hidden",
      }} className="lg-right-panel">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(99,102,241,0.2) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.15)", borderRadius: "999px", padding: "0.375rem 1rem", marginBottom: "2rem", width: "fit-content" }}>
            <Sparkles size={14} color="#818cf8" />
            <span style={{ fontSize: "0.75rem", color: "#818cf8", fontWeight: 600 }}>AI-POWERED PLATFORM</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Step into the<br />
            <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>EduSphere.</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {["Personalized AI-powered learning paths tailored to your goals", "Real-time performance analytics and weak-topic detection", "Join 50,000+ students from top institutions across India"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: "0.65rem", color: "white", fontWeight: 700 }}>✓</span>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
