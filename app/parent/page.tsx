"use client";

import { useState, useEffect } from "react";
import {
  Award,
  BookOpen,
  Clock,
  CalendarCheck,
  CreditCard,
  Mail,
  Send,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Banknote,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const initialParentFees = [
  { name: "Tuition Fee", amount: 60000, status: "Paid", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  { name: "Development Fee", amount: 12000, status: "Overdue", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  { name: "Lab Fee", amount: 8000, status: "Paid", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  { name: "Exam Fee", amount: 5000, status: "Pending", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  { name: "Library Fee", amount: 3000, status: "Paid", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  { name: "Sports Fee", amount: 2000, status: "Pending", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
];

export default function ParentDashboard() {
  const currentUser = useAuth();
  const [fees, setFees] = useState(initialParentFees);
  const [msgInput, setMsgInput] = useState("");
  const [msgSent, setMsgSent] = useState(false);

  // Razorpay and simulation states
  const [loading, setLoading] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoOrder, setDemoOrder] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | 'net'>('card');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Dynamic calculations
  const outstandingFees = fees.filter((f) => f.status !== "Paid");
  const outstandingTotal = outstandingFees.reduce((acc, f) => acc + f.amount, 0);
  const hasOverdue = fees.some((f) => f.status === "Overdue");

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (!currentUser) return null;

  // Load Razorpay Script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaymentFlow = async () => {
    if (outstandingTotal === 0) return;
    setLoading(true);

    try {
      // 1. Create order on server (sends amount in paise)
      const res = await fetch('/api/pay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: outstandingTotal * 100, currency: 'INR' }),
      });

      if (!res.ok) throw new Error('Order creation failed');
      const order = await res.json();

      // 2. Check if we should use the Demo Simulator or real Razorpay
      if (order.isDemo) {
        setDemoOrder(order);
        setDemoModalOpen(true);
        setLoading(false);
        return;
      }

      // 3. Real Razorpay checkout flow
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay SDK. Please check your network.');
        setLoading(false);
        return;
      }

      const options = {
        key: order.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'EduSphere AI ERP',
        description: `Child Fee Payment - Arjun Sharma`,
        order_id: order.id,
        handler: function (response: any) {
          executePaymentSuccess();
        },
        prefill: {
          name: currentUser.name || 'Mr. Sharma',
          email: currentUser.email || 'parent@edusphere.ai',
          contact: '9999999999',
        },
        theme: {
          color: '#10b981', // Matching Parent Dashboard theme
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('An error occurred during payment setup.');
    } finally {
      setLoading(false);
    }
  };

  const executePaymentSuccess = () => {
    // Mark all outstanding fees as paid
    setFees((prev) =>
      prev.map((fee) => {
        if (fee.status !== "Paid") {
          return { ...fee, status: "Paid", color: "#10b981", bg: "rgba(16,185,129,0.1)" };
        }
        return fee;
      })
    );

    setShowToast(true);
    setDemoModalOpen(false);
    setPaymentSuccess(false);
  };

  const simulateSuccess = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      executePaymentSuccess();
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!msgInput.trim()) return;
    setMsgSent(true);
    setMsgInput("");
    setTimeout(() => {
      setMsgSent(false);
    }, 3000);
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative" }}>
      {/* Toast Notification */}
      {showToast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            background: 'rgba(16, 185, 129, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '16px 24px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
            zIndex: 1000,
            animation: 'fadeInRight 0.3s ease-out',
          }}
        >
          <ShieldCheck size={24} />
          <div>
            <h4 style={{ margin: 0, fontWeight: 700, fontSize: '14px' }}>Payment Successful!</h4>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
              Child outstanding fees cleared successfully.
            </p>
          </div>
        </div>
      )}

      {/* Welcome banner */}
      <div style={{
        background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(99,102,241,0.1))",
        border: "1px solid rgba(16,185,129,0.25)", borderRadius: "var(--radius-xl)",
        padding: "1.75rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem"
      }}>
        <div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Parent Portal</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.375rem" }}>
            Guardian Dashboard
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Monitoring progress for child: <strong style={{ color: "var(--text-primary)" }}>{currentUser.studentData?.name || "Arjun Sharma"}</strong> ({currentUser.studentData?.batch || "CS-2024-B"})
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          {[
            { label: "Overall Attendance", value: "87%", color: "#10b981" },
            { label: "Avg Grade Rating", value: "84% (A)", color: "#6366f1" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0.75rem 1.25rem", background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: item.color }}>{item.value}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main progress row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
        
        {/* Course performance */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <BookOpen size={18} color="#6366f1" /> Child Academic Subject Progress
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { subject: "Full Stack Web Development", progress: 68, grade: "88%", color: "#6366f1" },
              { subject: "Data Structures & Algorithms", progress: 45, grade: "72%", color: "#22d3ee" },
              { subject: "Machine Learning Fundamentals", progress: 92, grade: "85%", color: "#a855f7" },
              { subject: "Database Design & SQL", progress: 100, grade: "92%", color: "#10b981" },
            ].map((sub, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
                  <span style={{ fontWeight: 600 }}>{sub.subject}</span>
                  <span style={{ color: "var(--text-secondary)" }}>
                    Syllabus progress: {sub.progress}% · Grade: <strong style={{ color: sub.color }}>{sub.grade}</strong>
                  </span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${sub.progress}%`, background: sub.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fees status */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            <CreditCard size={18} color="#10b981" /> Fee Ledger & Dues
          </h3>

          {/* Overdue Fee Alert */}
          {hasOverdue && (
            <div style={{
              padding: "0.875rem 1rem",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}>
              <AlertTriangle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ef4444" }}>OVERDUE FEE DETECTED</p>
                <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: 2, lineHeight: 1.4 }}>
                  Development Fee of <strong>₹12,000</strong> is overdue (Due: Apr 1, 2026). Overdue fees may block exam hall ticket release.
                </p>
              </div>
            </div>
          )}

          {/* Fee Breakdown List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {fees.map((fee, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0.75rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                <div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600 }}>{fee.name}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: "0.5rem" }}>(₹{fee.amount.toLocaleString('en-IN')})</span>
                </div>
                <span style={{ fontSize: "0.65rem", padding: "2px 8px", borderRadius: "999px", background: fee.bg, color: fee.color, fontWeight: 700 }}>{fee.status.toUpperCase()}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Total Outstanding</p>
              <strong style={{ fontSize: "1.2rem", color: outstandingTotal > 0 ? "#ef4444" : "#10b981" }}>
                ₹{outstandingTotal.toLocaleString('en-IN')}
              </strong>
            </div>
            {outstandingTotal > 0 ? (
              <button 
                className="btn-primary" 
                style={{ padding: "0.5rem 1.25rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }} 
                onClick={handlePaymentFlow}
                disabled={loading}
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <CreditCard size={14} />}
                Pay Outstanding
              </button>
            ) : (
              <span style={{ fontSize: "0.8rem", color: "#10b981", fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle2 size={14} /> Dues Cleared!
              </span>
            )}
          </div>
        </div>

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        
        {/* Attendance log calendar brief */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <CalendarCheck size={18} color="var(--secondary)" /> Attendance Log Summary
          </h3>
          <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "1rem" }}>
            Your child has logged <strong>14 consecutive active class days</strong>. There are no unexcused absences flagged in the last 14 days.
          </p>
          <div style={{ display: "flex", justifyContent: "space-around", padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--border)" }}>
            {[
              { day: "Mon", status: "present", bg: "rgba(16,185,129,0.15)", text: "#10b981" },
              { day: "Tue", status: "present", bg: "rgba(16,185,129,0.15)", text: "#10b981" },
              { day: "Wed", status: "present", bg: "rgba(16,185,129,0.15)", text: "#10b981" },
              { day: "Thu", status: "present", bg: "rgba(16,185,129,0.15)", text: "#10b981" },
              { day: "Fri", status: "late", bg: "rgba(245,158,11,0.15)", text: "#f59e0b" },
            ].map((d, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{d.day}</span>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", background: d.bg, color: d.text,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700
                }}>✓</div>
              </div>
            ))}
          </div>
        </div>

        {/* Message tutor */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            <Mail size={18} color="var(--accent)" /> Direct Message Class Teacher
          </h3>
          <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
            Send an encrypted communication query directly to <strong>Dr. Priya Nair</strong> (Computer Science Dean).
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
            <textarea className="form-input" style={{ minHeight: 80, resize: "vertical", fontSize: "0.8rem" }} placeholder="Type your query regarding exam performance, leave requests, or dues logs..." value={msgInput} onChange={e => setMsgInput(e.target.value)} />
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {msgSent ? (
                <span style={{ fontSize: "0.75rem", color: "#10b981", display: "flex", alignItems: "center", gap: 4 }}>
                  <CheckCircle2 size={14} /> Message sent successfully!
                </span>
              ) : <div />}
              <button className="btn-primary" onClick={handleSendMessage} disabled={!msgInput.trim()} style={{ cursor: "pointer" }}>
                <Send size={14} /> Send Message
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Leave Applications & History */}
      <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
          <Clock size={18} color="#6366f1" /> Child&apos;s Leave Applications & History
        </h3>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th style={{ padding: "0.75rem 0.5rem", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Date Range</th>
                <th style={{ padding: "0.75rem 0.5rem", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Type</th>
                <th style={{ padding: "0.75rem 0.5rem", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Days</th>
                <th style={{ padding: "0.75rem 0.5rem", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Reason</th>
                <th style={{ padding: "0.75rem 0.5rem", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Status</th>
                <th style={{ padding: "0.75rem 0.5rem", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Remarks / Feedback</th>
              </tr>
            </thead>
            <tbody>
              {[
                { range: "May 20", type: "Personal", days: "1 day", reason: "Personal work", status: "Pending", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", remarks: "Awaiting HOD review" },
                { range: "May 15-16", type: "Cultural Event", days: "2 days", reason: "Inter-college fest", status: "Pending", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", remarks: "Under HOD review" },
                { range: "Apr 10-12", type: "Medical", days: "3 days", reason: "Fever and viral infection", status: "Approved", color: "#10b981", bg: "rgba(16,185,129,0.1)", remarks: "Get well soon" },
                { range: "Mar 5", type: "Personal", days: "1 day", reason: "Family function", status: "Approved", color: "#10b981", bg: "rgba(16,185,129,0.1)", remarks: "Noted" },
                { range: "Feb 20-21", type: "Medical", days: "2 days", reason: "Dental procedure", status: "Approved", color: "#10b981", bg: "rgba(16,185,129,0.1)", remarks: "Submit medical cert" },
              ].map((leave, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "0.875rem 0.5rem", fontSize: "0.8rem", fontWeight: 600 }}>{leave.range}, 2026</td>
                  <td style={{ padding: "0.875rem 0.5rem", fontSize: "0.8rem" }}>
                    <span style={{ padding: "2px 8px", borderRadius: "6px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", fontSize: "0.72rem" }}>
                      {leave.type}
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem 0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>{leave.days}</td>
                  <td style={{ padding: "0.875rem 0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>{leave.reason}</td>
                  <td style={{ padding: "0.875rem 0.5rem", fontSize: "0.8rem" }}>
                    <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: "999px", background: leave.bg, color: leave.color, fontWeight: 700 }}>
                      {leave.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem 0.5rem", fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                    {leave.remarks ? `"${leave.remarks}"` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BEAUTIFUL DEMO CHECKOUT SIMULATOR MODAL */}
      {/* ========================================================================= */}
      {demoModalOpen && demoOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 10, 18, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            padding: '20px',
            animation: 'fadeIn 0.25s ease-out',
          }}
        >
          <div
            className="glass"
            style={{
              width: '100%',
              maxWidth: '460px',
              borderRadius: '24px',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(16, 185, 129, 0.15)',
              overflow: 'hidden',
              animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #12221c, #0a120f)',
                padding: '24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(16,185,129,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(16,185,129,0.3)',
                  }}
                >
                  <Sparkles size={18} color="#10b981" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Razorpay <span style={{ fontSize: '10px', background: 'rgba(16,185,129,0.2)', color: '#10b981', padding: '1px 6px', borderRadius: '4px' }}>SIMULATOR</span>
                  </h3>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>Guardian Sandbox Checkout</p>
                </div>
              </div>
              <button
                onClick={() => setDemoModalOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              {/* Order Info */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '16px',
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '11px', color: 'var(--text-muted)' }}>PAYING FOR</p>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'white' }}>Outstanding Child Dues</p>
                  <p style={{ margin: '4px 0 0', fontSize: '10px', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>
                    {demoOrder.id}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: '0 0 2px', fontSize: '11px', color: 'var(--text-muted)' }}>AMOUNT</p>
                  <p style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: '#10b981', fontFamily: 'monospace' }}>
                    ₹{(demoOrder.amount / 100).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {paymentSuccess ? (
                /* Success Animation State */
                <div
                  style={{
                    padding: '30px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '2px solid #10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    <Loader2 size={32} color="#10b981" className="animate-spin" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: 'white' }}>
                      Authorizing Payment...
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
                      Connecting to securely verification servers
                    </p>
                  </div>
                </div>
              ) : (
                /* Interactive Selection State */
                <>
                  {/* Payment Methods Tabs */}
                  <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Select Test Payment Method
                  </p>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                      marginBottom: '20px',
                    }}
                  >
                    {[
                      { id: 'card', name: 'Card', icon: CreditCard },
                      { id: 'upi', name: 'UPI', icon: Smartphone },
                      { id: 'net', name: 'NetBanking', icon: Banknote },
                    ].map((method) => {
                      const Icon = method.icon;
                      const active = selectedMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id as any)}
                          style={{
                            background: active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                            border: `1px solid ${active ? '#10b981' : 'var(--border)'}`,
                            borderRadius: '12px',
                            padding: '12px 8px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s',
                          }}
                        >
                          <Icon size={16} color={active ? '#10b981' : 'var(--text-muted)'} />
                          <span style={{ fontSize: '11px', color: active ? 'white' : 'var(--text-muted)', fontWeight: 600 }}>
                            {method.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic mock inputs based on selected method */}
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.01)',
                      border: '1px dashed var(--border)',
                      borderRadius: '14px',
                      padding: '16px',
                      marginBottom: '24px',
                    }}
                  >
                    {selectedMethod === 'card' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>TEST CARD NUMBER</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'white', letterSpacing: '0.1em' }}>
                          4111 •••• •••• 1111
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                          <span>EXP: 12/30</span>
                          <span>CVV: ***</span>
                        </div>
                      </div>
                    )}

                    {selectedMethod === 'upi' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>TEST UPI ADDRESS</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>
                          parent@paydit
                        </div>
                        <div style={{ fontSize: '10px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                          <CheckCircle2 size={10} /> Instant UPI Verification Active
                        </div>
                      </div>
                    )}

                    {selectedMethod === 'net' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>TEST POPULAR BANK</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>
                          HDFC Bank
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                          Redirecting to mock bank login portal
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Simulator Options Actions */}
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => setDemoModalOpen(false)}
                      style={{
                        flex: 1,
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '12px',
                        padding: '12px',
                        color: '#f87171',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      className="glass-hover"
                    >
                      Fail Payment
                    </button>
                    <button
                      onClick={simulateSuccess}
                      style={{
                        flex: 2,
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '12px',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s',
                      }}
                    >
                      <ShieldCheck size={16} />
                      Simulate Success
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.15)',
                padding: '12px 24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.03)',
                textAlign: 'center',
                fontSize: '10px',
                color: 'var(--text-muted)',
              }}
            >
              🔒 PCI-DSS Compliant Mock Gateway • EduSphere AI Sandbox
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
