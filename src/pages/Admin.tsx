import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const zones = [
  { name: "Andheri West", risk: "HIGH", note: "18mm rain active", color: "rgba(229,72,77,0.25)", text: "var(--accent-red)" },
  { name: "Kurla", risk: "CRITICAL", note: "Cluster alert", color: "rgba(229,72,77,0.45)", text: "var(--accent-red)" },
  { name: "Bandra", risk: "MODERATE", note: "AQI: 189", color: "rgba(240,165,0,0.2)", text: "var(--accent-amber)" },
  { name: "Powai", risk: "LOW", note: "All clear", color: "rgba(26,175,128,0.15)", text: "var(--accent-teal)" },
  { name: "Malad", risk: "MODERATE", note: "Light rain", color: "rgba(240,165,0,0.2)", text: "var(--accent-amber)" },
  { name: "Thane", risk: "LOW", note: "All clear", color: "rgba(26,175,128,0.15)", text: "var(--accent-teal)" },
  { name: "Borivali", risk: "LOW", note: "All clear", color: "rgba(26,175,128,0.15)", text: "var(--accent-teal)" },
  { name: "Dadar", risk: "MODERATE", note: "Temp: 43°C", color: "rgba(240,165,0,0.2)", text: "var(--accent-amber)" },
];

const claimsQueue = [
  { id: "CLM-0321", worker: "GS-MH-28473", trigger: "Heavy Rain", score: 18, scoreColor: "var(--success)", status: "Pending", actions: ["Approve", "Hold"] },
  { id: "CLM-0320", worker: "GS-MH-19284", trigger: "AQI Spike", score: 67, scoreColor: "var(--accent-amber)", status: "Pending", actions: ["Approve", "Hold", "Reject"] },
  { id: "CLM-0319", worker: "GS-MH-30492", trigger: "Heatwave", score: 85, scoreColor: "var(--accent-red)", status: "Flagged", actions: ["Review Details", "Reject"] },
  { id: "CLM-0318", worker: "GS-MH-22847", trigger: "Heavy Rain", score: 12, scoreColor: "var(--success)", status: "Approved", actions: ["View"] },
  { id: "CLM-0317", worker: "GS-MH-18293", trigger: "Curfew", score: 34, scoreColor: "var(--accent-amber)", status: "Pending", actions: ["Approve", "Hold"] },
];

const fraudData = [
  { band: "0–30", count: 241 }, { band: "30–50", count: 38 }, { band: "50–70", count: 5 }, { band: "70–100", count: 3 },
];

const weeklyData = [
  { week: "Week 1", premium: 580, claims: 310, fraud: 45 },
  { week: "Week 2", premium: 620, claims: 290, fraud: 52 },
  { week: "Week 3", premium: 590, claims: 350, fraud: 38 },
  { week: "Week 4", premium: 640, claims: 280, fraud: 61 },
];

const triggerLog = [
  { time: "11:43pm", msg: "RAIN TRIGGER — Andheri West — 18mm/hr — 47 claims auto-created", color: "var(--accent-blue)" },
  { time: "11:38pm", msg: "AQI ALERT — Kurla — PM2.5 312 — 23 claims auto-created", color: "var(--accent-amber)" },
  { time: "10:15pm", msg: "HEAT ALERT — Dadar — 44.2°C — Monitoring (threshold 45°C)", color: "var(--accent-amber)" },
  { time: "9:30pm", msg: "ALL CLEAR — Powai — Previous rain trigger resolved", color: "var(--accent-teal)" },
];

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [claimStatuses, setClaimStatuses] = useState<Record<string, string>>({});

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto" style={{ background: "var(--bg-secondary)" }}>
      {/* Role Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>Admin Dashboard</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Insurer & Operations View</p>
        </div>
        <div className="flex gap-2 rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <button onClick={() => navigate("/dashboard")} className="px-4 py-2 text-sm"
            style={{ background: "transparent", color: "var(--text-secondary)", border: "none", cursor: "pointer" }}>Worker View</button>
          <button className="px-4 py-2 text-sm font-semibold"
            style={{ background: "var(--accent-teal)", color: "white", border: "none", cursor: "pointer" }}>Admin View</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: "Active Policies", v: "12,847", c: "var(--accent-teal)" },
          { l: "Claims This Week", v: "284", c: "var(--accent-amber)" },
          { l: "Fraud Flagged (0.4%)", v: "3", c: "var(--accent-red)" },
          { l: "Loss Ratio", v: "68%", c: "var(--accent-blue)" },
        ].map(({ l, v, c }) => (
          <div key={l} className="gs-card text-center">
            <div className="text-2xl font-bold font-sora" style={{ color: c }}>{v}</div>
            <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Zone Risk Grid */}
      <div className="gs-card">
        <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text-primary)" }}>Live Zone Risk Grid — Mumbai</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {zones.map(z => (
            <div key={z.name} className="p-3 rounded-xl"
              style={{ background: z.color, border: `1px solid ${z.text}40` }}>
              <div className="font-bold font-sora text-sm" style={{ color: z.text }}>{z.risk}</div>
              <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{z.name}</div>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{z.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Claims Queue */}
      <div className="gs-card">
        <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text-primary)" }}>Claims Approval Queue</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Claim ID", "Worker", "Trigger", "Fraud Score", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-bold" style={{ color: "var(--text-tertiary)", fontFamily: "Sora" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {claimsQueue.map(c => (
                <tr key={c.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="py-3 px-3 font-mono text-xs" style={{ color: "var(--text-primary)" }}>{c.id}</td>
                  <td className="py-3 px-3 font-mono text-xs" style={{ color: "var(--text-secondary)" }}>{c.worker}</td>
                  <td className="py-3 px-3 text-xs" style={{ color: "var(--text-primary)" }}>{c.trigger}</td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-xs" style={{ color: c.scoreColor }}>{c.score}/100</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${claimStatuses[c.id] === "Approved" ? "gs-pill-safe" : c.status === "Flagged" ? "gs-pill-danger" : c.status === "Approved" ? "gs-pill-safe" : "gs-pill-warning"}`}>
                      {claimStatuses[c.id] || c.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1 flex-wrap">
                      {c.actions.map(a => (
                        <button key={a}
                          onClick={() => setClaimStatuses(prev => ({ ...prev, [c.id]: a === "Approve" ? "Approved" : a === "Reject" ? "Rejected" : a === "Hold" ? "On Hold" : prev[c.id] || c.status }))}
                          className="text-xs px-2 py-1 rounded-lg"
                          style={{
                            background: a === "Approve" ? "var(--accent-teal-glow)" : a === "Reject" ? "var(--accent-red-dim)" : "var(--bg-elevated)",
                            color: a === "Approve" ? "var(--accent-teal)" : a === "Reject" ? "var(--accent-red)" : "var(--text-secondary)",
                            border: "1px solid var(--border)", cursor: "pointer",
                          }}>{a}</button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Fraud Chart */}
        <div className="gs-card">
          <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text-primary)" }}>Risk Score Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={fraudData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="band" tick={{ fontSize: 11, fill: "var(--text-tertiary)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--text-tertiary)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)" }} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
              <Bar dataKey="count" name="Claims" radius={[4, 4, 0, 0]}
                fill="var(--accent-teal)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Syndicate Alert */}
        <div className="gs-card" style={{ borderColor: "rgba(229,72,77,0.5)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: "var(--accent-red)" }} />
            <h3 className="font-bold font-sora text-sm" style={{ color: "var(--accent-red)" }}>⚠ Cluster Detected</h3>
          </div>
          <p className="text-sm mb-4" style={{ color: "var(--text-primary)" }}>
            18 claims submitted from <strong>Kurla West zone</strong> between 11:30pm–11:50pm on Mar 19
          </p>
          <p className="text-xs mb-4" style={{ color: "var(--text-secondary)" }}>
            Geographical radius: 400m — Possible coordinated fraud activity
          </p>
          <div className="flex gap-2">
            <button className="gs-btn-danger flex-1 text-sm" style={{ padding: "10px" }}>Investigate</button>
            <button className="gs-btn-ghost flex-1 text-sm" style={{ padding: "10px" }}>Dismiss</button>
          </div>
        </div>
      </div>

      {/* Weekly Analytics */}
      <div className="gs-card">
        <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text-primary)" }}>Weekly Analytics (₹000s)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--text-tertiary)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "var(--text-tertiary)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)" }} />
            <Legend wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)" }} />
            <Line type="monotone" dataKey="premium" stroke="var(--success)" strokeWidth={2} dot={false} name="Premium Collected" />
            <Line type="monotone" dataKey="claims" stroke="var(--accent-amber)" strokeWidth={2} dot={false} name="Claims Paid" />
            <Line type="monotone" dataKey="fraud" stroke="var(--accent-red)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Fraud Prevented" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trigger Log */}
      <div className="gs-card">
        <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text-primary)" }}>Live Trigger Log</h3>
        <div className="space-y-2 font-mono text-xs">
          {triggerLog.map((t, i) => (
            <div key={i} className="flex gap-3 p-2 rounded-lg" style={{ background: "var(--bg-elevated)" }}>
              <span style={{ color: "var(--text-tertiary)", flexShrink: 0 }}>[{t.time}]</span>
              <span style={{ color: t.color }}>{t.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
