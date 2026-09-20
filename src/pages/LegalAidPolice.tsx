import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

const steps = [
  "Pull over safely, turn off engine, stay calm.",
  "You have the right to ask 'Why am I being stopped?' — do so politely.",
  "Show Aadhaar + driving licence + platform delivery ID. Nothing else required.",
  "You cannot be detained without a specific complaint or arrest warrant.",
  "If detained, immediately say 'I want to call my lawyer' and use GigShield SOS.",
  "Do NOT sign any document without reading it or without a lawyer present.",
];

const rights = [
  { q: "Can police search my vehicle?", a: "Police need reasonable suspicion to search. You can politely ask what section of law authorizes the search." },
  { q: "Can they take my phone?", a: "No, unless under a court order. You can politely refuse." },
  { q: "What if I'm arrested?", a: "You have the right to know the charges, the right to inform a family member, and the right to a lawyer. Do not sign anything." },
  { q: "What is Section 41A?", a: "A notice to appear, not an arrest. You can comply without being taken into custody." },
  { q: "Detention vs Arrest", a: "Detention is temporary and informal. Arrest is formal and requires informing you of charges. Both require you to remain calm and request legal counsel." },
];

const numbers = [
  { label: "Police", number: "100" },
  { label: "Women Helpline", number: "1091" },
  { label: "Legal Aid", number: "15100" },
  { label: "GigShield Legal Hotline", number: "1800-GIG-HELP" },
  { label: "Emergency Contact: Priya Sharma", number: "+91 98765 43210" },
];

const LegalAidPolice: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [openRight, setOpenRight] = useState<number | null>(null);

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
      <button onClick={() => navigate("/legal-aid")} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)", background: "transparent", border: "none", cursor: "pointer" }}>
        <ArrowLeft size={16} /> Legal Aid
      </button>
      <h1 className="text-2xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>Police Support Guide</h1>

      <div className="flex gap-2">
        {["During a Stop", "Your Rights", "Emergency Numbers"].map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className="px-3 py-2 rounded-xl text-sm font-medium flex-1 transition-all"
            style={{
              background: tab === i ? "var(--accent-teal-glow)" : "var(--bg-elevated)",
              color: tab === i ? "var(--accent-teal)" : "var(--text-secondary)",
              border: tab === i ? "1px solid var(--accent-teal)" : "1px solid var(--border)",
              minHeight: "44px",
            }}>{t}</button>
        ))}
      </div>

      {tab === 0 && (
        <div className="space-y-3">
          {steps.map((s, i) => (
            <div key={i} className="gs-card flex gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold font-sora flex-shrink-0 text-sm"
                style={{ background: "var(--accent-teal)", color: "white" }}>{i + 1}</div>
              <p className="text-sm py-1" style={{ color: "var(--text-primary)" }}>{s}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 1 && (
        <div className="space-y-2">
          {rights.map(({ q, a }, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              <button className="w-full flex items-center justify-between p-4 text-left"
                style={{ background: "var(--bg-elevated)" }}
                onClick={() => setOpenRight(openRight === i ? null : i)}>
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{q}</span>
                {openRight === i ? <ChevronUp size={16} style={{ color: "var(--text-tertiary)" }} /> : <ChevronDown size={16} style={{ color: "var(--text-tertiary)" }} />}
              </button>
              {openRight === i && (
                <div className="p-4" style={{ background: "var(--bg-card)" }}>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 2 && (
        <div className="space-y-3">
          {numbers.map(({ label, number }) => (
            <div key={label} className="gs-card flex items-center justify-between">
              <div>
                <div className="font-semibold font-sora text-sm" style={{ color: "var(--text-primary)" }}>{label}</div>
                <div className="text-lg font-bold font-sora" style={{ color: "var(--accent-teal)" }}>{number}</div>
              </div>
              <a href={`tel:${number}`} className="gs-btn-primary text-sm" style={{ padding: "10px 16px", textDecoration: "none" }}>Call</a>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 rounded-xl sticky bottom-20 md:bottom-4" style={{ background: "var(--accent-amber-dim)", border: "1px solid rgba(240,165,0,0.3)" }}>
        <p className="text-sm" style={{ color: "var(--accent-amber)" }}>Were you stopped by police just now?</p>
        <button onClick={() => navigate("/legal-aid/fir")} className="text-sm font-semibold mt-1"
          style={{ color: "var(--accent-amber)", background: "transparent", border: "none", cursor: "pointer" }}>
          Report This Incident →
        </button>
      </div>
    </div>
  );
};

export default LegalAidPolice;
