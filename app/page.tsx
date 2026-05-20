"use client";

import { useState } from "react";
import { clients as initialClients } from "./lib/data";
import { Client } from "./lib/types";
import Link from "next/link";

function riskLevel(index: number): "high" | "medium" | "low" {
  if (index >= 75) return "high";
  if (index >= 50) return "medium";
  return "low";
}

function riskPill(level: ReturnType<typeof riskLevel>) {
  const map = {
    high:   { bg: "rgba(248,113,113,0.1)",  text: "#F87171", border: "rgba(248,113,113,0.25)", label: "High Risk",   glow: "rgba(248,113,113,0.2)" },
    medium: { bg: "rgba(251,146,60,0.1)",   text: "#FB923C", border: "rgba(251,146,60,0.25)",  label: "Medium Risk", glow: "rgba(251,146,60,0.15)" },
    low:    { bg: "rgba(148,163,184,0.08)", text: "#94A3B8", border: "rgba(148,163,184,0.2)", label: "Low Risk",    glow: "transparent" },
  }[level];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700,
      letterSpacing: "0.1em", textTransform: "uppercase" as const,
      backgroundColor: map.bg, color: map.text, border: `1px solid ${map.border}`,
      boxShadow: map.glow !== "transparent" ? `0 0 10px ${map.glow}` : "none",
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: "50%", backgroundColor: map.text,
        boxShadow: `0 0 6px ${map.text}`,
      }}/>
      {map.label}
    </span>
  );
}

function statIcon(label: string, accent: string) {
  const icons: Record<string, React.ReactNode> = {
    "Portfolio Size": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    "Active Alerts": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    "High Risk Clients": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    "Model Accuracy": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  };
  return icons[label] ?? null;
}

export default function Dashboard() {
  const [clients] = useState<Client[]>(initialClients);
  const sorted = [...clients].sort((a, b) => b.stressIndex - a.stressIndex);
  const pendingCount = sorted.filter((c) => c.status === "pending").length;
  const highRiskCount = sorted.filter((c) => c.stressIndex >= 75).length;

  const statCards = [
    { label: "Portfolio Size",    value: "247",  sub: "Active clients monitored",     accent: "#38BDF8" },
    { label: "Active Alerts",     value: String(pendingCount),  sub: "Requiring manager review",  accent: pendingCount > 0 ? "#F87171" : "#34D399" },
    { label: "High Risk Clients", value: String(highRiskCount), sub: "Stress index ≥ 75",        accent: "#F87171" },
    { label: "Model Accuracy",   value: "86%", sub: "Avg detection precision",      accent: "#6366F1" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0B1326", fontFamily: "var(--font-inter)" }}>

      {/* ── Navigation ── */}
      <header style={{ background: "rgba(11,19,38,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid #1C253B", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: "linear-gradient(135deg, #6366F1, #818CF8)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 22px rgba(99,102,241,0.45)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div>
              <span style={{ color: "#E2E8F0", fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>ClientAlert</span>
              <span style={{ color: "#6366F1", fontSize: 9, fontWeight: 700, marginLeft: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Powered by AI</span>
            </div>
          </div>
          <nav style={{ display: "flex", alignItems: "center" }}>
            {[{ label: "Dashboard", active: true }, { label: "Clients", active: false }, { label: "Reports", active: false }, { label: "Settings", active: false }].map((item) => (
              <span key={item.label} style={{ padding: "0 20px", height: 64, display: "flex", alignItems: "center", fontSize: 13, fontWeight: item.active ? 600 : 400, color: item.active ? "#E2E8F0" : "#475569", borderBottom: item.active ? "2px solid #6366F1" : "2px solid transparent", cursor: "pointer", transition: "color 0.15s" }}>{item.label}</span>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 8, backgroundColor: pendingCount > 0 ? "rgba(248,113,113,0.1)" : "rgba(52,211,153,0.1)", border: `1px solid ${pendingCount > 0 ? "rgba(248,113,113,0.3)" : "rgba(52,211,153,0.3)"}` }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: pendingCount > 0 ? "#F87171" : "#34D399", boxShadow: `0 0 8px ${pendingCount > 0 ? "#F87171" : "#34D399"}` }}/>
              <span style={{ fontSize: 11, fontWeight: 700, color: pendingCount > 0 ? "#F87171" : "#34D399", letterSpacing: "0.08em" }}>{pendingCount} ALERTS</span>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #1C253B, #334155)", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.08em" }}>JM</div>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 30, fontWeight: 700, color: "#E2E8F0", letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>Financial Stress Alerts</h1>
              <p style={{ fontSize: 14, color: "#475569", marginTop: 10, lineHeight: 1.6 }}>Nightly AI analysis across your entire client portfolio — ranked by Financial Stress Index</p>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 8, backgroundColor: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#34D399", boxShadow: "0 0 8px #34D399" }}/>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#34D399", letterSpacing: "0.06em" }}>LIVE · Updated 06:00 UTC</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {statCards.map((card) => (
            <div key={card.label} style={{ backgroundColor: "#1C253B", border: "1px solid #334155", borderRadius: 12, padding: "24px", position: "relative", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.7)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5)"; }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${card.accent}, transparent)`, opacity: 0.7 }}/>
              <div style={{ marginBottom: 14 }}>{statIcon(card.label, card.accent)}</div>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#475569", letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 8px" }}>{card.label}</p>
              <p style={{ fontSize: 34, fontWeight: 700, color: card.accent, fontFamily: "var(--font-mono)", margin: 0, lineHeight: 1, letterSpacing: "-0.04em" }}>{card.value}</p>
              <p style={{ fontSize: 11, color: "#475569", margin: "8px 0 0" }}>{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Alert Table */}
        <div style={{ backgroundColor: "#1C253B", border: "1px solid #334155", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.3fr 1.1fr 2fr 120px", padding: "14px 28px", background: "linear-gradient(180deg, #111827, #0f1523)", borderBottom: "1px solid #334155", gap: 20 }}>
            {["Client", "Stress Score", "Risk Level", "Confidence", "Alert Trigger", "Action"].map((h) => (
              <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "#475569", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>{h}</span>
            ))}
          </div>
          {sorted.map((client, i) => {
            const rl = riskLevel(client.stressIndex);
            const barColor = client.stressIndex >= 75 ? "#F87171" : client.stressIndex >= 50 ? "#FB923C" : "#94A3B8";
            const glowColor = client.stressIndex >= 75 ? "rgba(248,113,113,0.4)" : client.stressIndex >= 50 ? "rgba(251,146,60,0.3)" : "rgba(148,163,184,0.15)";
            return (
              <div key={client.id} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.3fr 1.1fr 2fr 120px", padding: "22px 28px", alignItems: "center", gap: 20, borderBottom: i < sorted.length - 1 ? "1px solid rgba(51,65,85,0.4)" : "none", transition: "background-color 0.15s ease" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(99,102,241,0.04)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent")}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 9, background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.05))", border: "1px solid rgba(99,102,241,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#818CF8", flexShrink: 0, letterSpacing: "0.06em" }}>
                    {client.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#E2E8F0", margin: 0 }}>{client.name}</p>
                    <p style={{ fontSize: 11, color: "#475569", margin: "3px 0 0", fontFamily: "var(--font-mono)" }}>****{client.accountNumber}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ flex: 1, height: 5, backgroundColor: "rgba(51,65,85,0.5)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${client.stressIndex}%`, height: "100%", backgroundColor: barColor, borderRadius: 3, boxShadow: `0 0 8px ${glowColor}` }}/>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 800, color: barColor, fontFamily: "var(--font-mono)", minWidth: 34, letterSpacing: "-0.03em", textShadow: `0 0 16px ${glowColor}` }}>{client.stressIndex}</span>
                </div>
                <div>{riskPill(rl)}</div>
                <div><span style={{ fontSize: 14, fontWeight: 700, color: "#E2E8F0", fontFamily: "var(--font-mono)" }}>{client.confidence}</span><span style={{ fontSize: 11, color: "#475569" }}>%</span></div>
                <p style={{ fontSize: 12, color: "#64748B", margin: 0, lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }} title={client.trigger}>{client.trigger}</p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Link href={`/clients/${client.id}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#ffffff", background: "linear-gradient(135deg, #6366F1, #4F46E5)", border: "none", boxShadow: "0 0 16px rgba(99,102,241,0.4)", transition: "all 0.15s ease", letterSpacing: "0.02em", textDecoration: "none" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = "0 0 24px rgba(99,102,241,0.7)"; el.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = "0 0 16px rgba(99,102,241,0.4)"; el.style.transform = "translateY(0)"; }}>
                    Review →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, padding: "0 4px" }}>
          <p style={{ fontSize: 11, color: "#334155", margin: 0, letterSpacing: "0.03em" }}>Financial Stress Index v2.1 · Nightly analysis · 247 clients · Model: FSI-Gen</p>
          <p style={{ fontSize: 11, color: "#334155", margin: 0 }}>Last updated: Today at 06:00 UTC</p>
        </div>
      </div>
    </div>
  );
}