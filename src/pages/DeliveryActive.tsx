import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle, X } from "lucide-react";

const MockMap: React.FC<{ isActive: boolean; dotProgress: number }> = ({ isActive, dotProgress }) => {
  const pathD = "M 80 280 L 120 220 L 180 190 L 250 160 L 310 180 L 360 200";
  const x = 80 + (360 - 80) * dotProgress;
  const baseY = 280 + (200 - 280) * dotProgress;

  return (
    <div className="relative w-full h-64 md:h-full rounded-2xl overflow-hidden"
      style={{ background: "#0E1A2B", border: "1px solid var(--border)" }}>
      <svg width="100%" height="100%" viewBox="0 0 440 320" preserveAspectRatio="xMidYMid slice">
        {/* City blocks */}
        {[
          [10,10,80,60],[100,10,120,50],[230,10,100,50],[340,10,90,55],[10,80,70,80],
          [90,100,90,60],[200,80,60,70],[280,90,100,60],[390,80,50,60],[10,180,60,60],
          [80,170,80,60],[180,160,50,55],[280,170,90,55],[390,170,50,50],[10,250,90,60],
          [120,240,70,65],[210,250,60,60],[300,240,80,60],[390,250,50,60],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="4"
            fill={i % 3 === 0 ? "#1A2840" : i % 3 === 1 ? "#162235" : "#1E2D45"} opacity="0.8" />
        ))}
        {/* Roads */}
        <line x1="0" y1="160" x2="440" y2="160" stroke="#2A3A55" strokeWidth="8" />
        <line x1="0" y1="240" x2="440" y2="240" stroke="#2A3A55" strokeWidth="6" />
        <line x1="160" y1="0" x2="160" y2="320" stroke="#2A3A55" strokeWidth="8" />
        <line x1="300" y1="0" x2="300" y2="320" stroke="#2A3A55" strokeWidth="6" />
        <line x1="0" y1="80" x2="440" y2="80" stroke="#1E2D45" strokeWidth="4" />
        <line x1="80" y1="0" x2="80" y2="320" stroke="#1E2D45" strokeWidth="4" />
        <line x1="370" y1="0" x2="370" y2="320" stroke="#1E2D45" strokeWidth="4" />

        {/* Route Path - teal dashed */}
        <path d={pathD} fill="none" stroke="#1AAF80" strokeWidth="2.5" strokeDasharray="8 4" opacity="0.8" />

        {/* Zone overlays */}
        <rect x="165" y="165" width="100" height="65" rx="4" fill="rgba(240,165,0,0.1)" stroke="rgba(240,165,0,0.3)" strokeWidth="1" />
        <text x="215" y="202" textAnchor="middle" fill="#F0A500" fontSize="9" fontFamily="DM Sans">High AQI</text>
        <rect x="280" y="165" width="80" height="65" rx="4" fill="rgba(229,72,77,0.1)" stroke="rgba(229,72,77,0.3)" strokeWidth="1" />
        <text x="320" y="202" textAnchor="middle" fill="#E5484D" fontSize="9" fontFamily="DM Sans">Heavy Rain</text>

        {/* Pickup Pin A */}
        <circle cx="80" cy="280" r="8" fill="#1AAF80" />
        <text x="80" y="284" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">A</text>
        <text x="80" y="298" textAnchor="middle" fill="#1AAF80" fontSize="8">Pickup</text>

        {/* Delivery Pin B */}
        <circle cx="360" cy="200" r="8" fill="#E5484D" />
        <text x="360" y="204" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">B</text>
        <text x="360" y="218" textAnchor="middle" fill="#E5484D" fontSize="8">Delivery</text>

        {/* Moving dot */}
        {isActive && (
          <>
            <circle cx={x} cy={baseY} r="10" fill="rgba(59,139,245,0.2)" />
            <circle cx={x} cy={baseY} r="6" fill="#3B8BF5" />
            <circle cx={x} cy={baseY} r="3" fill="white" />
          </>
        )}
      </svg>

      {/* Overlay badges */}
      <div className="absolute top-3 left-3 text-xs px-2 py-1 rounded-lg font-bold"
        style={{ background: "rgba(0,0,0,0.7)", color: "var(--accent-teal)" }}>
        23 km/h
      </div>
      <div className="absolute top-3 right-3">
        <span className="gs-pill-warning text-xs">MODERATE RISK</span>
      </div>
    </div>
  );
};

const DeliveryActive: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const [dotProgress, setDotProgress] = useState(0);
  const [showDeviation, setShowDeviation] = useState(false);
  const [deviationSimulated, setDeviationSimulated] = useState(false);
  const [deliveryComplete, setDeliveryComplete] = useState(false);
  const [distance, setDistance] = useState(1.8);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setDotProgress(p => {
        if (p >= 1) return 0;
        return p + 0.005;
      });
      setDistance(d => Math.min(d + 0.01, 4.2));
    }, 100);
    return () => clearInterval(interval);
  }, [isActive]);

  const zoneLog = [
    { zone: "Versova", risk: "LOW", type: "safe", dist: "0.6 km", bonus: "" },
    { zone: "DN Nagar", risk: "MODERATE", type: "warning", dist: "0.7 km", bonus: "+₹12 risk bonus" },
    { zone: "Andheri W", risk: "LOW", type: "safe", dist: "0.5 km", bonus: "" },
  ];

  if (deliveryComplete) {
    return (
      <div className="p-4 md:p-6 max-w-lg mx-auto animate-slide-up">
        <div className="gs-card text-center mb-6" style={{ borderColor: "rgba(26,175,128,0.4)" }}>
          <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "var(--accent-teal)" }} />
          <h2 className="text-2xl font-bold font-sora mb-2" style={{ color: "var(--accent-teal)" }}>Delivery Complete!</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>Order #ZOM-2847391 delivered successfully</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { l: "Total Earnings", v: "₹97", c: "var(--accent-teal)" },
              { l: "Distance", v: "4.2 km", c: "var(--text-primary)" },
              { l: "Zones Traveled", v: "3", c: "var(--text-primary)" },
              { l: "Risk Bonus", v: "₹12", c: "var(--accent-amber)" },
            ].map(({ l, v, c }) => (
              <div key={l} className="p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
                <div className="text-xl font-bold font-sora" style={{ color: c }}>{v}</div>
                <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{l}</div>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl mb-4" style={{ background: "var(--accent-teal-glow)", border: "1px solid rgba(26,175,128,0.3)" }}>
            <div className="text-sm font-semibold" style={{ color: "var(--accent-teal)" }}>Coverage Active — ₹800/day protected ✓</div>
          </div>
          <button onClick={() => navigate("/delivery/history")} className="gs-btn-primary w-full">View Delivery History</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-full" style={{ minHeight: "calc(100vh - 120px)" }}>
      {/* Map */}
      <div className="w-full md:w-3/5 p-4">
        <MockMap isActive={isActive} dotProgress={dotProgress} />
      </div>

      {/* Info Panel */}
      <div className="w-full md:w-2/5 p-4 space-y-4 overflow-y-auto">
        {/* Order Card */}
        <div className="gs-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>#ZOM-2847391</span>
            <span className="gs-pill-safe">
              <span className="w-2 h-2 rounded-full pulse-dot inline-block mr-1" style={{ background: "var(--accent-teal)" }} />
              IN TRANSIT
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "var(--accent-teal)", color: "white" }}>A</div>
              <div>
                <div style={{ color: "var(--text-primary)" }}>McDonald's, Versova</div>
                <div style={{ color: "var(--text-tertiary)", fontSize: 11 }}>Pickup point</div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "var(--accent-red)", color: "white" }}>B</div>
              <div>
                <div style={{ color: "var(--text-primary)" }}>Flat 402, Infinity Towers, Andheri West</div>
                <div style={{ color: "var(--text-tertiary)", fontSize: 11 }}>Delivery point</div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="text-sm"><span style={{ color: "var(--text-tertiary)" }}>Distance: </span><strong style={{ color: "var(--text-primary)" }}>4.2 km</strong></div>
            <div className="text-sm"><span style={{ color: "var(--text-tertiary)" }}>ETA: </span><strong style={{ color: "var(--accent-amber)" }}>18 min</strong></div>
          </div>
        </div>

        {/* Route Stats */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { l: "Covered", v: `${distance.toFixed(1)} km` },
            { l: "Speed", v: "23 km/h" },
            { l: "Zones", v: "3" },
            { l: "Risk Zones", v: "1 ⚠", amber: true },
          ].map(({ l, v, amber }) => (
            <div key={l} className="gs-card p-3">
              <div className="text-lg font-bold font-sora" style={{ color: amber ? "var(--accent-amber)" : "var(--text-primary)" }}>{v}</div>
              <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Zone Log */}
        <div className="gs-card">
          <div className="text-sm font-bold font-sora mb-3" style={{ color: "var(--text-primary)" }}>Zone Insights</div>
          <div className="space-y-2">
            {zoneLog.map(({ zone, risk, type, dist, bonus }) => (
              <div key={zone} className="flex items-center justify-between text-xs p-2 rounded-lg" style={{ background: "var(--bg-elevated)" }}>
                <div className="flex items-center gap-2">
                  <span style={{ color: type === "safe" ? "var(--accent-teal)" : "var(--accent-amber)" }}>
                    {type === "safe" ? "✓" : "⚠"}
                  </span>
                  <span style={{ color: "var(--text-primary)" }}>{zone}</span>
                  {type === "safe" ? <span className="gs-pill-safe" style={{ fontSize: 10 }}>{risk}</span>
                    : <span className="gs-pill-warning" style={{ fontSize: 10 }}>{risk}</span>}
                </div>
                <div className="text-right">
                  <div style={{ color: "var(--text-tertiary)" }}>{dist}</div>
                  {bonus && <div style={{ color: "var(--accent-amber)", fontWeight: 600 }}>{bonus}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings */}
        <div className="gs-card">
          <div className="text-sm font-bold font-sora mb-3" style={{ color: "var(--text-primary)" }}>This Delivery</div>
          {[
            { l: "Base Pay", v: "₹65" },
            { l: "Surge (rain)", v: "+₹20", pos: true },
            { l: "Risk Zone Bonus", v: "+₹12", pos: true },
          ].map(({ l, v, pos }) => (
            <div key={l} className="flex justify-between text-sm py-1">
              <span style={{ color: "var(--text-secondary)" }}>{l}</span>
              <span style={{ color: pos ? "var(--accent-teal)" : "var(--text-primary)" }}>{v}</span>
            </div>
          ))}
          <div className="flex justify-between text-base font-bold pt-2 mt-2" style={{ borderTop: "1px solid var(--border)" }}>
            <span style={{ color: "var(--text-primary)" }}>Total so far</span>
            <span style={{ color: "var(--accent-teal)" }}>₹97</span>
          </div>
          <div className="mt-2 p-2 rounded-lg text-xs font-semibold" style={{ background: "var(--accent-teal-glow)", color: "var(--accent-teal)" }}>
            Protected Amount: ₹800 (coverage active)
          </div>
        </div>

        {/* Deviation sim */}
        {!deviationSimulated && (
          <button onClick={() => { setDeviationSimulated(true); setShowDeviation(true); }}
            className="gs-btn-ghost w-full text-sm" style={{ padding: "10px" }}>
            Simulate Route Deviation
          </button>
        )}

        {showDeviation && (
          <div className="p-4 rounded-xl animate-slide-up" style={{ background: "var(--accent-red-dim)", border: "1px solid rgba(229,72,77,0.3)" }}>
            <div className="flex items-start gap-2 mb-3">
              <AlertTriangle size={16} style={{ color: "var(--accent-red)", flexShrink: 0, marginTop: 2 }} />
              <p className="text-sm font-semibold" style={{ color: "var(--accent-red)" }}>
                Route deviation detected — you are 400m off your planned route. Are you safe?
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowDeviation(false)} className="gs-btn-ghost flex-1 text-sm" style={{ padding: "10px" }}>I'm Fine</button>
              <button className="gs-btn-danger flex-1 text-sm" style={{ padding: "10px" }}
                onClick={() => window.location.href = "/sos"}>Send SOS</button>
            </div>
          </div>
        )}

        <button onClick={() => setDeliveryComplete(true)} className="gs-btn-primary w-full py-4 text-base">
          ✓ Mark Delivery Complete
        </button>
      </div>
    </div>
  );
};

export default DeliveryActive;
