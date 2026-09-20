import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";

const incidentTypes = ["Police Harassment", "Customer Assault", "Theft / Robbery", "Vehicle Seizure", "Wrongful Detention", "Other"];

const LegalAidFIR: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const aiTemplate = `On [date] at approximately [time], while I was on duty as a delivery partner for Zomato in Andheri West, Mumbai, I was stopped by [police/person]. I was asked to [details]. I believe this constitutes harassment/unlawful detention under the relevant section. I am requesting formal action be taken.`;

  if (submitted) {
    return (
      <div className="p-4 md:p-6 max-w-lg mx-auto animate-slide-up">
        <div className="gs-card text-center py-10" style={{ borderColor: "rgba(26,175,128,0.4)" }}>
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold font-sora mb-2" style={{ color: "var(--accent-teal)" }}>Complaint Submitted</h2>
          <div className="text-sm font-mono mb-2" style={{ color: "var(--text-secondary)" }}>Ref: MH-FIR-2026-039847</div>
          <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Your complaint has been recorded and submitted to Mumbai Police Online Portal.</p>
          <p className="text-sm mb-6" style={{ color: "var(--accent-teal)" }}>GigShield legal team notified — follow-up within 2 hours.</p>
          <div className="flex gap-3">
            <button className="gs-btn-ghost flex-1 text-sm" style={{ padding: "10px" }}>Share with Advocate</button>
            <button onClick={() => navigate("/legal-aid")} className="gs-btn-primary flex-1 text-sm" style={{ padding: "10px" }}>Back to Legal Aid</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto space-y-6">
      <button onClick={() => navigate("/legal-aid")} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)", background: "transparent", border: "none", cursor: "pointer" }}>
        <ArrowLeft size={16} /> Legal Aid
      </button>
      <h1 className="text-2xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>FIR Filing Assistant</h1>

      {/* Progress */}
      <div className="flex gap-2">
        {["Type", "When & Where", "What Happened", "Your Details", "Review"].map((s, i) => (
          <div key={s} className="flex-1 h-1.5 rounded-full transition-all"
            style={{ background: i <= step ? "var(--accent-teal)" : "var(--border-strong)" }} />
        ))}
      </div>

      <div className="gs-card">
        {step === 0 && (
          <div>
            <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text-primary)" }}>Step 1: Incident Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {incidentTypes.map(t => (
                <button key={t} onClick={() => setIncidentType(t)}
                  className="p-3 rounded-xl text-sm font-medium transition-all text-left"
                  style={{
                    background: incidentType === t ? "var(--accent-teal-glow)" : "var(--bg-elevated)",
                    color: incidentType === t ? "var(--accent-teal)" : "var(--text-secondary)",
                    border: incidentType === t ? "1px solid var(--accent-teal)" : "1px solid var(--border)",
                    minHeight: "52px",
                  }}>{t}</button>
              ))}
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold font-sora mb-2" style={{ color: "var(--text-primary)" }}>Step 2: When & Where</h3>
            <div><label className="text-sm block mb-1" style={{ color: "var(--text-secondary)" }}>Date</label><input type="date" className="gs-input" defaultValue="2026-03-20" /></div>
            <div><label className="text-sm block mb-1" style={{ color: "var(--text-secondary)" }}>Time</label><input type="time" className="gs-input" /></div>
            <div><label className="text-sm block mb-1" style={{ color: "var(--text-secondary)" }}>Location</label><input className="gs-input" defaultValue="Andheri West, Mumbai" /></div>
            <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
              <span className="text-sm" style={{ color: "var(--text-primary)" }}>Were you on duty?</span>
              <span className="gs-pill-safe">Yes</span>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-bold font-sora mb-2" style={{ color: "var(--text-primary)" }}>Step 3: What Happened</h3>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm" style={{ color: "var(--text-secondary)" }}>Description ({description.length} chars)</label>
                <button onClick={() => setDescription(aiTemplate)}
                  className="text-xs px-3 py-1 rounded-lg"
                  style={{ background: "var(--accent-teal-glow)", color: "var(--accent-teal)", border: "1px solid rgba(26,175,128,0.3)", cursor: "pointer" }}>
                  🤖 AI Assist
                </button>
              </div>
              <textarea className="gs-input" rows={5} value={description} onChange={e => setDescription(e.target.value)}
                placeholder="Describe what happened in detail..." style={{ resize: "vertical" }} />
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold font-sora mb-2" style={{ color: "var(--text-primary)" }}>Step 4: Your Details</h3>
            {[["Full Name", "Arjun Sharma"], ["Phone", "+91 98765 43210"], ["Platform ID", "ZOM-AR-28473"]].map(([l, v]) => (
              <div key={l}><label className="text-sm block mb-1" style={{ color: "var(--text-secondary)" }}>{l}</label>
                <input className="gs-input" defaultValue={v} /></div>
            ))}
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-bold font-sora mb-2" style={{ color: "var(--text-primary)" }}>Step 5: Review & Submit</h3>
            <div className="p-4 rounded-xl text-sm space-y-2" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-strong)" }}>
              <div><strong style={{ color: "var(--text-secondary)" }}>Incident Type:</strong> <span style={{ color: "var(--text-primary)" }}>{incidentType || "Police Harassment"}</span></div>
              <div><strong style={{ color: "var(--text-secondary)" }}>Date:</strong> <span style={{ color: "var(--text-primary)" }}>March 20, 2026</span></div>
              <div><strong style={{ color: "var(--text-secondary)" }}>Location:</strong> <span style={{ color: "var(--text-primary)" }}>Andheri West, Mumbai</span></div>
              <div><strong style={{ color: "var(--text-secondary)" }}>Complainant:</strong> <span style={{ color: "var(--text-primary)" }}>Arjun Sharma</span></div>
              <div><strong style={{ color: "var(--text-secondary)" }}>Platform ID:</strong> <span style={{ color: "var(--text-primary)" }}>ZOM-AR-28473</span></div>
            </div>
            <div className="text-xs p-3 rounded-lg" style={{ background: "var(--accent-teal-glow)", color: "var(--accent-teal)" }}>
              This complaint will be submitted to: Mumbai Police Online Portal
            </div>
            <div className="flex gap-3">
              <button className="gs-btn-ghost flex-1 text-sm" style={{ padding: "10px" }}>Download as PDF</button>
              <button onClick={() => setSubmitted(true)} className="gs-btn-primary flex-1 text-sm" style={{ padding: "10px" }}>Submit Complaint</button>
            </div>
          </div>
        )}

        {step < 4 && (
          <div className="flex gap-3 mt-6">
            {step > 0 && <button onClick={() => setStep(s => s - 1)} className="gs-btn-ghost flex-1" style={{ padding: "10px" }}>Back</button>}
            <button onClick={() => setStep(s => s + 1)} className="gs-btn-primary flex-1" style={{ padding: "10px" }}>Continue <ChevronRight size={14} style={{ display: "inline" }} /></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalAidFIR;
