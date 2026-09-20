import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Phone, Shield } from "lucide-react";

const WomenSafety: React.FC = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [sosActivated, setSosActivated] = useState(false);

  const sections = [
    { id: "report", title: "Unsafe Customer Alert", icon: "⚠️" },
    { id: "route", title: "Safe Route Preference", icon: "🗺️" },
    { id: "checkin", title: "Journey Check-in", icon: "📍" },
    { id: "contacts", title: "Emergency Contact Management", icon: "📞" },
    { id: "rights", title: "Know Your Rights as a Woman Worker", icon: "⚖️" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <Shield size={24} style={{ color: "var(--accent-pink)" }} />
        <h1 className="text-2xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>Women Safety</h1>
      </div>

      <div className="p-3 rounded-xl text-sm" style={{ background: "var(--accent-pink-dim)", border: "1px solid rgba(232,107,160,0.2)" }}>
        <span style={{ color: "var(--text-secondary)" }}>This module is optimized for women delivery workers. All features are available to everyone.</span>
      </div>

      {/* Hero */}
      <div className="gs-card" style={{ borderColor: "rgba(232,107,160,0.4)", background: "linear-gradient(135deg, var(--bg-card), rgba(232,107,160,0.05))" }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="gs-pill-pink">GigShield Women Safety Shield</span>
        </div>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>You are not alone. GigShield provides 24/7 safety support specifically designed for women delivery workers.</p>
      </div>

      {/* Quick Emergency Actions */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setSosActivated(true)}
          className="p-4 rounded-2xl flex flex-col items-center gap-2 sos-pulse-pink transition-all"
          style={{ background: "var(--accent-pink-dim)", border: "2px solid var(--accent-pink)", minHeight: "80px" }}>
          <span className="text-2xl">🚨</span>
          <span className="text-xs font-bold font-sora text-center" style={{ color: "var(--accent-pink)" }}>Women's SOS</span>
        </button>
        <a href="tel:1091" className="p-4 rounded-2xl flex flex-col items-center gap-2" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", textDecoration: "none", minHeight: "80px" }}>
          <Phone size={20} style={{ color: "var(--accent-red)" }} />
          <span className="text-xs font-bold font-sora text-center" style={{ color: "var(--accent-red)" }}>Mahila 1091</span>
        </a>
        <button onClick={() => navigate("/legal-aid/advocate")}
          className="p-4 rounded-2xl flex flex-col items-center gap-2"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", minHeight: "80px" }}>
          <span className="text-2xl">⚖️</span>
          <span className="text-xs font-bold font-sora text-center" style={{ color: "var(--accent-teal)" }}>Woman Advocate</span>
        </button>
      </div>

      {sosActivated && (
        <div className="p-4 rounded-xl animate-slide-up" style={{ background: "var(--accent-pink-dim)", border: "2px solid var(--accent-pink)" }}>
          <div className="font-bold font-sora mb-2" style={{ color: "var(--accent-pink)" }}>✓ Women's SOS Activated</div>
          <div className="text-sm space-y-1" style={{ color: "var(--text-secondary)" }}>
            <div>✅ Location recorded</div>
            <div>✅ Mahila helpline notified</div>
            <div>✅ Emergency contact — Priya Sharma alerted</div>
            <div>✅ Woman advocate connecting...</div>
          </div>
          <button onClick={() => setSosActivated(false)} className="mt-3 gs-btn-ghost w-full text-sm" style={{ padding: "10px" }}>I'm Safe — Cancel</button>
        </div>
      )}

      {/* Feature Sections */}
      <div className="space-y-3">
        {sections.map(({ id, title, icon }) => (
          <div key={id} className="gs-card overflow-hidden" style={{ borderColor: expanded === id ? "rgba(232,107,160,0.4)" : "var(--border)" }}>
            <button className="w-full flex items-center justify-between text-left" onClick={() => setExpanded(expanded === id ? null : id)}>
              <div className="flex items-center gap-3">
                <span className="text-xl">{icon}</span>
                <span className="font-bold font-sora text-sm" style={{ color: "var(--text-primary)" }}>{title}</span>
              </div>
              {expanded === id ? <ChevronUp size={16} style={{ color: "var(--text-tertiary)" }} /> : <ChevronDown size={16} style={{ color: "var(--text-tertiary)" }} />}
            </button>

            {expanded === id && (
              <div className="mt-4 pt-4 animate-slide-up" style={{ borderTop: "1px solid var(--border)" }}>
                {id === "report" && (
                  <div className="space-y-3">
                    <input className="gs-input" placeholder="Order ID" />
                    <div className="grid grid-cols-2 gap-2">
                      {["Verbal harassment", "Inappropriate comments", "Threatening behavior", "Physical contact"].map(opt => (
                        <button key={opt} className="p-2 rounded-xl text-xs text-left"
                          style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)", minHeight: "40px" }}>{opt}</button>
                      ))}
                    </div>
                    <textarea className="gs-input" rows={3} placeholder="Describe what happened..." style={{ resize: "vertical" }} />
                    {!reportSubmitted
                      ? <button onClick={() => setReportSubmitted(true)} className="gs-btn-primary w-full text-sm" style={{ padding: "10px", background: "var(--accent-pink)" }}>Submit Report</button>
                      : <div className="p-3 rounded-xl text-sm" style={{ background: "var(--accent-pink-dim)", color: "var(--accent-pink)" }}>✓ Reported. Platform safety team notified. Customer flagged.</div>
                    }
                  </div>
                )}
                {id === "route" && (
                  <div className="space-y-3">
                    {["Avoid isolated roads after dark", "Prefer well-lit main roads", "Alert me if delivery destination is in a flagged zone"].map(pref => (
                      <div key={pref} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
                        <span className="text-sm" style={{ color: "var(--text-primary)" }}>{pref}</span>
                        <div className="w-10 h-6 rounded-full flex items-center justify-end px-1" style={{ background: "var(--accent-pink)" }}>
                          <div className="w-4 h-4 rounded-full bg-white" />
                        </div>
                      </div>
                    ))}
                    <button className="gs-btn-primary w-full text-sm" style={{ padding: "10px", background: "var(--accent-pink)" }}>Save Preferences</button>
                  </div>
                )}
                {id === "checkin" && (
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
                      <span style={{ color: "var(--text-primary)" }}>Notify Priya Sharma on completion</span>
                      <span className="gs-pill-pink">ON</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
                      <span style={{ color: "var(--text-primary)" }}>Alert if no check-in within 15 min</span>
                      <span className="gs-pill-pink">ON</span>
                    </div>
                    <button className="gs-btn-primary w-full text-sm" style={{ padding: "10px", background: "var(--accent-pink)" }}>Activate Journey Check-in</button>
                  </div>
                )}
                {id === "contacts" && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl flex items-center justify-between" style={{ background: "var(--bg-elevated)" }}>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Priya Sharma (Sister)</div>
                        <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>+91 98765 43210 — Primary</div>
                      </div>
                      <span className="gs-pill-pink">Primary</span>
                    </div>
                    <button className="gs-btn-ghost w-full text-sm" style={{ padding: "10px" }}>+ Add Emergency Contact</button>
                  </div>
                )}
                {id === "rights" && (
                  <div className="space-y-2 text-sm">
                    {["Platforms are required to have a complaints committee for sexual harassment (POSH Act 2013).", "You have the right to refuse any delivery you feel unsafe completing.", "If assaulted: call 1091, preserve evidence, call GigShield SOS — woman advocate connects within 10 minutes."].map(r => (
                      <div key={r} className="p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
                        <p style={{ color: "var(--text-secondary)" }}>• {r}</p>
                      </div>
                    ))}
                    <button onClick={() => navigate("/legal-aid/rights")} className="text-sm font-semibold"
                      style={{ color: "var(--accent-pink)", background: "transparent", border: "none", cursor: "pointer" }}>
                      View Full Women's Legal Guide →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resources */}
      <div className="gs-card">
        <h3 className="font-bold font-sora mb-3" style={{ color: "var(--text-primary)" }}>Safety Resources</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[["National Women Helpline", "181"], ["Mahila Police", "1091"], ["Domestic Violence", "181"], ["POSH Helpline", "1800-419-9099"]].map(([l, n]) => (
            <div key={l} className="p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
              <div style={{ color: "var(--text-secondary)", fontSize: 11 }}>{l}</div>
              <div className="font-bold font-sora" style={{ color: "var(--accent-pink)" }}>{n}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WomenSafety;
