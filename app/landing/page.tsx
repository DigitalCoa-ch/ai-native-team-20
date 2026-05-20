import Link from "next/link";

export default function Landing() {
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
      flexDirection: "column",
    }}>

      {/* Nav */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: 64,
        borderBottom: "1px solid #1E293B",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", color: "#E2E8F0" }}>
            Capital Flow
          </span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/login">
            <button style={{
              padding: "8px 20px", borderRadius: 4, fontSize: 13, fontWeight: 600,
              background: "transparent", border: "1px solid #334155", color: "#94A3B8",
              cursor: "pointer", transition: "all 0.2s",
            }}>
              Sign In
            </button>
          </Link>
          <Link href="/login">
            <button style={{
              padding: "8px 20px", borderRadius: 4, fontSize: 13, fontWeight: 600,
              background: "#6366F1", border: "none", color: "#fff",
              cursor: "pointer", boxShadow: "0 0 12px rgba(99,102,241,0.35)",
              transition: "all 0.2s",
            }}>
              Get Started
            </button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "80px 48px",
        textAlign: "center",
      }}>
        {/* Logo mark */}
        <div style={{
          width: 72, height: 72, borderRadius: 16,
          background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.05))",
          border: "1px solid rgba(99,102,241,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 40,
          boxShadow: "0 0 28px rgba(99,102,241,0.25)",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>

        <h1 style={{
          fontSize: 56, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1,
          color: "#E2E8F0", margin: "0 0 20px",
          textShadow: "0 0 40px rgba(99,102,241,0.35), 0 0 15px rgba(99,102,241,0.3)",
        }}>
          Capital Flow
        </h1>

        <p style={{
          fontSize: 18, color: "#94A3B8", maxWidth: 560, lineHeight: 1.7,
          margin: "0 0 48px",
        }}>
          AI-powered financial stress detection. Protect your clients before it&apos;s too late.
        </p>

        {/* Stat Row */}
        <div style={{
          display: "flex", gap: 48, marginBottom: 48, flexWrap: "wrap", justifyContent: "center",
        }}>
          {[
            { value: "300+", label: "Clients Monitored" },
            { value: "91%",  label: "Detection Accuracy" },
            { value: "60sec", label: "Alert Review Time" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p style={{
                fontSize: 32, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace",
                color: "#6366F1", margin: 0, letterSpacing: "-0.03em",
                textShadow: "0 0 20px rgba(99,102,241,0.4)",
              }}>
                {stat.value}
              </p>
              <p style={{
                fontSize: 12, fontWeight: 600, color: "#94A3B8",
                letterSpacing: "0.06em", textTransform: "uppercase" as const,
                margin: "6px 0 0",
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/login">
            <button style={{
              padding: "14px 32px", borderRadius: 4, fontSize: 15, fontWeight: 600,
              background: "#6366F1", border: "none", color: "#fff",
              cursor: "pointer", transition: "all 0.2s",
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
              Get Started
            </button>
          </Link>
          <Link href="/login">
            <button style={{
              padding: "14px 32px", borderRadius: 4, fontSize: 15, fontWeight: 600,
              background: "transparent", border: "1px solid #334155", color: "#94A3B8",
              cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "#6366F1";
                el.style.color = "#6366F1";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "#334155";
                el.style.color = "#94A3B8";
              }}
            >
              See How It Works
            </button>
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section style={{
        padding: "64px 48px 80px",
        borderTop: "1px solid #1E293B",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
        }}>
          {[
            {
              title: "Nightly Monitoring",
              desc: "Every account is analyzed every 24 hours. Patterns emerge before crises do.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              ),
            },
            {
              title: "Stress Index Scoring",
              desc: "A single score that tells you which clients need attention right now.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              ),
            },
            {
              title: "Human-in-the-Loop Control",
              desc: "AI surfaces the insight. You decide. Every action is reviewed and logged.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              ),
            },
          ].map((card) => (
            <div key={card.title} style={{
              backgroundColor: "#1C253B",
              border: "1px solid #334155",
              borderRadius: 4,
              padding: "32px",
              boxShadow: "0 0 20px rgba(99,102,241,0.08), 0 8px 32px rgba(0,0,0,0.6)",
              transition: "all 0.2s",
            }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(99,102,241,0.3)";
                el.style.boxShadow = "0 0 28px rgba(99,102,241,0.15), 0 8px 32px rgba(0,0,0,0.7)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "#334155";
                el.style.boxShadow = "0 0 20px rgba(99,102,241,0.08), 0 8px 32px rgba(0,0,0,0.6)";
              }}
            >
              <div style={{ marginBottom: 20 }}>{card.icon}</div>
              <h3 style={{
                fontSize: 16, fontWeight: 700, color: "#E2E8F0",
                margin: "0 0 12px", letterSpacing: "-0.01em",
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: 14, color: "#94A3B8", lineHeight: 1.7, margin: 0,
              }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "20px 48px",
        borderTop: "1px solid #1E293B",
        textAlign: "center",
      }}>
        <p style={{ fontSize: 11, color: "#475569", letterSpacing: "0.04em" }}>
          © 2026 Capital Flow · AI-Native Banking Intelligence · Confidential
        </p>
      </footer>
    </div>
  );
}