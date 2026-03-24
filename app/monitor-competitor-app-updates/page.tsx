import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Monitor Competitor App Updates | VersionWatcher",
  description:
    "Monitor competitor app updates automatically. Track iOS version changes, release cadence, and App Store movement with VersionWatcher.",
  alternates: {
    canonical: "https://www.versionwatcher.com/monitor-competitor-app-updates",
  },
  openGraph: {
    title: "Monitor Competitor App Updates | VersionWatcher",
    description:
      "Monitor competitor app updates automatically. Track iOS version changes, release cadence, and App Store movement with VersionWatcher.",
    url: "https://www.versionwatcher.com/monitor-competitor-app-updates",
    siteName: "VersionWatcher",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monitor Competitor App Updates | VersionWatcher",
    description:
      "Monitor competitor app updates automatically. Track iOS version changes, release cadence, and App Store movement with VersionWatcher.",
  },
};

const reasons = [
  {
    title: "Track release velocity",
    text: "See when competitors ship new versions so you can understand how quickly they are iterating.",
  },
  {
    title: "Spot market movement",
    text: "Use version updates as a signal for product momentum, launch timing, and competitive activity.",
  },
  {
    title: "Monitor from one dashboard",
    text: "Track multiple competitor apps, client apps, and your own releases in one clean place.",
  },
];

const examples = [
  {
    title: "Spotify updated",
    text: "Catch when a market leader releases a new version and use that as a signal for feature or iteration activity.",
    change: "v9.1.26 → v9.1.28",
  },
  {
    title: "Instagram updated",
    text: "Monitor high-frequency consumer apps to understand cadence and possible rollout timing.",
    change: "v419.0 → v420.0",
  },
  {
    title: "Notion updated",
    text: "Track SaaS and productivity apps that shape user expectations in adjacent markets.",
    change: "v2.49 → v2.50",
  },
];

const faqs = [
  {
    q: "How can I monitor competitor app updates?",
    a: "Add the competitor app to VersionWatcher and the platform will alert you whenever the App Store version changes.",
  },
  {
    q: "Why should I track competitor app releases?",
    a: "Competitor releases are a useful signal for product movement, release velocity, and market activity. They help product teams stay aware without checking manually.",
  },
  {
    q: "Can agencies use this for client monitoring?",
    a: "Yes. Agencies can track competitors, client portfolios, and category leaders from one dashboard.",
  },
  {
    q: "Does this work for iOS apps on the App Store?",
    a: "Yes. VersionWatcher is built to monitor App Store version changes for iOS apps.",
  },
];

export default function MonitorCompetitorAppUpdatesPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(900px 500px at 10% 0%, rgba(37,99,235,.16), rgba(0,0,0,0) 50%), radial-gradient(800px 500px at 90% 0%, rgba(168,85,247,.10), rgba(0,0,0,0) 45%), #020617",
        color: "#f8fafc",
      }}
    >
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "32px 20px 88px",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 44,
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
              color: "#f8fafc",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, rgba(59,130,246,1), rgba(168,85,247,1))",
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
              }}
            >
              V
            </div>
            <div style={{ fontWeight: 900, fontSize: 20 }}>
              VersionWatcher
            </div>
          </Link>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/login"
              style={{
                padding: "10px 16px",
                borderRadius: 12,
                border: "1px solid rgba(148,163,184,.18)",
                color: "#e2e8f0",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

            <Link
              href="/signup"
              style={{
                padding: "10px 16px",
                borderRadius: 12,
                background: "#f8fafc",
                color: "#020617",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Start free
            </Link>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: 28,
            alignItems: "center",
          }}
          className="heroGrid"
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                padding: "8px 12px",
                borderRadius: 999,
                border: "1px solid rgba(59,130,246,.22)",
                background: "rgba(59,130,246,.10)",
                color: "#bfdbfe",
                fontSize: 13,
                fontWeight: 800,
                marginBottom: 18,
              }}
            >
              Competitor release intelligence
            </div>

            <h1
              style={{
                fontSize: "clamp(40px,6vw,68px)",
                fontWeight: 900,
                lineHeight: 1.03,
                letterSpacing: -2,
                margin: "0 0 18px",
                maxWidth: 760,
              }}
            >
              Monitor competitor app updates automatically.
            </h1>

            <p
              style={{
                fontSize: 20,
                lineHeight: 1.65,
                maxWidth: 760,
                color: "#cbd5e1",
                marginBottom: 24,
              }}
            >
              Track App Store version changes across competitor apps, category
              leaders, and client portfolios. VersionWatcher helps product teams
              and agencies catch releases without checking manually.
            </p>

            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              <Link
                href="/signup"
                style={{
                  padding: "14px 20px",
                  borderRadius: 14,
                  background: "#f8fafc",
                  color: "#020617",
                  textDecoration: "none",
                  fontWeight: 900,
                }}
              >
                Start free
              </Link>

              <Link
                href="/track-app-store-updates"
                style={{
                  padding: "14px 20px",
                  borderRadius: 14,
                  border: "1px solid rgba(148,163,184,.18)",
                  background: "rgba(15,23,42,.45)",
                  color: "#e2e8f0",
                  textDecoration: "none",
                  fontWeight: 800,
                }}
              >
                View App Store tracking page
              </Link>
            </div>

            <div
              style={{
                color: "#cbd5e1",
                fontSize: 16,
                lineHeight: 1.7,
              }}
            >
              Monitor apps like <strong style={{ color: "#f8fafc" }}>Spotify</strong>,{" "}
              <strong style={{ color: "#f8fafc" }}>Instagram</strong>,{" "}
              <strong style={{ color: "#f8fafc" }}>Netflix</strong>, and other
              iOS competitors from one dashboard.
            </div>
          </div>

          <div
            style={{
              borderRadius: 24,
              padding: 22,
              background: "rgba(15,23,42,.54)",
              border: "1px solid rgba(148,163,184,.10)",
              boxShadow: "0 30px 80px rgba(0,0,0,.32)",
            }}
          >
            <div
              style={{
                borderRadius: 18,
                padding: 20,
                background: "rgba(2,6,23,.88)",
                border: "1px solid rgba(148,163,184,.08)",
              }}
            >
              <div style={{ fontSize: 15, color: "#94a3b8", marginBottom: 10 }}>
                Why teams use VersionWatcher
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {reasons.map((item) => (
                  <div
                    key={item.title}
                    style={{
                      padding: 16,
                      borderRadius: 14,
                      background: "rgba(15,23,42,.58)",
                      border: "1px solid rgba(148,163,184,.08)",
                    }}
                  >
                    <div style={{ fontWeight: 900, marginBottom: 6 }}>
                      {item.title}
                    </div>
                    <div style={{ color: "#94a3b8", lineHeight: 1.6 }}>
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: 80 }}>
          <div style={{ maxWidth: 760, marginBottom: 22 }}>
            <div
              style={{
                fontSize: 13,
                color: "#86efac",
                fontWeight: 800,
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1.4,
              }}
            >
              Example competitor signals
            </div>

            <h2
              style={{
                fontSize: 40,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 0 12px",
              }}
            >
              Turn release changes into competitive insight.
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              A version update is not just a number. It can indicate iteration
              speed, launch activity, or major movement in the market.
            </p>
          </div>

          <div className="grid3">
            {examples.map((item) => (
              <div
                key={item.title}
                className="card"
              >
                <div
                  style={{
                    display: "inline-flex",
                    padding: "6px 10px",
                    borderRadius: 999,
                    background: "rgba(34,197,94,.14)",
                    color: "#86efac",
                    fontSize: 12,
                    fontWeight: 800,
                    marginBottom: 12,
                  }}
                >
                  {item.change}
                </div>

                <div className="cardTitle">{item.title}</div>
                <div className="cardText">{item.text}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 80 }}>
          <div style={{ maxWidth: 760, marginBottom: 22 }}>
            <div
              style={{
                fontSize: 13,
                color: "#93c5fd",
                fontWeight: 800,
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1.4,
              }}
            >
              How it works
            </div>

            <h2
              style={{
                fontSize: 40,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 0 12px",
              }}
            >
              Add apps, watch releases, get alerted.
            </h2>
          </div>

          <div className="grid3">
            <div className="card">
              <div className="cardTitle">1. Add competitor apps</div>
              <div className="cardText">
                Search for the iOS apps you want to monitor and add them to your watchlist.
              </div>
            </div>

            <div className="card">
              <div className="cardTitle">2. VersionWatcher monitors them</div>
              <div className="cardText">
                We automatically check App Store version changes every 2 hours.
              </div>
            </div>

            <div className="card">
              <div className="cardTitle">3. React faster</div>
              <div className="cardText">
                Get alerted when tracked apps update so your team stays aware of market movement.
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: 80 }}>
          <div
            style={{
              padding: 30,
              borderRadius: 28,
              background:
                "linear-gradient(135deg, rgba(37,99,235,.18), rgba(168,85,247,.14))",
              border: "1px solid rgba(148,163,184,.12)",
            }}
          >
            <div style={{ maxWidth: 760 }}>
              <div
                style={{
                  fontSize: 13,
                  color: "#c4b5fd",
                  fontWeight: 800,
                  marginBottom: 10,
                  textTransform: "uppercase",
                  letterSpacing: 1.4,
                }}
              >
                FAQ
              </div>

              <h2
                style={{
                  fontSize: 40,
                  fontWeight: 900,
                  lineHeight: 1.1,
                  margin: "0 0 20px",
                }}
              >
                Questions teams ask.
              </h2>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  style={{
                    padding: 18,
                    borderRadius: 18,
                    background: "rgba(2,6,23,.34)",
                    border: "1px solid rgba(148,163,184,.10)",
                  }}
                >
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>{faq.q}</div>
                  <div style={{ color: "#cbd5e1", lineHeight: 1.7 }}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 80 }}>
          <div
            style={{
              padding: 30,
              borderRadius: 28,
              background: "rgba(15,23,42,.42)",
              border: "1px solid rgba(148,163,184,.10)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: 42,
                margin: "0 0 12px",
                fontWeight: 900,
              }}
            >
              Start monitoring competitor releases today.
            </h2>

            <p
              style={{
                maxWidth: 760,
                margin: "0 auto 24px",
                color: "#cbd5e1",
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              If competitor app updates matter to your team, VersionWatcher gives you
              a cleaner and faster way to monitor them.
            </p>

            <Link
              href="/signup"
              style={{
                display: "inline-block",
                padding: "14px 22px",
                borderRadius: 14,
                background: "#f8fafc",
                color: "#020617",
                textDecoration: "none",
                fontWeight: 900,
              }}
            >
              Start free
            </Link>
          </div>
        </section>
      </section>

      <style>{`
        .grid3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .card {
          padding: 22px;
          border-radius: 20px;
          background: rgba(15,23,42,.38);
          border: 1px solid rgba(148,163,184,.10);
        }

        .cardTitle {
          font-size: 20px;
          font-weight: 900;
          margin-bottom: 10px;
        }

        .cardText {
          color: #cbd5e1;
          line-height: 1.7;
        }

        @media (max-width: 980px) {
          .heroGrid,
          .grid3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
