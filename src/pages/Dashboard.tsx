import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Scale, Heart, Shield, FileText, MapPin, ChevronRight, X, TrendingUp, Bike, Bell } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useApp } from "@/context/AppContext";

const earningsData = [
  { day: "Mon", earned: 850, protected: 0 },
  { day: "Tue", earned: 920, protected: 0 },
  { day: "Wed", earned: 0, protected: 800 },
  { day: "Thu", earned: 780, protected: 0 },
  { day: "Fri", earned: 900, protected: 0 },
  { day: "Sat", earned: 1100, protected: 0 },
  { day: "Sun", earned: 600, protected: 0 },
];

const recentClaims = [
  { id: "CLM-0318", date: "Mar 18", type: "Heavy Rain", amount: "₹800", status: "paid" },
  { id: "CLM-0312", date: "Mar 12", type: "AQI Alert", amount: "₹800", status: "paid" },
  { id: "CLM-0306", date: "Mar 6", type: "Heatwave", amount: "₹800", status: "review" },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isWoman, workerName, plan, zone } = useApp();
  const [alertDismissed, setAlertDismissed] = useState(false);

  const quickActions = [
    { label: "SOS Emergency", icon: AlertCircle, color: "var(--accent-red)", bg: "var(--accent-red-dim)", path: "/sos" },
    { label: "Legal Aid", icon: Scale, color: "var(--accent-teal)", bg: "var(--accent-teal-glow)", path: "/legal-aid" },
    { label: "Medical Help", icon: Heart, color: "var(--accent-blue)", bg: "rgba(59,139,245,0.15)", path: "/medical" },
    isWoman
      ? { label: "Women Safety", icon: Shield, color: "var(--accent-pink)", bg: "var(--accent-pink-dim)", path: "/women-safety" }
      : { label: "Document Vault", icon: FileText, color: "var(--accent-amber)", bg: "var(--accent-amber-dim)", path: "/document-vault" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Coverage Hero */}
      <div className="gs-card" style={{ border: "2px solid rgba(26,175,128,0.3)", background: "linear-gradient(135deg, var(--bg-card), rgba(26,175,128,0.05))" }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full pulse-dot" style={{ background: "var(--accent-teal)", display: "inline-block" }} />
              <span className="text-xs font-bold font-sora tracking-widest" style={{ color: "var(--accent-teal)" }}>COVERAGE ACTIVE</span>
            </div>
            <h2 className="text-xl font-bold font-sora mb-1" style={{ color: "var(--text-primary)" }}>
              {workerName} — {plan} Plan
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Coverage: <strong style={{ color: "var(--text-primary)" }}>₹800/day</strong> &nbsp;|&nbsp; Renews in: <strong style={{ color: "var(--text-primary)" }}>3 days</strong></p>
            <div className="mt-3">
              <span className="gs-pill-warning">⚠ MODERATE — Light rain expected tonight</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate("/zone-monitor")} className="gs-btn-ghost text-sm" style={{ padding: "10px 16px" }}>
              Zone Status
            </button>
            <button onClick={() => navigate("/delivery/active")} className="gs-btn-primary text-sm" style={{ padding: "10px 16px" }}>
              Start Delivery
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map(({ label, icon: Icon, color, bg, path }) => (
          <button key={label} onClick={() => navigate(path)}
            className="gs-card flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 cursor-pointer"
            style={{ minHeight: "100px", borderColor: `${color}30` }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: bg }}>
              <Icon size={22} style={{ color }} />
            </div>
            <span className="text-xs font-semibold text-center font-sora" style={{ color: "var(--text-primary)" }}>{label}</span>
          </button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Days Active", value: "5", color: "var(--accent-teal)" },
          { label: "Income Protected", value: "₹4,000", color: "var(--accent-blue)" },
          { label: "Claims Triggered", value: "1", color: "var(--accent-amber)" },
          { label: "Payout Received", value: "₹800", color: "var(--success)" },
        ].map(({ label, value, color }) => (
          <div key={label} className="gs-card text-center">
            <div className="text-2xl font-bold font-sora mb-1" style={{ color }}>{value}</div>
            <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Alert Banner */}
      {!alertDismissed && (
        <div className="animate-slide-up flex items-start justify-between gap-3 p-4 rounded-xl"
          style={{ background: "var(--accent-amber-dim)", border: "1px solid rgba(240,165,0,0.3)" }}>
          <div className="flex items-start gap-2">
            <Bell size={16} style={{ color: "var(--accent-amber)", flexShrink: 0, marginTop: 2 }} />
            <p className="text-sm" style={{ color: "var(--accent-amber)" }}>
              <strong>Heavy rain detected in Andheri West</strong> — Coverage active. Payout processing if deliveries halted.
            </p>
          </div>
          <button onClick={() => setAlertDismissed(true)} style={{ background: "transparent", border: "none", color: "var(--accent-amber)", cursor: "pointer", flexShrink: 0 }}>
            <X size={16} />
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <div className="gs-card">
          <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text-primary)" }}>
            <TrendingUp size={16} style={{ display: "inline", marginRight: 8, color: "var(--accent-teal)" }} />
            Weekly Earnings
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={earningsData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--text-tertiary)", fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--text-tertiary)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontFamily: "DM Sans" }}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Bar dataKey="earned" fill="var(--accent-teal)" radius={[4, 4, 0, 0]} name="Earned ₹" />
              <Bar dataKey="protected" fill="var(--accent-amber)" radius={[4, 4, 0, 0]} name="Payout ₹" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Claims */}
        <div className="gs-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold font-sora" style={{ color: "var(--text-primary)" }}>Recent Claims</h3>
            <button onClick={() => navigate("/claims")} className="text-xs flex items-center gap-1"
              style={{ color: "var(--accent-teal)", background: "transparent", border: "none", cursor: "pointer" }}>
              View All <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {recentClaims.map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: "var(--bg-elevated)" }}>
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{c.type}</div>
                  <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>{c.date} &nbsp;•&nbsp; {c.id}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{c.amount}</span>
                  {c.status === "paid" ? (
                    <span className="gs-pill-safe">Paid</span>
                  ) : (
                    <span className="gs-pill-warning">Review</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Delivery CTA */}
      <div className="gs-card flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ background: "linear-gradient(135deg, var(--bg-card), rgba(59,139,245,0.05))", borderColor: "rgba(59,139,245,0.2)" }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(59,139,245,0.15)" }}>
            <Bike size={22} style={{ color: "var(--accent-blue)" }} />
          </div>
          <div>
            <div className="font-bold font-sora" style={{ color: "var(--text-primary)" }}>Ready to deliver?</div>
            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Start tracking for route protection & earnings analysis</div>
          </div>
        </div>
        <button onClick={() => navigate("/delivery/active")} className="gs-btn-primary w-full md:w-auto">
          Start Active Delivery
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
