import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronRight, ChevronLeft, User, Briefcase, Shield, CheckCircle, Sun, Moon } from "lucide-react";
import { useApp } from "@/context/AppContext";

const steps = ["Your Profile", "Work Details", "Choose Plan", "Confirm & Activate"];

const platforms = ["Zomato", "Swiggy", "Zepto", "Blinkit", "Amazon", "Flipkart"];
const deliveryTypes = ["Food", "Grocery", "E-commerce"];
const workingHours = [
  { id: "morning", label: "Morning 6am–12pm" },
  { id: "afternoon", label: "Afternoon 12pm–6pm" },
  { id: "evening", label: "Evening 6–10pm" },
  { id: "night", label: "Night 10pm–5am" },
];

const plans = [
  {
    id: "Basic", price: "₹29", period: "/week", coverage: "₹500/day",
    features: ["Weather + AQI triggers", "₹500/day coverage", "Know Your Rights chatbot", "Document vault"],
    color: "var(--text-secondary)",
  },
  {
    id: "Standard", price: "₹59", period: "/week", coverage: "₹800/day", badge: "RECOMMENDED",
    features: ["Everything in Basic", "Heatwave + curfew triggers", "Legal Aid chatbot", "Police support guide", "FIR filing assistant", "₹800/day coverage", "Medical emergency guide"],
    color: "var(--accent-teal)",
  },
  {
    id: "Premium", price: "₹99", period: "/week", coverage: "₹1,200/day",
    features: ["Everything in Standard", "Lawyer connect (on-call)", "Women safety module", "Live delivery tracker", "Bail bond up to ₹5,000", "Recovery day payout", "₹1,200/day coverage"],
    color: "var(--accent-amber)",
  },
];

const Onboard: React.FC = () => {
  const navigate = useNavigate();
  const { setIsWoman, setIsNightWorker, setWorkerName, setPlatform, setPlan, setZone, theme, toggleTheme } = useApp();

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [gender, setGender] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [weeklyEarnings, setWeeklyEarnings] = useState(7000);
  const [deliveryZone, setDeliveryZone] = useState("");
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [selectedPlan, setSelectedPlan] = useState("Standard");
  const [emergencyName, setEmergencyName] = useState("Priya Sharma");
  const [emergencyPhone, setEmergencyPhone] = useState("+91 98765 43210");
  const [upiId, setUpiId] = useState("arjun.sharma");
  const [upiSuffix, setUpiSuffix] = useState("@ybl");
  const [activated, setActivated] = useState(false);

  const toggleHour = (id: string) => {
    setSelectedHours(prev =>
      prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]
    );
  };

  const handleActivate = () => {
    const isWomanBool = gender === "Female";
    setIsWoman(isWomanBool);
    setIsNightWorker(selectedHours.includes("night"));
    setWorkerName(name || "Arjun Sharma");
    setPlatform(selectedPlatform || "Zomato");
    setPlan(selectedPlan);
    setZone(deliveryZone || "Andheri West");
    setActivated(true);
    setTimeout(() => navigate("/dashboard"), 2200);
  };

  if (activated) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center animate-fade-in"
        style={{ background: "var(--bg-primary)" }}>
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ background: "var(--accent-teal-glow)", border: "2px solid var(--accent-teal)" }}>
          <CheckCircle size={48} style={{ color: "var(--accent-teal)" }} />
        </div>
        <h2 className="text-3xl font-bold mb-3 font-sora" style={{ color: "var(--accent-teal)" }}>Coverage Active</h2>
        <p style={{ color: "var(--text-secondary)" }}>Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4"
      style={{ background: "var(--bg-primary)", transition: "background 0.3s ease" }}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-strong)", color: "var(--text-secondary)", cursor: "pointer" }}
      >
        {theme === "dark" ? <><Sun size={14} style={{ color: "var(--accent-amber)" }} /> Light</> : <><Moon size={14} style={{ color: "var(--accent-blue)" }} /> Dark</>}
      </button>
      {/* Header */}
      <div className="w-full max-w-lg mb-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm font-sora"
            style={{ background: "var(--accent-teal)", color: "white" }}>GS</div>
          <span className="text-xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>GigShield</span>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all`}
                  style={{
                    background: i <= step ? "var(--accent-teal)" : "var(--bg-elevated)",
                    color: i <= step ? "white" : "var(--text-tertiary)",
                    fontFamily: "Sora",
                  }}>
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className="text-xs hidden sm:block" style={{ color: i === step ? "var(--accent-teal)" : "var(--text-tertiary)" }}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2" style={{ background: i < step ? "var(--accent-teal)" : "var(--border-strong)" }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg gs-card">
        <h2 className="text-xl font-bold mb-6 font-sora" style={{ color: "var(--text-primary)" }}>
          Step {step + 1}: {steps[step]}
        </h2>

        {/* Step 1 */}
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <label className="text-sm mb-2 block" style={{ color: "var(--text-secondary)" }}>Full Name</label>
              <input className="gs-input" placeholder="e.g. Arjun Sharma" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm mb-2 block" style={{ color: "var(--text-secondary)" }}>Phone Number</label>
              <div className="flex gap-2">
                <div className="gs-input w-16 flex items-center justify-center" style={{ flexShrink: 0 }}>+91</div>
                <input className="gs-input flex-1" placeholder="98765 43210" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm mb-2 block" style={{ color: "var(--text-secondary)" }}>City</label>
              <select className="gs-input" value={city} onChange={e => setCity(e.target.value)}>
                {["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Other"].map(c => (
                  <option key={c} value={c} style={{ background: "var(--bg-elevated)" }}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm mb-2 block" style={{ color: "var(--text-secondary)" }}>Gender</label>
              <div className="flex gap-2">
                {["Male", "Female", "Prefer not to say"].map(g => (
                  <button key={g} onClick={() => setGender(g)}
                    className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: gender === g ? "var(--accent-teal-glow)" : "var(--bg-elevated)",
                      color: gender === g ? "var(--accent-teal)" : "var(--text-secondary)",
                      border: gender === g ? "1px solid var(--accent-teal)" : "1px solid var(--border)",
                      minHeight: "48px",
                    }}>{g}</button>
                ))}
              </div>
              {gender === "Female" && (
                <p className="text-xs mt-2 p-2 rounded-lg" style={{ background: "var(--accent-pink-dim)", color: "var(--accent-pink)" }}>
                  ✓ Women Safety Module will be enabled for you
                </p>
              )}
            </div>
            <div>
              <label className="text-sm mb-2 block" style={{ color: "var(--text-secondary)" }}>Delivery Platform</label>
              <div className="grid grid-cols-3 gap-2">
                {platforms.map(p => (
                  <button key={p} onClick={() => setSelectedPlatform(p)}
                    className="py-2 px-3 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: selectedPlatform === p ? "var(--accent-teal-glow)" : "var(--bg-elevated)",
                      color: selectedPlatform === p ? "var(--accent-teal)" : "var(--text-secondary)",
                      border: selectedPlatform === p ? "1px solid var(--accent-teal)" : "1px solid var(--border)",
                      minHeight: "48px",
                    }}>{p}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm mb-2 block" style={{ color: "var(--text-secondary)" }}>Delivery Type</label>
              <div className="flex gap-2">
                {deliveryTypes.map(t => (
                  <button key={t} onClick={() => setDeliveryType(t)}
                    className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: deliveryType === t ? "var(--accent-teal-glow)" : "var(--bg-elevated)",
                      color: deliveryType === t ? "var(--accent-teal)" : "var(--text-secondary)",
                      border: deliveryType === t ? "1px solid var(--accent-teal)" : "1px solid var(--border)",
                      minHeight: "48px",
                    }}>{t}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="text-sm mb-2 block" style={{ color: "var(--text-secondary)" }}>
                Average Weekly Earnings: <span className="font-bold" style={{ color: "var(--accent-teal)" }}>₹{weeklyEarnings.toLocaleString()}</span>
              </label>
              <input type="range" min={2000} max={15000} step={500} value={weeklyEarnings}
                onChange={e => setWeeklyEarnings(Number(e.target.value))}
                className="w-full" style={{ accentColor: "var(--accent-teal)" }} />
              <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
                <span>₹2,000</span><span>₹15,000</span>
              </div>
            </div>
            <div>
              <label className="text-sm mb-2 block" style={{ color: "var(--text-secondary)" }}>Primary Delivery Zone</label>
              <input className="gs-input" placeholder="e.g. Andheri West, Mumbai" value={deliveryZone}
                onChange={e => setDeliveryZone(e.target.value)} />
            </div>
            <div>
              <label className="text-sm mb-3 block" style={{ color: "var(--text-secondary)" }}>Working Hours</label>
              <div className="grid grid-cols-2 gap-2">
                {workingHours.map(({ id, label }) => (
                  <button key={id} onClick={() => toggleHour(id)}
                    className="py-3 px-4 rounded-xl text-sm font-medium text-left transition-all"
                    style={{
                      background: selectedHours.includes(id) ? "var(--accent-teal-glow)" : "var(--bg-elevated)",
                      color: selectedHours.includes(id) ? "var(--accent-teal)" : "var(--text-secondary)",
                      border: selectedHours.includes(id) ? "1px solid var(--accent-teal)" : "1px solid var(--border)",
                      minHeight: "48px",
                    }}>
                    <div className="flex items-center gap-2">
                      {selectedHours.includes(id) && <Check size={14} />}
                      {label}
                    </div>
                  </button>
                ))}
              </div>
              {selectedHours.includes("night") && (
                <div className="mt-3 p-3 rounded-xl text-sm" style={{ background: "var(--accent-amber-dim)", color: "var(--accent-amber)" }}>
                  ⭐ 1.5x payout multiplier active for night hours
                </div>
              )}
            </div>
            <div>
              <label className="text-sm mb-2 block" style={{ color: "var(--text-secondary)" }}>
                Days per week: <span className="font-bold" style={{ color: "var(--accent-teal)" }}>{daysPerWeek}</span>
              </label>
              <input type="range" min={3} max={7} step={1} value={daysPerWeek}
                onChange={e => setDaysPerWeek(Number(e.target.value))}
                className="w-full" style={{ accentColor: "var(--accent-teal)" }} />
              <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
                <span>3 days</span><span>7 days</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 2 && (
          <div className="space-y-4">
            {plans.map(plan => (
              <div key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className="p-4 rounded-2xl cursor-pointer transition-all relative"
                style={{
                  background: selectedPlan === plan.id ? "var(--accent-teal-glow)" : "var(--bg-elevated)",
                  border: selectedPlan === plan.id ? "2px solid var(--accent-teal)" : "1px solid var(--border)",
                }}>
                {plan.badge && (
                  <div className="absolute -top-2 left-4 px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: "var(--accent-teal)", color: "white", fontFamily: "Sora" }}>{plan.badge}</div>
                )}
                {gender === "Female" && plan.id === "Premium" && (
                  <div className="absolute -top-2 right-4 px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: "var(--accent-pink)", color: "white" }}>Best for Women</div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold font-sora" style={{ color: plan.color }}>{plan.id}</div>
                    <div className="text-2xl font-bold font-sora mt-1" style={{ color: "var(--text-primary)" }}>
                      {plan.price}<span className="text-base font-normal" style={{ color: "var(--text-secondary)" }}>{plan.period}</span>
                    </div>
                    <div className="text-xs mt-1" style={{ color: plan.color }}>Coverage: {plan.coverage}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center`}
                    style={{ background: selectedPlan === plan.id ? "var(--accent-teal)" : "var(--bg-card)", border: "2px solid var(--border-strong)" }}>
                    {selectedPlan === plan.id && <Check size={12} color="white" />}
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                  {plan.features.slice(0, 3).map(f => (
                    <span key={f} className="text-xs" style={{ color: "var(--text-secondary)" }}>✓ {f}</span>
                  ))}
                  {plan.features.length > 3 && (
                    <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>+{plan.features.length - 3} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 4 */}
        {step === 3 && (
          <div className="space-y-5">
            {/* Summary */}
            <div className="p-4 rounded-xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-strong)" }}>
              <h3 className="font-bold mb-3 font-sora text-sm" style={{ color: "var(--accent-teal)" }}>Coverage Summary</h3>
              {[
                ["Name", name || "Arjun Sharma"],
                ["Platform", selectedPlatform || "Zomato"],
                ["Zone", deliveryZone || "Andheri West"],
                ["Plan", `${selectedPlan} — ${plans.find(p => p.id === selectedPlan)?.price}/week`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1">
                  <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>{k}</span>
                  <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{v}</span>
                </div>
              ))}
            </div>
            <div>
              <label className="text-sm mb-2 block" style={{ color: "var(--text-secondary)" }}>Emergency Contact Name</label>
              <input className="gs-input" value={emergencyName} onChange={e => setEmergencyName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm mb-2 block" style={{ color: "var(--text-secondary)" }}>Emergency Contact Phone</label>
              <input className="gs-input" value={emergencyPhone} onChange={e => setEmergencyPhone(e.target.value)} />
            </div>
            <div>
              <label className="text-sm mb-2 block" style={{ color: "var(--text-secondary)" }}>UPI ID for Payouts</label>
              <div className="flex gap-2">
                <input className="gs-input flex-1" value={upiId} onChange={e => setUpiId(e.target.value)} />
                <select className="gs-input w-28" value={upiSuffix} onChange={e => setUpiSuffix(e.target.value)}
                  style={{ flexShrink: 0 }}>
                  {["@ybl", "@oksbi", "@paytm", "@upi", "@okaxis"].map(s => (
                    <option key={s} value={s} style={{ background: "var(--bg-elevated)" }}>{s}</option>
                  ))}
                </select>
              </div>
              <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>Full UPI: {upiId}{upiSuffix}</p>
            </div>
            <button onClick={handleActivate} className="w-full gs-btn-primary text-lg py-4">
              ⚡ Activate My Coverage
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="gs-btn-ghost flex items-center gap-2 flex-1">
              <ChevronLeft size={16} /> Back
            </button>
          )}
          {step < 3 && (
            <button onClick={() => setStep(s => s + 1)} className="gs-btn-primary flex items-center gap-2 flex-1 justify-center">
              Continue <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboard;
