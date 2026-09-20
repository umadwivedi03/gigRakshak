import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Phone } from "lucide-react";

const emergencies = [
  {
    title: "Accident While On Duty", icon: "🚑",
    steps: ["Ensure your safety — move to the side of the road.", "Call 108 for ambulance if injured.", "Use GigShield SOS — emergency contact notified.", "Take photos of the scene if safe.", "Do NOT move an injured person unless trained.", "File incident report in GigShield — first aid expenses covered up to ₹500."],
    action: { label: "Report Accident", color: "var(--accent-red)" },
  },
  {
    title: "Heat Exhaustion / Heat Stroke", icon: "🌡️",
    steps: ["Symptoms: dizziness, nausea, stopping sweating, confusion.", "Move to shade. Cool water on neck and wrists. Lie down.", "Call 108 if: worker loses consciousness.", "GigShield: heatwave trigger may be active — check zone status."],
    action: { label: "Check Heatwave Coverage", color: "var(--accent-amber)" },
  },
  {
    title: "Respiratory Distress (High Pollution)", icon: "😷",
    steps: ["If AQI is above 300: stop working and seek shelter.", "Cover nose and mouth with wet cloth if no mask.", "If breathing difficulty: call 108 immediately.", "GigShield: AQI trigger may be active — check zone status."],
    action: { label: "Check AQI Coverage", color: "var(--accent-blue)" },
  },
  {
    title: "Dog Bite / Animal Attack", icon: "🐕",
    steps: ["Wash wound with soap and water for 15 minutes.", "Go to nearest government hospital for anti-rabies injection (free).", "Document with a photo.", "Report to your platform as a work incident.", "GigShield covers first aid expenses: ₹500."],
    action: { label: "File Incident Report", color: "var(--accent-teal)" },
  },
];

const hospitals = [
  { name: "Kokilaben Hospital", dist: "2.3 km", num: "022-4269-6969", note: "24/7 Emergency" },
  { name: "Andheri Government Hospital", dist: "0.8 km", num: "1800-XXX-XXXX", note: "Free OPD" },
  { name: "Seven Hills Hospital", dist: "3.1 km", num: "022-6767-6767", note: "24/7 Emergency" },
];

const Medical: React.FC = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [claimOpen, setClaimOpen] = useState(false);
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>Medical Help Center</h1>

      {/* Emergency Banner */}
      <div className="p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3"
        style={{ background: "var(--accent-red-dim)", border: "1px solid rgba(229,72,77,0.3)" }}>
        <p className="text-sm font-semibold" style={{ color: "var(--accent-red)" }}>
          🚨 Genuine emergency? Call 108 (Ambulance) immediately. Then use GigShield coverage below.
        </p>
        <a href="tel:108" className="gs-btn-danger text-sm flex items-center gap-2" style={{ padding: "10px 20px", textDecoration: "none", display: "inline-flex" }}>
          <Phone size={14} /> Call 108
        </a>
      </div>

      {/* Coverage Card */}
      <div className="gs-card">
        <h3 className="font-bold font-sora mb-3" style={{ color: "var(--text-primary)" }}>Coverage Summary</h3>
        <div className="space-y-2 text-sm">
          {[["Medical emergency guide", "All plans ✓"], ["First aid expense coverage", "₹500 (Standard) / ₹1,500 (Premium)"], ["Hospital liaison", "Premium only"]].map(([k, v]) => (
            <div key={k} className="flex justify-between p-2 rounded-lg" style={{ background: "var(--bg-elevated)" }}>
              <span style={{ color: "var(--text-secondary)" }}>{k}</span>
              <span style={{ color: "var(--accent-teal)", fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
        <p className="text-xs mt-3 p-2 rounded-lg" style={{ background: "var(--accent-amber-dim)", color: "var(--accent-amber)" }}>
          ⚠ GigShield does NOT cover health insurance, surgery, or ongoing treatment. We cover incident-related first aid only.
        </p>
      </div>

      {/* Emergency Situations */}
      <div className="space-y-3">
        {emergencies.map(({ title, icon, steps, action }, i) => (
          <div key={i} className="gs-card overflow-hidden">
            <button className="w-full flex items-center justify-between text-left" onClick={() => setExpanded(expanded === i ? null : i)}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <span className="font-bold font-sora text-sm" style={{ color: "var(--text-primary)" }}>{title}</span>
              </div>
              {expanded === i ? <ChevronUp size={16} style={{ color: "var(--text-tertiary)" }} /> : <ChevronDown size={16} style={{ color: "var(--text-tertiary)" }} />}
            </button>
            {expanded === i && (
              <div className="mt-4 pt-4 space-y-3 animate-slide-up" style={{ borderTop: "1px solid var(--border)" }}>
                {steps.map((s, j) => (
                  <div key={j} className="flex gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: "var(--bg-elevated)", color: "var(--text-tertiary)" }}>{j + 1}</span>
                    <span style={{ color: "var(--text-secondary)" }}>{s}</span>
                  </div>
                ))}
                <button className="text-sm font-semibold mt-2"
                  style={{ color: action.color, background: "transparent", border: "none", cursor: "pointer" }}>
                  {action.label} →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Nearby Hospitals */}
      <div className="gs-card">
        <h3 className="font-bold font-sora mb-3" style={{ color: "var(--text-primary)" }}>Nearby Hospitals</h3>
        <div className="space-y-3">
          {hospitals.map(h => (
            <div key={h.name} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
              <div>
                <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{h.name}</div>
                <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>{h.dist} • {h.note} • {h.num}</div>
              </div>
              <button className="text-xs px-3 py-1.5 rounded-lg"
                style={{ background: "var(--accent-teal-glow)", color: "var(--accent-teal)", border: "none", cursor: "pointer" }}>Get Directions</button>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Expense Claim */}
      <div className="gs-card">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold font-sora text-sm" style={{ color: "var(--text-primary)" }}>Incurred first aid expenses?</div>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>File a medical expense claim now</p>
          </div>
          <button onClick={() => setClaimOpen(!claimOpen)} className="gs-btn-primary text-sm" style={{ padding: "10px 16px" }}>File Claim</button>
        </div>
        {claimOpen && !claimSubmitted && (
          <div className="mt-4 pt-4 space-y-3 animate-slide-up" style={{ borderTop: "1px solid var(--border)" }}>
            <input className="gs-input" placeholder="Date of incident" type="date" defaultValue="2026-03-20" />
            <input className="gs-input" placeholder="Amount (₹)" type="number" />
            <input className="gs-input" placeholder="Brief description" />
            <button onClick={() => setClaimSubmitted(true)} className="gs-btn-primary w-full">Submit</button>
          </div>
        )}
        {claimSubmitted && (
          <div className="mt-4 p-3 rounded-xl text-sm" style={{ background: "var(--accent-teal-glow)", color: "var(--accent-teal)" }}>
            ✓ Claim submitted. We'll review and process within 24 hours.
          </div>
        )}
      </div>
    </div>
  );
};

export default Medical;
