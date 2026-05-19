"use client";

import { useState } from "react";
import { clients as initialClients } from "./lib/data";
import { Client } from "./lib/types";
import Link from "next/link";

function stressColor(index: number) {
  if (index >= 75) return "bg-red-100 text-red-700";
  if (index >= 50) return "bg-amber-100 text-amber-700";
  return "bg-emerald-100 text-emerald-700";
}

function stressBarColor(index: number) {
  if (index >= 75) return "bg-red-500";
  if (index >= 50) return "bg-amber-500";
  return "bg-emerald-500";
}

function confidenceColor(conf: number) {
  if (conf >= 90) return "text-violet-600";
  if (conf >= 80) return "text-zinc-600";
  return "text-zinc-400";
}

export default function Dashboard() {
  const [clients] = useState<Client[]>(initialClients);

  // Sort by stress desc
  const sorted = [...clients].sort((a, b) => b.stressIndex - a.stressIndex);

  const pendingCount = sorted.filter((c) => c.status === "pending").length;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div>
              <span className="font-semibold text-zinc-900">Client Alert Dashboard</span>
              <span className="text-zinc-400 text-sm ml-2 hidden sm:inline">Team 20 Banking</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
              {pendingCount} alerts
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Sub-header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-900">Financial Stress Alerts</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Ranked by AI-detected financial stress — nightly analysis of 100–300 clients
          </p>
        </div>

        {/* Column labels */}
        <div className="hidden sm:flex items-center gap-4 px-4 py-2 text-xs font-medium text-zinc-400 uppercase tracking-wide">
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
              className="block bg-white border border-zinc-200 rounded-xl p-4 hover:border-violet-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-4">
                {/* Client info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-zinc-900">{client.name}</span>
                    <span className="text-zinc-400 text-sm">••••{client.accountNumber}</span>
                    {client.status !== "pending" && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          client.status === "approved"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {client.status}
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-500 text-sm mt-0.5 truncate">{client.trigger}</p>
                </div>

                {/* Stress score */}
                <div className="flex flex-col items-center gap-1 w-20">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-sm font-semibold ${stressColor(client.stressIndex)}`}
                    >
                      {client.stressIndex}
                    </span>
                  </div>
                  {/* Stress bar */}
                  <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${stressBarColor(client.stressIndex)}`}
                      style={{ width: `${client.stressIndex}%` }}
                    />
                  </div>
                </div>

                {/* Confidence */}
                <div className={`text-sm font-medium w-16 text-center ${confidenceColor(client.confidence)}`}>
                  {client.confidence}%
                </div>

                {/* Action */}
                <div className="w-20 flex justify-end">
                  <span className="text-sm text-violet-600 font-medium">Review →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-zinc-400 text-xs mt-8">
          Financial Stress Index powered by nightly transaction monitoring · Subscription cancellation detection · Behavioral analysis
        </p>
      </main>
    </div>
  );
}