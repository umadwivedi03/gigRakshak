import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Edit2, Check, LogOut, ChevronRight } from "lucide-react";

const Toggle: React.FC<{ defaultOn?: boolean }> = ({ defaultOn = true }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(!on)}
      className="w-12 h-6 rounded-full flex items-center px-1 transition-all"
      style={{ background: on ? "var(--accent-teal)" : "var(--bg-elevated)", border: "none", cursor: "pointer" }}>
      <div className="w-4 h-4 rounded-full transition-all" style={{ background: "white", transform: on ? "translateX(24px)" : "translateX(0)" }} />
    </button>
  );
};

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { isWoman, isNightWorker, workerName, plan, zone } = useApp();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>Profile & Settings</h1>

      {/* Profile Card */}
      <div className="gs-card flex items-center gap-4" style={{ borderColor: "rgba(26,175,128,0.3)" }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold font-sora flex-shrink-0"
          style={{ background: "var(--accent-teal)", color: "white" }}>AS</div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-lg font-sora" style={{ color: "var(--text-primary)" }}>{workerName}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="gs-pill-safe text-xs">{plan} — ₹59/week</span>
            <span className="gs-pill-safe text-xs">Active</span>
          </div>
          <div className="text-xs mt-1 space-x-2" style={{ color: "var(--text-tertiary)" }}>
            <span>Member since Jan 2026</span>
            <span>•</span>
            <span>GS-MH-28473</span>
          </div>
          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>Zomato — Food Delivery — {zone}, Mumbai</div>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="gs-card">
        <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text-primary)" }}>Profile Details</h3>
        <div className="space-y-3">
          {[
            { label: "Phone", value: "+91 98765 XXXXX" },
            { label: "UPI ID", value: "arjun.sharma@ybl" },
            { label: "Emergency Contact", value: "Priya Sharma — +91 98765 43210" },
            { label: "Delivery Zone", value: zone },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
              <div>
                <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>{label}</div>
                <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{value}</div>
              </div>
              <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-tertiary)" }}>
                <Edit2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Plan */}
      <div className="gs-card">
        <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text-primary)" }}>Plan & Coverage</h3>
        <div className="p-3 rounded-xl mb-4" style={{ background: "var(--accent-teal-glow)", border: "1px solid rgba(26,175,128,0.3)" }}>
          <div className="font-bold font-sora" style={{ color: "var(--accent-teal)" }}>Standard Plan — ₹59/week</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Renews in 3 days • Auto-renewal ON</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {["₹800/day coverage", "Weather + AQI triggers", "Legal Aid chatbot", "FIR assistant"].map(f => (
              <span key={f} className="text-xs" style={{ color: "var(--text-secondary)" }}>✓ {f}</span>
            ))}
          </div>
        </div>
        <button onClick={() => navigate("/onboard")} className="gs-btn-ghost w-full text-sm" style={{ padding: "10px" }}>
          Upgrade to Premium — ₹99/week
        </button>
      </div>

      {/* Notifications */}
      <div className="gs-card">
        <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text-primary)" }}>Notifications</h3>
        <div className="space-y-3">
          {[
            ["Trigger alerts (rain, heat, AQI)", true],
            ["Payout notifications", true],
            ["Weekly earnings summary", true],
            ["Zone risk warnings", true],
            ["Legal aid updates", true],
            ...(isWoman ? [["Women safety alerts", true] as [string, boolean]] : []),
            ...(isNightWorker ? [["Night shift check-ins", true] as [string, boolean]] : []),
          ].map(([label, defaultOn]) => (
            <div key={label as string} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
              <span className="text-sm" style={{ color: "var(--text-primary)" }}>{label as string}</span>
              <Toggle defaultOn={defaultOn as boolean} />
            </div>
          ))}
        </div>
      </div>

      {/* App Preferences */}
      <div className="gs-card">
        <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text-primary)" }}>App Preferences</h3>
        <div className="space-y-3">
          {[["Notification sound", true], ["Biometric login", false]].map(([label, defaultOn]) => (
            <div key={label as string} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
              <span className="text-sm" style={{ color: "var(--text-primary)" }}>{label as string}</span>
              <Toggle defaultOn={defaultOn as boolean} />
            </div>
          ))}
          <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
            <span className="text-sm" style={{ color: "var(--text-primary)" }}>Language</span>
            <div className="flex gap-1 rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              {["English", "हिंदी"].map((l, i) => (
                <button key={l} className="px-3 py-1 text-xs"
                  style={{ background: i === 0 ? "var(--accent-teal)" : "transparent", color: i === 0 ? "white" : "var(--text-secondary)", border: "none", cursor: "pointer" }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="gs-card space-y-2">
        {["Download My Data", "Contact Support"].map(a => (
          <button key={a} className="gs-btn-ghost w-full text-sm justify-start" style={{ padding: "10px 16px" }}>{a}</button>
        ))}
        <button className="w-full text-sm p-3 text-center" style={{ color: "var(--text-secondary)", background: "transparent", border: "none", cursor: "pointer" }}>
          View Terms & Privacy
        </button>
        <button onClick={() => navigate("/")} className="w-full text-sm p-3 text-center flex items-center justify-center gap-2"
          style={{ color: "var(--accent-red)", background: "transparent", border: "none", cursor: "pointer" }}>
          <LogOut size={14} /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
