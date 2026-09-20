import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Shield, Zap, Scale, Heart, MapPin, Lock, Star, Sun, Moon } from "lucide-react";
import { useApp } from "@/context/AppContext";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useApp();

  return (
    <div style={{ background: "var(--bg-primary)", color: "var(--text-primary)", fontFamily: "DM Sans, sans-serif", transition: "background 0.3s ease, color 0.3s ease" }}>
      {/* Theme Toggle - fixed top right */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-strong)", color: "var(--text-secondary)", cursor: "pointer" }}
      >
        {theme === "dark" ? <><Sun size={14} style={{ color: "var(--accent-amber)" }} /> Light</> : <><Moon size={14} style={{ color: "var(--accent-blue)" }} /> Dark</>}
      </button>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden gs-grid-bg">
        <div className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(26,175,128,0.15), transparent)" }} />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
            style={{ background: "var(--accent-teal-glow)", color: "var(--accent-teal)", border: "1px solid rgba(26,175,128,0.3)" }}>
            <Star size={14} /> DEVTrails 2026 — Hackathon Project
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>
            Your income.{" "}
            <span style={{ color: "var(--accent-teal)" }}>Your safety.</span>
            <br />Automatically protected.
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            India's first AI-powered parametric insurance platform for delivery workers.
            No forms. No waiting. Protection that activates before you even ask.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => navigate("/onboard")}
              className="flex items-center justify-center gap-2 text-base font-semibold gs-btn-primary"
              style={{ padding: "16px 32px", fontSize: "16px" }}>
              Get Protected <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center gap-2 text-base gs-btn-ghost"
              style={{ padding: "16px 32px" }}>
              <Play size={16} /> View Demo Dashboard
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {[
              { v: "12M+", l: "Gig Workers in India" },
              { v: "₹0", l: "Claim Forms" },
              { v: "60s", l: "Payouts" },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-bold font-sora" style={{ color: "var(--accent-teal)" }}>{v}</div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "Sora" }}>How GigShield Works</h2>
          <p style={{ color: "var(--text-secondary)" }}>Three steps. Zero effort. Full protection.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "01", t: "You Work", d: "GigShield monitors weather, AQI, curfews, and your delivery zone 24/7 in the background." },
            { n: "02", t: "Disruption Detected", d: "AI triggers a claim automatically before you even notice. No forms, no calls, no waiting." },
            { n: "03", t: "UPI Payout", d: "₹800 lands in your UPI account in under 60 seconds. Keep working or rest — you're covered." },
          ].map(({ n, t, d }) => (
            <div key={n} className="gs-card text-center">
              <div className="text-4xl font-bold mb-4 font-sora" style={{ color: "var(--accent-teal)", opacity: 0.5 }}>{n}</div>
              <h3 className="text-xl font-bold mb-3 font-sora">{t}</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage Cards */}
      <section className="px-6 py-16" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 font-sora">What We Protect</h2>
            <p style={{ color: "var(--text-secondary)" }}>Every risk a delivery worker faces, covered intelligently.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: "Parametric Weather Cover", desc: "Rain, heat, flood triggers", color: "var(--accent-teal)" },
              { icon: Scale, title: "Legal Aid & Advocacy", desc: "Lawyer on-call, FIR assist", color: "var(--accent-blue)" },
              { icon: Heart, title: "Medical Emergency", desc: "First aid, hospital guidance", color: "var(--accent-red)" },
              { icon: Shield, title: "Women Safety Shield", desc: "24/7 safety support", color: "var(--accent-pink)" },
              { icon: MapPin, title: "Live Delivery Tracker", desc: "Route protection & bonuses", color: "var(--accent-teal)" },
              { icon: Lock, title: "Fraud-Proof AI Engine", desc: "99.6% claim accuracy", color: "var(--accent-amber)" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="gs-card hover:border-opacity-50 transition-all cursor-pointer"
                style={{ borderColor: `${color}30` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${color}20` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="font-bold mb-1 font-sora text-sm">{title}</h3>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 font-sora">Simple, Honest Pricing</h2>
          <p style={{ color: "var(--text-secondary)" }}>Weekly plans. Cancel anytime. No hidden charges.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Basic", price: "₹29", period: "/week", badge: null,
              coverage: "₹500/day", color: "var(--text-secondary)",
              features: ["Weather + AQI triggers", "₹500/day coverage", "Know Your Rights chatbot", "Document vault"],
            },
            {
              name: "Standard", price: "₹59", period: "/week", badge: "RECOMMENDED",
              coverage: "₹800/day", color: "var(--accent-teal)",
              features: ["Everything in Basic", "Heatwave + curfew triggers", "Legal Aid chatbot", "Police support guide", "FIR filing assistant", "₹800/day coverage", "Medical emergency guide"],
            },
            {
              name: "Premium", price: "₹99", period: "/week", badge: null,
              coverage: "₹1,200/day", color: "var(--accent-amber)",
              features: ["Everything in Standard", "Lawyer connect (on-call)", "Women safety module", "Live delivery tracker", "Bail bond up to ₹5,000", "Recovery day payout", "₹1,200/day coverage"],
            },
          ].map(({ name, price, period, badge, coverage, color, features }) => (
            <div key={name} className="gs-card relative flex flex-col"
              style={{ border: badge ? `2px solid var(--accent-teal)` : "1px solid var(--border)" }}>
              {badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: "var(--accent-teal)", color: "white", fontFamily: "Sora" }}>{badge}</div>
              )}
              <div className="mb-4">
                <h3 className="text-lg font-bold font-sora mb-1" style={{ color }}>{name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-sora" style={{ color: "var(--text-primary)" }}>{price}</span>
                  <span style={{ color: "var(--text-secondary)" }}>{period}</span>
                </div>
                <div className="text-sm mt-1 font-semibold" style={{ color }}>Coverage: {coverage}</div>
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span style={{ color: "var(--accent-teal)", flexShrink: 0 }}>✓</span>
                    <span style={{ color: "var(--text-secondary)" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/onboard")}
                className="w-full gs-btn-primary"
                style={{ background: badge ? "var(--accent-teal)" : "var(--bg-elevated)", color: "white" }}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xl font-bold font-sora mb-1" style={{ color: "var(--accent-teal)" }}>GigShield</div>
              <div className="text-sm" style={{ color: "var(--text-tertiary)" }}>Made with care for India's gig workers.</div>
            </div>
            <div className="flex flex-wrap gap-6 text-sm" style={{ color: "var(--text-secondary)" }}>
              {["About", "How It Works", "Pricing", "For Platforms", "Privacy", "Terms"].map(l => (
                <a key={l} href="#" className="hover:opacity-80">{l}</a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 text-center text-xs" style={{ color: "var(--text-tertiary)", borderTop: "1px solid var(--border)" }}>
            © 2026 GigShield. DEVTrails Hackathon Demo. Not a real financial product.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
