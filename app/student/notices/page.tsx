"use client";
import { useState } from "react";
import { Bell, Pin, Search, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";

const allNotices = [
  { id: 1, category: "Urgent", title: "Semester VI Exam Fee Deadline", source: "Examination Office", date: "May 22, 2026", short: "Last date to pay exam fees is June 1. Students who fail to pay will not receive hall tickets.", full: "This is a final reminder that the deadline to pay Semester VI examination fees is June 1, 2026. Students who do not complete payment by this date will be barred from receiving hall tickets and will not be permitted to sit for the examinations. Payment can be made via the student portal or at the finance office (Room 104) between 9 AM–4 PM on working days.", pinned: true },
  { id: 2, category: "Academic", title: "Summer Internship Drive 2026", source: "Placement Cell", date: "May 21, 2026", short: "TCS, Infosys, and Wipro are visiting on June 5. Register before May 28. CGPA 6.5+ eligible.", full: "The Placement Cell is pleased to announce a Summer Internship Drive on June 5, 2026. Companies participating include TCS, Infosys, and Wipro. Eligibility: CGPA 6.5 and above, all branches. Registration is mandatory through the placement portal before May 28, 2026. Students are advised to bring 3 copies of their resume, original certificates, and ID proof.", pinned: true },
  { id: 3, category: "Examination", title: "End Semester Examination Timetable", source: "Controller of Examinations", date: "May 20, 2026", short: "Semester VI exams will be held June 10 to June 25, 2026. Detailed schedule available.", full: "The end semester examinations for Semester VI will commence on June 10, 2026 and conclude on June 25, 2026. All exams will be held in the morning session (10:00 AM) and afternoon session (2:00 PM). Students must report 30 minutes before the scheduled time. The detailed subject-wise timetable is available on the examination portal and on the notice board outside the Controller's office.", pinned: false },
  { id: 4, category: "Cultural", title: "Annual Cultural Fest 'Wavelength 2026'", source: "Student Council", date: "May 19, 2026", short: "Annual cultural fest scheduled for June 28–30. Registration open. Prizes worth ₹2L.", full: "The much-awaited Annual Cultural Festival 'Wavelength 2026' is scheduled for June 28–30, 2026. Events include music, dance, drama, fine arts, literary competitions, and gaming. Total prize pool of ₹2,00,000. Registration for events is now open at the Student Council office or via the college app. All students are encouraged to participate. Sponsorship and volunteering opportunities also available.", pinned: false },
  { id: 5, category: "Academic", title: "Lab Safety Workshop — Mandatory", source: "Department of CS", date: "May 18, 2026", short: "Mandatory lab safety workshop for all II and III year students on May 30, 10 AM, Lab Complex.", full: "The Department of Computer Science is conducting a mandatory Lab Safety and Equipment Handling Workshop on May 30, 2026 at 10:00 AM in the Lab Complex (Ground Floor). Attendance is compulsory for all II and III year students. Topics include fire safety, electrical hazard awareness, software licensing, and data security protocols. Absentees will be marked accordingly.", pinned: false },
  { id: 6, category: "Sports", title: "State Level Basketball Championship", source: "Sports Department", date: "May 17, 2026", short: "Selection trials for state basketball team on May 27. Interested students contact sports HOD.", full: "The Sports Department invites all interested students to participate in selection trials for the State Level Basketball Championship team. Trials will be held on May 27, 2026 at 5:00 PM on the main basketball court. Eligible: All students with valid sports participation record. Contact the Sports HOD (Mr. Venkat Rao, Room SB-01) for registration before May 25.", pinned: false },
  { id: 7, category: "Urgent", title: "Anti-Ragging Complaint Cell", source: "Anti-Ragging Committee", date: "May 16, 2026", short: "Ragging is a cognizable offense. Report immediately to helpline 1800-xxx-xxxx.", full: "The Anti-Ragging Committee reminds all students that any act of ragging — physical, verbal, or online — is a punishable offense under UGC regulations and the Indian Penal Code. Students who experience or witness ragging must immediately report to the committee. Anonymous reporting available at 1800-xxx-xxxx (toll-free, 24/7). Strict disciplinary action including expulsion will be taken against offenders.", pinned: true },
  { id: 8, category: "Academic", title: "Library System Upgrade Notice", source: "Central Library", date: "May 15, 2026", short: "Library OPAC system will be offline May 26–27 for upgrades. Plan accordingly.", full: "The Central Library informs all students and faculty that the Online Public Access Catalogue (OPAC) system will undergo a scheduled maintenance and upgrade on May 26–27, 2026. During this period, book searches, renewals, and reservations via the portal will be unavailable. Physical borrowing at the counter will continue. All pending dues must be cleared before May 25.", pinned: false },
  { id: 9, category: "Academic", title: "Guest Lecture on AI/ML — Google Expert", source: "Department of CS", date: "May 14, 2026", short: "Industry expert from Google will deliver a talk on May 29, 3 PM, Seminar Hall. Attendance mandatory.", full: "The Department of Computer Science is hosting a distinguished guest lecture by a Senior Research Engineer from Google DeepMind on 'Large Language Models and Their Applications in Industry' on May 29, 2026 at 3:00 PM in the Main Seminar Hall. Attendance is mandatory for all final year CS students. Optional for other departments. A Q&A session will follow.", pinned: false },
  { id: 10, category: "Sports", title: "Annual Sports Day Preparations", source: "Sports Department", date: "May 13, 2026", short: "Annual sports day on June 10. Event coordinators needed. Apply by May 25.", full: "The Annual Sports Day 2026 is scheduled for June 10, 2026. The Sports Department is looking for enthusiastic student event coordinators to help organize track and field events, team sports, and the prize distribution ceremony. Students interested in volunteering as event coordinators should apply at the Sports Department office before May 25, 2026.", pinned: false },
  { id: 11, category: "Academic", title: "Convocation Ceremony 2026", source: "Registrar's Office", date: "May 12, 2026", short: "Convocation for 2022 batch on July 15. Gown registration deadline June 30.", full: "The Convocation Ceremony for the batch of 2022 (graduating students) will be held on July 15, 2026 in the Main Auditorium. All graduating students must register for gown rental at the Registrar's Office before June 30, 2026. Fees: ₹500 for gown rental. Original degree certificates and provisional certificates will be distributed on the day. Parents are welcome.", pinned: false },
  { id: 12, category: "Cultural", title: "Photography Club — New Members Welcome", source: "Student Council", date: "May 10, 2026", short: "Photography club meets every Saturday 4 PM at Student Center. New members welcome!", full: "The DIT Photography Club invites all photography enthusiasts to join! We meet every Saturday at 4:00 PM in the Student Center (Room SC-02). Activities include photo walks, workshops, editing sessions, and inter-college competitions. No experience required — just bring your camera or smartphone. Contact the club secretary Riya Sharma (riya.sharma@dit.edu) for more information.", pinned: false },
];

const categories = ["All", "Academic", "Examination", "Cultural", "Sports", "Urgent"];
const categoryColor: Record<string, { bg: string; color: string }> = {
  Urgent: { bg: "rgba(239,68,68,0.15)", color: "#ef4444" },
  Examination: { bg: "rgba(99,102,241,0.15)", color: "#818cf8" },
  Academic: { bg: "rgba(34,211,238,0.15)", color: "#22d3ee" },
  Cultural: { bg: "rgba(168,85,247,0.15)", color: "#a855f7" },
  Sports: { bg: "rgba(16,185,129,0.15)", color: "#10b981" },
};

export default function NoticesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = allNotices.filter(n => {
    const matchCat = activeCategory === "All" || n.category === activeCategory;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.source.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const pinned = filtered.filter(n => n.pinned);
  const regular = filtered.filter(n => !n.pinned);

  const NoticeCard = ({ n }: { n: typeof allNotices[0] }) => {
    const cc = categoryColor[n.category] || { bg: "rgba(255,255,255,0.05)", color: "var(--text-muted)" };
    const isExpanded = expanded === n.id;
    return (
      <div className="glass" style={{ borderRadius: 16, padding: "1.25rem", border: n.category === "Urgent" ? "1px solid rgba(239,68,68,0.3)" : "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "0.75rem", transition: "all 0.2s" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.68rem", padding: "2px 10px", borderRadius: 999, background: cc.bg, color: cc.color, fontWeight: 700 }}>{n.category}</span>
            {n.pinned && <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.68rem", color: "#f59e0b" }}><Pin size={10} /> Pinned</span>}
            {n.category === "Urgent" && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 6px #ef4444" }} />}
          </div>
          <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{n.date}</span>
        </div>
        <h3 style={{ fontWeight: 800, fontSize: "0.92rem", lineHeight: 1.4 }}>{n.title}</h3>
        <p style={{ fontSize: "0.73rem", color: "var(--text-muted)" }}>📌 {n.source}</p>
        <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{isExpanded ? n.full : n.short}</p>
        <button
          onClick={() => setExpanded(isExpanded ? null : n.id)}
          style={{ alignSelf: "flex-start", fontSize: "0.75rem", padding: "0.35rem 0.875rem", borderRadius: 8, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#818cf8", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontWeight: 600 }}
        >
          {isExpanded ? <><ChevronUp size={12} /> Show Less</> : <><ChevronDown size={12} /> View Details</>}
        </button>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Notice Board</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Official announcements and campus updates</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "1rem" }}>
        {[
          { label: "Total Notices", value: String(allNotices.length), sub: "This month", color: "#6366f1", icon: <Bell size={20} /> },
          { label: "Urgent", value: String(allNotices.filter(n => n.category === "Urgent").length), sub: "Requires immediate attention", color: "#ef4444", icon: <AlertCircle size={20} /> },
          { label: "Pinned", value: String(allNotices.filter(n => n.pinned).length), sub: "Important announcements", color: "#f59e0b", icon: <Pin size={20} /> },
          { label: "Unread", value: "7", sub: "New since last visit", color: "#10b981", icon: <Bell size={20} /> },
        ].map((c, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>{c.label}</span>
              <div style={{ color: c.color }}>{c.icon}</div>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: c.color, marginTop: 4 }}>{c.value}</h3>
            <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 220, display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.5rem 0.875rem" }}>
          <Search size={14} color="var(--text-muted)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notices..." style={{ background: "none", border: "none", outline: "none", fontSize: "0.82rem", color: "var(--text-primary)", width: "100%" }} />
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {categories.map(c => {
            const cc = categoryColor[c] || { bg: "rgba(255,255,255,0.08)", color: "var(--text-secondary)" };
            return (
              <button key={c} onClick={() => setActiveCategory(c)} style={{ padding: "0.4rem 1rem", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", border: "none", transition: "all 0.2s", background: activeCategory === c ? (c === "All" ? "#6366f1" : cc.bg) : "rgba(255,255,255,0.05)", color: activeCategory === c ? (c === "All" ? "white" : cc.color) : "var(--text-muted)" }}>
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pinned Notices */}
      {pinned.length > 0 && (
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 5 }}><Pin size={12} /> Pinned Notices</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: "1rem" }}>
            {pinned.map(n => <NoticeCard key={n.id} n={n} />)}
          </div>
        </div>
      )}

      {/* All Notices */}
      <div>
        {pinned.length > 0 && <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>All Notices</p>}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>No notices found for this filter.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: "1rem" }}>
            {regular.map(n => <NoticeCard key={n.id} n={n} />)}
          </div>
        )}
      </div>
    </div>
  );
}
