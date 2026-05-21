"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0B1326",
      backgroundImage:
        "linear-gradient(rgba(99,102,241,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.025) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
      fontFamily: "'Inter', sans-serif",
      color: "#E2E8F0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>

      {/* Back link */}
      <Link href="/landing" style={{
        position: "fixed", top: 24, left: 32,
        fontSize: 13, fontWeight: 600, color: "#94A3B8",
        textDecoration: "none", transition: "color 0.15s",
      }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#E2E8F0")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8")}
      >
        ← Back to Landing
      </Link>

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: 420,
        backgroundColor: "#1C253B",
        border: "1px solid #334155",
        borderRadius: 4,
        padding: "48px 40px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
      }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36, justifyContent: "center" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 6,
            background: "linear-gradient(135deg, #6366F1, #818CF8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 14px rgba(99,102,241,0.4)",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#6366F1", letterSpacing: "-0.02em" }}>
            Capital Flow
          </span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: 22, fontWeight: 700, color: "#E2E8F0",
          margin: "0 0 8px", letterSpacing: "-0.02em", textAlign: "center",
        }}>
          Welcome back
        </h1>
        <p style={{
          fontSize: 14, color: "#94A3B8", margin: "0 0 32px", textAlign: "center",
        }}>
          Sign in to your account to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{
              display: "block", fontSize: 11, fontWeight: 600,
              color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" as const,
              marginBottom: 8,
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              style={{
                width: "100%", padding: "12px 16px",
                backgroundColor: "#131B2E",
                border: "1px solid #334155",
                borderRadius: 4,
                color: "#E2E8F0",
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.target.style.borderColor = "#334155")}
            />
          </div>

          <div>
            <label style={{
              display: "block", fontSize: 11, fontWeight: 600,
              color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" as const,
              marginBottom: 8,
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%", padding: "12px 16px",
                backgroundColor: "#131B2E",
                border: "1px solid #334155",
                borderRadius: 4,
                color: "#E2E8F0",
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.target.style.borderColor = "#334155")}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%", padding: "14px",
              backgroundColor: "#6366F1",
              border: "none", borderRadius: 4,
              color: "#fff", fontSize: 15, fontWeight: 600,
              cursor: "pointer", marginTop: 8,
              transition: "all 0.2s",
              boxShadow: "0 0 15px rgba(99,102,241,0.3)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.boxShadow = "0 0 24px rgba(99,102,241,0.6)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.boxShadow = "0 0 15px rgba(99,102,241,0.3)";
              el.style.transform = "translateY(0)";
            }}
          >
            Sign In
          </button>
        </form>

        {/* Footer note */}
        <p style={{
          fontSize: 12, color: "#475569",
          textAlign: "center", margin: "24px 0 0",
        }}>
          Capital Flow · AI-Native Banking Intelligence
        </p>
      </div>
    </div>
  );
}