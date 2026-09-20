import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight, ArrowLeft, Download, CheckCircle } from "lucide-react";

const ClaimDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
      {/* Back */}
      <button onClick={() => navigate("/claims")} className="flex items-center gap-2 text-sm"
        style={{ color: "var(--text-secondary)", background: "transparent", border: "none", cursor: "pointer" }}>
        <ArrowLeft size={16} /> Back to Claims
      </button>

      {/* Header */}
      <div className="gs-card flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{ borderColor: "rgba(26,175,128,0.3)" }}>
        <div>
          <div className="text-xs font-mono mb-1" style={{ color: "var(--text-tertiary)" }}>{id || "CLM-0318"}</div>
          <h1 className="text-2xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>Heavy Rain — ₹800</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Andheri West, Mumbai — March 18, 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="gs-pill-safe text-sm px-4 py-2">✓ PAID</span>
          <button className="gs-btn-ghost flex items-center gap-2 text-sm" style={{ padding: "10px 16px" }}>
            <Download size={14} /> Download Report
          </button>
        </div>
      </div>

      {/* Trigger Evidence */}
      <div className="gs-card">
        <h2 className="font-bold font-sora mb-4 text-lg" style={{ color: "var(--text-primary)" }}>
          🌧️ Trigger Evidence
        </h2>
        <div className="p-4 rounded-xl text-sm" style={{ background: "rgba(59,139,245,0.08)", border: "1px solid rgba(59,139,245,0.2)" }}>
          <p style={{ color: "var(--text-primary)", lineHeight: 1.8 }}>
            Rainfall measured at <strong style={{ color: "var(--accent-blue)" }}>22mm/hr</strong> at 8:43pm on March 18, 2026.
            GigShield threshold: <strong>15mm/hr</strong>.
            This qualifies for <strong style={{ color: "var(--accent-teal)" }}>full-day coverage payout of ₹800</strong>.
          </p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          {[
            { l: "Recorded", v: "22mm/hr" },
            { l: "Threshold", v: "15mm/hr" },
            { l: "Coverage", v: "₹800" },
          ].map(({ l, v }) => (
            <div key={l} className="p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
              <div className="text-lg font-bold font-sora" style={{ color: "var(--accent-blue)" }}>{v}</div>
              <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Verification */}
      <div className="gs-card">
        <h2 className="font-bold font-sora mb-4 text-lg" style={{ color: "var(--text-primary)" }}>
          📍 Location Verification
        </h2>
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle size={20} style={{ color: "var(--accent-teal)" }} />
          <div>
            <div className="font-semibold" style={{ color: "var(--text-primary)" }}>Confirmed in coverage zone</div>
            <div className="gs-mono">19.1136° N, 72.8697° E</div>
          </div>
        </div>
        <div className="p-3 rounded-xl text-sm" style={{ background: "var(--bg-elevated)" }}>
          <span style={{ color: "var(--text-secondary)" }}>Distance from zone boundary: </span>
          <span style={{ color: "var(--accent-teal)", fontWeight: 600 }}>0.3 km (within zone)</span>
        </div>
      </div>

      {/* AI Verification Log */}
      <div className="gs-card">
        <h2 className="font-bold font-sora mb-4 text-lg" style={{ color: "var(--text-primary)" }}>
          🤖 AI Verification Log
        </h2>
        <div className="space-y-2">
          {[
            { check: "GPS Location Check", result: "Pass ✓" },
            { check: "Cell Tower Cross-Check", result: "Pass ✓" },
            { check: "Platform Activity Check", result: "Pass ✓" },
            { check: "Cluster Detection", result: "No cluster found ✓" },
            { check: "Velocity Check", result: "Pass ✓" },
            { check: "Final Risk Score", result: "18 / 100 ✓" },
          ].map(({ check, result }) => (
            <div key={check} className="flex items-center justify-between p-3 rounded-xl text-sm"
              style={{ background: "var(--bg-elevated)" }}>
              <span style={{ color: "var(--text-secondary)" }}>{check}</span>
              <span style={{ color: "var(--accent-teal)", fontWeight: 600 }}>{result}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-xl text-sm font-semibold"
          style={{ background: "var(--accent-teal-glow)", color: "var(--accent-teal)", border: "1px solid rgba(26,175,128,0.3)" }}>
          ✓ Auto-approved — Score below threshold of 50
        </div>
      </div>

      {/* Payout Timeline */}
      <div className="gs-card">
        <h2 className="font-bold font-sora mb-4 text-lg" style={{ color: "var(--text-primary)" }}>
          ⚡ Payout Timeline
        </h2>
        <div className="space-y-3">
          {[
            { time: "8:43pm", event: "Rain trigger detected (22mm/hr)", done: true },
            { time: "8:43pm", event: "Claim auto-created #CLM-0318", done: true },
            { time: "8:44pm", event: "Fraud check complete (18/100)", done: true },
            { time: "8:44pm", event: "Payout of ₹800 initiated", done: true },
            { time: "8:46pm", event: "UPI credited — ₹800 → arjun.sharma@ybl", done: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-14 text-xs text-right flex-shrink-0" style={{ color: "var(--text-tertiary)", fontFamily: "Courier New" }}>{item.time}</div>
              <div className="relative flex flex-col items-center">
                <div className="w-3 h-3 rounded-full" style={{ background: item.done ? "var(--accent-teal)" : "var(--text-tertiary)" }} />
                {i < 4 && <div className="w-0.5 h-6 mt-1" style={{ background: "var(--border)" }} />}
              </div>
              <div className="text-sm pb-2" style={{ color: item.done ? "var(--text-primary)" : "var(--text-secondary)" }}>{item.event}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-xl text-sm" style={{ background: "var(--bg-elevated)" }}>
          <span style={{ color: "var(--text-tertiary)" }}>UPI Reference: </span>
          <span className="gs-mono">UPI-2024031800847</span>
        </div>
        <div className="mt-2 text-xs" style={{ color: "var(--text-tertiary)" }}>
          Total payout time: <strong style={{ color: "var(--accent-teal)" }}>3 minutes 12 seconds</strong>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetail;
