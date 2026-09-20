import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Scale, Heart, X } from "lucide-react";

const SOSButton: React.FC<{ onActivate: () => void }> = ({ onActivate }) => {
  const [pressing, setPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startPress = () => {
    setPressing(true);
    setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(intervalRef.current!);
          onActivate();
          return 100;
        }
        return p + 5;
      });
    }, 100);
  };

  const stopPress = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPressing(false);
    setProgress(0);
  };

  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative cursor-pointer select-none"
        onMouseDown={startPress} onMouseUp={stopPress} onMouseLeave={stopPress}
        onTouchStart={startPress} onTouchEnd={stopPress}>
        <svg width="176" height="176" className="sos-pulse" style={{ borderRadius: "50%" }}>
          <circle cx="88" cy="88" r={radius} fill="var(--accent-red-dim)" stroke="var(--accent-red)" strokeWidth="2" />
          {pressing && (
            <circle cx="88" cy="88" r={radius} fill="none" stroke="white" strokeWidth="4"
              strokeDasharray={circumference} strokeDashoffset={dashOffset}
              transform="rotate(-90 88 88)" style={{ transition: "stroke-dashoffset 0.1s linear" }} />
          )}
          <text x="88" y="82" textAnchor="middle" fill="white" fontSize="32" fontWeight="900" fontFamily="Sora">SOS</text>
          <text x="88" y="104" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="DM Sans">
            {pressing ? `${Math.round(progress)}%` : "HOLD 2 SEC"}
          </text>
        </svg>
      </div>
    </div>
  );
};

const SOS: React.FC = () => {
  const navigate = useNavigate();
  const [activated, setActivated] = useState(false);
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false, false]);
  const [showAdvisor, setShowAdvisor] = useState(false);
  const [countdown, setCountdown] = useState(480);
  const [cancelConfirm, setCancelConfirm] = useState(false);

  useEffect(() => {
    if (!activated) return;
    const delays = [0, 1000, 2000, 3000, 4000];
    delays.forEach((delay, i) => {
      setTimeout(() => {
        setChecks(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        if (i === 4) setShowAdvisor(true);
      }, delay);
    });
  }, [activated]);

  useEffect(() => {
    if (!showAdvisor) return;
    const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [showAdvisor]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const checkItems = [
    { icon: "📍", text: "Location recorded — 19.1136° N, 72.8697° E" },
    { icon: "📱", text: "Emergency contact alerted — Priya Sharma notified" },
    { icon: "🎙️", text: "Audio recording started — 60s clip saved" },
    { icon: "📋", text: "Incident report created — #INC-20260319-001" },
    { icon: "⚖️", text: "Legal team notified" },
  ];

  if (!activated) {
    return (
      <div className="p-4 md:p-6 max-w-lg mx-auto space-y-6 animate-fade-in">
        {/* Reassurance */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-sora mb-2" style={{ color: "var(--text-primary)" }}>Emergency Help</h1>
          <p style={{ color: "var(--text-secondary)" }}>GigShield has your back. In any emergency, we're one tap away.</p>
        </div>

        {/* SOS Button */}
        <div className="flex justify-center my-8">
          <SOSButton onActivate={() => setActivated(true)} />
        </div>

        {/* What happens info */}
        <div className="gs-card">
          <div className="text-sm font-bold font-sora mb-3" style={{ color: "var(--text-secondary)" }}>WHAT HAPPENS WHEN YOU PRESS SOS</div>
          <div className="space-y-3">
            {checkItems.map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-3 text-sm">
                <span>{icon}</span>
                <span style={{ color: "var(--text-secondary)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Report Incident", icon: "📋", color: "var(--accent-amber)", action: () => {} },
            { label: "Connect Lawyer", icon: "⚖️", color: "var(--accent-teal)", action: () => navigate("/legal-aid/advocate") },
            { label: "Medical Emergency", icon: "🏥", color: "var(--accent-blue)", action: () => navigate("/medical") },
            { label: "Share Location", icon: "📍", color: "var(--accent-pink)", action: () => {} },
          ].map(({ label, icon, color, action }) => (
            <button key={label} onClick={action}
              className="gs-card flex flex-col items-center gap-2 cursor-pointer transition-all hover:scale-105"
              style={{ minHeight: "80px", borderColor: `${color}30` }}>
              <span className="text-2xl">{icon}</span>
              <span className="text-xs font-semibold" style={{ color, fontFamily: "Sora" }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto space-y-6 animate-fade-in">
      {/* SOS SENT header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold font-sora mb-2" style={{ color: "var(--accent-red)" }}>SOS SENT</h1>
        <p style={{ color: "var(--text-secondary)" }}>Help is on the way. Stay calm.</p>
      </div>

      {/* Auto Actions */}
      <div className="gs-card space-y-3" style={{ borderColor: "rgba(229,72,77,0.3)" }}>
        <div className="text-sm font-bold font-sora mb-4" style={{ color: "var(--accent-red)" }}>AUTO-ACTIONS ACTIVATED</div>
        {checkItems.map(({ icon, text }, i) => (
          <div key={i} className={`flex items-start gap-3 text-sm transition-all ${checks[i] ? "opacity-100 animate-slide-up" : "opacity-0"}`}>
            <span className="text-lg flex-shrink-0">{checks[i] ? "✅" : icon}</span>
            <span style={{ color: checks[i] ? "var(--text-primary)" : "var(--text-tertiary)" }}>{text}</span>
          </div>
        ))}
      </div>

      {/* Advisor Card */}
      {showAdvisor && (
        <div className="gs-card animate-slide-up" style={{ borderColor: "rgba(26,175,128,0.4)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold font-sora"
              style={{ background: "var(--accent-teal-glow)", color: "var(--accent-teal)", border: "2px solid var(--accent-teal)" }}>MJ</div>
            <div>
              <div className="font-bold font-sora" style={{ color: "var(--text-primary)" }}>Adv. Meera Joshi</div>
              <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Legal advisor connecting...</div>
            </div>
            <div className="ml-auto text-2xl font-bold font-sora" style={{ color: "var(--accent-teal)" }}>
              {formatTime(countdown)}
            </div>
          </div>
          <div className="text-xs p-2 rounded-lg" style={{ background: "var(--accent-teal-glow)", color: "var(--accent-teal)" }}>
            ✓ Available 24/7 for GigShield Premium members
          </div>
        </div>
      )}

      {/* Location Sharing */}
      {showAdvisor && (
        <div className="gs-card animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-bold font-sora" style={{ color: "var(--text-primary)" }}>
              <MapPin size={14} style={{ display: "inline", marginRight: 6, color: "var(--accent-teal)" }} />
              Live Location Sharing
            </div>
            <span className="gs-pill-safe">Active — 30 min</span>
          </div>
          <div className="rounded-xl overflow-hidden h-32" style={{ background: "#0E1A2B" }}>
            <svg width="100%" height="100%" viewBox="0 0 300 130">
              <rect x="0" y="0" width="300" height="130" fill="#0E1A2B" />
              <line x1="0" y1="65" x2="300" y2="65" stroke="#2A3A55" strokeWidth="4" />
              <line x1="150" y1="0" x2="150" y2="130" stroke="#2A3A55" strokeWidth="4" />
              <circle cx="150" cy="65" r="20" fill="rgba(26,175,128,0.1)" />
              <circle cx="150" cy="65" r="10" fill="rgba(26,175,128,0.2)" />
              <circle cx="150" cy="65" r="5" fill="var(--accent-teal)" className="pulse-dot" />
            </svg>
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>
            Location shared with emergency contact & legal team
          </p>
          <button className="gs-btn-ghost w-full mt-3 text-sm" style={{ padding: "10px" }}>Stop Sharing</button>
        </div>
      )}

      {/* Cancel / Safe */}
      {!cancelConfirm ? (
        <button onClick={() => setCancelConfirm(true)} className="gs-btn-ghost w-full py-4 font-semibold">
          I'm Safe — Cancel SOS
        </button>
      ) : (
        <div className="gs-card" style={{ borderColor: "rgba(26,175,128,0.4)" }}>
          <p className="text-sm mb-4 text-center" style={{ color: "var(--text-primary)" }}>Are you sure you're safe and want to cancel the SOS?</p>
          <div className="flex gap-3">
            <button onClick={() => { setActivated(false); setChecks([false, false, false, false, false]); setShowAdvisor(false); setCancelConfirm(false); }}
              className="gs-btn-primary flex-1">Yes, I'm Safe</button>
            <button onClick={() => setCancelConfirm(false)} className="gs-btn-ghost flex-1">No, Keep Active</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SOS;
