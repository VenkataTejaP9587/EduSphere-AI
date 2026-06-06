"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, BookOpen, Users, Award, BarChart2, MessageSquare, Shield, CheckCircle, Star, Zap, Brain, Target, TrendingUp, Play, ChevronRight } from "lucide-react";

const stats = [
  { value: "50K+", label: "Active Students" },
  { value: "2,400+", label: "Courses" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "150+", label: "Institutions" },
];

const features = [
  { icon: <Brain size={24} />, title: "AI Study Assistant", desc: "24/7 intelligent chatbot answering subject-specific doubts with personalized explanations.", color: "#6366f1", gradient: "linear-gradient(135deg,#6366f1,#8b5cf6)" },
  { icon: <Sparkles size={24} />, title: "AI Quiz Generator", desc: "Automatically generate assessments from notes, PDFs or video transcripts.", color: "#22d3ee", gradient: "linear-gradient(135deg,#22d3ee,#6366f1)" },
  { icon: <Target size={24} />, title: "Weak Topic Detection", desc: "ML-powered analysis identifies struggling areas and creates personalized revision plans.", color: "#f59e0b", gradient: "linear-gradient(135deg,#f59e0b,#ef4444)" },
  { icon: <BarChart2 size={24} />, title: "Smart Analytics", desc: "Visual dashboards for performance, attendance, engagement and payment tracking.", color: "#10b981", gradient: "linear-gradient(135deg,#10b981,#22d3ee)" },
  { icon: <MessageSquare size={24} />, title: "Community Hub", desc: "Discord-like channels, group chats, peer learning and real-time collaboration.", color: "#a855f7", gradient: "linear-gradient(135deg,#a855f7,#ec4899)" },
  { icon: <Award size={24} />, title: "Smart Certifications", desc: "Auto-generated, QR-verified certificates with achievement badges and gamification.", color: "#ec4899", gradient: "linear-gradient(135deg,#ec4899,#f59e0b)" },
];

const testimonials = [
  { name: "Dr. Anita Rao", role: "Dean, BITS Pilani", text: "EduSphere AI transformed how we manage 5,000+ students. The AI analytics caught struggling students before they failed.", avatar: "AR", color: "linear-gradient(135deg,#6366f1,#8b5cf6)" },
  { name: "Vikram Menon", role: "Student, IIT Delhi", text: "The AI assistant is like having a personal tutor available 24/7. My grades improved by 30% in 2 months!", avatar: "VM", color: "linear-gradient(135deg,#22d3ee,#6366f1)" },
  { name: "Priya Sharma", role: "Training Manager, TCS", text: "We onboarded 800 employees with EduSphere. The gamification kept engagement at 94% throughout.", avatar: "PS", color: "linear-gradient(135deg,#10b981,#22d3ee)" },
];


export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = [50000, 2400, 98, 150];
    const duration = 2000;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounters(targets.map(t => Math.floor(t * ease)));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const formatCounter = (val: number, i: number) => {
    if (i === 0) return val.toLocaleString() + "+";
    if (i === 1) return val.toLocaleString() + "+";
    if (i === 2) return val + "%";
    return val + "+";
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(10,14,26,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: "linear-gradient(135deg,#6366f1,#22d3ee)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.2rem", color: "white"
          }}>E</div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "var(--text-primary)" }}>
            EduSphere <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {["Features", "About"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>{item}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link href="/login" className="btn-secondary" style={{ textDecoration: "none" }}>Sign In</Link>
          <Link href="/register" className="btn-primary" style={{ textDecoration: "none" }}>Get Started <ArrowRight size={14} /></Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--gradient-hero)", position: "relative", overflow: "hidden",
        padding: "8rem 2rem 4rem"
      }}>
        {/* Animated blobs */}
        <div style={{ position: "absolute", top: "15%", left: "10%", width: 500, height: 500, background: "rgba(99,102,241,0.12)", borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%", filter: "blur(80px)", animation: "blob 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 400, height: 400, background: "rgba(34,211,238,0.10)", borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%", filter: "blur(80px)", animation: "blob 10s ease-in-out 2s infinite" }} />
        <div style={{ position: "absolute", top: "50%", right: "20%", width: 300, height: 300, background: "rgba(168,85,247,0.08)", borderRadius: "50%", filter: "blur(60px)", animation: "blob 12s ease-in-out 4s infinite" }} />

        <div style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "999px", padding: "0.375rem 1rem", marginBottom: "2rem",
            animation: "fadeInUp 0.6s ease forwards"
          }}>
            <Sparkles size={14} style={{ color: "#818cf8" }} />
            <span style={{ fontSize: "0.8rem", color: "#818cf8", fontWeight: 600 }}>AI-Powered Learning Management System</span>
            <span style={{
              background: "linear-gradient(135deg,#6366f1,#22d3ee)",
              color: "white", fontSize: "0.65rem", fontWeight: 700,
              padding: "2px 8px", borderRadius: "999px"
            }}>NEW</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 900, lineHeight: 1.05, marginBottom: "1.5rem",
            animation: "fadeInUp 0.6s 0.1s ease both"
          }}>
            The Future of{" "}
            <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Intelligent
            </span>
            <br />Education is Here
          </h1>

          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "var(--text-secondary)", lineHeight: 1.7,
            maxWidth: 680, margin: "0 auto 2.5rem",
            animation: "fadeInUp 0.6s 0.2s ease both"
          }}>
            Combine AI-powered adaptive learning, course management, community collaboration, and real-time analytics into one unified platform built for modern education.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeInUp 0.6s 0.3s ease both" }}>
            <Link href="/student" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ padding: "0.875rem 2rem", fontSize: "1rem", borderRadius: "14px" }}>
                <Play size={16} /> Explore Platform <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/register" style={{ textDecoration: "none" }}>
              <button className="btn-secondary" style={{ padding: "0.875rem 2rem", fontSize: "1rem", borderRadius: "14px" }}>
                Start Free Trial
              </button>
            </Link>
          </div>

          {/* Social proof */}
          <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", animation: "fadeInUp 0.6s 0.4s ease both" }}>
            <div style={{ display: "flex" }}>
              {["AR","VM","PS","DK","SN"].map((init, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: "50%", border: "2px solid var(--bg-primary)",
                  marginLeft: i > 0 ? -8 : 0,
                  background: ["linear-gradient(135deg,#6366f1,#8b5cf6)","linear-gradient(135deg,#22d3ee,#6366f1)","linear-gradient(135deg,#10b981,#22d3ee)","linear-gradient(135deg,#f59e0b,#ef4444)","linear-gradient(135deg,#a855f7,#ec4899)"][i],
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.6rem", fontWeight: 700, color: "white"
                }}>{init}</div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Trusted by <strong style={{ color: "var(--text-primary)" }}>50,000+</strong> learners</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "4rem 2rem", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "2rem", textAlign: "center" }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 900, background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {formatCounter(counters[i], i)}
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: "999px", padding: "0.375rem 1rem", marginBottom: "1rem"
            }}>
              <Zap size={12} color="#818cf8" />
              <span style={{ fontSize: "0.75rem", color: "#818cf8", fontWeight: 600 }}>POWERED BY AI</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800, marginBottom: "1rem" }}>
              Everything you need to{" "}
              <span style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                supercharge learning
              </span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: 600, margin: "0 auto" }}>
              Built for modern educational institutions with AI at its core — not as an afterthought.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "1.5rem" }}>
            {features.map((f, i) => (
              <div key={i} className="glass glass-hover" style={{ borderRadius: "var(--radius-lg)", padding: "2rem", transition: "all 0.3s", cursor: "pointer", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: f.gradient, opacity: 0.08, filter: "blur(20px)" }} />
                <div style={{
                  width: 48, height: 48, borderRadius: 14, background: `${f.color}18`,
                  border: `1px solid ${f.color}30`, display: "flex", alignItems: "center",
                  justifyContent: "center", color: f.color, marginBottom: "1.25rem"
                }}>{f.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.625rem", color: "var(--text-primary)" }}>{f.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>{f.desc}</p>
                <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: 4, color: f.color, fontSize: "0.8rem", fontWeight: 600 }}>
                  Learn more <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Showcase */}
      <section style={{ padding: "6rem 2rem", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800, marginBottom: "1rem" }}>
              Four Portals. One Ecosystem.
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: 500, margin: "0 auto" }}>
              Every stakeholder gets their own intelligent, purpose-built interface.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "1.5rem" }}>
            {[
              { role: "Student", icon: "🎓", desc: "Learn, track progress, get AI help, and engage with the community.", href: "/student", color: "#6366f1" },
              { role: "Faculty", icon: "👨‍🏫", desc: "Create courses, manage batches, run AI quizzes, and monitor performance.", href: "/faculty", color: "#22d3ee" },
              { role: "Admin", icon: "⚙️", desc: "Manage institutions, track revenue, users and platform health.", href: "/admin", color: "#f59e0b" },
              { role: "Parent", icon: "👨‍👩‍👧", desc: "Monitor your child's attendance, grades, fees and academic progress.", href: "/parent", color: "#10b981" },
            ].map((p, i) => (
              <Link key={i} href={p.href} style={{ textDecoration: "none" }}>
                <div className="glass glass-hover" style={{
                  borderRadius: "var(--radius-xl)", padding: "2rem", textAlign: "center",
                  border: `1px solid ${p.color}20`, transition: "all 0.3s", cursor: "pointer"
                }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{p.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: p.color, marginBottom: "0.75rem" }}>{p.role} Portal</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>{p.desc}</p>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: `${p.color}15`, color: p.color, padding: "0.4rem 1rem",
                    borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600
                  }}>
                    Explore <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="about" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem,4vw,2.5rem)", fontWeight: 800, marginBottom: "1rem" }}>
              Loved by educators & learners
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem" }}>
            {testimonials.map((t, i) => (
              <div key={i} className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.75rem" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: "1rem" }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.25rem", fontStyle: "italic" }}>&quot;{t.text}&quot;</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", background: t.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.75rem", fontWeight: 700, color: "white"
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text-primary)" }}>{t.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{
          maxWidth: 800, margin: "0 auto", textAlign: "center",
          background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(34,211,238,0.1))",
          border: "1px solid rgba(99,102,241,0.2)", borderRadius: "var(--radius-xl)", padding: "4rem 2rem"
        }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem,4vw,2.5rem)", fontWeight: 900, marginBottom: "1rem" }}>
            Ready to transform your institution?
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "2rem" }}>
            Join 150+ institutions already using EduSphere AI to deliver better learning outcomes.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/student" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ padding: "0.875rem 2rem", fontSize: "1rem", borderRadius: "14px" }}>
                <Play size={16} /> Explore Demo <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/register" style={{ textDecoration: "none" }}>
              <button className="btn-secondary" style={{ padding: "0.875rem 2rem", fontSize: "1rem", borderRadius: "14px" }}>
                Start Free Trial
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "2rem", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: "linear-gradient(135deg,#6366f1,#22d3ee)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1rem", color: "white"
          }}>E</div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem" }}>EduSphere AI</span>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
          © 2026 EduSphere AI. Built with ❤️ for the future of education.
        </p>
      </footer>
    </div>
  );
}
