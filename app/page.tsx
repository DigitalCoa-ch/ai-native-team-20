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
    high: { bg: "#fef2f2", text: "#dc2626", border: "#fecaca", label: "High" },
    medium: { bg: "#fff7ed", text: "#ea580c", border: "#fed7aa", label: "Medium" },
    low: { bg: "#f8fafc", text: "#64748b", border: "#e2e8f0", label: "Low" },
  }[level];
  return (
    <span
      style={{
        backgroundColor: map.bg,
        color: map.text,
        borderColor: map.border,
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 3,
        border: "1px solid",
        letterSpacing: "0.02em",
        textTransform: "uppercase",
      }}
    >
      {map.label}
    </span>
  );
}

function stressBar(index: number) {
  const color = index >= 75 ? "#dc2626" : index >= 50 ? "#ea580c" : "#94a3b8";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          flex: 1,
          height: 6,
          backgroundColor: "#edf0f3",
          borderRadius: 3,
          overflow: "hidden",
          minWidth: 80,
        }}
      >
        <div
          style={{
            width: `${index}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: 3,
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#0f172a",
          minWidth: 28,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {index}
      </span>
    </div>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Dashboard() {
  const [clients] = useState<Client[]>(initialClients);
  const sorted = [...clients].sort((a, b) => b.stressIndex - a.stressIndex);
  const pendingCount = sorted.filter((c) => c.status === "pending").length;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f9fb", fontFamily: "'Inter', sans-serif" }}>
      {/* ── Top Navigation ───────────────────────────────────── */}
      <header style={{ backgroundColor: "#0f172a", borderBottom: "1px solid #1e293b" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 56,
          }}
        >
          {/* Logo + wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                backgroundColor: "#ffffff",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#0f172a", fontWeight: 800, fontSize: 13 }}>AI</span>
            </div>
            <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em" }}>
              ClientAlert
            </span>
            <span
              style={{
                color: "#94a3b8",
                fontSize: 13,
                fontWeight: 400,
                marginLeft: 4,
                display: "none",
              }}
            >
              — Retail Banking
            </span>
          </div>

          {/* Nav links */}
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {["Dashboard", "Clients", "Reports", "Settings"].map((item, i) => (
              <span
                key={item}
                style={{
                  color: i === 0 ? "#ffffff" : "#94a3b8",
                  fontSize: 13,
                  fontWeight: i === 0 ? 500 : 400,
                  cursor: "pointer",
                  borderBottom: i === 0 ? "2px solid #ffffff" : "2px solid transparent",
                  paddingBottom: 18,
                }}
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Alert count badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                backgroundColor: pendingCount > 0 ? "#dc2626" : "#16a34a",
                borderRadius: 4,
                padding: "5px 12px",
              }}
            >
              <span style={{ color: "#ffffff", fontSize: 12, fontWeight: 600 }}>
                {pendingCount} ALERT{pendingCount !== 1 ? "S" : ""}
              </span>
            </div>
            {/* Avatar */}
            <div
              style={{
                width: 32,
                height: 32,
                backgroundColor: "#1e293b",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              JM
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>

        {/* ── Page Header ──────────────────────────────────────── */}
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Financial Stress Alerts
          </h1>
          <p style={{ fontSize: 14, color: "#475569", marginTop: 6, lineHeight: 1.5, margin: "6px 0 0" }}>
            AI-driven monitoring across{" "}
            <strong style={{ color: "#0f172a", fontWeight: 600 }}>247 clients</strong> — nightly analysis
          </p>
        </div>

        {/* ── Filters / Summary Stats ──────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {[
            { label: "Total Clients Monitored", value: "247", delta: "All portfolios" },
            { label: "Active Alerts", value: String(pendingCount), delta: "Requires review", accent: pendingCount > 0 },
            { label: "High Risk", value: String(sorted.filter((c) => c.stressIndex >= 75).length), delta: "≥75 stress index" },
            { label: "Avg Confidence", value: "86%", delta: "Model accuracy" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: 4,
                padding: "16px 20px",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#94a3b8",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  margin: "0 0 8px",
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: stat.accent ? "#dc2626" : "#0f172a",
                  margin: 0,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {stat.value}
              </p>
              <p style={{ fontSize: 11, color: "#94a3b8", margin: "6px 0 0" }}>{stat.delta}</p>
            </div>
          ))}
        </div>

        {/* ── Alert List ───────────────────────────────────────── */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 100px",
              gap: 0,
              padding: "10px 20px",
              backgroundColor: "#f8fafc",
              borderBottom: "1px solid #cbd5e1",
            }}
          >
            {["Client", "Stress Score", "Risk Level", "Confidence", "Trigger", ""].map((h) => (
              <span
                key={h}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#94a3b8",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Table rows */}
          {sorted.map((client, i) => (
            <div
              key={client.id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 100px",
                gap: 0,
                padding: "16px 20px",
                alignItems: "center",
                borderBottom:
                  i < sorted.length - 1 ? "1px solid #edf0f3" : "none",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                transition: "background-color 0.1s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.backgroundColor = "#f8fafc")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.backgroundColor = "#ffffff")
              }
            >
              {/* Client */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: "#edf0f3",
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#475569",
                      flexShrink: 0,
                    }}
                  >
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#0f172a",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {client.name}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#94a3b8",
                        margin: 0,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      ••••{client.accountNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stress score + bar */}
              <div style={{ paddingRight: 16 }}>
                {stressBar(client.stressIndex)}
              </div>

              {/* Risk level */}
              <div>{riskPill(riskLevel(client.stressIndex))}</div>

              {/* Confidence */}
              <div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#0f172a",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {client.confidence}
                </span>
                <span style={{ fontSize: 11, color: "#94a3b8" }}>%</span>
              </div>

              {/* Trigger */}
              <div>
                <p
                  style={{
                    fontSize: 12,
                    color: "#475569",
                    margin: 0,
                    lineHeight: 1.4,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 200,
                  }}
                  title={client.trigger}
                >
                  {client.trigger}
                </p>
              </div>

              {/* Action */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  href={`/clients/${client.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#0f172a",
                    textDecoration: "none",
                    padding: "6px 12px",
                    borderRadius: 4,
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#ffffff",
                    transition: "all 0.1s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0f172a";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#0f172a";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#ffffff";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#0f172a";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#cbd5e1";
                  }}
                >
                  Review →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>
            Financial Stress Index v2.1 · Nightly analysis · Subscription detection · Behavioral scoring
          </p>
          <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>
            Last updated: Today at 06:00 UTC
          </p>
        </div>
      </div>
    </div>
  );
}