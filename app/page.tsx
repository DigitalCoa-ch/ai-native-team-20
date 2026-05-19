"use client";

import { useState } from "react";
import { clients as initialClients } from "./lib/data";
import { Client } from "./lib/types";
import Link from "next/link";

function riskColor(index: number) {
  if (index >= 75) return "bg-error text-on-error";
  if (index >= 50) return "bg-warning text-on-warning";
  return "bg-outline text-white";
}

function riskBarColor(index: number) {
  if (index >= 75) return "bg-error";
  if (index >= 50) return "bg-warning";
  return "bg-outline";
}

function confidenceColor(conf: number) {
  if (conf >= 90) return "text-primary";
  if (conf >= 80) return "text-secondary";
  return "text-tertiary";
}

function statusBadge(status: Client["status"]) {
  if (status === "approved")
    return <span className="text-xs px-2 py-0.5 rounded bg-success/10 text-success font-medium">Approved</span>;
  if (status === "rejected")
    return <span className="text-xs px-2 py-0.5 rounded bg-outline/20 text-tertiary font-medium">Rejected</span>;
  return null;
}

export default function Dashboard() {
  const [clients] = useState<Client[]>(initialClients);
  const sorted = [...clients].sort((a, b) => b.stressIndex - a.stressIndex);
  const pendingCount = sorted.filter((c) => c.status === "pending").length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f7f9fb" }}>
      {/* Header */}
      <header
        className="bg-white"
        style={{ borderBottom: "1px solid #cbd5e1" }}
      >
        <div
          className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between"
          style={{ gap: 24 }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: "#0f172a" }}
            >
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span
              className="font-semibold text-lg"
              style={{ color: "#0f172a" }}
            >
              Client Alert Dashboard
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="px-3 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor: pendingCount > 0 ? "#ea580c" : "#16a34a",
                color: "#ffffff",
              }}
            >
              {pendingCount} alert{pendingCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">

        {/* Page title */}
        <div className="mb-8">
          <h1
            className="text-2xl"
            style={{ fontWeight: 700, lineHeight: 1.2, color: "#0f172a" }}
          >
            Financial Stress Alerts
          </h1>
          <p className="text-sm mt-1" style={{ color: "#475569", lineHeight: 1.5 }}>
            Ranked by AI-detected stress — nightly analysis across your client portfolio
          </p>
        </div>

        {/* Column labels */}
        <div
          className="hidden sm:flex items-center gap-4 px-5 py-2 mb-2"
          style={{ color: "#475569", fontSize: 12, fontWeight: 500, lineHeight: 1.4 }}
        >
          <div className="flex-1">Client</div>
          <div className="w-20 text-center">Stress</div>
          <div className="w-16 text-center">Confidence</div>
          <div className="w-20 text-right">Action</div>
        </div>

        {/* Client rows */}
        <div className="space-y-3">
          {sorted.map((client) => (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className="block"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: 4,
                padding: "16px 20px",
                transition: "box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 2px 8px rgba(15,23,42,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "none")
              }
            >
              <div className="flex items-center gap-4">
                {/* Client info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="font-semibold text-base"
                      style={{ color: "#0f172a", lineHeight: 1.4 }}
                    >
                      {client.name}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "#94a3b8" }}
                    >
                      ••••{client.accountNumber}
                    </span>
                    {statusBadge(client.status)}
                  </div>
                  <p
                    className="text-sm mt-0.5 truncate"
                    style={{ color: "#475569", lineHeight: 1.5 }}
                  >
                    {client.trigger}
                  </p>
                </div>

                {/* Stress score */}
                <div className="flex flex-col items-center gap-1.5 w-20">
                  <div
                    className="px-2.5 py-1 rounded text-sm font-semibold"
                    style={{ backgroundColor: riskColor(client.stressIndex).split(" ")[0], color: riskColor(client.stressIndex).split(" ")[1] }}
                  >
                    {client.stressIndex}
                  </div>
                  {/* Stress bar */}
                  <div
                    className="w-full h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: "#e2e6ea" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${client.stressIndex}%`,
                        backgroundColor: riskBarColor(client.stressIndex),
                      }}
                    />
                  </div>
                </div>

                {/* Confidence */}
                <div
                  className="text-sm font-medium w-16 text-center"
                  style={{ color: confidenceColor(client.confidence) }}
                >
                  {client.confidence}%
                </div>

                {/* Action */}
                <div className="w-20 flex justify-end">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#0f172a" }}
                  >
                    Review →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <p
          className="text-center text-xs mt-8"
          style={{ color: "#94a3b8", lineHeight: 1.5 }}
        >
          Financial Stress Index · Nightly transaction monitoring · Subscription detection · Behavioral analysis
        </p>
      </main>
    </div>
  );
}