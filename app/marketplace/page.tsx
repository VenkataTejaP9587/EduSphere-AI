"use client";
import { useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, Users, Star, Search, Filter, ArrowRight, Play } from "lucide-react";
import { courses } from "@/lib/mock-data";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = ["All", "Engineering", "Computer Science", "AI/ML", "Infrastructure", "Database"];
  const levels = ["All", "beginner", "intermediate", "advanced"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Course Marketplace
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
          Discover {courses.length}+ courses from industry experts
        </p>
      </div>

      {/* Search and Filters */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ flex: 1, minWidth: 300, position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search courses, instructors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem 0.75rem 2.75rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                color: "var(--text-primary)",
                fontSize: "0.875rem",
                outline: "none"
              }}
            />
          </div>

          {/* Category Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Filter size={18} color="var(--text-muted)" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                color: "var(--text-primary)",
                fontSize: "0.875rem",
                outline: "none",
                cursor: "pointer"
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            style={{
              padding: "0.75rem 1rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              color: "var(--text-primary)",
              fontSize: "0.875rem",
              outline: "none",
              cursor: "pointer"
            }}
          >
            {levels.map(level => (
              <option key={level} value={level} style={{ textTransform: "capitalize" }}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
          Showing {filteredCourses.length} courses
        </p>
      </div>

      {/* Course Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: "1.5rem" }}>
        {filteredCourses.map(course => (
          <Link key={course.id} href={`/marketplace/${course.id}`} style={{ textDecoration: "none" }}>
            <div className="glass glass-hover" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", transition: "all 0.3s", cursor: "pointer", height: "100%" }}>
              {/* Course Header */}
              <div style={{
                height: 140, background: `linear-gradient(135deg, ${course.color}30, ${course.color}10)`,
                borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center",
                justifyContent: "center", position: "relative", overflow: "hidden"
              }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: course.color, opacity: 0.1, filter: "blur(30px)" }} />
                <div style={{ width: 64, height: 64, borderRadius: 16, background: `${course.color}25`, border: `1px solid ${course.color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BookOpen size={28} color={course.color} />
                </div>
                <div style={{ position: "absolute", top: 12, left: 12 }}>
                  <span style={{ background: `${course.color}25`, color: course.color, fontSize: "0.65rem", fontWeight: 700, padding: "4px 10px", borderRadius: "999px" }}>{course.category}</span>
                </div>
                <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.5)", borderRadius: "999px", padding: "4px 10px", fontSize: "0.65rem", fontWeight: 700, color: "white", textTransform: "capitalize" }}>
                  {course.level}
                </div>
              </div>

              {/* Course Info */}
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>{course.title}</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>by {course.instructor}</p>

                <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                  {[
                    { icon: <Clock size={13} />, label: course.duration },
                    { icon: <Users size={13} />, label: `${course.enrolled} students` },
                    { icon: <Star size={13} fill="#f59e0b" color="#f59e0b" />, label: course.rating },
                  ].map((meta, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {meta.icon} {meta.label}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  {course.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{ fontSize: "0.65rem", padding: "3px 8px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>{tag}</span>
                  ))}
                </div>

                {/* Price and CTA */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: course.color }}>$499</p>
                    <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>One-time payment</p>
                  </div>
                  <button style={{
                    padding: "0.625rem 1rem",
                    background: course.color,
                    border: "none",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}>
                    View Course <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <BookOpen size={48} color="var(--text-muted)" style={{ marginBottom: "1rem" }} />
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            No courses found
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
