"use client";

import { useState, use } from "react";
import { clients as initialClients } from "../../lib/data";
import { Client } from "../../lib/types";
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

function transactionCategoryLabel(category: string) {
  const map: Record<string, string> = {
    streaming: "Streaming",
    overdraft: "Overdraft",
    atm: "ATM Withdrawal",
    direct_debit: "Direct Debit",
    utility: "Utility",
    rent: "Rent",
    grocery: "Grocery",
    transfer: "Transfer",
  };
  return map[category] ?? category;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const client = initialClients.find((c) => c.id === id);

  if (!client) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <p className="text-zinc-500">Client not found.</p>
      </div>
    );
  }

  return <ClientDetail client={client} />;
}

function ClientDetail({ client }: { client: Client }) {
  const [email, setEmail] = useState(client.draftEmail);
  const [status, setStatus] = useState<Client["status"]>(client.status);
  const [approved, setApproved] = useState(false);

  function handleApprove() {
    setApproved(true);
    setStatus("approved");
  }

  function handleReject() {
    setStatus("rejected");
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              ← Back
            </Link>
            <div className="w-px h-5 bg-zinc-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-semibold text-zinc-900">Client Alert</span>
            </div>
          </div>
          {status !== "pending" && (
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                status === "approved"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-zinc-100 text-zinc-500"
              }`}
            >
              {status === "approved" ? "Approved" : "Rejected"}
            </span>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Client summary card */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">{client.name}</h1>
              <p className="text-zinc-500 text-sm mt-0.5">
                Account ••••{client.accountNumber}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${stressColor(client.stressIndex)}`}>
                Stress {client.stressIndex}/100
              </div>
              <div className="w-40 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${stressBarColor(client.stressIndex)}`}
                  style={{ width: `${client.stressIndex}%` }}
                />
              </div>
              <span className="text-zinc-400 text-xs">{client.confidence}% confidence</span>
            </div>
          </div>

          <div className="mt-4 p-4 bg-violet-50 border border-violet-100 rounded-lg">
            <p className="text-sm font-medium text-violet-800 mb-0.5">⚡ Alert trigger</p>
            <p className="text-sm text-violet-700">{client.trigger}</p>
          </div>
        </div>

        {/* 3 transaction lines */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-zinc-900 mb-4">
            Evidence — Recent Transactions
          </h2>
          <div className="space-y-2">
            {client.transactions.map((tx) => {
              const isNegative = tx.amount < 0;
              const isWarning = /returned|declined|overdraft|fee/i.test(tx.description);
              return (
                <div
                  key={tx.id}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
                    isWarning
                      ? "bg-red-50 border-red-100"
                      : "bg-zinc-50 border-zinc-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                        isWarning ? "bg-red-100 text-red-600" : "bg-zinc-200 text-zinc-600"
                      }`}
                    >
                      {isWarning ? "⚠" : "$"}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isWarning ? "text-red-700" : "text-zinc-800"}`}>
                        {tx.description}
                      </p>
                      <p className="text-xs text-zinc-400">
                        {transactionCategoryLabel(tx.category)} · {formatDate(tx.date)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold font-mono ${
                      isWarning ? "text-red-700" : "text-zinc-700"
                    }`}
                  >
                    {isNegative ? "-" : "+"}
                    ${Math.abs(tx.amount).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI behavioral summary */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-zinc-900 mb-3">
            AI Behavioral Summary
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">{client.summary}</p>
        </div>

        {/* Draft outreach email */}
        {status === "pending" ? (
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h2 className="text-base font-semibold text-zinc-900 mb-3">
              Draft Outreach Email
            </h2>
            <textarea
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              rows={12}
              className="w-full text-sm text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 font-mono leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleApprove}
                className="px-5 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 transition-colors"
              >
                Approve &amp; Send
              </button>
              <button
                onClick={handleReject}
                className="px-5 py-2.5 bg-white border border-zinc-300 text-zinc-600 text-sm font-medium rounded-lg hover:bg-zinc-50 transition-colors"
              >
                Reject
              </button>
              <span className="text-zinc-400 text-xs self-center ml-auto">
                Edits auto-saved
              </span>
            </div>
          </div>
        ) : (
          <div
            className={`rounded-xl p-6 border ${
              approved
                ? "bg-emerald-50 border-emerald-200"
                : "bg-zinc-50 border-zinc-200"
            }`}
          >
            <p className={`text-sm font-semibold ${approved ? "text-emerald-700" : "text-zinc-500"}`}>
              {approved ? "✓ Email approved and sent to client." : "Alert rejected — no outreach will be sent."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}