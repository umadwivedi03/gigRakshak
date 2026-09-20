import React, { useState } from "react";
import { ChevronDown, ChevronUp, TrendingUp, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const deliveries = [
  {
    id: 1, date: "Mar 19, 6:30pm", from: "Versova", to: "Andheri W",
    dist: "4.2km", earnings: "₹97", riskType: "MODERATE", riskLevel: "warning",
    rain: "Rain +₹20", claimLinked: false,
    zones: [
      { name: "Versova", risk: "LOW", dist: "1.4km", earn: "₹30" },
      { name: "DN Nagar", risk: "MODERATE", dist: "1.1km", earn: "₹35 (+₹12 bonus)" },
      { name: "Andheri W", risk: "LOW", dist: "1.7km", earn: "₹32" },
    ],
    conditions: ["Light rain (8mm/hr)", "AQI: 145"],
  },
  {
    id: 2, date: "Mar 19, 4:15pm", from: "Bandra", to: "Kurla",
    dist: "8.1km", earnings: "₹145", riskType: "HIGH", riskLevel: "danger",
    rain: "AQI +₹35", claimLinked: false,
    zones: [
      { name: "Bandra", risk: "LOW", dist: "2.0km", earn: "₹40" },
      { name: "Dharavi", risk: "HIGH", dist: "3.1km", earn: "₹60 (+₹35 AQI bonus)" },
      { name: "Kurla", risk: "MODERATE", dist: "3.0km", earn: "₹45" },
    ],
    conditions: ["AQI: 287 (High)", "Temp: 36°C"],
  },
  {
    id: 3, date: "Mar 18, 8:00pm", from: "Andheri", to: "Goregaon",
    dist: "6.3km", earnings: "₹110", riskType: "LOW", riskLevel: "safe",
    rain: "", claimLinked: false,
    zones: [
      { name: "Andheri W", risk: "LOW", dist: "2.0km", earn: "₹38" },
      { name: "Jogeshwari", risk: "LOW", dist: "2.3km", earn: "₹40" },
      { name: "Goregaon", risk: "LOW", dist: "2.0km", earn: "₹32" },
    ],
    conditions: ["Clear weather", "AQI: 95"],
  },
  {
    id: 4, date: "Mar 17, 7:30pm", from: "Malad", to: "Andheri",
    dist: "5.8km", earnings: "₹89", riskType: "MODERATE", riskLevel: "warning",
    rain: "Claim triggered", claimLinked: true,
    zones: [
      { name: "Malad", risk: "MODERATE", dist: "2.0km", earn: "₹30" },
      { name: "Kandivali", risk: "MODERATE", dist: "2.0km", earn: "₹30" },
      { name: "Andheri W", risk: "LOW", dist: "1.8km", earn: "₹29" },
    ],
    conditions: ["Heavy rain (18mm/hr) — CLAIM TRIGGERED", "₹800 payout initiated"],
  },
  {
    id: 5, date: "Mar 16, 5:00pm", from: "Powai", to: "Kurla",
    dist: "9.2km", earnings: "₹162", riskType: "LOW", riskLevel: "safe",
    rain: "", claimLinked: false,
    zones: [
      { name: "Powai", risk: "LOW", dist: "2.5km", earn: "₹45" },
      { name: "Vikhroli", risk: "LOW", dist: "3.5km", earn: "₹67" },
      { name: "Kurla", risk: "LOW", dist: "3.2km", earn: "₹50" },
    ],
    conditions: ["Clear weather", "AQI: 78"],
  },
  {
    id: 6, date: "Mar 15, 11:00am", from: "Andheri", to: "Bandra",
    dist: "7.4km", earnings: "₹128", riskType: "HIGH", riskLevel: "danger",
    rain: "Heatwave", claimLinked: false,
    zones: [
      { name: "Andheri W", risk: "HIGH", dist: "2.5km", earn: "₹45" },
      { name: "Vile Parle", risk: "HIGH", dist: "2.5km", earn: "₹40 (+₹20 heat bonus)" },
      { name: "Bandra", risk: "MODERATE", dist: "2.4km", earn: "₹43" },
    ],
    conditions: ["Heatwave: 44°C", "AQI: 210"],
  },
];

const zoneChartData = [
  { zone: "Andheri W", avg: 82 },
  { zone: "Bandra", avg: 95 },
  { zone: "Kurla", avg: 110 },
  { zone: "Powai", avg: 105 },
  { zone: "Malad", avg: 68 },
  { zone: "Goregaon", avg: 75 },
];

const DeliveryHistory: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState("This Week");

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>Delivery History</h1>
        <div className="flex gap-2">
          {["This Week", "This Month", "All"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: filter === f ? "var(--accent-teal-glow)" : "var(--bg-elevated)",
                color: filter === f ? "var(--accent-teal)" : "var(--text-secondary)",
                border: filter === f ? "1px solid var(--accent-teal)" : "1px solid var(--border)",
                minHeight: "40px",
              }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: "Total Deliveries", v: "47", c: "var(--accent-teal)" },
          { l: "Total Earned", v: "₹38,400", c: "var(--text-primary)" },
          { l: "Risk Bonuses", v: "₹1,240", c: "var(--accent-amber)" },
          { l: "Payouts Received", v: "₹2,400", c: "var(--success)" },
        ].map(({ l, v, c }) => (
          <div key={l} className="gs-card">
            <div className="text-xl font-bold font-sora mb-1" style={{ color: c }}>{v}</div>
            <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Delivery List */}
      <div className="space-y-3">
        {deliveries.map(d => (
          <div key={d.id} className="gs-card overflow-hidden">
            {/* Collapsed */}
            <button className="w-full flex items-center justify-between text-left" onClick={() => setExpandedId(expandedId === d.id ? null : d.id)}>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)", fontFamily: "Sora" }}>
                      {d.from} → {d.to}
                    </span>
                    {d.riskLevel === "safe" && <span className="gs-pill-safe text-xs">{d.riskType}</span>}
                    {d.riskLevel === "warning" && <span className="gs-pill-warning text-xs">{d.riskType}</span>}
                    {d.riskLevel === "danger" && <span className="gs-pill-danger text-xs">{d.riskType}</span>}
                    {d.claimLinked && <span className="gs-pill-safe text-xs">₹800 payout</span>}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                    {d.date} &nbsp;•&nbsp; {d.dist} &nbsp;{d.rain && `•  ${d.rain}`}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-3">
                <span className="text-base font-bold font-sora" style={{ color: "var(--accent-teal)" }}>{d.earnings}</span>
                {expandedId === d.id ? <ChevronUp size={16} style={{ color: "var(--text-tertiary)" }} /> : <ChevronDown size={16} style={{ color: "var(--text-tertiary)" }} />}
              </div>
            </button>

            {/* Expanded */}
            {expandedId === d.id && (
              <div className="mt-4 pt-4 space-y-4 animate-slide-up" style={{ borderTop: "1px solid var(--border)" }}>
                {/* Zone breakdown */}
                <div>
                  <div className="text-xs font-bold mb-2 font-sora" style={{ color: "var(--text-secondary)" }}>ZONE BREAKDOWN</div>
                  <div className="space-y-2">
                    {d.zones.map(z => (
                      <div key={z.name} className="flex items-center justify-between p-2 rounded-xl text-sm"
                        style={{ background: "var(--bg-elevated)" }}>
                        <div className="flex items-center gap-2">
                          {z.risk === "LOW" ? <span className="gs-pill-safe text-xs">{z.risk}</span>
                            : z.risk === "MODERATE" ? <span className="gs-pill-warning text-xs">{z.risk}</span>
                              : <span className="gs-pill-danger text-xs">{z.risk}</span>}
                          <span style={{ color: "var(--text-primary)" }}>{z.name}</span>
                          <span style={{ color: "var(--text-tertiary)", fontSize: 11 }}>{z.dist}</span>
                        </div>
                        <span style={{ color: "var(--accent-teal)", fontWeight: 600 }}>{z.earn}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Conditions */}
                <div>
                  <div className="text-xs font-bold mb-2 font-sora" style={{ color: "var(--text-secondary)" }}>CONDITIONS ENCOUNTERED</div>
                  {d.conditions.map(c => (
                    <div key={c} className="text-sm py-1" style={{ color: c.includes("CLAIM") ? "var(--accent-amber)" : "var(--text-secondary)" }}>
                      {c.includes("CLAIM") ? "⚠ " : "• "}{c}
                    </div>
                  ))}
                </div>
                {/* Mini route SVG */}
                <div className="rounded-xl overflow-hidden h-16" style={{ background: "#0E1A2B" }}>
                  <svg width="100%" height="64" viewBox="0 0 300 64">
                    <line x1="20" y1="32" x2="280" y2="32" stroke="#2A3A55" strokeWidth="4" />
                    <path d="M 20 32 L 100 32 L 180 32 L 280 32" fill="none" stroke="#1AAF80" strokeWidth="2" strokeDasharray="6 3" />
                    {d.zones.map((z, i) => {
                      const x = 20 + (i * 130);
                      return (
                        <g key={i}>
                          <circle cx={x} cy="32" r="6" fill={z.risk === "LOW" ? "#1AAF80" : z.risk === "MODERATE" ? "#F0A500" : "#E5484D"} />
                          <text x={x} y="55" textAnchor="middle" fill="#4A5A72" fontSize="8">{z.name}</text>
                        </g>
                      );
                    })}
                    <circle cx="280" cy="32" r="6" fill="#E5484D" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Zone Performance Chart */}
      <div className="gs-card">
        <h3 className="font-bold font-sora mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <TrendingUp size={16} style={{ color: "var(--accent-teal)" }} />
          Average Earnings Per Zone
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={zoneChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="zone" tick={{ fontSize: 11, fill: "var(--text-tertiary)", fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "var(--text-tertiary)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)" }} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
            <Bar dataKey="avg" fill="var(--accent-teal)" radius={[4, 4, 0, 0]} name="Avg ₹ per delivery" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DeliveryHistory;
