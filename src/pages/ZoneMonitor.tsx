import React, { useState } from "react";
import { RefreshCw, MapPin, CloudRain, Wind, Thermometer, Activity, Clock } from "lucide-react";

const triggers = [
  {
    icon: CloudRain, label: "Weather Trigger", color: "var(--accent-red)",
    current: "18mm/hr", threshold: "15mm/hr", pct: 110, status: "TRIGGER ACTIVE",
    statusType: "danger", note: "Payout processing...",
  },
  {
    icon: Wind, label: "Air Quality (AQI)", color: "var(--accent-teal)",
    current: "187 AQI", threshold: "300 AQI", pct: 62, status: "SAFE",
    statusType: "safe", note: "PM2.5: 187",
  },
  {
    icon: Thermometer, label: "Heat Index", color: "var(--accent-teal)",
    current: "32°C", threshold: "45°C", pct: 71, status: "SAFE",
    statusType: "safe", note: "",
  },
  {
    icon: Activity, label: "Zone Activity", color: "var(--accent-teal)",
    current: "78% of normal", threshold: "40% of normal", pct: 78, status: "SAFE",
    statusType: "safe", note: "Order volume normal",
  },
];

const timeline = [
  { date: "Mar 18", type: "rain", desc: "Heavy Rain (18mm)", outcome: "paid", amount: "₹800 paid" },
  { date: "Mar 15", type: "aqi", desc: "AQI Spike (312)", outcome: "paid", amount: "₹800 paid" },
  { date: "Mar 12", type: "clear", desc: "All clear", outcome: "none", amount: "" },
  { date: "Mar 10", type: "heat", desc: "Heatwave warning (43°C)", outcome: "monitoring", amount: "Monitoring" },
  { date: "Mar 8", type: "clear", desc: "All clear", outcome: "none", amount: "" },
];

const nearbyZones = [
  { name: "Bandra", risk: "LOW", type: "safe" },
  { name: "Kurla", risk: "HIGH", type: "danger" },
  { name: "Powai", risk: "LOW", type: "safe" },
  { name: "Malad", risk: "MODERATE", type: "warning" },
];

const ZoneMonitor: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>Live Zone Monitor</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Last updated 2 min ago</p>
        </div>
        <button onClick={handleRefresh} className="gs-btn-ghost flex items-center gap-2" style={{ padding: "8px 16px" }}>
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Current Zone Card */}
      <div className="gs-card" style={{ borderColor: "rgba(240,165,0,0.3)", background: "linear-gradient(135deg, var(--bg-card), rgba(240,165,0,0.05))" }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={16} style={{ color: "var(--accent-amber)" }} />
              <span className="font-bold font-sora text-lg" style={{ color: "var(--text-primary)" }}>Andheri West, Mumbai</span>
            </div>
            <div className="gs-mono mb-3">19.1136° N, 72.8697° E</div>
          </div>
          <div className="text-center">
            <div className="text-xs mb-1" style={{ color: "var(--text-tertiary)" }}>OVERALL RISK</div>
            <span className="gs-pill-warning text-base px-4 py-2">⚠ MODERATE</span>
          </div>
        </div>
      </div>

      {/* Trigger Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {triggers.map(({ icon: Icon, label, color, current, threshold, pct, status, statusType, note }) => (
          <div key={label} className="gs-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon size={18} style={{ color }} />
                <span className="font-semibold font-sora text-sm" style={{ color: "var(--text-primary)" }}>{label}</span>
              </div>
              {statusType === "danger" ? (
                <span className="gs-pill-danger">{status}</span>
              ) : (
                <span className="gs-pill-safe">{status}</span>
              )}
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span style={{ color: "var(--text-secondary)" }}>Current: <strong style={{ color: statusType === "danger" ? "var(--accent-red)" : "var(--text-primary)" }}>{current}</strong></span>
              <span style={{ color: "var(--text-tertiary)" }}>Threshold: {threshold}</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
              <div className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(pct, 100)}%`,
                  background: statusType === "danger" ? "var(--accent-red)" : "var(--accent-teal)",
                }} />
            </div>
            {note && (
              <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: statusType === "danger" ? "var(--accent-red)" : "var(--text-tertiary)" }}>
                {statusType === "danger" && <span className="w-2 h-2 rounded-full pulse-dot inline-block" style={{ background: "var(--accent-red)" }} />}
                {note}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Civil Disruptions */}
      <div className="gs-card flex items-center justify-between">
        <div>
          <div className="font-semibold font-sora mb-1" style={{ color: "var(--text-primary)" }}>Social/Civil Disruptions</div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No curfews or strikes reported in your zone</p>
        </div>
        <span className="gs-pill-safe">SAFE</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Timeline */}
        <div className="gs-card">
          <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text-primary)" }}>
            <Clock size={16} style={{ display: "inline", marginRight: 8, color: "var(--accent-teal)" }} />
            Trigger History — Last 7 Days
          </h3>
          <div className="space-y-4">
            {timeline.map((t, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full mt-0.5 flex-shrink-0"
                    style={{ background: t.outcome === "paid" ? "var(--accent-teal)" : t.outcome === "monitoring" ? "var(--accent-amber)" : "var(--text-tertiary)" }} />
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 mt-1" style={{ background: "var(--border)" }} />}
                </div>
                <div className="pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>{t.date}</span>
                    {t.outcome === "paid" && <span className="gs-pill-safe text-xs">Paid</span>}
                    {t.outcome === "monitoring" && <span className="gs-pill-warning text-xs">Monitoring</span>}
                  </div>
                  <div className="text-sm font-medium mt-0.5" style={{ color: "var(--text-primary)" }}>{t.desc}</div>
                  {t.amount && <div className="text-xs mt-0.5 font-bold" style={{ color: t.outcome === "paid" ? "var(--accent-teal)" : "var(--accent-amber)" }}>{t.amount}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Zones */}
        <div className="gs-card">
          <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text-primary)" }}>
            <MapPin size={16} style={{ display: "inline", marginRight: 8, color: "var(--accent-teal)" }} />
            Nearby Zone Risk
          </h3>
          <div className="space-y-3">
            {nearbyZones.map(({ name, risk, type }) => (
              <div key={name} className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: "var(--bg-elevated)" }}>
                <span className="font-medium" style={{ color: "var(--text-primary)", fontFamily: "DM Sans" }}>{name}</span>
                {type === "safe" && <span className="gs-pill-safe">{risk}</span>}
                {type === "warning" && <span className="gs-pill-warning">{risk}</span>}
                {type === "danger" && <span className="gs-pill-danger">{risk}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneMonitor;
