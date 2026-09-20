import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";

const claimsData = [
  {
    id: "CLM-0318", trigger: "Heavy Rain", triggerType: "weather", date: "Mar 18, 2026", amount: "₹800", status: "paid",
    triggerData: "Rainfall: 22mm/hr exceeded threshold of 15mm/hr",
    location: "GPS confirmed in Andheri West ✓",
    fraudScore: "18/100 — Auto-approved ✓",
    upiRef: "UPI-2024031800847",
    timeline: [
      { t: "8:43pm", e: "Trigger detected" },
      { t: "8:43pm", e: "Claim auto-created" },
      { t: "8:44pm", e: "Fraud check complete" },
      { t: "8:44pm", e: "Payout initiated" },
      { t: "8:46pm", e: "UPI credited ✓" },
    ],
  },
  {
    id: "CLM-0312", trigger: "AQI Spike", triggerType: "aqi", date: "Mar 12, 2026", amount: "₹800", status: "paid",
    triggerData: "PM2.5: 312 AQI exceeded threshold of 300 AQI",
    location: "GPS confirmed in Kurla ✓",
    fraudScore: "23/100 — Auto-approved ✓",
    upiRef: "UPI-2024031200391",
    timeline: [
      { t: "2:15pm", e: "Trigger detected" },
      { t: "2:15pm", e: "Claim auto-created" },
      { t: "2:16pm", e: "Fraud check complete" },
      { t: "2:16pm", e: "Payout initiated" },
      { t: "2:18pm", e: "UPI credited ✓" },
    ],
  },
  {
    id: "CLM-0306", trigger: "Heatwave 44°C", triggerType: "heat", date: "Mar 6, 2026", amount: "₹800", status: "review",
    triggerData: "Temperature: 44°C — Threshold 45°C not fully met; borderline case",
    location: "GPS confirmed in Dadar ✓",
    fraudScore: "31/100 — Manual review required",
    upiRef: "Pending",
    timeline: [
      { t: "1:10pm", e: "Trigger detected" },
      { t: "1:10pm", e: "Claim auto-created" },
      { t: "1:11pm", e: "Fraud check — escalated for manual review" },
      { t: "Pending", e: "Awaiting adjudicator decision" },
    ],
  },
  {
    id: "CLM-0228", trigger: "Curfew — DN Nagar", triggerType: "curfew", date: "Feb 28, 2026", amount: "₹800", status: "paid",
    triggerData: "Section 144 imposed in DN Nagar zone. GigShield curfew coverage activated.",
    location: "GPS confirmed in DN Nagar ✓",
    fraudScore: "11/100 — Auto-approved ✓",
    upiRef: "UPI-2024022800193",
    timeline: [
      { t: "11:30pm", e: "Curfew trigger detected" },
      { t: "11:31pm", e: "Claim auto-created" },
      { t: "11:32pm", e: "Fraud check complete" },
      { t: "11:32pm", e: "Payout initiated" },
      { t: "11:34pm", e: "UPI credited ✓" },
    ],
  },
  {
    id: "CLM-0220", trigger: "Heavy Rain 19mm", triggerType: "weather", date: "Feb 20, 2026", amount: "₹800", status: "paid",
    triggerData: "Rainfall: 19mm/hr exceeded threshold of 15mm/hr",
    location: "GPS confirmed in Andheri West ✓",
    fraudScore: "9/100 — Auto-approved ✓",
    upiRef: "UPI-2024022000044",
    timeline: [
      { t: "7:22pm", e: "Trigger detected" },
      { t: "7:22pm", e: "Claim auto-created" },
      { t: "7:23pm", e: "Fraud check complete" },
      { t: "7:23pm", e: "Payout initiated" },
      { t: "7:25pm", e: "UPI credited ✓" },
    ],
  },
];

const triggerColors: Record<string, string> = {
  weather: "var(--accent-blue)",
  aqi: "var(--accent-red)",
  heat: "var(--accent-amber)",
  curfew: "#A78BFA",
};

const Claims: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [appealText, setAppealText] = useState("");
  const [appealSubmitted, setAppealSubmitted] = useState(false);

  const filters = ["All", "Paid", "Under Review", "Appealed", "Rejected"];

  const filtered = claimsData.filter(c => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Paid") return c.status === "paid";
    if (activeFilter === "Under Review") return c.status === "review";
    return false;
  });

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>Claims Center</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: "Total Claims", v: "8", c: "var(--text-primary)" },
          { l: "Total Paid Out", v: "₹6,400", c: "var(--accent-teal)" },
          { l: "Under Review", v: "1", c: "var(--accent-amber)" },
        ].map(({ l, v, c }) => (
          <div key={l} className="gs-card text-center">
            <div className="text-xl font-bold font-sora" style={{ color: c }}>{v}</div>
            <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            className="px-3 py-1.5 rounded-xl text-sm whitespace-nowrap transition-all"
            style={{
              background: activeFilter === f ? "var(--accent-teal-glow)" : "var(--bg-elevated)",
              color: activeFilter === f ? "var(--accent-teal)" : "var(--text-secondary)",
              border: activeFilter === f ? "1px solid var(--accent-teal)" : "1px solid var(--border)",
              minHeight: "36px",
            }}>{f}</button>
        ))}
      </div>

      {/* Claims List */}
      <div className="space-y-3">
        {filtered.map(c => (
          <div key={c.id} className="gs-card overflow-hidden">
            <button className="w-full text-left" onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold font-mono" style={{ color: "var(--text-primary)" }}>{c.id}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: `${triggerColors[c.triggerType]}20`, color: triggerColors[c.triggerType], border: `1px solid ${triggerColors[c.triggerType]}40` }}>
                      {c.trigger}
                    </span>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>{c.date}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold font-sora" style={{ color: "var(--text-primary)" }}>{c.amount}</span>
                  {c.status === "paid" ? <span className="gs-pill-safe">Paid</span> : <span className="gs-pill-warning">Review</span>}
                  {expandedId === c.id ? <ChevronUp size={16} style={{ color: "var(--text-tertiary)" }} /> : <ChevronDown size={16} style={{ color: "var(--text-tertiary)" }} />}
                </div>
              </div>
            </button>

            {expandedId === c.id && (
              <div className="mt-4 pt-4 space-y-4 animate-slide-up" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="p-3 rounded-xl text-sm" style={{ background: "var(--bg-elevated)" }}>
                  <div className="text-xs font-bold mb-1" style={{ color: "var(--text-tertiary)" }}>TRIGGER DATA</div>
                  <p style={{ color: "var(--text-primary)" }}>{c.triggerData}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl text-sm" style={{ background: "var(--bg-elevated)" }}>
                    <div className="text-xs font-bold mb-1" style={{ color: "var(--text-tertiary)" }}>LOCATION</div>
                    <p style={{ color: "var(--accent-teal)" }}>{c.location}</p>
                  </div>
                  <div className="p-3 rounded-xl text-sm" style={{ background: "var(--bg-elevated)" }}>
                    <div className="text-xs font-bold mb-1" style={{ color: "var(--text-tertiary)" }}>AI FRAUD SCORE</div>
                    <p style={{ color: "var(--accent-teal)" }}>🤖 {c.fraudScore}</p>
                  </div>
                </div>
                {/* Timeline */}
                <div>
                  <div className="text-xs font-bold mb-2" style={{ color: "var(--text-tertiary)" }}>PAYOUT TIMELINE</div>
                  <div className="flex flex-wrap gap-2 items-center">
                    {c.timeline.map((t, i) => (
                      <React.Fragment key={i}>
                        <div className="text-center">
                          <div className="text-xs font-semibold" style={{ color: "var(--accent-teal)" }}>{t.t}</div>
                          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{t.e}</div>
                        </div>
                        {i < c.timeline.length - 1 && <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                {c.upiRef !== "Pending" && (
                  <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>UPI Ref: <span className="gs-mono">{c.upiRef}</span></div>
                )}
                {/* Appeal for review claims */}
                {c.status === "review" && !appealSubmitted && (
                  <div className="mt-4 p-4 rounded-xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-strong)" }}>
                    <div className="text-sm font-bold mb-3 font-sora" style={{ color: "var(--accent-amber)" }}>Appeal This Claim</div>
                    <textarea className="gs-input mb-3" rows={3} placeholder="Explain why you believe this claim should be approved..."
                      value={appealText} onChange={e => setAppealText(e.target.value)}
                      style={{ resize: "vertical", minHeight: "80px" }} />
                    <div className="mb-3">
                      <label className="text-xs block mb-1" style={{ color: "var(--text-secondary)" }}>Upload Evidence (photo/video)</label>
                      <input type="file" accept="image/*,video/*"
                        style={{ color: "var(--text-secondary)", fontSize: "12px" }} />
                    </div>
                    <button onClick={() => setAppealSubmitted(true)} className="gs-btn-primary text-sm" style={{ padding: "10px 20px" }}>
                      Submit Appeal
                    </button>
                  </div>
                )}
                {c.status === "review" && appealSubmitted && (
                  <div className="p-3 rounded-xl text-sm" style={{ background: "var(--accent-teal-glow)", border: "1px solid rgba(26,175,128,0.3)" }}>
                    <span style={{ color: "var(--accent-teal)" }}>✓ Appeal Submitted — Our team will review within 24 hours.</span>
                  </div>
                )}
                <button onClick={() => navigate(`/claims/${c.id}`)} className="text-sm flex items-center gap-1"
                  style={{ color: "var(--accent-teal)", background: "transparent", border: "none", cursor: "pointer" }}>
                  View Full Detail <ChevronRight size={12} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Claims;
