"use client";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";
import { CreditCard, DollarSign, ArrowUpRight, TrendingUp, Download, Percent, AlertTriangle } from "lucide-react";
import { revenueData } from "@/lib/mock-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 12, padding: "0.75rem 1rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ fontSize: "0.75rem", color: p.color }}>
            {p.name}: {p.name === "subscriptions" ? p.value : `$${p.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminRevenuePage() {
  const handleExport = () => {
    // Generate simple CSV
    const headers = "Transaction ID,Tenant,Cost,Date,Status\n";
    const rows = [
      "TXN-9011,Delhi Institute of Technology,$12400,Today,completed",
      "TXN-9010,Student: Preethi Kumar,$150,Yesterday,completed",
      "TXN-9009,Student: Rohan Mehta,$150,2 days ago,refunded"
    ].join("\n");
    const csvContent = headers + rows;
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "financial_ledger_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>Financial Dashboard</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Track platform transactions, subscription MRR growth, and refund telemetry</p>
        </div>
        <button className="btn-primary" onClick={handleExport} style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--gradient-primary)" }}>
          <Download size={14} /> Export Financial Ledger
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
        {[
          { label: "Monthly Recurring Revenue", value: "$421,000", sub: "+12.4% from Q1", icon: <TrendingUp size={20} />, color: "#10b981" },
          { label: "Annual Run Rate (ARR)", value: "$5.05M", sub: "Forecasted: $6.2M", icon: <DollarSign size={20} />, color: "#6366f1" },
          { label: "Active Subscriptions", value: "854 accounts", sub: "+24 onboarding this week", icon: <CreditCard size={20} />, color: "#22d3ee" },
          { label: "Refund / Chargeback Rate", value: "1.4%", sub: "Industry standard: <2%", icon: <Percent size={20} />, color: "#ef4444" },
        ].map((c, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>{c.label}</span>
              <div style={{ color: c.color }}>{c.icon}</div>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 4 }}>{c.value}</h3>
            <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
        
        {/* Revenue Trends */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={18} color="#10b981" /> MRR growth and Refund Analysis
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="refundGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="revenue" stroke="#10b981" fill="url(#revenueGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="refunds" name="refunds" stroke="#ef4444" fill="url(#refundGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Subscription breakdown by Plan */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
            <CreditCard size={18} color="#6366f1" /> Subscription Tier Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={[
              { tier: "Enterprise", active: 24, cost: 120000 },
              { tier: "University", active: 48, cost: 192000 },
              { tier: "Individual Pro", active: 520, cost: 78000 },
              { tier: "Individual Free", active: 2210, cost: 0 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="tier" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="cost" name="Total Yield ($)" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        
        {/* Recent Transactions Log */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>Recent Invoices</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { id: "TXN-9011", tenant: "Delhi Institute of Technology", cost: "$12,400", date: "Today", status: "completed" },
              { id: "TXN-9010", tenant: "Student: Preethi Kumar", cost: "$150", date: "Yesterday", status: "completed" },
              { id: "TXN-9009", tenant: "Student: Rohan Mehta", cost: "$150", date: "2 days ago", status: "refunded" },
            ].map((txn, idx) => (
              <div key={idx} style={{ padding: "0.875rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontSize: "0.8rem", fontWeight: 700 }}>{txn.tenant}</h4>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>{txn.id} · Date: {txn.date}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: txn.status === "completed" ? "#10b981" : "#ef4444" }}>{txn.cost}</p>
                  <span className={txn.status === "completed" ? "badge badge-success" : "badge badge-danger"} style={{ fontSize: "0.6rem", textTransform: "uppercase", marginTop: 4 }}>{txn.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chargeback warnings */}
        <div className="glass" style={{ borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 6 }}>
            <AlertTriangle size={18} color="#ef4444" /> Financial Alerts
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ padding: "1rem", borderRadius: 12, background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.15)" }}>
              <h4 style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-primary)" }}>High Refund Volume Triggered</h4>
              <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", lineHeight: 1.5, marginTop: 4 }}>
                Refund volume in May reached $11,000, primarily driven by course adjustments. Our support dashboard recommends auditing individual tutor reviews.
              </p>
            </div>
            <div style={{ padding: "1rem", borderRadius: 12, background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.15)" }}>
              <h4 style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--text-primary)" }}>Payout Schedule Configured</h4>
              <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", lineHeight: 1.5, marginTop: 4 }}>
                Faculty payouts are scheduled for automatic release on May 28, 2026. Total forecasted payout matrix is $221,400 across 287 tutors.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
