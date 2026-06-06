'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import {
  CreditCard,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  Receipt,
  Banknote,
  ShieldAlert,
  Loader2,
  Sparkles,
  ShieldCheck,
  Smartphone,
  ChevronRight,
} from 'lucide-react';

const initialFees = [
  {
    name: 'Tuition Fee',
    amount: 60000,
    dueDate: 'Jan 15, 2026',
    status: 'Paid',
  },
  {
    name: 'Lab Fee',
    amount: 8000,
    dueDate: 'Jan 15, 2026',
    status: 'Paid',
  },
  {
    name: 'Library Fee',
    amount: 3000,
    dueDate: 'Jan 15, 2026',
    status: 'Paid',
  },
  {
    name: 'Exam Fee',
    amount: 5000,
    dueDate: 'Jun 15, 2026',
    status: 'Pending',
  },
  {
    name: 'Development Fee',
    amount: 12000,
    dueDate: 'Apr 1, 2026',
    status: 'Overdue',
  },
  {
    name: 'Sports Fee',
    amount: 2000,
    dueDate: 'Jun 15, 2026',
    status: 'Pending',
  },
];

const initialHistory = [
  {
    date: 'Apr 2, 2026',
    amount: 71000,
    txnId: 'EDU20260402',
    method: 'Online Transfer',
  },
  {
    date: 'Jan 15, 2026',
    amount: 71000,
    txnId: 'EDU20260115',
    method: 'Online Transfer',
  },
  {
    date: 'Jul 10, 2025',
    amount: 60000,
    txnId: 'EDU20250710',
    method: 'DD/Cheque',
  },
];

const statusConfig: Record<string, { color: string; bg: string; icon: typeof CheckCircle2 }> = {
  Paid: { color: '#10b981', bg: 'rgba(16,185,129,0.15)', icon: CheckCircle2 },
  Pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', icon: Clock },
  Overdue: { color: '#ef4444', bg: 'rgba(239,68,68,0.15)', icon: XCircle },
};

export default function FeePaymentPage() {
  const currentUser = useAuth();
  const [fees, setFees] = useState(initialFees);
  const [history, setHistory] = useState(initialHistory);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Razorpay and simulation states
  const [loading, setLoading] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoOrder, setDemoOrder] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | 'net'>('card');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paidItemName, setPaidItemName] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Dynamic calculations
  const hasOverdue = fees.some((f) => f.status === 'Overdue');
  const outstandingFees = fees.filter((f) => f.status !== 'Paid');
  const outstandingTotal = outstandingFees.reduce((s, f) => s + f.amount, 0);
  const totalFees = fees.reduce((s, f) => s + f.amount, 0);
  const paidTotal = fees.filter((f) => f.status === 'Paid').reduce((s, f) => s + f.amount, 0);
  const paymentPercentage = Math.round((paidTotal / totalFees) * 100);

  // Show toast on successful payment
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

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

  const handlePaymentFlow = async (itemName: string, amount: number) => {
    setLoading(true);
    setPaidItemName(itemName);

    try {
      // 1. Create order on server (sends amount in paise)
      const res = await fetch('/api/pay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount * 100, currency: 'INR' }),
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
        setErrorMsg('Failed to load Razorpay SDK. Please check your network.');
        setLoading(false);
        return;
      }

      const options = {
        key: order.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'EduSphere AI ERP',
        description: `Fee Payment - ${itemName}`,
        order_id: order.id,
        handler: function (response: any) {
          executePaymentSuccess(itemName, amount, response.razorpay_payment_id || `pay_${Math.random().toString(36).substring(2, 10)}`);
        },
        prefill: {
          name: currentUser?.name || 'Student',
          email: currentUser?.email || 'student@edusphere.ai',
          contact: '9999999999',
        },
        theme: {
          color: '#6366f1',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setErrorMsg(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      setErrorMsg('An error occurred during payment setup.');
    } finally {
      setLoading(false);
    }
  };

  const executePaymentSuccess = (itemName: string, amount: number, transactionId: string) => {
    // Update local state to reflect paid status
    setFees((prev) =>
      prev.map((fee) => {
        if (itemName === 'All Outstanding' && fee.status !== 'Paid') {
          return { ...fee, status: 'Paid' };
        } else if (fee.name === itemName) {
          return { ...fee, status: 'Paid' };
        }
        return fee;
      })
    );

    // Add transaction to history
    const newTxn = {
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      amount: amount,
      txnId: transactionId.toUpperCase(),
      method: 'Razorpay Online',
    };

    setHistory((prev) => [newTxn, ...prev]);
    setShowToast(true);
    setDemoModalOpen(false);
    setPaymentSuccess(false);
  };

  const simulateSuccess = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      executePaymentSuccess(
        paidItemName || 'All Outstanding',
        paidItemName === 'All Outstanding' ? outstandingTotal : fees.find((f) => f.name === paidItemName)?.amount || 0,
        `pay_sim_${Math.random().toString(36).substring(2, 10)}`
      );
    }, 1500);
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
      {/* Error Banner */}
      {errorMsg && (
        <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '12px 16px', color: '#ef4444', fontSize: '0.85rem', maxWidth: 360, display: 'flex', alignItems: 'center', gap: 10 }}>
          <ShieldAlert size={16} />
          <span style={{ flex: 1 }}>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>✕</button>
        </div>
      )}
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
              {paidItemName === 'All Outstanding' ? 'Outstanding fees cleared' : `${paidItemName} paid`} successfully.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
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
              Fee Payment
            </h1>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '14px' }}>
              Manage your tuition fees and payment history
            </p>
          </div>
        </div>
      </div>

      {/* Overdue Warning Banner */}
      {hasOverdue && (
        <div
          style={{
            background: 'rgba(239,68,68,0.12)',
            border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: '14px',
            padding: '16px 20px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <ShieldAlert size={22} color="#ef4444" style={{ flexShrink: 0 }} />
          <div>
            <p
              style={{
                color: '#ef4444',
                fontWeight: 700,
                margin: '0 0 2px',
                fontSize: '14px',
              }}
            >
              ⚠ Overdue Payment Detected
            </p>
            <p style={{ color: 'rgba(239,68,68,0.85)', margin: 0, fontSize: '13px' }}>
              Overdue fees may block your exam hall ticket. Please pay immediately.
            </p>
          </div>
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
        {[
          {
            label: 'Total Fees',
            value: `₹${totalFees.toLocaleString('en-IN')}`,
            sub: 'Academic Year 2025-26',
            color: '#6366f1',
            icon: CreditCard,
          },
          {
            label: 'Amount Paid',
            value: `₹${paidTotal.toLocaleString('en-IN')}`,
            sub: `${paymentPercentage}% of total fees`,
            color: '#10b981',
            icon: TrendingUp,
          },
          {
            label: 'Outstanding',
            value: `₹${outstandingTotal.toLocaleString('en-IN')}`,
            sub: outstandingTotal > 0 ? 'Remaining balance' : 'No dues remaining! 🎉',
            color: outstandingTotal > 0 ? '#ef4444' : '#10b981',
            icon: AlertCircle,
          },
          {
            label: 'Next Due Date',
            value: outstandingTotal > 0 ? 'Jun 15, 2026' : 'Fully Paid',
            sub: outstandingTotal > 0 ? 'Upcoming deadline' : 'Congratulations!',
            color: outstandingTotal > 0 ? '#f59e0b' : '#10b981',
            icon: Calendar,
          },
        ].map(({ label, value, sub, color, icon: Icon }) => (
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
                top: '-16px',
                right: '-16px',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `${color}22`,
                filter: 'blur(12px)',
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
            <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {label}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
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

      {/* Payment Progress Bar */}
      <div
        className="glass"
        style={{ borderRadius: '16px', padding: '24px', marginBottom: '28px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>
            Payment Progress
          </span>
          <span style={{ color: paymentPercentage === 100 ? '#10b981' : '#6366f1', fontSize: '14px', fontWeight: 700 }}>
            {paymentPercentage}% Completed
          </span>
        </div>
        <div className="progress-bar-track" style={{ height: '10px', borderRadius: '99px' }}>
          <div
            className="progress-bar-fill"
            style={{
              width: `${paymentPercentage}%`,
              background: 'linear-gradient(90deg, #6366f1, #10b981)',
              borderRadius: '99px',
              height: '100%',
              boxShadow: '0 0 10px rgba(99,102,241,0.5)',
              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>₹{paidTotal.toLocaleString('en-IN')} paid</span>
          <span style={{ color: outstandingTotal > 0 ? '#ef4444' : '#10b981', fontSize: '12px', fontWeight: 600 }}>
            {outstandingTotal > 0 ? `₹${outstandingTotal.toLocaleString('en-IN')} remaining` : 'No dues remaining!'}
          </span>
        </div>
      </div>

      {/* Fee Breakdown Table */}
      <div
        className="glass"
        style={{ borderRadius: '16px', padding: '0', marginBottom: '28px', overflow: 'hidden' }}
      >
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
            <Receipt size={18} color="#6366f1" />
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              Fee Breakdown
            </h2>
          </div>
          <span
            style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              background: 'rgba(99,102,241,0.1)',
              padding: '4px 10px',
              borderRadius: '99px',
              border: '1px solid rgba(99,102,241,0.2)',
            }}
          >
            AY 2025-26
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
              {['Fee Type', 'Amount', 'Due Date', 'Status', 'Action'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '12px 24px',
                    textAlign: 'left',
                    color: 'var(--text-muted)',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fees.map((fee, i) => {
              const s = statusConfig[fee.status];
              const StatusIcon = s.icon;
              return (
                <tr
                  key={fee.name}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    borderBottom: i < fees.length - 1 ? '1px solid var(--border)' : 'none',
                    background: hoveredRow === i ? 'rgba(255,255,255,0.03)' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                >
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: s.color,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 500 }}>
                        {fee.name}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span
                      style={{
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                      }}
                    >
                      ₹{fee.amount.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                      {fee.dueDate}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
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
                        fontWeight: 600,
                        border: `1px solid ${s.color}33`,
                      }}
                    >
                      <StatusIcon size={12} />
                      {fee.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {fee.status !== 'Paid' ? (
                      <button
                        onClick={() => handlePaymentFlow(fee.name, fee.amount)}
                        disabled={loading}
                        style={{
                          background: 'rgba(99,102,241,0.15)',
                          border: '1px solid rgba(99,102,241,0.3)',
                          borderRadius: '8px',
                          padding: '6px 14px',
                          color: '#818cf8',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                        className="glass-hover"
                      >
                        {loading && paidItemName === fee.name ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <CreditCard size={12} />
                        )}
                        Pay Online
                      </button>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={12} color="#10b981" /> Settled
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pay Now Section */}
        {outstandingTotal > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(99,102,241,0.05)',
            }}
          >
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '0 0 4px' }}>
                Outstanding Amount
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#ef4444',
                  margin: 0,
                }}
              >
                ₹{outstandingTotal.toLocaleString('en-IN')}
              </p>
            </div>
            <button
              className="btn-primary"
              onClick={() => handlePaymentFlow('All Outstanding', outstandingTotal)}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: 700,
                borderRadius: '12px',
                boxShadow: '0 4px 24px rgba(99,102,241,0.35)',
                cursor: 'pointer',
              }}
            >
              {loading && paidItemName === 'All Outstanding' ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <CreditCard size={16} />
              )}
              Pay ₹{outstandingTotal.toLocaleString('en-IN')} Now
            </button>
          </div>
        )}
      </div>

      {/* Payment History */}
      <div
        className="glass"
        style={{ borderRadius: '16px', overflow: 'hidden' }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Banknote size={18} color="#10b981" />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            Payment History
          </h2>
        </div>

        <div style={{ padding: '0' }}>
          {history.map((payment, i) => (
            <div
              key={payment.txnId}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
                alignItems: 'center',
                padding: '18px 24px',
                borderBottom: i < history.length - 1 ? '1px solid var(--border)' : 'none',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(16,185,129,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 size={16} color="#10b981" />
                </div>
                <div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600, margin: '0 0 2px' }}>
                    {payment.date}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '11px', margin: 0 }}>
                    {payment.method}
                  </p>
                </div>
              </div>

              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#10b981',
                }}
              >
                ₹{payment.amount.toLocaleString('en-IN')}
              </span>

              <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'monospace' }}>
                TXN #{payment.txnId}
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 12px',
                  borderRadius: '99px',
                  background: 'rgba(16,185,129,0.12)',
                  color: '#10b981',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: '1px solid rgba(16,185,129,0.25)',
                  width: 'fit-content',
                }}
              >
                <CheckCircle2 size={11} />
                Paid
              </span>

              <button
                className="btn-secondary"
                style={{
                  fontSize: '12px',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setShowToast(true);
                  setPaidItemName(`Receipt: TXN #${payment.txnId} | ₹${payment.amount.toLocaleString('en-IN')} | ${payment.date}`);
                }}
              >
                <Receipt size={12} />
                Receipt
              </button>
            </div>
          ))}
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
              border: '1px solid rgba(99, 102, 241, 0.25)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.15)',
              overflow: 'hidden',
              animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #1f223a, #111322)',
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
                    background: 'rgba(99,102,241,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(99,102,241,0.3)',
                  }}
                >
                  <Sparkles size={18} color="#818cf8" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Razorpay <span style={{ fontSize: '10px', background: 'rgba(99,102,241,0.2)', color: '#818cf8', padding: '1px 6px', borderRadius: '4px' }}>SIMULATOR</span>
                  </h3>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>Secure Sandbox Checkout</p>
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
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'white' }}>{paidItemName}</p>
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
                            background: active ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                            border: `1px solid ${active ? '#6366f1' : 'var(--border)'}`,
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
                          <Icon size={16} color={active ? '#818cf8' : 'var(--text-muted)'} />
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
                          arjun.sharma@paydit
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
                          State Bank of India (SBI)
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
