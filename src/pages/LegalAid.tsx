import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scale, Shield, FileText, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

const quickHelp = [
  {
    q: "What to do if police stops you",
    a: ["1. Stay calm and pull over safely.", "2. Politely ask 'Why am I being stopped?'", "3. Show Aadhaar + driving licence + platform ID only.", "4. If detained, immediately say 'I want to call my lawyer' and use GigShield SOS."],
  },
  {
    q: "What to do if a customer assaults you",
    a: ["1. Move to a safe, public area immediately.", "2. Call GigShield SOS — incident report auto-created.", "3. Document everything: screenshots, photos, order details.", "4. File a complaint with your platform's grievance cell within 24 hours."],
  },
  {
    q: "What to do if your vehicle is seized",
    a: ["1. Ask for the official seizure receipt (mandatory by law).", "2. Note the officer's name, badge number, and police station.", "3. Call GigShield Legal — bail bond coverage up to ₹5,000.", "4. Do NOT sign any document without legal advice."],
  },
];

const LegalAid: React.FC = () => {
  const navigate = useNavigate();
  const [openHelp, setOpenHelp] = useState<number | null>(null);

  const cards = [
    { title: "Advocate Support", desc: "Connect with a verified lawyer", sub: "Response time: ~8 minutes", badge: "Premium", color: "var(--accent-teal)", path: "/legal-aid/advocate" },
    { title: "Police Support", desc: "Know your rights during a police interaction", sub: "Step-by-step guidance", badge: null, color: "var(--accent-blue)", path: "/legal-aid/police" },
    { title: "FIR Filing Assistant", desc: "File a complaint with guided help", sub: "AI-assisted form completion", badge: null, color: "var(--accent-amber)", path: "/legal-aid/fir" },
    { title: "Know Your Rights", desc: "Ask any legal question", sub: "Available 24/7", badge: null, color: "var(--accent-pink)", path: "/legal-aid/rights" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>Legal Aid</h1>
        <span className="gs-pill-safe">Coverage Active</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cards.map(({ title, desc, sub, badge, color, path }) => (
          <button key={title} onClick={() => navigate(path)}
            className="gs-card text-left flex flex-col gap-2 transition-all hover:scale-105 cursor-pointer"
            style={{ borderColor: `${color}30`, minHeight: "120px" }}>
            <div className="flex items-center justify-between">
              <span className="font-bold font-sora text-sm" style={{ color }}>{title}</span>
              {badge && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${color}20`, color }}>{badge}</span>}
            </div>
            <p className="text-sm" style={{ color: "var(--text-primary)" }}>{desc}</p>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{sub}</p>
          </button>
        ))}
      </div>

      <div className="gs-card">
        <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text-primary)" }}>Quick Help Guide</h3>
        <div className="space-y-2">
          {quickHelp.map(({ q, a }, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              <button className="w-full flex items-center justify-between p-4 text-left"
                style={{ background: "var(--bg-elevated)", color: "var(--text-primary)" }}
                onClick={() => setOpenHelp(openHelp === i ? null : i)}>
                <span className="text-sm font-medium">{q}</span>
                {openHelp === i ? <ChevronUp size={16} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />}
              </button>
              {openHelp === i && (
                <div className="p-4 space-y-2 animate-slide-up" style={{ background: "var(--bg-card)" }}>
                  {a.map((step, j) => <p key={j} className="text-sm" style={{ color: "var(--text-secondary)" }}>{step}</p>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="gs-card">
        <h3 className="font-bold font-sora mb-3" style={{ color: "var(--text-primary)" }}>Legal Coverage Summary</h3>
        <div className="space-y-2">
          {[["Bail bond coverage", "Up to ₹5,000"], ["Legal expense reimbursement", "Up to ₹2,000"], ["Lawyer consultations", "2 free per month (Premium)"]].map(([k, v]) => (
            <div key={k} className="flex justify-between p-3 rounded-xl text-sm" style={{ background: "var(--bg-elevated)" }}>
              <span style={{ color: "var(--text-secondary)" }}>{k}</span>
              <span style={{ color: "var(--accent-teal)", fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalAid;
