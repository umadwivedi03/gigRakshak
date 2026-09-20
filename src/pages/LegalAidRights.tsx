import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

const preloaded = [
  { from: "bot", text: "Namaste Arjun! I'm Shield AI, your GigShield legal guide. I can help you understand your rights as a delivery worker in India. What would you like to know?" },
  { from: "user", text: "Can police stop me without reason while I'm on a delivery?" },
  { from: "bot", text: "Yes, they can ask you to stop, but they cannot detain you without a reason. Under Section 41 CrPC, police need a specific complaint or warrant to arrest you. Always show your Aadhaar + platform ID and nothing else.", action: { label: "View Police Support Guide", path: "/legal-aid/police" } },
  { from: "user", text: "A customer gave me a 1-star rating and filed a false complaint. What should I do?" },
  { from: "bot", text: "Don't panic — this is more common than you think. 1) Screenshot ALL order details and delivery photos immediately. 2) Contact Zomato grievance cell within 24 hours: 022-6130-7777. 3) You can file a counter-complaint. GigShield can connect you with an advocate.", action: { label: "Connect with Advocate", path: "/legal-aid/advocate" } },
  { from: "user", text: "Is it legal for a customer to record me without permission?" },
  { from: "bot", text: "In public spaces in India, recording is generally permitted. However, if a customer uses such recording to threaten or harass you, that becomes illegal under IT Act Section 67 and IPC 503 (criminal intimidation). Document the incident immediately and contact GigShield's legal team." },
];

const mockResponses = [
  { text: "Great question. Under Indian labor law, gig workers have specific rights regarding working conditions and safety. You should document this situation and consider filing a formal complaint. Would you like to connect with an advocate?", action: { label: "Connect with Advocate", path: "/legal-aid/advocate" } },
  { text: "This falls under the relevant section of the IPC/CrPC. Your rights here are: 1) Right to know why you're being stopped, 2) Right to legal representation, 3) Right to remain silent. GigShield covers legal expenses up to ₹2,000 for this type of case." },
  { text: "Many delivery partners face this. The most important immediate step is to document everything — screenshots, photos, timestamps. Then contact GigShield's legal team for guidance.", action: { label: "Report to GigShield", path: "/legal-aid/fir" } },
];

const suggestions = ["Can police seize my delivery bag?", "What if my platform deactivates my account?", "My customer threatened me — what do I do?", "What is the Gig Workers Welfare Fund?"];

const LegalAidRights: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ from: string; text: string; action?: { label: string; path: string } }[]>([]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("EN");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const show = () => {
      if (i < preloaded.length) {
        const msg = preloaded[i];
        setMessages(prev => [...prev, msg]);
        i++;
        setTimeout(show, 300);
      }
    };
    setTimeout(show, 400);
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { from: "user", text }]);
    setInput("");
    const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    setTimeout(() => setMessages(m => [...m, { from: "bot", ...response }]), 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] md:h-[calc(100vh-40px)]">
      {/* Header */}
      <div className="p-4 flex items-center gap-3" style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
        <button onClick={() => navigate("/legal-aid")} style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}>
          <ArrowLeft size={16} />
        </button>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: "var(--accent-teal-glow)", border: "1px solid rgba(26,175,128,0.4)" }}>🛡️</div>
        <div>
          <div className="font-bold font-sora text-sm" style={{ color: "var(--text-primary)" }}>Shield AI</div>
          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>Your 24/7 legal guide</div>
        </div>
        <div className="ml-auto flex gap-1 rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          {["EN", "हिं"].map(l => (
            <button key={l} onClick={() => setLang(l)}
              className="px-3 py-1 text-xs font-medium"
              style={{ background: lang === l ? "var(--accent-teal)" : "transparent", color: lang === l ? "white" : "var(--text-secondary)", cursor: "pointer", border: "none" }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
            <div className="max-w-xs md:max-w-md">
              <div className="p-3 rounded-2xl text-sm"
                style={{
                  background: m.from === "user" ? "var(--accent-teal)" : "var(--bg-card)",
                  color: m.from === "user" ? "white" : "var(--text-primary)",
                  border: m.from === "bot" ? "1px solid var(--border)" : "none",
                }}>
                {m.text}
              </div>
              {m.action && (
                <button onClick={() => navigate(m.action!.path)}
                  className="mt-2 text-xs px-3 py-1.5 rounded-xl"
                  style={{ background: "var(--accent-teal-glow)", color: "var(--accent-teal)", border: "1px solid rgba(26,175,128,0.3)", cursor: "pointer" }}>
                  {m.action.label} →
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
        {/* Suggestions */}
        {messages.length >= preloaded.length && (
          <div className="flex flex-wrap gap-2 pt-2">
            {suggestions.map(s => (
              <button key={s} onClick={() => send(s)}
                className="text-xs px-3 py-2 rounded-xl"
                style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)", cursor: "pointer" }}>
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 flex gap-2" style={{ borderTop: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
        <input className="gs-input flex-1" placeholder="Ask anything about your legal rights..." value={input}
          onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send(input)} />
        <button onClick={() => send(input)} className="gs-btn-primary" style={{ padding: "12px 16px" }}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default LegalAidRights;
