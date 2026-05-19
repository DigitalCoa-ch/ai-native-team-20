import { Client } from "./types";

export const clients: Client[] = [
  {
    id: "maya-rodriguez",
    name: "Maya Rodriguez",
    accountNumber: "4821",
    stressIndex: 78,
    confidence: 91,
    trigger: "Subscription surge + late rent payment detected",
    summary:
      "Maya has maintained stable banking patterns for 18 months, but the last 30 days show a sharp deviation: three consecutive streaming subscription charges ($14.99, $14.99, $17.99) hit the account within 11 days, and her scheduled rent transfer of $1,400 was returned unpaid on the 1st — the first returned item in her account history. Cash flow analysis indicates she may be juggling multiple recurring obligations with insufficient buffer. Recommend a check-in before the next rent cycle.",
    draftEmail: `Hi Maya,

I wanted to reach out personally — I noticed your rent payment didn't go through this month and I know these things can happen unexpectedly.

As your account manager, I'm here to help. Whether it's adjusting your payment schedule, looking into a small short-term facility, or just talking through your options — I'd like to make sure we're solving this together, not just flagging it.

Would you have 15 minutes this week to chat? No pressure, no judgment. Just a conversation.

Warm regards,
Jordan
Retail Banking Account Manager`,
    transactions: [
      {
        id: "t1",
        date: "2026-05-15",
        description: "Netflix Premium",
        amount: -17.99,
        category: "streaming",
      },
      {
        id: "t2",
        date: "2026-05-08",
        description: "Spotify Premium",
        amount: -14.99,
        category: "streaming",
      },
      {
        id: "t3",
        date: "2026-05-04",
        description: "RENT PAYMENT — RETURNED",
        amount: -1400.0,
        category: "rent",
      },
    ],
    status: "pending",
  },
  {
    id: "tom-whitfield",
    name: "Tom Whitfield",
    accountNumber: "7734",
    stressIndex: 85,
    confidence: 88,
    trigger: "Overdraft attempt + missed direct debit",
    summary:
      "Tom's account has shown overdraft activity twice in the past 14 days — a $200 attempted direct debit on May 12th was declined due to insufficient funds, followed by a successful $85 groceries purchase that brought his balance to -$12.40 by May 14th. He has no overdraft facility on record. This is a significant behavioral shift from his typically balanced month-end accounts. The pattern suggests he may be experiencing a cash flow shortfall and could benefit from a compassionate, proactive outreach.",
    draftEmail: `Hi Tom,

I noticed your account had a couple of hiccups this fortnight — I just want to make sure everything's okay on your end.

I understand that sometimes life throws unexpected expenses at us, and I'd rather reach out now than wait for things to sort themselves out. Whether you need a small overdraft limit review, a payment plan for a bill, or just someone to talk through your options — I'm here for that.

No obligations, no strings. Would a quick call this week work for you?

Kind regards,
Jordan
Retail Banking Account Manager`,
    transactions: [
      {
        id: "t4",
        date: "2026-05-14",
        description: "OVERDRAFT FEE — returned item",
        amount: -35.0,
        category: "overdraft",
      },
      {
        id: "t5",
        date: "2026-05-12",
        description: "DIRECT DEBIT DECLINED — Insufficient funds",
        amount: -200.0,
        category: "direct_debit",
      },
      {
        id: "t6",
        date: "2026-05-14",
        description: "ATM Withdrawal",
        amount: -80.0,
        category: "atm",
      },
    ],
    status: "pending",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    accountNumber: "3309",
    stressIndex: 62,
    confidence: 79,
    trigger: "ATM withdrawal frequency + utility arrears",
    summary:
      "Priya typically uses her debit card for in-store purchases with a stable monthly spend pattern. Over the last 7 days, she has made 4 ATM withdrawals totalling $480 — an unusual frequency for her — alongside a returned utility bill payment of $94. Her account balance has been steadily declining since mid-April with no corresponding income deposits. The combination of rapid cash drain and a missed utility payment suggests she may be managing an underlying financial pressure that she hasn't raised with the bank.",
    draftEmail: `Hi Priya,

I hope you're well — I wanted to reach out after noticing a few changes in your account activity recently.

Your account has been a model of good standing for the past two years, so these recent fluctuations stood out to me — not as a concern to flag, but as a reason to check in. I know things can get tight sometimes, and if there's anything we can do to help — whether it's a payment extension, a chat about budgeting tools, or anything else — I'd rather you know we're here.

Would you be open to a brief call this week? I'm genuinely here to help.

Best regards,
Jordan
Retail Banking Account Manager`,
    transactions: [
      {
        id: "t7",
        date: "2026-05-16",
        description: "ATM Withdrawal",
        amount: -120.0,
        category: "atm",
      },
      {
        id: "t8",
        date: "2026-05-14",
        description: "UTILITY PAYMENT — RETURNED",
        amount: -94.0,
        category: "utility",
      },
      {
        id: "t9",
        date: "2026-05-10",
        description: "ATM Withdrawal",
        amount: -120.0,
        category: "atm",
      },
    ],
    status: "pending",
  },
];