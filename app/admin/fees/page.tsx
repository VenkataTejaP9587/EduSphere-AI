'use client';

import { useState } from 'react';
import Toast from '@/components/shared/Toast';
import {
  CreditCard,
  AlertCircle,
  TrendingUp,
  Users,
  Download,
  Mail,
  ChevronDown,
  ShieldAlert,
  BarChart3,
  Clock,
} from 'lucide-react';

const allDefaulters = [
  { id: 1, name: 'Rahul Verma',   studentId: 'STU-042', batch: 'CS-2024-A', amount: 17000, daysOverdue: 78, status: 'Critical' },
  { id: 2, name: 'Sneha Patel',   studentId: 'STU-078', batch: 'CS-2024-B', amount: 12000, daysOverdue: 45, status: 'High' },
  { id: 3, name: 'Karan Mehta',   studentId: 'STU-031', batch: 'EC-2024-A', amount: 5000,  daysOverdue: 20, status: 'Medium' },
  { id: 4, name: 'Divya Iyer',    studentId: 'STU-056', batch: 'CS-2024-A', amount: 17000, daysOverdue: 82, status: 'Critical' },
  { id: 5, name: 'Amit Rao',      studentId: 'STU-093', batch: 'EC-2024-A', amount: 12000, daysOverdue: 38, status: 'High' },
  { id: 6, name: 'Priya Singh',   studentId: 'STU-014', batch: 'CS-2024-B', amount: 5000,  daysOverdue: 12, status: 'Medium' },
  { id: 7, name: 'Vikram Nair',   studentId: 'STU-067', batch: 'CS-2024-A', amount: 17000, daysOverdue: 65, status: 'Critical' },
  { id: 8, name: 'Ananya Reddy',  studentId: 'STU-085', batch: 'EC-2024-A', amount: 8000,  daysOverdue: 28, status: 'Medium' },
];

const statCards = [
  {
    label: 'Total Collected',
    value: '₹86.4L',
    sub: '+12.3% vs last semester',
    color: '#10b981',
    icon: TrendingUp,
  },
  {
    label: 'Pending',
    value: '₹12.3L',
    sub: '12.5% of total dues',
    color: '#f59e0b',
    icon: Clock,
  },
  {
    label: 'Defaulters',
    value: '47',
    sub: 'Students with overdue fees',
    color: '#ef4444',
    icon: AlertCircle,
  },
  {
    label: 'Collection Rate',
    value: '87.5%',
    sub: 'Above target of 85%',
    color: '#6366f1',
    icon: BarChart3,
  },
];

const statusConfig: Record<string, { color: string; bg: string; border: string }> = {
  Critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)' },
  High:     { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' },
  Medium:   { color: '#eab308', bg: 'rgba(234,179,8,0.12)',  border: 'rgba(234,179,8,0.3)' },
};

const batchOptions = ['All Batches', 'CS-2024-A', 'CS-2024-B', 'EC-2024-A'];

export default function AdminFeesPage() {
  const [selectedBatch, setSelectedBatch] = useState('All Batches');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [reminderSent, setReminderSent] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState({ visible: false, message: '' });
  const showToast = (msg: string) => setToast({ visible: true, message: msg });

  const filtered =
    selectedBatch === 'All Batches'
      ? allDefaulters
      : allDefaulters.filter((d) => d.batch === selectedBatch);

  const handleSendReminder = (student: typeof allDefaulters[0]) => {
    showToast(`Email reminder sent to ${student.name} ✔`);
    setReminderSent((prev) => new Set(prev).add(student.id));
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Student ID', 'Batch', 'Amount Due', 'Days Overdue', 'Status'];
    const rows = filtered.map((d) => [
      d.name, d.studentId, d.batch, `₹${d.amount}`, d.daysOverdue, d.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fee_defaulters.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const criticalCount = filtered.filter((d) => d.status === 'Critical').length;
  const totalDue = filtered.reduce((s, d) => s + d.amount, 0);

  return (
    <div style={{ padding: '32px', maxWidth: '1300px', margin: '0 auto' }}>
      <Toast visible={toast.visible} message={toast.message} onClose={() => setToast(t => ({ ...t, visible: false }))} />
      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px rgba(99,102,241,0.4)',
            }}
          >
            <CreditCard size={24} color="#fff" />
          </div>
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              Fee Management
            </h1>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '14px' }}>
              Track payments and manage defaulters
            </p>
          </div>
        </div>

        <button
          className="btn-secondary"
          onClick={handleExportCSV}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '11px 22px',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: '12px',
          }}
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Critical Alert Banner */}
      {criticalCount > 0 && (
        <div
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.35)',
            borderRadius: '14px',
            padding: '14px 20px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <ShieldAlert size={20} color="#ef4444" style={{ flexShrink: 0 }} />
          <p style={{ color: '#ef4444', margin: 0, fontSize: '14px', fontWeight: 600 }}>
            {criticalCount} student{criticalCount > 1 ? 's have' : ' has'} critical overdue fees (&gt;60 days). Immediate action required.
          </p>
        </div>
      )}

      {/* Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {statCards.map(({ label, value, sub, color, icon: Icon }) => (
          <div
            key={label}
            className="stat-card"
            style={{
              borderTop: `3px solid ${color}`,
              borderRadius: '16px',
              padding: '22px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: `${color}18`,
                filter: 'blur(14px)',
              }}
            />
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: `${color}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
              }}
            >
              <Icon size={20} color={color} />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '11px', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {label}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 800,
                color,
                margin: '0 0 4px',
              }}
            >
              {value}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: 0 }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Collection Rate Progress */}
      <div
        className="glass"
        style={{ borderRadius: '16px', padding: '20px 24px', marginBottom: '28px' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
          {[
            { label: 'CS-2024-A', collected: 82, color: '#6366f1' },
            { label: 'CS-2024-B', collected: 91, color: '#10b981' },
            { label: 'EC-2024-A', collected: 88, color: '#22d3ee' },
          ].map((batch) => (
            <div key={batch.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 600 }}>
                  {batch.label}
                </span>
                <span style={{ color: batch.color, fontSize: '13px', fontWeight: 700 }}>
                  {batch.collected}%
                </span>
              </div>
              <div className="progress-bar-track" style={{ height: '7px', borderRadius: '99px' }}>
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${batch.collected}%`,
                    background: batch.color,
                    height: '100%',
                    borderRadius: '99px',
                    boxShadow: `0 0 8px ${batch.color}88`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Defaulters Table */}
      <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        {/* Table Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={18} color="#ef4444" />
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              Fee Defaulters
            </h2>
            <span
              style={{
                background: 'rgba(239,68,68,0.15)',
                color: '#ef4444',
                fontSize: '12px',
                fontWeight: 700,
                padding: '2px 10px',
                borderRadius: '99px',
                border: '1px solid rgba(239,68,68,0.25)',
              }}
            >
              {filtered.length} students
            </span>
          </div>

          {/* Batch Filter */}
          <div style={{ position: 'relative' }}>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              style={{
                appearance: 'none',
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '8px 36px 8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {batchOptions.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              color="var(--text-muted)"
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
          </div>
        </div>

        {/* Summary row */}
        <div
          style={{
            padding: '12px 24px',
            background: 'rgba(239,68,68,0.05)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            gap: '32px',
          }}
        >
          <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            Total Overdue:{' '}
            <strong style={{ color: '#ef4444' }}>
              ₹{totalDue.toLocaleString('en-IN')}
            </strong>
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            Critical:{' '}
            <strong style={{ color: '#ef4444' }}>
              {filtered.filter((d) => d.status === 'Critical').length}
            </strong>
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            High:{' '}
            <strong style={{ color: '#f59e0b' }}>
              {filtered.filter((d) => d.status === 'High').length}
            </strong>
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            Medium:{' '}
            <strong style={{ color: '#eab308' }}>
              {filtered.filter((d) => d.status === 'Medium').length}
            </strong>
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.025)' }}>
              {['Student Name', 'Student ID', 'Batch', 'Amount Due', 'Days Overdue', 'Status', 'Action'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '12px 20px',
                    textAlign: 'left',
                    color: 'var(--text-muted)',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    borderBottom: '1px solid var(--border)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, i) => {
              const s = statusConfig[student.status];
              const sent = reminderSent.has(student.id);
              return (
                <tr
                  key={student.id}
                  onMouseEnter={() => setHoveredRow(student.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                    background: hoveredRow === student.id ? 'rgba(255,255,255,0.025)' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                >
                  {/* Name */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '9px',
                          background: `${s.color}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '13px',
                          color: s.color,
                          flexShrink: 0,
                        }}
                      >
                        {student.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600 }}>
                        {student.name}
                      </span>
                    </div>
                  </td>

                  {/* Student ID */}
                  <td style={{ padding: '16px 20px' }}>
                    <span
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {student.studentId}
                    </span>
                  </td>

                  {/* Batch */}
                  <td style={{ padding: '16px 20px' }}>
                    <span
                      style={{
                        color: '#22d3ee',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: 'rgba(34,211,238,0.1)',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        border: '1px solid rgba(34,211,238,0.2)',
                      }}
                    >
                      {student.batch}
                    </span>
                  </td>

                  {/* Amount Due */}
                  <td style={{ padding: '16px 20px' }}>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#ef4444',
                      }}
                    >
                      ₹{student.amount.toLocaleString('en-IN')}
                    </span>
                  </td>

                  {/* Days Overdue */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={13} color={s.color} />
                      <span style={{ color: s.color, fontSize: '13px', fontWeight: 700 }}>
                        {student.daysOverdue} days
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '16px 20px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '4px 12px',
                        borderRadius: '99px',
                        background: s.bg,
                        color: s.color,
                        fontSize: '12px',
                        fontWeight: 700,
                        border: `1px solid ${s.border}`,
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: s.color,
                          display: 'inline-block',
                        }}
                      />
                      {student.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td style={{ padding: '16px 20px' }}>
                    <button
                      onClick={() => handleSendReminder(student)}
                      disabled={sent}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 14px',
                        borderRadius: '9px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: sent ? 'not-allowed' : 'pointer',
                        border: `1px solid ${sent ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.35)'}`,
                        background: sent ? 'rgba(16,185,129,0.1)' : 'rgba(99,102,241,0.12)',
                        color: sent ? '#10b981' : '#818cf8',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Mail size={12} />
                      {sent ? 'Sent ✓' : 'Send Reminder'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <Users size={40} color="var(--text-muted)" style={{ marginBottom: '12px', opacity: 0.4 }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No defaulters found for this batch.</p>
          </div>
        )}
      </div>
    </div>
  );
}
