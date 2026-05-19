export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number; // negative = debit, positive = credit
  category: "streaming" | "overdraft" | "atm" | "direct_debit" | "utility" | "rent" | "grocery" | "transfer";
}

export interface Client {
  id: string;
  name: string;
  accountNumber: string; // last 4 digits only, e.g. "4821"
  stressIndex: number;   // 0–100
  confidence: number;    // 0–100 percentage
  trigger: string;        // one-line reason for alert
  summary: string;        // 3-sentence behavioral AI summary
  draftEmail: string;    // pre-generated outreach email
  transactions: Transaction[];
  status: "pending" | "approved" | "rejected";
}