import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MessageCircle } from "lucide-react";

const advocates = [
  { initials: "MJ", name: "Adv. Meera Joshi", spec: "Labor & Criminal Law", langs: "Hindi, English, Marathi", rating: 4.9, time: "~8 min", available: true },
  { initials: "RT", name: "Adv. Rajan Tiwari", spec: "Police Harassment Cases", langs: "Hindi, English", rating: 4.7, time: "~8 min", available: true },
  { initials: "SR", name: "Adv. Sunita Rao", spec: "Women's Rights & Labor Law", langs: "Hindi, English, Kannada", rating: 4.8, time: "Next in 20 min", available: false },
];

const pastSessions = [
  { date: "Mar 10", adv: "Adv. Rajan Tiwari", duration: "12 min", topic: "Police stop incident", status: "Resolved" },
  { date: "Feb 22", adv: "Adv. Meera Joshi", duration: "8 min", topic: "False complaint", status: "Resolved" },
];

const LegalAidAdvocate: React.FC = () => {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello Arjun, this is Adv. Meera Joshi. How can I help you today?" }
  ]);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!connected) return;
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [connected]);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => { setConnecting(false); setConnected(true); }, 2000);
  };

  const sendMsg = () => {
    if (!chatMsg.trim()) return;
    setMessages(m => [...m, { from: "user", text: chatMsg }]);
    setChatMsg("");
    setTimeout(() => {
      setMessages(m => [...m, { from: "bot", text: "Thank you for sharing that. Let me look into your case. As a delivery worker in India, you have specific rights under the Motor Vehicles Act and the platform's policies. Can you share more details?" }]);
    }, 1200);
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
      <button onClick={() => navigate("/legal-aid")} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)", background: "transparent", border: "none", cursor: "pointer" }}>
        <ArrowLeft size={16} /> Legal Aid
      </button>
      <h1 className="text-2xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>Advocate Support</h1>

      {connected ? (
        <div className="gs-card" style={{ borderColor: "rgba(26,175,128,0.4)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold" style={{ background: "var(--accent-teal-glow)", color: "var(--accent-teal)" }}>MJ</div>
              <div>
                <div className="font-bold font-sora text-sm" style={{ color: "var(--text-primary)" }}>Adv. Meera Joshi</div>
                <div className="text-xs" style={{ color: "var(--accent-teal)" }}>● Connected — {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}</div>
              </div>
            </div>
            <button onClick={() => setConnected(false)} className="gs-btn-danger text-xs" style={{ padding: "8px 16px" }}>End Session</button>
          </div>
          <div className="rounded-xl p-4 space-y-3 mb-4 max-h-64 overflow-y-auto" style={{ background: "var(--bg-elevated)" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-xs p-3 rounded-xl text-sm"
                  style={{ background: m.from === "user" ? "var(--accent-teal)" : "var(--bg-card)", color: m.from === "user" ? "white" : "var(--text-primary)" }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input className="gs-input flex-1" placeholder="Type your message..." value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} />
            <button onClick={sendMsg} className="gs-btn-primary" style={{ padding: "12px 16px" }}>Send</button>
          </div>
        </div>
      ) : connecting ? (
        <div className="gs-card text-center py-12">
          <div className="flex gap-2 justify-center mb-4">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-3 h-3 rounded-full pulse-dot" style={{ background: "var(--accent-teal)", animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>
          <p style={{ color: "var(--text-secondary)" }}>Connecting to Adv. Meera Joshi...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {advocates.map(a => (
            <div key={a.name} className="gs-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold font-sora flex-shrink-0"
                  style={{ background: "var(--bg-elevated)", color: "var(--accent-teal)", border: "2px solid var(--accent-teal)" }}>{a.initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold font-sora" style={{ color: "var(--text-primary)" }}>{a.name}</span>
                    <span className="w-2 h-2 rounded-full" style={{ background: a.available ? "var(--success)" : "var(--accent-amber)" }} />
                    <span className="text-xs" style={{ color: a.available ? "var(--success)" : "var(--accent-amber)" }}>{a.available ? "Available" : "In Session"}</span>
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{a.spec}</p>
                  <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Languages: {a.langs}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} fill={i < Math.floor(a.rating) ? "var(--accent-amber)" : "transparent"} style={{ color: "var(--accent-amber)" }} />)}
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{a.rating}</span>
                    </div>
                    <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>Response: {a.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={handleConnect} className="gs-btn-primary flex-1 text-sm" style={{ padding: "10px" }} disabled={!a.available}>
                  {a.available ? "Connect Now" : "Not Available"}
                </button>
                <button className="gs-btn-ghost flex-1 text-sm" style={{ padding: "10px" }}>Schedule Call</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="gs-card">
        <h3 className="font-bold font-sora mb-3" style={{ color: "var(--text-primary)" }}>Previous Consultations</h3>
        <div className="space-y-2">
          {pastSessions.map(s => (
            <div key={s.date} className="flex items-center justify-between p-3 rounded-xl text-sm" style={{ background: "var(--bg-elevated)" }}>
              <div>
                <span style={{ color: "var(--text-primary)" }}>{s.adv}</span>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>{s.date} • {s.duration} • {s.topic}</div>
              </div>
              <span className="gs-pill-safe text-xs">{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalAidAdvocate;
