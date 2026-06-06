"use client";
import { useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, Users, Star, Play, CheckCircle, ArrowLeft, ArrowRight, Award, Share2, Heart, Lock } from "lucide-react";
import { courses } from "@/lib/mock-data";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find(c => c.id === params.id);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!course) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>Course Not Found</h1>
        <Link href="/marketplace" style={{ color: "var(--primary-light)", textDecoration: "none" }}>Back to Marketplace</Link>
      </div>
    );
  }

  const handleEnroll = () => {
    setIsEnrolled(true);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Back Button */}
      <Link href="/marketplace" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", textDecoration: "none", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
        <ArrowLeft size={16} /> Back to Marketplace
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
        {/* Left Column - Course Info */}
        <div>
          {/* Course Header */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              <span style={{ background: `${course.color}25`, color: course.color, fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "999px" }}>{course.category}</span>
              <span style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 600, padding: "4px 12px", borderRadius: "999px", textTransform: "capitalize" }}>{course.level}</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
              {course.title}
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "1rem" }}>
              Master {course.title} with hands-on projects, real-world examples, and expert guidance from {course.instructor}.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${course.color}25`, display: "flex", alignItems: "center", justifyContent: "center", color: course.color, fontWeight: 700, fontSize: "0.875rem" }}>
                  {course.instructor.split(" ").map(n => n[0]).join("")}
                </div>
                <span style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 600 }}>{course.instructor}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.875rem", color: "var(--text-muted)" }}>
                <Star size={14} fill="#f59e0b" color="#f59e0b" /> {course.rating} ({course.enrolled} reviews)
              </div>
            </div>
          </div>

          {/* Course Stats */}
          <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
              {[
                { icon: <Clock size={20} />, label: "Duration", value: course.duration },
                { icon: <Users size={20} />, label: "Students", value: `${course.enrolled}+` },
                { icon: <BookOpen size={20} />, label: "Lectures", value: course.totalLectures },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center", padding: "0.75rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px" }}>
                  <div style={{ color: course.color, marginBottom: 8 }}>{stat.icon}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>{stat.value}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 700, marginBottom: "1rem" }}>What You&apos;ll Learn</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[
                "Build production-ready applications",
                "Master industry best practices",
                "Understand core concepts deeply",
                "Work with real-world projects",
                "Learn debugging techniques",
                "Deploy applications to cloud",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  <CheckCircle size={16} color="#10b981" /> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Course Curriculum */}
          <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 700, marginBottom: "1rem" }}>Course Curriculum</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { title: "Introduction & Setup", lessons: 5, duration: "45m", free: true },
                { title: "Core Fundamentals", lessons: 12, duration: "2h 30m", free: false },
                { title: "Advanced Concepts", lessons: 18, duration: "3h 45m", free: false },
                { title: "Real-World Projects", lessons: 15, duration: "4h 15m", free: false },
                { title: "Deployment & Best Practices", lessons: 8, duration: "1h 45m", free: false },
              ].map((module, i) => (
                <div key={i} style={{
                  padding: "1rem",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: module.free ? `${course.color}25` : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {module.free ? <Play size={14} color={course.color} /> : <Lock size={14} color="var(--text-muted)" />}
                      </div>
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>{module.title}</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{module.lessons} lessons · {module.duration}</p>
                      </div>
                    </div>
                    {module.free && (
                      <span style={{ fontSize: "0.65rem", padding: "2px 8px", borderRadius: "999px", background: `${course.color}25`, color: course.color, fontWeight: 600 }}>FREE</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Enrollment Card */}
        <div>
          <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", position: "sticky", top: 20 }}>
            {/* Preview Video */}
            <div style={{
              aspectRatio: "16/9",
              background: `linear-gradient(135deg, ${course.color}30, ${course.color}10)`,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: course.color, opacity: 0.15, filter: "blur(40px)" }} />
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: course.color, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                <Play size={28} color="white" />
              </div>
            </div>

            {/* Price */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 800, color: course.color }}>$499</span>
                <span style={{ fontSize: "1rem", color: "var(--text-muted)", textDecoration: "line-through" }}>$799</span>
                <span style={{ fontSize: "0.875rem", color: "#10b981", fontWeight: 600 }}>38% OFF</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>One-time payment · Lifetime access</p>
            </div>

            {/* CTA Buttons */}
            {!isEnrolled ? (
              <button
                onClick={handleEnroll}
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: course.color,
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8
                }}
              >
                Enroll Now <ArrowRight size={18} />
              </button>
            ) : (
              <Link href="/student/courses" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    width: "100%",
                    padding: "1rem",
                    background: "#10b981",
                    border: "none",
                    borderRadius: "12px",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    marginBottom: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8
                  }}
                >
                  <CheckCircle size={18} /> Go to Course
                </button>
              </Link>
            )}

            <button style={{
              width: "100%",
              padding: "0.875rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              color: "var(--text-primary)",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8
            }}>
              <Play size={16} /> Preview Free Lessons
            </button>

            {/* Features */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
              {[
                { icon: <Award size={16} />, text: "Certificate of Completion" },
                { icon: <BookOpen size={16} />, text: "Lifetime Access" },
                { icon: <Users size={16} />, text: "Community Access" },
                { icon: <Lock size={16} />, text: "30-Day Money Back" },
              ].map((feature, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  <span style={{ color: course.color }}>{feature.icon}</span> {feature.text}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => setIsLiked(!isLiked)}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: isLiked ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.05)",
                  border: isLiked ? "1px solid rgba(239,68,68,0.3)" : "1px solid var(--border)",
                  borderRadius: "10px",
                  color: isLiked ? "#ef4444" : "var(--text-primary)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6
                }}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} /> {isLiked ? "Saved" : "Save"}
              </button>
              <button style={{
                flex: 1,
                padding: "0.75rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                color: "var(--text-primary)",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6
              }}>
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
