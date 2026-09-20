import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import {
  LayoutDashboard, MapPin, Bike, AlertCircle, MoreHorizontal,
  Scale, Heart, Shield, FileText, User, Settings,
  X, Bell, Sun, Moon
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/zone-monitor", icon: MapPin, label: "Zone Monitor" },
  { to: "/delivery/active", icon: Bike, label: "Active Delivery" },
  { to: "/delivery/history", icon: FileText, label: "Delivery History" },
  { to: "/claims", icon: FileText, label: "Claims Center" },
  { to: "/sos", icon: AlertCircle, label: "SOS Emergency" },
  { to: "/legal-aid", icon: Scale, label: "Legal Aid" },
  { to: "/medical", icon: Heart, label: "Medical Help" },
  { to: "/women-safety", icon: Shield, label: "Women Safety" },
  { to: "/document-vault", icon: FileText, label: "Document Vault" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/admin", icon: Settings, label: "Admin Dashboard" },
];

const bottomTabs = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { to: "/zone-monitor", icon: MapPin, label: "Zone" },
  { to: "/delivery/active", icon: Bike, label: "Delivery" },
  { to: "/sos", icon: AlertCircle, label: "SOS" },
];

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { workerName, plan, zone, theme, toggleTheme } = useApp();
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);

  const isLandingOrOnboard = location.pathname === "/" || location.pathname === "/onboard";
  if (isLandingOrOnboard) return <>{children}</>;

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Demo Banner */}
      <div className="demo-banner sticky top-0 z-50">
        ⚡ GigShield Demo — DEVTrails 2026 Hackathon — All data is mock/simulated
      </div>

      <div className="flex h-[calc(100vh-32px)]">
        {/* Desktop Sidebar */}
        <aside
          className="hidden md:flex flex-col w-56 flex-shrink-0 sticky top-8 h-[calc(100vh-32px)] overflow-y-auto"
          style={{ background: "var(--bg-secondary)", borderRight: "1px solid var(--border)" }}
        >
          {/* Logo */}
          <div className="p-4 flex items-center gap-2" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-sora"
              style={{ background: "var(--accent-teal)", color: "white" }}>GS</div>
            <div>
              <div className="text-sm font-bold font-sora" style={{ color: "var(--text-primary)" }}>GigShield</div>
              <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>v2.0 Demo</div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                    isActive
                      ? "font-semibold"
                      : "hover:opacity-80"
                  }`
                }
                style={({ isActive }) => ({
                  background: isActive ? "var(--accent-teal-glow)" : "transparent",
                  color: isActive ? "var(--accent-teal)" : "var(--text-secondary)",
                  fontFamily: "DM Sans, sans-serif",
                })}
              >
                <Icon size={16} />
                <span className="truncate">{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Theme Toggle + User Info */}
          <div className="p-4" style={{ borderTop: "1px solid var(--border)" }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl mb-3 transition-all hover:opacity-80"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", cursor: "pointer" }}
            >
              <span className="text-xs font-medium" style={{ color: "var(--text-secondary)", fontFamily: "DM Sans" }}>
                {theme === "dark" ? "Dark Mode" : "Light Mode"}
              </span>
              {theme === "dark"
                ? <Sun size={14} style={{ color: "var(--accent-amber)" }} />
                : <Moon size={14} style={{ color: "var(--accent-blue)" }} />
              }
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "var(--accent-teal)", color: "white" }}>
                {workerName.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)", fontFamily: "Sora" }}>{workerName}</div>
                <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>{plan} Plan</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {/* Top Header for mobile */}
          <div className="md:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-40"
            style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-sora"
                style={{ background: "var(--accent-teal)", color: "white" }}>GS</div>
              <span className="font-bold text-sm font-sora" style={{ color: "var(--text-primary)" }}>GigShield</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="gs-pill-warning text-xs">{zone}</span>
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", cursor: "pointer" }}
              >
                {theme === "dark"
                  ? <Sun size={15} style={{ color: "var(--accent-amber)" }} />
                  : <Moon size={15} style={{ color: "var(--accent-blue)" }} />
                }
              </button>
              <div className="relative">
                <Bell size={18} style={{ color: "var(--text-secondary)" }} />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
                  style={{ background: "var(--accent-red)", color: "white", fontSize: "9px" }}>2</span>
              </div>
            </div>
          </div>

          {children}
        </main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex"
        style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
        {bottomTabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-1"
            style={({ isActive }) => ({
              color: isActive ? "var(--accent-teal)" : "var(--text-tertiary)",
              minHeight: "56px",
            })}
          >
            <Icon size={20} />
            <span style={{ fontSize: "10px", fontFamily: "DM Sans" }}>{label}</span>
          </NavLink>
        ))}
        <button
          className="flex-1 flex flex-col items-center justify-center py-2 gap-1"
          style={{ color: "var(--text-tertiary)", minHeight: "56px", background: "transparent", border: "none" }}
          onClick={() => setMoreOpen(true)}
        >
          <MoreHorizontal size={20} />
          <span style={{ fontSize: "10px", fontFamily: "DM Sans" }}>More</span>
        </button>
      </div>

      {/* More Modal */}
      {moreOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:hidden"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setMoreOpen(false)}>
          <div className="w-full rounded-t-2xl p-4 max-h-[70vh] overflow-y-auto"
            style={{ background: "var(--bg-card)" }}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold font-sora" style={{ color: "var(--text-primary)" }}>All Features</span>
              <button onClick={() => setMoreOpen(false)} style={{ color: "var(--text-secondary)", background: "transparent", border: "none" }}>
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-xl"
                  style={{ background: "var(--bg-elevated)", color: "var(--text-primary)", fontFamily: "DM Sans", fontSize: "14px" }}
                >
                  <Icon size={16} style={{ color: "var(--accent-teal)", flexShrink: 0 }} />
                  <span className="truncate">{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
